import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import AddIcon from "@mui/icons-material/Add";
import SwipeToDelete from "components/react-swipe-to-delete-component/js/SwipeToDelete.jsx";
import Flex from "components/_atoms/Flex";
import Span from "components/_atoms/Span";
import { Timestamp } from "firebase/firestore";
import { deleteTripItemDetail } from "lib/services/trip";
import {
  getMyTripInfo,
  getMyTripItemDetailInfo,
  ITripItemDetailInfo,
  selectMyTripItemState,
} from "modules/slices/myTripItemSlice";
import { selectUserInfoState } from "modules/slices/userSlice";
import { useRouter } from "next/router";
import { MainCardWrapper, MainWrapper } from "styles/mixin";
import { numberWithCommas, timeStampFormater } from "utils/function";
import TripInfoContainer from "../_molecules/TripInfoContainer";
import Image from "next/image";
const MyTripItemDetailTemplate: React.FC = ({}) => {
  const router = useRouter();
  const { tid, id } = router.query as { tid: string; id: string };
  const { userInfo } = useSelector(selectUserInfoState);
  const { currTripItem, itemDetails } = useSelector(selectMyTripItemState);

  const dispatch = useDispatch();
  const handleDelete = async (detailItem: ITripItemDetailInfo) => {
    try {
      await deleteTripItemDetail({
        uid: userInfo.uid,
        tid,
        itemId: id,
        itemDetailId: detailItem.id as string,
        cost: detailItem.cost,
      }).then(() => {
        dispatch(getMyTripInfo({ uid: userInfo.uid, tid }));
        dispatch(
          getMyTripItemDetailInfo({ uid: userInfo.uid, tid, itemId: id })
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {},[])
  return (
    <>
      <MainScrollWrapper dir="column" spaceBetween>
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
                      {timeStampFormater(li.startDate as Timestamp)} -
                      {timeStampFormater(li.endDate as Timestamp)}
                    </Span>
                  </Flex>
                  <Span fontWeight="thin" fontSize="sm">
                    ₩ {numberWithCommas(li.cost)}
                  </Span>
                </ItemDetailWrapper>
              </SwipeToDelete>
            ))}
            {itemDetails.length === 0 && (
              <ImgWrapper centerVH dir="column" height="35vh" gap="16px">
                <Image
                  src="/images/posting.svg"
                  alt=""
                  width="120px"
                  height="120px"
                />
                <Span fontWeight="thin">상세 비용을 추가해보세요.</Span>
              </ImgWrapper>
            )}
          </ItemScrollWrapper>
          <CostWrapper width="100%" textAlign="center" fontSize="md" >
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
  /* overflow: scroll; */
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

const ImgWrapper = styled(Flex)`
  img {
    opacity: 0.3;
  }
  color: ${({ theme }) => theme.colors.gray300};
`;
