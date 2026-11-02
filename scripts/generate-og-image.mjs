// Generates public/og-default.png (1200x630), the default social share image.
// Run: node scripts/generate-og-image.mjs  (needs the Inter font installed locally)
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const W = 1200;
const H = 630;
const out = fileURLToPath(new URL('../public/og-default.png', import.meta.url));

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glowBlue" cx="18%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowPurple" cx="88%" cy="90%" r="55%">
      <stop offset="0%" stop-color="#9333ea" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#9333ea" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#60a5fa" stop-opacity="0"/>
      <stop offset="30%" stop-color="#60a5fa" stop-opacity="0.9"/>
      <stop offset="70%" stop-color="#9333ea" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#9333ea" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#000000"/>
  <rect width="${W}" height="${H}" fill="url(#glowBlue)"/>
  <rect width="${W}" height="${H}" fill="url(#glowPurple)"/>
  <rect x="60" y="60" width="${W - 120}" height="${H - 120}" rx="32" fill="url(#panel)" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1.5"/>

  <rect x="120" y="120" width="88" height="48" rx="24" fill="#ffffff" fill-opacity="0.05" stroke="#60a5fa" stroke-opacity="0.5" stroke-width="1.5"/>
  <text x="164" y="152" text-anchor="middle" font-family="Inter" font-weight="700" font-size="20" letter-spacing="2" fill="#ffffff">RZ</text>

  <text x="120" y="350" font-family="Inter" font-weight="700" font-size="104" letter-spacing="-3" fill="#ffffff">Rio Zelaya</text>
  <rect x="124" y="384" width="140" height="3" rx="1.5" fill="url(#line)"/>
  <text x="120" y="450" font-family="Inter" font-weight="400" font-size="38" fill="#888888">Developer, builder, thinker.</text>

  <text x="${W - 120}" y="${H - 116}" text-anchor="end" font-family="Inter" font-weight="500" font-size="24" fill="#60a5fa">riozelaya.com</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log('wrote', out);
