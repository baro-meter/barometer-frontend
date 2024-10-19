import type { AppProps } from "next/app";
import "@/styles/base/_reset.scss";
import React, { useEffect, useMemo } from "react";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MutableSnapshot, RecoilRoot } from "recoil";
import { getCookies } from "cookies-next";
import { userState } from "@/recoils/user";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  const initializer = useMemo(
    () =>
      ({ set }: MutableSnapshot) => {
        const { accessToken, refreshToken, nickname, email } = getCookies();

        // TODO refresh token 만료 시 교체 로직 추가
        if (
          !!accessToken &&
          !!refreshToken &&
          !!nickname &&
          !!email &&
          typeof accessToken === "string" &&
          typeof refreshToken === "string" &&
          typeof nickname === "string" &&
          typeof email === "string"
        ) {
          set(userState, { accessToken, refreshToken, email, nickname });
        }
      },
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <RecoilRoot initializeState={initializer}>
          <Component {...pageProps} />
        </RecoilRoot>
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
