import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Copy, Check } from 'lucide-react';

interface MarkdownViewerProps {
  markdownText: string;
  onCopy: () => void;
  isCopied: boolean;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  markdownText,
  onCopy,
  isCopied,
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');

  const wordCount = markdownText.trim().split(/\s+/).filter(Boolean).length;
  const charCount = markdownText.length;
  const tokenEstimate = Math.round(wordCount * 1.3);

  return (
    <div className="w-full h-full flex flex-col bg-[#0B0F17] border-l border-[#1E2638]">
      {/* Viewer Header Toolbar */}
      <div className="h-14 border-b border-[#1E2638] bg-[#0B0F17] px-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-200">Master Prompt Live Viewer</span>

          {/* Stats Badge */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400 font-mono bg-[#111622] px-2.5 py-1 rounded border border-[#1E2638]">
            <span>{wordCount.toLocaleString()} words</span>
            <span className="text-slate-600">•</span>
            <span>{charCount.toLocaleString()} chars</span>
            <span className="text-slate-600">•</span>
            <span className="text-[#0866FF]">~{tokenEstimate.toLocaleString()} tokens</span>
          </div>
        </div>

        {/* View Switcher & Copy */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex bg-[#111622] p-0.5 rounded border border-[#1E2638]">
            <button
              onClick={() => setViewMode('preview')}
              className={`text-xs px-2.5 py-1 rounded font-medium transition ${
                viewMode === 'preview'
                  ? 'bg-[#0866FF] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`text-xs px-2.5 py-1 rounded font-medium transition ${
                viewMode === 'raw'
                  ? 'bg-[#0866FF] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Raw Code
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={onCopy}
            className="flex items-center gap-1 px-2.5 py-1.5 btn-dark text-xs font-medium rounded"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth bg-[#0B0F17]">
        {viewMode === 'preview' ? (
          <div className="max-w-4xl mx-auto prose-dark">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {markdownText}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <pre className="bg-[#111622] p-4 rounded border border-[#1E2638] text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed select-all">
              {markdownText}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
