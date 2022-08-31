export type UserBody = {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
};
