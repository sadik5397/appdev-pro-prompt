import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface ApiKeyHintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyHintModal: React.FC<ApiKeyHintModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070C]/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#111622] rounded-lg border border-[#1E2638] p-5 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded hover:bg-[#161C2A] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <h3 className="text-base font-bold text-white">How to Get Google AI Studio API Key</h3>
          <p className="text-xs text-slate-400">Free API Key for Gemini & Pro Prompt Generation</p>
        </div>

        {/* Steps */}
        <div className="space-y-3 text-xs text-slate-300 my-4">
          <div className="flex gap-3 p-3 bg-[#0B0F17] rounded border border-[#1E2638]">
            <span className="flex-shrink-0 w-5 h-5 rounded bg-[#F9572A] text-white font-bold flex items-center justify-center text-xs">
              1
            </span>
            <div>
              <p className="font-semibold text-white">Open Google AI Studio</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Go to the official Google AI Studio developer portal.
              </p>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-[#F9572A] hover:underline font-medium mt-1"
              >
                aistudio.google.com/app/apikey <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-[#0B0F17] rounded border border-[#1E2638]">
            <span className="flex-shrink-0 w-5 h-5 rounded bg-[#F9572A] text-white font-bold flex items-center justify-center text-xs">
              2
            </span>
            <div>
              <p className="font-semibold text-white">Sign In & Click "Create API key"</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Sign in with any standard Google account and click "Create API key in new project".
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-[#0B0F17] rounded border border-[#1E2638]">
            <span className="flex-shrink-0 w-5 h-5 rounded bg-[#F9572A] text-white font-bold flex items-center justify-center text-xs">
              3
            </span>
            <div>
              <p className="font-semibold text-white">Copy & Paste into Appdev Pro Prompt</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Copy your generated key (starts with <code className="text-amber-400">AIzaSy...</code>) and paste it into the field on the top left sidebar.
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-[11px] text-emerald-400 bg-emerald-950/40 p-2.5 rounded border border-emerald-500/20">
          Your API key is saved strictly in your browser's local storage and is never sent to any external server.
        </div>

        {/* Footer */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 btn-orange text-xs font-semibold rounded shadow-sm"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
