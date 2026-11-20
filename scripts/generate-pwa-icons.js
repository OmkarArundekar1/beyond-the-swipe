// Generate PWA icons script
const fs = require('fs');
const path = require('path');

// Create a simple SVG that we can convert
const createIconSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f95980;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e03a63;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" />
  <path d="M ${size*0.3} ${size*0.35} Q ${size*0.3} ${size*0.25} ${size*0.4} ${size*0.25} Q ${size*0.5} ${size*0.25} ${size*0.5} ${size*0.35} Q ${size*0.5} ${size*0.45} ${size*0.4} ${size*0.55} L ${size*0.5} ${size*0.75} L ${size*0.5} ${size*0.75} L ${size*0.6} ${size*0.55} Q ${size*0.7} ${size*0.45} ${size*0.7} ${size*0.35} Q ${size*0.7} ${size*0.25} ${size*0.6} ${size*0.25} Q ${size*0.7} ${size*0.25} ${size*0.7} ${size*0.35} L ${size*0.5} ${size*0.7} L ${size*0.3} ${size*0.35} Z" fill="white" opacity="0.95"/>
</svg>
`.trim();

// Write SVG files
const publicDir = path.join(__dirname, '..', 'public');

// Generate basic icon files - these should ideally be replaced with actual designed icons
const sizes = [64, 192, 512];
sizes.forEach(size => {
  const svg = createIconSVG(size);
  fs.writeFileSync(path.join(publicDir, `pwa-${size}x${size}.svg`), svg);
});

// Create maskable icon SVG
const maskableSVG = createIconSVG(512);
fs.writeFileSync(path.join(publicDir, 'maskable-icon-512x512.svg'), maskableSVG);

console.log('PWA icon SVGs generated successfully!');
console.log('Note: For production, these should be converted to PNG format using a tool like sharp or imagemagick.');
