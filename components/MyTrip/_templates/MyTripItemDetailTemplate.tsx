import React from "react";
import styled from "styled-components";

import AddIcon from "@mui/icons-material/Add";
import Flex from "components/_atoms/Flex";
import Span from "components/_atoms/Span";
import { useRouter } from "next/router";
import { MainCardWrapper, MainWrapper } from "styles/mixin";
import { dateFormater, numberWithCommas } from "utils/function";
import Header from "../../_templates/Header";
import TripInfoContainer from "../_molecules/TripInfoContainer";

const MyTripItemDetailTemplate = () => {
  const router = useRouter();
  const itemInfo = {
    id: 1,
    title: "숙소",
    cost: 2000,
    list: [
      {
        title: "캐나다",
        startDate: new Date(),
        endDate: new Date(),
        cost: 300,
      },
      {
        title: "캐나다",
        startDate: new Date(),
        endDate: new Date(),
        cost: 300,
      },
    ],
  };
  return (
    <>
      <Header />
      <MainScrollWrapper dir="column">
        <TripInfoContainer />
        <MainCardWrapper dir="column" padding="16px" gap="24px" margin="16px">
          <Flex spaceBetween vAlign>
            <Span bold fontSize="md">
              {itemInfo.title}
            </Span>
            <AddIcon
              onClick={() =>
                router.push(`/myTrip/${1}/item/${itemInfo.id}/create`)
              }
            />
          </Flex>
          <ItemScrollWrapper dir="column" gap="16px">
            {itemInfo.list.map((li) => (
              <Flex dir="column" gap="16px">
                <Flex spaceBetween vAlign>
                  <Span fontWeight="xBold">{li.title}</Span>
                  <Span textColor="gray300" fontWeight="semiBold" fontSize="sm">
                    {dateFormater(li.startDate)} -{dateFormater(li.endDate)}
                  </Span>
                </Flex>
                <Span fontWeight="thin" fontSize="sm">
                  ₩ {numberWithCommas(li.cost)}
                </Span>
              </Flex>
            ))}
          </ItemScrollWrapper>
          <CostWrapper
            width="100%"
            textAlign="center"
            fontSize="lg"
            bold
          >
            ₩ {numberWithCommas(itemInfo.cost)}
          </CostWrapper>
        </MainCardWrapper>
      </MainScrollWrapper>
    </>
  );
};

export default MyTripItemDetailTemplate;
const MainScrollWrapper = styled(MainWrapper)`
  max-height: calc(100vh - 50px - 94px);
  overflow: scroll;
  & > div {
    width: 90%;
  }
`;

const ItemScrollWrapper = styled(Flex)`
  height: 40vh;
  overflow: scroll;
`;

const CostWrapper = styled(Span)`
  border-top: solid 1px ${({ theme }) => theme.colors.white}30;
  padding-top: 8px;
`;
