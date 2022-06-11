import MyTripItemCreateTemplate from "components/MyTrip/_templates/MyTripItemCreateTemplate";
import {
  getMyTripInfo,
  getMyTripItemDetailInfo,
} from "modules/slices/myTripItemSlice";
import { setLoggedIn } from "modules/slices/userSlice";
import wrapper from "modules/store";
import cookies from "next-cookies";
import React from "react";
import { firebaseAuth } from "utils/firebaseAdmin/app";

interface IProps {}

const create = ({}: IProps) => {
  return <MyTripItemCreateTemplate />;
};

export default create;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { uid } = cookies(ctx);
    const { tid, id } = ctx.query;
    if (uid && tid) {
      await firebaseAuth.getUser(uid).then(() => {
        store.dispatch(setLoggedIn({}));
      });
      await store.dispatch(getMyTripInfo({ uid, tid }));
      await store.dispatch(getMyTripItemDetailInfo({ uid, tid, itemId: id }));
    }

    return {
      props: {},
    };
  }
);
