export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  name: string;
}

export interface UserRegisterResponse extends UserLogin {
  user: { name: string };
  token: string;
  method: string;
}
export type UserLoginResponse = UserRegisterResponse;

export interface IUser {
  id: string;
  name: string;
  email: string;
}
