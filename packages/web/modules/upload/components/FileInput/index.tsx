import { ReactElement, useCallback, useState } from "react";
import { styled } from "@modules/core/theme";
import DropIcon, { Variant } from "../../icons/DropIcon";
import DropOrSelect from "./DropOrSelect";
import Upload from "./Upload";
import useDragAndDrop from "@modules/upload/hooks/useDragAndDrop";
import Button from "./Button";
import Preview from "./Preview";
import { useRouter } from "next/router";
import { UploadedDocument } from "@modules/core/types";

const Zone = styled("div", {
  display: "flex",
  flexDirection: "column",
  borderRadius: "$sm",
  border: "dashed 2px $slate6",
  px: "$4",
  pt: "$10",
  pb: "$16",
});

const FileControls = styled("div", {
  display: "flex",
  mx: "auto",
  spaceY: "2",
  maxWidth: "75%",
  width: "100%",
  flexDirection: "column",
});

const Row = styled("div", {
  display: "flex",
  mx: "auto",
  justifyItems: "space-between",
  width: "100%",
});

const ErrorText = styled(Row, {
  color: "$red10",
  mt: "-$8",
  mb: "$6",
  fontSize: "$sm",
});

const DropIndicator = styled("div", {
  borderRadius: "$full",
  width: "4rem",
  height: "4rem",
  background: "$indigo7",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  mx: "auto",
  mb: "$8",
});

const iconVariant = (isDragging: boolean, file: File | null): Variant => {
  if (isDragging) {
    return "arrow";
  }
  return file ? "check" : "plus";
};

const FileInput = (): ReactElement => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { push } = useRouter();

  const handleSetFile = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) {
        setError(null);
        setFile(null);
        return;
      }

      const files = Array.from(fileList);
      const nextFile = files.filter((f) => f.type === "text/csv")[0];

      if (!nextFile) {
        setError("Invalid file selected. The file must be a CSV.");
        return;
      }

      setFile(nextFile);
      setError(null);
    },
    [setFile, setError]
  );

  const handleCancel = useCallback(() => {
    setFile(null);
  }, [setFile]);

  const { isDragging, ...eventHandlers } = useDragAndDrop(handleSetFile);

  const handleUpload = useCallback(() => {
    if (file === null) {
      return;
    }

    setIsUploading(true);

    const upload = async () => {
      const buffer = await file.arrayBuffer();
      const formData = new FormData();
      formData.append("file", new Blob([buffer]), file.name);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transform/csv-to-json`,
        {
          method: "POST",
          mode: "cors",
          body: formData,
        }
      );

      const body = (await res.json()) as UploadedDocument;

      push(`/document/${body.id}`);
    };

    upload()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setIsUploading, file, push]);

  return (
    <div {...eventHandlers}>
      <Zone>
        <DropIndicator>
          <DropIcon
            width="2rem"
            height="2rem"
            variant={iconVariant(isDragging, file)}
          />
        </DropIndicator>
        {error && <ErrorText>{error}</ErrorText>}
        {!file && <DropOrSelect onSetFile={handleSetFile} />}
        {file && (
          <FileControls>
            <Preview file={file} />
            <Row>
              {!isUploading && (
                <Button type="button" color="yellow" onClick={handleCancel}>
                  cancel
                </Button>
              )}
              <Upload
                onClick={handleUpload}
                uploading={isUploading}
                disabled={isUploading}
              />
            </Row>
          </FileControls>
        )}
      </Zone>
    </div>
  );
};

export default FileInput;
