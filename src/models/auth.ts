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
