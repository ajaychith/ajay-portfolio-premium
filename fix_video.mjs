import fs from 'fs';

let code = fs.readFileSync('src/components/HeroScene.jsx', 'utf8');
code = code.replace(
  /style=\{\{ width: '100%', height: '100%', objectFit: 'cover' \}\}/g,
  "autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}"
);
fs.writeFileSync('src/components/HeroScene.jsx', code);
console.log('✅ Updated HeroScene video properties for browser autoplay!');
