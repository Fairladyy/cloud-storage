import axios from "axios";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import * as Api from "@/api";

export const checkAuth = async (context: GetServerSidePropsContext) => {
  const { _token } = nookies.get(context);

  axios.defaults.headers.Authorization = "Bearer " + _token;

  try {
    await Api.auth.getMe();

    return {
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/dashboard/auth",
        permanent: false,
      },
    };
  }
};
