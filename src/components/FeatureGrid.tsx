import React from 'react';
import { motion } from 'motion/react';
import { Target, Cpu, Eye, Car, Monitor, Building2, Activity, Brain } from 'lucide-react';

export default function FeatureGrid() {
  return (
    <div className="space-y-6">
      <div className="card-elegant">
        <span className="label-micro">AI Core Engine</span>
        <div className="space-y-4">
          <FeatureItem 
            title="GTSRB Architecture" 
            desc="Optimized Convolutional Neural Network trained on 43 sign classes."
          />
          <FeatureItem 
            title="Multi-Scale Detection" 
            desc="Robust recognition under varying lighting and weather conditions."
          />
          <FeatureItem 
            title="Real-Time Inference" 
            desc="Latency sub-15ms for automotive integration."
          />
        </div>
      </div>

      <div className="card-elegant flex-1">
        <span className="label-micro">Deployment Use Cases</span>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <CaseTag>Autonomous</CaseTag>
          <CaseTag>ADAS</CaseTag>
          <CaseTag>Smart Cities</CaseTag>
          <CaseTag>Safety</CaseTag>
          <CaseTag>Monitoring</CaseTag>
          <CaseTag>Simulation</CaseTag>
        </div>
        
        <div className="mt-8">
          <span className="label-micro">System Stats</span>
          <div className="text-[12px] text-text-dim space-y-2">
            <div className="flex justify-between">
              <span>Accuracy</span>
              <span className="text-white font-medium">99.2%</span>
            </div>
            <div className="flex justify-between">
              <span>Dataset Size</span>
              <span className="text-white font-medium">50k+ Images</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="group">
      <h3 className="text-[14px] font-bold mb-1 group-hover:text-neon-lime transition-colors">{title}</h3>
      <p className="text-[12px] text-text-dim leading-relaxed">{desc}</p>
    </div>
  );
}

function CaseTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#1a1a1a] border border-border-dim rounded px-2 py-1.5 text-[10px] text-text-dim text-center hover:border-neon-lime/30 transition-colors uppercase tracking-wider font-bold">
      {children}
    </div>
  )
}
