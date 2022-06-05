import Button from "components/_atoms/Button";
import Flex from "components/_atoms/Flex";
import Input from "components/_atoms/Input";
import Span from "components/_atoms/Span";
import { doc, updateDoc } from "firebase/firestore";
import { selectUserInfoState } from "modules/slices/userSlice";
import { useRouter } from "next/router";
import LogoIcon from "public/images/logo_sm.svg";
import PeopleIcon from "public/images/people.svg";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { MainWrapper } from "styles/mixin";
import { db } from "utils/firebase/app";

const SetInfoTemplate = () => {
  const { userInfo } = useSelector(selectUserInfoState);
  const router = useRouter();
  const regex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/g;
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const handleChaneNickname = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setNickname(value);
    if (!regex.test(value)) {
      setError("2자 이상 16자 이하, 영어 또는 숫자 또는 한글");
    } else {
      setError("");
    }
  };
  const handleClickComplete = async () => {
    try {
      if (error !== "" || nickname === "") {
        throw new Error(error);
      }
      const userRef = doc(db, "User", userInfo.uid);
      await updateDoc(userRef, {
        nickname,
      }).then((res) => {
        router.push("/main");
      });
    } catch (error) {
      alert("닉네임 조건을 확인해주세요.");
    }
  };
  return (
    <MainWrapper dir="column">
      <LogoWrapper dir="column" hAlign gap="30px">
        <LogoIcon />
      </LogoWrapper>
      <Flex dir="column" width="90%" padding="20px 0" flex={1} spaceBetween>
        <Flex dir="column" gap="16px">
          <Span fontSize="md" bold>
            닉네임
          </Span>
          <Input
            placeholder="닉네임"
            borderRadius="12px"
            value={nickname}
            onChange={handleChaneNickname}
            isValid={error === ""}
          ></Input>
          <Span textColor="negative" fontSize="sm" fontWeight="thin">
            {error}
          </Span>
        </Flex>
        <SvgWrapper>
          <PeopleIcon />
        </SvgWrapper>
        <Flex width="100%">
          <Span
            width="90%"
            textAlign="right"
            fontWeight="thin"
            textColor="gray300"
          >
            트립을 같이 공유할 메이트를 찾기 위해 <br /> 닉네임이 사용됩니다.
            <br />
            <br /> 요트립으로 알찬 여행되세요.
          </Span>
        </Flex>
        <Button
          width="100%"
          borderRadius="12px"
          padding="16px"
          onClick={handleClickComplete}
        >
          확인
        </Button>
      </Flex>
    </MainWrapper>
  );
};

export default SetInfoTemplate;
const LogoWrapper = styled(Flex)`
  opacity: 80%;
  padding: 50px;
  svg {
    transform: scale(1.5);
  }
`;
const SvgWrapper = styled(Flex)`
  position: relative;
  height: 200px;
  svg {
    overflow: visible;
    transform-origin: 0 0;
    transform: scale(0.4);
  }
`;
