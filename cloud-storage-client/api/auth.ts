import axios from "@/core/axios";
import {
  ILoginForm,
  ILoginResponse,
  RegistrationFormDTO,
  RegistrationResponseDTO,
  IUser,
} from "@/api/dto/auth.dto";
import { destroyCookie } from "nookies";

export const login = async (values: ILoginForm): Promise<ILoginResponse> => {
  const { data } = await axios.post("/auth/login", values);

  return data;
};

export const register = async (
  values: RegistrationFormDTO
): Promise<RegistrationResponseDTO> => {
  const { data } = await axios.post("/auth/registration", values);

  return data;
};

export const getMe = async (): Promise<IUser> => {
  return (await axios.get("/users/userInfo")).data;
};

export const logout = () => {
  destroyCookie(null, "_token", { path: "/" });
};
