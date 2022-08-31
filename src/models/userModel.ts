import { model } from "mongoose";
import UserSchema, { IUserSchema } from "../schema/userSchema";

const UserModel = model<IUserSchema>("User", UserSchema);

export default UserModel;
