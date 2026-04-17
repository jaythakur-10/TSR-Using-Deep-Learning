import React, { useState, useRef } from 'react';
import { Upload, Camera, Zap, Shield, Info, AlertCircle, Loader2, MousePointer2, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { detectTrafficSign, DetectionResult } from '../lib/gemini';

export default function DetectionPanel() {
  const [image, setImage] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunDetection = async () => {
    if (!image) return;
    setIsDetecting(true);
    setError(null);
    try {
      const detectionResult = await detectTrafficSign(image, "image/jpeg");
      setResult(detectionResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <section id="detection-panel" className="w-full space-y-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Detect Signs Instantly</h1>
        <p className="text-text-dim text-lg">Advanced deep learning recognition for next-gen road safety</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
        {/* Detection Area (Left) */}
        <div className="space-y-6">
          <div 
            className={`relative min-h-[400px] bg-[#080808] border-2 border-dashed rounded-2xl flex items-center justify-center transition-all duration-300 group ${
              image ? 'border-neon-lime/30' : 'border-border-dim hover:border-text-dim'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="image/*" 
              className="hidden" 
            />
            
            {image ? (
              <div className="w-full h-full p-4 flex items-center justify-center relative">
                <img src={image} alt="Upload preview" className="max-w-full max-h-[360px] object-contain rounded-lg glow-border" />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-true-black/60 px-4 py-1 rounded-full text-[12px] text-text-dim border border-white/5">
                  &gt; Image processing stream active
                </div>
              </div>
            ) : (
              <div 
                className="flex flex-col items-center justify-center text-center space-y-4 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="p-5 bg-surface border border-border-dim rounded-2xl group-hover:scale-105 transition-transform shadow-lg">
                  <Upload className="text-neon-lime" size={28} />
                </div>
                <div>
                  <p className="font-semibold text-lg">Upload Sign Image</p>
                  <p className="text-text-dim text-sm">Drag and drop or click to start detection</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary"
            >
              <Upload size={18} />
              Upload Image
            </button>
            <button 
              onClick={handleRunDetection}
              disabled={!image || isDetecting}
              className="btn-primary"
            >
              {isDetecting ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
              Run Detection
            </button>
          </div>
        </div>

        {/* Result Panel (Right) */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!result && !isDetecting && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card-elegant flex flex-col items-center justify-center h-[200px] text-center"
              >
                <div className="w-12 h-12 rounded-full border border-border-dim flex items-center justify-center text-text-dim mb-4">
                  <Monitor size={20} />
                </div>
                <p className="text-text-dim text-sm px-6">Awaiting system input...</p>
              </motion.div>
            )}

            {isDetecting && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="card-elegant flex flex-col items-center justify-center h-[200px] space-y-4 border-neon-lime/20"
                >
                  <div className="w-10 h-10 border-2 border-neon-lime/20 border-t-neon-lime rounded-full animate-spin"></div>
                  <p className="text-neon-lime text-[10px] uppercase tracking-widest font-bold">Processing...</p>
                </motion.div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface border border-neon-lime shadow-glow rounded-xl p-6 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full border-2 border-neon-lime flex items-center justify-center mx-auto text-lg font-bold">
                  {(result.confidence * 100).toFixed(1)}%
                </div>
                <div>
                  <div className="text-[11px] text-text-dim uppercase tracking-wider mb-1">Predicted Result</div>
                  <div className="text-2xl font-bold text-neon-lime tracking-tight">{result.label}</div>
                  <div className="text-[10px] text-text-dim uppercase font-bold mt-1 px-2 py-0.5 bg-white/5 inline-block rounded">{result.category}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="card-elegant min-h-[150px]">
            <span className="label-micro">Preprocessing Data</span>
            <div className="font-mono text-[11px] text-text-dim leading-relaxed space-y-1">
              <p>&gt; Resizing: 32x32px <span className="text-neon-lime">[DONE]</span></p>
              <p>&gt; Normalizing: 0-1 range <span className="text-neon-lime">[DONE]</span></p>
              <p>&gt; Color Space: RGB <span className="text-neon-lime">[DONE]</span></p>
              <p>&gt; Extraction: Complete</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-start gap-3 hover:bg-white/10 transition-colors">
      <div className="text-neon-lime mt-1">{icon}</div>
      <div>
        <p className="font-bold text-sm">{title}</p>
        <p className="text-gray-500 text-xs">{desc}</p>
      </div>
    </div>
  );
}
