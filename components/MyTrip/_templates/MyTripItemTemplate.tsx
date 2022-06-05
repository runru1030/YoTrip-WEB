import React from "react";
import styled from "styled-components";

import AddIcon from "@mui/icons-material/Add";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import HotelIcon from "@mui/icons-material/Hotel";
import Flex from "components/_atoms/Flex";
import Grid from "components/_atoms/Grid";
import Span from "components/_atoms/Span";
import { useRouter } from "next/router";
import { MainWrapper, ShadowRound } from "styles/mixin";
import { numberWithCommas } from "utils/function";
import Header from "../../_templates/Header";
import TripInfoContainer from "../_molecules/TripInfoContainer";

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
        <TripInfoContainer />
        <ItemContainer columnCount={3} gridGap="16px" margin="16px">
          {myTripInfo.items.map((item) => (
            <ItemWrapper
              dir="column"
              centerVH
              gap="8px"
              onClick={() => router.push(`/myTrip/${1}/item/${item.id}/detail`)}
            >
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
