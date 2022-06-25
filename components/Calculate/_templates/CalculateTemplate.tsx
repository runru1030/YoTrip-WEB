import React from "react";
import styled from "styled-components";

import Flex from "components/_atoms/Flex";
import Span from "components/_atoms/Span";
import Image from "next/image";
import CurrencyCalculator from "../_oraganisms/CurrencyCalculator";

const CalculateTemplate = () => {
  return (
    <Flex dir="column" gap="24px" width="100%" centerVH>
      <RandingWrapper
        dir="column"
        width="90%"
        gap="16px"
        centerVH
        height="40vh"
      >
        <Image src="/images/exchange.svg" width="200%" height="200%" />
        <Span>국가별 최신 환율 정보를 확인하세요.</Span>
      </RandingWrapper>
      <CurrencyCalculator />
    </Flex>
  );
};

export default CalculateTemplate;
const RandingWrapper = styled(Flex)`
  opacity: 0.7;
`;
