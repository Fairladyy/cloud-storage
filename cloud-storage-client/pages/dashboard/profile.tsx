import { GetServerSidePropsContext, NextPage } from "next";
import { IUser } from "@/api/dto/auth.dto";
import { Button, Layout } from "antd";
import styles from "@/styles/Profile.module.scss";

import * as Api from "@/api";
import { checkAuth } from "@/utils/checkAuth";
import DashboardPage from ".";

interface IProps {
  userData: IUser;
}

const ProfilePage: NextPage<IProps> = ({ userData }) => {
  const onCLickLogout = () => {
    if (window.confirm("Do you want to logout?")) {
      Api.auth.logout();
      location.href = "/";
    }
  };

  return (
    <main>
      <div className={styles.root}>
        <h1>My Profile</h1>
        <br />
        <p>
          ID: <b>{userData.id}</b>
        </p>
        <p>
          Full name: <b>{userData.fullName}</b>
        </p>
        <p>
          E-mail: <b>{userData.email}</b>
        </p>
        <br />
        <Button onClick={onCLickLogout} type="primary" danger>
          Logout
        </Button>
      </div>
    </main>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const authProps = await checkAuth(context);
  if ("redirect" in authProps) {
    return authProps;
  }

  const userData = await Api.auth.getMe();

  return {
    props: {
      userData,
    },
  };
};

export default ProfilePage;
