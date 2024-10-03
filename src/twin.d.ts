import "twin.macro";
import { css as emotionCss, CSSInterpolation } from "@emotion/react";
import styledImport, { CSSProp, default as styled } from "styled-components";

declare module "twin.macro" {
  // The styled and css imports
  const styled: typeof styledImport;
  const css: typeof emotionCss;
}

declare module "react" {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp;
  }
  interface SVGProps<T> extends SVGProps<SVGElement> {
    css?: CSSProp;
  }
}
