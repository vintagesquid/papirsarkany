import { render } from "@testing-library/react";
import { afterAll, beforeEach, expect, test, vi } from "vitest";
import Navigation from "~/components/navigation";
import { viMockMatchMedia } from "~/mocks/match-media.mock";

const mediaQueries = {
  desktop: `(min-width: "var(--breakpoint-md)")`,
};

beforeEach(() => {
  viMockMatchMedia({
    media: mediaQueries.desktop,
    matches: false,
  });
});

afterAll(() => {
  vi.clearAllMocks();
});

test("should render desktop navigation on screens larger then md breakpoint", () => {
  viMockMatchMedia({
    media: mediaQueries.desktop,
    matches: true,
  });
  const { container } = render(<Navigation />);

  expect(container).toMatchSnapshot();
});

test("should render mobile navigation on screens smaller then md breakpoint", () => {
  viMockMatchMedia({
    media: mediaQueries.desktop,
    matches: false,
  });

  const { container } = render(<Navigation />);
  expect(container).toMatchSnapshot();
});
