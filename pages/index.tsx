import MainTemplate from "components/Main/_templates/MainTemplate";
import Header from "components/_templates/Header";
import LoginTemplate from "components/_templates/LoginTemplate";
import { selectUserInfoState } from "modules/slices/userSlice";
import type { NextPage } from "next";
import { useSelector } from "react-redux";
const Home: NextPage = () => {
  return <LoginTemplate />;
};

export default Home;

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (ctx) => {
//     let isLoggedIn = false;
//     auth.onIdTokenChanged(async (user) => {
//       console.log(user, "ddddddddddddddd");
//     });

//     return {
//       props: { isLoggedIn },
//     };
//   }
// );
