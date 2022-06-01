import { keyframes, styled } from "@modules/core/theme";
import { SymbolIcon } from "@radix-ui/react-icons";
import { useState, useCallback } from "react";
import Button from "./Button";

const spin = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});

const Loading = styled(SymbolIcon, {
  animation: `${spin} 1.5s linear infinite`,
});

const Upload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = useCallback(() => {
    setIsUploading(true);
  }, [setIsUploading]);

  return (
    <Button onClick={handleUpload} type="button">
      {isUploading ? <Loading /> : <span>Upload File</span>}
    </Button>
  );
};

export default Upload;
