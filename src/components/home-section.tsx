import React, { type FC, type ReactNode } from "react";
import { twMerge } from 'tailwind-merge';

type HomeSectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

type IconProps = {
  children: ReactNode;
};

type ContentProps = {
  children: ReactNode;
};

type HomeSectionCompound = FC<HomeSectionProps> & {
  Icon: FC<IconProps>;
  Content: FC<ContentProps>;
};

const HomeSection: HomeSectionCompound = ({children, id, className}) => {
  let Icon: ReactNode | null = null;
  let Content: ReactNode | null = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === HomeSection.Icon) {
        Icon = child;
      } else if (child.type === HomeSection.Content) {
        Content = child;
      }
    }
  });

  return (
    <section id={id} className={twMerge("py-12",className)}>
      {Icon && <div className="flex justify-center px-12 pb-12">{Icon}</div>}

      <div className="space-y-8 prose-headings:text-balance prose-headings:leading-relaxed">
        {Content}
      </div>
    </section>
  );
};

const Icon: HomeSectionCompound["Icon"] = ({ children }) => (
  <div className="max-w-[12rem] flex-1">{children}</div>
);
const Content: HomeSectionCompound["Content"] = ({ children }) => children;

HomeSection.Icon = Icon;
HomeSection.Content = Content;

export default HomeSection;
