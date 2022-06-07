import MyTripItemTemplate from "components/MyTrip/_templates/MyTripItemTemplate";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "lib/ironSessionConfig";
import { ITripInfo } from "modules/slices/tripCreationSlice";
import { useRouter } from "next/router";
import React from "react";
import { db } from "utils/firebase/app";

export interface IItemProps {
  myTripInfo: ITripInfo;
  tripItems: {
    id: string;
    cost: number;
    title: string;
  }[];
}

const index = ({ myTripInfo, tripItems }: IItemProps) => {
  return <MyTripItemTemplate {...{ myTripInfo, tripItems }} />;
};

export default index;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, params }) {
    const user = (req.session as any).token;
    const { tid }: any = params;

    let myTripInfo;
    let tripItems;
    await getDoc(doc(db, "Trip", user, "myTripInfo", tid)).then((res) => {
      myTripInfo = res.data();
    });
    await getDocs(
      collection(db, "Trip", user, "myTripInfo", tid, "tripItems")
    ).then((res) => {
      tripItems = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });

    return {
      props: {
        myTripInfo: JSON.parse(JSON.stringify(myTripInfo)),
        tripItems: JSON.parse(JSON.stringify(tripItems)),
      },
    };
  },
  ironOptions
);
