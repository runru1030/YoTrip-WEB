import React from "react";
import styled, { css, T_BUTTON_TYPE_SCHEME } from "styled-components";

export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick?: (params: any) => void;
  disabled?: boolean;
  focused?: boolean;
  borderRadius?: string;
  btnType?: T_BUTTON_TYPE_SCHEME;
  id?: string;
  width?: string;
  height?: string;
  padding?: string;
  type?: "button" | "reset" | "submit";
}

const Button: React.FC<IButtonProps> = ({
  children,
  disabled = false,
  borderRadius,
  focused = false,
  btnType = "primary",
  id,
  width,
  height,
  padding = "0.5rem 1rem",
  type = "button",
  ...restProps
}) => {
  return (
    <StyledButton
      {...{
        type,
        btnType,
        focused,
        borderRadius,
        disabled,
        id,
        width,
        height,
        padding,
      }}
      {...restProps}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<IButtonProps>`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  color: ${(props) => props.theme.btnType[props.btnType!].color};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.theme.btnType[props.btnType!].bgColor};
  border: unset;
  transition: 0.2s;
  ${(props) =>
    props.borderRadius &&
    css`
      border-radius: ${props.borderRadius};
    `}

  &:disabled {
    & * {
      cursor: not-allowed;
    }
    pointer-events: all !important;

    filter: opacity(50%) brightness(90%);
  }

  &,
  & > svg {
    transition: 0.6s;
  }

  ${({ theme, btnType, focused }) =>
    !focused &&
    css`
      &:hover {
        ${theme.btnType[btnType!].hoverColor
          ? css`
              color: ${theme.btnType[btnType!].hoverColor};
              background-color: ${theme.btnType[btnType!].hoverBgColor};
              & svg {
                color: ${theme.btnType[btnType!].hoverColor};
              }
            `
          : css`
              filter: brightness(85%);
            `}
      }
    `}
  &:active {
    ${({ theme, btnType }) =>
      theme.btnType[btnType!].focusedColor
        ? css`
            color: ${theme.btnType[btnType!].focusedColor};
            background-color: ${theme.btnType[btnType!].focusedBgColor};
            & svg {
              color: ${theme.btnType[btnType!].focusedColor};
            }
          `
        : css`
            filter: brightness(1.2);
          `}
  }
`;
