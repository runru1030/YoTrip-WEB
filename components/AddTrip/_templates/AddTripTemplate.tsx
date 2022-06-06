import React, { useState } from "react";
import styled from "styled-components";

import Button from "components/_atoms/Button";
import Input from "components/_atoms/Input";
import Span from "components/_atoms/Span";
import {
  selectTripCreationState,
  setTripInfo,
} from "modules/slices/tripCreationSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  DarkCardWrapper,
  MainCardWrapper,
  MainWrapper,
  ShadowRound,
} from "styles/mixin";
import BottomBar from "../../_templates/BottomBar";
import Header from "../../_templates/Header";
import TripConfirmCreation from "../_molecules/TripConfirmCreation";
import TripCountryCreation from "../_molecules/TripCountryCreation";
import TripDateCreation from "../_molecules/TripDateCreation";
import TripDetailCreation from "../_molecules/TripDetailCreation";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "utils/firebase/app";
import { selectUserInfoState } from "modules/slices/userSlice";
import { useRouter } from "next/router";

const AddTripTemplate = () => {
  const { tripInfo, tripCreationSatus } = useSelector(selectTripCreationState);
  const { userInfo } = useSelector(selectUserInfoState);
  const router = useRouter();

  const [mateNickname, setMateNickname] = useState("");
  const dispatch = useDispatch();
  const handleChangeInput = (e: React.ChangeEvent) => {
    const { id, value } = e.target as HTMLInputElement;
    switch (id) {
      case "title":
        dispatch(setTripInfo({ value, type: id }));
        break;
      case "mateNickname":
        setMateNickname(value);
        //검색 로직
        break;
    }
  };

  const TripInfoAddContent = {
    country: <TripCountryCreation />,
    detail: <TripDetailCreation />,
    date: <TripDateCreation />,
    confirm: <TripConfirmCreation />,
  };
  const handleSubmit = async () => {
    try {
      if (tripInfo.countries.length === 0)
        throw new Error("트립 국가를 추가해주세요.");
      await addDoc(collection(db, "Trip", userInfo.uid, "myTripInfo"), {
        ...tripInfo,
        createdAt: serverTimestamp(),
      }).then(() => router.push("/main"));
    } catch (error: any) {
      alert(error.message);
      console.error(error);
    }
  };
  return (
    <>
      <MainScrollWrapper dir="column" gap="20px">
        <MainCardWrapper dir="column" gap="16px">
          <Input
            type="text"
            placeholder="트립 이름"
            borderRadius="10px"
            id="title"
            value={tripInfo.title}
            onChange={handleChangeInput}
            required
          ></Input>
        </MainCardWrapper>
        <MainCardWrapper dir="column" gap="16px">
          {TripInfoAddContent[tripCreationSatus]}
        </MainCardWrapper>
        <MainCardWrapper dir="column" gap="16px">
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
        <AddButton
          width="100%"
          borderRadius="8px"
          padding="10px"
          onClick={handleSubmit}
        >
          트립 추가하기
        </AddButton>
      </BottomBar>
    </>
  );
};

export default AddTripTemplate;
const MainScrollWrapper = styled(MainWrapper)`
  margin: 20px 0;
  max-height: calc(100vh - 90px - 94px);
  overflow: scroll;
  & > div {
    width: 90%;
    padding: 16px;
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
