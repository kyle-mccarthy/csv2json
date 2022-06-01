import type { AppProps } from "next/app";
import { styled } from "../modules/core/theme";
import "@fontsource/inter/variable-full.css";

const Layout = styled('div', {
  minHeight: "100vh",
  minWidth: "100vw",
  background: '$slate2',
  color: '$slate12',
  display: "flex",
});

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout><Component {...pageProps} /></Layout>;
}

export default MyApp;
