import React from "react";
import styled from "styled-components";
import LogoIcon from "public/images/logo_sm.svg";
import { useRouter } from "next/router";
const Header = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/main");
  };
  return (
    <Head>
      <LogoIcon onClick={handleClick} />
    </Head>
  );
};

export default Header;
const Head = styled.header`
  width: 100%;
  height: 50px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray0};
  position: sticky;
  top: 0;
  z-index: 99;
`;
