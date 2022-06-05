import AddIcon from "@mui/icons-material/Add";
import TripCard from "components/Main/_molecules/TripCard";
import Button from "components/_atoms/Button";
import Grid from "components/_atoms/Grid";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { MainWrapper, ShadowRound } from "styles/mixin";
import BottomBar from "../../_templates/BottomBar";
import Header from "../../_templates/Header";

const MainTemplate = () => {
  const router = useRouter();
  const tripInfoList = [
    {
      id: 1,
      title: "캐나다 여행기",
      startDate: "22.02.02",
      endDate: "22.02.02",
      mateList: [1, 2, 3],
      cost: 30000,
    },
    {
      id: 2,
      title: "캐나다 여행기",
      startDate: "22.02.02",
      endDate: "22.02.02",
      mateList: [1, 2, 3],
      cost: 30000,
    },
    {
      id: 3,
      title: "캐나다 여행기",
      startDate: "22.02.02",
      endDate: "22.02.02",
      mateList: [1, 2, 3],
      cost: 30000,
    },
  ];
  const handleClickAdd = () => {
    router.push("/addTrip");
  };
  return (
    <>
      <Header />
      <MainScrollWrapper dir="column">
        <Grid columnCount={2} gridGap="10px">
          {tripInfoList.map((tripInfo) => (
            <TripCard {...{ tripInfo }} key={`trip-${tripInfo.title}`} />
          ))}
        </Grid>
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
