// --- MURAL SIZE (fixed) ---
const GRID_W = 22;
const GRID_H = 14;

// --- EDITOR CELL SIZE (how big each pixel looks on screen) ---
const CELL_SIZE = 24;

/**********************************************************************
 * 3) STATE
 * --------------------------------------------------------------------
 * pixels stores one entry per cell.
 *
 * Each cell stores:
 * - null          -> blank / white
 * - "teal"        -> one of the real color IDs
 * - "parmesan"    -> another real color ID
 **********************************************************************/

const CELL_COUNT = GRID_W * GRID_H;

// Use a normal JavaScript array here because we want to store strings and null,
// not just small integers.
const pixels = Array(CELL_COUNT).fill(null);

// selectedColorId holds either:
// - a real color id string (e.g. "teal")
// - ERASE_ID (meaning "paint white/blank")
let selectedColorId = LIVE_COLOR_IDS[0] || ERASE_ID;

/**********************************************************************
 * 4) DOM / CANVAS SETUP
 **********************************************************************/

const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d", { alpha: false });

const livePaletteEl = document.getElementById("livePalette");
const bonusPaletteEl = document.getElementById("bonusPalette");

const clearBtn = document.getElementById("clearBtn");
const exportBtn = document.getElementById("exportBtn");
const exportCodeBtn = document.getElementById("exportCodeBtn");
const loadCodeBtn = document.getElementById("loadCodeBtn");
const currentColorLabel = document.getElementById("currentColorLabel");
const toggleBonusBtn = document.getElementById("toggleBonusBtn");
const bonusPaletteSection = document.getElementById("bonusPaletteSection");

toggleBonusBtn.addEventListener("click", () => {
  const hidden = bonusPaletteSection.classList.toggle("hidden");

  toggleBonusBtn.textContent = hidden
    ? "show non-live colors"
    : "hide non-live colors";
});

const cssWidth = GRID_W * CELL_SIZE;
const cssHeight = GRID_H * CELL_SIZE;

const dpr = window.devicePixelRatio || 1;

canvas.width = Math.floor(cssWidth * dpr);
canvas.height = Math.floor(cssHeight * dpr);

canvas.style.width = cssWidth + "px";
canvas.style.height = cssHeight + "px";

ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

/**********************************************************************
 * 5) HELPER FUNCTIONS
 **********************************************************************/

function colorIdToHex(colorId) {
  if (colorId === null || colorId === ERASE_ID) return "#ffffff";
  return allById.get(colorId) || "#ff00ff";
}

function cellIndex(x, y) {
  return y * GRID_W + x;
}

function pointerToCell(evt) {
  const rect = canvas.getBoundingClientRect();
  const cx = evt.clientX - rect.left;
  const cy = evt.clientY - rect.top;

  const x = Math.floor(cx / CELL_SIZE);
  const y = Math.floor(cy / CELL_SIZE);

  return { x, y };
}

function updateCurrentColorLabel() {
  if (selectedColorId === ERASE_ID) {
    currentColorLabel.textContent = "erase / background";
  } else {
    currentColorLabel.textContent = selectedColorId;
  }
}

/**********************************************************************
 * 6) PALETTE RENDERING
 **********************************************************************/

function createSwatchButton(swatch) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "swatch";
  b.style.background = swatch.hex;
  b.style.color = swatch.hex;
  b.title = swatch.id;
  b.setAttribute("aria-pressed", String(swatch.id === selectedColorId));

  b.addEventListener("click", () => {
    selectedColorId = swatch.id;
    updateSwatchSelectionUI();
    updateCurrentColorLabel();
  });

  return b;
}

function updateSwatchSelectionUI() {
  const allSwatchButtons = document.querySelectorAll(".swatch");
  allSwatchButtons.forEach(btn => {
    const id = btn.dataset.colorId;
    btn.setAttribute("aria-pressed", String(id === selectedColorId));
  });
}

function renderLivePalette() {
  livePaletteEl.innerHTML = "";

  LIVE_COLORS.forEach((c) => {
    const swatch = createSwatchButton({
      id: c.id,
      hex: c.hex
    });
    swatch.dataset.colorId = c.id;
    livePaletteEl.appendChild(swatch);
  });

  const eraseSwatch = createSwatchButton({
    id: ERASE_ID,
    hex: "#ffffff"
  });

  eraseSwatch.classList.add("eraseSwatch");
  eraseSwatch.title = "erase / return to background";
  eraseSwatch.dataset.colorId = ERASE_ID;

  livePaletteEl.appendChild(eraseSwatch);
}

function renderBonusPalette() {
  bonusPaletteEl.innerHTML = "";

  BONUS_COLORS.forEach((c) => {
    const swatch = createSwatchButton({
      id: c.id,
      hex: c.hex
    });
    swatch.dataset.colorId = c.id;
    bonusPaletteEl.appendChild(swatch);
  });
}

function renderPalettes() {
  renderLivePalette();
  renderBonusPalette();
  updateSwatchSelectionUI();
}

/**********************************************************************
 * 7) DRAWING
 **********************************************************************/

function drawPixelsOnly() {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cssWidth, cssHeight);

  for (let y = 0; y < GRID_H; y++) {
    for (let x = 0; x < GRID_W; x++) {
      const idx = cellIndex(x, y);
      const colorId = pixels[idx];
      const colorHex = colorIdToHex(colorId);

      ctx.fillStyle = colorHex;
      ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
}

function drawGridLines() {
  ctx.save();
  ctx.strokeStyle = "rgba(0,0,0,0.12)";
  ctx.lineWidth = 1;

  ctx.beginPath();

  for (let x = 0; x <= GRID_W; x++) {
    const px = x * CELL_SIZE + 0.5;
    ctx.moveTo(px, 0);
    ctx.lineTo(px, cssHeight);
  }

  for (let y = 0; y <= GRID_H; y++) {
    const py = y * CELL_SIZE + 0.5;
    ctx.moveTo(0, py);
    ctx.lineTo(cssWidth, py);
  }

  ctx.stroke();
  ctx.restore();
}

function drawAll() {
  drawPixelsOnly();
  drawGridLines();
}

/**********************************************************************
 * 8) PAINTING
 **********************************************************************/

function setPixel(x, y, colorId) {
  if (x < 0 || x >= GRID_W || y < 0 || y >= GRID_H) return;
  pixels[cellIndex(x, y)] = (colorId === ERASE_ID) ? null : colorId;
}

let painting = false;

canvas.addEventListener("pointerdown", (evt) => {
  painting = true;
  canvas.setPointerCapture(evt.pointerId);

  const { x, y } = pointerToCell(evt);
  setPixel(x, y, selectedColorId);
  drawAll();
});

canvas.addEventListener("pointermove", (evt) => {
  if (!painting) return;

  const { x, y } = pointerToCell(evt);
  setPixel(x, y, selectedColorId);
  drawAll();
});

canvas.addEventListener("pointerup", () => { painting = false; });
canvas.addEventListener("pointercancel", () => { painting = false; });
canvas.addEventListener("pointerleave", () => { painting = false; });

/**********************************************************************
 * 9) SAVE / LOAD CODE
 **********************************************************************/

function encodeMural() {
  return JSON.stringify({
    version: 2,
    width: GRID_W,
    height: GRID_H,
    livePalette: LIVE_COLOR_IDS,
    pixels: pixels
  });
}

function decodeAndLoadMural(rawText) {
  const data = JSON.parse(rawText);

  if (!data || typeof data !== "object") {
    throw new Error("Code is not valid JSON.");
  }

  if (data.width !== GRID_W || data.height !== GRID_H) {
    throw new Error(`This code is for a ${data.width}×${data.height} mural, not ${GRID_W}×${GRID_H}.`);
  }

  if (!Array.isArray(data.pixels) || data.pixels.length !== CELL_COUNT) {
    throw new Error("Pixel data is missing or the wrong length.");
  }

  for (const colorId of data.pixels) {
    if (colorId === null) continue;
    if (colorId === ERASE_ID) continue;
    if (!allById.has(colorId)) {
      throw new Error(`Unknown color id found in code: ${colorId}`);
    }
  }

  for (let i = 0; i < CELL_COUNT; i++) {
    pixels[i] = data.pixels[i];
  }

  drawAll();
}

/**********************************************************************
 * 10) BUTTONS
 **********************************************************************/

clearBtn.addEventListener("click", () => {
  if (!confirm("start a new mural? this will erase the current one.")) return;

  for (let i = 0; i < CELL_COUNT; i++) {
    pixels[i] = null;
  }
  drawAll();
});

exportBtn.addEventListener("click", () => {
  const exportScale = 20;

  const outW = GRID_W * exportScale;
  const outH = GRID_H * exportScale;

  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = outW;
  exportCanvas.height = outH;

  const exportCtx = exportCanvas.getContext("2d");

  exportCtx.fillStyle = "#ffffff";
  exportCtx.fillRect(0, 0, outW, outH);

  for (let y = 0; y < GRID_H; y++) {
    for (let x = 0; x < GRID_W; x++) {
      const idx = cellIndex(x, y);
      const colorHex = colorIdToHex(pixels[idx]);
      exportCtx.fillStyle = colorHex;
      exportCtx.fillRect(x * exportScale, y * exportScale, exportScale, exportScale);
    }
  }

  const link = document.createElement("a");
  link.download = randomName() + ".png";
  link.href = exportCanvas.toDataURL("image/png");
  link.click();
});

exportCodeBtn.addEventListener("click", async () => {
  const code = encodeMural();

  try {
    await navigator.clipboard.writeText(code);

    const originalText = exportCodeBtn.textContent;
    exportCodeBtn.textContent = "copied!";
    setTimeout(() => {
      exportCodeBtn.textContent = originalText;
    }, 1200);
  } catch (err) {
    console.error("Failed to copy mural code:", err);
    alert("Copy failed. Your browser may not allow clipboard access here.");
  }
});

loadCodeBtn.addEventListener("click", () => {
  const pasted = prompt("Paste a mural code here:");

  if (pasted === null) return;

  try {
    decodeAndLoadMural(pasted);

    const originalText = loadCodeBtn.textContent;
    loadCodeBtn.textContent = "loaded!";
    setTimeout(() => {
      loadCodeBtn.textContent = originalText;
    }, 1200);
  } catch (err) {
    console.error("Failed to load mural code:", err);
    alert(`Could not load code: ${err.message}`);
  }
});

/**********************************************************************
 * 11) INIT
 **********************************************************************/

renderPalettes();
updateCurrentColorLabel();
drawAll();