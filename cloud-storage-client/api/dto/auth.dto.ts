export interface ILoginForm {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IUser {
  id: number;
  email: string;
  fullName: string;
}

export type RegistrationFormDTO = ILoginForm & { fullName: string };
export type RegistrationResponseDTO = ILoginResponse;
