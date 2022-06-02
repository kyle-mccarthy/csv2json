import Button from "@modules/core/components/Button";
import Card from "@modules/core/components/Card";
import Container from "@modules/core/components/Container";
import { styled } from "@modules/core/theme";
import { DownloadIcon } from "@radix-ui/react-icons";
import { useCallback } from "react";
import DataTable from "../components/DataTable";
import useDocument from "../hooks/useDocument";

const Header = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: 'center',
  width: '100%',
  mb: '$6'
});

const IconButton = styled(Button, {
  borderRadius: "$full",
  padding: 0,
  width: "2.25rem",
  height: "2.25rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "unset",
});

interface Props {
  id: string;
}

const PreviewDocument = ({ id }: Props) => {
  const { data, isLoading } = useDocument(id);

  const handleClick = useCallback(() => {
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/document/${id}/download`);
  }, [id]);

  return (
    <Container size="lg">
      <Card>
        <Header>
          <span>{data?.title}</span>
          <div>
            <IconButton type="button" onClick={handleClick} color="blue" title="Download JSON File">
              <DownloadIcon />
            </IconButton>
          </div>
        </Header>
        {!isLoading && data && <DataTable data={data.contents} />}
      </Card>
    </Container>
  );
};

export default PreviewDocument;
