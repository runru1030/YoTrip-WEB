import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import CloseIcon from "@mui/icons-material/Close";
import Button from "components/_atoms/Button";
import { MainCardWrapper, ShadowRound } from "styles/mixin";

interface IStyleProps {
  bgColor?: string;
  isVisible?: boolean;
  alignStyle?: {
    justifyContent?: string;
    alignItems?: string;
    padding?: string;
  };
  width?: string;
  maxWidth?: string;
}
interface IProps extends IStyleProps {
  isModalOpen: boolean;
  closeModal?: any;
  padding?: string;
  children: React.ReactNode;
  isWithClosedButton?: boolean;
}

const PortalModal: React.FC<IProps> = ({
  bgColor = "#00000030",
  alignStyle = { justifyContent: "center", alignItems: "center" },
  isModalOpen,
  children,
  closeModal,
  padding = "1rem 2rem 8px 2rem",
  width = "100%",
  maxWidth = "100%",
  isWithClosedButton = false,
}) => {
  if (!isModalOpen) return <></>;
  const modalRoot = document.querySelector("#modal-root");
  return createPortal(
    <BackGround {...{ bgColor }}>
      <Align {...{ alignStyle }} data-type="modal-bg" id="#modal-content">
        <MainCardWrapper
          shadow
          id="modal-content"
          {...{ padding, width, maxWidth }}
          pos="absolute"
        >
          {isWithClosedButton && (
            <CloseButton btnType="unset" onClick={closeModal}>
              <CloseIcon />
            </CloseButton>
          )}
          {children}
        </MainCardWrapper>
      </Align>
    </BackGround>,
    modalRoot!
  );
};

export default PortalModal;

const CloseButton = styled(Button)`
  position: absolute;
  right: 0;
  top: 8px;
  svg {
    opacity: 0.5;
  }
`;
const BackGround = styled.div<IStyleProps>`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.bgColor};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  animation: fadeIn 0.6s;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Align = styled.div<IStyleProps>`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: ${(props) => props.alignStyle?.justifyContent};
  align-items: ${(props) => props.alignStyle?.alignItems};
  padding: ${(props) => props.alignStyle?.padding && props.alignStyle?.padding};
`;
