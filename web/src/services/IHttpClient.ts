import type { AxiosRequestConfig } from "axios";

export default interface IHttpClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T | undefined>;
  put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T | undefined>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T | undefined>;
}
