import MyTripItemDetailTemplate from "components/MyTrip/_templates/MyTripItemDetailTemplate";
import {
  getMyTripInfo,
  getMyTripItemDetailInfo
} from "modules/slices/myTripItemSlice";
import wrapper from "modules/store";
import cookies from "next-cookies";
import React from "react";

interface IProps {}
const detail = ({}: IProps) => {
  return <MyTripItemDetailTemplate />;
};

export default detail;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { uid } = cookies(ctx);
    const { tid, id } = ctx.query;
    if (uid && tid) {
      await store.dispatch(getMyTripInfo({ uid, tid }));
      await store.dispatch(getMyTripItemDetailInfo({ uid, tid, itemid: id }));
    }

    return {
      props: {},
    };
  }
);
