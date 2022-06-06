import React from "react";
import styled from "styled-components";

import Flex from "components/_atoms/Flex";
import Span from "components/_atoms/Span";
import Profile from "components/_molecules/Profile";
import { dateFormater, numberWithCommas } from "utils/function";

const TripInfoContainer = () => {
  const myTripInfo = {
    title: "캐나다 여행기",
    startDate: "new Date()",
    endDate: "new Date()",
    mateList: [1, 2, 3],
    cost: 30000,
    items: [
      { id: 1, title: "숙소", cost: 2000 },
      { id: 2, title: "항공", cost: 1000 },
    ],
  };
  return (
    <Flex dir="column" gap="16px">
      <Flex spaceBetween>
        <Span fontWeight="bold" fontSize="md">
          {myTripInfo.title}
        </Span>
        <Span textColor="gray300" fontWeight="semiBold" fontSize="sm">
          {dateFormater(myTripInfo.startDate)} -
          {dateFormater(myTripInfo.endDate)}
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
