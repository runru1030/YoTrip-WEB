import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import styled, { css, T_COLOR_SCHEME } from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useModal from "hooks/useModal";
import Span from "components/_atoms/Span";
import Flex from "components/_atoms/Flex";
import { ShadowRound } from "styles/mixin";
interface IProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  value?: string;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  defaultOption?: string;
  onSelect: (props: any) => void;
  defaultValue?: any;
  dataType?: string;
  width?: string;
}

const Select: React.FC<IProps> = ({
  id,
  children,
  value,
  setValue,
  className,
  onSelect,
  dataType,
  width,
}) => {
  const {
    isModalOpen: isFocus,
    openModal,
    closeModal,
  } = useModal({
    blockScroll: false,
  });

  const handleFocusSelect = (e: any) => {
    openModal();
  };
  const handleClickOption = (e: React.MouseEvent) => {
    const { id } = e.currentTarget;
    (e.target as any).value = id;
    onSelect(e);
    setValue(e.currentTarget.id);
    closeModal();
  };
  return (
    <Wrapper dir="column" {...{ isFocus, width }}>
      <SelectBox
        {...{ isFocus, className, onSelect, id, value }}
        onClick={handleFocusSelect}
      >
        {children}
      </SelectBox>
      <KeyboardArrowDownIcon />
      <SelectWrapper>
        {isFocus && (
          <OptionList dir="column" id="modal-content">
            {React.Children.map(children, (child, index) => {
              const childComponent = child as React.ReactElement;
              return (
                <Option
                  id={childComponent.props.value}
                  key={childComponent.props.value}
                  data-type={dataType}
                  onClick={handleClickOption}
                >
                  {childComponent.props.children}
                </Option>
              );
            })}
          </OptionList>
        )}
      </SelectWrapper>
    </Wrapper>
  );
};

export default Select;
const Wrapper = styled(Flex)<{ isFocus: boolean }>`
  position: relative;
  svg {
    position: absolute;
    right: 0;
    transform: translate(-50%, 50%);
  }
  ${({ isFocus }) =>
    isFocus &&
    css`
      svg {
        transform: translate(-50%, 50%) rotate(180deg);
      }
    `}
`;
const SelectBox = styled.select`
  width: 100%;
  transition: 0.6s;
  option {
    display: none;
  }
  & svg {
    transition: 0.6s;
  }
  &:focus {
    outline: none;
    border: solid 1px ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary};
  }
  background-color: ${({ theme }) => theme.colors.gray200};
  padding: 16px;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  -webkit-appearance: none;
`;

const OptionList = styled(Flex)<{ borderRadius?: string }>`
  animation: fadeIn 0.6s;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  transition: 0.6s;
  max-height: 300px;
  overflow: scroll;
  background-color: ${({ theme }) => theme.colors.gray200};
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 99;
  ${ShadowRound({})}
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const Option = styled(Span)`
  padding: 8px;
  font-weight: lighter;
`;
const SelectWrapper = styled(Flex)`
  align-items: center;
  position: relative;
`;
