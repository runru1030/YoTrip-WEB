import Span from "components/_atoms/Span";
import { MainCardWrapper } from "styles/mixin";
import styled from "styled-components";
import Flex from "components/_atoms/Flex";
import Profile from "./Profile";
import { numberWithCommas } from "utils/function";
interface IProps {
  tripInfo: {
    title: string;
    startDate: string;
    endDate: string;
    mateList: any[];
    cost: number;
  };
}
const TripCard = ({ tripInfo }: IProps) => {
  return (
    <Wrapper dir="column" spaceBetween shadow vAlign>
      <Span fontSize="md" fontWeight="semiBold">
        {tripInfo.title}
      </Span>
      <Span fontSize="sm" textColor="gray300" fontWeight="semiBold">
        {tripInfo.startDate} - {tripInfo.endDate}
      </Span>
      <Flex gap="10px">
        {tripInfo.mateList.map((mate) => (
          <Profile profileUrl={mate.profileUrl} />
        ))}
      </Flex>

      <CostWrapper>₩ {numberWithCommas(tripInfo.cost)}</CostWrapper>
    </Wrapper>
  );
};
export default TripCard;
const Wrapper = styled(MainCardWrapper)`
  height: 200px;
  width: 170px;
  padding: 20px;
  border-radius: 16px;
`;
const CostWrapper = styled(Span)`
  background-color: ${({ theme }) => theme.colors.primary};
  max-width: 200px;
  padding: 5px 10px;
  border-radius: 8px;
`;
