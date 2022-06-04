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
import Header from "./Header";
import TripCard from "components/_molecules/TripCard";
import Grid from "components/_atoms/Grid";
const MainTemplate = () => {
  const router = useRouter();
  const tripInfoList = [
    {
      title: "캐나다 여행기",
      startDate: "22.02.02",
      endDate: "22.02.02",
      mateList: [1, 2, 3],
      cost: 30000,
    },
    {
      title: "캐나다 여행기",
      startDate: "22.02.02",
      endDate: "22.02.02",
      mateList: [1, 2, 3],
      cost: 30000,
    },
    {
      title: "캐나다 여행기",
      startDate: "22.02.02",
      endDate: "22.02.02",
      mateList: [1, 2, 3],
      cost: 30000,
    },
  ];
  return (
    <>
      <Header />
      <MainWrapper dir="column">
        <Grid columnCount={2} gridGap="10px">
          {tripInfoList.map((tripInfo) => (
            <TripCard {...{ tripInfo }} key={`trip-${tripInfo.title}`} />
          ))}
        </Grid>
      </MainWrapper>
    </>
  );
};

export default MainTemplate;
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
