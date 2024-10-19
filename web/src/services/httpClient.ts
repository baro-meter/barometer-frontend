import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

import IHttpClient from "@/services/IHttpClient";

const isServer = typeof window === "undefined"; // 서버에서 실행되는지 확인

interface CredentialType {
  accessToken: string;
  refreshToken: string;
}

export class HttpClient implements IHttpClient {
  private static instance: HttpClient;
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      // 서버일 땐 직접 호출 필요
      baseURL: `${isServer ? process.env.API_URL : "/api"}`,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
      withCredentials: true,
      withXSRFToken: true,
    });
    this.initInterceptors();
  }

  public static getInstance() {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  public setCredentials({ accessToken, refreshToken }: CredentialType) {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // refresh token, access token 처리 필요한 경우 정의
        if (accessToken) {
          config.headers.Authorization = `${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  public initInterceptors(accessToken?: string) {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = accessToken;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        // 2xx 응답 트리거
        return response;
      },
      (error: AxiosError) => {
        // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
        // 응답 오류가 있는 작업 수행
        console.error(`error: ${error.code} - ${error.message}`);
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.get<T>(url, config).then(({ data }) => {
      return data;
    });
  }

  public async post<T>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any,
    config?: AxiosRequestConfig
  ): Promise<T | undefined> {
    const { data } = await this.axiosInstance.post<T>(url, payload, config);
    return data;
  }

  public async put<T>(
    url: string,
    payload?: any,
    config?: AxiosRequestConfig
  ): Promise<T | undefined> {
    const { data } = await this.axiosInstance.put<T>(url, payload, config);
    return data;
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T | undefined> {
    const { data } = await this.axiosInstance.delete<T>(url, config);
    return data;
  }

  public async patch<T>(
    url: string,
    payload?: any,
    config?: AxiosRequestConfig
  ): Promise<T | undefined> {
    const { data } = await this.axiosInstance.patch<T>(url, payload, config);
    return data;
  }
}

export default HttpClient.getInstance();

// SSR api 호출 시 cookie 값을 통해서 토큰 값을 가져와서 일일이 설정해야함
export const setHttpClientCredentials = (
  cookies: Partial<{ [key: string]: string }>
) => {
  const { refreshToken, accessToken } = cookies;
  // TODO 로그인 페이지로 리다이렉트
  if (!accessToken) {
    console.error("accessToken is not found!");
    return;
  }
  if (!refreshToken) {
    console.error("refreshToken is not found!");
    return;
  }
  HttpClient.getInstance().setCredentials({ refreshToken, accessToken });
};
