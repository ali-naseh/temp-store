export interface LoginUserReq {
  username: string;
  password: string;
}

export interface LoginUserRes {
  token: string;
}
