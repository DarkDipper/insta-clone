import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import useLoading from "../hooks/useLoading";
export default function App({ Component, pageProps }: AppProps) {
  const loading:boolean = useLoading();
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/instagram.ico" />
        <title>Insta clone</title>
      </Head>
			<Component {...pageProps} />
    </>
  );
}
