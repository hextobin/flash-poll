import "react";

declare module "react" {
  interface CSSProperties {
    "--value"?: number;
  }
}
