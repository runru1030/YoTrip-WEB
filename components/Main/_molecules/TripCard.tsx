import Span from "components/_atoms/Span";
import { MainCardWrapper } from "styles/mixin";
import styled from "styled-components";
import Flex from "components/_atoms/Flex";
import Profile from "../../_molecules/Profile";
import { timeStampFormater, numberWithCommas } from "utils/function";
import { useRouter } from "next/router";
import { Timestamp } from "firebase/firestore";
interface IProps {
  tripInfo: {
    id: number;
    title: string;
    startDate: Timestamp;
    endDate: Timestamp;
    mateList: any[];
    cost: number;
  };
}
const TripCard = ({ tripInfo }: IProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/myTrip/${tripInfo.id}/item`);
  };

  return (
    <Wrapper dir="column" spaceBetween shadow vAlign onClick={handleClick}>
      <Span fontSize="md" fontWeight="semiBold">
        {tripInfo.title}
      </Span>
      <Span fontSize="sm" textColor="gray300" fontWeight="semiBold">
        {timeStampFormater(tripInfo.startDate)} -{" "}
        {timeStampFormater(tripInfo.endDate)}
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
