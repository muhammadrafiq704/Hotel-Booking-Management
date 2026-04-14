import { afterEach, beforeEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";

// declare const global: any; // when use global.fetch = vi.fn(); it will show ts error while this not define in tsconfig.json, so we need to declare it here

beforeEach(() => {
	vi.stubGlobal("fetch", vi.fn()); //same as below
	// global.fetch = vi.fn();
});

// Runs a cleanup after each test case
afterEach(() => {
	cleanup();
	vi.clearAllMocks();
});
