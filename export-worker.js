// Simple Puppeteer worker that loads an HTML template and saves PDF.
// Requires npm install puppeteer
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function renderPdf(htmlPath, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const html = fs.readFileSync(htmlPath, 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({ path: outputPath, format: 'A4', printBackground: true });
  await browser.close();
}

if(require.main === module) {
  const htmlPath = process.argv[2] || './export-template.html';
  const out = process.argv[3] || './export-output.pdf';
  renderPdf(htmlPath, out).then(()=> console.log('PDF ready', out)).catch(e=> console.error(e));
}
