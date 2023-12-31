import { AppProps } from "next/app";
import RootLayout from "../components/RootLayout";
import "../../public/globals.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="./fav.svg" type="image/svg+xml" />
        <title>
          {/* catchphrase to describe the website */}
          FlashPoll-Make and Share Polls
        </title>
      </Head>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
}
