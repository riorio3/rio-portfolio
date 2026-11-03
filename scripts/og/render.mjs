// Renders scripts/og/og-default.html to public/og-default.png (1200x630) with headless Chrome,
// then shrinks it with sharp (128-colour palette; visually identical, ~250 KB).
// Manual tool, not part of the build. See README.md in this folder.
import { chromium } from 'playwright-core';
import sharp from 'sharp';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] ?? path.join(dir, '..', '..', 'public', 'og-default.png');

const browser = await chromium.launch({
  executablePath: process.env.CHROME || '/usr/bin/google-chrome',
  chromiumSandbox: true, // keep Chrome's sandbox on (Playwright adds --no-sandbox unless this is true)
  args: ['--font-render-hinting=none'],
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(path.join(dir, 'og-default.html')).href);
await page.waitForSelector('body[data-ready]');
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
const png = await page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();

await sharp(png)
  .png({ palette: true, colors: 128, quality: 95, dither: 1, effort: 10, compressionLevel: 9 })
  .toFile(out);
console.log('wrote', out);
