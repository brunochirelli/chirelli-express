import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: "./setupTests.ts",
    onConsoleLog(log) {
      if (/500/.test(log)) {
        return false;
      }
      return true;
    },
  },
});
