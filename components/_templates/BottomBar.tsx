import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import Flex from "components/_atoms/Flex";
interface IProps extends HTMLAttributes<HTMLDivElement> {}
const BottomBar: React.FC<IProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default BottomBar;
const Wrapper = styled(Flex)`
  width: 100%;
  min-height: 60px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: sticky;
  bottom: 0;
`;
