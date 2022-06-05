import React from "react";

import Button from "components/_atoms/Button";
import Input from "components/_atoms/Input";
import Span from "components/_atoms/Span";
import {
  initCountryInfo,
  selectTripCreationState,
  setStatus,
  setTripInfo,
} from "modules/slices/tripCreationSlice";
import { useDispatch, useSelector } from "react-redux";
import { MainCardWrapper } from "styles/mixin";
import styled from "styled-components";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Flex from "components/_atoms/Flex";
import CancelButton from "./CancelButton";

const TripDetailCreation = () => {
  const { countryInfo, tripCreationSatus } = useSelector(
    selectTripCreationState
  );
  const dispatch = useDispatch();
  const handleChangeInput = (e: React.ChangeEvent) => {
    const { id, value } = e.target as HTMLInputElement;
    dispatch(setTripInfo({ value, type: id }));
  };

  return (
    <MainCardWrapper dir="column" gap="16px">
      <Flex spaceBetween vAlign>
        <Span bold>트립 국가</Span>
        <CancelButton type={tripCreationSatus} />
      </Flex>
      <CountryWrapper bold>{countryInfo.name}</CountryWrapper>
      <Input
        type="text"
        placeholder="세부 지역 입력"
        inputType="primaryDark"
        borderRadius="10px"
        id="countryDetail"
        value={countryInfo.detail}
        onChange={handleChangeInput}
      ></Input>
      <Button
        onClick={() => {
          dispatch(setStatus("date"));
        }}
        borderRadius="8px"
      >
        확인
      </Button>
    </MainCardWrapper>
  );
};

export default TripDetailCreation;
const CountryWrapper = styled(Span)`
  background-color: ${({ theme }) => theme.colors.gray100};
  text-align: center;
  border-radius: 16px;
  padding: 5px;
`;
