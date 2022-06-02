import { styled } from "../theme";

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mx: "auto",
  my: "$6",
  variants: {
    size: {
      sm: {
        width: "100%",
        maxWidth: "30rem",
      },
      lg: {
        width: "min-content",
        minWidth: "30rem",
        maxWidth: "75%",
      },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export default Container;
