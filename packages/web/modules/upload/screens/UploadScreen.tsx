import { ReactElement } from "react";
import Logo from "@modules/core/components/Logo";
import { styled } from "@modules/core/theme";
import FileInput from "../components/FileInput";

const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
});

const Card = styled("div", {
  maxWidth: "30rem",
  width: "100%",
  background: "$slate3",
  display: "flex",
  flexGrow: 1,
  padding: "$6 $4",
  borderRadius: "$sm",
  flexDirection: "column",
});

const Header = styled("div", {
  display: "flex",
  justifyContent: "center",
  mb: "$4",
});

const UploadScreen = (): ReactElement => {
  return (
    <Container>
      <Card>
        <Header>
          <Logo />
        </Header>
        <FileInput />
      </Card>
    </Container>
  );
};

export default UploadScreen;
