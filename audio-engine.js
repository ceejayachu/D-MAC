/**
 * DRUM MACHINE AUDIO ENGINE
 * High-performance Web Audio API engine with lookahead scheduling,
 * multi-track DSP channel strips, choke groups, master FX rack,
 * and offline/live WAV export.
 */

export class AudioEngine {
  constructor() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioCtx({ latencyHint: 'interactive' });
    
    // Playback state
    this.isPlaying = false;
    this.bpm = 130;
    this.swing = 0.0;        // 0.0 to 0.5
    this.humanize = 0.0;    // 0.0 to 0.5
    this.currentStep = 0;   // 0 to maxSteps - 1
    this.totalSteps = 16;   // 16, 32, 48, 64
    
    // Scheduler variables (Shiny Drum Machine / Lookahead pattern)
    this.lookaheadMs = 25.0;     // Frequency of scheduling check in ms
    this.scheduleHorizonSec = 0.1; // How far ahead to schedule Web Audio events
    this.nextNoteTime = 0.0;
    this.timerId = null;
    
    // Track State & Buffers
    this.tracks = [];
    this.sampleBuffers = new Map(); // url -> AudioBuffer
    this.activeChokeVoices = new Map(); // chokeGroupId -> array of { source, gainNode }
    
    // Callback for visual playhead updates and live channel metering
    this.onStepChange = null;
    this.onBufferLoaded = null;
    this.onLoadProgress = null;
    this.onTrackTrigger = null;

    // Pattern Bank Data
    this.activePatternIndex = 0; // 0=A, 1=B, 2=C, 3=D
    this.patterns = [
      this.createEmptyPattern(16),
      this.createEmptyPattern(16),
      this.createEmptyPattern(16),
      this.createEmptyPattern(16)
    ];
    this.songChainMode = false;
    this.songChain = [0, 0, 1, 1, 2, 3]; // Example chain of patterns
    this.songChainIndex = 0;

    // Recording State
    this.isRecording = false;
    this.mediaRecorder = null;
    this.recordedChunks = [];

    // Master DSP Nodes
    this.initMasterDSP();
  }

  initMasterDSP() {
    // Master Bus Input
    this.masterBus = this.ctx.createGain();
    this.masterBus.gain.value = 1.0;

    // 1. Distortion / Overdrive (WaveShaper)
    this.distortionNode = this.ctx.createWaveShaper();
    this.distortionNode.curve = this.makeDistortionCurve(0);
    this.distortionNode.oversample = '4x';
    
    this.distortionDry = this.ctx.createGain();
    this.distortionWet = this.ctx.createGain();
    this.distortionDry.gain.value = 1.0;
    this.distortionWet.gain.value = 0.0;

    this.distortionMix = this.ctx.createGain();

    // 2. Multimode Filter (Lowpass / Highpass / Bandpass)
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.value = 20000;
    this.filterNode.Q.value = 1.0;

    // 3. Tempo-Synced Stereo Delay
    this.delayNode = this.ctx.createDelay(2.0);
    this.delayNode.delayTime.value = 0.25; // default 1/8 note
    this.delayFeedback = this.ctx.createGain();
    this.delayFeedback.gain.value = 0.35;
    this.delayFilter = this.ctx.createBiquadFilter();
    this.delayFilter.type = 'lowpass';
    this.delayFilter.frequency.value = 4000;

    this.delayDry = this.ctx.createGain();
    this.delayWet = this.ctx.createGain();
    this.delayDry.gain.value = 1.0;
    this.delayWet.gain.value = 0.0;

    this.delayMix = this.ctx.createGain();

    // Loop delay feedback
    this.delayNode.connect(this.delayFilter);
    this.delayFilter.connect(this.delayFeedback);
    this.delayFeedback.connect(this.delayNode);
    this.delayFilter.connect(this.delayWet);

    // 4. Algorithmic Studio Reverb
    this.reverbNode = this.ctx.createConvolver();
    this.reverbNode.buffer = this.generateImpulseResponse(2.2, 2.0);
    
    this.reverbDry = this.ctx.createGain();
    this.reverbWet = this.ctx.createGain();
    this.reverbDry.gain.value = 1.0;
    this.reverbWet.gain.value = 0.0;
    this.reverbMix = this.ctx.createGain();

    // 5. Master Dynamics Compressor / Limiter
    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.value = -16.0; // dB
    this.compressor.knee.value = 10.0;
    this.compressor.ratio.value = 4.0;
    this.compressor.attack.value = 0.003; // 3ms
    this.compressor.release.value = 0.18; // 180ms

    // 6. Master Volume Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.85;

    // 7. Stereo Spectrum & VU Analyser
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 1024;
    this.analyser.smoothingTimeConstant = 0.8;

    // Routing Graph:
    // masterBus -> Distortion Split -> Filter -> Delay Split -> Reverb Split -> Compressor -> MasterGain -> Analyser -> Destination
    this.masterBus.connect(this.distortionDry);
    this.masterBus.connect(this.distortionNode);
    this.distortionNode.connect(this.distortionWet);
    
    this.distortionDry.connect(this.distortionMix);
    this.distortionWet.connect(this.distortionMix);

    this.distortionMix.connect(this.filterNode);

    this.filterNode.connect(this.delayDry);
    this.filterNode.connect(this.delayNode);
    this.delayDry.connect(this.delayMix);
    this.delayWet.connect(this.delayMix);

    this.delayMix.connect(this.reverbDry);
    this.delayMix.connect(this.reverbNode);
    this.reverbNode.connect(this.reverbWet);
    this.reverbDry.connect(this.reverbMix);
    this.reverbWet.connect(this.reverbMix);

    this.reverbMix.connect(this.compressor);
    this.compressor.connect(this.masterGain);
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  /**
   * Generates a rich, dynamic stereo algorithmic reverb impulse response
   */
  generateImpulseResponse(seconds = 2.0, decay = 2.0) {
    const rate = this.ctx.sampleRate;
    const length = Math.floor(rate * seconds);
    const impulse = this.ctx.createBuffer(2, length, rate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const t = i / length;
      // Exponential decay envelope with subtle diffusion
      const envelope = Math.pow(1 - t, decay);
      // Stereo decorrelation
      left[i] = ((Math.random() * 2) - 1) * envelope;
      right[i] = ((Math.random() * 2) - 1) * envelope;
    }
    return impulse;
  }

  /**
   * Generates non-linear saturation curve for tube overdrive
   */
  makeDistortionCurve(amount = 0) {
    const k = typeof amount === 'number' ? amount : 0;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    
    if (k <= 0) {
      for (let i = 0; i < n_samples; ++i) {
        const x = (i * 2) / n_samples - 1;
        curve[i] = x;
      }
      return curve;
    }

    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      // Classic non-linear hyperbolic saturation
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  createEmptyPattern(steps = 16) {
    // 16 tracks x steps
    const grid = [];
    for (let i = 0; i < 16; i++) {
      grid.push(new Array(steps).fill(0));
    }
    return grid;
  }

  async resumeContext() {
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  /**
   * Initializes tracks configuration
   */
  setTrackConfig(trackList) {
    this.tracks = trackList.map((cfg, index) => ({
      index,
      name: cfg.name,
      path: cfg.path,
      category: cfg.category,
      choke: cfg.choke || 0,
      volume: 0.85,
      pan: 0.0,
      pitch: 0, // semitones (-12 to +12)
      mute: false,
      solo: false,
      reverse: false,
      loadedBuffer: null,
      customBuffer: null
    }));
  }

  /**
   * Loads all audio files for the given kit in parallel
   */
  async loadKitSamples(kit) {
    await this.resumeContext();
    const total = kit.tracks.length;
    let loaded = 0;
    let syntheticCount = 0;

    const promises = kit.tracks.map(async (t, i) => {
      const rawPath = t.path || `${kit.folder || ''}${t.file || ''}`;
      const primaryUrl = encodeURI(rawPath);
      const fallbackUrl = encodeURI(`../METROTUNE DJ MACHINE/${rawPath}`);

      try {
        let buffer = this.sampleBuffers.get(primaryUrl);
        let isSynth = false;

        if (!buffer) {
          const result = await this.fetchAndDecodeAudio(primaryUrl, fallbackUrl, rawPath, t.category);
          buffer = result.buffer;
          isSynth = result.isSynthetic;
          if (!isSynth) {
            this.sampleBuffers.set(primaryUrl, buffer);
          }
        }

        if (isSynth) syntheticCount++;

        if (this.tracks[i]) {
          this.tracks[i].name = t.name;
          this.tracks[i].category = t.category;
          this.tracks[i].choke = t.choke || 0;
          this.tracks[i].path = rawPath;
          this.tracks[i].loadedBuffer = buffer;
          this.tracks[i].isSynthetic = isSynth;
          this.tracks[i].duration = buffer ? buffer.duration : 0;
        }
      } catch (err) {
        console.warn(`[AudioEngine] Falling back to synthesis for ${t.name}:`, err);
        syntheticCount++;
        const synthBuffer = this.generateSyntheticSample(t.category);
        if (this.tracks[i]) {
          this.tracks[i].loadedBuffer = synthBuffer;
          this.tracks[i].isSynthetic = true;
          this.tracks[i].duration = synthBuffer.duration;
        }
      }

      loaded++;
      if (this.onLoadProgress) {
        this.onLoadProgress(loaded, total, t.name, syntheticCount);
      }
    });

    await Promise.all(promises);
  }

  /**
   * Loads an entire folder of samples selected by user via directory picker (100% offline & zero CORS)
   */
  async loadFolderSamples(fileList) {
    await this.resumeContext();
    const audioFiles = Array.from(fileList).filter(f => {
      const name = f.name.toLowerCase();
      return name.endsWith('.wav') || name.endsWith('.mp3') || name.endsWith('.ogg') || name.endsWith('.flac');
    });

    if (audioFiles.length === 0) return 0;

    let assigned = 0;
    for (const file of audioFiles) {
      const upper = file.name.toUpperCase();
      let trackIdx = -1;

      if (upper.includes('KICK')) {
        trackIdx = !this.tracks[0].customBuffer ? 0 : 1;
      } else if (upper.includes('SNARE')) {
        trackIdx = !this.tracks[2].customBuffer ? 2 : 3;
      } else if (upper.includes('CLAP')) {
        trackIdx = !this.tracks[4].customBuffer ? 4 : 5;
      } else if (upper.includes('HH') || upper.includes('HAT') || upper.includes('HIHAT')) {
        trackIdx = !this.tracks[6].customBuffer ? 6 : 7;
      } else if (upper.includes('OH') || upper.includes('OPEN')) {
        trackIdx = !this.tracks[8].customBuffer ? 8 : 9;
      } else if (upper.includes('PERC') || upper.includes('TOM')) {
        trackIdx = !this.tracks[10].customBuffer ? 10 : 11;
      } else if (upper.includes('BASS') || upper.includes('808')) {
        trackIdx = !this.tracks[12].customBuffer ? 12 : 13;
      } else if (upper.includes('FX')) {
        trackIdx = !this.tracks[14].customBuffer ? 14 : 15;
      } else {
        trackIdx = this.tracks.findIndex(t => !t.customBuffer);
      }

      if (trackIdx >= 0 && trackIdx < 16) {
        await this.loadCustomSample(trackIdx, file);
        if (this.tracks[trackIdx]) {
          this.tracks[trackIdx].isSynthetic = false;
        }
        assigned++;
      }
    }
    return assigned;
  }

  /**
   * Fetches and decodes an audio file with multiple fallback protocols and origins
   */
  async fetchAndDecodeAudio(url, fallbackUrl, rawPath, category) {
    const cleanRaw = rawPath ? rawPath.replace(/^(\.\.[\/\\])+/, '') : '';
    const candidates = [
      url,
      `http://127.0.0.1:8484/${cleanRaw}`,
      `http://localhost:8484/${cleanRaw}`,
      fallbackUrl,
      rawPath
    ].filter(Boolean);

    for (const candidate of candidates) {
      try {
        const res = await fetch(candidate);
        if (res.ok) {
          const arrayBuffer = await res.arrayBuffer();
          const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
          return { buffer: audioBuffer, isSynthetic: false };
        }
      } catch (err) {
        // Continue to next candidate
      }
    }

    // If all network/local fetches fail, return synthesized fallback
    return { buffer: this.generateSyntheticSample(category), isSynthetic: true };
  }

  /**
   * Synthesizes punchy analog drum sounds if any file fetch fails
   */
  generateSyntheticSample(category) {
    const rate = this.ctx.sampleRate;
    let duration = 0.4;
    if (category === 'bass') duration = 0.8;
    if (category === 'hihat') duration = 0.08;
    if (category === 'openhat') duration = 0.35;

    const length = Math.floor(rate * duration);
    const buffer = this.ctx.createBuffer(2, length, rate);
    const chL = buffer.getChannelData(0);
    const chR = buffer.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const t = i / rate;
      let sample = 0;

      switch (category) {
        case 'kick': {
          // Exponential frequency drop 150Hz -> 40Hz
          const freq = 45 + 110 * Math.exp(-t * 22);
          const env = Math.exp(-t * 10);
          sample = Math.sin(2 * Math.PI * freq * t) * env;
          break;
        }
        case 'snare':
        case 'clap': {
          // Noise burst + tone body
          const noise = (Math.random() * 2 - 1) * Math.exp(-t * 18);
          const tone = Math.sin(2 * Math.PI * 180 * t) * Math.exp(-t * 14);
          sample = (noise * 0.75 + tone * 0.4);
          break;
        }
        case 'hihat': {
          // Filtered high-frequency metallic noise
          const noise = (Math.random() * 2 - 1) * Math.exp(-t * 60);
          sample = noise * 0.8;
          break;
        }
        case 'openhat': {
          const noise = (Math.random() * 2 - 1) * Math.exp(-t * 12);
          sample = noise * 0.7;
          break;
        }
        case 'bass': {
          // Deep 808 sub sine
          const freq = 42 + 25 * Math.exp(-t * 8);
          const env = Math.exp(-t * 2.8);
          sample = Math.sin(2 * Math.PI * freq * t) * env;
          break;
        }
        default: {
          // Percussion / FM metallic chirp
          const fm = Math.sin(2 * Math.PI * 340 * t) * Math.exp(-t * 16);
          sample = fm * 0.7;
          break;
        }
      }

      chL[i] = sample;
      chR[i] = sample;
    }

    return buffer;
  }

  /**
   * Set custom audio buffer for a track (e.g. user drag and drop)
   */
  async loadCustomSample(trackIndex, file) {
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
    if (this.tracks[trackIndex]) {
      this.tracks[trackIndex].customBuffer = audioBuffer;
      this.tracks[trackIndex].name = file.name.replace(/\.[^/.]+$/, "").substring(0, 16);
    }
    return audioBuffer;
  }

  /**
   * Play single track voice immediately (Live MPC Pad Trigger)
   */
  triggerPad(trackIndex, velocity = 1.0) {
    this.resumeContext();
    const track = this.tracks[trackIndex];
    if (!track) return;
    this.playVoice(trackIndex, this.ctx.currentTime, velocity);

    // If recording is active, quantize strike to closest step!
    if (this.isPlaying && this.isRecording) {
      this.recordStrike(trackIndex, velocity);
    }
  }

  /**
   * Play a voice at scheduled time with channel processing, choke handling, and FX routing
   */
  playVoice(trackIndex, time, velocity = 1.0) {
    const track = this.tracks[trackIndex];
    if (!track) return;

    // Check Solo/Mute
    const hasSolo = this.tracks.some(t => t.solo);
    if (hasSolo && !track.solo) return;
    if (!hasSolo && track.mute) return;

    const buffer = track.customBuffer || track.loadedBuffer;
    if (!buffer) return;

    // Handle Choke Group
    if (track.choke > 0) {
      const existing = this.activeChokeVoices.get(track.choke) || [];
      existing.forEach(v => {
        try {
          // Fast micro-fade to avoid audio click
          v.gainNode.gain.cancelScheduledValues(time);
          v.gainNode.gain.setValueAtTime(v.gainNode.gain.value, time);
          v.gainNode.gain.linearRampToValueAtTime(0.0001, time + 0.008);
          v.source.stop(time + 0.01);
        } catch (e) {}
      });
      this.activeChokeVoices.set(track.choke, []);
    }

    // Audio buffer source node
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    // Pitch shift via playback rate: 2^(semitones / 12)
    const playbackRate = Math.pow(2, track.pitch / 12);
    source.playbackRate.setValueAtTime(Math.max(0.1, playbackRate), time);

    // Channel Gain Node
    const gainNode = this.ctx.createGain();
    const totalGain = Math.min(1.5, track.volume * velocity);
    gainNode.gain.setValueAtTime(totalGain, time);

    // Stereo Panner Node
    const panner = this.ctx.createStereoPanner();
    panner.pan.setValueAtTime(Math.max(-1, Math.min(1, track.pan)), time);

    // Connect Track Strip: source -> gain -> panner -> masterBus
    source.connect(gainNode);
    gainNode.connect(panner);
    panner.connect(this.masterBus);

    // Register active choke voice
    if (track.choke > 0) {
      const activeList = this.activeChokeVoices.get(track.choke) || [];
      activeList.push({ source, gainNode });
      this.activeChokeVoices.set(track.choke, activeList);
    }

    source.start(time);

    // Trigger visual meter event for mixer console and sequencer
    if (this.onTrackTrigger) {
      const delayMs = Math.max(0, (time - this.ctx.currentTime) * 1000);
      if (delayMs <= 8) {
        this.onTrackTrigger(trackIndex, velocity);
      } else {
        setTimeout(() => {
          if (this.onTrackTrigger) this.onTrackTrigger(trackIndex, velocity);
        }, delayMs);
      }
    }
  }

  /**
   * Lookahead Scheduler Loop (Accurate Web Audio Clock)
   */
  startScheduler() {
    this.resumeContext();
    this.isPlaying = true;
    this.currentStep = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.05;
    
    this.timerId = setInterval(() => {
      this.schedulerTick();
    }, this.lookaheadMs);
  }

  stopScheduler() {
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    // Clear choke voices
    this.activeChokeVoices.clear();
  }

  schedulerTick() {
    while (this.nextNoteTime < this.ctx.currentTime + this.scheduleHorizonSec) {
      this.scheduleStep(this.currentStep, this.nextNoteTime);
      this.advanceStep();
    }
  }

  advanceStep() {
    // Duration of 16th note in seconds
    const secondsPerBeat = 60.0 / this.bpm;
    const stepDuration = 0.25 * secondsPerBeat;

    // Swing calculation: apply delay to odd steps (1, 3, 5, 7...)
    let swingDelta = 0;
    if (this.currentStep % 2 !== 0 && this.swing > 0) {
      swingDelta = this.swing * (stepDuration * 0.5);
    }

    // Humanize micro-timing jitter
    let humanDelta = 0;
    if (this.humanize > 0) {
      humanDelta = (Math.random() * 2 - 1) * (this.humanize * 0.018);
    }

    this.nextNoteTime += stepDuration + swingDelta + humanDelta;

    // Advance step pointer
    const oldStep = this.currentStep;
    this.currentStep++;

    if (this.currentStep >= this.totalSteps) {
      this.currentStep = 0;
      // Handle song chain / pattern switching if enabled
      if (this.songChainMode && this.songChain.length > 0) {
        this.songChainIndex = (this.songChainIndex + 1) % this.songChain.length;
        this.activePatternIndex = this.songChain[this.songChainIndex];
      }
    }

    // Inform UI of current step playback (synchronized with Web Audio currentTime)
    if (this.onStepChange) {
      const stepToHighlight = oldStep;
      const delayMs = Math.max(0, (this.nextNoteTime - this.ctx.currentTime) * 1000);
      setTimeout(() => {
        if (this.isPlaying && this.onStepChange) {
          this.onStepChange(stepToHighlight, this.activePatternIndex);
        }
      }, delayMs);
    }
  }

  scheduleStep(stepIndex, time) {
    const activePattern = this.patterns[this.activePatternIndex];
    if (!activePattern) return;

    for (let trackIdx = 0; trackIdx < this.tracks.length; trackIdx++) {
      const trackSteps = activePattern[trackIdx];
      if (trackSteps && trackSteps[stepIndex] > 0) {
        let vel = trackSteps[stepIndex];
        // Humanize velocity
        if (this.humanize > 0) {
          vel += (Math.random() * 2 - 1) * (this.humanize * 0.15);
          vel = Math.max(0.15, Math.min(1.0, vel));
        }
        this.playVoice(trackIdx, time, vel);
      }
    }
  }

  /**
   * Quantizes live pad tap during record mode into active pattern
   */
  recordStrike(trackIndex, velocity) {
    const activePattern = this.patterns[this.activePatternIndex];
    if (!activePattern || !activePattern[trackIndex]) return;
    
    // Find closest step in current pattern
    const step = this.currentStep % this.totalSteps;
    activePattern[trackIndex][step] = Math.max(0.4, velocity);
  }

  /**
   * Toggle or set Step in current Pattern
   * Cycles: 0 -> 0.8 (Normal) -> 1.0 (Accent) -> 0.4 (Soft) -> 0 (Off)
   */
  cycleStep(trackIndex, stepIndex) {
    const pattern = this.patterns[this.activePatternIndex];
    if (!pattern || !pattern[trackIndex]) return 0;
    const current = pattern[trackIndex][stepIndex] || 0;

    let next = 0;
    if (current === 0) next = 0.8;
    else if (current <= 0.5) next = 0;
    else if (current <= 0.85) next = 1.0;
    else next = 0.4;

    pattern[trackIndex][stepIndex] = next;
    return next;
  }

  setStepVelocity(trackIndex, stepIndex, velocity) {
    const pattern = this.patterns[this.activePatternIndex];
    if (!pattern || !pattern[trackIndex]) return;
    pattern[trackIndex][stepIndex] = velocity;
  }

  clearActivePattern() {
    this.patterns[this.activePatternIndex] = this.createEmptyPattern(this.totalSteps);
  }

  setTotalSteps(count) {
    this.totalSteps = count;
    // Resize each pattern bank to new step length
    this.patterns = this.patterns.map(p => {
      return p.map(trackArray => {
        const newArr = new Array(count).fill(0);
        for (let i = 0; i < Math.min(trackArray.length, count); i++) {
          newArr[i] = trackArray[i];
        }
        return newArr;
      });
    });
  }

  /**
   * Master FX Controls
   */
  setMasterVolume(val) {
    this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1.5, val)), this.ctx.currentTime, 0.02);
  }

  setFilter(type, freq, q) {
    this.filterNode.type = type;
    this.filterNode.frequency.setTargetAtTime(Math.max(20, Math.min(20000, freq)), this.ctx.currentTime, 0.02);
    this.filterNode.Q.setTargetAtTime(Math.max(0.1, Math.min(25, q)), this.ctx.currentTime, 0.02);
  }

  setDistortion(drive, mix = 0.5) {
    this.distortionNode.curve = this.makeDistortionCurve(drive);
    const wet = Math.max(0, Math.min(1, mix));
    this.distortionWet.gain.setTargetAtTime(wet, this.ctx.currentTime, 0.02);
    this.distortionDry.gain.setTargetAtTime(1.0 - wet * 0.5, this.ctx.currentTime, 0.02);
  }

  setDelay(timeSec, feedback, mix) {
    this.delayNode.delayTime.setTargetAtTime(Math.max(0.01, Math.min(1.8, timeSec)), this.ctx.currentTime, 0.02);
    this.delayFeedback.gain.setTargetAtTime(Math.max(0, Math.min(0.9, feedback)), this.ctx.currentTime, 0.02);
    const wet = Math.max(0, Math.min(1, mix));
    this.delayWet.gain.setTargetAtTime(wet, this.ctx.currentTime, 0.02);
    this.delayDry.gain.setTargetAtTime(1.0, this.ctx.currentTime, 0.02);
  }

  setReverb(decaySec, mix) {
    if (decaySec) {
      this.reverbNode.buffer = this.generateImpulseResponse(decaySec, 2.0);
    }
    const wet = Math.max(0, Math.min(1, mix));
    this.reverbWet.gain.setTargetAtTime(wet, this.ctx.currentTime, 0.02);
    this.reverbDry.gain.setTargetAtTime(1.0, this.ctx.currentTime, 0.02);
  }

  setCompressor(threshold, ratio) {
    this.compressor.threshold.setTargetAtTime(threshold, this.ctx.currentTime, 0.02);
    this.compressor.ratio.setTargetAtTime(ratio, this.ctx.currentTime, 0.02);
  }

  /**
   * Offline Rendering & WAV Export
   * Renders the current pattern loop into a high-fidelity stereo WAV file
   */
  async renderPatternToWAV(bars = 2) {
    await this.resumeContext();
    const secondsPerBeat = 60.0 / this.bpm;
    const stepDuration = 0.25 * secondsPerBeat;
    const totalStepsToRender = this.totalSteps * bars;
    const duration = totalStepsToRender * stepDuration + 1.5; // Include release tail

    const OfflineCtx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    const offlineCtx = new OfflineCtx(2, Math.ceil(this.ctx.sampleRate * duration), this.ctx.sampleRate);

    // Offline Master Bus & FX
    const offMasterBus = offlineCtx.createGain();
    const offFilter = offlineCtx.createBiquadFilter();
    offFilter.type = this.filterNode.type;
    offFilter.frequency.value = this.filterNode.frequency.value;
    offFilter.Q.value = this.filterNode.Q.value;

    const offComp = offlineCtx.createDynamicsCompressor();
    offComp.threshold.value = this.compressor.threshold.value;
    offComp.ratio.value = this.compressor.ratio.value;

    const offMasterGain = offlineCtx.createGain();
    offMasterGain.gain.value = this.masterGain.gain.value;

    offMasterBus.connect(offFilter);
    offFilter.connect(offComp);
    offComp.connect(offMasterGain);
    offMasterGain.connect(offlineCtx.destination);

    // Schedule all steps offline
    let offTime = 0.0;
    const pattern = this.patterns[this.activePatternIndex];

    for (let step = 0; step < totalStepsToRender; step++) {
      const patternStep = step % this.totalSteps;

      for (let t = 0; t < this.tracks.length; t++) {
        const track = this.tracks[t];
        const vel = pattern[t] ? pattern[t][patternStep] : 0;
        const buffer = track.customBuffer || track.loadedBuffer;

        if (vel > 0 && buffer) {
          const src = offlineCtx.createBufferSource();
          src.buffer = buffer;
          src.playbackRate.value = Math.pow(2, track.pitch / 12);

          const trackGain = offlineCtx.createGain();
          trackGain.gain.value = track.volume * vel;

          const panner = offlineCtx.createStereoPanner();
          panner.pan.value = track.pan;

          src.connect(trackGain);
          trackGain.connect(panner);
          panner.connect(offMasterBus);

          src.start(offTime);
        }
      }

      let swingDelta = 0;
      if (patternStep % 2 !== 0 && this.swing > 0) {
        swingDelta = this.swing * (stepDuration * 0.5);
      }
      offTime += stepDuration + swingDelta;
    }

    const renderedBuffer = await offlineCtx.startRendering();
    return this.audioBufferToWavBlob(renderedBuffer);
  }

  /**
   * Convert Web Audio AudioBuffer to 16-bit PCM stereo WAV Blob
   */
  audioBufferToWavBlob(buffer) {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2 + 44;
    const out = new DataView(new ArrayBuffer(length));
    const channels = [];
    let sampleRate = buffer.sampleRate;
    let offset = 0;
    let pos = 0;

    function setUint16(data) {
      out.setUint16(pos, data, true);
      pos += 2;
    }

    function setUint32(data) {
      out.setUint32(pos, data, true);
      pos += 4;
    }

    // Write WAV header (RIFF chunk)
    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8);  // file length - 8
    setUint32(0x45564157); // "WAVE"

    // "fmt " sub-chunk
    setUint32(0x20746d66); // "fmt "
    setUint32(16);         // 16 for PCM
    setUint16(1);          // Linear PCM
    setUint16(numOfChan);
    setUint32(sampleRate);
    setUint32(sampleRate * 2 * numOfChan); // byte rate
    setUint16(numOfChan * 2);              // block align
    setUint16(16);                         // 16-bit

    // "data" sub-chunk
    setUint32(0x61746164); // "data"
    setUint32(length - pos - 4);

    for (let i = 0; i < buffer.numberOfChannels; i++) {
      channels.push(buffer.getChannelData(i));
    }

    // Write interleaved 16-bit PCM samples
    while (offset < buffer.length) {
      for (let i = 0; i < numOfChan; i++) {
        let sample = Math.max(-1, Math.min(1, channels[i][offset]));
        // Scale to 16-bit signed integer
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        out.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }

    return new Blob([out.buffer], { type: 'audio/wav' });
  }
}
