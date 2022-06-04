import Flex from "components/_atoms/Flex";
import styled, { css } from "styled-components";

export const MainWrapper = styled.main`
  width: 100%;
  height: 100vh;
`;

export const MainCardWrapper = styled(Flex)<{ shadow?: boolean }>`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray200};
  ${({ shadow }) => shadow && ShadowRound({})}
`;
export const ShadowRound = ({
  x = "0px",
  y = "0px",
  blurRadius = "10px",
  spread = "0px",
  color = "#00000010",
  borderRadius = "8px",
}) => css`
  box-shadow: ${x} ${y} ${blurRadius} ${spread} ${color};
  border-radius: ${borderRadius};
`;

export const FadeInAnimation = (fadeIn: boolean) => css`
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
