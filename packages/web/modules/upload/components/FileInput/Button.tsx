import { styled } from "@modules/core/theme";

const Button = styled("button", {
  border: "solid 1px $slate11",
  padding: "$3 $7",
  background: "transparent",
  fontSize: "$sm",
  mx: "auto",
  color: "$slate11",
  textTransform: "uppercase",
  borderRadius: "$sm",
  mb: "$6",
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export default Button;
