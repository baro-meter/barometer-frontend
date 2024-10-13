import type { AppProps } from "next/app";
import "@/styles/base/_reset.scss";
import React, { useEffect } from "react";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RecoilRoot, useRecoilValue } from "recoil";
import { useAccessTokenValue } from "@/recoils/user";
import httpClient from "@/services/httpClient";

// axios interceptor 전역 설정시 recoil 활용을 위해서 분리
function AxiosInterceptorInitializer() {
  // TODO 초기에는 무조건 로그인하는 로직 넣어야 함 (지금은 그냥 localStorage 데이터 있음 로그인됨 - 개발 편의성 위해)
  const accessToken = useAccessTokenValue();

  useEffect(() => {
    console.log("init!!!!");
    console.log(accessToken);
    httpClient.initInterceptors(accessToken);
  }, [accessToken]);

  return null; // No UI needed for this component
}

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <RecoilRoot>
          <AxiosInterceptorInitializer />
          <Component {...pageProps} />
        </RecoilRoot>
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
