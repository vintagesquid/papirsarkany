import { cleanup } from "@testing-library/react";
import { afterEach, vitest } from "vitest";

afterEach(() => {
  cleanup();
  vitest.clearAllTimers();
});
