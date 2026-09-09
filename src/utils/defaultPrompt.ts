import type { MasterPromptData } from '../types/prompt';

export const initialDefaultPromptData: MasterPromptData = {
  executionPrinciples: [
    { id: '1', text: 'Requirements are the source of truth.' },
    { id: '2', text: 'Do not invent major product behavior that is not specified.' },
    { id: '3', text: 'If a requirement is ambiguous, choose the simplest reasonable implementation that preserves product intent.' },
    { id: '4', text: 'Do not over-engineer.' },
    { id: '5', text: 'Do not introduce infrastructure that the product does not need.' },
    { id: '6', text: 'Keep business logic separate from UI.' },
    { id: '7', text: 'Keep the implementation testable.' },
    { id: '8', text: 'Prefer maintainability over cleverness.' },
    { id: '9', text: 'Prefer simple, reliable dependencies over unnecessary libraries.' },
    { id: '10', text: 'Do not stop at a visual prototype. Build the actual functional application.' },
    { id: '11', text: 'Do not leave important functionality as TODOs, placeholders, mock buttons, or fake flows.' },
    { id: '12', text: 'Validate your work continuously instead of assuming that generated code works.' },
  ],
  overview: {
    appName: 'MyAwesomeApp',
    productType: 'Web App / Cross-platform',
    platform: 'Web & Mobile',
    primaryTech: 'React + TypeScript + Tailwind CSS',
    oneSentenceDef: 'A sleek, lightning-fast application designed to streamline user productivity with intuitive tools.',
    productGoal: 'Solve real-world daily workflows by eliminating complexity and offering real-time updates.',
    targetUsers: 'Developers, designers, and busy professionals.',
    primaryOutcome: 'Manage workflows and export structured data seamlessly in fewer than 3 clicks.',
  },
  vision: {
    feelList: ['Fast & Responsive', 'Premium & Modern', 'Minimalist & Clean', 'Intuitive & Reliable'],
    notFeelList: ['Cluttered & Overwhelming', 'Complicated & Slow', 'Enterprise-heavy'],
    corePrinciple: 'The user should be able to complete the primary task in less than three interactions.',
    examplePrinciple: 'Zero unnecessary popups or blocking spinners for standard actions.',
  },
  scope: {
    inScope: [
      'Interactive Dashboard with real-time state management',
      'Local data persistence with export/import capabilities',
      'Dark/Light mode support with responsive layouts',
      'Comprehensive error handling and feedback states',
    ],
    outOfScope: [
      'Unneeded cloud synchronization backends',
      'Third-party social authentication options',
      'Enterprise role-based multi-tenant ACLs',
    ],
    mvpPriority: [
      'Core functionality',
      'Correctness',
      'User experience',
      'Performance',
      'Data integrity',
      'Visual polish',
    ],
  },
  requirementPriority: {
    p0: ['Core Application Logic', 'Data Persistence', 'Responsive UI Layout'],
    p1: ['Settings & Customization', 'Data Export / Import'],
    p2: ['Micro-animations & Transitions', 'Keyboard Shortcuts'],
    p3: ['Advanced Search & Filters'],
    p4: ['Cloud Sync', 'Realtime Collaboration'],
  },
  userJourneys: [
    {
      id: 'uj-1',
      name: 'Primary Task Creation & Management',
      flow: `[App Launch / Home]\n    ↓\n[Click "New Item" / Input Field]\n    ↓\n[Realtime State Update & Local Save]\n    ↓\n[View in Master List / Dashboard]`,
    },
    {
      id: 'uj-2',
      name: 'Configuration & Data Export',
      flow: `[Settings Panel]\n    ↓\n[Modify Preferences / Export (.json / .md)]\n    ↓\n[Instant Feedback Notification]`,
    },
  ],
  features: [
    {
      id: 'f-1',
      name: 'Core Item Generator & Manager',
      purpose: 'Allows users to create, update, reorder, and remove workspace entries with instant preview.',
      flow: `User Inputs Text → State Dispatches Update → UI Rerenders → LocalStorage Saved`,
      functionalReqs: [
        'Form inputs validate data in real-time',
        'Dynamic item addition/removal without page reload',
        'Auto-save changes locally',
      ],
      businessRules: [
        'Item titles cannot be empty',
        'Duplicate entries get unique IDs automatically',
      ],
      edgeCases: [
        'Storage limit reached → Warn user gracefully',
        'Rapid typing → Debounce persistent state writes',
      ],
      acceptanceCriteria: [
        'User can add a new item in < 1s',
        'Changes survive browser refresh',
        'Deleting an item requires single confirmation or undo',
      ],
    },
  ],
  screens: [
    {
      id: 's-1',
      name: 'Main Workspace Dashboard',
      purpose: 'The central hub containing the control sidebar on the left and live preview on the right.',
      entryPoints: ['App Root URL (/)'],
      exitPoints: ['Settings Modal', 'Export Modal'],
      layout: `[Top Header Bar: Title, Actions]\n\n[Left Panel: Controls & Forms]  |  [Right Panel: Live Preview]\n\n[Bottom Status Bar: Word Count, Token Estimate]`,
      components: ['HeaderNav', 'SidebarForm', 'LivePreview', 'ActionButtons'],
      interactions: ['Type in field → Live Preview update', 'Click Download → Save File'],
      states: ['Loading', 'Empty State', 'Active State', 'Error Banner'],
      validation: ['Required fields highlighted', 'API Key validated before AI call'],
      accessibility: ['Full keyboard navigation', 'Screen reader labels on buttons'],
    },
  ],
  designSystem: {
    visualDirection: 'Modern sleek dark mode with vibrant indigo/cyan accents, glassmorphic card overlays, and clean sans-serif typography.',
    bg: '#030712 (Slate 950)',
    primary: '#6366f1 (Indigo 500)',
    secondary: '#a855f7 (Purple 500)',
    error: '#ef4444 (Red 500)',
    success: '#10b981 (Emerald 500)',
    warning: '#f59e0b (Amber 500)',
    typography: 'Plus Jakarta Sans for UI headers & body text; Fira Code / JetBrains Mono for code blocks.',
    componentsList: [
      'PrimaryButton',
      'SecondaryButton',
      'GlassCard',
      'InputField',
      'DynamicListSection',
      'ToastNotification',
      'ModalDialog',
    ],
  },
  responsive: {
    minWidth: '320px (Mobile)',
    maxWidth: '2560px (Ultra-wide)',
    minHeight: '600px',
    rules: [
      'Sidebar collapses into drawer on mobile viewports (< 768px)',
      'Split screen layout on desktop (> 1024px)',
      'Touch-friendly button heights (min 44px)',
    ],
  },
  interactionRules: [
    'Hover effects on interactive cards and buttons with 150ms ease-in-out transition',
    'Toast feedback on copy, save, and download actions',
    'Instant live sync between form controls and previewer without lag',
  ],
  entities: [
    {
      id: 'e-1',
      name: 'PromptConfig',
      fields: ['id: string', 'title: string', 'data: JSON', 'createdAt: ISOString'],
      relationships: 'Contains multiple Features, Screens, and UserJourneys',
      validationRules: ['id must be unique UUID', 'title must be non-empty'],
    },
  ],
  persistence: {
    strategy: 'Local First (Browser LocalStorage / IndexedDB)',
    persistentData: ['User API Key', 'Active Prompt State', 'User Preferences', 'Saved History'],
    tech: 'Window.localStorage with JSON serialization',
    repositoryArch: 'Service abstraction layer (StorageService) handling read/write/migration.',
  },
  offlineNetwork: {
    option: 'OPTION A: Fully Offline',
    details: 'The core prompt builder and previewer work 100% offline. AI expansion and image generation calls occur on-demand via direct API requests when online.',
  },
  stateManagement: {
    tech: 'React State / Context API',
    rules: [
      'Keep business logic in custom hooks / service modules',
      'Avoid unnecessary global state re-renders',
      'Immutable state updates for arrays and section objects',
    ],
    exampleStates: 'idle | generating_prompt | generating_ui | generating_logo | error',
  },
  architecture: {
    directoryTree: `src/\n├── components/   # Sidebar, Preview, Modals, Forms\n├── services/     # Gemini API, Imagen API, LocalStorage\n├── types/        # TypeScript interfaces\n├── utils/        # Markdown generator, helper functions\n├── assets/       # Icons and graphics\n└── App.tsx       # Main Layout Component`,
    rules: [
      'UI components must not contain direct API call logic; use service methods',
      'Single source of truth for template state',
      'Modular form sections for clean maintainability',
    ],
  },
  navigation: {
    routesTree: 'Workspace (/)',
    initialRoute: '/',
    protectedRoutes: [],
    backBehavior: 'Browser history standard',
    rules: ['State preserved on tab navigation'],
  },
  errorHandling: [
    'Graceful error toast when API key is missing or invalid',
    'Fallback image generator if Imagen API rate limits occur',
    'Auto-recovery of unsaved state from localStorage on browser crash',
  ],
  securityPrivacy: [
    'API keys stored strictly in client-side localStorage',
    'Never log or transmit API keys to any third-party backend servers',
    'Sanitize user inputs before rendering in HTML containers',
  ],
  performance: [
    'Debounce heavy markdown rendering if prompt exceeds 10,000 words',
    'Lazy load image previews',
    'Target interaction response: < 50ms',
  ],
  accessibility: [
    'High contrast color ratios (WCAG AA compliant)',
    'Semantic HTML tags (header, nav, main, section, aside)',
    'Focus visible indicator rings on interactive elements',
  ],
  analytics: {
    required: false,
    serviceName: 'None',
    events: [],
  },
  integrations: [],
  configEnv: {
    environments: ['Development', 'Production'],
    configurableKeys: ['VITE_GEMINI_API_KEY (optional override)', 'LOCAL_STORAGE_KEY'],
  },
  testing: {
    unitTests: ['generateMasterPromptMarkdown() formatting tests', 'StorageService read/write tests'],
    widgetTests: ['Sidebar form field input triggers state update', 'Modal opens and closes cleanly'],
    integrationTests: ['Full flow: Enter API Key -> Generate Prompt -> Download Markdown'],
  },
  acceptanceCriteria: {
    functional: [
      'User can edit every section from the left sidebar',
      'Live markdown viewer updates in real time',
      'AI Prompt Generation fills all fields cleanly',
      'UI Screen Generation produces 2 Full HD images',
      'Logo Generation produces 1:1 square clean logo',
    ],
    ux: [
      'Responsive design works seamlessly on desktop and mobile',
      'Glassmorphic dark design aesthetic looks modern & high quality',
      'Action buttons are easily accessible at top right',
    ],
    technical: [
      'Zero console warnings or errors',
      'TypeScript compilation passes strictly',
      'Fast initial page load < 1s',
    ],
    productionReadiness: [
      'Clean build bundle',
      'No hardcoded API credentials',
      'Fully working download handlers',
    ],
  },
  devPlanPhases: `Phase 0: Architecture Setup & Design System\nPhase 1: Left Sidebar Form Controls & Dynamic List Managers\nPhase 2: Live Markdown Previewer Integration\nPhase 3: Google AI Studio Gemini Pro Prompt Expansion\nPhase 4: UI Screen & Logo AI Image Generation\nPhase 5: Export, Download & Preset Templates\nPhase 6: Verification & Polish`,
  implementationRules: [
    'Do not create fake functionality. If a button exists, it must execute its intended action.',
    'Do not leave core features as TODOs.',
    'Do not duplicate business logic.',
    'Keep user feedback fast and responsive.',
    'Build for actual specified requirements.',
  ],
  conflictResolution: 'In case of conflicting requirements, prioritize Core functionality > Correctness > User Experience > Visual Polish.',
  interactiveAlignment: 'Ask me clarifying questions until you are at least 95% confident about the product requirements and design vision. Do not build based on assumptions alone. Provide a comprehensive implementation plan and receive my explicit approval before proceeding.',
};

export const PRESET_TEMPLATES: { name: string; description: string; data: MasterPromptData }[] = [
  {
    name: 'Blank Standard Template',
    description: 'Clean default template with standard master prompt structure',
    data: initialDefaultPromptData,
  },
  {
    name: 'SaaS Analytics Dashboard',
    description: 'Modern B2B analytics platform with chart widgets and team permissions',
    data: {
      ...initialDefaultPromptData,
      overview: {
        appName: 'MetricsPulse',
        productType: 'SaaS Web Application',
        platform: 'Web & Desktop',
        primaryTech: 'Next.js 15 + Tailwind CSS + Tremor + Supabase',
        oneSentenceDef: 'Real-time revenue and customer analytics dashboard for modern SaaS teams.',
        productGoal: 'Provide actionable insights into ARR, churn, LTV, and user retention in under 5 seconds.',
        targetUsers: 'SaaS Founders, Product Managers, and Growth Leads.',
        primaryOutcome: 'Monitor real-time subscription health and export executive report summaries.',
      },
      scope: {
        ...initialDefaultPromptData.scope,
        inScope: [
          'MRR / ARR growth charts with interactive filters',
          'Customer cohort retention matrix',
          'CSV / PDF executive report exporter',
          'Realtime webhook integration for Stripe events',
        ],
      },
    },
  },
  {
    name: 'Fintech Expense & Budget Tracker',
    description: 'Personal finance web app with receipt scanner and monthly budget goal planner',
    data: {
      ...initialDefaultPromptData,
      overview: {
        appName: 'FlowSpend',
        productType: 'Fintech Web & Mobile App',
        platform: 'Cross-platform (Web / iOS / Android)',
        primaryTech: 'Flutter + SQLite + Firebase Auth',
        oneSentenceDef: 'An offline-first personal finance app that automatically categorizes spending and tracks savings goals.',
        productGoal: 'Help users achieve financial freedom by tracking daily spending and preventing overspending.',
        targetUsers: 'Young professionals, students, and freelancers.',
        primaryOutcome: 'Log daily expenses in 2 taps and view automated budget alerts.',
      },
    },
  },
];
