import { render } from "@testing-library/react";
import { expect, test } from "vitest";

import AppVersionScript from "~/components/app-version-script";
import { version } from "../../../package.json";

test("AppVersionScript", () => {
  render(<AppVersionScript />);

  const scriptTag = window.document.querySelector("script");
  const scriptContent = scriptTag?.textContent;

  if (scriptContent) {
    new Function(scriptContent)();
  }

  expect(window.appVersion).toBe(version);
});
