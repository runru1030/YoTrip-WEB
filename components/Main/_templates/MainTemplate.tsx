import AddIcon from "@mui/icons-material/Add";
import TripCard from "components/Main/_molecules/TripCard";
import Button from "components/_atoms/Button";
import Flex from "components/_atoms/Flex";
import { selectUserInfoState } from "modules/slices/userSlice";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { MainWrapper, ShadowRound } from "styles/mixin";
import BottomBar from "../../_templates/BottomBar";
interface IProps {
  myTrips: any;
}
const MainTemplate: React.FC<IProps> = ({ myTrips }) => {
  const router = useRouter();
  const { userInfo } = useSelector(selectUserInfoState);
  const [tripInfoList, setTripInfoList] = useState<any[]>(myTrips);

  const handleClickAdd = () => {
    router.push("/addTrip");
  };
  return (
    <>
      <MainScrollWrapper dir="column">
        {/* <Grid columnCount={2} gridGap="10px">
          {tripInfoList?.map((tripInfo: any) => (
            <TripCard tripInfo={tripInfo} key={tripInfo.id} />
          ))}
        </Grid> */}
        <Flex dir="column" gap="16px" width="90%">
          {tripInfoList?.map((tripInfo: any) => (
            <TripCard tripInfo={tripInfo} key={tripInfo.id} />
          ))}
        </Flex>
      </MainScrollWrapper>
      <BottomBar>
        <AddButton btnType="positive" onClick={handleClickAdd}>
          여행 추가하기 <AddIcon />
        </AddButton>
      </BottomBar>
    </>
  );
};

export default MainTemplate;
const MainScrollWrapper = styled(MainWrapper)`
  max-height: calc(100vh - 74px - 94px);
  margin-top: 24px;
  overflow: scroll;
`;
const AddButton = styled(Button)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  font-size: medium;
  padding: 15px 15px;
  ${ShadowRound({ color: "#FFFFFF10" })}
  font-weight:bold;
`;
