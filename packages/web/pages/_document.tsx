import { Html, Head, Main, NextScript } from "next/document";
import { getCssText, globalStyles } from "../modules/core/theme";

globalStyles();

export default function Document() {
  return (
    <Html>
      <Head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
