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
import { useAccessTokenValue, userState } from "@/recoils/user";
import httpClient from "@/services/httpClient";

// axios interceptor 전역 설정시 recoil 활용을 위해서 분리
function AxiosInterceptorInitializer() {
  // TODO 초기에는 무조건 로그인하는 로직 넣어야 함 (지금은 그냥 localStorage 데이터 있음 로그인됨 - 개발 편의성 위해)
  const accessToken = useAccessTokenValue();

  useEffect(() => {
    httpClient.initInterceptors(accessToken);
  }, [accessToken]);

  return null; // No UI needed for this component
}

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
          <AxiosInterceptorInitializer />
          <Component {...pageProps} />
        </RecoilRoot>
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
