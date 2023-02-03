import "@yourapp/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import ThemeProvider from "../theme";
import localFont from "@next/font/local";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useEffect, useState } from "react";
import { AuthProvider } from "@yourapp/Auth/AuthProvider";
import { AuthGuard } from "@yourapp/Auth/AuthGuard";
const segoeUI = localFont({
  src: "../public/font/Segoe fonts v1710/segoeui.ttf",
  preload: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  // useEffect(() => {
  //   setLoadingState(false);
  // }, []);
  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/instagram.ico" />
        <title>Insta clone</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider>
            <div className={segoeUI.className}>
              <AuthProvider>
                {pageProps.requireAuth ? (
                  <AuthGuard>
                    <Component {...pageProps} />
                  </AuthGuard>
                ) : (
                  <Component {...pageProps} />
                )}
              </AuthProvider>
            </div>
          </ThemeProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
