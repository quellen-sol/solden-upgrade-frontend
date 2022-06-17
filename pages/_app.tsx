import "antd/dist/antd.css";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const t = 2;
  console.log(t);
  return <Component {...pageProps} />;
};

export default MyApp;
