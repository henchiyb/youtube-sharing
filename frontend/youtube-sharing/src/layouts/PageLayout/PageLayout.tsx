import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const PageLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default PageLayout;
