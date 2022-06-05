import React, { useMemo, useState } from "react";
import styled from "styled-components";

import Input from "components/_atoms/Input";
import Span from "components/_atoms/Span";
import { debounce } from "lodash";
import {
  selectTripCreationState,
  setStatus,
  setTripInfo,
} from "modules/slices/tripCreationSlice";
import { CountryList, ICountry } from "public/Country";
import { useDispatch, useSelector } from "react-redux";
import { DarkCardWrapper, MainCardWrapper } from "styles/mixin";
import CancelButton from "./CancelButton";
import Flex from "components/_atoms/Flex";

const TripCountryCreation = () => {
  const { countryInfo, tripCreationSatus, tripInfo } = useSelector(
    selectTripCreationState
  );
  const dispatch = useDispatch();

  const handleChangeInput = (e: React.ChangeEvent) => {
    const { id, value } = e.target as HTMLInputElement;
    dispatch(setTripInfo({ value, type: id }));
    handleSearchCountry(value);
  };
  const [resultCountries, setResultCountries] = useState<ICountry[]>([]);
  const handleSearchCountry = useMemo(
    () =>
      debounce((countryName: string) => {
        const resultCountries = CountryList.filter((country) =>
          country.code_kr.includes(countryName)
        );
        setResultCountries(resultCountries);
      }, 1000),
    []
  );
  return (
    <MainCardWrapper dir="column" gap="16px">
      <Flex spaceBetween vAlign>
        <Span bold>트립 국가</Span>
        {/* 여정 추가인 경우 */}
        {tripInfo.countries.length > 0 && (
          <CancelButton type={tripCreationSatus} />
        )}
      </Flex>
      <Input
        type="text"
        placeholder="국가명 검색"
        inputType="primaryDark"
        borderRadius="10px"
        id="countryName"
        value={countryInfo.name}
        onChange={handleChangeInput}
      ></Input>
      <ResultWrapper dir="column">
        {resultCountries.map((country) => (
          <Span
            key={country.code_2}
            onClick={() => {
              dispatch(
                setTripInfo({ value: country.code_kr, type: "countryName" })
              );
              dispatch(setStatus("detail"));
            }}
          >
            {country.code_kr}
          </Span>
        ))}
        {resultCountries.length === 0 && countryInfo.name && (
          <Span textColor="gray300">검색 정보가 없습니다.</Span>
        )}
      </ResultWrapper>
    </MainCardWrapper>
  );
};

export default TripCountryCreation;
const ResultWrapper = styled(DarkCardWrapper)`
  font-size: small;
  overflow: scroll;
  transition: 0.6;
  & span {
    padding: 10px;
  }
  max-height: 200px;
`;
