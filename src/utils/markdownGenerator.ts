import type { MasterPromptData } from '../types/prompt';

export function generateMasterPromptMarkdown(data: MasterPromptData): string {
  const o = data.overview;
  const v = data.vision;
  const s = data.scope;
  const ds = data.designSystem;
  const resp = data.responsive;
  const p = data.persistence;
  const off = data.offlineNetwork;
  const sm = data.stateManagement;
  const arch = data.architecture;
  const nav = data.navigation;
  const t = data.testing;
  const ac = data.acceptanceCriteria;
  const rp = data.requirementPriority;

  return `# Master Prompt Template for Antigravity

# BUILD ${o.appName || '[PROJECT / APP NAME]'}

You are acting as a **Principal Product Manager, Staff Software Engineer, Technical Architect, UI/UX Designer, QA Engineer, and Product Engineer**.

Your responsibility is not merely to generate UI or code.

Your responsibility is to **understand the product requirements, design the architecture, implement the complete application, validate the implementation, and deliver a working production-quality project**.

---

# 0. EXECUTION PRINCIPLES

Follow these principles throughout the entire implementation:

${data.executionPrinciples.map((ep, i) => `${i + 1}. **${ep.text}**`).join('\n')}

---

# 1. PRODUCT OVERVIEW

## Product Name

${o.appName || '[APP NAME]'}

## Product Type

${o.productType || '[Mobile App / Web App / SaaS / Game / Utility / etc.]'}

## Platform

${o.platform || '[Android / iOS / Web / Desktop / Cross-platform]'}

## Primary Technology

${o.primaryTech || '[Flutter / React / Next.js / Kotlin / etc.]'}

## One-Sentence Product Definition

> ${o.oneSentenceDef || '[Describe the entire product in one clear sentence.]'}

## Product Goal

${o.productGoal || '[What problem does this product solve?]'}

## Target Users

${o.targetUsers || '[Who is going to use it?]'}

## Primary User Outcome

After using the product, the user should be able to:

> ${o.primaryOutcome || '[Desired outcome]'}

---

# 2. PRODUCT VISION

Describe the product experience in simple terms.

The product should feel:

${v.feelList.map(f => `* ${f}`).join('\n') || '* [e.g. Fast]\n* [e.g. Premium]\n* [e.g. Minimal]'}

The product should NOT feel:

${v.notFeelList.map(nf => `* ${nf}`).join('\n') || '* [e.g. Cluttered]\n* [e.g. Complicated]'}

## Core Product Principle

> ${v.corePrinciple || '[The single most important product principle.]'}

Example:

> ${v.examplePrinciple || 'The user should be able to complete the primary task in less than three interactions.'}

---

# 3. SCOPE

## 3.1 IN SCOPE

The current version MUST include:

${s.inScope.map(is => `* ${is}`).join('\n') || '* [Feature]'}

## 3.2 OUT OF SCOPE

The current version MUST NOT include:

${s.outOfScope.map(os => `* ${os}`).join('\n') || '* [Feature]'}

Do not implement out-of-scope functionality unless it is technically required for an in-scope feature.

## 3.3 MVP PRIORITY

If requirements conflict, prioritize in this order:

${s.mvpPriority.map((mp, i) => `${i + 1}. ${mp}`).join('\n')}

---

# REQUIREMENT PRIORITY

P0 - Non-negotiable
P1 - Required
P2 - Important
P3 - Nice to have
P4 - Future

If requirements conflict:

P0 > P1 > P2 > P3 > P4

### P0 (Non-negotiable)
${rp.p0.map(item => `* ${item}`).join('\n') || '* Core functionality\n* Data persistence'}

### P1 (Required)
${rp.p1.map(item => `* ${item}`).join('\n') || '* Primary user flow'}

### P2 (Important)
${rp.p2.map(item => `* ${item}`).join('\n') || '* Animations & Polish'}

### P3 (Nice to have)
${rp.p3.map(item => `* ${item}`).join('\n') || '* Export features'}

### P4 (Future)
${rp.p4.map(item => `* ${item}`).join('\n') || '* Cloud sync'}

---

# 4. USER JOURNEYS

Describe the most important user journeys.

${data.userJourneys.map((uj, i) => `## Journey ${i + 1}: ${uj.name || '[Name]'}

\`\`\`text
${uj.flow || '[Entry Point]\n    ↓\n[Action]\n    ↓\n[Screen]\n    ↓\n[Result]'}
\`\`\``).join('\n\n')}

Every primary journey must be fully functional from beginning to end.

---

# 5. CORE FEATURES

For every feature, define:

* Purpose
* User interaction
* Business rules
* Edge cases
* Expected result

${data.features.map((feat, i) => `---

## Feature ${i + 1}: ${feat.name || '[FEATURE NAME]'}

### Purpose

${feat.purpose || '[Why this feature exists.]'}

### User Flow

\`\`\`text
${feat.flow || '[Step]\n↓\n[Step]\n↓\n[Result]'}
\`\`\`

### Functional Requirements

${feat.functionalReqs.map(fr => `* ${fr}`).join('\n') || '* [Requirement]'}

### Business Rules

${feat.businessRules.map(br => `* ${br}`).join('\n') || '* [Rule]'}

### Edge Cases

${feat.edgeCases.map(ec => `* ${ec}`).join('\n') || '* [Case]'}

### Acceptance Criteria

${feat.acceptanceCriteria.map(ac => `* [ ] ${ac}`).join('\n') || '* [ ] [Criterion]'}
`).join('\n')}

---

# 6. SCREEN / PAGE SPECIFICATION

Every screen should be explicitly defined.

${data.screens.map((scr, i) => `---

## Screen ${i + 1}: ${scr.name || '[SCREEN NAME]'}

### Purpose

${scr.purpose || '[What this screen is for.]'}

### Entry Points

${scr.entryPoints.map(ep => `* ${ep}`).join('\n') || '* [Where user can enter]'}

### Exit Points

${scr.exitPoints.map(xp => `* ${xp}`).join('\n') || '* [Where user can go]'}

### Layout

\`\`\`text
${scr.layout || '[Header]\n\n[Primary Content]\n\n[Secondary Content]\n\n[Primary Action]'}
\`\`\`

### Components

${scr.components.map(c => `* ${c}`).join('\n') || '* [Component]'}

### Interactions

${scr.interactions.map(it => `* ${it}`).join('\n') || '* [Interaction → Result]'}

### States

The screen must support:

${scr.states.map(st => `* ${st}`).join('\n') || '* Loading\n* Empty\n* Success\n* Error\n* Disabled'}

### Validation

${scr.validation.map(v => `* ${v}`).join('\n') || '* [Validation rule]'}

### Accessibility

${scr.accessibility.map(a => `* ${a}`).join('\n') || '* [Requirement]'}
`).join('\n')}

---

# 7. DESIGN SYSTEM

## Visual Direction

${ds.visualDirection || '[Describe visual identity.]'}

## Color System

### Background

${ds.bg || '[Color / token]'}

### Primary

${ds.primary || '[Color / token]'}

### Secondary

${ds.secondary || '[Color / token]'}

### Error

${ds.error || '[Color / token]'}

### Success

${ds.success || '[Color / token]'}

### Warning

${ds.warning || '[Color / token]'}

Do not introduce arbitrary colors outside the design system unless necessary.

---

## Typography

${ds.typography || 'Define Display, Heading, Body, Caption, Button. Use a consistent typography hierarchy.'}

---

## Components

Create reusable components for recurring UI patterns.

Examples:

\`\`\`text
${ds.componentsList.join('\n') || 'PrimaryButton\nSecondaryButton\nAppCard\nAppHeader\nInputField\nEmptyState\nLoadingState\nErrorState'}
\`\`\`

Do not duplicate visually identical components unnecessarily.

---

# 8. RESPONSIVE DESIGN

The application must work across supported screen sizes.

Do NOT:
* hardcode screen coordinates
* assume a single screen size
* rely on fixed widths where responsive layout is required

Prefer:
* constraints
* flexible layouts
* responsive spacing
* safe areas
* platform conventions

Define minimum supported dimensions where relevant:

\`\`\`text
Minimum width: ${resp.minWidth || '[X]'}
Maximum width: ${resp.maxWidth || '[X]'}
Minimum height: ${resp.minHeight || '[X]'}
\`\`\`

${resp.rules.map(r => `* ${r}`).join('\n')}

---

# 9. INTERACTION & UX RULES

Define the interaction model explicitly.

For every important interaction:

\`\`\`text
Input
↓
State Change
↓
Visual Feedback
↓
Result
\`\`\`

${data.interactionRules.map(ir => `* ${ir}`).join('\n')}

---

# 10. DATA MODEL

Define the core entities.

${data.entities.map((e) => `### Entity: ${e.name}

Fields:
${e.fields.map(f => `* ${f}`).join('\n')}

Relationships:
${e.relationships || 'None'}

Validation Rules:
${e.validationRules.map(vr => `* ${vr}`).join('\n')}
`).join('\n')}

---

# 11. DATA PERSISTENCE

## Storage Strategy

${p.strategy || '[Local / Remote / Hybrid]'}

## Required Persistent Data

${p.persistentData.map(pd => `* ${pd}`).join('\n') || '* [Data]'}

## Storage Technology

${p.tech || '[SharedPreferences / SQLite / Hive / PostgreSQL / LocalStorage]'}

## Repository Architecture

${p.repositoryArch || 'Use a repository/service abstraction where appropriate.'}

---

# 12. OFFLINE / NETWORK REQUIREMENTS

### ${off.option}

${off.details || 'Define API, Authentication, Network failure behavior, Retry behavior, Caching, Loading states, Offline fallback.'}

---

# 13. STATE MANAGEMENT

Use a single consistent state-management strategy.

Technology:

\`\`\`text
${sm.tech || '[Provider / Riverpod / Bloc / Zustand / Redux / Context]'}
\`\`\`

Rules:

${sm.rules.map(r => `* ${r}`).join('\n')}

Example States:

\`\`\`text
${sm.exampleStates || 'idle\nloading\nsuccess\nerror'}
\`\`\`

---

# 14. ARCHITECTURE

Use a pragmatic architecture appropriate for the size of the project.

Suggested structure:

\`\`\`text
${arch.directoryTree || 'src/\n├── core/\n├── data/\n├── features/\n└── main/'}
\`\`\`

Architecture rules:

${arch.rules.map(r => `* ${r}`).join('\n')}

---

# 15. NAVIGATION

Define all routes/screens.

\`\`\`text
${nav.routesTree || 'Splash\n ↓\nHome'}
\`\`\`

Define:

* Initial route: ${nav.initialRoute || 'Home'}
* Protected routes: ${nav.protectedRoutes.join(', ') || 'None'}
* Back behavior: ${nav.backBehavior || 'Standard back stack'}
${nav.rules.map(r => `* ${r}`).join('\n')}

---

# 16. ERROR HANDLING

Every major operation must have predictable failure behavior.

${data.errorHandling.map(eh => `* ${eh}`).join('\n')}

---

# 17. SECURITY & PRIVACY

${data.securityPrivacy.map(sp => `* ${sp}`).join('\n')}

---

# 18. PERFORMANCE REQUIREMENTS

${data.performance.map(pr => `* ${pr}`).join('\n')}

---

# 19. ACCESSIBILITY

${data.accessibility.map(acc => `* ${acc}`).join('\n')}

---

# 20. ANALYTICS / LOGGING

Required: ${data.analytics.required ? 'YES' : 'NO'}

Service: ${data.analytics.serviceName || 'None'}

Events:
${data.analytics.events.map(ev => `* ${ev}`).join('\n') || '* app_open\n* feature_started\n* feature_completed\n* error_occurred'}

---

# 21. THIRD-PARTY INTEGRATIONS

${data.integrations.length === 0 ? 'No external integrations required.' : data.integrations.map(integ => `### Service: ${integ.name}

* Purpose: ${integ.purpose}
* Required: ${integ.required ? 'Yes' : 'No'}
* Failure Behavior: ${integ.failureBehavior}
* Configuration: ${integ.configuration}
`).join('\n')}

---

# 22. CONFIGURATION & ENVIRONMENTS

Supported Environments:
${data.configEnv.environments.map(env => `* ${env}`).join('\n')}

Configurable Keys / Variables:
${data.configEnv.configurableKeys.map(key => `* ${key}`).join('\n')}

---

# 23. TESTING STRATEGY

## Unit Tests
${t.unitTests.map(ut => `* ${ut}`).join('\n')}

## Widget / Component Tests
${t.widgetTests.map(wt => `* ${wt}`).join('\n')}

## Integration Tests
${t.integrationTests.map(it => `* ${it}`).join('\n')}

---

# 24. ACCEPTANCE CRITERIA

## Functional
${ac.functional.map(f => `* [ ] ${f}`).join('\n')}

## UX
${ac.ux.map(u => `* [ ] ${u}`).join('\n')}

## Technical
${ac.technical.map(tc => `* [ ] ${tc}`).join('\n')}

## Production Readiness
${ac.productionReadiness.map(pr => `* [ ] ${pr}`).join('\n')}

---

# 25. DEVELOPMENT PLAN

${data.devPlanPhases || `Implement incrementally:
* Phase 0: Understand
* Phase 1: Foundation
* Phase 2: Core Functionality
* Phase 3: Secondary Features
* Phase 4: UX & Visual Polish
* Phase 5: Integrations
* Phase 6: Testing & Hardening`}

---

# 26. DEFINITION OF DONE

Requirements → Implementation → Functional Flow → Persistence → Error Handling → Testing → Build Verification → Final UX Verification

---

# 27. IMPLEMENTATION RULES

${data.implementationRules.map((r, i) => `### Rule ${i + 1}\n\n${r}`).join('\n\n')}

---

# 28. CONFLICT RESOLUTION

${data.conflictResolution || 'If two requirements conflict: identify conflict, determine priority (P0 > P1 > P2), prefer simpler implementation.'}

---

# 29. SELF-REVIEW BEFORE COMPLETION

Before declaring the project complete, review as Product Manager, UX Designer, Technical Lead, QA Engineer, Performance Engineer, Security Engineer.

---

# 30. FINAL DELIVERY REQUIREMENT & FINAL COMMAND

At the end of implementation, provide a concise implementation summary containing: Completed features, Architecture summary, Storage summary, Dependencies added, Tests run, Verification (PASS/FAIL), and Known limitations.

---

# 31. MANDATORY INTERACTIVE ALIGNMENT & INITIAL INSTRUCTIONS

Before writing code, modifying files, or taking execution actions:

1. **Ask Clarifying Questions (95% Confidence Requirement)**:
   * Ask me targeted questions step-by-step until you are at least **95% confident** in your understanding of the product I want to build.
   * Do **NOT** proceed based on unverified assumptions or guess key features.

2. **Submit Implementation Plan for Approval**:
   * Present a comprehensive, structured **Implementation Plan** first detailing proposed changes, file structures, and verification steps.
   * Wait for my explicit approval before proceeding with implementation.

> ${data.interactiveAlignment || 'Ask me questions until you are 95% confident of the product what I want to make. Do not just keep making from your assumption. Also, ask to give an implementation plan before proceeding.'}

Now treat this document as the **source of truth** for the project. Build the **complete, functional, maintainable, testable application**.
`;
}
