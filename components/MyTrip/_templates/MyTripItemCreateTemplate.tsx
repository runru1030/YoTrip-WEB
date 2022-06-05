import React from "react";
import { DateRange } from "react-date-range";
import styled from "styled-components";

import CancelButton from "components/AddTrip/_molecules/CancelButton";
import Button from "components/_atoms/Button";
import Flex from "components/_atoms/Flex";
import Input from "components/_atoms/Input";
import Span from "components/_atoms/Span";
import { MainCardWrapper, MainWrapper } from "styles/mixin";
import Header from "../../_templates/Header";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import TripInfoContainer from "../_molecules/TripInfoContainer";
import BottomBar from "components/_templates/BottomBar";

const MyTripItemCreateTemplate = () => {
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
            <CancelButton type={"back"} />
          </Flex>
          <Input
            type="text"
            placeholder="비용 이름"
            inputType="primaryDark"
            borderRadius="12px"
          ></Input>
          <CostInputWrapper centerVH>
            <Span textColor="primary" fontSize="md">
              ₩
            </Span>
            <Input
              type="number"
              placeholder="비용"
              inputType="primaryDark"
            ></Input>
          </CostInputWrapper>
          <Flex dir="column" gap="16px">
            <Span bold>비용 기간</Span>
            <DateRange />
          </Flex>
        </MainCardWrapper>
      </MainScrollWrapper>
      <BottomBar>
        <Button borderRadius="12px" padding="16px" width="100%">
          추가
        </Button>
      </BottomBar>
    </>
  );
};

export default MyTripItemCreateTemplate;
const MainScrollWrapper = styled(MainWrapper)`
  max-height: calc(100vh - 50px - 94px);
  overflow: scroll;
  & > div {
    width: 90%;
  }
`;

const CostInputWrapper = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.gray100};
  position: relative;
  border-radius: 12px;
  & > span {
    position: absolute;
    left: 12px;
  }
  input {
    text-align: center;
    &::placeholder {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
