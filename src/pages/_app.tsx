import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { wrapper } from "shb/store/store";
import apolloClient from "../components/apollo-client";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default wrapper.withRedux(App);
