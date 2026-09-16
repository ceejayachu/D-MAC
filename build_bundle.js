const fs = require('fs');
const path = require('path');

console.log('[*] Building bundle.js from presets.js, audio-engine.js, and app.js...');

const presetsSrc = fs.readFileSync(path.join(__dirname, 'presets.js'), 'utf8');
const engineSrc = fs.readFileSync(path.join(__dirname, 'audio-engine.js'), 'utf8');
const appSrc = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

// Strip exports from presets
let cleanPresets = presetsSrc
  .replace(/export\s+const\s+/g, 'const ')
  .replace(/export\s+function\s+/g, 'function ')
  .replace(/export\s+default\s+/g, '');

// Strip export from audio-engine
let cleanEngine = engineSrc
  .replace(/export\s+class\s+AudioEngine/g, 'class AudioEngine')
  .replace(/export\s+/g, '');

// Strip imports from app
let cleanApp = appSrc
  .replace(/import\s+\{[^}]+\}\s+from\s+['"][^'"]+['"];?\r?\n?/g, '');

const bundleContent = `(() => {
// ==========================================
// 1. PRESETS & DRUM KIT DEFINITIONS
// ==========================================
${cleanPresets}

// ==========================================
// 2. AUDIO ENGINE & DSP RACK
// ==========================================
${cleanEngine}

// ==========================================
// 3. APPLICATION UI CONTROLLER
// ==========================================
${cleanApp}

// Expose globals for external interaction and testing
window.DRUM_KITS = DRUM_KITS;
window.FACTORY_PRESETS = FACTORY_PRESETS;
window.CATEGORY_COLORS = CATEGORY_COLORS;
window.KEYBOARD_MAP = KEYBOARD_MAP;
window.AudioEngine = AudioEngine;

})();
`;

fs.writeFileSync(path.join(__dirname, 'bundle.js'), bundleContent, 'utf8');
console.log(`[+] bundle.js generated successfully! Size: ${bundleContent.length} bytes.`);
