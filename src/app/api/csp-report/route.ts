import type { NextRequest } from "next/server";

type CspViolationBody = {
  "document-uri"?: string;
  referrer?: string;
  "violated-directive"?: string;
  "effective-directive"?: string;
  "original-policy"?: string;
  "blocked-uri"?: string;
  "source-file"?: string;
  "line-number"?: number;
  "column-number"?: number;
  "script-sample"?: string;
  disposition?: string;
};

type CspEnvelope = {
  type: "csp-violation";
  body: CspViolationBody;
};

function isCspEnvelope(report: unknown): report is CspEnvelope {
  if (typeof report !== "object" || report === null) {
    return false;
  }
  const candidate = report as { type?: unknown; body?: unknown };
  return (
    candidate.type === "csp-violation" &&
    typeof candidate.body === "object" &&
    candidate.body !== null
  );
}

export function extractCspViolations(payload: unknown): CspViolationBody[] {
  const reports = Array.isArray(payload) ? payload : [payload];

  return reports.flatMap((report) => {
    if (isCspEnvelope(report)) {
      return [report.body];
    }

    if (typeof report !== "object" || report === null) {
      return [];
    }

    const legacy = (report as { "csp-report"?: CspViolationBody })[
      "csp-report"
    ];
    return legacy ? [legacy] : [];
  });
}

const MAX_BODY_BYTES = 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("json")) {
      return new Response(null, { status: 204 });
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return new Response(null, { status: 204 });
    }

    const payload: unknown = await request.json();
    const violations = extractCspViolations(payload);

    for (const violation of violations) {
      console.error(JSON.stringify({ level: "csp-violation", ...violation }));
    }
  } catch {
    // ignore malformed or non-report payloads
  }

  return new Response(null, { status: 204 });
}
