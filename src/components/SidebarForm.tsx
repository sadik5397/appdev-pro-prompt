import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronRight, ChevronLeft, Plus, Trash2, Heart } from 'lucide-react';
import type { MasterPromptData, Feature, ScreenSpec } from '../types/prompt';

interface SidebarFormProps {
  data: MasterPromptData;
  onChange: (newData: MasterPromptData) => void;
  onOpenAiModal: () => void;
}

export const SidebarForm: React.FC<SidebarFormProps> = ({
  data,
  onChange,
  onOpenAiModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [openSection, setOpenSection] = useState<string | null>('sec-1');
  const tabsRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 0, label: 'Overview & Vision' },
    { id: 1, label: 'Scope & Features' },
    { id: 2, label: 'UI & Screens' },
    { id: 3, label: 'Data & Arch' },
    { id: 4, label: 'Quality & Done' },
  ];

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = direction === 'left' ? -140 : 140;
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  // Helper functions
  const updateOverview = (field: keyof MasterPromptData['overview'], val: string) => {
    onChange({
      ...data,
      overview: { ...data.overview, [field]: val },
    });
  };

  const updateVision = (field: keyof MasterPromptData['vision'], val: any) => {
    onChange({
      ...data,
      vision: { ...data.vision, [field]: val },
    });
  };

  const updateDesignSystem = (field: keyof MasterPromptData['designSystem'], val: any) => {
    onChange({
      ...data,
      designSystem: { ...data.designSystem, [field]: val },
    });
  };

  // Array Helpers
  const addStringArrayItem = (path: string[], newItem: string = '') => {
    const newData = JSON.parse(JSON.stringify(data));
    let ptr = newData;
    for (let i = 0; i < path.length - 1; i++) {
      ptr = ptr[path[i]];
    }
    const arrKey = path[path.length - 1];
    ptr[arrKey].push(newItem);
    onChange(newData);
  };

  const updateStringArrayItem = (path: string[], index: number, val: string) => {
    const newData = JSON.parse(JSON.stringify(data));
    let ptr = newData;
    for (let i = 0; i < path.length - 1; i++) {
      ptr = ptr[path[i]];
    }
    const arrKey = path[path.length - 1];
    ptr[arrKey][index] = val;
    onChange(newData);
  };

  const removeStringArrayItem = (path: string[], index: number) => {
    const newData = JSON.parse(JSON.stringify(data));
    let ptr = newData;
    for (let i = 0; i < path.length - 1; i++) {
      ptr = ptr[path[i]];
    }
    const arrKey = path[path.length - 1];
    ptr[arrKey].splice(index, 1);
    onChange(newData);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0B0F17]">
      {/* Top Action Bar (Single Clean AI Auto-Generate Button) */}
      <div className="p-3 border-b border-[#1E2638] bg-[#0B0F17]">
        <button
          onClick={onOpenAiModal}
          className="w-full py-2 px-3 bg-[#0866FF] hover:bg-[#0052D4] text-white text-xs font-bold rounded shadow-sm transition"
        >
          AI Auto-Generate Prompt
        </button>
      </div>

      {/* Single-Line Category Tabs Bar with Arrow Navigation */}
      <div className="flex items-center border-b border-[#1E2638] bg-[#0D111A] px-1 py-1.5 gap-1">
        {/* Scroll Left Button */}
        <button
          onClick={() => scrollTabs('left')}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-[#161C2A] rounded border border-[#1E2638] flex-shrink-0 transition"
          title="Scroll Left"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Scrollable Single-Line Tab Container */}
        <div
          ref={tabsRef}
          className="flex-1 flex items-center gap-1 overflow-x-auto scroll-smooth scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition whitespace-nowrap flex-shrink-0 border ${
                activeCategory === cat.id
                  ? 'bg-[#0866FF] text-white border-[#0866FF] shadow-sm font-bold'
                  : 'bg-[#111622] text-slate-300 border-[#1E2638] hover:bg-[#161C2A] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => scrollTabs('right')}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-[#161C2A] rounded border border-[#1E2638] flex-shrink-0 transition"
          title="Scroll Right"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Scrollable Tab Content Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-24">
        {/* TAB 0: OVERVIEW & VISION */}
        {activeCategory === 0 && (
          <>
            <AccordionCard
              id="sec-0"
              title="0. Execution Principles"
              isOpen={openSection === 'sec-0'}
              onToggle={() => toggleSection('sec-0')}
            >
              <div className="space-y-2">
                {data.executionPrinciples.map((ep, idx) => (
                  <div key={ep.id || idx} className="flex gap-2 items-center">
                    <span className="text-xs text-slate-500 font-mono w-4">{idx + 1}.</span>
                    <input
                      type="text"
                      value={ep.text}
                      onChange={(e) => {
                        const updated = [...data.executionPrinciples];
                        updated[idx].text = e.target.value;
                        onChange({ ...data, executionPrinciples: updated });
                      }}
                      className="flex-1 dark-input text-xs p-2"
                    />
                    <button
                      onClick={() => {
                        const updated = data.executionPrinciples.filter((_, i) => i !== idx);
                        onChange({ ...data, executionPrinciples: updated });
                      }}
                      className="p-1 text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const updated = [
                      ...data.executionPrinciples,
                      { id: String(Date.now()), text: 'New Execution Principle' },
                    ];
                    onChange({ ...data, executionPrinciples: updated });
                  }}
                  className="mt-2 text-xs text-[#0866FF] hover:underline font-medium flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Execution Principle
                </button>
              </div>
            </AccordionCard>

            <AccordionCard
              id="sec-1"
              title="1. Product Overview"
              isOpen={openSection === 'sec-1'}
              onToggle={() => toggleSection('sec-1')}
            >
              <div className="space-y-2.5">
                <div>
                  <label className="text-xs font-medium text-slate-300">App Name</label>
                  <input
                    type="text"
                    value={data.overview.appName}
                    onChange={(e) => updateOverview('appName', e.target.value)}
                    className="w-full dark-input text-xs p-2 mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-slate-300">Product Type</label>
                    <input
                      type="text"
                      value={data.overview.productType}
                      onChange={(e) => updateOverview('productType', e.target.value)}
                      className="w-full dark-input text-xs p-2 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300">Platform</label>
                    <input
                      type="text"
                      value={data.overview.platform}
                      onChange={(e) => updateOverview('platform', e.target.value)}
                      className="w-full dark-input text-xs p-2 mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300">Primary Tech Stack</label>
                  <input
                    type="text"
                    value={data.overview.primaryTech}
                    onChange={(e) => updateOverview('primaryTech', e.target.value)}
                    className="w-full dark-input text-xs p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300">One-Sentence Definition</label>
                  <textarea
                    rows={2}
                    value={data.overview.oneSentenceDef}
                    onChange={(e) => updateOverview('oneSentenceDef', e.target.value)}
                    className="w-full dark-input text-xs p-2 mt-1 resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300">Product Goal</label>
                  <textarea
                    rows={2}
                    value={data.overview.productGoal}
                    onChange={(e) => updateOverview('productGoal', e.target.value)}
                    className="w-full dark-input text-xs p-2 mt-1 resize-none"
                  />
                </div>
              </div>
            </AccordionCard>

            <AccordionCard
              id="sec-2"
              title="2. Product Vision"
              isOpen={openSection === 'sec-2'}
              onToggle={() => toggleSection('sec-2')}
            >
              <div className="space-y-3">
                <StringListEditor
                  title="Product Should Feel:"
                  items={data.vision.feelList}
                  onUpdate={(idx, val) => updateStringArrayItem(['vision', 'feelList'], idx, val)}
                  onAdd={() => addStringArrayItem(['vision', 'feelList'], 'New feel trait')}
                  onRemove={(idx) => removeStringArrayItem(['vision', 'feelList'], idx)}
                />
                <StringListEditor
                  title="Product Should NOT Feel:"
                  items={data.vision.notFeelList}
                  onUpdate={(idx, val) => updateStringArrayItem(['vision', 'notFeelList'], idx, val)}
                  onAdd={() => addStringArrayItem(['vision', 'notFeelList'], 'New unwanted trait')}
                  onRemove={(idx) => removeStringArrayItem(['vision', 'notFeelList'], idx)}
                />
                <div>
                  <label className="text-xs font-medium text-slate-300">Core Principle</label>
                  <input
                    type="text"
                    value={data.vision.corePrinciple}
                    onChange={(e) => updateVision('corePrinciple', e.target.value)}
                    className="w-full dark-input text-xs p-2 mt-1"
                  />
                </div>
              </div>
            </AccordionCard>
          </>
        )}

        {/* TAB 1: SCOPE & FEATURES */}
        {activeCategory === 1 && (
          <>
            <AccordionCard
              id="sec-3"
              title="3. Scope & Priorities (P0-P4)"
              isOpen={openSection === 'sec-3'}
              onToggle={() => toggleSection('sec-3')}
            >
              <div className="space-y-3">
                <StringListEditor
                  title="3.1 IN SCOPE:"
                  items={data.scope.inScope}
                  onUpdate={(idx, val) => updateStringArrayItem(['scope', 'inScope'], idx, val)}
                  onAdd={() => addStringArrayItem(['scope', 'inScope'], 'In-scope feature')}
                  onRemove={(idx) => removeStringArrayItem(['scope', 'inScope'], idx)}
                />
                <StringListEditor
                  title="3.2 OUT OF SCOPE:"
                  items={data.scope.outOfScope}
                  onUpdate={(idx, val) => updateStringArrayItem(['scope', 'outOfScope'], idx, val)}
                  onAdd={() => addStringArrayItem(['scope', 'outOfScope'], 'Out-of-scope item')}
                  onRemove={(idx) => removeStringArrayItem(['scope', 'outOfScope'], idx)}
                />
                <StringListEditor
                  title="P0 Priorities (Non-negotiable):"
                  items={data.requirementPriority.p0}
                  onUpdate={(idx, val) => updateStringArrayItem(['requirementPriority', 'p0'], idx, val)}
                  onAdd={() => addStringArrayItem(['requirementPriority', 'p0'], 'P0 item')}
                  onRemove={(idx) => removeStringArrayItem(['requirementPriority', 'p0'], idx)}
                />
              </div>
            </AccordionCard>

            <AccordionCard
              id="sec-4"
              title="4. User Journeys"
              isOpen={openSection === 'sec-4'}
              onToggle={() => toggleSection('sec-4')}
            >
              <div className="space-y-3">
                {data.userJourneys.map((uj, idx) => (
                  <div key={uj.id || idx} className="p-2.5 bg-[#0B0F17] rounded border border-[#1E2638] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-300">Journey {idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = data.userJourneys.filter((_, i) => i !== idx);
                          onChange({ ...data, userJourneys: updated });
                        }}
                        className="text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Journey Name"
                      value={uj.name}
                      onChange={(e) => {
                        const updated = [...data.userJourneys];
                        updated[idx].name = e.target.value;
                        onChange({ ...data, userJourneys: updated });
                      }}
                      className="w-full dark-input text-xs p-1.5"
                    />
                    <textarea
                      rows={3}
                      placeholder="Flow Diagram"
                      value={uj.flow}
                      onChange={(e) => {
                        const updated = [...data.userJourneys];
                        updated[idx].flow = e.target.value;
                        onChange({ ...data, userJourneys: updated });
                      }}
                      className="w-full dark-input text-xs font-mono p-1.5 resize-none"
                    />
                  </div>
                ))}
                <button
                  onClick={() => {
                    const updated = [
                      ...data.userJourneys,
                      { id: String(Date.now()), name: 'New Journey', flow: '[Entry] -> [Action] -> [Result]' },
                    ];
                    onChange({ ...data, userJourneys: updated });
                  }}
                  className="text-xs text-[#0866FF] hover:underline font-medium flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add User Journey
                </button>
              </div>
            </AccordionCard>

            <AccordionCard
              id="sec-5"
              title="5. Core Features"
              isOpen={openSection === 'sec-5'}
              onToggle={() => toggleSection('sec-5')}
            >
              <div className="space-y-3">
                {data.features.map((feat, idx) => (
                  <div key={feat.id || idx} className="p-2.5 bg-[#0B0F17] rounded border border-[#1E2638] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-200">Feature {idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = data.features.filter((_, i) => i !== idx);
                          onChange({ ...data, features: updated });
                        }}
                        className="text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Feature Name"
                      value={feat.name}
                      onChange={(e) => {
                        const updated = [...data.features];
                        updated[idx].name = e.target.value;
                        onChange({ ...data, features: updated });
                      }}
                      className="w-full dark-input text-xs p-1.5 font-semibold"
                    />
                    <textarea
                      rows={2}
                      placeholder="Purpose"
                      value={feat.purpose}
                      onChange={(e) => {
                        const updated = [...data.features];
                        updated[idx].purpose = e.target.value;
                        onChange({ ...data, features: updated });
                      }}
                      className="w-full dark-input text-xs p-1.5 resize-none"
                    />
                  </div>
                ))}
                <button
                  onClick={() => {
                    const updatedFeature: Feature = {
                      id: String(Date.now()),
                      name: 'New Feature',
                      purpose: 'Feature purpose',
                      flow: '[Step] -> [Result]',
                      functionalReqs: ['Requirement 1'],
                      businessRules: ['Rule 1'],
                      edgeCases: ['Edge Case 1'],
                      acceptanceCriteria: ['Criterion 1'],
                    };
                    onChange({ ...data, features: [...data.features, updatedFeature] });
                  }}
                  className="text-xs text-[#0866FF] hover:underline font-medium flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Feature
                </button>
              </div>
            </AccordionCard>
          </>
        )}

        {/* TAB 2: UI & SCREENS */}
        {activeCategory === 2 && (
          <>
            <AccordionCard
              id="sec-6"
              title="6. Screens & Page Specs"
              isOpen={openSection === 'sec-6'}
              onToggle={() => toggleSection('sec-6')}
            >
              <div className="space-y-3">
                {data.screens.map((scr, idx) => (
                  <div key={scr.id || idx} className="p-2.5 bg-[#0B0F17] rounded border border-[#1E2638] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-200">Screen: {scr.name}</span>
                      <button
                        onClick={() => {
                          const updated = data.screens.filter((_, i) => i !== idx);
                          onChange({ ...data, screens: updated });
                        }}
                        className="text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={scr.name}
                      onChange={(e) => {
                        const updated = [...data.screens];
                        updated[idx].name = e.target.value;
                        onChange({ ...data, screens: updated });
                      }}
                      className="w-full dark-input text-xs p-1.5"
                    />
                    <textarea
                      rows={3}
                      placeholder="Layout ASCII Diagram"
                      value={scr.layout}
                      onChange={(e) => {
                        const updated = [...data.screens];
                        updated[idx].layout = e.target.value;
                        onChange({ ...data, screens: updated });
                      }}
                      className="w-full dark-input text-xs font-mono p-1.5 resize-none"
                    />
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newScr: ScreenSpec = {
                      id: String(Date.now()),
                      name: 'New Screen',
                      purpose: 'Screen Purpose',
                      entryPoints: ['Home Route'],
                      exitPoints: ['Back'],
                      layout: '[Header]\n\n[Content]\n\n[Action Button]',
                      components: ['Header', 'ContentArea'],
                      interactions: ['Click -> Navigate'],
                      states: ['Loading', 'Success', 'Error'],
                      validation: ['Required fields'],
                      accessibility: ['Semantic tags'],
                    };
                    onChange({ ...data, screens: [...data.screens, newScr] });
                  }}
                  className="text-xs text-[#0866FF] hover:underline font-medium flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Screen Spec
                </button>
              </div>
            </AccordionCard>

            <AccordionCard
              id="sec-7"
              title="7. Design System"
              isOpen={openSection === 'sec-7'}
              onToggle={() => toggleSection('sec-7')}
            >
              <div className="space-y-2.5">
                <div>
                  <label className="text-xs font-medium text-slate-300">Visual Direction</label>
                  <textarea
                    rows={2}
                    value={data.designSystem.visualDirection}
                    onChange={(e) => updateDesignSystem('visualDirection', e.target.value)}
                    className="w-full dark-input text-xs p-2 mt-1 resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-slate-400">Background</label>
                    <input
                      type="text"
                      value={data.designSystem.bg}
                      onChange={(e) => updateDesignSystem('bg', e.target.value)}
                      className="w-full dark-input text-xs p-1.5 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-400">Primary Color</label>
                    <input
                      type="text"
                      value={data.designSystem.primary}
                      onChange={(e) => updateDesignSystem('primary', e.target.value)}
                      className="w-full dark-input text-xs p-1.5 mt-1"
                    />
                  </div>
                </div>
              </div>
            </AccordionCard>
          </>
        )}

        {/* TAB 3: DATA & ARCH */}
        {activeCategory === 3 && (
          <>
            <AccordionCard
              id="sec-10"
              title="10. Data Model & Entities"
              isOpen={openSection === 'sec-10'}
              onToggle={() => toggleSection('sec-10')}
            >
              <div className="space-y-3">
                {data.entities.map((ent, idx) => (
                  <div key={ent.id || idx} className="p-2.5 bg-[#0B0F17] rounded border border-[#1E2638] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-200">Entity: {ent.name}</span>
                      <button
                        onClick={() => {
                          const updated = data.entities.filter((_, i) => i !== idx);
                          onChange({ ...data, entities: updated });
                        }}
                        className="text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={ent.name}
                      onChange={(e) => {
                        const updated = [...data.entities];
                        updated[idx].name = e.target.value;
                        onChange({ ...data, entities: updated });
                      }}
                      className="w-full dark-input text-xs p-1.5"
                    />
                  </div>
                ))}
              </div>
            </AccordionCard>

            <AccordionCard
              id="sec-14"
              title="14. Architecture"
              isOpen={openSection === 'sec-14'}
              onToggle={() => toggleSection('sec-14')}
            >
              <div>
                <label className="text-xs font-medium text-slate-300">Directory Tree Structure</label>
                <textarea
                  rows={6}
                  value={data.architecture.directoryTree}
                  onChange={(e) => {
                    onChange({
                      ...data,
                      architecture: { ...data.architecture, directoryTree: e.target.value },
                    });
                  }}
                  className="w-full dark-input text-xs font-mono p-2 mt-1 resize-none"
                />
              </div>
            </AccordionCard>
          </>
        )}

        {/* TAB 4: QUALITY & DONE */}
        {activeCategory === 4 && (
          <>
            <AccordionCard
              id="sec-23"
              title="23. Testing Strategy"
              isOpen={openSection === 'sec-23'}
              onToggle={() => toggleSection('sec-23')}
            >
              <div className="space-y-3">
                <StringListEditor
                  title="Unit Tests:"
                  items={data.testing.unitTests}
                  onUpdate={(idx, val) => updateStringArrayItem(['testing', 'unitTests'], idx, val)}
                  onAdd={() => addStringArrayItem(['testing', 'unitTests'], 'New unit test')}
                  onRemove={(idx) => removeStringArrayItem(['testing', 'unitTests'], idx)}
                />
              </div>
            </AccordionCard>

            <AccordionCard
              id="sec-25"
              title="25. Development Plan"
              isOpen={openSection === 'sec-25'}
              onToggle={() => toggleSection('sec-25')}
            >
              <div>
                <textarea
                  rows={5}
                  value={data.devPlanPhases}
                  onChange={(e) => onChange({ ...data, devPlanPhases: e.target.value })}
                  className="w-full dark-input text-xs p-2 resize-none"
                />
              </div>
            </AccordionCard>

            <AccordionCard
              id="sec-31"
              title="31. Mandatory Alignment & Plan"
              isOpen={openSection === 'sec-31'}
              onToggle={() => toggleSection('sec-31')}
            >
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 block">
                  Initial Questioning & Implementation Plan Instructions
                </label>
                <textarea
                  rows={4}
                  value={data.interactiveAlignment || ''}
                  onChange={(e) => onChange({ ...data, interactiveAlignment: e.target.value })}
                  className="w-full dark-input text-xs p-2 resize-none leading-relaxed"
                />
              </div>
            </AccordionCard>
          </>
        )}
      </div>

      {/* Sidebar Footer Credit */}
      <div className="px-3.5 py-2.5 border-t border-[#1E2638] bg-[#090D15] flex items-center justify-between text-[11px] text-slate-400 flex-shrink-0">
        <span className="flex items-center gap-1">
          Crafted with <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> by{' '}
          <a
            href="https://sadik.work/github"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-200 hover:text-[#0866FF] font-semibold underline decoration-slate-600 hover:decoration-[#0866FF] transition"
          >
            S.a. Sadik
          </a>
        </span>
        <span className="text-slate-500 font-mono text-[10px]">© 2026 Appdev Pro</span>
      </div>
    </div>
  );
};

interface AccordionCardProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AccordionCard: React.FC<AccordionCardProps> = ({
  title,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <div className="dark-card overflow-hidden">
      <button
        onClick={onToggle}
        className={`w-full px-3 py-2.5 flex items-center justify-between transition text-left ${
          isOpen ? 'bg-[#161C2A] border-b border-[#1E2638]' : 'bg-[#111622] hover:bg-[#161C2A]'
        }`}
      >
        <span className="text-xs font-bold text-slate-200">{title}</span>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        )}
      </button>

      {isOpen && <div className="p-3 bg-[#111622]">{children}</div>}
    </div>
  );
};

interface StringListEditorProps {
  title: string;
  items: string[];
  onUpdate: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const StringListEditor: React.FC<StringListEditorProps> = ({
  title,
  items,
  onUpdate,
  onAdd,
  onRemove,
}) => {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-slate-300 block">{title}</label>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-1.5">
          <input
            type="text"
            value={item}
            onChange={(e) => onUpdate(idx, e.target.value)}
            className="flex-1 dark-input text-xs p-1.5"
          />
          <button
            onClick={() => onRemove(idx)}
            className="p-1 text-slate-500 hover:text-red-400 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="text-[11px] text-[#0866FF] hover:underline font-medium flex items-center gap-1 mt-1"
      >
        <Plus className="w-3 h-3" /> Add item
      </button>
    </div>
  );
};
