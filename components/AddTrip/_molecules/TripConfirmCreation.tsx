import React from "react";
import Button from "components/_atoms/Button";
import Flex from "components/_atoms/Flex";
import Span from "components/_atoms/Span";
import {
  selectTripCreationState,
  setStatus,
} from "modules/slices/tripCreationSlice";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useDispatch, useSelector } from "react-redux";
import { DarkCardWrapper, MainCardWrapper } from "styles/mixin";
import { dateFormater } from "utils/function";

const TripConfirmCreation = () => {
  const { tripInfo } = useSelector(selectTripCreationState);
  const dispatch = useDispatch();
  return (
    <MainCardWrapper dir="column" gap="16px">
      <Span bold>트립 여정</Span>
      {tripInfo.countries.map((country) => (
        <DarkCardWrapper
          key={country.name}
          dir="column"
          gap="10px"
          padding="10px"
        >
          <Flex dir="row" spaceBetween vAlign>
            <Span bold fontSize="md">
              {country.name}
            </Span>
            <Span textColor="gray300" fontWeight="light">
              {dateFormater(country.startDate)} -{dateFormater(country.endDate)}
            </Span>
          </Flex>
          <Span fontWeight="light">{country.detail}</Span>
        </DarkCardWrapper>
      ))}
      <Button
        onClick={() => {
          dispatch(setStatus("country"));
        }}
        borderRadius="8px"
      >
        여정 추가
      </Button>
    </MainCardWrapper>
  );
};

export default TripConfirmCreation;
