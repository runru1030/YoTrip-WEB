import Button from "components/_atoms/Button";
import Flex from "components/_atoms/Flex";
import Input from "components/_atoms/Input";
import Span from "components/_atoms/Span";
import { debounce } from "lodash";
import { CountryList } from "public/Country";
import React, { useMemo, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import styled from "styled-components";
import {
  DarkCardWrapper,
  MainCardWrapper,
  MainWrapper,
  ShadowRound,
} from "styles/mixin";
import { dateFormater } from "utils/function";
import BottomBar from "./BottomBar";
import Header from "./Header";

interface ICountryInfo {
  name: string;
  detail: string;
}
interface ICountryTotalInfo extends ICountryInfo {
  startDate: Date;
  endDate: Date;
}
interface ITripInfo {
  title: string;
  countries: ICountryTotalInfo[];
  mateList: number[];
}
const AddTripTemplate = () => {
  const [tripInfo, setTripInfo] = useState<ITripInfo>({
    title: "",
    countries: [],
    mateList: [],
  });
  const [countryInfo, setCountryInfo] = useState({
    name: "",
    detail: "",
  });
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [mateNickname, setMateNickname] = useState("");
  const handleSelectDate = (ranges: any) => {
    setSelectionRange({
      startDate: ranges["selection"].startDate,
      endDate: ranges["selection"].endDate,
      key: ranges["selection"].key,
    });
  };
  const handleChangeInput = (e: React.ChangeEvent) => {
    const { id, value } = e.target as HTMLInputElement;
    switch (id) {
      case "title":
        setTripInfo((p) => ({ ...p, title: value }));
        break;
      case "countryName":
        setCountryInfo((p) => ({ ...p, name: value }));
        handleSearchCountry(value);
        break;
      case "countryDetail":
        setCountryInfo((p) => ({ ...p, detail: value }));
        break;
      case "mateNickname":
        setMateNickname(value);
        //검색 로직
        break;
    }
  };
  const [resultCountries, setResultCountries] = useState<
    {
      code_2: string;
      code_kr: string;
      code_en: string;
    }[]
  >([]);
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

  const [writeState, setWriteState] = useState<
    "country" | "detail" | "date" | "confirm"
  >("country");

  const TripInfoAddContent = {
    country: (
      <>
        <Span bold>트립 국가</Span>
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
                setCountryInfo((p) => ({ ...p, name: country.code_kr }));
                setWriteState("detail");
              }}
            >
              {country.code_kr}
            </Span>
          ))}
          {resultCountries.length === 0 && countryInfo.name && (
            <Span textColor="gray300">검색 정보가 없습니다.</Span>
          )}
        </ResultWrapper>
      </>
    ),
    detail: (
      <>
        <Span bold>트립 국가</Span>
        <Span bold>{countryInfo.name}</Span>
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
            setWriteState("date");
          }}
          borderRadius="8px"
        >
          확인
        </Button>
      </>
    ),
    date: (
      <>
        <Span bold>트립 기간</Span>
        <DateRange
          editableDateInputs={true}
          ranges={[selectionRange]}
          onChange={handleSelectDate}
        />
        <Button
          onClick={() => {
            setTripInfo((p) => ({
              ...p,
              countries: [
                ...p.countries,
                {
                  ...countryInfo,
                  startDate: selectionRange.startDate,
                  endDate: selectionRange.endDate,
                },
              ],
            }));
            setCountryInfo({
              name: "",
              detail: "",
            });
            setResultCountries([]);
            setWriteState("confirm");
          }}
          borderRadius="8px"
        >
          확인
        </Button>
      </>
    ),
    confirm: (
      <>
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
                {dateFormater(country.startDate)} -
                {dateFormater(country.endDate)}
              </Span>
            </Flex>
            <Span fontWeight="light">{country.detail}</Span>
          </DarkCardWrapper>
        ))}
        <Button
          onClick={() => {
            setWriteState("country");
          }}
          borderRadius="8px"
        >
          여정 추가
        </Button>
      </>
    ),
  };
  return (
    <>
      <Header />
      <MainScrollWrapper dir="column" gap="20px">
        <MainCardWrapper dir="column" gap="10px">
          <Input
            type="text"
            placeholder="트립 이름"
            borderRadius="10px"
            id="title"
            value={tripInfo.title}
            onChange={handleChangeInput}
          ></Input>
        </MainCardWrapper>
        <MainCardWrapper dir="column" gap="10px">
          {TripInfoAddContent[writeState]}
        </MainCardWrapper>
        <MainCardWrapper dir="column" gap="10px">
          <Span bold>트립 메이트</Span>
          <Input
            type="text"
            placeholder="사용자 닉네임 검색"
            inputType="primaryDark"
            borderRadius="10px"
            id="mateNickname"
            value={mateNickname}
            onChange={handleChangeInput}
          ></Input>
        </MainCardWrapper>
      </MainScrollWrapper>
      <BottomBar>
        <AddButton width="100%" borderRadius="8px" padding="10px">
          트립 추가하기
        </AddButton>
      </BottomBar>
    </>
  );
};

export default AddTripTemplate;
const MainScrollWrapper = styled(MainWrapper)`
  max-height: calc(100vh - 50px- 94px);
  overflow: scroll;
  & > div {
    width: 90%;
    padding: 15px;
  }
`;
const AddButton = styled(Button)`
  width: 100%;
  font-size: medium;
  padding: 15px 15px;
  ${ShadowRound({ color: "#FFFFFF10" })}
  font-weight:bold;
`;
const ResultWrapper = styled(DarkCardWrapper)`
  font-size: small;
  overflow: scroll;
  transition: 0.6;
  & span {
    padding: 10px;
  }
  max-height: 200px;
`;
