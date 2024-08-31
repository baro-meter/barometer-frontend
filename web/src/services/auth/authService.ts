import httpClient from "@/services/httpClient";
import { LoginUserType, UserTokenType } from "@/types/authType";

export const join = (user: LoginUserType) => {
  const url = `/join/email/${user.email}`;
  return httpClient.post(url, user);
};

export const auth = (_: { user: LoginUserType; authCode: string }) => {
  const url = `/join/email/${_.user.email}/auth?authCode=${_.authCode}`;
  return httpClient.post(url, _.user);
};

export const login = (user: LoginUserType) => {
  const url = `/login/email/${user.email}`;
  return httpClient.post<UserTokenType>(url, { password: user.password });
};
