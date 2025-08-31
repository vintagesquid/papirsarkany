"use client"; // Error components must be Client Components

import { useEffect } from "react";

import RestartIcon from "~/assets/restart.svg";
import Heading from '~/components/heading';
import { useToastStore } from "~/store/use-toast-store";

// biome-ignore lint/suspicious/noShadowRestrictedNames: Next.js error boundary
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const toast = useToastStore((state) => state.toast);

  useEffect(() => {
    toast({
      message: error.message,
      type: "error",
      id: error.name,
    });

    console.error(error);
  }, [error, toast]);

  return (
    <div className="grid place-items-center">
      <div className="space-y-8 text-center">
        <Heading as='h1' size={2}>Hoppá, valahol elszakadt a eresztő zsinór!</Heading>
        <button
          type="button"
          className="d-btn d-btn-outline d-btn-neutral"
          onClick={() => reset()}
        >
          <RestartIcon className="h-6 w-6" />
          Próbáld újra
        </button>
      </div>
    </div>
  );
}
