import { styled } from "@modules/core/theme";
import filesize from "filesize";
import { useMemo } from "react";

interface Props {
  file: File;
}

const Container = styled("div", {
  maxWidth: "80%",
  mx: "auto",
  my: "$3",
});

const VertAlign = styled("div", {
  display: "flex",
  alignItems: "center",
});

const Key = styled(VertAlign, {
  color: "$slate11",
  textTransform: "uppercase",
  fontSize: "$sm",
  display: "flex",
  alignItems: "center",
});

const Value = styled(VertAlign, {
  color: "$slate12",
  fontSize: "$base",
});

const Grid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  rowGap: "$3",
  columnGap: "$2",
});

const Preview = ({ file }: Props) => {
  const size = useMemo(() => filesize(file.size), [file]);

  return (
    <Container>
      <Grid>
        <Key>name</Key>
        <Value>{file.name}</Value>

        <Key>type</Key>
        <Value>{file.type}</Value>

        <Key>size</Key>
        <Value>{size}</Value>
      </Grid>
    </Container>
  );
};

export default Preview;
