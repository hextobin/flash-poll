import { AppProps } from "next/app";
import RootLayout from "../components/RootLayout";
import "../public/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}
