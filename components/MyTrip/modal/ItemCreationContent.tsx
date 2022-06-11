import Button from "components/_atoms/Button";
import Flex from "components/_atoms/Flex";
import Input from "components/_atoms/Input";
import Span from "components/_atoms/Span";
import { addDoc, collection } from "firebase/firestore";
import { selectUserInfoState } from "modules/slices/userSlice";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "utils/firebase/app";

const ItemCreationContent = ({}) => {
  const router = useRouter();
  const [item, setItem] = useState("");
  const { tid } = router.query as { tid: string };
  const { userInfo } = useSelector(selectUserInfoState);

  const handleChangeInput = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setItem(value);
  };
  const handleCreateItem = async () => {
    try {
      await addDoc(
        collection(db, "Trip", userInfo.uid, "myTripInfo", tid, "tripItems"),
        { title: item, cost: 0 }
      ).then(() => router.reload());
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Flex dir="column" gap="24px" padding="16px" width="100%">
      <Span bold fontSize="md">
        비용 항목 추가
      </Span>
      <Input
        type="text"
        inputType="primaryDark"
        placeholder="항목 이름"
        borderRadius="12px"
        value={item}
        onChange={handleChangeInput}
      ></Input>
      <Button padding="16px" borderRadius="12px" onClick={handleCreateItem}>
        추가
      </Button>
    </Flex>
  );
};

export default ItemCreationContent;
