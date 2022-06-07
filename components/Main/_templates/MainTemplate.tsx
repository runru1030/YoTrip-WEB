import AddIcon from "@mui/icons-material/Add";
import TripCard from "components/Main/_molecules/TripCard";
import Button from "components/_atoms/Button";
import Flex from "components/_atoms/Flex";
import Grid from "components/_atoms/Grid";
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { ITripInfo } from "modules/slices/tripCreationSlice";
import { selectUserInfoState } from "modules/slices/userSlice";
import wrapper from "modules/store";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { MainWrapper, ShadowRound } from "styles/mixin";
import { db } from "utils/firebase/app";
import BottomBar from "../../_templates/BottomBar";
import Header from "../../_templates/Header";
interface IProps {
  resultProps: any;
}
const MainTemplate: React.FC<IProps> = ({ resultProps }) => {
  useEffect(() => {
    console.log(resultProps);
  }, []);
  const router = useRouter();
  const { userInfo } = useSelector(selectUserInfoState);
  const [tripInfoList, setTripInfoList] = useState<any[]>(resultProps);

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
        <Flex dir="column" gap="10px" width="90%">
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
  max-height: calc(100vh - 50px - 94px);
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
