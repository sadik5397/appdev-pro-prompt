import React, { useState, useEffect } from 'react';
import { Sparkles, Key, HelpCircle, Eye, EyeOff, Check, AlertCircle, Loader2 } from 'lucide-react';
import { getSavedApiKey, saveApiKey, generateMasterPromptFromIdea } from '../services/aiService';
import type { MasterPromptData } from '../types/prompt';
import confetti from 'canvas-confetti';

interface IdeaToProPromptProps {
  onPromptGenerated: (data: MasterPromptData) => void;
  onOpenHintModal: () => void;
}

export const IdeaToProPrompt: React.FC<IdeaToProPromptProps> = ({
  onPromptGenerated,
  onOpenHintModal,
}) => {
  const [apiKey, setApiKeyInput] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [basicIdea, setBasicIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const saved = getSavedApiKey();
    if (saved) {
      setApiKeyInput(saved);
      setIsSaved(true);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      setErrorMessage('Please enter a valid Google AI Studio API Key.');
      return;
    }
    saveApiKey(apiKey.trim());
    setIsSaved(true);
    setErrorMessage('');
    setSuccessMsg('API Key saved in local storage!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setErrorMessage('Google AI Studio API Key is required.');
      return;
    }

    if (!basicIdea.trim()) {
      setErrorMessage('Please enter a basic product idea.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage('');
    setSuccessMsg('');

    try {
      saveApiKey(apiKey.trim());
      setIsSaved(true);

      const generatedData = await generateMasterPromptFromIdea(basicIdea, apiKey);
      onPromptGenerated(generatedData);

      setSuccessMsg('Master Prompt generated successfully!');
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
      setTimeout(() => setSuccessMsg(''), 4000);
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
    <div className="bg-[#111622] rounded-lg border border-[#1E2638] p-3.5 mb-4 shadow-sm">
      {/* Title Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#F9572A]/10 text-[#F9572A] flex items-center justify-center font-bold">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">IDEA to PRO PROMPT</h2>
        </div>
        <button
          onClick={onOpenHintModal}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white bg-[#161C2A] px-2 py-0.5 rounded border border-[#232D42] transition"
        >
          <HelpCircle className="w-3 h-3 text-slate-400" />
          <span>API Key Hint</span>
        </button>
      </div>

      {/* API Key Input */}
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-medium text-slate-300 flex items-center gap-1">
            <Key className="w-3 h-3 text-amber-400" />
            Google AI Studio API Key
          </label>
          {isSaved && (
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <Check className="w-3 h-3" /> Saved
            </span>
          )}
        </div>

        <div className="flex gap-1.5">
          <div className="relative flex-1">
            <input
              type={showApiKey ? 'text' : 'password'}
              placeholder="Paste Google AI Studio Key (AIzaSy...)"
              value={apiKey}
              onChange={(e) => {
                setApiKeyInput(e.target.value);
                setIsSaved(false);
              }}
              className="w-full bg-[#0B0F17] text-xs text-white placeholder-slate-500 px-2.5 py-1.5 pr-8 rounded border border-[#1E2638] focus:outline-none focus:border-[#F9572A] font-mono"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
          <button
            type="button"
            onClick={handleSaveApiKey}
            className="px-2.5 py-1.5 btn-dark text-xs font-medium rounded"
          >
            Save
          </button>
        </div>
      </div>

      {/* Basic IDEA Input */}
      <div className="space-y-1">
        <label className="text-[11px] font-medium text-slate-300 block">
          Basic Product Idea
        </label>
        <textarea
          rows={2}
          placeholder="e.g. A modern expense tracker web app with receipt scanner and monthly budget goal planner..."
          value={basicIdea}
          onChange={(e) => setBasicIdea(e.target.value)}
          className="w-full bg-[#0B0F17] text-xs text-white placeholder-slate-500 p-2.5 rounded border border-[#1E2638] focus:outline-none focus:border-[#F9572A] resize-none leading-relaxed"
        />
      </div>

      {/* Error / Success Messages */}
      {errorMessage && (
        <div className="mt-2.5 flex items-center gap-2 p-2 bg-red-950/40 border border-red-500/20 rounded text-xs text-red-300">
          <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMsg && (
        <div className="mt-2.5 flex items-center gap-2 p-2 bg-emerald-950/40 border border-emerald-500/20 rounded text-xs text-emerald-300">
          <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Generate Action Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full mt-3 py-2 px-3 btn-orange text-xs font-bold rounded flex items-center justify-center gap-1.5 shadow transition disabled:opacity-50"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
            <span>Generating Master Prompt...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Generate Pro Prompt</span>
          </>
        )}
      </button>
    </div>
  );
};
