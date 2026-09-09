import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Check, AlertCircle, ExternalLink, Loader2 } from 'lucide-react';
import { getSavedApiKey, saveApiKey, validateApiKey } from '../services/aiService';

interface ApiKeySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved?: () => void;
}

export const ApiKeySettingsModal: React.FC<ApiKeySettingsModalProps> = ({
  isOpen,
  onClose,
  onKeySaved,
}) => {
  const [apiKey, setApiKeyInput] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      const saved = getSavedApiKey();
      setApiKeyInput(saved);
      setErrorMessage('');
      setSuccessMessage('');
      setIsValidating(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveApiKey = async () => {
    const trimmed = apiKey.trim();
    if (!trimmed) {
      setErrorMessage('Please enter a valid Google AI Studio API Key.');
      return;
    }

    setIsValidating(true);
    setErrorMessage('');
    setSuccessMessage('');

    const result = await validateApiKey(trimmed);
    setIsValidating(false);

    if (!result.valid) {
      setErrorMessage(result.error || 'Invalid API Key. Please verify your Google AI Studio key.');
      return;
    }

    saveApiKey(trimmed);
    setSuccessMessage('✓ API Key verified and saved successfully!');
    if (onKeySaved) onKeySaved();
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070C]/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#111622] rounded-lg border border-[#1E2638] p-5 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded hover:bg-[#161C2A] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <h3 className="text-base font-bold text-white">Google AI Studio API Key</h3>
          <p className="text-xs text-slate-400">
            Configure your single API Key for AI prompt expansion, UI screen generation, and logo creation.
          </p>
        </div>

        {/* API Key Input */}
        <div className="space-y-3 mb-4">
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">
              API Key (AIzaSy...)
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                placeholder="Paste your Google AI Studio API Key..."
                value={apiKey}
                onChange={(e) => {
                  setApiKeyInput(e.target.value);
                }}
                className="w-full dark-input text-xs p-2.5 pr-8 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Instruction to get key */}
          <div className="p-3 bg-[#0B0F17] rounded border border-[#1E2638] text-xs text-slate-300 space-y-1.5">
            <p className="font-semibold text-white">Where to find your key:</p>
            <ol className="list-decimal pl-4 space-y-1 text-slate-400 text-[11px]">
              <li>
                Open Google AI Studio portal:{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0866FF] hover:underline font-medium inline-flex items-center gap-0.5"
                >
                  aistudio.google.com/app/apikey <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>Click <strong>"Create API key"</strong> and copy your key string.</li>
              <li>Key is stored strictly in your browser's local storage.</li>
            </ol>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 flex items-center gap-2 p-2.5 bg-red-950/40 border border-red-500/20 rounded text-xs text-red-300">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 flex items-center gap-2 p-2.5 bg-emerald-950/40 border border-emerald-500/20 rounded text-xs text-emerald-300">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 btn-dark text-xs font-semibold rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveApiKey}
            disabled={isValidating}
            className="px-5 py-2 bg-[#0866FF] hover:bg-[#0052D4] text-white text-xs font-bold rounded shadow-sm transition flex items-center gap-1.5 disabled:opacity-50"
          >
            {isValidating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Verifying Key...</span>
              </>
            ) : (
              <span>Verify & Save API Key</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
