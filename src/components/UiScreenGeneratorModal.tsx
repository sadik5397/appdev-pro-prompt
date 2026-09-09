import React, { useState, useEffect } from 'react';
import { X, Download, Loader2, AlertCircle, FileText } from 'lucide-react';
import { getSavedApiKey, generateImageAI } from '../services/aiService';
import type { MasterPromptData } from '../types/prompt';

interface UiScreenGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptData: MasterPromptData;
  onOpenKeySettings: () => void;
}

export const UiScreenGeneratorModal: React.FC<UiScreenGeneratorModalProps> = ({
  isOpen,
  onClose,
  promptData,
  onOpenKeySettings,
}) => {
  const [appendPrompt, setAppendPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

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
  const desc = promptData.overview.oneSentenceDef || promptData.overview.productGoal || 'Modern software dashboard';
  const style = promptData.designSystem.visualDirection || 'modern glassmorphism UI';
  const tech = promptData.overview.primaryTech || 'React / Web';

  const defaultPromptText = `High resolution 4K full-HD mobile and desktop UI screens mockup for ${appName} (${desc}). Primary stack: ${tech}. Visual direction: ${style}. Showing key screens including main dashboard, primary user workflow, and interactive settings panel. Glowing cyan/blue accents, polished typography, clean layout, vibrant UI components, dark mode aesthetic, professional app showcase format.`;

  const handleGenerate = async () => {
    if (!apiKey) {
      setErrorMessage('API Key is missing. Please add your Google AI Studio API Key first.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage('');
    setGeneratedImages([]);

    try {
      const fullPrompt = `${defaultPromptText} ${appendPrompt.trim()}`.trim();

      const [img1, img2] = await Promise.all([
        generateImageAI(fullPrompt, apiKey, 1920, 1080),
        generateImageAI(`${fullPrompt} Alternate view focusing on dark analytics dashboard detail`, apiKey, 1920, 1080),
      ]);

      setGeneratedImages([img1, img2]);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to generate UI screens.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (imgUrl: string, index: number) => {
    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${(appName || 'App').trim().replace(/\s+/g, '_')}_UI_Screen_${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Blob download failed, opening direct URL:', err);
      window.open(imgUrl, '_blank');
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
            <h3 className="text-base font-bold text-white">Generate Full HD UI Screens</h3>
            <p className="text-xs text-slate-400">
              Create 2 high-resolution UI screen mockups tailored to your Master Engineering Prompt specs
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
              <span>Google AI Studio API Key is required to generate UI screens.</span>
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
                {promptData.overview.productType || 'App'} • {tech}
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
                Additional UI Instruction (Append Prompt)
              </label>
              <input
                type="text"
                placeholder="e.g., Include dark dashboard cards, mobile device frame, analytics widget..."
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

          {/* Generated Images Grid */}
          {generatedImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-[#1E2638]">
              {generatedImages.map((img, i) => (
                <div
                  key={i}
                  className="group relative rounded border border-[#1E2638] bg-[#0B0F17] overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`UI Screen ${i + 1}`}
                    className="w-full h-48 object-cover transition transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <button
                      onClick={() => handleDownload(img, i)}
                      className="px-3 py-1.5 bg-[#0866FF] hover:bg-[#0052D4] text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Screen #{i + 1}
                    </button>
                  </div>
                </div>
              ))}
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
            <span className="text-[11px] text-slate-500 hidden sm:inline">1920 x 1080 (16:9 Full HD)</span>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="py-2 px-5 bg-[#0866FF] hover:bg-[#0052D4] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Generating 2 Full HD UI Screens...</span>
                </>
              ) : (
                <span>{generatedImages.length > 0 ? 'Regenerate UI Screens' : 'Generate UI Screens'}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
