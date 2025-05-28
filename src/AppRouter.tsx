import { Outlet } from "react-router-dom";
import { Layout } from "./components/Layout";

export const AppRouter = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
