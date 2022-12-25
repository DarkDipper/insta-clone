import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import ThemeProvider from "../theme";
import { AuthProvider } from "../Auth/AuthProvider";
import { AuthGuard } from "../Auth/AuthGuard";
import Loading from "../components/Loading";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/instagram.ico" />
        <title>Insta clone</title>
      </Head>
      <ThemeProvider>
        <AuthProvider>
          {pageProps.requireAuth ? (
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          ) : (
            <Component {...pageProps} />
          )}
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
