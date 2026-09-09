export interface ExecutionPrinciple {
  id: string;
  text: string;
}

export interface ProductOverview {
  appName: string;
  productType: string;
  platform: string;
  primaryTech: string;
  oneSentenceDef: string;
  productGoal: string;
  targetUsers: string;
  primaryOutcome: string;
}

export interface ProductVision {
  feelList: string[];
  notFeelList: string[];
  corePrinciple: string;
  examplePrinciple: string;
}

export interface Scope {
  inScope: string[];
  outOfScope: string[];
  mvpPriority: string[];
}

export interface UserJourney {
  id: string;
  name: string;
  flow: string;
}

export interface Feature {
  id: string;
  name: string;
  purpose: string;
  flow: string;
  functionalReqs: string[];
  businessRules: string[];
  edgeCases: string[];
  acceptanceCriteria: string[];
}

export interface ScreenSpec {
  id: string;
  name: string;
  purpose: string;
  entryPoints: string[];
  exitPoints: string[];
  layout: string;
  components: string[];
  interactions: string[];
  states: string[];
  validation: string[];
  accessibility: string[];
}

export interface DesignSystem {
  visualDirection: string;
  bg: string;
  primary: string;
  secondary: string;
  error: string;
  success: string;
  warning: string;
  typography: string;
  componentsList: string[];
}

export interface ResponsiveDesign {
  minWidth: string;
  maxWidth: string;
  minHeight: string;
  rules: string[];
}

export interface Entity {
  id: string;
  name: string;
  fields: string[];
  relationships: string;
  validationRules: string[];
}

export interface DataPersistence {
  strategy: string;
  persistentData: string[];
  tech: string;
  repositoryArch: string;
}

export interface OfflineNetwork {
  option: 'OPTION A: Fully Offline' | 'OPTION B: Online' | 'OPTION C: Offline-First';
  details: string;
}

export interface StateManagement {
  tech: string;
  rules: string[];
  exampleStates: string;
}

export interface Architecture {
  directoryTree: string;
  rules: string[];
}

export interface Navigation {
  routesTree: string;
  initialRoute: string;
  protectedRoutes: string[];
  backBehavior: string;
  rules: string[];
}

export interface ThirdPartyService {
  id: string;
  name: string;
  purpose: string;
  required: boolean;
  failureBehavior: string;
  configuration: string;
}

export interface TestingStrategy {
  unitTests: string[];
  widgetTests: string[];
  integrationTests: string[];
}

export interface AcceptanceCriteria {
  functional: string[];
  ux: string[];
  technical: string[];
  productionReadiness: string[];
}

export interface RequirementPriority {
  p0: string[];
  p1: string[];
  p2: string[];
  p3: string[];
  p4: string[];
}

export interface MasterPromptData {
  executionPrinciples: ExecutionPrinciple[];
  overview: ProductOverview;
  vision: ProductVision;
  scope: Scope;
  requirementPriority: RequirementPriority;
  userJourneys: UserJourney[];
  features: Feature[];
  screens: ScreenSpec[];
  designSystem: DesignSystem;
  responsive: ResponsiveDesign;
  interactionRules: string[];
  entities: Entity[];
  persistence: DataPersistence;
  offlineNetwork: OfflineNetwork;
  stateManagement: StateManagement;
  architecture: Architecture;
  navigation: Navigation;
  errorHandling: string[];
  securityPrivacy: string[];
  performance: string[];
  accessibility: string[];
  analytics: {
    required: boolean;
    serviceName: string;
    events: string[];
  };
  integrations: ThirdPartyService[];
  configEnv: {
    environments: string[];
    configurableKeys: string[];
  };
  testing: TestingStrategy;
  acceptanceCriteria: AcceptanceCriteria;
  devPlanPhases: string;
  implementationRules: string[];
  conflictResolution: string;
  interactiveAlignment: string;
}
