import { DragEvent, ReactElement, useCallback, useState } from "react";
import { styled } from "@modules/core/theme";
import DropIcon from "../../icons/DropIcon";
import DropOrSelect from "./DropOrSelect";
import Upload from "./Upload";

const Zone = styled("div", {
  display: "flex",
  flexDirection: "column",
  borderRadius: "$sm",
  border: "dashed 2px $slate6",
  px: "$4",
  pt: "$10",
  pb: "$16",
});

const Row = styled("div", {
  display: "flex",
  mx: "auto",
  spaceX: "1",
  maxWidth: "75%",
  alignItems: "center",
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
  mb: "$14",
});

const FileInput = (): ReactElement => {
  const [dragOver, setOnDragOver] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((ev: DragEvent) => {
    ev.preventDefault();
    setOnDragOver(true);
  }, []);

  const handleSetFile = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) {
        setError(null);
        setOnDragOver(false);
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
    [setFile, setError, setOnDragOver]
  );

  const handleOnDrop = useCallback(
    (ev: DragEvent) => {
      ev.preventDefault();
      handleSetFile(ev.dataTransfer.files);
    },
    [handleSetFile]
  );

  return (
    <div onDragOver={handleDragOver} onDrop={handleOnDrop}>
      <Zone>
        <DropIndicator>
          <DropIcon
            width="2rem"
            height="2rem"
            variant={file ? "check" : dragOver ? "arrow" : "plus"}
          />
        </DropIndicator>
        {error && <ErrorText>{error}</ErrorText>}
        {!file && <DropOrSelect onSetFile={handleSetFile} />}
        {file && <Upload />}
      </Zone>
    </div>
  );
};

export default FileInput;
