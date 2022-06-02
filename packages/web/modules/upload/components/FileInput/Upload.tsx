import { keyframes, styled } from "@modules/core/theme";
import { SymbolIcon } from "@radix-ui/react-icons";
import { ComponentProps } from "react";
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

interface OurProps {
  uploading?: boolean;
}

type TheirProps = Omit<ComponentProps<typeof Button>, "type" | "children" | "color">;

type Props = OurProps & TheirProps;

const Upload = ({ uploading, ...rest }: Props) => {
  return (
    <Button {...rest} type="button" color="green">
      {uploading ? <Loading /> : <span>Upload</span>}
    </Button>
  );
};

export default Upload;
