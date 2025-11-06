import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        `rounded-lg border-4 border-black bg-white`,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
