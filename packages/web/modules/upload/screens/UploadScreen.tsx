import { ReactElement } from "react";
import FileInput from "../components/FileInput";
import Container from "@modules/core/components/Container";
import Card from "@modules/core/components/Card";

const UploadScreen = (): ReactElement => {
  return (
    <Container>
      <Card>
        <FileInput />
      </Card>
    </Container>
  );
};

export default UploadScreen;
