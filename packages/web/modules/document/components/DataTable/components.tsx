import { styled } from "@modules/core/theme";

export const Table = styled("table", {
  width: '100%'
});

export const Tr = styled("tr", {});

export const Th = styled("th", {
  textAlign: "left",
  px: "$4",
  pb: "$2",
  textTransform: "uppercase",
  fontSize: '$lg',
  color: '$indigo11',
  fontWeight: 500,
  tracking: 'wider',
  '&:first-letter': {
    fontSize: '105%'
  }
});

export const Td = styled("td", {
  px: "$4",
  py: "$1",
});

export const Thead = styled("thead", {
  [`${Tr} > ${Th}`]: {
    borderBottom: "solid 1px $slate11",
  },
});

export const Tbody = styled("tbody", {
  [`${Tr}:first-of-type > ${Td}`]: {
    pt: '$3'
  }
});
