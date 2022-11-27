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
}
export type UserLoginResponse = UserRegisterResponse;
