import { createStitches } from "@stitches/react";
import { slateDark, indigoDark, greenDark, redDark } from "@radix-ui/colors";

import space from "./space";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      ...slateDark,
      ...indigoDark,
      ...greenDark,
      ...redDark,
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    space,
    radii: {
      none: "0px",
      xs: "0.125rem",
      sm: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      full: "9999px",
    },
  },
  utils: {
    spaceX: (value: number | string) => ({
      ["&>:not([hidden])~:not([hidden])"]: {
        marginLeft: `calc(1rem * ${value})`,
      },
    }),
    py: (value: number | string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    px: (value: number | string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: (value: number | string) => ({ paddingTop: value }),
    pb: (value: number | string) => ({ paddingBottom: value }),
    mb: (value: number | string) => ({ marginBottom: value }),
    mt: (value: number | string) => ({ marginTop: value }),
    ml: (value: number | string) => ({ marginLeft: value }),
    mr: (value: number | string) => ({ marginRight: value }),
    my: (value: number | string) => ({ marginTop: value, marginBottom: value }),
    mx: (value: number | string) => ({ marginLeft: value, marginRight: value }),
    tracking: (value: Tracking) => ({ letterSpacing: trackingValues[value] }),
  },
});

const trackingValues = {
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
};

type Tracking = keyof typeof trackingValues;

export const globalStyles = globalCss({
  body: { fontFamily: "InterVariable", margin: 0, padding: 0 },
});
