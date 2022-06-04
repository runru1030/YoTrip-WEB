import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { ColorScheme } from "./schemes/ColorScheme";
const GlobalStyle = createGlobalStyle`
  ${reset}
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.5;
    background-color: ${ColorScheme.gray0};
    color:white;
  }

`;

export default GlobalStyle;
