import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { getSavedApiKey, generateMasterPromptFromIdea } from '../services/aiService';
import type { MasterPromptData } from '../types/prompt';
import confetti from 'canvas-confetti';
import { AiLoadingAnimation } from './AiLoadingAnimation';

interface AiPromptBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPromptGenerated: (data: MasterPromptData) => void;
  onOpenKeySettings: () => void;
}

export const AiPromptBuilderModal: React.FC<AiPromptBuilderModalProps> = ({
  isOpen,
  onClose,
  onPromptGenerated,
  onOpenKeySettings,
}) => {
  const [basicIdea, setBasicIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);

  const loadingSteps = [
    'Analyzing product idea & target domain...',
    'Synthesizing 30 Master Prompt sections...',
    'Designing UI specs & user journeys...',
    'Architecting data persistence & security rules...',
    'Finalizing production readiness criteria...',
  ];

  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      setLoadingStepIndex(0);
      interval = setInterval(() => {
        setLoadingStepIndex((prev) => (prev + 1) % loadingSteps.length);
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  if (!isOpen) return null;

  const apiKey = getSavedApiKey();

  const handleGenerate = async () => {
    if (!apiKey) {
      setErrorMessage('API Key is missing. Please add your Google AI Studio API Key first.');
      return;
    }

    if (!basicIdea.trim()) {
      setErrorMessage('Please enter your basic product idea.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage('');

    try {
      const generatedData = await generateMasterPromptFromIdea(basicIdea, apiKey);
      onPromptGenerated(generatedData);
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || 'Failed to generate prompt. Check your API key or network connection.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070C]/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#111622] rounded-lg border border-[#1E2638] p-6 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isGenerating}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded hover:bg-[#161C2A] transition disabled:opacity-30"
        >
          <X className="w-5 h-5" />
        </button>

        {isGenerating ? (
          /* Cool Tech Radar AI Loading View */
          <div className="py-6 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
            <AiLoadingAnimation />
            <div className="space-y-1.5 max-w-md">
              <h4 className="text-sm font-bold text-white tracking-wide">
                Architecting Master Prompt
              </h4>
              <p className="text-xs text-[#0866FF] font-mono h-5 transition-all animate-pulse">
                {loadingSteps[loadingStepIndex]}
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                Gemini AI is structuring all 30 engineering prompt sections...
              </p>
            </div>
          </div>
        ) : (
          /* Normal Prompt Form View */
          <>
            {/* Modal Header */}
            <div className="mb-4">
              <h3 className="text-base font-bold text-white">IDEA to PRO PROMPT (AI Generator)</h3>
              <p className="text-xs text-slate-400">
                Input your app idea and Gemini AI will architect the complete Master Prompt
              </p>
            </div>

            {/* Missing API Key Warning Banner */}
            {!apiKey && (
              <div className="p-3 bg-amber-950/40 border border-amber-500/20 rounded mb-4 flex items-center justify-between gap-3 text-xs text-amber-300">
                <span>Google AI Studio API Key is required to generate prompts.</span>
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

            {/* Basic Idea Input */}
            <div className="space-y-1.5 mb-4">
              <label className="text-xs font-semibold text-slate-200 block">
                Basic App / Product Idea
              </label>
              <textarea
                rows={5}
                placeholder="e.g. A modern fitness tracker web app with custom workout plans, calorie counter, progress charts, and social sharing..."
                value={basicIdea}
                onChange={(e) => setBasicIdea(e.target.value)}
                className="w-full dark-input text-xs p-3 resize-none leading-relaxed"
              />
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

            {/* Submit Action */}
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 btn-dark text-xs font-semibold rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-5 py-2 bg-[#0866FF] hover:bg-[#0052D4] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow disabled:opacity-50"
              >
                <span>Generate Pro Prompt</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
