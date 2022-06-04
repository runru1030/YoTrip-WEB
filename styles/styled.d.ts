import "styled-components";
import { ColorScheme } from "./scheme/ColorScheme";

declare module "styled-components" {
  export const FontSize = {
    sm: "12px",
    nm: "16px",
    smd: "18px",
    md: "20px",
    lg: "24px",
    xlg: "32px",
    xxlg: "40px",
    xxxlg: "48px",
  };
  export const FontWeight = {
    thin: "100",
    xLight: "200",
    light: "300",
    regular: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
    xBold: "800",
    black: "900",
  };
  export type T_COLOR_SCHEME = keyof typeof ColorScheme;
  export type T_BUTTON_TYPE_SCHEME = keyof typeof ButtonScheme;
  export type T_FONT_SIZE = keyof typeof FontSize;
  export type T_FONT_WEIGHT = keyof typeof FontWeight;

  export interface DefaultTheme {
    colors: {
      [type: T_COLOR_SCHEME | string]: string;
    };
    fontSize: {
      [type: T_FONT_SIZE | string]: string;
    };
    fontWeight: {
      [type: T_FONT_WEIGHT | string]: string;
    };
    device?: {};
    btnType: {
      [type: T_BUTTON_TYPE_SCHEME]: any;
    };
  }
}
