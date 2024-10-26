import { Model } from "mongoose";

export type TUser = {
  email: string;
  password: string;
  role: 'admin'
}

export type TUserRole = 'user' | 'admin'

export interface TUserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExist(email: string): TUser | null
}