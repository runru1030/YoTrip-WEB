import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Button from "components/_atoms/Button";
import {
  initCountryInfo,
  setStatus,
  T_TRIP_CREATE_STATUS,
} from "modules/slices/tripCreationSlice";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

interface IProps {
  type: "country" | "detail" | "date" | "confirm" | "back";
}
const CancelButton: React.FC<IProps> = ({ type }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const hancleCancel = (e: React.ChangeEvent) => {
    switch (type) {
      case "country":
        dispatch(setStatus("confirm"));
        break;
      case "detail":
        dispatch(setStatus("country"));
        dispatch(initCountryInfo());
        break;
      case "date":
        dispatch(setStatus("detail"));
        break;
      case "back":
        router.back();
        break;

      default:
        break;
    }
  };

  return (
    <BackButton btnType="unset" onClick={hancleCancel}>
      <KeyboardBackspaceIcon />
    </BackButton>
  );
};

export default CancelButton;
const BackButton = styled(Button)`
  svg {
    fill: ${({ theme }) => theme.colors.gray300};
  }
`;
