"use client";

import type { FC } from "react";

import { useToastStore } from "~/store/use-toast-store";
import Toast from "./toast";

/**
 * Expand with the following props:
 *  - autoClose?: number;
 *  - motionProps?: HTMLMotionProps<'div'>;
 */

const ToastContainer: FC = () => {
  const toasts = useToastStore((state) => state.toasts);
  const dismissToast = useToastStore((state) => state.dismissToast);

  return toasts.map((toast) => (
    <div key={toast.id}>
      {toast.active && (
        <button
          type="button"
          className="d-toast d-toast-end d-toast-bottom z-50 cursor-pointer"
          onClick={() => dismissToast(toast.id)}
        >
          <Toast toast={toast} />
        </button>
      )}
    </div>
  ));
};

export default ToastContainer;
