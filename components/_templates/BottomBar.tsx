import React, { HTMLAttributes } from "react";
import styled, { T_COLOR_SCHEME } from "styled-components";
import Flex from "components/_atoms/Flex";
interface IProps extends HTMLAttributes<HTMLDivElement> {
  bgColor?: T_COLOR_SCHEME;
}
const BottomBar: React.FC<IProps> = ({ children, bgColor = "gray0" }) => {
  return <Wrapper {...{ bgColor }}>{children}</Wrapper>;
};

export default BottomBar;
const Wrapper = styled(Flex)<{ bgColor?: T_COLOR_SCHEME }>`
  width: 100%;
  min-height: 60px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: ${({ theme, bgColor }) => theme.colors[bgColor!]};
`;
