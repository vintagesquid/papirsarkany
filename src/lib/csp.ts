import { isDevEnv } from "./helpers";

export const CSP_POLICIES = {
  SCRIPTS_SRC: ["https://cdn.priv.center", "https://va.vercel-scripts.com"],
  CONNECT_SRC: [
    "'self'",
    "https://cdn.priv.center",
    "https://api.priv.center",
    "https://va.vercel-scripts.com",
    "https://vitals.vercel-insights.com",
  ],
  IMG_SRC: ["'self'", "blob:", "data:", "https://cdn.sanity.io"],
  FRAME_SRC: ["'self'", "https://cdn.foxpost.hu"],
} as const satisfies Record<string, readonly string[]>;

export const NONCE_PROTECTED_PATHS: readonly string[] = [
  "/kosar",
  "/penztar",
  "/sikeres-rendeles",
];

const DIRECTIVE_ORDER: readonly string[] = [
  "default-src",
  "script-src",
  "style-src",
  "img-src",
  "font-src",
  "connect-src",
  "frame-src",
  "object-src",
  "base-uri",
  "form-action",
  "frame-ancestors",
  "upgrade-insecure-requests",
];

type Directives = Record<string, readonly string[]>;

function toHeader(directives: Directives): string {
  return DIRECTIVE_ORDER.filter((name) => name in directives)
    .map((name) => {
      const value = directives[name].join(" ");
      return value ? `${name} ${value}` : name;
    })
    .join("; ");
}

export type BuildShopPolicyOptions = {
  /**
   * Per-request nonce for the strict policy. Only used in production;
   * dev builds fall back to `'unsafe-inline'`.
   */
  nonce?: string;
};

export function buildShopPolicy({
  nonce,
}: BuildShopPolicyOptions = {}): string {
  const scriptSrc = [
    "'self'",
    ...(isDevEnv()
      ? ["'unsafe-inline'", "'unsafe-eval'"]
      : nonce
        ? [`'nonce-${nonce}'`, "'strict-dynamic'"]
        : ["'unsafe-inline'"]),
    ...CSP_POLICIES.SCRIPTS_SRC,
  ];

  const policy = toHeader({
    "default-src": ["'self'"],
    "script-src": scriptSrc,
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": CSP_POLICIES.IMG_SRC,
    "font-src": ["'self'", "data:"],
    "connect-src": CSP_POLICIES.CONNECT_SRC,
    "frame-src": CSP_POLICIES.FRAME_SRC,
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    "upgrade-insecure-requests": [],
  });
  // note: report-to directive is intended to replace report-uri - https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/report-uri
  return `${policy}; report-uri /api/csp-report; report-to csp-endpoint`;
}
