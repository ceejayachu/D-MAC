/**
 * DRUM MACHINE APPLICATION CONTROLLER
 * Connects UI elements, sequencer matrix, MPC pads, DSP rack,
 * and audio engine.
 */

import { AudioEngine } from './audio-engine.js';
import { DRUM_KITS, CATEGORY_COLORS, KEYBOARD_MAP, FACTORY_PRESETS } from './presets.js';

class DrumMachineApp {
  constructor() {
    this.engine = new AudioEngine();
    this.activeKit = DRUM_KITS[0];
    this.selectedTrackIndex = 0; // For track details drawer
    this.currentPage = 0; // 0=Steps 1-16, 1=Steps 17-32, etc.
    this.currentView = 'sequencer'; // 'sequencer' or 'mixer'
    this.tapTimes = [];

    this.initDOM();
    this.bindEvents();
    this.initVisualizer();
    this.loadInitialKit();

    const savedTheme = localStorage.getItem('metrotune_drum_theme') || 'shiny';
    this.setTheme(savedTheme);
  }

  setView(mode) {
    this.currentView = mode;
    if (mode === 'mixer') {
      if (this.sequencerView) this.sequencerView.style.display = 'none';
      if (this.mixerView) this.mixerView.style.display = 'flex';
      if (this.btnViewSequencer) this.btnViewSequencer.classList.remove('active');
      if (this.btnViewMixer) this.btnViewMixer.classList.add('active');
      this.renderMixerView();
    } else {
      if (this.sequencerView) this.sequencerView.style.display = 'grid';
      if (this.mixerView) this.mixerView.style.display = 'none';
      if (this.btnViewSequencer) this.btnViewSequencer.classList.add('active');
      if (this.btnViewMixer) this.btnViewMixer.classList.remove('active');
    }
  }

  setTheme(themeName) {
    this.currentTheme = themeName;
    document.body.dataset.theme = themeName;
    try {
      localStorage.setItem('metrotune_drum_theme', themeName);
    } catch (e) {}
    if (this.themeSelect) {
      this.themeSelect.value = themeName;
    }
  }

  initDOM() {
    // Top Transport
    this.btnPlay = document.getElementById('btnPlay');
    this.btnStop = document.getElementById('btnStop');
    this.btnRecord = document.getElementById('btnRecord');
    this.btnTapTempo = document.getElementById('btnTapTempo');
    this.sliderBpm = document.getElementById('sliderBpm');
    this.valBpm = document.getElementById('valBpm');
    this.sliderSwing = document.getElementById('sliderSwing');
    this.valSwing = document.getElementById('valSwing');
    this.sliderHumanize = document.getElementById('sliderHumanize');
    this.valHumanize = document.getElementById('valHumanize');

    this.themeSelect = document.getElementById('themeSelect');
    this.kitSelect = document.getElementById('kitSelect');
    this.presetSelect = document.getElementById('presetSelect');
    this.btnClearPattern = document.getElementById('btnClearPattern');
    this.btnExportWav = document.getElementById('btnExportWav');
    this.btnSaveJson = document.getElementById('btnSaveJson');
    this.btnLoadJson = document.getElementById('btnLoadJson');
    this.fileJsonInput = document.getElementById('fileJsonInput');
    this.btnLoadFolder = document.getElementById('btnLoadFolder');
    this.folderInput = document.getElementById('folderInput');
    this.sampleStatusText = document.getElementById('sampleStatusText');
    this.sampleStatusBadge = document.getElementById('sampleStatusBadge');

    // View Mode Switcher
    this.btnViewSequencer = document.getElementById('btnViewSequencer');
    this.btnViewMixer = document.getElementById('btnViewMixer');
    this.sequencerView = document.getElementById('sequencerView');
    this.mixerView = document.getElementById('mixerView');

    // Mixer Console Elements
    this.mixerStrips = document.getElementById('mixerStrips');
    this.mixerMasterFader = document.getElementById('mixerMasterFader');
    this.mixerMasterVal = document.getElementById('mixerMasterVal');
    this.btnMasterMute = document.getElementById('btnMasterMute');
    this.mixerMasterMeterL = document.getElementById('mixerMasterMeterL');
    this.mixerMasterMeterR = document.getElementById('mixerMasterMeterR');
    this.btnMixerResetLevels = document.getElementById('btnMixerResetLevels');
    this.btnMixerZeroPans = document.getElementById('btnMixerZeroPans');
    this.btnMixerUnmuteAll = document.getElementById('btnMixerUnmuteAll');
    this.btnMixerClearSolos = document.getElementById('btnMixerClearSolos');

    // Pattern Bank Buttons
    this.bankButtons = document.querySelectorAll('.btn-bank');
    this.btnChainMode = document.getElementById('btnChainMode');

    // Page Buttons
    this.pageButtons = document.querySelectorAll('.btn-page');
    this.stepResolution = document.getElementById('stepResolution');

    // Containers
    this.mpcGrid = document.getElementById('mpcGrid');
    this.stepMatrix = document.getElementById('stepMatrix');
    this.ledRow = document.getElementById('ledRow');
    this.trackDrawer = document.getElementById('trackDrawer');

    // Visualizer Canvas & VU
    this.canvas = document.getElementById('oscilloscope');
    this.canvasCtx = this.canvas.getContext('2d');
    this.vuFillL = document.getElementById('vuFillL');
    this.vuFillR = document.getElementById('vuFillR');

    // Master FX Sliders
    this.fxFilterType = document.getElementById('fxFilterType');
    this.fxFilterCutoff = document.getElementById('fxFilterCutoff');
    this.fxFilterRes = document.getElementById('fxFilterRes');
    this.fxDistDrive = document.getElementById('fxDistDrive');
    this.fxDistMix = document.getElementById('fxDistMix');
    this.fxDelayTime = document.getElementById('fxDelayTime');
    this.fxDelayFeedback = document.getElementById('fxDelayFeedback');
    this.fxDelayMix = document.getElementById('fxDelayMix');
    this.fxReverbDecay = document.getElementById('fxReverbDecay');
    this.fxReverbMix = document.getElementById('fxReverbMix');
    this.masterVol = document.getElementById('masterVol');

    // Populate Kits in Select
    DRUM_KITS.forEach(k => {
      const opt = document.createElement('option');
      opt.value = k.id;
      opt.textContent = k.name;
      this.kitSelect.appendChild(opt);
    });

    // Populate Factory Presets
    FACTORY_PRESETS.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${p.genre}: ${p.name}`;
      this.presetSelect.appendChild(opt);
    });
  }

  bindEvents() {
    // Transport Play / Stop / Record
    this.btnPlay.addEventListener('click', () => this.togglePlay());
    this.btnStop.addEventListener('click', () => this.stopPlay());
    this.btnRecord.addEventListener('click', () => this.toggleRecord());

    // Tap Tempo
    this.btnTapTempo.addEventListener('click', () => this.handleTapTempo());

    // Tempo Slider
    this.sliderBpm.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      this.engine.bpm = val;
      this.valBpm.textContent = val;
    });

    // Swing Slider
    this.sliderSwing.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      this.engine.swing = val / 100.0;
      this.valSwing.textContent = `${val}%`;
    });

    // Humanize Slider
    this.sliderHumanize.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      this.engine.humanize = val / 100.0;
      this.valHumanize.textContent = `${val}%`;
    });

    // Theme Switcher
    if (this.themeSelect) {
      this.themeSelect.addEventListener('change', (e) => {
        this.setTheme(e.target.value);
      });
    }

    // Kit Switcher
    this.kitSelect.addEventListener('change', (e) => {
      const kit = DRUM_KITS.find(k => k.id === e.target.value);
      if (kit) this.loadKit(kit);
    });

    // Preset Switcher
    this.presetSelect.addEventListener('change', (e) => {
      const preset = FACTORY_PRESETS.find(p => p.id === e.target.value);
      if (preset) this.loadPreset(preset);
    });

    // Bank Buttons (A, B, C, D)
    this.bankButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const bankIdx = parseInt(e.target.dataset.bank, 10);
        this.selectPatternBank(bankIdx);
      });
    });

    // Song Chain Mode Toggle
    if (this.btnChainMode) {
      this.btnChainMode.addEventListener('click', () => {
        this.engine.songChainMode = !this.engine.songChainMode;
        this.btnChainMode.classList.toggle('active', this.engine.songChainMode);
      });
    }

    // Step Resolution (16, 32, 48, 64)
    this.stepResolution.addEventListener('change', (e) => {
      const steps = parseInt(e.target.value, 10);
      this.engine.setTotalSteps(steps);
      this.updatePageButtons();
      this.renderSequencerMatrix();
    });

    // Page Buttons
    this.pageButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pageIdx = parseInt(e.target.dataset.page, 10);
        this.selectPage(pageIdx);
      });
    });

    // Clear Pattern
    this.btnClearPattern.addEventListener('click', () => {
      if (confirm('Clear the current pattern?')) {
        this.engine.clearActivePattern();
        this.renderSequencerMatrix();
      }
    });

    // Export WAV
    this.btnExportWav.addEventListener('click', async () => {
      const originalText = this.btnExportWav.innerHTML;
      this.btnExportWav.innerHTML = 'Rendering WAV...';
      try {
        const wavBlob = await this.engine.renderPatternToWAV(2);
        const url = URL.createObjectURL(wavBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `drum-loop-${this.activeKit.id}-${this.engine.bpm}bpm.wav`;
        a.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        alert('Failed to render WAV: ' + err.message);
      } finally {
        this.btnExportWav.innerHTML = originalText;
      }
    });

    // Save JSON
    this.btnSaveJson.addEventListener('click', () => {
      const project = {
        version: '1.0',
        kitId: this.activeKit.id,
        bpm: this.engine.bpm,
        swing: this.engine.swing,
        humanize: this.engine.humanize,
        totalSteps: this.engine.totalSteps,
        patterns: this.engine.patterns,
        tracks: this.engine.tracks.map(t => ({
          volume: t.volume,
          pan: t.pan,
          pitch: t.pitch,
          mute: t.mute,
          solo: t.solo,
          choke: t.choke
        }))
      };
      const blob = new Blob([JSON.stringify(project, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `drum-machine-pattern-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    // Load JSON
    this.btnLoadJson.addEventListener('click', () => this.fileJsonInput.click());
    this.fileJsonInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const project = JSON.parse(ev.target.result);
          this.loadProject(project);
        } catch (err) {
          alert('Invalid JSON project file.');
        }
      };
      reader.readAsText(file);
    });

    // Master FX Listeners
    this.bindMasterFX();

    // Unlock AudioContext on very first user interaction
    const unlockAudio = () => {
      this.engine.resumeContext();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('click', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
    window.addEventListener('click', unlockAudio, { once: true });

    // View Switcher Buttons
    if (this.btnViewSequencer) {
      this.btnViewSequencer.addEventListener('click', () => this.setView('sequencer'));
    }
    if (this.btnViewMixer) {
      this.btnViewMixer.addEventListener('click', () => this.setView('mixer'));
    }

    // Mixer Console Header Actions
    if (this.btnMixerResetLevels) {
      this.btnMixerResetLevels.addEventListener('click', () => {
        this.engine.tracks.forEach(t => { t.volume = 0.85; });
        this.renderMixerView();
        this.renderTrackDrawer(this.selectedTrackIndex);
      });
    }
    if (this.btnMixerZeroPans) {
      this.btnMixerZeroPans.addEventListener('click', () => {
        this.engine.tracks.forEach(t => { t.pan = 0.0; });
        this.renderMixerView();
        this.renderTrackDrawer(this.selectedTrackIndex);
      });
    }
    if (this.btnMixerUnmuteAll) {
      this.btnMixerUnmuteAll.addEventListener('click', () => {
        this.engine.tracks.forEach(t => { t.mute = false; });
        this.renderMixerView();
        this.renderSequencerMatrix();
      });
    }
    if (this.btnMixerClearSolos) {
      this.btnMixerClearSolos.addEventListener('click', () => {
        this.engine.tracks.forEach(t => { t.solo = false; });
        this.renderMixerView();
        this.renderSequencerMatrix();
      });
    }

    // Master Fader in Mixer Console
    if (this.mixerMasterFader) {
      this.mixerMasterFader.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.engine.setMasterVolume(val);
        if (this.mixerMasterVal) this.mixerMasterVal.textContent = `${Math.round(val * 100)}%`;
        if (this.masterVol) this.masterVol.value = val;
        const dspVal = document.getElementById('valMasterVol');
        if (dspVal) dspVal.textContent = `${Math.round(val * 100)}%`;
      });
    }

    // Master Mute in Mixer Console
    if (this.btnMasterMute) {
      let isMuted = false;
      let prevVol = 0.85;
      this.btnMasterMute.addEventListener('click', () => {
        isMuted = !isMuted;
        this.btnMasterMute.classList.toggle('active', isMuted);
        if (isMuted) {
          prevVol = this.engine.masterGain.gain.value;
          this.engine.setMasterVolume(0);
          if (this.mixerMasterFader) this.mixerMasterFader.value = 0;
          if (this.mixerMasterVal) this.mixerMasterVal.textContent = 'MUTE';
        } else {
          this.engine.setMasterVolume(prevVol);
          if (this.mixerMasterFader) this.mixerMasterFader.value = prevVol;
          if (this.mixerMasterVal) this.mixerMasterVal.textContent = `${Math.round(prevVol * 100)}%`;
        }
      });
    }

    // Keyboard Hotkeys
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

      // Spacebar toggles play
      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePlay();
        return;
      }

      // 'M' toggles Mixer View, 'S' toggles Sequencer View
      if (e.key === 'm' || e.key === 'M') {
        this.setView(this.currentView === 'mixer' ? 'sequencer' : 'mixer');
        return;
      }
      if (e.key === 's' || e.key === 'S') {
        this.setView('sequencer');
        return;
      }

      // 'R' toggles record
      if (e.key === 'r' || e.key === 'R') {
        this.toggleRecord();
        return;
      }

      // MPC Pad Hotkeys
      const mapping = KEYBOARD_MAP.find(m => m.key.toLowerCase() === e.key.toLowerCase());
      if (mapping) {
        e.preventDefault();
        this.triggerPadUI(mapping.trackIndex);
      }
    });

    // Folder Picker
    if (this.btnLoadFolder && this.folderInput) {
      this.btnLoadFolder.addEventListener('click', () => this.folderInput.click());
      this.folderInput.addEventListener('change', async (e) => {
        if (e.target.files && e.target.files.length > 0) {
          if (this.sampleStatusText) {
            this.sampleStatusText.textContent = `LOADING SAMPLES FROM FOLDER (${e.target.files.length} FILES)...`;
            this.sampleStatusText.style.color = '#ffaa00';
          }
          const loaded = await this.engine.loadFolderSamples(e.target.files);
          this.renderPads();
          this.renderSequencerMatrix();
          this.renderTrackDrawer(this.selectedTrackIndex);
          if (this.sampleStatusText) {
            this.sampleStatusText.textContent = `${loaded} SAMPLES LOADED DIRECTLY (WAV)`;
            this.sampleStatusText.style.color = '#00ff88';
          }
        }
      });
    }

    // Scheduler Step Callback
    this.engine.onStepChange = (stepIndex, patternIndex) => {
      this.highlightStep(stepIndex);
    };

    // Engine Sample Load Progress Callback
    this.engine.onLoadProgress = (loaded, total, sampleName, syntheticCount = 0) => {
      if (this.sampleStatusText) {
        if (loaded < total) {
          this.sampleStatusText.textContent = `LOADING KIT: ${loaded}/${total} (${sampleName})`;
          this.sampleStatusText.style.color = '#ffcc00';
          if (this.sampleStatusBadge) {
            this.sampleStatusBadge.style.borderColor = 'var(--accent-orange)';
            this.sampleStatusBadge.style.background = 'rgba(255, 170, 0, 0.1)';
          }
        } else {
          if (syntheticCount > 0) {
            this.sampleStatusText.textContent = `${total - syntheticCount}/${total} WAVS LOADED (${syntheticCount} SYNTH - USE 'LOAD SAMPLES FOLDER')`;
            this.sampleStatusText.style.color = '#ffaa00';
            if (this.sampleStatusBadge) {
              this.sampleStatusBadge.style.borderColor = 'var(--accent-orange)';
              this.sampleStatusBadge.style.background = 'rgba(255, 170, 0, 0.15)';
            }
          } else {
            this.sampleStatusText.textContent = `KIT READY: ${total}/${total} STUDIO WAV SAMPLES`;
            this.sampleStatusText.style.color = '#00ff88';
            if (this.sampleStatusBadge) {
              this.sampleStatusBadge.style.borderColor = 'var(--accent-green)';
              this.sampleStatusBadge.style.background = 'rgba(0, 255, 136, 0.12)';
            }
          }
        }
      }
    };

    // Live Channel Meter Trigger Callback (Mixer Console & CUE Audition)
    this.engine.onTrackTrigger = (trackIndex, velocity) => {
      // 1. Channel Peak Meter bounce in Mixer View
      const meterFill = document.getElementById(`mixerMeter-${trackIndex}`);
      if (meterFill) {
        const track = this.engine.tracks[trackIndex];
        const gainFactor = track ? (track.volume / 0.85) : 1.0;
        const pct = Math.min(100, Math.max(12, Math.round(velocity * gainFactor * 96)));
        meterFill.style.height = `${pct}%`;
        setTimeout(() => {
          if (meterFill) meterFill.style.height = '0%';
        }, 120);
      }

      // 2. Mixer Cue button flash
      const cueBtn = document.getElementById(`mixerCue-${trackIndex}`);
      if (cueBtn) {
        cueBtn.classList.add('hit');
        setTimeout(() => cueBtn.classList.remove('hit'), 100);
      }

      // 3. Master VU bounce in mixer console
      if (this.mixerMasterMeterL && this.mixerMasterMeterR) {
        const mPct = Math.min(100, Math.round(velocity * (this.engine.masterGain ? this.engine.masterGain.gain.value : 0.85) * 92));
        this.mixerMasterMeterL.style.height = `${mPct}%`;
        this.mixerMasterMeterR.style.height = `${Math.round(mPct * 0.95)}%`;
        setTimeout(() => {
          if (this.mixerMasterMeterL) this.mixerMasterMeterL.style.height = '0%';
          if (this.mixerMasterMeterR) this.mixerMasterMeterR.style.height = '0%';
        }, 140);
      }
    };
  }

  bindMasterFX() {
    // Filter
    this.fxFilterType.addEventListener('change', (e) => {
      this.engine.setFilter(e.target.value, parseFloat(this.fxFilterCutoff.value), parseFloat(this.fxFilterRes.value));
    });
    this.fxFilterCutoff.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      document.getElementById('valFilterCutoff').textContent = `${Math.round(val)} Hz`;
      this.engine.setFilter(this.fxFilterType.value, val, parseFloat(this.fxFilterRes.value));
    });
    this.fxFilterRes.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      document.getElementById('valFilterRes').textContent = `Q ${val.toFixed(1)}`;
      this.engine.setFilter(this.fxFilterType.value, parseFloat(this.fxFilterCutoff.value), val);
    });

    // Distortion
    this.fxDistDrive.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      document.getElementById('valDistDrive').textContent = `${Math.round(val)}`;
      this.engine.setDistortion(val, parseFloat(this.fxDistMix.value) / 100);
    });
    this.fxDistMix.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      document.getElementById('valDistMix').textContent = `${Math.round(val)}%`;
      this.engine.setDistortion(parseFloat(this.fxDistDrive.value), val / 100);
    });

    // Delay
    this.fxDelayTime.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      document.getElementById('valDelayTime').textContent = `${Math.round(val * 1000)}ms`;
      this.engine.setDelay(val, parseFloat(this.fxDelayFeedback.value) / 100, parseFloat(this.fxDelayMix.value) / 100);
    });
    this.fxDelayFeedback.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      document.getElementById('valDelayFeedback').textContent = `${Math.round(val)}%`;
      this.engine.setDelay(parseFloat(this.fxDelayTime.value), val / 100, parseFloat(this.fxDelayMix.value) / 100);
    });
    this.fxDelayMix.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      document.getElementById('valDelayMix').textContent = `${Math.round(val)}%`;
      this.engine.setDelay(parseFloat(this.fxDelayTime.value), parseFloat(this.fxDelayFeedback.value) / 100, val / 100);
    });

    // Reverb
    this.fxReverbDecay.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      document.getElementById('valReverbDecay').textContent = `${val.toFixed(1)}s`;
      this.engine.setReverb(val, parseFloat(this.fxReverbMix.value) / 100);
    });
    this.fxReverbMix.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      document.getElementById('valReverbMix').textContent = `${Math.round(val)}%`;
      this.engine.setReverb(null, val / 100);
    });

    // Master Volume
    this.masterVol.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      document.getElementById('valMasterVol').textContent = `${Math.round(val * 100)}%`;
      this.engine.setMasterVolume(val);
    });
  }

  async loadInitialKit() {
    this.engine.setTrackConfig(this.activeKit.tracks);
    this.renderMixerView();
    await this.engine.loadKitSamples(this.activeKit);
    this.renderMixerView();
    
    // Load default preset 0
    this.loadPreset(FACTORY_PRESETS[0]);
  }

  async loadKit(kit) {
    this.activeKit = kit;
    this.engine.setTrackConfig(kit.tracks);
    this.renderPads();
    this.renderSequencerMatrix();
    this.renderTrackDrawer(this.selectedTrackIndex);
    this.renderMixerView();
    await this.engine.loadKitSamples(kit);
    this.renderPads();
    this.renderSequencerMatrix();
    this.renderMixerView();
  }

  loadPreset(preset) {
    this.engine.bpm = preset.bpm;
    this.sliderBpm.value = preset.bpm;
    this.valBpm.textContent = preset.bpm;

    this.engine.swing = preset.swing;
    this.sliderSwing.value = Math.round(preset.swing * 100);
    this.valSwing.textContent = `${Math.round(preset.swing * 100)}%`;

    this.engine.setTotalSteps(preset.stepsCount || 16);
    this.stepResolution.value = preset.stepsCount || 16;
    this.updatePageButtons();

    // Find and switch kit if preset specifies kitId
    if (preset.kitId && preset.kitId !== this.activeKit.id) {
      const kit = DRUM_KITS.find(k => k.id === preset.kitId);
      if (kit) {
        this.activeKit = kit;
        this.kitSelect.value = kit.id;
        this.loadKit(kit);
      }
    }

    // Assign track step data to active pattern
    this.engine.patterns[this.engine.activePatternIndex] = this.engine.createEmptyPattern(this.engine.totalSteps);
    const activePat = this.engine.patterns[this.engine.activePatternIndex];

    for (let t = 0; t < preset.tracks.length; t++) {
      if (activePat[t]) {
        for (let s = 0; s < Math.min(activePat[t].length, preset.tracks[t].length); s++) {
          activePat[t][s] = preset.tracks[t][s];
        }
      }
    }

    this.renderPads();
    this.renderSequencerMatrix();
    this.renderTrackDrawer(this.selectedTrackIndex);
  }

  loadProject(project) {
    if (project.bpm) {
      this.engine.bpm = project.bpm;
      this.sliderBpm.value = project.bpm;
      this.valBpm.textContent = project.bpm;
    }
    if (project.swing !== undefined) {
      this.engine.swing = project.swing;
      this.sliderSwing.value = Math.round(project.swing * 100);
      this.valSwing.textContent = `${Math.round(project.swing * 100)}%`;
    }
    if (project.totalSteps) {
      this.engine.setTotalSteps(project.totalSteps);
      this.stepResolution.value = project.totalSteps;
      this.updatePageButtons();
    }
    if (project.patterns) {
      this.engine.patterns = project.patterns;
    }
    if (project.kitId) {
      const kit = DRUM_KITS.find(k => k.id === project.kitId);
      if (kit) {
        this.activeKit = kit;
        this.kitSelect.value = kit.id;
        this.loadKit(kit);
      }
    }
    this.renderSequencerMatrix();
    this.renderTrackDrawer(this.selectedTrackIndex);
  }

  togglePlay() {
    if (this.engine.isPlaying) {
      this.stopPlay();
    } else {
      this.engine.startScheduler();
      this.btnPlay.classList.add('active');
      this.btnPlay.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> PAUSE';
    }
  }

  stopPlay() {
    this.engine.stopScheduler();
    this.btnPlay.classList.remove('active');
    this.btnPlay.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> PLAY';
    this.clearPlayheadHighlight();
  }

  toggleRecord() {
    this.engine.isRecording = !this.engine.isRecording;
    this.btnRecord.classList.toggle('active', this.engine.isRecording);
  }

  handleTapTempo() {
    const now = performance.now();
    this.tapTimes.push(now);
    if (this.tapTimes.length > 4) {
      this.tapTimes.shift();
    }
    if (this.tapTimes.length >= 2) {
      let diffSum = 0;
      for (let i = 1; i < this.tapTimes.length; i++) {
        diffSum += this.tapTimes[i] - this.tapTimes[i - 1];
      }
      const avgDiff = diffSum / (this.tapTimes.length - 1);
      const calculatedBpm = Math.round(60000 / avgDiff);
      if (calculatedBpm >= 40 && calculatedBpm <= 240) {
        this.engine.bpm = calculatedBpm;
        this.sliderBpm.value = calculatedBpm;
        this.valBpm.textContent = calculatedBpm;
      }
    }
  }

  selectPatternBank(bankIdx) {
    this.engine.activePatternIndex = bankIdx;
    this.bankButtons.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.bank, 10) === bankIdx);
    });
    this.renderSequencerMatrix();
  }

  selectPage(pageIdx) {
    this.currentPage = pageIdx;
    this.pageButtons.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.page, 10) === pageIdx);
    });
    this.renderSequencerMatrix();
  }

  updatePageButtons() {
    const pagesNeeded = Math.ceil(this.engine.totalSteps / 16);
    this.pageButtons.forEach((btn, idx) => {
      btn.style.display = idx < pagesNeeded ? 'inline-block' : 'none';
    });
    if (this.currentPage >= pagesNeeded) {
      this.selectPage(0);
    }
  }

  /**
   * Render the 16 MPC Performance Pads Grid (4x4)
   */
  renderPads() {
    this.mpcGrid.innerHTML = '';

    for (let i = 0; i < 16; i++) {
      const track = this.engine.tracks[i];
      const cat = track ? track.category : 'perc';
      const catStyle = CATEGORY_COLORS[cat] || { bg: '#00e5ff', glow: 'rgba(0,229,255,0.5)', label: 'PERC' };
      const keyMap = KEYBOARD_MAP.find(m => m.trackIndex === i);
      const keyLetter = keyMap ? keyMap.key.toUpperCase() : '';

      const pad = document.createElement('button');
      pad.className = 'drum-pad';
      pad.id = `pad-${i}`;
      pad.style.setProperty('--pad-color', catStyle.bg);
      pad.style.setProperty('--pad-glow', catStyle.glow);

      pad.innerHTML = `
        <div class="pad-key">${keyLetter}</div>
        <div class="pad-label">${track ? track.name : `Track ${i + 1}`}</div>
        <div class="pad-category">${catStyle.label}</div>
      `;

      pad.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.triggerPadUI(i);
      });

      // Allow dragging custom audio onto pad!
      pad.addEventListener('dragover', (e) => {
        e.preventDefault();
        pad.style.borderColor = '#00ff88';
      });
      pad.addEventListener('dragleave', () => {
        pad.style.borderColor = '';
      });
      pad.addEventListener('drop', async (e) => {
        e.preventDefault();
        pad.style.borderColor = '';
        if (e.dataTransfer.files.length > 0) {
          const file = e.dataTransfer.files[0];
          await this.engine.loadCustomSample(i, file);
          this.renderPads();
          this.renderSequencerMatrix();
          this.renderTrackDrawer(this.selectedTrackIndex);
        }
      });

      this.mpcGrid.appendChild(pad);
    }
  }

  triggerPadUI(trackIndex) {
    this.engine.triggerPad(trackIndex, 1.0);
    const pad = document.getElementById(`pad-${trackIndex}`);
    if (pad) {
      pad.classList.add('hit');
      setTimeout(() => pad.classList.remove('hit'), 120);
    }
  }

  /**
   * Render the 16 Instrument Sequencer Tracks & Matrix
   */
  renderSequencerMatrix() {
    const stepOffset = this.currentPage * 16;
    const currentPattern = this.engine.patterns[this.engine.activePatternIndex];

    // Render Playhead LED Row
    this.ledRow.innerHTML = '<span class="control-label" style="font-size: 10px; color: var(--text-dim);">STEPS</span>';
    for (let s = 0; s < 16; s++) {
      const globalStep = stepOffset + s;
      const isBeat = globalStep % 4 === 0;
      const led = document.createElement('div');
      led.className = `playhead-led ${isBeat ? 'beat-marker' : ''}`;
      led.id = `led-step-${s}`;
      this.ledRow.appendChild(led);
    }

    // Render Track Rows
    this.stepMatrix.innerHTML = '';

    for (let t = 0; t < this.engine.tracks.length; t++) {
      const track = this.engine.tracks[t];
      const cat = track ? track.category : 'perc';
      const catStyle = CATEGORY_COLORS[cat] || { bg: '#00e5ff', glow: 'rgba(0,229,255,0.4)', label: 'PERC' };

      const row = document.createElement('div');
      row.className = `track-row ${t === this.selectedTrackIndex ? 'track-selected' : ''}`;
      row.style.setProperty('--track-color', catStyle.bg);
      row.style.setProperty('--track-glow', catStyle.glow);

      // Track Strip (Info, Mute, Solo)
      const strip = document.createElement('div');
      strip.className = 'track-strip';
      strip.innerHTML = `
        <div class="track-meta" style="cursor: pointer;">
          <div class="track-color-indicator"></div>
          <div>
            <div class="track-title">${track.name}</div>
            <div style="font-size: 9px; color: var(--text-dim); font-family: var(--font-mono);">${catStyle.label}</div>
          </div>
        </div>
        <div class="track-controls-mini">
          <button class="btn-strip btn-mute ${track.mute ? 'active' : ''}" title="Mute">M</button>
          <button class="btn-strip btn-solo ${track.solo ? 'active' : ''}" title="Solo">S</button>
        </div>
      `;

      // Track Select Event (open drawer)
      strip.querySelector('.track-meta').addEventListener('click', () => {
        this.selectedTrackIndex = t;
        document.querySelectorAll('.track-row').forEach((r, idx) => {
          r.classList.toggle('track-selected', idx === t);
        });
        this.renderTrackDrawer(t);
      });

      // Mute Toggle
      const btnM = strip.querySelector('.btn-mute');
      btnM.addEventListener('click', (e) => {
        e.stopPropagation();
        track.mute = !track.mute;
        btnM.classList.toggle('active', track.mute);
      });

      // Solo Toggle
      const btnS = strip.querySelector('.btn-solo');
      btnS.addEventListener('click', (e) => {
        e.stopPropagation();
        track.solo = !track.solo;
        btnS.classList.toggle('active', track.solo);
      });

      row.appendChild(strip);

      // Render 16 Step Buttons for current page
      for (let s = 0; s < 16; s++) {
        const globalStep = stepOffset + s;
        const isBeat = globalStep % 4 === 0;
        const vel = (currentPattern && currentPattern[t]) ? (currentPattern[t][globalStep] || 0) : 0;

        const cell = document.createElement('div');
        cell.className = 'step-cell';
        cell.id = `cell-${t}-${s}`;

        const btnStep = document.createElement('button');
        btnStep.className = `btn-step ${isBeat ? 'beat-start' : ''}`;
        
        if (vel >= 0.9) btnStep.classList.add('step-accent');
        else if (vel >= 0.6) btnStep.classList.add('step-normal');
        else if (vel > 0) btnStep.classList.add('step-soft');

        // Click cycles: Off -> Normal -> Accent -> Soft -> Off
        btnStep.addEventListener('click', () => {
          const nextVel = this.engine.cycleStep(t, globalStep);
          btnStep.classList.remove('step-soft', 'step-normal', 'step-accent');
          if (nextVel >= 0.9) btnStep.classList.add('step-accent');
          else if (nextVel >= 0.6) btnStep.classList.add('step-normal');
          else if (nextVel > 0) btnStep.classList.add('step-soft');
        });

        cell.appendChild(btnStep);
        row.appendChild(cell);
      }

      this.stepMatrix.appendChild(row);
    }
  }

  /**
   * Highlights active playhead step
   */
  highlightStep(stepIndex) {
    const stepOffset = this.currentPage * 16;
    const localStep = stepIndex - stepOffset;

    // Clear previous highlights
    this.clearPlayheadHighlight();

    // If step is on current visible page:
    if (localStep >= 0 && localStep < 16) {
      const led = document.getElementById(`led-step-${localStep}`);
      if (led) led.classList.add('active');

      for (let t = 0; t < this.engine.tracks.length; t++) {
        const cell = document.getElementById(`cell-${t}-${localStep}`);
        if (cell) cell.classList.add('playhead-active');
      }
    }
  }

  clearPlayheadHighlight() {
    document.querySelectorAll('.playhead-led.active').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.step-cell.playhead-active').forEach(el => el.classList.remove('playhead-active'));
  }

  /**
   * Render fine-tune controls drawer for selected track
   */
  renderTrackDrawer(trackIndex) {
    const track = this.engine.tracks[trackIndex];
    if (!track) return;

    const sampleName = track.path ? track.path.split(/[\/\\]/).pop() : (track.name || 'Sample');
    const isSynth = track.isSynthetic;
    const durationText = track.loadedBuffer ? `${track.loadedBuffer.duration.toFixed(2)}s` : '0s';

    this.trackDrawer.innerHTML = `
      <div class="drawer-track-info">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-family: var(--font-display); font-size: 14px; font-weight: 700; color: #fff;">
            Track ${trackIndex + 1}: ${track.name}
          </span>
          <span style="font-family: var(--font-mono); font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700; ${isSynth ? 'background: rgba(255, 170, 0, 0.2); color: #ffaa00; border: 1px solid #ffaa00;' : 'background: rgba(0, 255, 136, 0.15); color: #00ff88; border: 1px solid #00ff88;'}">
            ${isSynth ? '⚠️ SYNTH' : `🟢 WAV (${durationText})`}
          </span>
        </div>
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 320px;" title="${track.path || sampleName}">
          ${track.category.toUpperCase()} &bull; ${sampleName}
        </div>
      </div>

      <div class="drawer-controls">
        <!-- Audition / Preview Button -->
        <div class="drawer-knob-unit">
          <label class="drawer-knob-label">Audition</label>
          <button class="btn-transport" id="btnAuditionSample" style="padding: 4px 10px; font-size: 11px; color: var(--accent-cyan); border-color: var(--accent-cyan);">
            PLAY
          </button>
        </div>

        <!-- Volume Knob -->
        <div class="drawer-knob-unit">
          <label class="drawer-knob-label">Gain</label>
          <input type="range" class="fader-slider" id="drawerVol" min="0" max="1.5" step="0.05" value="${track.volume}" style="width: 80px;">
          <span class="drawer-knob-val" id="drawerVolVal">${Math.round(track.volume * 100)}%</span>
        </div>

        <!-- Pan Knob -->
        <div class="drawer-knob-unit">
          <label class="drawer-knob-label">Pan</label>
          <input type="range" class="fader-slider" id="drawerPan" min="-1" max="1" step="0.05" value="${track.pan}" style="width: 80px;">
          <span class="drawer-knob-val" id="drawerPanVal">${track.pan === 0 ? 'C' : (track.pan > 0 ? `R${Math.round(track.pan*100)}` : `L${Math.round(-track.pan*100)}`)}</span>
        </div>

        <!-- Pitch / Tuning Knob -->
        <div class="drawer-knob-unit">
          <label class="drawer-knob-label">Pitch</label>
          <input type="range" class="fader-slider" id="drawerPitch" min="-12" max="12" step="1" value="${track.pitch}" style="width: 80px;">
          <span class="drawer-knob-val" id="drawerPitchVal">${track.pitch >= 0 ? `+${track.pitch}` : track.pitch} st</span>
        </div>

        <!-- Choke Group Select -->
        <div class="drawer-knob-unit">
          <label class="drawer-knob-label">Choke Grp</label>
          <select class="custom-select" id="drawerChoke" style="padding: 2px 6px; font-size: 11px;">
            <option value="0" ${track.choke === 0 ? 'selected' : ''}>None</option>
            <option value="1" ${track.choke === 1 ? 'selected' : ''}>Grp 1 (Hi-Hats)</option>
            <option value="2" ${track.choke === 2 ? 'selected' : ''}>Grp 2 (808 Bass)</option>
            <option value="3" ${track.choke === 3 ? 'selected' : ''}>Grp 3 (Percs)</option>
          </select>
        </div>

        <!-- Custom Sample Load -->
        <div class="drawer-knob-unit">
          <label class="drawer-knob-label">Sample</label>
          <button class="btn-transport" id="btnReplaceSample" style="padding: 4px 8px; font-size: 10px;">Load WAV</button>
          <input type="file" id="drawerSampleFile" accept="audio/*" style="display: none;">
        </div>
      </div>
    `;

    // Drawer Listeners
    const btnAudition = document.getElementById('btnAuditionSample');
    btnAudition.addEventListener('click', () => {
      this.triggerPadUI(trackIndex);
    });

    const drawerVol = document.getElementById('drawerVol');
    drawerVol.addEventListener('input', (e) => {
      track.volume = parseFloat(e.target.value);
      document.getElementById('drawerVolVal').textContent = `${Math.round(track.volume * 100)}%`;
    });

    const drawerPan = document.getElementById('drawerPan');
    drawerPan.addEventListener('input', (e) => {
      track.pan = parseFloat(e.target.value);
      const txt = track.pan === 0 ? 'C' : (track.pan > 0 ? `R${Math.round(track.pan*100)}` : `L${Math.round(-track.pan*100)}`);
      document.getElementById('drawerPanVal').textContent = txt;
    });

    const drawerPitch = document.getElementById('drawerPitch');
    drawerPitch.addEventListener('input', (e) => {
      track.pitch = parseInt(e.target.value, 10);
      document.getElementById('drawerPitchVal').textContent = `${track.pitch >= 0 ? `+${track.pitch}` : track.pitch} st`;
    });

    const drawerChoke = document.getElementById('drawerChoke');
    drawerChoke.addEventListener('change', (e) => {
      track.choke = parseInt(e.target.value, 10);
    });

    const btnReplaceSample = document.getElementById('btnReplaceSample');
    const drawerSampleFile = document.getElementById('drawerSampleFile');
    btnReplaceSample.addEventListener('click', () => drawerSampleFile.click());
    drawerSampleFile.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        await this.engine.loadCustomSample(trackIndex, file);
        track.isSynthetic = false;
        this.renderPads();
        this.renderSequencerMatrix();
        this.renderTrackDrawer(trackIndex);
        this.renderMixerView();
      }
    });
  }

  /**
   * Render the 16-Channel Studio Mixing Console
   */
  renderMixerView() {
    if (!this.mixerStrips) return;
    this.mixerStrips.innerHTML = '';

    for (let i = 0; i < 16; i++) {
      const track = this.engine.tracks[i];
      if (!track) continue;

      const cat = track.category || 'perc';
      const catStyle = CATEGORY_COLORS[cat] || { bg: '#00e5ff', glow: 'rgba(0,229,255,0.5)', label: 'PERC' };
      const keyMap = KEYBOARD_MAP.find(m => m.trackIndex === i);
      const hotkey = keyMap ? keyMap.key.toUpperCase() : '';
      const isSelected = (i === this.selectedTrackIndex);

      const strip = document.createElement('div');
      strip.className = `mixer-strip ${isSelected ? 'strip-selected' : ''}`;
      strip.id = `mixerStrip-${i}`;
      strip.style.borderTopColor = catStyle.bg;

      const panText = track.pan === 0 ? 'C' : (track.pan > 0 ? `R${Math.round(track.pan * 100)}` : `L${Math.round(-track.pan * 100)}`);
      const pitchText = track.pitch >= 0 ? `+${track.pitch}` : `${track.pitch}`;
      const volPercent = Math.round(track.volume * 100);

      strip.innerHTML = `
        <div class="strip-top">
          <span class="strip-ch-id">CH ${(i + 1).toString().padStart(2, '0')}</span>
          <span class="strip-cat-pill" style="background: ${catStyle.bg}22; color: ${catStyle.bg}; border: 1px solid ${catStyle.bg}66;">
            ${catStyle.label}
          </span>
          <div class="strip-track-name" title="${track.name}">${track.name}</div>
        </div>

        <div class="strip-dial-section">
          <!-- Stereo Pan -->
          <div class="strip-micro-control">
            <div class="strip-micro-label">
              <span>PAN</span>
              <span id="mixerPanVal-${i}" class="strip-micro-val">${panText}</span>
            </div>
            <input type="range" class="strip-micro-slider" id="mixerPan-${i}" min="-1" max="1" step="0.05" value="${track.pan}">
          </div>

          <!-- Pitch Tuning -->
          <div class="strip-micro-control">
            <div class="strip-micro-label">
              <span>TUNE</span>
              <span id="mixerPitchVal-${i}" class="strip-micro-val">${pitchText}st</span>
            </div>
            <input type="range" class="strip-micro-slider" id="mixerPitch-${i}" min="-12" max="12" step="1" value="${track.pitch}">
          </div>

          <!-- Choke Group -->
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-top: 2px;">
            <span style="font-family: var(--font-mono); font-size: 8px; color: var(--text-dim);">CHOKE</span>
            <select class="custom-select" id="mixerChoke-${i}" style="padding: 1px 3px; font-size: 9px;">
              <option value="0" ${track.choke === 0 ? 'selected' : ''}>OFF</option>
              <option value="1" ${track.choke === 1 ? 'selected' : ''}>G1</option>
              <option value="2" ${track.choke === 2 ? 'selected' : ''}>G2</option>
              <option value="3" ${track.choke === 3 ? 'selected' : ''}>G3</option>
            </select>
          </div>
        </div>

        <!-- Fader & Vertical VU Meter Section -->
        <div class="strip-fader-assembly">
          <div class="strip-scale-ticks">
            <span>+6</span>
            <span>+3</span>
            <span class="tick-unity">0</span>
            <span>-6</span>
            <span>-12</span>
            <span>-24</span>
            <span>-∞</span>
          </div>

          <div class="strip-fader-slot">
            <input type="range" class="mixer-vertical-fader" id="mixerVol-${i}" min="0" max="1.5" step="0.01" value="${track.volume}" orient="vertical">
          </div>

          <!-- Real-Time Peak Meter Ladder -->
          <div class="strip-vu-ladder">
            <div id="mixerMeter-${i}" class="strip-vu-fill"></div>
          </div>
        </div>

        <!-- Readout -->
        <div id="mixerVolVal-${i}" class="strip-readout">${volPercent}%</div>

        <!-- Mute / Solo -->
        <div class="strip-switches">
          <button class="btn-mixer-mute ${track.mute ? 'active' : ''}" id="mixerMute-${i}">M</button>
          <button class="btn-mixer-solo ${track.solo ? 'active' : ''}" id="mixerSolo-${i}">S</button>
        </div>

        <!-- Cue / Audition Button -->
        <button class="btn-mixer-cue" id="mixerCue-${i}" title="Trigger ${track.name} (Key: ${hotkey})">
          ${hotkey ? `[${hotkey}] CUE` : 'CUE'}
        </button>
      `;

      // Event Listeners for this Channel Strip
      // Select Strip
      strip.addEventListener('click', (e) => {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'SELECT') {
          this.selectedTrackIndex = i;
          document.querySelectorAll('.mixer-strip').forEach((s, idx) => s.classList.toggle('strip-selected', idx === i));
          this.renderTrackDrawer(i);
        }
      });

      // Volume Fader
      const fader = strip.querySelector(`#mixerVol-${i}`);
      const faderVal = strip.querySelector(`#mixerVolVal-${i}`);
      fader.addEventListener('input', (e) => {
        track.volume = parseFloat(e.target.value);
        faderVal.textContent = `${Math.round(track.volume * 100)}%`;
        const drawerVol = document.getElementById('drawerVol');
        if (drawerVol && this.selectedTrackIndex === i) {
          drawerVol.value = track.volume;
          const drawerVal = document.getElementById('drawerVolVal');
          if (drawerVal) drawerVal.textContent = `${Math.round(track.volume * 100)}%`;
        }
      });

      // Pan Slider
      const panSlider = strip.querySelector(`#mixerPan-${i}`);
      const panVal = strip.querySelector(`#mixerPanVal-${i}`);
      panSlider.addEventListener('input', (e) => {
        track.pan = parseFloat(e.target.value);
        const txt = track.pan === 0 ? 'C' : (track.pan > 0 ? `R${Math.round(track.pan * 100)}` : `L${Math.round(-track.pan * 100)}`);
        panVal.textContent = txt;
        const drawerPan = document.getElementById('drawerPan');
        if (drawerPan && this.selectedTrackIndex === i) {
          drawerPan.value = track.pan;
          const dpVal = document.getElementById('drawerPanVal');
          if (dpVal) dpVal.textContent = txt;
        }
      });

      // Pitch Slider
      const pitchSlider = strip.querySelector(`#mixerPitch-${i}`);
      const pitchVal = strip.querySelector(`#mixerPitchVal-${i}`);
      pitchSlider.addEventListener('input', (e) => {
        track.pitch = parseInt(e.target.value, 10);
        pitchVal.textContent = `${track.pitch >= 0 ? `+${track.pitch}` : track.pitch}st`;
        const drawerPitch = document.getElementById('drawerPitch');
        if (drawerPitch && this.selectedTrackIndex === i) {
          drawerPitch.value = track.pitch;
          const dpVal = document.getElementById('drawerPitchVal');
          if (dpVal) dpVal.textContent = `${track.pitch >= 0 ? `+${track.pitch}` : track.pitch} st`;
        }
      });

      // Choke Select
      const chokeSelect = strip.querySelector(`#mixerChoke-${i}`);
      chokeSelect.addEventListener('change', (e) => {
        track.choke = parseInt(e.target.value, 10);
        const drawerChoke = document.getElementById('drawerChoke');
        if (drawerChoke && this.selectedTrackIndex === i) {
          drawerChoke.value = track.choke;
        }
      });

      // Mute Button
      const btnMute = strip.querySelector(`#mixerMute-${i}`);
      btnMute.addEventListener('click', () => {
        track.mute = !track.mute;
        btnMute.classList.toggle('active', track.mute);
        this.renderSequencerMatrix();
      });

      // Solo Button
      const btnSolo = strip.querySelector(`#mixerSolo-${i}`);
      btnSolo.addEventListener('click', () => {
        track.solo = !track.solo;
        btnSolo.classList.toggle('active', track.solo);
        this.renderSequencerMatrix();
      });

      // Cue / Audition Button
      const btnCue = strip.querySelector(`#mixerCue-${i}`);
      btnCue.addEventListener('click', () => {
        this.triggerPadUI(i);
      });

      this.mixerStrips.appendChild(strip);
    }

    // Sync Master Bus controls
    if (this.mixerMasterFader && this.mixerMasterVal) {
      const curMaster = this.engine.masterGain ? this.engine.masterGain.gain.value : 0.85;
      this.mixerMasterFader.value = curMaster;
      this.mixerMasterVal.textContent = `${Math.round(curMaster * 100)}%`;
    }
  }

  /**
   * Real-time Oscilloscope & Stereo VU Meter rendering loop
   */
  initVisualizer() {
    const bufferLength = this.engine.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      requestAnimationFrame(render);

      // 1. Oscilloscope Waveform
      this.engine.analyser.getByteTimeDomainData(dataArray);

      const width = this.canvas.width = this.canvas.clientWidth;
      const height = this.canvas.height = this.canvas.clientHeight;

      this.canvasCtx.fillStyle = '#080a0f';
      this.canvasCtx.fillRect(0, 0, width, height);

      this.canvasCtx.lineWidth = 2;
      this.canvasCtx.strokeStyle = '#00e5ff';
      this.canvasCtx.shadowBlur = 8;
      this.canvasCtx.shadowColor = 'rgba(0, 229, 255, 0.7)';

      this.canvasCtx.beginPath();
      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
          this.canvasCtx.moveTo(x, y);
        } else {
          this.canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      this.canvasCtx.lineTo(width, height / 2);
      this.canvasCtx.stroke();
      this.canvasCtx.shadowBlur = 0;

      // 2. VU Meter RMS calculation
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        const val = (dataArray[i] - 128) / 128;
        sum += val * val;
      }
      const rms = Math.sqrt(sum / bufferLength);
      const pct = Math.min(100, Math.max(0, rms * 250));

      this.vuFillL.style.width = `${pct}%`;
      this.vuFillR.style.width = `${Math.min(100, pct * (0.95 + Math.random() * 0.1))}%`;
    };

    render();
  }
}

// Instantiate on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  window.drumMachine = new DrumMachineApp();
});
