import "react";

declare module "react" {
  interface CSSProperties {
    "--value"?: number;
  }

  type Answer = {
    id: string;
    text: string;
  };
}
