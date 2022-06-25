import CurrencyCalculator from "components/Calculate/_templates/CurrencyCalculator";
import { ITripInfo } from "modules/slices/tripCreationSlice";
import React from "react";

export interface IItemProps {
  myTripInfo: ITripInfo;
  tripItems: {
    id: string;
    cost: number;
    title: string;
  }[];
}

const calculate = ({}) => {
  return <CurrencyCalculator />;
};

export default calculate;

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (ctx) => {
//     const { uid } = cookies(ctx);
//     const { tid } = ctx.query;
//     if (uid && tid) {
//       await firebaseAuth.getUser(uid).then(() => {
//         store.dispatch(setLoggedIn({ uid }));
//       });
//       await store.dispatch(getMyTripInfo({ uid, tid: tid as string }));
//       await store.dispatch(getMyTripItemsInfo({ uid, tid: tid as string }));
//     }

//     return {
//       props: {},
//     };
//   }
// );
