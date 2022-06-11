import MainTemplate from "components/Main/_templates/MainTemplate";
import LoginTemplate from "components/_templates/LoginTemplate";
import { getMyTripList } from "lib/apis/trip";
import { ITripInfo } from "modules/slices/tripCreationSlice";
import { setLoggedIn } from "modules/slices/userSlice";
import wrapper from "modules/store";
import type { NextPage } from "next";
import cookies from "next-cookies";
import { firebaseAuth } from "utils/firebaseAdmin/app";
interface IProps {
  myTrips: ITripInfo[];
  isLoggedIn: boolean;
}

const Home: NextPage<IProps> = ({ myTrips, isLoggedIn }) => {
  return isLoggedIn ? <MainTemplate {...{ myTrips }} /> : <LoginTemplate />;
};

export default Home;
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { uid } = cookies(ctx);
    let myTrips: any = [];
    let isLoggedIn;
    if (uid) {
      await firebaseAuth.getUser(uid).then(() => {
        isLoggedIn = true;
        store.dispatch(setLoggedIn({}));
      });
      myTrips = await getMyTripList({ uid });
    }
    return {
      props: {
        myTrips: myTrips?.data,
        isLoggedIn,
      },
    };
  }
);
