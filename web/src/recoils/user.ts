import { AuthUserType } from "@/types/authType";
import { useEffect, useState } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
const defaultValue = undefined;

const userState = atom<AuthUserType | undefined>({
  key: "userState", // unique ID (with respect to other atoms/selectors)
  default: defaultValue, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

const accessTokenState = selector({
  key: "accessTokenState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    // TODO token 만료 시 refreshToken 발급
    const user = get(userState);

    return user?.accessToken;
  },
});

/**
 * for ssr
 * https://github.com/polemius/recoil-persist#server-side-rendering
 */
export function useUserState() {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(userState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? defaultValue : value, setValue] as const;
}

export function useAccessTokenValue() {
  const [isInitial, setIsInitial] = useState(true);
  const accessTokenStr = useRecoilValue(accessTokenState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return isInitial ? undefined : accessTokenStr;
}
