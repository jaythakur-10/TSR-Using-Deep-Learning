import React from 'react';

export default function Navigation() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-true-black/90 backdrop-blur-md h-16 px-8 flex items-center justify-between border-b border-border-dim">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 bg-neon-lime rounded-sm" />
        <span className="text-lg font-extrabold tracking-tight">TRAFFIC SIGN <span className="text-neon-lime">AI</span></span>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <HeaderLink href="#upload">Upload Image</HeaderLink>
        <HeaderLink href="#live">Live Detection</HeaderLink>
        <HeaderLink href="#info">Model Info</HeaderLink>
        <div className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-wider text-neon-lime">
          <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_#00FF00]" />
          System Active
        </div>
      </nav>

      <div className="md:hidden">
        <button className="text-neon-lime">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m4 6h16" /></svg>
        </button>
      </div>
    </header>
  );
}

function HeaderLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="text-text-dim hover:text-white text-[13px] font-medium uppercase tracking-widest transition-colors"
      onClick={(e) => {
        if (href.startsWith('#')) {
          e.preventDefault();
          document.querySelector('#detection-panel')?.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      {children}
    </a>
  );
}
