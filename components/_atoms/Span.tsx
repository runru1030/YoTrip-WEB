import React, { HTMLAttributes } from "react";

import styled, {
  T_FONT_SIZE,
  T_COLOR_SCHEME,
  T_FONT_WEIGHT,
} from "styled-components";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  fontSize?: T_FONT_SIZE;
  textColor?: T_COLOR_SCHEME;
  fontWeight?: T_FONT_WEIGHT;
  width?: string;
  margin?: string;
  padding?: string;
  textAlign?: "right" | "left" | "center" | "justify";
  bold?: boolean;
}

const Span: React.FC<IProps> = ({
  fontSize,
  textColor,
  children,
  fontWeight = "regular",
  width,
  margin,
  padding,
  textAlign,
  bold,
  ...restParams
}) => {
  return (
    <StyledSpan
      {...{
        fontWeight,
        bold,
        textColor,
        fontSize,
        width,
        margin,
        padding,
        textAlign,
      }}
      {...restParams}
    >
      {children}
    </StyledSpan>
  );
};

export default Span;

const StyledSpan = styled.span<IProps>`
  font-weight: ${({ theme, bold, fontWeight }) =>
    bold ? "bold" : theme.fontWeight[fontWeight!]};
  color: ${(props) => props.theme.colors[props.textColor!]};
  font-size: ${(props) => props.theme.fontSize[props.fontSize!]};
  /* vertical-align: middle; */
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  text-align: ${(props) => props.textAlign};
`;
