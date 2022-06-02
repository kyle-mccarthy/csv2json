import type { AppProps } from "next/app";
import { styled } from "../modules/core/theme";
import "@fontsource/inter/variable.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

const Layout = styled("div", {
  minHeight: "100vh",
  width: "100%",
  maxWidth: "100vw",
  background: "$slate2",
  color: "$slate12",
  display: "flex",
});

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
