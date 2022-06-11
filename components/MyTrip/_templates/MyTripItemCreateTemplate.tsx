import React, { useState } from "react";
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
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  ITripItemDetailInfo,
  selectMyTripItemState,
} from "modules/slices/myTripItemSlice";
import { numberWithCommas } from "utils/function";
import {
  addDoc,
  collection,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "utils/firebase/app";
import { selectUserInfoState } from "modules/slices/userSlice";
import { async } from "@firebase/util";

const MyTripItemCreateTemplate = () => {
  const router = useRouter();
  const { tid, id } = router.query as { tid: string; id: string };
  const { currTripItem, trip } = useSelector(selectMyTripItemState);
  const { userInfo } = useSelector(selectUserInfoState);
  const [itemDetail, setItemDetail] = useState({
    title: "",
    cost: 0,
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleChangeInput = (e: React.ChangeEvent) => {
    const { id, value } = e.target as HTMLInputElement;
    if (id === "cost") {
      let regex = /[^0-9]/g;
      if (regex.test(value)) return;
    }
    setItemDetail((p) => ({ ...p, [id]: value }));
  };
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const handleSelectDate = (ranges: any) => {
    setSelectionRange({
      startDate: ranges["selection"].startDate,
      endDate: ranges["selection"].endDate,
      key: ranges["selection"].key,
    });
    setItemDetail((p) => ({
      ...p,
      startDate: ranges["selection"].startDate,
      endDate: ranges["selection"].endDate,
    }));
  };
  const handleCreateItemDetail = async () => {
    try {
      if (itemDetail.title === "" || itemDetail.cost === 0)
        throw new Error("입력사항을 확인해주세요.");

      await addDoc(
        collection(
          db,
          "Trip",
          userInfo.uid,
          "myTripInfo",
          tid,
          "tripItems",
          id,
          "detail"
        ),
        {
          ...itemDetail,
        }
      );
      const myTripRef = doc(db, "Trip", userInfo.uid, "myTripInfo", tid);
      await updateDoc(myTripRef, { cost: increment(itemDetail.cost) });
      const myTripItemRef = doc(
        db,
        "Trip",
        userInfo.uid,
        "myTripInfo",
        tid,
        "tripItems",
        id
      );
      await updateDoc(myTripItemRef, { cost: increment(itemDetail.cost) }).then(
        () => {
          router.back();
        }
      );
    } catch (error: any) {
      alert(error.message);
      console.error(error);
    }
  };
  return (
    <>
      <MainScrollWrapper dir="column">
        <TripInfoContainer />
        <MainCardWrapper dir="column" padding="16px" gap="24px" margin="16px">
          <Flex spaceBetween vAlign>
            <Span bold fontSize="md">
              {currTripItem.title}
            </Span>
            <CancelButton type={"back"} />
          </Flex>
          <Input
            type="text"
            placeholder="비용 이름"
            inputType="primaryDark"
            borderRadius="12px"
            id="title"
            value={itemDetail.title}
            onChange={handleChangeInput}
            required
          ></Input>
          <CostInputWrapper centerVH>
            <Span textColor="primary" fontSize="md">
              ₩
            </Span>
            <Input
              type="number"
              placeholder="비용"
              inputType="primaryDark"
              id="cost"
              value={itemDetail.cost !== 0 ? itemDetail.cost : ""}
              onChange={handleChangeInput}
              required
            ></Input>
            {/* <CostInputLabel>{numberWithCommas(itemDetail.cost)}</CostInputLabel> */}
          </CostInputWrapper>
          <Flex dir="column" gap="16px">
            <Span bold>비용 기간</Span>
            <DateRange
              editableDateInputs={true}
              ranges={[selectionRange]}
              onChange={handleSelectDate}
            />
          </Flex>
        </MainCardWrapper>
      </MainScrollWrapper>
      <BottomBar>
        <Button
          borderRadius="12px"
          padding="16px"
          width="100%"
          onClick={handleCreateItemDetail}
        >
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
    color: ${({ theme }) => theme.colors.primary};
    &::placeholder {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const CostInputLabel = styled(Flex)`
  position: absolute;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;
