import { Types } from "mongoose";
export type JwtPayload = {
  email: string;
  id: Types.ObjectId;
  iat?: number;
  exp?: number;
  refreshToken?: string;
};