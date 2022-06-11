import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";

import AddIcon from "@mui/icons-material/Add";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import HotelIcon from "@mui/icons-material/Hotel";
import Flex from "components/_atoms/Flex";
import Grid from "components/_atoms/Grid";
import Span from "components/_atoms/Span";
import PortalModal from "components/_molecules/PortalModal";
import useModal from "hooks/useModal";
import {
  ITripItemInfo,
  selectMyTripItemState,
} from "modules/slices/myTripItemSlice";
import { MainWrapper, ShadowRound } from "styles/mixin";
import { numberWithCommas } from "utils/function";
import ItemCreationContent from "../modal/ItemCreationContent";
import TripInfoContainer from "../_molecules/TripInfoContainer";

const MyTripItemTemplate = ({}) => {
  const router = useRouter();
  const { tid } = router.query;
  const { tripItems, myTripInfo } = useSelector(selectMyTripItemState);

  const convertItemTitles = (title: string) => {
    switch (title) {
      case "숙소":
        return <HotelIcon sx={{ fontSize: "16px" }} />;
      case "항공":
        return <AirplanemodeActiveIcon sx={{ fontSize: "16px" }} />;
      default:
        return <Span bold>{title}</Span>;
    }
  };
  const { openModal, closeModal, isModalOpen } = useModal({});
  return (
    <>
      <MainScrollWrapper dir="column">
        <TripInfoContainer {...{ myTripInfo }} />
        <ItemContainer columnCount={3} gridGap="16px" margin="16px">
          {tripItems.map((item: ITripItemInfo) => (
            <ItemWrapper
              dir="column"
              centerVH
              gap="8px"
              onClick={() =>
                router.push(`/myTrip/${tid}/item/${item.id}/detail`)
              }
              key={item.id}
              height="70px"
            >
              {convertItemTitles(item.title)}
              <Span fontWeight="thin" textColor="gray300">
                ₩ {numberWithCommas(item.cost)}
              </Span>
            </ItemWrapper>
          ))}
          <ItemAddWrapper dir="column" centerVH gap="8px" onClick={openModal}>
            <AddIcon />
          </ItemAddWrapper>
        </ItemContainer>
      </MainScrollWrapper>
      <PortalModal
        {...{ closeModal, isModalOpen }}
        isWithClosedButton
        padding="16px"
        width="90%"
        maxWidth="350px"
      >
        <ItemCreationContent />
      </PortalModal>
    </>
  );
};

export default MyTripItemTemplate;
const MainScrollWrapper = styled(MainWrapper)`
  max-height: calc(100vh - 50px - 94px);
  overflow: scroll;
  & > div {
    width: 90%;
  }
`;

const ItemWrapper = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.gray200};
  padding: 12px;
  font-size: 12px;
  ${ShadowRound({ x: "10px", y: "10", borderRadius: "16px" })};
  height: 70px;
`;
const ItemAddWrapper = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 16px;
  padding: 12px;
  font-size: 12px;
  svg {
    fill: ${({ theme }) => theme.colors.gray300};
  }
  height: 70px;
`;

const ItemContainer = styled(Grid)`
  max-width: 350px;
`;
