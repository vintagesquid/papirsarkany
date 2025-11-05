import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { ZodError } from "zod";
import { formatZodErrors } from "~/lib/formatters";
import type { OrderRequestBody } from "~/lib/types";
import { mergedFormSchemaObject } from "~/lib/validation-schemas";

export async function proxy(request: NextRequest) {
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

export const config = {
  matcher: "/api/order",
};
