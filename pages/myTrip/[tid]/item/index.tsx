import MyTripItemTemplate from "components/MyTrip/_templates/MyTripItemTemplate";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "lib/ironSessionConfig";
import {
  getMyTripInfo,
  getMyTripItemsInfo,
} from "modules/slices/myTripItemSlice";
import { ITripInfo } from "modules/slices/tripCreationSlice";
import { selectUserInfoState } from "modules/slices/userSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "utils/firebase/app";
import cookies from "next-cookies";
import wrapper from "modules/store";

export interface IItemProps {
  myTripInfo: ITripInfo;
  tripItems: {
    id: string;
    cost: number;
    title: string;
  }[];
}

const index = ({}) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(selectUserInfoState);
  const router = useRouter();
  const { tid } = router.query as { tid: string };
  useEffect(() => {
    // dispatch(getMyTripInfo({ uid: userInfo.uid, tid }));
    // dispatch(getMyTripItemsInfo({ uid: userInfo.uid, tid }));
  }, []);
  return <MyTripItemTemplate />;
};

export default index;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { uid } = cookies(ctx);
    const { tid } = ctx.query;
    if (uid && tid) {
      await store.dispatch(getMyTripInfo({ uid, tid: tid as string }));
      await store.dispatch(getMyTripItemsInfo({ uid, tid: tid as string }));
    }

    return {
      props: {},
    };
  }
);
