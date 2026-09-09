import React, { useState } from 'react';
import { X, Download, Loader2, AlertCircle } from 'lucide-react';
import { getSavedApiKey, generateImageAI } from '../services/aiService';

interface UiScreenGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  appName: string;
  onOpenKeySettings: () => void;
}

export const UiScreenGeneratorModal: React.FC<UiScreenGeneratorModalProps> = ({
  isOpen,
  onClose,
  appName,
  onOpenKeySettings,
}) => {
  const [appendPrompt, setAppendPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const apiKey = getSavedApiKey();

  const defaultPromptText = `High resolution 4K full-HD mobile and desktop UI screens mockup for ${
    appName || 'My App'
  }, showing key screens including main dashboard, primary user workflow, and interactive settings panel. Modern glassmorphism, glowing cyan accents, polished typography, clean layout, vibrant UI components, dark mode aesthetic, professional app showcase format.`;

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
        generateImageAI(`${fullPrompt} Alternate view with dark dashboard detail`, apiKey, 1920, 1080),
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070C]/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#111622] rounded-lg border border-[#1E2638] p-5 shadow-2xl my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded hover:bg-[#161C2A] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <h3 className="text-base font-bold text-white">Generate Full HD UI Screens</h3>
          <p className="text-xs text-slate-400">
            Create 2 high-resolution UI screen mockups tailored for {appName || 'your application'}
          </p>
        </div>

        {/* API Key Missing Instruction Banner */}
        {!apiKey && (
          <div className="p-3 bg-amber-950/40 border border-amber-500/20 rounded mb-4 flex items-center justify-between gap-3 text-xs text-amber-300">
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

        {/* Prompts Section */}
        <div className="space-y-3 mb-4">
          <div className="text-xs text-slate-400 bg-[#0B0F17]/60 p-3 rounded border border-[#1E2638]/60 leading-relaxed">
            <span className="font-semibold text-slate-300">Base Prompt: </span>
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
          <div className="mb-4 flex items-center justify-between p-2.5 bg-red-950/40 border border-red-500/20 rounded text-xs text-red-300">
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

        {/* Action Button */}
        <div className="flex justify-between items-center mb-4">
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
          <span className="text-[11px] text-slate-500">1920 x 1080 (16:9 Full HD)</span>
        </div>

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
    </div>
  );
};
