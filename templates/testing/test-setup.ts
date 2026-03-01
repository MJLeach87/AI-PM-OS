/**
 * Vitest Setup File
 *
 * Runs before every test file. Configures:
 * - React Testing Library cleanup
 * - next/navigation mocks
 * - next/headers mocks
 * - Custom matchers
 *
 * Referenced by vitest.config.ts: setupFiles: ["./src/test/setup.ts"]
 */
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Automatic cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

// Mock next/headers
vi.mock("next/headers", () => ({
  cookies: () => ({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
  }),
  headers: () => new Headers(),
}));
