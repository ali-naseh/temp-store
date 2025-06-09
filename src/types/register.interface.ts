import { User } from "./user.interface";

export type RegisterUserReq = {
  username: string;
  email: string;
  password: string;
};

export type RegisterUserRes = User;
