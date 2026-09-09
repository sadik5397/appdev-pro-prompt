import type { MasterPromptData } from '../types/prompt';

const API_KEY_STORAGE_KEY = 'appdev_pro_prompt_api_key';

export function getSavedApiKey(): string {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || '';
}

export function saveApiKey(key: string): void {
  localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
}

export function removeApiKey(): void {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
}

/**
 * Validate Google AI Studio API Key against official models endpoint
 */
export async function validateApiKey(apiKey: string): Promise<{ valid: boolean; error?: string }> {
  const cleanKey = apiKey.trim();
  if (!cleanKey) {
    return { valid: false, error: 'API Key cannot be empty.' };
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${cleanKey}`;
    const response = await fetch(url);
    if (response.ok) {
      return { valid: true };
    }

    const errJson = await response.json().catch(() => null);
    const apiError = errJson?.error?.message || `HTTP ${response.status} (${response.statusText})`;
    return { valid: false, error: `Invalid API Key: ${apiError}` };
  } catch (err: any) {
    return {
      valid: false,
      error: err.message || 'Network error validating API Key. Please check your internet connection.',
    };
  }
}

/**
 * Generate Master Prompt from a basic idea using Google AI Studio Gemini API
 */
export async function generateMasterPromptFromIdea(
  idea: string,
  apiKey: string
): Promise<MasterPromptData> {
  if (!apiKey) {
    throw new Error('Google AI Studio API Key is required.');
  }

  const systemInstruction = `You are a Principal Product Manager & Technical Architect.
Your task is to take a basic product idea and generate a complete, production-grade Master Engineering Prompt data structure for the Antigravity system.
You MUST reply strictly with valid JSON conforming to the requested schema below. Do not include markdown ticks, preamble, or commentary outside the JSON block.

JSON Schema structure:
{
  "executionPrinciples": [{"id": "1", "text": "..."}, ...],
  "overview": {
    "appName": "string",
    "productType": "string",
    "platform": "string",
    "primaryTech": "string",
    "oneSentenceDef": "string",
    "productGoal": "string",
    "targetUsers": "string",
    "primaryOutcome": "string"
  },
  "vision": {
    "feelList": ["string"],
    "notFeelList": ["string"],
    "corePrinciple": "string",
    "examplePrinciple": "string"
  },
  "scope": {
    "inScope": ["string"],
    "outOfScope": ["string"],
    "mvpPriority": ["string"]
  },
  "requirementPriority": {
    "p0": ["string"],
    "p1": ["string"],
    "p2": ["string"],
    "p3": ["string"],
    "p4": ["string"]
  },
  "userJourneys": [{"id": "uj-1", "name": "string", "flow": "string"}],
  "features": [{
    "id": "f-1",
    "name": "string",
    "purpose": "string",
    "flow": "string",
    "functionalReqs": ["string"],
    "businessRules": ["string"],
    "edgeCases": ["string"],
    "acceptanceCriteria": ["string"]
  }],
  "screens": [{
    "id": "s-1",
    "name": "string",
    "purpose": "string",
    "entryPoints": ["string"],
    "exitPoints": ["string"],
    "layout": "string",
    "components": ["string"],
    "interactions": ["string"],
    "states": ["string"],
    "validation": ["string"],
    "accessibility": ["string"]
  }],
  "designSystem": {
    "visualDirection": "string",
    "bg": "string",
    "primary": "string",
    "secondary": "string",
    "error": "string",
    "success": "string",
    "warning": "string",
    "typography": "string",
    "componentsList": ["string"]
  },
  "responsive": {
    "minWidth": "string",
    "maxWidth": "string",
    "minHeight": "string",
    "rules": ["string"]
  },
  "interactionRules": ["string"],
  "entities": [{
    "id": "e-1",
    "name": "string",
    "fields": ["string"],
    "relationships": "string",
    "validationRules": ["string"]
  }],
  "persistence": {
    "strategy": "string",
    "persistentData": ["string"],
    "tech": "string",
    "repositoryArch": "string"
  },
  "offlineNetwork": {
    "option": "OPTION A: Fully Offline" | "OPTION B: Online" | "OPTION C: Offline-First",
    "details": "string"
  },
  "stateManagement": {
    "tech": "string",
    "rules": ["string"],
    "exampleStates": "string"
  },
  "architecture": {
    "directoryTree": "string",
    "rules": ["string"]
  },
  "navigation": {
    "routesTree": "string",
    "initialRoute": "string",
    "protectedRoutes": ["string"],
    "backBehavior": "string",
    "rules": ["string"]
  },
  "errorHandling": ["string"],
  "securityPrivacy": ["string"],
  "performance": ["string"],
  "accessibility": ["string"],
  "analytics": {
    "required": false,
    "serviceName": "string",
    "events": ["string"]
  },
  "integrations": [{
    "id": "int-1",
    "name": "string",
    "purpose": "string",
    "required": false,
    "failureBehavior": "string",
    "configuration": "string"
  }],
  "configEnv": {
    "environments": ["string"],
    "configurableKeys": ["string"]
  },
  "testing": {
    "unitTests": ["string"],
    "widgetTests": ["string"],
    "integrationTests": ["string"]
  },
  "acceptanceCriteria": {
    "functional": ["string"],
    "ux": ["string"],
    "technical": ["string"],
    "productionReadiness": ["string"]
  },
  "devPlanPhases": "string",
  "implementationRules": ["string"],
  "conflictResolution": "string"
}`;

  const prompt = `PRODUCT IDEA: "${idea}"\n\nGenerate an in-depth, thorough, highly professional Master Prompt JSON structure for this product idea following the schema provided.`;

  // We try official Google AI Studio Gemini models in order of performance and availability
  const models = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
    'gemini-2.5-pro',
    'gemini-1.5-pro-latest',
  ];
  let lastErrorMsg = '';

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemInstruction}\n\n${prompt}` }] }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => null);
        const errMsg = errorJson?.error?.message || `HTTP ${response.status}`;
        console.warn(`Gemini model ${model} failed (${response.status}):`, errMsg);
        lastErrorMsg = errMsg;
        continue;
      }

      const json = await response.json();
      const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        continue;
      }

      // Clean JSON text if wrapped in markdown block
      const cleanJsonStr = rawText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();

      const parsedData: MasterPromptData = JSON.parse(cleanJsonStr);
      return parsedData;
    } catch (err: any) {
      console.warn(`Failed with model ${model}:`, err);
      lastErrorMsg = err.message || 'Network error';
    }
  }

  throw new Error(
    `Failed to generate prompt with Gemini AI (${lastErrorMsg}). Please check your API key status in Settings.`
  );
}

/**
 * Generate UI Images using AI (Google AI Studio Imagen or Pollinations AI Flux model fallback)
 */
export async function generateImageAI(
  prompt: string,
  apiKey: string,
  width: number = 1920,
  height: number = 1080
): Promise<string> {
  const targetRatio = width === height ? '1:1' : '16:9';

  // If user provided a Google AI Studio API key, execute Imagen 3 via Google AI Studio API
  if (apiKey) {
    // 1. Try Google AI Studio Imagen 3 generateImages API endpoint
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:generateImages?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          config: {
            numberOfImages: 1,
            aspectRatio: targetRatio,
            outputMimeType: 'image/png',
          },
        }),
      });

      if (response.ok) {
        const json = await response.json();
        const b64 = json?.generatedImages?.[0]?.image?.imageBytes;
        if (b64) {
          return `data:image/png;base64,${b64}`;
        }
      }
    } catch (e) {
      console.warn('Imagen generateImages endpoint failed, trying predict endpoint...', e);
    }

    // 2. Try Google AI Studio Imagen 3 predict API endpoint
    const models = ['imagen-3.0-generate-002', 'imagen-3.0-fast-generate-001'];
    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:predict?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            instances: [{ prompt }],
            parameters: {
              sampleCount: 1,
              aspectRatio: targetRatio,
              outputMimeType: 'image/png',
            },
          }),
        });

        if (response.ok) {
          const json = await response.json();
          const b64 = json?.predictions?.[0]?.bytesBase64Encoded;
          if (b64) {
            return `data:image/png;base64,${b64}`;
          }
        }
      } catch (e) {
        console.warn(`Imagen model ${model} predict failed...`, e);
      }
    }
  }

  // Fallback to high-res Nano-banana / Flux model AI image generator
  const seed = Math.floor(Math.random() * 1000000);
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&model=flux&nologo=true`;
}
