import type { MemmyMemoryResolvedConfig } from "./types.js";

// Branch-specific overrides, applied after the user's runtime configuration.
export const MEMORY_ABLATION: Partial<MemmyMemoryResolvedConfig> = {
  enabled: true,
  retrievalLayers: ["L1", "Skill"],
};
