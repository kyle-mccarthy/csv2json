import PreviewDocument from "@modules/document/screens/PreviewDocument";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

interface Props {
  id: string;
}

const ViewDocumentPage: NextPage<Props> = ({ id }) => {
  return (
    <>
      <Head>
        <title>CSV to JSON</title>
      </Head>
      <PreviewDocument id={id} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const getId = (
    obj: Record<string, string | string[] | undefined>
  ): string => {
    const id = obj.id;
    if (id === undefined) {
      throw new Error("An unrecorverable error occurred");
    }

    return Array.isArray(id) ? id[0] : id;
  };

  return {
    props: {
      id: getId(ctx.query),
    },
  };
};

export default ViewDocumentPage;
