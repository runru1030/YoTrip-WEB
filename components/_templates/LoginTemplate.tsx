import React from "react";
import styled from "styled-components";

import { MainWrapper } from "styles/mixin";
import LogoIcon from "public/images/logo.svg";
import KakaoIcon from "public/images/kakao_logo.svg";
import GoogleIcon from "@mui/icons-material/Google";
import Span from "components/_atoms/Span";
import Flex from "components/_atoms/Flex";
import Button from "components/_atoms/Button";
import { useRouter } from "next/router";
const LoginTemplate = () => {
  const router = useRouter();
  const handleClickLogin = (e: React.MouseEvent) => {
    const { type } = (e.target as HTMLButtonElement).dataset;
    switch (type) {
      case "kakao":
      case "google":
        router.push("/main");
        break;

      default:
        break;
    }
  };
  return (
    <MainWrapper dir="column">
      <Flex dir="column" hAlign flex={1} gap="30px">
        <LogoIcon />
        <Span fontSize="nm" fontWeight="thin" width="100%" textAlign="right">
          여행을 위한 끄적임.
        </Span>
      </Flex>
      <Flex dir="row" flex={0.4} spaceBetween width="50%">
        <CircleButton
          bgColor="#FEE500"
          data-type="kakao"
          onClick={handleClickLogin}
        >
          <KakaoIcon />
        </CircleButton>
        <CircleButton
          bgColor="#FFFFFF"
          data-type="google"
          onClick={handleClickLogin}
        >
          <GoogleIcon sx={{ color: "gray" }} />
        </CircleButton>
      </Flex>
    </MainWrapper>
  );
};

export default LoginTemplate;
const CircleButton = styled(Button)<{ bgColor?: string }>`
  border-radius: 50%;
  background-color: ${({ bgColor }) => bgColor};
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    overflow: visible;
  }
`;
