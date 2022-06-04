import AddIcon from "@mui/icons-material/Add";
import Button from "components/_atoms/Button";
import React from "react";
import styled from "styled-components";
import { MainWrapper, ShadowRound } from "styles/mixin";
import BottomBar from "./BottomBar";

const AddTripTemplate = () => {
  return (
    <>
      <MainScrollWrapper dir="column"></MainScrollWrapper>
      <BottomBar>
        <AddButton btnType="positive">
          여행 추가하기 <AddIcon />
        </AddButton>
      </BottomBar>
    </>
  );
};

export default AddTripTemplate;
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
