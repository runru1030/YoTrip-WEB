import PageLayout from "components/_templates/PageLayout";
import { AuthProvider } from "modules/AuthProvider";
import wrapper from "modules/store";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/GlobalStyles";
import { theme } from "styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <title>요트립</title>
        </Head>
        <GlobalStyle />
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default wrapper.withRedux(MyApp);
