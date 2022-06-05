import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Button from "components/_atoms/Button";
import {
  initCountryInfo,
  setStatus,
  T_TRIP_CREATE_STATUS,
} from "modules/slices/tripCreationSlice";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

interface IProps {
  type: T_TRIP_CREATE_STATUS;
}
const CancelButton: React.FC<IProps> = ({ type }) => {
  const dispatch = useDispatch();
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
