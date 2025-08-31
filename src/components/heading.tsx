import type { FC, HTMLAttributes, ReactNode, Ref } from "react";
import { twMerge } from 'tailwind-merge'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = {
  as: `h${HeadingLevel}`;
  size?: HeadingLevel;
  children: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
} & HTMLAttributes<HTMLHeadingElement>;

const sizeClassMap: Record<HeadingLevel, string> = {
  1: "text-3xl md:text-4xl lg:text-5xl",
  2: "text-2xl md:text-3xl lg:text-4xl",
  3: "text-xl md:text-2xl lg:text-3xl",
  4: "text-base md:text-xl lg:text-2xl",
  5: "text-base md:text-lg lg:text-xl",
  6: "text-base",
};

function getDefaultSizeFromAs(as: HeadingProps["as"]): HeadingLevel {
  return Number(as.replace("h", "")) as HeadingLevel;
}

const Heading: FC<HeadingProps> = ({
  children,
  as,
  size,
  className,
  ...rest
}) => {
  const HeadingElement = as;
  
  const defaultSize = getDefaultSizeFromAs(as);
  const sizeClass = sizeClassMap[size ?? defaultSize];

  return (
    <HeadingElement className={twMerge(sizeClass, className)} {...rest}>
      {children}
    </HeadingElement>
  );
};

export default Heading;
