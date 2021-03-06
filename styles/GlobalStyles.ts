import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { ColorScheme } from "./schemes/ColorScheme";
const GlobalStyle = createGlobalStyle`
  ${reset}
  *, *::before, *::after {
    box-sizing: border-box;
  }
  input{
    all:unset;
  }
  body {
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.5;
    background-color: ${ColorScheme.gray0};
    color:#EDEDED;
  }
  a{
    all:unset;
  }
`;

export default GlobalStyle;
