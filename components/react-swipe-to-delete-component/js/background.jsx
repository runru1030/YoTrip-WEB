import Flex from "components/_atoms/Flex";
import React from "react";
import styled from "styled-components";

const Background = () => {
  return (
    <Container width="100%" spaceBetween vAlign height="100px">
      <span>삭제</span>
      <span>삭제</span>
    </Container>
  );
};

export default Background;
const Container = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.negative}30;
  border: solid thin ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.white}50;
  height: 100%;
  padding: 10px;
  font-size: small;
`;
