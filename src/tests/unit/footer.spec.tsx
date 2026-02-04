import { render } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import Footer from "~/components/footer";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("should match snapshot", () => {
  vi.setSystemTime(new Date(1998, 0, 31));

  const { container } = render(<Footer />);

  expect(container).toMatchSnapshot();
});
