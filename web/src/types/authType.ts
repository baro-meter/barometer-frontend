interface UserType {
  nickname: string;
  email: string;
}

export interface LoginUserType extends UserType {
  password: string;
}

export interface UserTokenType {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUserType extends UserType, UserTokenType {}
