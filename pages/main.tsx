import LoginTemplate from "components/_templates/LoginTemplate";
import MainTemplate from "components/Main/_templates/MainTemplate";
import React from "react";
import wrapper from "modules/store";
import { collection, doc, getDocs, query } from "firebase/firestore";
import { db } from "utils/firebase/app";
import { ironOptions } from "lib/ironSessionConfig";
import { withIronSessionSsr } from "iron-session/next";

interface IProps {
  resultProps: any;
}

const index = ({ resultProps }: IProps) => {
  return <MainTemplate {...{ resultProps }} />;
};

export default index;
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = (req.session as any).token;
    let resultProps: any[] = [];
    await getDocs(collection(db, "Trip", user, "myTripInfo")).then((res) => {
      resultProps = res.docs.map((doc) => doc.data());
    });

    return {
      props: {
        resultProps: JSON.parse(JSON.stringify(resultProps)),
      },
    };
  },
  ironOptions
);
