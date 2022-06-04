import React from "react";
import styled, { css, T_INPUT_TYPE_SCHEME } from "styled-components";

interface IStyleProps extends React.HTMLAttributes<HTMLInputElement> {
  width?: any;
  height?: string;
  minWidth?: any;
  maxWidth?: any;
  borderRadius?: string;
  borderColor?: string;
  isValid?: boolean;
}

export interface IInputProps extends IStyleProps {
  children?: React.ReactNode | string;
  type?: string;
  className?: string;
  onKeyDown?: (param: any) => void;
  onChange?: (param: any) => void;
  checked?: boolean;
  autoFocus?: any;
  value?: any;
  pattern?: string;
  disabled?: boolean;
  maxLength?: number;
  accept?: string;
  step?: number;
  min?: number;
  max?: number;
  autoComplete?: string;
  inputType?: T_INPUT_TYPE_SCHEME;
  isBorder?: boolean;
}

const Input = ({
  inputType = "primary",
  borderRadius,
  width = "",
  height = "",
  accept,
  maxLength,
  isValid,
  step,
  min,
  max,
  autoComplete = "on",
  isBorder = false,
  ...resParams
}: IInputProps) => {
  return (
    <StyledInput
      className={isValid ? "valid" : "error"}
      {...{
        inputType,
        accept,
        borderRadius,
        maxLength,
        step,
        min,
        max,
        autoComplete,
        isBorder,
      }}
      {...resParams}
    ></StyledInput>
  );
};

export default Input;

const StyledInput = styled.input<IInputProps>`
  border-radius: ${({ borderRadius }) => borderRadius};
  min-width: ${({ minWidth }) => minWidth};
  max-width: ${({ maxWidth }) => maxWidth};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  color: ${({ theme, inputType }) => theme.inputType[inputType!].color};
  background-color: ${({ theme, inputType }) =>
    theme.inputType[inputType!].bgColor};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_200};
    opacity: 0.5;
  }
  ${({ isBorder, theme, inputType }) =>
    isBorder &&
    css`
      border: 1px solid ${theme.inputType[inputType!].borderColor};
    `}
  padding: 7px;

  &.error {
    color: ${({ theme }) => theme.colors.negative};
    background-color: ${({ theme }) => theme.colors.errorBg};
    border-color: ${({ theme }) => theme.colors.errorBorder};
  }
  &.valid {
    border-color: ${({ theme }) => theme.colors.primaryRegular_400};
    color: ${({ theme }) => theme.colors.primaryRegular_400};
  }
  &:disabled {
    cursor: not-allowed;
  }

  &[type="submit"] {
    cursor: pointer;
  }

  padding: 8px 16px;
`;
