import { Outlet } from "react-router-dom";
import Header from "./header";
import { Link } from 'react-router-dom';
import Footer from "./footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;