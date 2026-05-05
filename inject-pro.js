const fs = require('fs');
const path = require('path');

const PRO_BANNER = `
<div style="margin-top:2rem;padding:1.25rem;background:linear-gradient(135deg,rgba(245,158,11,.08),rgba(251,191,35,.04));border:1px solid rgba(245,158,11,.25);border-radius:12px;text-align:center">
<div style="font-size:.7rem;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:.05em;margin-bottom:.4rem">Pro</div>
<div style="color:#e2e8f0;font-weight:600;font-size:.95rem;margin-bottom:.4rem">Need batch processing or export history?</div>
<a href="https://buy.stripe.com/8x25kCb76a8C7Sv33gfjG00" style="display:inline-block;background:linear-gradient(135deg,#f59e0b,#d97706);color:#0f172a;border-radius:8px;padding:.55rem 1.5rem;font-size:.85rem;font-weight:700;text-decoration:none;margin-top:.25rem" onclick="typeof gtag!=='undefined'&&gtag('event','begin_checkout',{currency:'USD',items:[{item_name:'toolpile_pro'}]})">Upgrade to Pro — $4.99/mo</a>
</div>
`;

const toolsDir = path.join(__dirname, 'tools');
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.html'));
let updated = 0;

for (const file of files) {
  const filepath = path.join(toolsDir, file);
  let html = fs.readFileSync(filepath, 'utf-8');
  
  if (html.includes('toolpile_pro')) continue;
  
  const footerIdx = html.indexOf('<footer>');
  if (footerIdx === -1) continue;
  
  html = html.slice(0, footerIdx) + PRO_BANNER + '\n' + html.slice(footerIdx);
  fs.writeFileSync(filepath, html);
  updated++;
}

console.log(`Updated ${updated} tool pages with Pro banner`);
