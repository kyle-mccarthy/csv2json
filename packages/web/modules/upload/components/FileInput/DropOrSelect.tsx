import { styled } from "@modules/core/theme";
import { ChangeEvent, useCallback, useRef } from "react";
import Button from "./Button";

const Container = styled("div", {
  mx: "auto",
  maxWidth: "75%",
});

const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const Directions = styled("div", {
  fontSize: "$xs",
  color: "$slate11",
  tracking: "wide",
});

const Text = styled("div", {
  color: "$slate11",
  fontWeight: "500",
  textTransform: "uppercase",
  mx: "auto",
});

const Row = styled("div", {
  display: "flex",
  spaceX: "1",
  alignItems: "center",
  justifyContent: "center",
});

const Or = styled("div", {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  my: "$6",
  "&::before": {
    content: " ",
    position: "absolute",
    width: "50%",
    height: "1px",
    background: "$slate7",
    inset: "auto",
    top: "50%",
    bottom: "50%",
    zIndex: 0,
  },
  "& > span": {
    position: "relative",
    background: "$slate3",
    fontSize: "$xs",
    color: "$slate11",
    px: "$3",
    textTransform: "uppercase",
  },
});

const Input = styled("input", {
  display: "none",
});

interface Props {
  onSetFile: (files: FileList | null) => void;
}

const DropOrSelect = ({ onSetFile }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onSetValue = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      onSetFile(ev.target.files);
    },
    [onSetFile]
  );

  return (
    <Container>
      <Content>
        <Text>Drop File Here</Text>
        <div>
          <Or>
            <span>or</span>
          </Or>
        </div>
        <Button type="button" onClick={handleClick}>
          select file
        </Button>
        <Input ref={inputRef} type="file" onChange={onSetValue} />
      </Content>
      <Row>
        <Directions>
          The file must be a CSV and have a file size less than 25mb.
        </Directions>
      </Row>
    </Container>
  );
};

export default DropOrSelect;
