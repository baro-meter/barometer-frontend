import httpClient from "@/services/httpClient";
import { UserType } from "@/types/authType";

export const join = (user: UserType) => {
  const url = `/join/email/${user.email}`;
  return httpClient.post(url, user);
};

export const auth = (_: { user: UserType; authCode: string }) => {
  const url = `/join/email/${_.user.email}/auth?authCode=${_.authCode}`;
  return httpClient.post(url, _.user);
};

export const login = (user: UserType) => {
  const url = `/login/email/${user.email}`;
  return httpClient.post(url, { password: user.password });
};
