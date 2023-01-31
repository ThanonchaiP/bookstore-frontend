export type LoginForm = {
  email: string;
  password: string;
};

export interface LoginResponse {
  statusCode: number;
  message: string;
  data: LoginData;
}

interface LoginData {
  user: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

export type RegisterForm = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};
