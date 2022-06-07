import React from "react";
import styled from "styled-components";

import Flex from "components/_atoms/Flex";
import Span from "components/_atoms/Span";
import Profile from "components/_molecules/Profile";
import { timeStampFormater, numberWithCommas } from "utils/function";
import { ITripInfo } from "modules/slices/tripCreationSlice";
interface IProps {
  myTripInfo: ITripInfo;
}
const TripInfoContainer = ({ myTripInfo }: IProps) => {
  return (
    <Flex dir="column" gap="16px">
      <Flex spaceBetween>
        <Span fontWeight="bold" fontSize="md">
          {myTripInfo.title}
        </Span>
        <Span textColor="gray300" fontWeight="semiBold" fontSize="sm">
          {timeStampFormater(myTripInfo.startDate)} -
          {timeStampFormater(myTripInfo.endDate)}
        </Span>
      </Flex>
      <Flex gap="10px">
        {myTripInfo.mateList.map((mate) => (
          <Profile
            /* profileUrl={mate.profileUrl} */ width="36px"
            height="36px"
          />
        ))}
      </Flex>
      <TotalCostWrapper centerVH>
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
  padding: 8px;
`;
