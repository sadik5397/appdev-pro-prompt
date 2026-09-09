import React from 'react';
import { Download, Key } from 'lucide-react';
import { PRESET_TEMPLATES } from '../utils/defaultPrompt';
import type { MasterPromptData } from '../types/prompt';
import { getSavedApiKey } from '../services/aiService';

interface NavbarProps {
  appName: string;
  onSelectPreset: (data: MasterPromptData) => void;
  onDownloadMarkdown: () => void;
  onOpenUiModal: () => void;
  onOpenLogoModal: () => void;
  onOpenKeySettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  appName,
  onSelectPreset,
  onDownloadMarkdown,
  onOpenUiModal,
  onOpenLogoModal,
  onOpenKeySettings,
}) => {
  const hasKey = Boolean(getSavedApiKey());

  return (
    <header className="h-14 border-b border-[#1E2638] bg-[#0B0F17] px-4 flex items-center justify-between z-30 sticky top-0">
      {/* Left: Logo & Preset Selector */}
      <div className="flex items-center gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-base font-extrabold text-white tracking-tight">Appdev Pro</span>
          <span className="text-[10px] uppercase font-bold text-slate-400 bg-[#161C2A] px-2 py-0.5 rounded border border-[#232D42]">
            v2.0
          </span>
          <a
            href="https://sadik.work/github"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-[#0866FF] font-medium transition ml-1"
            title="Created by S.a. Sadik"
          >
            <span>by <strong className="text-slate-300 hover:text-[#0866FF] font-semibold underline decoration-slate-600 hover:decoration-[#0866FF]">S.a. Sadik</strong></span>
          </a>
        </div>

        <div className="h-4 w-px bg-[#1E2638] hidden sm:block" />

        {/* Preset Selector */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Preset:</span>
          <select
            onChange={(e) => {
              const index = parseInt(e.target.value, 10);
              if (!isNaN(index) && PRESET_TEMPLATES[index]) {
                onSelectPreset(PRESET_TEMPLATES[index].data);
              }
            }}
            className="bg-[#111622] text-xs text-slate-200 border border-[#1E2638] rounded-md px-2.5 py-1 focus:outline-none focus:border-[#0866FF] cursor-pointer"
          >
            {PRESET_TEMPLATES.map((tmpl, idx) => (
              <option key={idx} value={idx}>
                {tmpl.name}
              </option>
            ))}
          </select>
        </div>

        {/* Current App Badge */}
        <div className="hidden md:flex items-center gap-1.5 bg-[#111622] px-2.5 py-1 rounded-md border border-[#1E2638] text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-slate-300 font-medium truncate max-w-[140px]">
            {appName || 'My Awesome App'}
          </span>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-2">
        {/* API Key Status / Settings Button */}
        <button
          onClick={onOpenKeySettings}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md border flex items-center gap-2 transition shadow-sm ${
            hasKey
              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/70'
              : 'bg-amber-950/50 text-amber-300 border-amber-500/40 hover:border-amber-400 hover:bg-amber-950/80'
          }`}
          title={hasKey ? 'Manage Gemini API Key' : 'Click to add Google AI Studio API Key'}
        >
          <Key className={`w-3.5 h-3.5 ${hasKey ? 'text-emerald-400' : 'text-amber-400'}`} />
          <span className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                hasKey ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
              }`}
            />
            <span>{hasKey ? 'API Key Active' : 'Set API Key'}</span>
          </span>
        </button>

        {/* Generate UI Screens */}
        <button
          onClick={onOpenUiModal}
          className="px-3 py-1.5 btn-dark text-xs font-semibold rounded text-slate-200"
        >
          UI Screens
        </button>

        {/* Generate Logo */}
        <button
          onClick={onOpenLogoModal}
          className="px-3 py-1.5 btn-dark text-xs font-semibold rounded text-slate-200"
        >
          Logo
        </button>

        {/* Download Master Prompt (.md) with Icon */}
        <button
          onClick={onDownloadMarkdown}
          className="px-3 py-1.5 btn-dark text-xs font-semibold rounded text-slate-200 flex items-center gap-1.5 hover:border-[#0866FF]/50 transition shadow-sm"
          title="Download Master Prompt (.md)"
        >
          <Download className="w-3.5 h-3.5 text-slate-300" />
          <span>Download .md</span>
        </button>
      </div>
    </header>
  );
};
