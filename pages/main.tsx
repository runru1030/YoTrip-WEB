import MainTemplate from "components/Main/_templates/MainTemplate";
import { collection, getDocs } from "firebase/firestore";
import { ITripInfo } from "modules/slices/tripCreationSlice";
import wrapper from "modules/store";
import cookies from "next-cookies";
import React from "react";
import { db } from "utils/firebase/app";
import { jsonConverter } from "utils/function";
interface IProps {
  myTrips: ITripInfo[];
}

const index = ({ myTrips }: IProps) => {
  return <MainTemplate {...{ myTrips }} />;
};

export default index;
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { uid } = cookies(ctx);
    let myTrips: any[] = [];
    if (uid) {
      await getDocs(collection(db, "Trip", uid, "myTripInfo")).then((res) => {
        myTrips = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      });
    }

    return {
      props: {
        myTrips: jsonConverter(myTrips),
      },
    };
  }
);
