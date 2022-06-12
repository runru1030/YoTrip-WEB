import React, { useState } from "react";
import { DateRange } from "react-date-range";
import styled from "styled-components";

import CancelButton from "components/AddTrip/_molecules/CancelButton";
import Button from "components/_atoms/Button";
import Flex from "components/_atoms/Flex";
import Input from "components/_atoms/Input";
import Span from "components/_atoms/Span";
import BottomBar from "components/_templates/BottomBar";
import useDateSelect from "hooks/useDateSelect";
import { createTripItemDetail } from "lib/services/trip";
import {
  getMyTripInfo,
  getMyTripItemDetailInfo,
  selectMyTripItemState,
} from "modules/slices/myTripItemSlice";
import { selectUserInfoState } from "modules/slices/userSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { MainCardWrapper, MainWrapper } from "styles/mixin";
import TripInfoContainer from "../_molecules/TripInfoContainer";
import DateSelector from "components/_molecules/DateSelector";

const MyTripItemCreateTemplate = () => {
  const router = useRouter();
  const { tid, id } = router.query as { tid: string; id: string };
  const { currTripItem, trip } = useSelector(selectMyTripItemState);
  const { userInfo } = useSelector(selectUserInfoState);
  const [itemDetailInfo, setItemDetail] = useState({
    title: "",
    cost: 0,
    startDate: new Date(),
    endDate: new Date(),
  });
  const { selectionRange, handleSelectDate } = useDateSelect();
  const dispatch = useDispatch();
  const handleChangeInput = (e: React.ChangeEvent) => {
    const { id, value } = e.target as HTMLInputElement;
    if (id === "cost") {
      let regex = /[^0-9]/g;
      if (regex.test(value)) return;
    }
    setItemDetail((p) => ({ ...p, [id]: value }));
  };
  const handleCreateItemDetail = async () => {
    try {
      if (itemDetailInfo.title === "" || itemDetailInfo.cost === 0)
        throw new Error("입력사항을 확인해주세요.");
      await createTripItemDetail({
        uid: userInfo.uid,
        tid,
        itemId: id,
        itemDetailInfo: {
          ...itemDetailInfo,
          startDate: selectionRange.startDate,
          endDate: selectionRange.endDate,
        },
      }).then(() => {
        dispatch(getMyTripInfo({ uid: userInfo.uid, tid }));
        dispatch(
          getMyTripItemDetailInfo({ uid: userInfo.uid, tid, itemId: id })
        );
        router.back();
      });
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
            value={itemDetailInfo.title}
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
              value={itemDetailInfo.cost !== 0 ? itemDetailInfo.cost : ""}
              onChange={handleChangeInput}
              required
            ></Input>
            {/* <CostInputLabel>{numberWithCommas(itemDetailInfo.cost)}</CostInputLabel> */}
          </CostInputWrapper>
          <Flex dir="column" gap="16px">
            <Span bold>비용 기간</Span>
            <DateSelector
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
