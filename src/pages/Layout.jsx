import { Outlet, Link } from "react-router-dom";
import style from "./Layout.module.css";

const Layout = () => {
  return (
    <>
      <nav className={style.nav}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/wishlist">
              <sup>0</sup> Wishlist
            </Link>
          </li>
          <li>
            <Link to="/basket">
              <sup>0</sup> Basket
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
