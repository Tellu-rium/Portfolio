import React, { useEffect, useRef, useState } from 'react';
import GUI from 'lil-gui';

const IMAGE_SOURCE = 'https://images.unsplash.com/photo-1700583173020-624f5f11188c?w=1200';

const bayer4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => v / 16.0);

function generateBayer8() {
  let m2 = [[0, 2], [3, 1]];
  function expand(mat) {
    const n = mat.length;
    const newSize = n * 2;
    const res = Array(newSize).fill().map(() => Array(newSize).fill(0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const val = mat[i][j];
        res[i * 2][j * 2] = 4 * val;
        res[i * 2][j * 2 + 1] = 4 * val + 2;
        res[i * 2 + 1][j * 2] = 4 * val + 3;
        res[i * 2 + 1][j * 2 + 1] = 4 * val + 1;
      }
    }
    return res;
  }
  let m4 = expand(m2);
  let m8 = expand(m4);
  let flat = [];
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++)
      flat.push(m8[i][j] / 64.0);
  return flat;
}
const bayer8Map = generateBayer8();

function generateOrganicMap(size = 8) {
  const total = size * size;
  let raw = new Array(total);
  const center = (size - 1) / 2;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let dx = (i - center) / (size / 2);
      let dy = (j - center) / (size / 2);
      let radius = Math.sqrt(dx * dx + dy * dy);
      let angleNoise = (Math.sin(i * 2.3) * Math.cos(j * 1.9) + 1) / 2;
      let radial = Math.max(0, 1 - radius);
      let mix = (radial * 0.55 + angleNoise * 0.45);
      raw[i * size + j] = mix;
    }
  }
  let indexed = raw.map((v, idx) => ({ v, idx }));
  indexed.sort((a, b) => a.v - b.v);
  let result = new Array(total);
  for (let rank = 0; rank < total; rank++) result[indexed[rank].idx] = rank / (total - 1);
  return result;
}
const organic8 = generateOrganicMap(8);

function generateClusteredDot(size = 6) {
  const total = size * size;
  let vals = new Array(total);
  const center = (size - 1) / 2;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let dx = i - center;
      let dy = j - center;
      let dist = Math.sqrt(dx * dx + dy * dy);
      let maxDist = Math.sqrt(center * center + center * center);
      vals[i * size + j] = dist / maxDist;
    }
  }
  let min = Math.min(...vals), max = Math.max(...vals);
  for (let i = 0; i < total; i++) vals[i] = (vals[i] - min) / (max - min);
  return vals;
}
const clustered6 = generateClusteredDot(6);

function generateVoidAndCluster() {
  const vcPattern = [48, 12, 40, 20, 56, 28, 36, 8, 16, 52, 24, 44, 4, 60, 32, 24, 40, 20, 56, 12, 48, 8, 36, 28, 60, 4, 44, 32, 16, 52, 24, 48, 28, 36, 8, 56, 20, 40, 12, 52, 24, 44, 16, 4, 60, 32, 48, 20, 56, 12, 48, 28, 36, 8, 40, 16, 32, 60, 24, 44, 12, 52, 28, 36];
  return vcPattern.map(v => v / 64.0);
}
const voidClusterMap = generateVoidAndCluster();

function generateArtDecoMap(size = 8) {
  let map = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let diag = (i + j) % (size * 2);
      let curve = Math.sin(i * 0.8) * Math.cos(j * 0.8);
      let val = (diag / (size * 2) + curve * 0.2) % 1.0;
      map.push(val);
    }
  }
  let min = Math.min(...map), max = Math.max(...map);
  return map.map(v => (v - min) / (max - min));
}
const artDecoMap = generateArtDecoMap(8);

function generateDiagonalWave(size = 8) {
  let map = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let d = (i + j) / (size * 2);
      let wave = (Math.sin(i * 1.2) + Math.cos(j * 1.2)) * 0.25;
      let val = d + wave;
      map.push(val);
    }
  }
  let min = Math.min(...map), max = Math.max(...map);
  return map.map(v => (v - min) / (max - min));
}
const diagonalWaveMap = generateDiagonalWave(8);

function generateSpiralMap(size = 8) {
  let map = [];
  const center = (size - 1) / 2;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let dx = i - center;
      let dy = j - center;
      let angle = Math.atan2(dy, dx);
      let radius = Math.sqrt(dx * dx + dy * dy) / (center + 0.5);
      let spiral = (angle / (Math.PI * 2) + radius * 1.5) % 1.0;
      map.push(spiral);
    }
  }
  let min = Math.min(...map), max = Math.max(...map);
  return map.map(v => (v - min) / (max - min));
}
const spiralMap = generateSpiralMap(8);

function generateHalftoneCircles(size = 8) {
  let map = [];
  const center = (size - 1) / 2;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let dx = i - center;
      let dy = j - center;
      let dist = Math.sqrt(dx * dx + dy * dy);
      let maxDist = Math.sqrt(center * center + center * center);
      let normDist = dist / maxDist;
      let val = Math.sin(normDist * Math.PI * 1.2) * 0.7 + 0.3;
      map.push(val);
    }
  }
  let min = Math.min(...map), max = Math.max(...map);
  return map.map(v => (v - min) / (max - min));
}
const halftoneCircles = generateHalftoneCircles(8);

const thresholdMapsLib = {
  bayer_4x4: { data: bayer4, size: 4 },
  bayer_8x8: { data: bayer8Map, size: 8 },
  organic_8x8: { data: organic8, size: 8 },
  clustered_6x6: { data: clustered6, size: 6 },
  void_cluster_8x8: { data: voidClusterMap, size: 8 },
  art_deco_8x8: { data: artDecoMap, size: 8 },
  diagonal_wave: { data: diagonalWaveMap, size: 8 },
  spiral_map: { data: spiralMap, size: 8 },
  halftone_circles: { data: halftoneCircles, size: 8 }
};

export default function Profile() {
  const canvasRef = useRef(null);
  const guiContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // React State
  const [isGuiHidden, setIsGuiHidden] = useState(false);
  const [loadingState, setLoadingState] = useState({ isVisible: false, title: "", subtitle: "" });
  
  const [isHired, setIsHired] = useState(false);
  
  const originalImageBitmap = useRef(null);
  const originalImageData = useRef(null);
  const settingsRef = useRef({
    thresholdMap: 'art_deco_8x8',
    patternScale: 1.0,
    brightness: 128,
    contrast: 1.0,
    invert: false,
    thresholdOffset: 0.0,
  });

  const applyDitheringToImageData = (imageData) => {
    const s = settingsRef.current;
    const mapEntry = thresholdMapsLib[s.thresholdMap] || thresholdMapsLib['bayer_8x8'];
    const { data, size: matrixSize } = mapEntry;
    
    const width = imageData.width;
    const height = imageData.height;
    const output = new ImageData(width, height);
    const srcPixels = imageData.data;
    const dstPixels = output.data;
    const scaleFactor = Math.max(0.25, s.patternScale);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const r = srcPixels[idx];
        const g = srcPixels[idx + 1];
        const b = srcPixels[idx + 2];
        
        let lum = 0.299 * r + 0.587 * g + 0.114 * b;
        let adjusted = (lum - 128) * s.contrast + s.brightness;
        adjusted = Math.min(255, Math.max(0, adjusted));
        
        let normalizedLum = adjusted / 255.0;
        if (s.invert) normalizedLum = 1.0 - normalizedLum;
        let finalLum = normalizedLum + s.thresholdOffset;
        finalLum = Math.min(0.99, Math.max(0.01, finalLum));
        
        let mx = Math.floor(x / scaleFactor) % matrixSize;
        let my = Math.floor(y / scaleFactor) % matrixSize;
        if (mx < 0) mx = 0;
        if (my < 0) my = 0;
        
        const threshold = data[my * matrixSize + mx];
        const outputValue = (finalLum > threshold) ? 255 : 0;
        
        dstPixels[idx] = outputValue;
        dstPixels[idx + 1] = outputValue;
        dstPixels[idx + 2] = outputValue;
        dstPixels[idx + 3] = 255;
      }
    }
    return output;
  };

  const refreshFilter = () => {
    if (!originalImageData.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    const filtered = applyDitheringToImageData(originalImageData.current);
    ctx.putImageData(filtered, 0, 0);
  };

  const handleGuiChange = () => {
    refreshFilter();
    
    const s = settingsRef.current;
    
    const isSecretMatched = 
      Math.abs(s.patternScale - 0.82) < 0.001 &&
      s.brightness === 122 &&
      Math.abs(s.contrast - 1.03) < 0.001 &&
      Math.abs(s.thresholdOffset - (-0.03)) < 0.001;

    setIsHired(isSecretMatched);
  };

  const resizeCanvasToDisplaySize = () => {
    if (!originalImageBitmap.current || !canvasRef.current) return;
    const imgWidth = originalImageBitmap.current.width;
    const imgHeight = originalImageBitmap.current.height;
    
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    
    let displayWidth = maxWidth;
    let displayHeight = (imgHeight / imgWidth) * displayWidth;
    
    if (displayHeight > maxHeight) {
      displayHeight = maxHeight;
      displayWidth = (imgWidth / imgHeight) * displayHeight;
    }
    
    const cvs = canvasRef.current;
    cvs.width = displayWidth;
    cvs.height = displayHeight;
    cvs.style.width = `${displayWidth}px`;
    cvs.style.height = `${displayHeight}px`;
    
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = cvs.width;
    tempCanvas.height = cvs.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(originalImageBitmap.current, 0, 0, cvs.width, cvs.height);
    originalImageData.current = tempCtx.getImageData(0, 0, cvs.width, cvs.height);
    
    refreshFilter();
  };

  const handleExport = async () => {
    setLoadingState({ isVisible: true, title: "Exporting...", subtitle: "Generating dithered image" });
    try {
      const dataUrl = canvasRef.current.toDataURL("image/jpeg", 0.95);
      const link = document.createElement("a");
      link.download = `dithering-${Date.now()}.jpg`;
      link.href = dataUrl;
      link.click();
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      console.error("Export error:", err);
      setLoadingState({ isVisible: true, title: "Export Error!", subtitle: "Something went wrong" });
      await new Promise(resolve => setTimeout(resolve, 1500));
    } finally {
      setLoadingState({ isVisible: false, title: "", subtitle: "" });
    }
  };

  const handleFileUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLoadingState({ isVisible: true, title: "Loading...", subtitle: "Processing image" });
      
      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = async () => {
            originalImageBitmap.current = await createImageBitmap(img);
            resizeCanvasToDisplaySize();
            setLoadingState({ isVisible: false, title: "", subtitle: "" });
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.error("Upload error:", err);
        setLoadingState({ isVisible: false, title: "", subtitle: "" });
      }
    }
  };

  useEffect(() => {
    const loadInitialImage = async () => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = async () => {
          originalImageBitmap.current = await createImageBitmap(img);
          resizeCanvasToDisplaySize();
          resolve();
        };
        img.src = IMAGE_SOURCE;
      });
    };
    loadInitialImage();

    const gui = new GUI({ title: 'Controls', width: 280, container: guiContainerRef.current });
    const mapOptions = {
      'Bayer 4': 'bayer_4x4', 'Bayer 8': 'bayer_8x8', 'Organic': 'organic_8x8',
      'Clustered': 'clustered_6x6', 'Blue noise': 'void_cluster_8x8', 'Art Deco': 'art_deco_8x8',
      'Diagonal': 'diagonal_wave', 'Spiral': 'spiral_map', 'Circles': 'halftone_circles'
    };
    
    gui.add(settingsRef.current, 'thresholdMap', mapOptions).name('Threshold map').onChange(handleGuiChange);
    gui.add(settingsRef.current, 'patternScale', 0.3, 3.5, 0.01).name('Pattern scale').onChange(handleGuiChange);
    gui.add(settingsRef.current, 'brightness', 0, 255, 1).name('Brightness').onChange(handleGuiChange);
    gui.add(settingsRef.current, 'contrast', 0.3, 3.0, 0.01).name('Contrast').onChange(handleGuiChange);
    gui.add(settingsRef.current, 'thresholdOffset', -0.4, 0.4, 0.005).name('Threshold offset').onChange(handleGuiChange);
    gui.add(settingsRef.current, 'invert').name('Invert').onChange(handleGuiChange);
    
    const fileFolder = gui.addFolder('File');
    fileFolder.add({ upload: () => fileInputRef.current.click() }, 'upload').name('Upload image');
    fileFolder.add({ export: () => handleExport() }, 'export').name('Export image');
    fileFolder.open();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (originalImageBitmap.current) resizeCanvasToDisplaySize();
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      gui.destroy();
    };
  }, []);

  return (
    <div 
      className="bg-[#0a0f14] font-sans h-screen w-screen relative overflow-hidden"
      onDoubleClick={(e) => {
        if (!guiContainerRef.current.contains(e.target)) setIsGuiHidden(!isGuiHidden);
      }}
    >
    
    <style>{`
        * { cursor: default !important; }
    `}</style>

      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/jpeg,image/png,image/jpg,image/webp" 
        className="hidden" 
        onChange={handleFileUpload} 
      />

      <div className="fixed inset-0 w-screen h-screen bg-black flex justify-center items-center z-10">
        <canvas 
          ref={canvasRef} 
          className="block bg-[#1a1e24] max-w-full max-h-full w-auto h-auto object-contain shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      <div 
        ref={guiContainerRef} 
        className={`fixed top-5 right-5 z-[100] min-w-[260px] max-h-[90vh] overflow-y-auto transition-opacity duration-300 ${isGuiHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      />

      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 text-white/80 font-mono text-sm max-w-[280px] pointer-events-none bg-black/40 p-6 rounded-xl backdrop-blur-md border border-white/10">
        <h2 className="mb-4 text-2xl font-syne font-bold text-white">Why should I join your company?</h2>
        <p className="text-[12px] opacity-70 leading-relaxed mb-2">
          Want the answer? Set the controls exactly to:
        </p>
        <ul className="text-[11px] text-[#e0b87a] opacity-90 space-y-1">
          <li>Pattern Scale: 0.82</li>
          <li>Brightness: 122</li>
          <li>Contrast: 1.03</li>
          <li>Threshold: -0.03</li>
        </ul>
      </div>

      <div className="absolute bottom-5 right-5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] text-white font-mono pointer-events-none z-[100]">
        Double-click → Toggle controls
      </div>

      {loadingState.isVisible && (
        <div className="fixed inset-0 w-full h-full bg-black/80 backdrop-blur-md z-[1000] flex flex-col justify-center items-center font-mono transition-opacity duration-300">
          <div className="w-12 h-12 border-4 border-[#ffdc96]/30 border-t-[#e0b87a] rounded-full animate-ditherSpin mb-5" />
          <div className="text-[#e0b87a] text-xl font-bold mb-2">{loadingState.title}</div>
          <div className="text-[#aac7e0] text-sm">{loadingState.subtitle}</div>
        </div>
      )}

      {isHired && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-500 pointer-events-none">
          <h1 className="text-[#e0b87a] font-syne font-bold text-4xl tracking-[0.2em] uppercase animate-pulse text-center px-4 shadow-black drop-shadow-2xl">
            Thanks for hiring me! I knew you wanted me that's why you found the secret combination 😉
          </h1>
        </div>
      )}
    </div>
  );
}