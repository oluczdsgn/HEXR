export type EffectType = 'duotone' | 'gradientMap' | 'splitToning' | 'colorGrading';

export interface AdvancedEffectDef {
  id: string;
  name: string;
  category: string;
  type: EffectType;
  colors?: string[];
  params?: any;
}

export const ADVANCED_EFFECTS: AdvancedEffectDef[] = [
  { id: 'dt_classic', name: 'Duotone clássico', category: 'Duotone', type: 'duotone', colors: ['#000000', '#ffffff'] },
  { id: 'dt_analog', name: 'Duotone análogo', category: 'Duotone', type: 'duotone', colors: ['#0000ff', '#00ffff'] },
  { id: 'dt_cyan_orange', name: 'Duotone ciano/laranja', category: 'Duotone', type: 'duotone', colors: ['#0044ff', '#ff8800'] },
  { id: 'dt_purple_yellow', name: 'Duotone roxo/amarelo', category: 'Duotone', type: 'duotone', colors: ['#440088', '#ffff00'] },
  { id: 'dt_sel_shadow', name: 'Duotone sombra seletiva', category: 'Duotone', type: 'duotone', colors: ['#220044', '#ffffff'] },
  { id: 'dt_transparent', name: 'Duotone transparente', category: 'Duotone', type: 'duotone', colors: ['#888888', '#ffffff'] },
  { id: 'dt_metallic', name: 'Duotone metálico', category: 'Duotone', type: 'duotone', colors: ['#223344', '#ccddee'] },
  { id: 'dt_pastel', name: 'Duotone pastel', category: 'Duotone', type: 'duotone', colors: ['#ffaaaa', '#aaffaa'] },
  { id: 'dt_neon', name: 'Duotone neon', category: 'Duotone', type: 'duotone', colors: ['#ff00ff', '#00ffff'] },
  { id: 'dt_sepia_blue', name: 'Duotone sépia/azul', category: 'Duotone', type: 'duotone', colors: ['#000044', '#ffcc88'] },
  { id: 'dt_inverted', name: 'Duotone invertido', category: 'Duotone', type: 'duotone', colors: ['#ffffff', '#000000'] },

  { id: 'gm_linear', name: 'Gradient Map linear', category: 'Gradient Map', type: 'gradientMap', colors: ['#000000', '#777777', '#ffffff'] },
  { id: 'gm_radial', name: 'Gradient Map radial', category: 'Gradient Map', type: 'gradientMap', colors: ['#000000', '#555555', '#ffffff'] },
  { id: 'gm_multistop', name: 'Gradient Map multiparada', category: 'Gradient Map', type: 'gradientMap', colors: ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffffff'] },
  { id: 'gm_saturation', name: 'Gradient Map de saturação', category: 'Gradient Map', type: 'gradientMap', colors: ['#555555', '#aaaaaa', '#ffffff'] },
  { id: 'gm_thermal', name: 'Gradient Map thermal', category: 'Gradient Map', type: 'gradientMap', colors: ['#0000ff', '#00ffff', '#00ff00', '#ffff00', '#ff0000'] },
  { id: 'gm_sunrise', name: 'Gradient Map sunrise', category: 'Gradient Map', type: 'gradientMap', colors: ['#220044', '#dd4444', '#ffcc00'] },
  { id: 'gm_ocean', name: 'Gradient Map oceano', category: 'Gradient Map', type: 'gradientMap', colors: ['#000022', '#004488', '#00ccff'] },
  { id: 'gm_incandescent', name: 'Gradient Map incandescente', category: 'Gradient Map', type: 'gradientMap', colors: ['#000000', '#880000', '#ff8800', '#ffffaa'] },
  { id: 'gm_inverse', name: 'Gradient Map inverso', category: 'Gradient Map', type: 'gradientMap', colors: ['#ffffff', '#888888', '#000000'] },
  { id: 'gm_vintage', name: 'Gradient Map vintage', category: 'Gradient Map', type: 'gradientMap', colors: ['#221100', '#884422', '#eeccaa'] },

  { id: 'st_classic', name: 'Split toning clássico', category: 'Split Toning', type: 'splitToning', colors: ['#0000ff', '#ff8800'] },
  { id: 'st_inverted', name: 'Split toning invertido', category: 'Split Toning', type: 'splitToning', colors: ['#ff8800', '#0000ff'] },
  { id: 'st_analog', name: 'Split toning análogo', category: 'Split Toning', type: 'splitToning', colors: ['#ff0044', '#ff8800'] },
  { id: 'st_sepia_cyan', name: 'Split toning sépia/ciano', category: 'Split Toning', type: 'splitToning', colors: ['#442200', '#00ffff'] },
  { id: 'st_violet_gold', name: 'Split toning violeta/ouro', category: 'Split Toning', type: 'splitToning', colors: ['#440088', '#ffcc00'] },
  { id: 'st_green_magenta', name: 'Split toning verde/magenta', category: 'Split Toning', type: 'splitToning', colors: ['#004400', '#ff00ff'] },
  { id: 'st_neutral', name: 'Split toning neutro', category: 'Split Toning', type: 'splitToning', colors: ['#444444', '#cccccc'] },
  { id: 'st_mono', name: 'Split toning monocromático', category: 'Split Toning', type: 'splitToning', colors: ['#000000', '#888888'] },
  { id: 'st_three_zone', name: 'Split toning três zonas', category: 'Split Toning', type: 'splitToning', colors: ['#000044', '#440000', '#004400'] },

  { id: 'cg_cinematic', name: 'Color grading cinematográfico', category: 'Color Grading', type: 'colorGrading', params: { contrast: 1.2, sat: 0.8, shadow: '#002244', high: '#ffddaa' } },
  { id: 'cg_teal_orange', name: 'Color grading teal & orange', category: 'Color Grading', type: 'colorGrading', params: { contrast: 1.1, sat: 1.2, shadow: '#004444', high: '#ff8800' } },
  { id: 'cg_bleach', name: 'Color grading bleach bypass', category: 'Color Grading', type: 'colorGrading', params: { contrast: 1.5, sat: 0.3, shadow: '#111111', high: '#eeeeee' } },
  { id: 'cg_cross', name: 'Color grading cross processing', category: 'Color Grading', type: 'colorGrading', params: { contrast: 1.3, sat: 1.1, shadow: '#0000ff', high: '#ffff00' } },
  { id: 'cg_matte', name: 'Color grading matte', category: 'Color Grading', type: 'colorGrading', params: { contrast: 0.8, sat: 0.9, shadow: '#333333', high: '#e0e0e0' } },
];

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

const colorMaps = new Map<string, {r: number[], g: number[], b: number[]}>();

function getGradientMap(colors: string[]) {
  const key = colors.join('-');
  if (colorMaps.has(key)) return colorMaps.get(key)!;

  const map = { r: new Array(256), g: new Array(256), b: new Array(256) };
  const rgbs = colors.map(hexToRgb);
  const segments = rgbs.length - 1;

  for (let i = 0; i < 256; i++) {
    const t = i / 255;
    const segment = Math.min(Math.floor(t * segments), segments - 1);
    const segmentT = (t - (segment / segments)) * segments;
    
    const c1 = rgbs[segment];
    const c2 = rgbs[segment + 1];
    
    map.r[i] = c1.r + (c2.r - c1.r) * segmentT;
    map.g[i] = c1.g + (c2.g - c1.g) * segmentT;
    map.b[i] = c1.b + (c2.b - c1.b) * segmentT;
  }
  colorMaps.set(key, map);
  return map;
}

export function applyAdvancedEffects(ctx: CanvasRenderingContext2D, width: number, height: number, intensities: Record<string, number>) {
  let active = false;
  for (const key in intensities) {
    if (intensities[key] > 0) {
      active = true;
      break;
    }
  }
  if (!active) return;

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (const effect of ADVANCED_EFFECTS) {
    const intensity = intensities[effect.id] || 0;
    if (intensity <= 0) continue;
    
    const amount = intensity / 100;
    
    if (effect.type === 'duotone' || effect.type === 'gradientMap') {
      const map = getGradientMap(effect.colors!);
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        const lum = Math.floor(0.299 * r + 0.587 * g + 0.114 * b);
        
        data[i] = r + (map.r[lum] - r) * amount;
        data[i+1] = g + (map.g[lum] - g) * amount;
        data[i+2] = b + (map.b[lum] - b) * amount;
      }
    } else if (effect.type === 'splitToning') {
      const shadow = hexToRgb(effect.colors![0]);
      const high = hexToRgb(effect.colors![1]);
      const mid = effect.colors![2] ? hexToRgb(effect.colors![2]) : null;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        let sr = 0, sg = 0, sb = 0;
        
        if (mid) {
          if (lum < 0.5) {
            const t = lum * 2;
            sr = shadow.r * (1-t) + mid.r * t;
            sg = shadow.g * (1-t) + mid.g * t;
            sb = shadow.b * (1-t) + mid.b * t;
          } else {
            const t = (lum - 0.5) * 2;
            sr = mid.r * (1-t) + high.r * t;
            sg = mid.g * (1-t) + high.g * t;
            sb = mid.b * (1-t) + high.b * t;
          }
        } else {
          sr = shadow.r * (1-lum) + high.r * lum;
          sg = shadow.g * (1-lum) + high.g * lum;
          sb = shadow.b * (1-lum) + high.b * lum;
        }

        data[i] = r + ((r * sr) / 128 - r) * amount;
        data[i+1] = g + ((g * sg) / 128 - g) * amount;
        data[i+2] = b + ((b * sb) / 128 - b) * amount;
      }
    } else if (effect.type === 'colorGrading') {
      const { contrast, sat, shadow, high } = effect.params;
      const sh = hexToRgb(shadow);
      const hi = hexToRgb(high);
      
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i+1];
        let b = data[i+2];
        
        r = ((r / 255 - 0.5) * contrast + 0.5) * 255;
        g = ((g / 255 - 0.5) * contrast + 0.5) * 255;
        b = ((b / 255 - 0.5) * contrast + 0.5) * 255;
        
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        r = lum + (r - lum) * sat;
        g = lum + (g - lum) * sat;
        b = lum + (b - lum) * sat;
        
        const lNorm = Math.max(0, Math.min(1, lum / 255));
        const tr = sh.r * (1-lNorm) + hi.r * lNorm;
        const tg = sh.g * (1-lNorm) + hi.g * lNorm;
        const tb = sh.b * (1-lNorm) + hi.b * lNorm;
        
        data[i] = data[i] + (Math.max(0, Math.min(255, (r + tr)/2)) - data[i]) * amount;
        data[i+1] = data[i+1] + (Math.max(0, Math.min(255, (g + tg)/2)) - data[i+1]) * amount;
        data[i+2] = data[i+2] + (Math.max(0, Math.min(255, (b + tb)/2)) - data[i+2]) * amount;
      }
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
}
