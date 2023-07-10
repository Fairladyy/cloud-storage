import { ReactNode } from "react";
import { NextPage, GetServerSidePropsContext } from "next";
import { Layout } from "@/layouts/Layout";
import { checkAuth } from "@/utils/checkAuth";

interface DashboardPageProps {
  children: ReactNode;
}

const DashboardPage: NextPage<DashboardPageProps> = ({ children }) => {
  return (
    <main>
      <Layout title="Dashboard / Main">
        <h1>Dashboard Page</h1>
        {children}
      </Layout>
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
  return {
    props: {},
  };
};

export default DashboardPage;
