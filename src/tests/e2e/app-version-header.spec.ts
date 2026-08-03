import { expect, test } from "@playwright/test";

import packageJSON from "../../../package.json" with { type: "json" };

test("App-Version header is sent on document request", async ({ page }) => {
  for (const path of ["/", "/sarkanyok", "/kosar", "/admin"]) {
    const response = await page.goto(path, { waitUntil: "commit" });

    expect(response?.status(), `GET ${path}`).toBe(200);
    expect(response?.headers()["app-version"], `GET ${path}`).toBe(
      packageJSON.version,
    );
  }
});

test("App-Version header is not sent on non-document requests", async ({
  request,
}) => {
  const response = await request.get("/");

  expect(response.headers()["app-version"]).toBeUndefined();
});
