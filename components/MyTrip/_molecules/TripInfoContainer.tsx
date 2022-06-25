import Flex from "components/_atoms/Flex";
import Span from "components/_atoms/Span";
import DateContainer from "components/_molecules/DateContainer";
import Profile from "components/_molecules/Profile";
import { selectMyTripItemState } from "modules/slices/myTripItemSlice";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { numberWithCommas, timeStampFormater } from "utils/function";

interface IProps {}
const TripInfoContainer = ({}: IProps) => {
  const { myTripInfo } = useSelector(selectMyTripItemState);
  return (
    <Flex dir="column" gap="16px" padding="16px 0" vAlign>
      {/* <Flex spaceBetween width="100%"> */}
      <Span fontWeight="bold" fontSize="nm" textAlign="center">
        {myTripInfo.title}
      </Span>
      <DateContainer
        startDate={myTripInfo.startDate}
        endDate={myTripInfo.endDate}
      />
      {/* </Flex> */}
      <Flex gap="10px">
        {myTripInfo.mateList.map((mate: any) => (
          <Profile
            /* profileUrl={mate.profileUrl} */ width="36px"
            height="36px"
          />
        ))}
      </Flex>
      <TotalCostWrapper width="100%" centerVH>
        <Span textColor="primary" bold fontSize="lg">
          ₩ {numberWithCommas(myTripInfo.cost)}
        </Span>
      </TotalCostWrapper>
    </Flex>
  );
};

export default TripInfoContainer;
const TotalCostWrapper = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 16px;
  padding: 16px;
`;
