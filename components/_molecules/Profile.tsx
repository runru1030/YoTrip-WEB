import Span from "components/_atoms/Span";
import { MainCardWrapper } from "styles/mixin";
import styled from "styled-components";
import Image from "next/image";
interface IProps {
  profileUrl?: string;
  width?: string;
  height?: string;
}
const Profile = ({ profileUrl, width = "30px", height = "30px" }: IProps) => {
  return (
    <Wrapper centerVH width={width} height={height}>
      <Image
        src={profileUrl ? profileUrl : "/images/profile.png"}
        width={width}
        height={height}
      />
    </Wrapper>
  );
};
export default Profile;
const Wrapper = styled(MainCardWrapper)`
  border-radius: 50%;
  overflow: hidden;
`;
