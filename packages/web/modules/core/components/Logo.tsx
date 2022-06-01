import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";
import { styled } from "../theme";

const Text = styled("div", {
  fontWeight: 600,
  fontSize: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  spaceX: 1/3,
});

const Logo = (): ReactElement => {
  return (
    <Text>
      <span>CSV</span>
      <ArrowRightIcon height={20} width={20} />
      <span>JSON</span>
    </Text>
  );
};

export default Logo;
