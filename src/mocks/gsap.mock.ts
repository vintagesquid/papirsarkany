import { vi } from "vitest";

vi.mock("gsap", () => {
  return {
    default: {
      to: vi.fn(() => ({ kill: vi.fn() })),
      from: vi.fn(() => ({ kill: vi.fn() })),
      timeline: vi.fn(() => ({
        to: vi.fn(),
        from: vi.fn(),
        set: vi.fn(),
        kill: vi.fn(),
        reverse: vi.fn(),
      })),
      registerPlugin: vi.fn(),
    },
  };
});

vi.mock("gsap/all", () => {
  return {
    ScrollTrigger: {
      create: vi.fn(),
      kill: vi.fn(),
      refresh: vi.fn(),
      matchMedia: vi.fn(() => ({ add: vi.fn(), revert: vi.fn() })),
    },
    Draggable: {
      create: vi.fn(() => [
        { enable: vi.fn(), disable: vi.fn(), kill: vi.fn() },
      ]),
    },
    CustomEase: { create: vi.fn() },
  };
});

vi.mock("@gsap/react", () => ({
  useGSAP: vi.fn(() => ({ gsap: require("gsap").default })),
}));
