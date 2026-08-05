import { describe, expect, test, vi } from "vitest";

import { buildShopPolicy, NONCE_PROTECTED_PATHS } from "~/lib/csp";

describe("buildShopPolicy", () => {
  test("baseline policy allows inline scripts (static pages)", () => {
    const policy = buildShopPolicy();

    expect(policy).toContain("default-src 'self'");
    expect(policy).toContain("script-src 'self' 'unsafe-inline'");
    expect(policy).not.toContain("'nonce-");
  });

  test("protected policy uses a nonce and drops unsafe-inline", () => {
    const policy = buildShopPolicy({ nonce: "abc123" });

    const scriptSrc = policy.match(/script-src ([^;]+)/)?.[1];

    expect(scriptSrc).toBe(
      "'self' 'nonce-abc123' 'strict-dynamic' https://cdn.priv.center https://va.vercel-scripts.com",
    );
    expect(policy).not.toContain("'unsafe-eval'");
  });

  test("dev policy includes unsafe-eval", () => {
    vi.stubEnv("NODE_ENV", "development");
    const policy = buildShopPolicy({ nonce: "abc123" });

    expect(policy).toContain("'unsafe-inline'");
    expect(policy).toContain("'unsafe-eval'");
    expect(policy).not.toContain("'strict-dynamic'");

    vi.unstubAllEnvs();
  });

  test("baseline policy does not include strict-dynamic", () => {
    const policy = buildShopPolicy();

    expect(policy).not.toContain("'strict-dynamic'");
  });

  test("allows third party and app origins", () => {
    const policy = buildShopPolicy({ nonce: "abc123" });

    expect(policy).toContain("https://cdn.priv.center");
    expect(policy).toContain("https://va.vercel-scripts.com");
    expect(policy).toContain("https://api.priv.center");
    expect(policy).toContain("https://vitals.vercel-insights.com");
    expect(policy).toContain("https://cdn.sanity.io");
    expect(policy).toContain("https://cdn.foxpost.hu");
  });

  test("hardens other directives", () => {
    const policy = buildShopPolicy({ nonce: "abc123" });

    expect(policy).toContain("object-src 'none'");
    expect(policy).toContain("base-uri 'self'");
    expect(policy).toContain("form-action 'self'");
    expect(policy).toContain("frame-ancestors 'none'");
    expect(policy).toContain("upgrade-insecure-requests");
  });

  test("includes reporting directives", () => {
    const policy = buildShopPolicy({ nonce: "abc123" });

    expect(policy).toContain("report-uri /api/csp-report");
    expect(policy).toContain("report-to csp-endpoint");
  });
});

describe("CSP_PROTECTED_PATHS", () => {
  test("covers checkout and cart flows", () => {
    expect(NONCE_PROTECTED_PATHS).toContain("/kosar");
    expect(NONCE_PROTECTED_PATHS).toContain("/penztar");
    expect(NONCE_PROTECTED_PATHS).toContain("/sikeres-rendeles");
  });
});
