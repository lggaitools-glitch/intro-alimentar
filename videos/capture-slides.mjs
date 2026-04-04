import { chromium } from 'playwright';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1080, height: 1920 });
await page.goto('http://localhost:8765/slides.html');

for (let i = 1; i <= 7; i++) {
  await page.evaluate((idx) => {
    document.querySelectorAll('.slide').forEach((s, j) => {
      s.style.display = (j === idx - 1) ? 'flex' : 'none';
      if (j === idx - 1) {
        s.style.margin = '0';
        s.style.position = 'fixed';
        s.style.top = '0';
        s.style.left = '0';
      }
    });
    document.body.style.background = 'transparent';
  }, i);
  
  await page.screenshot({
    path: join(__dirname, `assets/slide${i}.png`),
    clip: { x: 0, y: 0, width: 1080, height: 1920 }
  });
  console.log(`Captured slide ${i}`);
}

await browser.close();
