declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module "*.svg?url" {
  // biome-ignore lint/suspicious/noExplicitAny: necessary to avoid conflicts with other types
  const content: any;
  export default content;
}
