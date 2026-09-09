import { useState, useMemo } from 'react';
import { initialDefaultPromptData } from './utils/defaultPrompt';
import { generateMasterPromptMarkdown } from './utils/markdownGenerator';
import type { MasterPromptData } from './types/prompt';
import { Navbar } from './components/Navbar';
import { SidebarForm } from './components/SidebarForm';
import { MarkdownViewer } from './components/MarkdownViewer';
import { ApiKeySettingsModal } from './components/ApiKeySettingsModal';
import { UiScreenGeneratorModal } from './components/UiScreenGeneratorModal';
import { LogoGeneratorModal } from './components/LogoGeneratorModal';
import { AiPromptBuilderModal } from './components/AiPromptBuilderModal';

export function App() {
  const [promptData, setPromptData] = useState<MasterPromptData>(initialDefaultPromptData);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isKeySettingsModalOpen, setIsKeySettingsModalOpen] = useState(false);
  const [isUiModalOpen, setIsUiModalOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Generate live Markdown from current prompt state
  const markdownText = useMemo(() => {
    return generateMasterPromptMarkdown(promptData);
  }, [promptData]);

  // Copy Markdown to Clipboard
  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Download Master Prompt (.md)
  const handleDownloadMarkdown = () => {
    const appName = promptData.overview.appName || 'Master_Prompt';
    const fileName = `${appName.trim().replace(/\s+/g, '_')}_Master_Prompt.md`;
    const blob = new Blob([markdownText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0B0F17] text-slate-100 overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation Bar */}
      <Navbar
        appName={promptData.overview.appName}
        onSelectPreset={(newPresetData) => setPromptData(newPresetData)}
        onDownloadMarkdown={handleDownloadMarkdown}
        onOpenUiModal={() => setIsUiModalOpen(true)}
        onOpenLogoModal={() => setIsLogoModalOpen(true)}
        onOpenKeySettings={() => setIsKeySettingsModalOpen(true)}
      />

      {/* Main Split Layout: Left Sidebar + Right Preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Controls & Categorized Forms */}
        <aside className="w-full md:w-[420px] lg:w-[460px] flex-shrink-0 h-full border-r border-[#1E2638] bg-[#0B0F17] z-10 overflow-hidden">
          <SidebarForm
            data={promptData}
            onChange={(updated) => setPromptData(updated)}
            onOpenAiModal={() => setIsAiModalOpen(true)}
          />
        </aside>

        {/* Right Panel: Live Markdown Previewer */}
        <main className="hidden md:flex flex-1 h-full overflow-hidden">
          <MarkdownViewer
            markdownText={markdownText}
            onCopy={handleCopyMarkdown}
            isCopied={isCopied}
          />
        </main>
      </div>

      {/* Modals */}
      <AiPromptBuilderModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onPromptGenerated={(data) => setPromptData(data)}
        onOpenKeySettings={() => setIsKeySettingsModalOpen(true)}
      />
      <ApiKeySettingsModal
        isOpen={isKeySettingsModalOpen}
        onClose={() => setIsKeySettingsModalOpen(false)}
      />
      <UiScreenGeneratorModal
        isOpen={isUiModalOpen}
        onClose={() => setIsUiModalOpen(false)}
        appName={promptData.overview.appName}
        onOpenKeySettings={() => setIsKeySettingsModalOpen(true)}
      />
      <LogoGeneratorModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
        appName={promptData.overview.appName}
        onOpenKeySettings={() => setIsKeySettingsModalOpen(true)}
      />
    </div>
  );
}

export default App;
