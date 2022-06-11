import React from "react";
import Button from "components/_atoms/Button";
import Flex from "components/_atoms/Flex";
import Span from "components/_atoms/Span";
import {
  delTripCountry,
  ICountryInfo,
  ICountryTotalInfo,
  ITripInfo,
  selectTripCreationState,
  setStatus,
} from "modules/slices/tripCreationSlice";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useDispatch, useSelector } from "react-redux";
import { DarkCardWrapper, MainCardWrapper } from "styles/mixin";
import { timeStampFormater } from "utils/function";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import styled from "styled-components";

const TripConfirmCreation = () => {
  const { tripInfo } = useSelector(selectTripCreationState);
  const dispatch = useDispatch();
  const handleClickDel = (countryInfo: ICountryTotalInfo) => {
    if (tripInfo.countries.length === 1) {
      dispatch(delTripCountry({ countryInfo }));
      dispatch(setStatus("country"));
    } else {
      dispatch(delTripCountry({ countryInfo }));
    }
  };
  return (
    <MainCardWrapper dir="column" gap="16px">
      <Span bold>트립 여정</Span>
      {(tripInfo as ITripInfo).countries.map((country, idx) => (
        <DarkCardWrapper
          key={country.name + country.detail + idx}
          dir="column"
          gap="10px"
          padding="10px"
        >
          <Flex dir="row" spaceBetween vAlign>
            <Span bold fontSize="md">
              {country.name}
            </Span>
            <Span textColor="gray300" fontWeight="semiBold" fontSize="sm">
              {timeStampFormater(country.startDate)} -{" "}
              {timeStampFormater(country.endDate)}
            </Span>
          </Flex>
          <Flex spaceBetween>
            <Span fontWeight="light">{country.detail}</Span>
            <DelButton btnType="unset" onClick={() => handleClickDel(country)}>
              <DoDisturbOnOutlinedIcon sx={{ fontSize: "16px" }} />
            </DelButton>
          </Flex>
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
const DelButton = styled(Button)`
  svg {
    fill: ${({ theme }) => theme.colors.gray300};
  }
  padding: 0;
`;
