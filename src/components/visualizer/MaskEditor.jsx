import React, { useEffect, useRef, useState } from "react";
import { Wand2, Pentagon, Brush, Eraser, Undo2, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

const W = 640;
const H = 400;
const TOOLS = [
  { key: "polygon", label: "Polygon", icon: Pentagon },
  { key: "brush", label: "Brush", icon: Brush },
  { key: "erase", label: "Erase", icon: Eraser },
];

// Canvas-based mask editor — user paints/draws a mask over the floor area.
// The mask defines where the new floor color/texture will be applied.
// Adapted from xtremevisualizer5.zip MaskEditor.jsx.
export default function MaskEditor({ photoUrl, onMaskChange }) {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("brush");
  const [opacity, setOpacity] = useState(55);
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState([]);
  const [poly, setPoly] = useState([]);
  const [hasMask, setHasMask] = useState(false);
  const drawing = useRef(false);

  const ctxOf = () => canvasRef.current?.getContext("2d");

  const snapshot = () => {
    const c = canvasRef.current;
    if (c) setHistory((h) => [...h.slice(-9), c.toDataURL()]);
  };

  const report = () => {
    const ctx = ctxOf();
    if (!ctx) return;
    const { data } = ctx.getImageData(0, 0, W, H);
    let on = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] > 20) on++;
    const pct = Math.round((on / (W * H)) * 100);
    setHasMask(on > 500);
    onMaskChange?.({ dataUrl: canvasRef.current.toDataURL("image/png"), coverage: pct });
  };

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    return [
      ((clientX - rect.left) / rect.width) * W,
      ((clientY - rect.top) / rect.height) * H,
    ];
  };

  const paint = (e) => {
    const ctx = ctxOf();
    const [x, y] = getPos(e);
    ctx.globalCompositeOperation = tool === "erase" ? "destination-out" : "source-over";
    ctx.fillStyle = "#D4AF37";
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  };

  const addPolyPoint = (e) => {
    const p = getPos(e);
    const next = [...poly, p];
    setPoly(next);
    if (next.length >= 3) drawPolygon(next, true);
  };

  const strokePoly = (ctx, points) => {
    ctx.fillStyle = "#D4AF37";
    ctx.beginPath();
    points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fill();
    report();
  };

  const drawPolygon = (points, preview) => {
    const ctx = ctxOf();
    if (preview && history.length) {
      const prev = history[history.length - 1];
      const img = new window.Image();
      img.onload = () => {
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(img, 0, 0);
        strokePoly(ctx, points);
      };
      img.src = prev;
    } else {
      strokePoly(ctx, points);
    }
  };

  const autoDetect = () => {
    snapshot();
    const ctx = ctxOf();
    ctx.clearRect(0, 0, W, H);
    strokePoly(ctx, [
      [W * 0.08, H],
      [W * 0.26, H * 0.44],
      [W * 0.76, H * 0.44],
      [W * 0.97, H],
    ]);
  };

  const undo = () => {
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setPoly([]);
    if (prev) {
      const ctx = ctxOf();
      const img = new window.Image();
      img.onload = () => {
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(img, 0, 0);
        report();
      };
      img.src = prev;
    } else {
      reset();
    }
  };

  const reset = () => {
    ctxOf()?.clearRect(0, 0, W, H);
    setPoly([]);
    setHasMask(false);
    onMaskChange?.(null);
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoUrl]);

  return (
    <div className="space-y-3">
      <div className="relative rounded-xl overflow-hidden border border-stone-200 bg-stone-900">
        <div className="relative transition-transform duration-300 origin-center" style={{ transform: `scale(${zoom})` }}>
          <img src={photoUrl} alt="Your floor" className="w-full h-[260px] sm:h-[300px] object-cover select-none pointer-events-none" draggable={false} />
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            style={{ opacity: opacity / 100 }}
            onPointerDown={(e) => {
              e.preventDefault();
              if (tool === "polygon") return addPolyPoint(e);
              snapshot();
              drawing.current = true;
              paint(e);
            }}
            onPointerMove={(e) => {
              e.preventDefault();
              if (drawing.current) paint(e);
            }}
            onPointerUp={() => {
              if (drawing.current) {
                drawing.current = false;
                report();
              }
            }}
            onPointerLeave={() => (drawing.current = false)}
          />
        </div>
        <span className="absolute bottom-2 left-3 text-[10px] tracking-[0.16em] text-amber-500 font-bold">FLOOR MASK</span>
        {hasMask && (
          <span className="absolute bottom-2 right-3 text-[10px] tracking-[0.16em] text-green-400 font-bold">✓ MASK SET</span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {TOOLS.map((t) => (
          <button
            key={t.key}
            onClick={() => { setTool(t.key); setPoly([]); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              tool === t.key ? "bg-stone-950 text-white border-stone-950" : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
            }`}
          >
            <t.icon className="h-3.5 w-3.5" /> {t.label}
          </button>
        ))}
        <button onClick={autoDetect} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-amber-500 bg-amber-50 text-amber-700 hover:bg-amber-100 transition">
          <Wand2 className="h-3.5 w-3.5" /> Auto-Detect
        </button>
        <button onClick={undo} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-stone-200 text-stone-600 hover:border-stone-400 transition">
          <Undo2 className="h-3.5 w-3.5" /> Undo
        </button>
        <button onClick={reset} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-stone-200 text-stone-600 hover:border-stone-400 transition">
          <RotateCcw className="h-3.5 w-3.5" /> Clear
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-xs text-stone-500 font-medium">Mask opacity</span>
          <input
            type="range"
            min={20}
            max={100}
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="flex-1 accent-amber-500"
          />
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setZoom((z) => Math.max(1, z - 0.2))} className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center text-stone-500 hover:border-stone-400 transition">
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => setZoom((z) => Math.min(2, z + 0.2))} className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center text-stone-500 hover:border-stone-400 transition">
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <p className="text-xs text-stone-500 leading-relaxed">
        Paint over the floor area, or tap <span className="font-semibold text-amber-600">Auto-Detect</span> for a quick perspective mask.
        Use the polygon tool to trace the floor edge precisely.
      </p>
    </div>
  );
}