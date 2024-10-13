import { LoginUserType } from "@/types/authType";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { auth, join, login } from "@/services/auth/authService";
import { useAccessTokenValue, useUserState } from "@/recoils/user";

interface LoginPageViewProps {
  user: LoginUserType;
  authCode: string;
  accessTokenStr?: string;
  handleJoin: (event: React.FormEvent<HTMLFormElement>) => void;
  handleAuth: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (
    type: "nickname" | "password" | "email" | "authCode",
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleLogin: () => void;
}

const LoginPageView = ({
  user,
  authCode,
  accessTokenStr,
  handleJoin,
  handleAuth,
  handleChange,
  handleLogin,
}: LoginPageViewProps) => {
  return (
    <>
      <form onSubmit={handleJoin}>
        <h2>join</h2>
        <div>
          nickname:{" "}
          <input
            name="nickname"
            value={user.nickname}
            onChange={(e) => handleChange("nickname", e)}
          ></input>
        </div>
        <div>
          password:{" "}
          <input
            name="password"
            value={user.password}
            onChange={(e) => handleChange("password", e)}
          ></input>
        </div>
        <div>
          email:{" "}
          <input
            name="email"
            value={user.email}
            onChange={(e) => handleChange("email", e)}
          ></input>
        </div>
        <button type="submit">JOIN</button>
      </form>
      <form onSubmit={handleAuth}>
        <h2>auth</h2>
        <div>
          authCode:{" "}
          <input
            name="authCode"
            value={authCode}
            onChange={(e) => handleChange("authCode", e)}
          ></input>
        </div>
        <button type="submit">AUTH</button>
      </form>
      <div>
        <h1>join 후 login</h1>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <h1>login 후 accessToken 조회</h1>
        <div>{accessTokenStr}</div>
      </div>
    </>
  );
};

interface LoginPageProps {}

const LoginPage = ({}: LoginPageProps) => {
  const [authedUser, setAuthedUser] = useUserState();
  const accessTokenStr = useAccessTokenValue();
  const joinMutation = useMutation({ mutationFn: join });
  const authMutation = useMutation({ mutationFn: auth });
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (!response) {
        alert("login 실패");
        return;
      }
      console.log(response);
      const { accessToken, refreshToken } = response;
      setAuthedUser({ ...user, accessToken, refreshToken });
      // TODO react-query로 token 관리하는 로직 추가하기
    },
  });
  const [user, setUser] = useState<LoginUserType>({
    nickname: "",
    password: "",
    email: "",
  });
  const [authCode, setAuthCode] = useState<string>("");

  const handleJoin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    joinMutation.mutate(user);
  };

  const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    authMutation.mutate({ user, authCode });
  };

  const handleChange = (
    type: "nickname" | "password" | "email" | "authCode",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const text = event.currentTarget.value;
    if (type === "authCode") {
      setAuthCode(text);
    } else {
      const newUser = { ...user };
      newUser[type] = text;
      setUser(newUser);
    }
  };

  const handleLogin = async () => {
    loginMutation.mutate(user);
  };

  const viewProps = {
    user,
    authCode,
    accessTokenStr,
    handleJoin,
    handleAuth,
    handleChange,
    handleLogin,
  };

  return <LoginPageView {...viewProps} />;
};

export const getServerSideProps = () => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default LoginPage;
