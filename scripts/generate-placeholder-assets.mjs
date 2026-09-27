/**
 * Generates the placeholder artwork for the asset paths that are still empty:
 *
 *   public/projects/project-sample.png         1600×1000  project screenshot
 *   public/certificates/certificate-sample.png 1400×1000  credential scan
 *   public/certificates/certificate-sample.pdf            credential PDF branch
 *   public/issuers/issuer-sample.png           512×512    issuer badge
 *
 * They exist so the image code paths (project covers, certificate previews, PDF
 * branch) are exercised by real files instead of an empty frame. They are
 * deliberately generic — no text, no branding — so nothing can be mistaken for
 * real content. Delete them once the real assets are in place.
 *
 * The social share card is deliberately NOT built here. It needs real type, and
 * this script has no font support, so it lives in `src/app/opengraph-image.tsx`
 * and is rendered by Next at build time.
 *
 *   node scripts/generate-placeholder-assets.mjs
 */
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

/* -------------------------------------------------------------------------- */
/* Minimal PNG encoder (8-bit RGBA, no dependencies)                          */
/* -------------------------------------------------------------------------- */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }
  return table;
})();

function crc32(buffer) {
  let c = -1;
  for (let i = 0; i < buffer.length; i += 1) {
    c = CRC_TABLE[(c ^ buffer[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function encodePng(width, height, rgba) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8; // bit depth
  header[9] = 6; // colour type: RGBA
  header[10] = 0;
  header[11] = 0;
  header[12] = 0;

  const stride = width * 4 + 1;
  const raw = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * stride] = 0; // filter: none
    rgba.copy(raw, y * stride + 1, y * width * 4, (y + 1) * width * 4);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* -------------------------------------------------------------------------- */
/* Tiny raster helpers                                                        */
/* -------------------------------------------------------------------------- */

function canvas(width, height, background) {
  const data = Buffer.alloc(width * height * 4);
  rect(data, width, height, 0, 0, width, height, background, 1);
  return data;
}

function blend(data, width, x, y, [r, g, b], alpha) {
  const index = (y * width + x) * 4;
  const a = Math.max(0, Math.min(1, alpha));
  data[index] = Math.round(data[index] * (1 - a) + r * a);
  data[index + 1] = Math.round(data[index + 1] * (1 - a) + g * a);
  data[index + 2] = Math.round(data[index + 2] * (1 - a) + b * a);
  data[index + 3] = 255;
}

function rect(data, width, height, x, y, w, h, colour, alpha = 1) {
  for (let yy = Math.max(0, y); yy < Math.min(height, y + h); yy += 1) {
    for (let xx = Math.max(0, x); xx < Math.min(width, x + w); xx += 1) {
      blend(data, width, xx, yy, colour, alpha);
    }
  }
}

function grid(data, width, height, step, colour, alpha) {
  for (let x = 0; x < width; x += step) {
    rect(data, width, height, x, 0, 1, height, colour, alpha);
  }
  for (let y = 0; y < height; y += step) {
    rect(data, width, height, 0, y, width, 1, colour, alpha);
  }
}

function circle(data, width, height, cx, cy, radius, colour, alpha) {
  for (let y = cy - radius; y <= cy + radius; y += 1) {
    for (let x = cx - radius; x <= cx + radius; x += 1) {
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy <= radius * radius) {
        if (x < 0 || y < 0 || x >= width || y >= height) continue;
        blend(data, width, x, y, colour, alpha);
      }
    }
  }
}

/* -------------------------------------------------------------------------- */

const INK = [11, 13, 18];
const SURFACE = [17, 20, 27];
const LINE = [255, 255, 255];
const ACCENT = [109, 94, 252];
const CYAN = [34, 211, 238];
const MUTED = [138, 147, 166];

function projectScreenshot() {
  const width = 1600;
  const height = 1000;
  const data = canvas(width, height, INK);
  const r = (x, y, w, h, colour, alpha) =>
    rect(data, width, height, x, y, w, h, colour, alpha);

  grid(data, width, height, 68, LINE, 0.03);

  // Window chrome
  r(0, 0, width, 56, SURFACE);
  r(0, 56, width, 1, LINE, 0.09);
  circle(data, width, height, 34, 28, 6, MUTED, 0.5);
  circle(data, width, height, 58, 28, 6, MUTED, 0.35);
  circle(data, width, height, 82, 28, 6, MUTED, 0.2);
  r(700, 20, 240, 16, LINE, 0.07);

  // Sidebar
  r(0, 57, 300, height - 57, SURFACE);
  r(300, 57, 1, height - 57, LINE, 0.08);
  r(28, 96, 150, 12, LINE, 0.12);
  for (let i = 0; i < 7; i += 1) {
    const active = i === 2;
    r(20, 140 + i * 52, 260, 36, active ? ACCENT : LINE, active ? 0.22 : 0.05);
    r(36, 152 + i * 52, 110, 10, LINE, active ? 0.5 : 0.16);
  }

  // Page header
  r(348, 104, 320, 22, LINE, 0.5);
  r(348, 140, 460, 12, LINE, 0.16);
  r(1280, 100, 240, 44, ACCENT, 0.85);
  r(1300, 116, 160, 12, LINE, 0.85);

  // Stat cards
  const cards = [
    { x: 348, tint: ACCENT },
    { x: 662, tint: CYAN },
    { x: 976, tint: ACCENT },
    { x: 1290, tint: CYAN },
  ];
  cards.forEach(({ x, tint }) => {
    r(x, 196, 274, 132, SURFACE);
    r(x, 196, 274, 1, LINE, 0.1);
    r(x + 24, 224, 88, 12, LINE, 0.16);
    r(x + 24, 252, 140, 26, tint, 0.7);
    r(x + 24, 296, 200, 8, LINE, 0.1);
    r(x + 24, 310, 150, 8, LINE, 0.07);
  });

  // Chart panel
  r(348, 366, 602, 320, SURFACE);
  r(348, 366, 602, 1, LINE, 0.1);
  r(380, 400, 180, 14, LINE, 0.2);
  for (let i = 0; i < 12; i += 1) {
    const barHeight = 40 + ((i * 53) % 170);
    r(392 + i * 44, 646 - barHeight, 22, barHeight, ACCENT, 0.75);
  }

  // Side panel
  r(976, 366, 274, 320, SURFACE);
  r(976, 366, 274, 1, LINE, 0.1);
  r(1004, 400, 120, 14, LINE, 0.2);
  for (let i = 0; i < 6; i += 1) {
    r(1004, 438 + i * 36, 218, 14, LINE, 0.09);
  }

  // Table
  r(348, 726, 902, 224, SURFACE);
  r(348, 726, 902, 1, LINE, 0.1);
  for (let row = 0; row < 5; row += 1) {
    r(380, 762 + row * 38, 840, 1, LINE, 0.07);
    r(380, 748 + row * 38, 220, 10, LINE, row === 0 ? 0.2 : 0.1);
    r(700, 748 + row * 38, 130, 10, CYAN, row === 0 ? 0.4 : 0.18);
    r(1000, 748 + row * 38, 90, 10, LINE, row === 0 ? 0.2 : 0.09);
  }

  return encodePng(width, height, data);
}

function certificateScan() {
  const width = 1400;
  const height = 1000;
  const data = canvas(width, height, [248, 249, 252]);
  const r = (x, y, w, h, colour, alpha) =>
    rect(data, width, height, x, y, w, h, colour, alpha);

  // Header band
  r(0, 0, width, 120, INK);
  r(0, 120, width, 6, ACCENT);

  // Title + body copy
  r(80, 200, 420, 30, [17, 20, 27], 0.75);
  r(80, 256, 300, 14, [17, 20, 27], 0.3);
  r(80, 290, 240, 14, [17, 20, 27], 0.2);
  for (let i = 0; i < 5; i += 1) {
    r(80, 386 + i * 44, 700 - (i % 3) * 90, 14, [17, 20, 27], 0.18);
  }

  // Embossed seal
  circle(data, width, height, 1080, 560, 150, ACCENT, 0.12);
  circle(data, width, height, 1080, 560, 118, ACCENT, 0.22);
  circle(data, width, height, 1080, 560, 86, ACCENT, 0.35);
  r(1010, 700, 140, 12, [17, 20, 27], 0.25);
  r(1030, 724, 100, 10, [17, 20, 27], 0.15);

  // Signature rules
  r(80, 820, 260, 1, [17, 20, 27], 0.35);
  r(80, 840, 160, 10, [17, 20, 27], 0.2);
  r(420, 820, 260, 1, [17, 20, 27], 0.35);
  r(420, 840, 190, 10, [17, 20, 27], 0.2);

  // Trim marks
  r(40, 160, 3, 800, ACCENT, 0.5);
  r(width - 43, 160, 3, 800, ACCENT, 0.5);

  return encodePng(width, height, data);
}

/* The social share card moved to `src/app/opengraph-image.tsx`, which can render
   actual text. Its old abstract-only version was deleted with it. */

/**
 * A minimal, valid single-page PDF written by hand — no fonts, no dependencies,
 * only vector rectangles — so the PDF branch of the certificate viewer is
 * exercised by a real file. Geometry only, so nothing can be mistaken for a
 * genuine credential.
 */
function samplePdf() {
  const content = [
    "0.043 0.051 0.071 rg",
    "0 351 595 70 re f",
    "0.427 0.369 0.988 rg",
    "0 344 595 7 re f",
    "0.60 0.62 0.66 rg",
    "40 300 240 16 re f",
    "40 274 170 10 re f",
    "0.78 0.80 0.84 rg",
    "40 220 320 10 re f",
    "40 202 280 10 re f",
    "40 184 300 10 re f",
    "0.427 0.369 0.988 rg",
    "430 240 110 110 re f",
    "0.60 0.62 0.66 rg",
    "40 80 160 1 re f",
    "40 68 110 8 re f",
    "230 80 160 1 re f",
    "230 68 130 8 re f",
  ].join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 421] /Resources << >> /Contents 4 0 R >>",
    `<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [];

  objects.forEach((body, index) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, "latin1");
}

function issuerBadge() {
  const size = 512;
  const data = canvas(size, size, [255, 255, 255]);
  const r = (x, y, w, h, colour, alpha) =>
    rect(data, size, size, x, y, w, h, colour, alpha);

  /* A generic certification seal: concentric discs plus ascending bars.
     No text and no letterforms — nothing that could be mistaken for a real
     organisation's mark. */
  circle(data, size, size, 256, 256, 232, [232, 234, 240], 1);
  circle(data, size, size, 256, 256, 214, INK, 1);
  circle(data, size, size, 256, 256, 176, [255, 255, 255], 1);
  circle(data, size, size, 256, 256, 148, ACCENT, 1);
  circle(data, size, size, 256, 256, 112, INK, 1);

  const WHITE = [255, 255, 255];
  r(206, 268, 26, 46, WHITE, 1);
  r(243, 234, 26, 80, WHITE, 1);
  r(280, 200, 26, 114, WHITE, 1);

  return encodePng(size, size, data);
}

/* -------------------------------------------------------------------------- */
/* Write the files                                                            */
/* -------------------------------------------------------------------------- */

const OUTPUTS = [
  ["public/projects/project-sample.png", projectScreenshot],
  ["public/certificates/certificate-sample.png", certificateScan],
  ["public/certificates/certificate-sample.pdf", samplePdf],
  ["public/issuers/issuer-sample.png", issuerBadge],
];

for (const [relativePath, build] of OUTPUTS) {
  const target = resolve(process.cwd(), relativePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, build());
  console.log(`wrote ${relativePath}`);
}