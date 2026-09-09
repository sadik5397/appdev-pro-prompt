import React, { useState, useEffect } from 'react';
import { X, Download, Loader2, AlertCircle, FileText } from 'lucide-react';
import { getSavedApiKey, generateImageAI } from '../services/aiService';
import type { MasterPromptData } from '../types/prompt';

interface LogoGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptData: MasterPromptData;
  onOpenKeySettings: () => void;
}

export const LogoGeneratorModal: React.FC<LogoGeneratorModalProps> = ({
  isOpen,
  onClose,
  promptData,
  onOpenKeySettings,
}) => {
  const [appendPrompt, setAppendPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const apiKey = getSavedApiKey();
  const appName = promptData.overview.appName || 'My App';
  const desc = promptData.overview.oneSentenceDef || promptData.overview.productGoal || 'Modern software application';
  const style = promptData.designSystem.visualDirection || 'minimalist vector mark';
  const primaryColor = promptData.designSystem.primary || 'vibrant blue accent';

  const defaultPromptText = `Modern minimalist vector app logo mark for ${appName} (${desc}). Visual aesthetic: ${style}, featuring ${primaryColor}. Centered geometric emblem logo symbol, solid dark background, flat vector graphic icon design, ultra sharp high contrast, studio quality artwork.`;

  const handleGenerate = async () => {
    if (!apiKey) {
      setErrorMessage('API Key is missing. Please add your Google AI Studio API Key first.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage('');
    setGeneratedLogo(null);

    try {
      const fullPrompt = `${defaultPromptText} ${appendPrompt.trim()}`.trim();
      const img = await generateImageAI(fullPrompt, apiKey, 1024, 1024);
      setGeneratedLogo(img);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to generate logo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedLogo) return;
    setIsDownloading(true);
    try {
      const response = await fetch(generatedLogo);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${(appName || 'App').trim().replace(/\s+/g, '_')}_Logo_1x1.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Blob download failed, opening direct image URL:', err);
      window.open(generatedLogo, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070C]/80 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-full max-w-3xl bg-[#111622] rounded-lg border border-[#1E2638] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden my-auto">
        {/* Pinned Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1E2638] bg-[#111622] flex-shrink-0">
          <div>
            <h3 className="text-base font-bold text-white">Generate 1:1 App Logo</h3>
            <p className="text-xs text-slate-400">
              Clean 1:1 vector emblem designed from your Master Engineering Prompt brief
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded hover:bg-[#161C2A] transition"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* API Key Missing Instruction Banner */}
          {!apiKey && (
            <div className="p-3 bg-amber-950/40 border border-amber-500/20 rounded flex items-center justify-between gap-3 text-xs text-amber-300">
              <span>Google AI Studio API Key is required to generate logos.</span>
              <button
                onClick={() => {
                  onClose();
                  onOpenKeySettings();
                }}
                className="px-3 py-1.5 bg-[#0866FF] hover:bg-[#0052D4] text-white text-xs font-semibold rounded flex-shrink-0"
              >
                Add API Key
              </button>
            </div>
          )}

          {/* Project Instruction Brief Overview Card */}
          <div className="p-3 bg-[#0B0F17] border border-[#1E2638] rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#0866FF] uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Project Brief Overview
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {promptData.overview.productType || 'App'} • {promptData.overview.platform || 'Web/Mobile'}
              </span>
            </div>
            <h4 className="text-xs font-bold text-white">
              {appName}
            </h4>
            {desc && (
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{desc}"
              </p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1.5 text-[11px] border-t border-[#1E2638]/60 text-slate-400">
              {promptData.designSystem.visualDirection && (
                <div>
                  <span className="text-slate-500 font-medium">Style: </span>
                  <span className="text-slate-200">{promptData.designSystem.visualDirection}</span>
                </div>
              )}
              {promptData.overview.targetUsers && (
                <div>
                  <span className="text-slate-500 font-medium">Target: </span>
                  <span className="text-slate-200">{promptData.overview.targetUsers}</span>
                </div>
              )}
            </div>
          </div>

          {/* Prompts Section */}
          <div className="space-y-3">
            <div className="text-xs text-slate-400 bg-[#0B0F17]/60 p-3 rounded border border-[#1E2638]/60 leading-relaxed">
              <span className="font-semibold text-slate-300">Constructed Base Prompt: </span>
              <span>{defaultPromptText}</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-1">
                Additional Logo Instruction (Append Prompt)
              </label>
              <input
                type="text"
                placeholder="e.g., Geometric mark, blue accent hue, minimalist 3D feel..."
                value={appendPrompt}
                onChange={(e) => setAppendPrompt(e.target.value)}
                className="w-full dark-input text-xs p-2.5"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="flex items-center justify-between p-2.5 bg-red-950/40 border border-red-500/20 rounded text-xs text-red-300">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
              {!apiKey && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenKeySettings();
                  }}
                  className="px-2.5 py-1 bg-[#0866FF] hover:bg-[#0052D4] text-white text-[11px] font-semibold rounded"
                >
                  Set Key
                </button>
              )}
            </div>
          )}

          {/* Generated Logo Output */}
          {generatedLogo && (
            <div className="flex flex-col items-center justify-center p-3 bg-[#0B0F17] rounded border border-[#1E2638]">
              <img
                src={generatedLogo}
                alt="App Logo"
                className="w-44 h-44 rounded object-cover border border-[#1E2638] mb-3"
              />
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="px-4 py-2 bg-[#0866FF] hover:bg-[#0052D4] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Preparing Download...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download 1:1 PNG Logo</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Pinned Modal Footer */}
        <div className="p-4 border-t border-[#1E2638] bg-[#0D111A] flex items-center justify-between flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#161C2A] hover:bg-[#1E2638] text-slate-300 hover:text-white text-xs font-semibold rounded transition"
          >
            Close Window
          </button>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500 hidden sm:inline">1:1 Square Ratio</span>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="py-2 px-5 bg-[#0866FF] hover:bg-[#0052D4] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Designing 1:1 Vector Logo...</span>
                </>
              ) : (
                <span>{generatedLogo ? 'Regenerate Logo' : 'Generate 1:1 Logo'}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
