import { Types } from "mongoose";
import { RoleType } from "./roles.type";
export type JwtPayload = {
  email: string;
  id: Types.ObjectId;
  iat?: number;
  exp?: number;
  refreshToken?: string;
  type: RoleType
};