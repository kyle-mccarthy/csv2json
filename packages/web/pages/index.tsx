import type { NextPage } from "next";
import Head from "next/head";
import UploadScreen from "../modules/upload/screens/UploadScreen";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>CSV to JSON</title>
      </Head>
      <UploadScreen />
    </>
  );
};

export default Home;
