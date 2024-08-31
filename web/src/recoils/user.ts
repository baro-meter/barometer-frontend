import { AuthUserType } from "@/types/authType";
import { atom, selector } from "recoil";

export const userState = atom<AuthUserType | undefined>({
  key: "userState", // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
});

export const accessTokenState = selector({
  key: "accessTokenState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    // TODO token 만료 시 refreshToken 발급
    const user = get(userState);

    return user?.accessToken;
  },
});
