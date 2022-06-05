import { selectUserInfoState } from "modules/slices/userSlice";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "./Header";

interface IProps {
  children: React.ReactNode;
}
const PageLayout = ({ children }: IProps) => {
  const { isLoggedIn } = useSelector(selectUserInfoState);
  const { pathname } = useRouter();

  return (
    <Container>
      {/* {pathname === "404" && <React.Fragment>{children}</React.Fragment>} */}
      {isLoggedIn && pathname !== "/setInfo" ? (
        <React.Fragment>
          <Header />
          {children}
        </React.Fragment>
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </Container>
  );
};

export default PageLayout;

const Container = styled.div``;
