import { styled } from "@modules/core/theme";

const Button = styled("button", {
  padding: "$3 $7",
  fontSize: "$sm",
  mx: "auto",
  textTransform: "uppercase",
  borderRadius: "$sm",
  mb: "$6",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease-in-out",
  fontWeight: 500,
  tracking: "wide",
  variants: {
    color: {
      gray: {
        border: "solid 1px $slate11",
        background: "$slate3",
        color: "$slate11",
        "&:hover": {
          background: "$slate9",
          color: "$slate3",
        },
      },
      blue: {
        border: "solid 2px $indigo7",
        background: "$indigoA3",
        color: "$indigoA11",
        "&:hover": {
          color: "$indigoA12",
          background: "$indigo4",
          border: "solid 2px $indigo8",
        },
      },
      yellow: {
        border: "solid 2px $yellow7",
        background: "$yellow3",
        color: "$yellow11",
        "&:hover": {
          color: "$yellow12",
          background: "$yellow4",
          border: "solid 2px $yellow8",
        },
      },
      green: {
        border: "solid 2px $green7",
        background: "$green3",
        color: "$green11",
        "&:hover": {
          color: "$green12",
          background: "$green4",
          border: "solid 2px $green8",
        },
      },
    },
  },
  defaultVariants: {
    color: "gray",
  },
});

export default Button;
