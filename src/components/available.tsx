"use client";

import { type FC, useId } from "react";
import AvailableIcon from "~/assets/available.svg";

const Available: FC = () => {
  const id = useId();

  return (
    <div className="text-emerald-700">
      <AvailableIcon
        width={16}
        height={16}
        aria-labelledby={id}
        className="inline"
      />{" "}
      <span id={id} className="align-middle font-bold">
        Raktáron
      </span>
    </div>
  );
};

export default Available;
