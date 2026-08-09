import { describe, expect, test } from "vitest";

import { extractCspViolations } from "~/app/api/csp-report/route";

describe("extractCspViolations", () => {
  test("extracts legacy csp-report payloads", () => {
    const report = {
      "csp-report": {
        "document-uri": "https://papirsarkany.hu/kosar",
        "violated-directive": "script-src",
        "blocked-uri": "https://evil.example/x.js",
      },
    };

    expect(extractCspViolations(report)).toEqual([report["csp-report"]]);
  });

  test("extracts modern report-to envelopes from a batched array", () => {
    const payload = [
      {
        type: "csp-violation",
        body: {
          "document-uri": "https://papirsarkany.hu/kosar",
          "blocked-uri": "inline",
        },
      },
      { type: "navigation", body: { some: "ignored" } },
      {
        type: "csp-violation",
        body: {
          "document-uri": "https://papirsarkany.hu/penztar",
          "effective-directive": "script-src-elem",
        },
      },
    ];

    expect(extractCspViolations(payload)).toEqual([
      {
        "document-uri": "https://papirsarkany.hu/kosar",
        "blocked-uri": "inline",
      },
      {
        "document-uri": "https://papirsarkany.hu/penztar",
        "effective-directive": "script-src-elem",
      },
    ]);
  });

  test("extracts a single modern envelope", () => {
    const envelope = {
      type: "csp-violation",
      body: {
        "document-uri": "https://papirsarkany.hu/",
        "violated-directive": "img-src",
      },
    };

    expect(extractCspViolations(envelope)).toEqual([envelope.body]);
  });

  test("returns an empty array for non-report payloads", () => {
    expect(extractCspViolations({ hello: "world" })).toEqual([]);
    expect(extractCspViolations(null)).toEqual([]);
    expect(extractCspViolations("nope")).toEqual([]);
    expect(extractCspViolations([])).toEqual([]);
  });
});
