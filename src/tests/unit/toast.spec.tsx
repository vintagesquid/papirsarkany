import { render, renderHook, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Toast from "~/components/toast";
import type { Toast as ToastProps } from "~/lib/types";
import { useToastStore } from "~/store/use-toast-store";
import ToastContainer from "../../components/toast-container";

test("Error Toast should match snapshot", () => {
  const errorToast: ToastProps = {
    id: "error-toast-test",
    type: "error",
    message: "Something terribly went wrong!",
  };

  const { container } = render(<Toast toast={errorToast} />);

  expect(container).toMatchSnapshot();
});

test("Success Toast should match snapshot", () => {
  const successToast: ToastProps = {
    id: "success-toast-test",
    type: "success",
    message: "Congrats! You are awesome!",
  };

  const { container } = render(<Toast toast={successToast} />);

  expect(container).toMatchSnapshot();
});

// flaky error:  ReferenceError: window is not defined
test.skip("Toast container should render toasts programmatically", async () => {
  const toast: ToastProps = {
    id: "success-toast-test",
    type: "error",
    message: "Hurray! You are awesome!",
  };

  render(<ToastContainer />);

  const { result } = renderHook(() => useToastStore((state) => state.toast));

  result.current(toast);

  expect(await screen.findByText(toast.message)).toBeDefined();
  expect((await screen.findByText(toast.message)).textContent).toBe(
    "Hurray! You are awesome!",
  );
});
