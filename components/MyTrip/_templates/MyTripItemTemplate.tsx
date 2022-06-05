import AddIcon from "@mui/icons-material/Add";
import TripCard from "components/Main/_molecules/TripCard";
import Button from "components/_atoms/Button";
import Flex from "components/_atoms/Flex";
import Grid from "components/_atoms/Grid";
import Span from "components/_atoms/Span";
import Profile from "components/_molecules/Profile";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { MainWrapper, ShadowRound } from "styles/mixin";
import { dateFormater, numberWithCommas } from "utils/function";
import BottomBar from "../../_templates/BottomBar";
import Header from "../../_templates/Header";
import HotelIcon from "@mui/icons-material/Hotel";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

const MyTripItemTemplate = () => {
  const router = useRouter();
  const myTripInfo = {
    title: "캐나다 여행기",
    startDate: new Date(),
    endDate: new Date(),
    mateList: [1, 2, 3],
    cost: 30000,
    items: [
      { id: 1, title: "숙소", cost: 2000 },
      { id: 2, title: "항공", cost: 1000 },
    ],
  };

  const handleClickAdd = () => {
    router.push("/addTrip");
  };
  const convertItemTitles = (title: string) => {
    switch (title) {
      case "숙소":
        return <HotelIcon sx={{ fontSize: "16px" }} />;
      case "항공":
        return <AirplanemodeActiveIcon sx={{ fontSize: "16px" }} />;
      default:
        return <Span bold>{title}</Span>;
    }
  };
  return (
    <>
      <Header />
      <MainScrollWrapper dir="column">
        <Flex dir="column" gap="16px">
          <Flex spaceBetween>
            <Span fontWeight="bold" fontSize="md">
              {myTripInfo.title}
            </Span>
            <Span textColor="gray300" fontWeight="semiBold" fontSize="sm">
              {dateFormater(myTripInfo.startDate)} -
              {dateFormater(myTripInfo.endDate)}
            </Span>
          </Flex>
          <Flex gap="10px">
            {myTripInfo.mateList.map((mate) => (
              <Profile
                /* profileUrl={mate.profileUrl} */ width="36px"
                height="36px"
              />
            ))}
          </Flex>
          <TotalCostWrapper centerVH>
            <Span textColor="primary" bold fontSize="lg">
              ₩ {numberWithCommas(myTripInfo.cost)}
            </Span>
          </TotalCostWrapper>
        </Flex>
        <ItemContainer columnCount={3} gridGap="16px" margin="16px">
          {myTripInfo.items.map((item) => (
            <ItemWrapper dir="column" centerVH gap="8px">
              {convertItemTitles(item.title)}
              <Span fontWeight="thin" textColor="gray300">
                ₩ {numberWithCommas(item.cost)}
              </Span>
            </ItemWrapper>
          ))}
          <ItemAddWrapper dir="column" centerVH gap="8px">
            <AddIcon />
          </ItemAddWrapper>
        </ItemContainer>
      </MainScrollWrapper>
    </>
  );
};

export default MyTripItemTemplate;
const MainScrollWrapper = styled(MainWrapper)`
  max-height: calc(100vh - 50px - 94px);
  overflow: scroll;
  & > div {
    width: 90%;
  }
`;
const TotalCostWrapper = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 16px;
  padding: 8px;
`;

const ItemWrapper = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.gray200};
  padding: 12px;
  font-size: 12px;
  ${ShadowRound({ x: "10px", y: "10", borderRadius: "16px" })}
`;
const ItemAddWrapper = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 16px;
  padding: 12px;
  font-size: 12px;
  svg {
    fill: ${({ theme }) => theme.colors.gray300};
  }
`;

const ItemContainer = styled(Grid)`
  max-width: 350px;
`;
