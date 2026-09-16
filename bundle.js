(() => {
// ==========================================
// 1. PRESETS & DRUM KIT DEFINITIONS
// ==========================================
/**
 * DRUM MACHINE WORKSTATION - PRESETS & KIT CONFIGURATION
 * Samples derived from METROTUNE DJ MACHINE drumkit library.
 */

const DRUM_KITS = [
  {
    id: 'kit-1',
    name: 'Kit 1: Metro Trap & 808',
    description: 'Heavy 808 sub, snappy claps, crisp hats, punchy alive kick',
    folder: 'samples/drumkit/KIT 1/',
    tracks: [
      { name: 'KICK Alive', path: 'samples/drumkit/KIT 1/KICK - ALIVE (XB + JELLO).wav', category: 'kick', choke: 0 },
      { name: 'KICK Bouncy', path: 'samples/drumkit/KIT 1/KICK - BOUNCYHOUSE (XB + JELLO).wav', category: 'kick', choke: 0 },
      { name: 'SNARE Citations', path: 'samples/drumkit/KIT 1/SNARE - CITATIONS (XB + JELLO).wav', category: 'snare', choke: 0 },
      { name: 'SNARE Crushd', path: 'samples/drumkit/KIT 1/SNARE - CRUSHD (XB + JELLO).wav', category: 'snare', choke: 0 },
      { name: 'CLAP City', path: 'samples/drumkit/KIT 1/CLAP - CITY (XB + JELLO).wav', category: 'clap', choke: 0 },
      { name: 'CLAP Euro', path: 'samples/drumkit/KIT 1/CLAP - EURO (XB + JELLO).wav', category: 'clap', choke: 0 },
      { name: 'HH Antman', path: 'samples/drumkit/KIT 1/HH - ANTMAN (XB + JELLO).wav', category: 'hihat', choke: 1 },
      { name: 'HH Beans', path: 'samples/drumkit/KIT 1/HH - BEANS (XB + JELLO).wav', category: 'hihat', choke: 1 },
      { name: 'OH Button Up', path: 'samples/drumkit/KIT 1/OH - BUTTON UP (XB + JELLO).wav', category: 'openhat', choke: 1 },
      { name: 'OH Freesauce', path: 'samples/drumkit/KIT 1/OH - FREESAUCE (XB + JELLO).wav', category: 'openhat', choke: 1 },
      { name: 'PERC Badmitton', path: 'samples/drumkit/KIT 1/PERC - BADMITTON (XB + JELLO).wav', category: 'perc', choke: 0 },
      { name: 'PERC Wwhaat', path: 'samples/drumkit/KIT 1/PERC - WWHAAT (XB + JELLO).wav', category: 'perc', choke: 0 },
      { name: '808 Erfquake', path: 'samples/drumkit/KIT 1/BASS - ERFQUAKE (XB + JELLO).wav', category: 'bass', choke: 2 },
      { name: '808 Knife', path: 'samples/drumkit/KIT 1/BASS - KNIFE (XB + JELLO).wav', category: 'bass', choke: 2 },
      { name: 'FX Chirp', path: 'samples/drumkit/KIT 1/FX - BIRDSCHIRPIN (XB + JELLO).wav', category: 'fx', choke: 0 },
      { name: 'FX Crashout', path: 'samples/drumkit/KIT 1/FX - CRASHOUT (XB + JELLO).wav', category: 'fx', choke: 0 }
    
    ]
  },
  {
    id: 'kit-2',
    name: 'Kit 2: Rockstar Cyber',
    description: 'Rockstar 808s, goldmine snare, beepers, bongo rolls',
    folder: 'samples/drumkit/KIT 2/',
    tracks: [
      { name: 'KICK Me&Boo', path: 'samples/drumkit/KIT 2/KICK - ME&BOO (XB + JELLO).wav', category: 'kick', choke: 0 },
      { name: 'KICK Alt Alive', path: 'samples/drumkit/KIT 1/KICK - ALIVE (XB + JELLO).wav', category: 'kick', choke: 0 },
      { name: 'SNARE Goldmine', path: 'samples/drumkit/KIT 2/SNARE - GOLDMINE (XB + JELLO).wav', category: 'snare', choke: 0 },
      { name: 'SNARE Knob', path: 'samples/drumkit/KIT 2/SNARE - KNOB (XB + JELLO).wav', category: 'snare', choke: 0 },
      { name: 'CLAP Layerz', path: 'samples/drumkit/KIT 2/CLAP - LAYERZ (XB + JELLO).wav', category: 'clap', choke: 0 },
      { name: 'CLAP Outatown', path: 'samples/drumkit/KIT 2/CLAP - OUTATOWN (XB + JELLO).wav', category: 'clap', choke: 0 },
      { name: 'HH Flake', path: 'samples/drumkit/KIT 2/HH - FLAKE (XB + JELLO).wav', category: 'hihat', choke: 1 },
      { name: 'HH Fyne', path: 'samples/drumkit/KIT 2/HH - FYNE (XB + JELLO).wav', category: 'hihat', choke: 1 },
      { name: 'OH Crit', path: 'samples/drumkit/KIT 2/OH - CRIT (XB + JELLO).wav', category: 'openhat', choke: 1 },
      { name: 'OH Digital', path: 'samples/drumkit/KIT 2/OH - DIGITAL (XB + JELLO).wav', category: 'openhat', choke: 1 },
      { name: 'PERC Beeperz', path: 'samples/drumkit/KIT 2/PERC - BEEPERZ (XB + JELLO).wav', category: 'perc', choke: 0 },
      { name: 'PERC Bongo', path: 'samples/drumkit/KIT 2/PERC - BONGOBONGO (XB + JELLO).wav', category: 'perc', choke: 0 },
      { name: '808 Reject', path: 'samples/drumkit/KIT 2/BASS - REJECT (XB + JELLO).wav', category: 'bass', choke: 2 },
      { name: '808 Rockstar', path: 'samples/drumkit/KIT 2/BASS - ROCKSTAR (XB + JELLO).wav', category: 'bass', choke: 2 },
      { name: 'FX Drumroll', path: 'samples/drumkit/KIT 2/FX - DRUMROLLPLEASE (XB + JELLO).wav', category: 'fx', choke: 0 },
      { name: 'FX Impact', path: 'samples/drumkit/KIT 2/FX - IMPACTFRAME (XB + JELLO).wav', category: 'fx', choke: 0 }
    
    ]
  },
  {
    id: 'kit-3',
    name: 'Kit 3: Savage Heat',
    description: 'Munyon kick, PayPal clap, Savage bass, infinite FX',
    folder: 'samples/drumkit/KIT 3/',
    tracks: [
      { name: 'KICK Munyon', path: 'samples/drumkit/KIT 3/KICK - MUNYON (XB + JELLO).wav', category: 'kick', choke: 0 },
      { name: 'KICK Portal', path: 'samples/drumkit/KIT 3/KICK - PORTAL (XB + JELLO).wav', category: 'kick', choke: 0 },
      { name: 'SNARE Ready2Roll', path: 'samples/drumkit/KIT 3/SNARE - READY2ROLL (XB + JELLO).wav', category: 'snare', choke: 0 },
      { name: 'SNARE Alt Knob', path: 'samples/drumkit/KIT 2/SNARE - KNOB (XB + JELLO).wav', category: 'snare', choke: 0 },
      { name: 'CLAP PayPal', path: 'samples/drumkit/KIT 3/CLAP - PAYPAL (XB + JELLO).wav', category: 'clap', choke: 0 },
      { name: 'CLAP Alt City', path: 'samples/drumkit/KIT 1/CLAP - CITY (XB + JELLO).wav', category: 'clap', choke: 0 },
      { name: 'HH Halloweenie', path: 'samples/drumkit/KIT 3/HH - HALLOWEENIE (XB + JELLO).wav', category: 'hihat', choke: 1 },
      { name: 'HH Highender', path: 'samples/drumkit/KIT 3/HH - HIGHENDER (XB + JELLO).wav', category: 'hihat', choke: 1 },
      { name: 'OH Ski', path: 'samples/drumkit/KIT 3/OH - SKI (XB + JELLO).wav', category: 'openhat', choke: 1 },
      { name: 'OH Trust Issues', path: 'samples/drumkit/KIT 3/OH - TRUST ISSUES (XB + JELLO).wav', category: 'openhat', choke: 1 },
      { name: 'PERC Funnel', path: 'samples/drumkit/KIT 3/PERC - FUNNEL (XB + JELLO).wav', category: 'perc', choke: 0 },
      { name: 'FX Hollon', path: 'samples/drumkit/KIT 3/FX - HOLLON (XB + JELLO).wav', category: 'fx', choke: 0 },
      { name: '808 Savage', path: 'samples/drumkit/KIT 3/BASS - SAVAGE (XB + JELLO).wav', category: 'bass', choke: 2 },
      { name: 'FX Infinite', path: 'samples/drumkit/KIT 3/FX - INFINITE (XB + JELLO).wav', category: 'fx', choke: 0 },
      { name: 'FX Lamb', path: 'samples/drumkit/KIT 3/FX - LAMB (XB + JELLO).wav', category: 'fx', choke: 0 },
      { name: 'FX Overstim', path: 'samples/drumkit/KIT 3/FX - OVERSTIMULATION (XB + JELLO).wav', category: 'fx', choke: 0 }
    
    ]
  },
  {
    id: 'kit-4',
    name: 'Kit 4: Underground Surge',
    description: 'Silent sub kick, surgery snare, Roblox tick, scream FX',
    folder: 'samples/drumkit/KIT 4/',
    tracks: [
      { name: 'KICK Silent', path: 'samples/drumkit/KIT 4/KICK - SILENT (XB + JELLO).wav', category: 'kick', choke: 0 },
      { name: 'KICK Alt Munyon', path: 'samples/drumkit/KIT 3/KICK - MUNYON (XB + JELLO).wav', category: 'kick', choke: 0 },
      { name: 'SNARE Surgery', path: 'samples/drumkit/KIT 4/SNARE - SURGERY (XB + JELLO).wav', category: 'snare', choke: 0 },
      { name: 'SNARE Alt Citations', path: 'samples/drumkit/KIT 1/SNARE - CITATIONS (XB + JELLO).wav', category: 'snare', choke: 0 },
      { name: 'CLAP Pop', path: 'samples/drumkit/KIT 4/CLAP - POP (XB + JELLO).wav', category: 'clap', choke: 0 },
      { name: 'CLAP Alt Layerz', path: 'samples/drumkit/KIT 2/CLAP - LAYERZ (XB + JELLO).wav', category: 'clap', choke: 0 },
      { name: 'HH Roblox', path: 'samples/drumkit/KIT 4/HH - ROBLOX (XB + JELLO).wav', category: 'hihat', choke: 1 },
      { name: 'HH Shmexy', path: 'samples/drumkit/KIT 4/HH - SHMEXY (XB + JELLO).wav', category: 'hihat', choke: 1 },
      { name: 'OH Somebody', path: 'samples/drumkit/KIT 4/OH - SOMEBODY (XB + JELLO).wav', category: 'openhat', choke: 1 },
      { name: 'OH Alt Button', path: 'samples/drumkit/KIT 1/OH - BUTTON UP (XB + JELLO).wav', category: 'openhat', choke: 1 },
      { name: 'PERC Oooya', path: 'samples/drumkit/KIT 4/PERC - OOOYA (XB + JELLO).wav', category: 'perc', choke: 0 },
      { name: 'PERC Alt Bongo', path: 'samples/drumkit/KIT 2/PERC - BONGOBONGO (XB + JELLO).wav', category: 'perc', choke: 0 },
      { name: '808 Strip', path: 'samples/drumkit/KIT 4/BASS - STRIP (XB + JELLO).wav', category: 'bass', choke: 2 },
      { name: 'FX Scream', path: 'samples/drumkit/KIT 4/FX - SCREAM (XB + JELLO).wav', category: 'fx', choke: 0 },
      { name: 'FX Slip N Slide', path: 'samples/drumkit/KIT 4/FX - SLIP N SLIDE (XB + JELLO).wav', category: 'fx', choke: 0 },
      { name: 'FX Alt Crashout', path: 'samples/drumkit/KIT 1/FX - CRASHOUT (XB + JELLO).wav', category: 'fx', choke: 0 }
    
    ]
  },
  {
    id: 'kit-5',
    name: 'Kit 5: Talk2Me Bounce',
    description: 'Standout kick, Swamp snare, Wagwan hat, Razor & Noizer FX',
    folder: 'samples/drumkit/KIT 5/',
    tracks: [
      { name: 'KICK Standout', path: 'samples/drumkit/KIT 5/KICK - STANDOUT (XB + JELLO).wav', category: 'kick', choke: 0 },
      { name: 'KICK Alt Bouncy', path: 'samples/drumkit/KIT 1/KICK - BOUNCYHOUSE (XB + JELLO).wav', category: 'kick', choke: 0 },
      { name: 'SNARE Swamp', path: 'samples/drumkit/KIT 5/SNARE - SWAMP (XB + JELLO).wav', category: 'snare', choke: 0 },
      { name: 'SNARE Alt Goldmine', path: 'samples/drumkit/KIT 2/SNARE - GOLDMINE (XB + JELLO).wav', category: 'snare', choke: 0 },
      { name: 'CLAP Sweetie', path: 'samples/drumkit/KIT 5/CLAP - SWEETIE (XB + JELLO).wav', category: 'clap', choke: 0 },
      { name: 'CLAP Alt Euro', path: 'samples/drumkit/KIT 1/CLAP - EURO (XB + JELLO).wav', category: 'clap', choke: 0 },
      { name: 'HH Wagwan', path: 'samples/drumkit/KIT 5/HH - WAGWAN (XB + JELLO).wav', category: 'hihat', choke: 1 },
      { name: 'HH Wave', path: 'samples/drumkit/KIT 5/HH - WAVE (XB + JELLO).wav', category: 'hihat', choke: 1 },
      { name: 'OH Sillygoose', path: 'samples/drumkit/KIT 5/OH - SILLYGOOSE (XB + JELLO).wav', category: 'openhat', choke: 1 },
      { name: 'OH Alt Crit', path: 'samples/drumkit/KIT 2/OH - CRIT (XB + JELLO).wav', category: 'openhat', choke: 1 },
      { name: 'PERC Rob', path: 'samples/drumkit/KIT 5/PERC - ROB (XB + JELLO).wav', category: 'perc', choke: 0 },
      { name: 'PERC Alt Funnel', path: 'samples/drumkit/KIT 3/PERC - FUNNEL (XB + JELLO).wav', category: 'perc', choke: 0 },
      { name: '808 Talk2Meh', path: 'samples/drumkit/KIT 5/BASS - TALK2MEH (XB + JELLO).wav', category: 'bass', choke: 2 },
      { name: 'FX Noizer', path: 'samples/drumkit/KIT 5/FX - NOIZER (XB + JELLO).wav', category: 'fx', choke: 0 },
      { name: 'FX Razor', path: 'samples/drumkit/KIT 5/FX - RAZOR (XB + JELLO).wav', category: 'fx', choke: 0 },
      { name: 'FX Alt Impact', path: 'samples/drumkit/KIT 2/FX - IMPACTFRAME (XB + JELLO).wav', category: 'fx', choke: 0 }
    
    ]
  },
  {
    id: 'kit-6',
    name: 'Kit 6: Supaswag Drill',
    description: 'Supaswag 808 punch, Sharpie clap, Roller open hat, Gameover perc',
    folder: 'samples/drumkit/KIT 6/',
    tracks: [
      { name: 'KICK Supaswag', path: 'samples/drumkit/KIT 6/KICK - SUPASWAG (XB + JELLO).wav', category: 'kick', choke: 0 },
      { name: 'KICK Alt Silent', path: 'samples/drumkit/KIT 4/KICK - SILENT (XB + JELLO).wav', category: 'kick', choke: 0 },
      { name: 'SNARE Torture', path: 'samples/drumkit/KIT 6/SNARE - TORTURE (XB + JELLO).wav', category: 'snare', choke: 0 },
      { name: 'SNARE Alt Crushd', path: 'samples/drumkit/KIT 1/SNARE - CRUSHD (XB + JELLO).wav', category: 'snare', choke: 0 },
      { name: 'CLAP Sharpie', path: 'samples/drumkit/KIT 6/CLAP - SHARPIE (XB + JELLO).wav', category: 'clap', choke: 0 },
      { name: 'CLAP Alt Outatown', path: 'samples/drumkit/KIT 2/CLAP - OUTATOWN (XB + JELLO).wav', category: 'clap', choke: 0 },
      { name: 'HH Spread', path: 'samples/drumkit/KIT 6/HH - SPREAD (XB + JELLO).wav', category: 'hihat', choke: 1 },
      { name: 'HH Throwunder', path: 'samples/drumkit/KIT 6/HH - THROWUNDER (XB + JELLO).wav', category: 'hihat', choke: 1 },
      { name: 'OH Roller', path: 'samples/drumkit/KIT 6/OH - ROLLER (XB + JELLO).wav', category: 'openhat', choke: 1 },
      { name: 'OH Alt Ski', path: 'samples/drumkit/KIT 3/OH - SKI (XB + JELLO).wav', category: 'openhat', choke: 1 },
      { name: 'PERC Gameover', path: 'samples/drumkit/KIT 6/PERC - GAMEOVER (XB + JELLO).wav', category: 'perc', choke: 0 },
      { name: 'PERC Alt Oooya', path: 'samples/drumkit/KIT 4/PERC - OOOYA (XB + JELLO).wav', category: 'perc', choke: 0 },
      { name: '808 We Speak', path: 'samples/drumkit/KIT 6/BASS - WE SPEAK (XB + JELLO).wav', category: 'bass', choke: 2 },
      { name: 'FX Skrta', path: 'samples/drumkit/KIT 6/FX - SKRTA (XB + JELLO).wav', category: 'fx', choke: 0 },
      { name: 'FX Subby Wubby', path: 'samples/drumkit/KIT 6/FX - SUBBY WUBBY (XB + JELLO).wav', category: 'fx', choke: 0 },
      { name: 'FX Alt Infinite', path: 'samples/drumkit/KIT 3/FX - INFINITE (XB + JELLO).wav', category: 'fx', choke: 0 }
    
    ]
  },
  {
    id: 'kit-7',
    name: 'Kit 7: Future Bounce & Glitch',
    description: 'Thiskickbaby, Smack snare, Metals & Wideopen hats, Good Tom & Weezil FX',
    folder: 'samples/drumkit/KIT 7/',
    tracks: [
      { name: 'KICK Thiskickbaby', path: 'samples/drumkit/KIT 7/KICK - THISKICKBABY (XB + JELLO).wav', category: 'kick', choke: 0 },
      { name: 'KICK Transfer', path: 'samples/drumkit/KIT 7/KICK - TRANSFER (XB + JELLO).wav', category: 'kick', choke: 0 },
      { name: 'SNARE Smack', path: 'samples/drumkit/KIT 7/SNARE - SMACK (XB + JELLO).wav', category: 'snare', choke: 0 },
      { name: 'SNARE Alt Surgery', path: 'samples/drumkit/KIT 4/SNARE - SURGERY (XB + JELLO).wav', category: 'snare', choke: 0 },
      { name: 'CLAP Shake', path: 'samples/drumkit/KIT 7/CLAP - SHAKE (XB + JELLO).wav', category: 'clap', choke: 0 },
      { name: 'CLAP Textile', path: 'samples/drumkit/KIT 7/CLAP - TEXTILE (XB + JELLO).wav', category: 'clap', choke: 0 },
      { name: 'HH Metals', path: 'samples/drumkit/KIT 7/HH - METALS (XB + JELLO).wav', category: 'hihat', choke: 1 },
      { name: 'HH Wideopen', path: 'samples/drumkit/KIT 7/HH - WIDEOPEN (XB + JELLO).wav', category: 'hihat', choke: 1 },
      { name: 'OH New Age', path: 'samples/drumkit/KIT 7/OH - NEW AGE (XB + JELLO).wav', category: 'openhat', choke: 1 },
      { name: 'OH Alt Somebody', path: 'samples/drumkit/KIT 4/OH - SOMEBODY (XB + JELLO).wav', category: 'openhat', choke: 1 },
      { name: 'TOM Good Tom', path: 'samples/drumkit/KIT 7/PERC - FINALLY A GOOD TOM (XB + JELLO).wav', category: 'perc', choke: 0 },
      { name: 'PERC Taaadaaa', path: 'samples/drumkit/KIT 7/PERC - TAAADAAA (XB + JELLO).wav', category: 'perc', choke: 0 },
      { name: '808 Surplus', path: 'samples/drumkit/KIT 7/BASS - SURPLUS (XB + JELLO).wav', category: 'bass', choke: 2 },
      { name: 'FX Turbulence', path: 'samples/drumkit/KIT 7/FX - TURBULENCE (XB + JELLO).wav', category: 'fx', choke: 0 },
      { name: 'FX Weezil', path: 'samples/drumkit/KIT 7/FX - WEEZIL (XB + JELLO).wav', category: 'fx', choke: 0 },
      { name: 'FX Alt Hollon', path: 'samples/drumkit/KIT 3/FX - HOLLON (XB + JELLO).wav', category: 'fx', choke: 0 }
    ]
  }
];

const CATEGORY_COLORS = {
  kick: { bg: '#ff3344', glow: 'rgba(255, 51, 68, 0.5)', label: 'KICK' },
  snare: { bg: '#ff7700', glow: 'rgba(255, 119, 0, 0.5)', label: 'SNARE' },
  clap: { bg: '#ffaa00', glow: 'rgba(255, 170, 0, 0.5)', label: 'CLAP' },
  hihat: { bg: '#ffdd00', glow: 'rgba(255, 221, 0, 0.5)', label: 'CLOSED HH' },
  openhat: { bg: '#00e5ff', glow: 'rgba(0, 229, 255, 0.5)', label: 'OPEN HH' },
  perc: { bg: '#00ffaa', glow: 'rgba(0, 255, 170, 0.5)', label: 'PERC / TOM' },
  bass: { bg: '#b347ff', glow: 'rgba(179, 71, 255, 0.6)', label: '808 / BASS' },
  fx: { bg: '#ff00aa', glow: 'rgba(255, 0, 170, 0.5)', label: 'FX / HIT' }
};

const KEYBOARD_MAP = [
  { key: '1', trackIndex: 0 },
  { key: '2', trackIndex: 1 },
  { key: '3', trackIndex: 2 },
  { key: '4', trackIndex: 3 },
  { key: 'q', trackIndex: 4 },
  { key: 'w', trackIndex: 5 },
  { key: 'e', trackIndex: 6 },
  { key: 'r', trackIndex: 7 },
  { key: 'a', trackIndex: 8 },
  { key: 's', trackIndex: 9 },
  { key: 'd', trackIndex: 10 },
  { key: 'f', trackIndex: 11 },
  { key: 'z', trackIndex: 12 },
  { key: 'x', trackIndex: 13 },
  { key: 'c', trackIndex: 14 },
  { key: 'v', trackIndex: 15 }
];

/**
 * Factory Genre Demo Patterns
 * Grid shape: array of 16 tracks, each track has array of steps (velocity values 0, 0.4, 0.8, 1.0)
 */
const FACTORY_PRESETS = [
  {
    id: 'trap-anthem',
    name: 'Trap Anthem 808',
    genre: 'Trap',
    bpm: 140,
    swing: 0.12,
    kitId: 'kit-1',
    stepsCount: 32,
    tracks: [
      // 0: Kick 1
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      // 1: Kick 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // 2: Snare 1
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      // 3: Snare 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8, 0, 0.8, 0],
      // 4: Clap 1
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      // 5: Clap 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // 6: HH 1 (Closed)
      [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 1, 1, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 1, 0.8, 1, 1],
      // 7: HH 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // 8: OH 1
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      // 9: OH 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // 10: Perc 1
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      // 11: Perc 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // 12: 808 1
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      // 13: 808 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // 14: FX 1
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // 15: FX 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    
    ]
  },
  {
    id: 'cyber-techno',
    name: 'Cyberpunk Industrial Techno',
    genre: 'Techno',
    bpm: 132,
    swing: 0.0,
    kitId: 'kit-2',
    stepsCount: 16,
    tracks: [
      // Kick 1 (Four on floor)
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      // Kick 2 (Rumble layer)
      [0, 0, 0.6, 0.4, 0, 0, 0.6, 0.4, 0, 0, 0.6, 0.4, 0, 0, 0.6, 0.4],
      // Snare 1
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // Snare 2
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      // Clap 1
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      // Clap 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // HH 1 (Offbeats & sixteenth drive)
      [0.4, 0.4, 0.8, 0.4, 0.4, 0.4, 0.8, 0.4, 0.4, 0.4, 0.8, 0.4, 0.4, 0.4, 0.8, 0.4],
      // HH 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // OH 1 (Upbeat open hat)
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      // OH 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // Perc 1 (Beeperz)
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
      // Perc 2 (Bongo)
      [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
      // Bass 1
      [1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0],
      // Bass 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // FX 1
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // FX 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    ]
  },
  {
    id: 'uk-drill',
    name: 'UK Drill Syncopation',
    genre: 'Drill',
    bpm: 142,
    swing: 0.18,
    kitId: 'kit-6',
    stepsCount: 32,
    tracks: [
      // 0: Kick
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      // 1: Kick 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // 2: Snare 1 (Drill 3rd beat & syncopation)
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      // 3: Snare 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6, 0.8],
      // 4: Clap 1
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      // 5: Clap 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // 6: HH 1 (Syncopated drill bounce)
      [1, 0, 0.8, 1, 0, 0.8, 1, 0, 0.8, 1, 0, 0.8, 1, 0, 0.8, 1, 1, 0, 0.8, 1, 0, 0.8, 1, 0, 0.8, 1, 0, 0.8, 1, 0.6, 0.8, 1],
      // 7: HH 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // 8: OH 1
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      // 9: OH 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // 10: Perc 1 (Gameover)
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      // 11: Perc 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // 12: 808 We Speak (Sliding 808 notes)
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      // 13: 808 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // 14: FX 1 (Skrta)
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      // 15: FX 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  {
    id: 'boom-bap',
    name: 'Boom Bap 90s Headnod',
    genre: 'Hip Hop',
    bpm: 92,
    swing: 0.28,
    kitId: 'kit-3',
    stepsCount: 16,
    tracks: [
      // Kick 1
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      // Kick 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // Snare 1
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      // Snare 2 (Ghost snare)
      [0, 0, 0, 0, 0, 0, 0.4, 0, 0, 0, 0, 0, 0, 0, 0.4, 0],
      // Clap
      [0, 0, 0, 0, 0.8, 0, 0, 0, 0, 0, 0, 0, 0.8, 0, 0, 0],
      // Clap 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // HH 1 (Swung 8ths)
      [0.9, 0, 0.7, 0, 0.9, 0, 0.7, 0, 0.9, 0, 0.7, 0, 0.9, 0, 0.7, 0],
      // HH 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // OH 1
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      // OH 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // Perc 1
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // FX 1
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // 808 Savage
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      // FX 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // FX 3
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // FX 4
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  },
  {
    id: 'dnb-break',
    name: 'Drum & Bass Liquid Roller',
    genre: 'Drum & Bass',
    bpm: 174,
    swing: 0.05,
    kitId: 'kit-7',
    stepsCount: 16,
    tracks: [
      // Kick 1
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      // Kick 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // Snare 1 (2 and 4 in half-time DnB = 4th and 12th 16th steps)
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      // Snare 2 (Ghost syncopations)
      [0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0, 0.6, 0],
      // Clap
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // Clap 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // HH 1 (Fast rolling 16ths)
      [0.8, 0.5, 0.7, 0.5, 0.8, 0.5, 0.7, 0.5, 0.8, 0.5, 0.7, 0.5, 0.8, 0.5, 0.7, 0.5],
      // HH 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // OH 1
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      // OH 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // Tom
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      // Perc
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      // 808 Surplus Sub
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      // FX
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // FX 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // FX 3
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }
];


// ==========================================
// 2. AUDIO ENGINE & DSP RACK
// ==========================================
/**
 * DRUM MACHINE AUDIO ENGINE
 * High-performance Web Audio API engine with lookahead scheduling,
 * multi-track DSP channel strips, choke groups, master FX rack,
 * and offline/live WAV export.
 */

class AudioEngine {
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


// ==========================================
// 3. APPLICATION UI CONTROLLER
// ==========================================
/**
 * DRUM MACHINE APPLICATION CONTROLLER
 * Connects UI elements, sequencer matrix, MPC pads, DSP rack,
 * and audio engine.
 */


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


// Expose globals for external interaction and testing
window.DRUM_KITS = DRUM_KITS;
window.FACTORY_PRESETS = FACTORY_PRESETS;
window.CATEGORY_COLORS = CATEGORY_COLORS;
window.KEYBOARD_MAP = KEYBOARD_MAP;
window.AudioEngine = AudioEngine;

})();
