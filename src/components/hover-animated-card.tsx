"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type ComponentProps, type FC, type ReactNode, useRef } from "react";
import Card from "./card";

type HoverAnimatedCardProps = ComponentProps<"div"> & {
  children: ReactNode;
};

const HoverAnimatedCard: FC<HoverAnimatedCardProps> = ({
  children,
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();

  const onMouseEnter = contextSafe(() => {
    gsap.to(containerRef.current, {
      scale: 1.05,
      ease: "elastic.out(1,0.75)",
      duration: 1,
    });
  });

  const onMouseLeave = contextSafe(() => {
    gsap.to(containerRef.current, {
      scale: 1,
      ease: "elastic.out(1,0.75)",
      duration: 1,
    });
  });

  return (
    <div
      ref={containerRef}
      role="none"
      className="h-full w-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Card className={className} {...props}>
        {children}
      </Card>
    </div>
  );
};

export default HoverAnimatedCard;
