import React from "react";
import styled from "styled-components";
import LogoIcon from "public/images/logo_sm.svg";
import { useRouter } from "next/router";
import Link from "next/link";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
const Header = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <Head>
      <LogoIcon onClick={handleClick} />
      {router.pathname !== "/calculate" && (
        <Link href="/calculate">
          <a>
            <CurrencyExchangeOutlinedIcon />
          </a>
        </Link>
      )}
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
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.gray0};
  position: sticky;
  top: 0;
  z-index: 99;
  a {
    display: flex;
    align-items: center;
  }
`;
