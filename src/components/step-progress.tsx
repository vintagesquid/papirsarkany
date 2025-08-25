import type { FC } from "react";
import { useCheckoutFormStore } from "~/store/use-checkout-form-store";

const STEP_LABELS = ["Szálítás", "Számlázás", "Összegzés"] as const;

const StepProgress: FC = () => {
  const step = useCheckoutFormStore((state) => state.step);
  const setStep = useCheckoutFormStore((state) => state.setStep);

  const isLastStepReached = step === STEP_LABELS.length - 1;

  const onStepClick = (isPrevious: boolean, stepToSet: number) => {
    if (!isPrevious) {
      return;
    }
    setStep(stepToSet);
  };

  return (
    <div className="overflow-x-auto">
      <ul className="d-steps d-step-primary w-full gap-2">
        {STEP_LABELS.map((stepLabel, idx) => {
          const isActive = step >= idx;
          const isPrevious = step > idx;
          return (
            <button
              tabIndex={isPrevious ? 0 : -1}
              type="button"
              key={stepLabel}
              className={`d-step font-semibold before:transition-colors before:duration-300 after:transition-colors after:duration-300 after:content-[counter(step)]! focus-within:after:outline focus-visible:outline-hidden focus-visible:after:outline-neutral focus-visible:after:outline-offset-2 ${isActive ? "d-step-info" : "before:bg-white! after:bg-white!"} ${isPrevious ? "cursor-pointer" : ""} ${isLastStepReached ? "d-step-success" : ""}`}
              onClick={() => onStepClick(isPrevious, idx)}
            >
              {stepLabel}
            </button>
          );
        })}
      </ul>
    </div>
  );
};

export default StepProgress;
