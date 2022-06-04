import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  spaceBetween?: boolean;
  spaceAround?: boolean;
  dir?: "row" | "column";
  vAlign?: boolean;
  hAlign?: boolean;
  centerVH?: boolean;
  width?: string | number;
  height?: string | number;
  gap?: string;
  margin?: string | number;
  padding?: string | number;
  borderRadius?: string;
  pos?: "relative" | "absolute" | "fixed" | "sticky";
  maxWidth?: string;
}
const Flex = React.forwardRef<HTMLDivElement, IProps>(
  (
    {
      children,
      spaceBetween,
      spaceAround,
      dir = "row",
      vAlign,
      hAlign,
      centerVH,
      width,
      height,
      gap,
      margin = "unset",
      padding = "unset",
      borderRadius,
      maxWidth,
      pos,
      ...restParams
    },
    ref
  ) => {
    return (
      <Container
        {...{
          spaceBetween,
          spaceAround,
          dir,
          vAlign,
          hAlign,
          centerVH,
          margin,
          gap,
          padding,
          borderRadius,
          maxWidth,
          pos,
          ref,
        }}
        {...restParams}
      >
        {children}
      </Container>
    );
  }
);

Flex.displayName = "Flex";
export default Flex;

const Container = styled.div<IProps>`
  display: flex;
  flex-direction: ${(props) => props.dir};
  gap: ${({ gap }) => gap};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  max-width: ${(props) => props.maxWidth};
  position: ${(props) => props.pos};
  border-radius: ${(props) => props.borderRadius};
  ${({ spaceBetween }) =>
    spaceBetween &&
    css`
      justify-content: space-between;
    `}
  ${({ spaceAround }) =>
    spaceAround &&
    css`
      justify-content: space-around;
    `}
  ${({ hAlign }) =>
    hAlign &&
    css`
      justify-content: center;
    `}
    ${({ vAlign }) =>
    vAlign &&
    css`
      align-items: center;
    `}
    ${({ centerVH }) =>
    centerVH &&
    css`
      justify-content: center;
      align-items: center;
    `};
`;
