import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  dir?: "row" | "column";
  gridGap?: string;
  columnCount: number;
  flex?: number;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
}
const Grid: React.FC<IProps> = ({
  dir = "column",
  gridGap,
  columnCount,
  width,
  height,
  padding,
  margin,
  children,
}) => {
  return (
    <GridView
      {...{
        dir,
        gridGap,
        columnCount,
        width,
        height,
        padding,
        margin,
      }}
    >
      {children}
    </GridView>
  );
};
export default Grid;
const GridView = styled.div<IProps>`
  display: grid;
  grid-template-columns: repeat(${({ columnCount }) => columnCount}, 1fr);
  grid-gap: ${({ gridGap }) => gridGap};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
`;
