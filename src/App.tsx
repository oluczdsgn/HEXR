import React, { useState, useEffect, useRef } from 'react';
import { Upload, Download, Sun, Moon, Image as ImageIcon, RotateCcw, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { ADVANCED_EFFECTS, applyAdvancedEffects } from './effects';

type Theme = 'light' | 'dark';

interface Settings {
  brightness: number;
  contrast: number;
  saturation: number;
  sepia: number;
  vhsNoise: number;
  scanlines: number;
  glitch: number;
  [key: string]: number;
}

const DEFAULT_SETTINGS: Settings = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  sepia: 0,
  vhsNoise: 0,
  scanlines: 0,
  glitch: 0,
};

ADVANCED_EFFECTS.forEach(eff => {
  DEFAULT_SETTINGS[eff.id] = 0;
});

const EFFECTS_BY_CATEGORY = ADVANCED_EFFECTS.reduce((acc, effect) => {
  if (!acc[effect.category]) acc[effect.category] = [];
  acc[effect.category].push(effect);
  return acc;
}, {} as Record<string, typeof ADVANCED_EFFECTS>);

function Accordion({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean, key?: React.Key }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-xs font-medium uppercase tracking-widest text-gray-900 dark:text-gray-100 hover:text-gray-500 transition-colors"
      >
        {title}
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {isOpen && <div className="pb-6 space-y-5">{children}</div>}
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [noisePattern, setNoisePattern] = useState<HTMLCanvasElement | null>(null);
  const [scanlinePattern, setScanlinePattern] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const nCanvas = document.createElement('canvas');
    nCanvas.width = 100;
    nCanvas.height = 100;
    const nCtx = nCanvas.getContext('2d');
    if (nCtx) {
      const imgData = nCtx.createImageData(100, 100);
      for (let i = 0; i < imgData.data.length; i += 4) {
        const val = Math.random() * 255;
        imgData.data[i] = val;
        imgData.data[i + 1] = val;
        imgData.data[i + 2] = val;
        imgData.data[i + 3] = 255;
      }
      nCtx.putImageData(imgData, 0, 0);
      setNoisePattern(nCanvas);
    }

    const sCanvas = document.createElement('canvas');
    sCanvas.width = 1;
    sCanvas.height = 4;
    const sCtx = sCanvas.getContext('2d');
    if (sCtx) {
      sCtx.fillStyle = 'rgba(0,0,0,0.4)';
      sCtx.fillRect(0, 0, 1, 2);
      setScanlinePattern(sCanvas);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.filter = `brightness(${settings.brightness}%) contrast(${settings.contrast}%) saturate(${settings.saturation}%) sepia(${settings.sepia}%)`;
    ctx.drawImage(image, 0, 0);
    ctx.filter = 'none';

    applyAdvancedEffects(ctx, canvas.width, canvas.height, settings);

    if (settings.glitch > 0) {
      const maxShift = (settings.glitch / 100) * (canvas.width * 0.05);
      const numSlices = Math.floor((settings.glitch / 100) * 30);
      for (let i = 0; i < numSlices; i++) {
        const y = Math.random() * canvas.height;
        const h = Math.random() * (canvas.height / 20);
        const shift = (Math.random() - 0.5) * maxShift * 2;
        ctx.drawImage(canvas, 0, y, canvas.width, h, shift, y, canvas.width, h);
      }
    }

    if (settings.vhsNoise > 0 && noisePattern) {
      ctx.globalCompositeOperation = 'overlay';
      ctx.globalAlpha = settings.vhsNoise / 100;
      const pattern = ctx.createPattern(noisePattern, 'repeat');
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = 'source-over';
    }

    if (settings.scanlines > 0 && scanlinePattern) {
      ctx.globalCompositeOperation = 'overlay';
      ctx.globalAlpha = settings.scanlines / 100;
      const pattern = ctx.createPattern(scanlinePattern, 'repeat');
      if (pattern) {
        const scale = Math.max(1, canvas.height / 800);
        const matrix = new DOMMatrix().scale(1, scale);
        pattern.setTransform(matrix);
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = 'source-over';
    }
  }, [image, settings, noisePattern, scanlinePattern]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setSettings(DEFAULT_SETTINGS);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'retro-image-edit.png';
    link.href = canvasRef.current.toDataURL('image/png', 1.0);
    link.click();
  };

  const updateSetting = (key: string, value: number) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const renderSlider = (key: string, label: string, max: number = 100) => (
    <label key={key} className="block text-xs">
      <div className="flex justify-between mb-2 text-gray-500 dark:text-gray-400">
        <span>{label}</span>
        <span>{settings[key]}%</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max={max} 
        value={settings[key]} 
        onChange={(e) => updateSetting(key, Number(e.target.value))} 
        className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-gray-900 dark:accent-gray-100" 
      />
    </label>
  );

  return (
    <div className={theme}>
      <div className="flex h-screen w-full overflow-hidden bg-[#fafafa] text-gray-900 dark:bg-[#0a0a0a] dark:text-gray-100 transition-colors duration-300 font-sans">
        
        <aside className="w-80 flex-shrink-0 border-r border-gray-200 dark:border-gray-900 overflow-y-auto bg-white dark:bg-[#0a0a0a] flex flex-col transition-colors duration-300">
          <div className="p-6">
            <h1 className="text-lg font-medium tracking-tight">RetroImage</h1>
          </div>

          <div className="px-6 flex-1">
            <Accordion title="Ajustes Básicos" defaultOpen>
              {renderSlider('brightness', 'Brilho', 200)}
              {renderSlider('contrast', 'Contraste', 200)}
              {renderSlider('saturation', 'Saturação', 200)}
              {renderSlider('sepia', 'Sépia', 100)}
            </Accordion>

            <Accordion title="Efeitos VHS">
              {renderSlider('vhsNoise', 'Ruído (Noise)', 100)}
              {renderSlider('scanlines', 'Linhas de Varredura', 100)}
              {renderSlider('glitch', 'Glitch (Falha)', 100)}
            </Accordion>

            {Object.entries(EFFECTS_BY_CATEGORY).map(([category, effects]) => (
              <Accordion key={category} title={category}>
                {effects.map(eff => renderSlider(eff.id, eff.name, 100))}
              </Accordion>
            ))}
          </div>

          <div className="p-6 space-y-3 mt-auto">
            <button 
              onClick={() => setSettings(DEFAULT_SETTINGS)}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-medium uppercase tracking-widest text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Resetar
            </button>
            {image && (
              <button 
                onClick={() => setImage(null)}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-medium uppercase tracking-widest text-red-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-3 h-3" /> Remover
              </button>
            )}
          </div>
        </aside>

        <main className="flex-1 flex flex-col relative">
          <header className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-10">
            <div className="flex items-center gap-4">
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-medium uppercase tracking-widest hover:opacity-70 transition-opacity"
              >
                Upload
              </button>
              
              {image && (
                <button 
                  onClick={handleDownload}
                  className="text-xs font-medium uppercase tracking-widest hover:opacity-70 transition-opacity"
                >
                  Salvar
                </button>
              )}
            </div>

            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="hover:opacity-70 transition-opacity"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </header>

          <div className="flex-1 overflow-hidden flex items-center justify-center p-16 bg-[#fafafa] dark:bg-[#0a0a0a] relative">
            {!image ? (
              <div className="text-center max-w-md">
                <ImageIcon className="w-8 h-8 mx-auto mb-4 opacity-20" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Selecione uma imagem para começar.
                </p>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-medium uppercase tracking-widest border border-gray-200 dark:border-gray-800 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                >
                  Escolher Imagem
                </button>
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <canvas 
                  ref={canvasRef} 
                  className="max-w-full max-h-full object-contain shadow-2xl"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
