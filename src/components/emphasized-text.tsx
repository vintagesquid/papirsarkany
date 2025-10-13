import type { FC, ReactNode } from "react";

type EmphasizedTextProps = {
  children: ReactNode;
  inverse?: boolean;
};

const EmphasizedText: FC<EmphasizedTextProps> = ({ children, inverse }) => {
  if (inverse) {
    return (
      <span className="rounded bg-white px-1 font-bold text-primary">
        {children}
      </span>
    );
  }

  return (
    <span className="rounded bg-primary px-1 font-bold text-primary-content">
      {children}
    </span>
  );
};

export default EmphasizedText;
