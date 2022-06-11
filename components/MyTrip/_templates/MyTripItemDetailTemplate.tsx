import AddIcon from "@mui/icons-material/Add";
import Flex from "components/_atoms/Flex";
import Span from "components/_atoms/Span";
import {
  ITripItemDetailInfo,
  selectMyTripItemState,
} from "modules/slices/myTripItemSlice";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { MainCardWrapper, MainWrapper } from "styles/mixin";
import { numberWithCommas, timeStampFormater } from "utils/function";
import TripInfoContainer from "../_molecules/TripInfoContainer";
import SwipeToDelete from "components/react-swipe-to-delete-component/js/SwipeToDelete.jsx";
import {
  collection,
  deleteDoc,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { selectUserInfoState } from "modules/slices/userSlice";
import { db } from "utils/firebase/app";
const MyTripItemDetailTemplate: React.FC = ({}) => {
  const router = useRouter();
  const { tid, id } = router.query as { tid: string; id: string };
  const { userInfo } = useSelector(selectUserInfoState);
  const { currTripItem, itemDetails } = useSelector(selectMyTripItemState);
  const handleDelete = async (detailItem: ITripItemDetailInfo) => {
    try {
      const detail = doc(
        db,
        "Trip",
        userInfo.uid,
        "myTripInfo",
        tid,
        "tripItems",
        id,
        "detail",
        detailItem.id
      );
      await deleteDoc(detail);
      const myTripRef = doc(db, "Trip", userInfo.uid, "myTripInfo", tid);
      await updateDoc(myTripRef, { cost: increment(-detailItem.cost) });
      const myTripItemRef = doc(
        db,
        "Trip",
        userInfo.uid,
        "myTripInfo",
        tid,
        "tripItems",
        id
      );
      await updateDoc(myTripItemRef, { cost: increment(-detailItem.cost) });
    } catch (error) {
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
            <AddIcon
              onClick={() => router.push(`/myTrip/${tid}/item/${id}/create`)}
            />
          </Flex>
          <ItemScrollWrapper dir="column" gap="16px">
            {itemDetails.map((li: ITripItemDetailInfo) => (
              <SwipeToDelete key={li.id} onDelete={() => handleDelete(li)}>
                <ItemDetailWrapper
                  dir="column"
                  gap="16px"
                  className="list-group-item"
                >
                  <Flex spaceBetween vAlign>
                    <Span fontWeight="xBold">{li.title}</Span>
                    <Span
                      textColor="gray300"
                      fontWeight="semiBold"
                      fontSize="sm"
                    >
                      {timeStampFormater(li.startDate)} -
                      {timeStampFormater(li.endDate)}
                    </Span>
                  </Flex>
                  <Span fontWeight="thin" fontSize="sm">
                    ₩ {numberWithCommas(li.cost)}
                  </Span>
                </ItemDetailWrapper>
              </SwipeToDelete>
            ))}
          </ItemScrollWrapper>
          <CostWrapper width="100%" textAlign="center" fontSize="lg" bold>
            ₩ {numberWithCommas(currTripItem.cost)}
          </CostWrapper>
        </MainCardWrapper>
      </MainScrollWrapper>
    </>
  );
};

export default MyTripItemDetailTemplate;
const MainScrollWrapper = styled(MainWrapper)`
  max-height: calc(100vh - 50px - 94px);
  overflow: scroll;
  & > div {
    width: 90%;
  }
`;

const ItemScrollWrapper = styled(Flex)`
  height: 40vh;
  overflow: scroll;
`;

const CostWrapper = styled(Span)`
  border-top: solid 1px ${({ theme }) => theme.colors.white}30;
  padding-top: 8px;
`;
const ItemDetailWrapper = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.gray200};
`;
