import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next", "e2e/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary", "lcov"],
      include: ["src/lib/**", "src/db/queries/**", "src/actions/**"],
      exclude: [
        "src/components/ui/**",
        "src/**/*.test.{ts,tsx}",
        "src/test/**",
        "src/types/**",
      ],
      thresholds: {
        lines: 70,
        functions: 70,
      },
    },
    globals: true,
  },
});
