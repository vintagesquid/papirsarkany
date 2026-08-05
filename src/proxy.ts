import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { ZodError } from "zod";
import { buildShopPolicy, NONCE_PROTECTED_PATHS } from "~/lib/csp";
import { formatZodErrors } from "~/lib/formatters";
import type { OrderRequestBody } from "~/lib/types";
import { mergedFormSchemaObject } from "~/lib/validation-schemas";
import { env } from "./lib/env";
import { isDevEnv } from "./lib/helpers";

function isNonceProtectedPath(pathname: string): boolean {
  return NONCE_PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // order validation
  if (pathname === "/api/order") {
    try {
      const body = (await request.json()) as OrderRequestBody;
      const { formData } = body;
      await mergedFormSchemaObject.parseAsync(formData);

      return NextResponse.next();
    } catch (error) {
      return NextResponse.json(
        {
          error: `Validation error: ${formatZodErrors(error as ZodError)}`,
        },
        { status: 403 },
      );
    }
  }


  // CSP headers
  const nonce =
    !isDevEnv() && isNonceProtectedPath(pathname)
      ? Buffer.from(crypto.randomUUID()).toString("base64")
      : undefined;

  const policy = buildShopPolicy({ nonce });

  const requestHeaders = new Headers(request.headers);

  if (nonce) {
    requestHeaders.set("Nonce", nonce);
    requestHeaders.set("Content-Security-Policy", policy);
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const cspHeaderName =
    env.CSP_MODE === "enforce"
      ? "Content-Security-Policy"
      : "Content-Security-Policy-Report-Only";

  response.headers.set(cspHeaderName, policy);
  response.headers.set("Reporting-Endpoints", `csp-endpoint="/api/csp-report"`);

  return response;
}

export const config = {
  matcher: [
    "/api/order",
    {
      source: "/((?!api|admin|_next/static|_next/image|favicon.ico|.*\\..*).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
