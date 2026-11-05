import { describe, expect, it } from "vitest";
import { MEMORY_ABLATION } from "../../src/memmy-memory/ablation.js";
import { resolveMemmyMemoryConfig } from "../../src/memmy-memory/config.js";
import { createMemmyMemoryIntegration } from "../../src/memmy-memory/register.js";

describe("branch memory ablation", () => {
  it("applies the checked-in profile even over existing runtime settings", async () => {
    const config = { memmyMemory: { enabled: false, retrievalLayers: ["L2"], userId: "evaluation-user" } };
    expect(resolveMemmyMemoryConfig(config)).toEqual({
      ...MEMORY_ABLATION,
      userId: "evaluation-user",
    });
    const integration = createMemmyMemoryIntegration(config);
    try {
      expect(integration.enabled).toBe(true);
      expect(integration.hook?.memoryRetrievalLayers()).toEqual(MEMORY_ABLATION.retrievalLayers);
      expect(integration.hook?.memoryRetrievalLayers()).toContain("Skill");
    } finally {
      await integration.dispose?.();
    }
  });
});
