import { UploadedDocument } from "@modules/core/types";
import { useQuery, UseQueryResult } from "react-query";

const useDocument = (id: string): UseQueryResult<UploadedDocument> => {
  return useQuery(["document", id], async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/document/${id}`
    );
    return response.json();
  });
};

export default useDocument;
