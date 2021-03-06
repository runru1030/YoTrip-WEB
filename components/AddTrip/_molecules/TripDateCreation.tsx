import React, { useState } from "react";
import { DateRange } from "react-date-range";

import Button from "components/_atoms/Button";
import Span from "components/_atoms/Span";
import {
  addTripCountry,
  initCountryInfo,
  selectTripCreationState,
  setStatus,
} from "modules/slices/tripCreationSlice";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useDispatch, useSelector } from "react-redux";
import { MainCardWrapper } from "styles/mixin";
import Flex from "components/_atoms/Flex";
import CancelButton from "./CancelButton";
import useDateSelect from "hooks/useDateSelect";
import DateSelector from "components/_molecules/DateSelector";

const TripDateCreation = () => {
  const { tripCreationSatus } = useSelector(selectTripCreationState);
  const { selectionRange, handleSelectDate } = useDateSelect();
  const dispatch = useDispatch();
  return (
    <MainCardWrapper dir="column" gap="16px">
      <Flex spaceBetween vAlign>
        <Span bold>트립 기간</Span>
        <CancelButton type={tripCreationSatus} />
      </Flex>
      <DateSelector ranges={[selectionRange]} onChange={handleSelectDate} />
      <Button
        onClick={() => {
          dispatch(
            addTripCountry({
              startDate: selectionRange.startDate,
              endDate: selectionRange.endDate,
            })
          );
          dispatch(initCountryInfo());
          dispatch(setStatus("confirm"));
        }}
        borderRadius="8px"
      >
        확인
      </Button>
    </MainCardWrapper>
  );
};

export default TripDateCreation;
