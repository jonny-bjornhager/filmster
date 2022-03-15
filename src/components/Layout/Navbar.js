import { useState } from "react";
import classes from "./Navbar.module.css";

import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [checked, setChecked] = useState(false);

  const changeBackground = () => {
    if (window.scrollY > 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  const checkHandler = () => {
    setChecked(false);
  };

  const navClasses = navbar
    ? `${classes.navbar} ${classes["navbar-active"]}`
    : `${classes.navbar}`;

  return (
    <nav className={navClasses}>
      <div className={classes["nav-inner"]}>
        <Link to="/">
          <h1 className={classes.brand}>FILMSTER</h1>
        </Link>
        <input
          className={classes["nav-toggle"]}
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />

        <div className={classes["hamburger-menu"]}>
          <div className={classes["hamburger-container"]}>
            <div className={classes["hamburger-center-line"]}></div>
          </div>
        </div>
        <ul className={classes["nav-links"]}>
          <li>
            <NavLink
              onClick={checkHandler}
              className={({ isActive }) =>
                isActive
                  ? classes["nav-link-active"]
                  : classes["nav-link-inactive"]
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={checkHandler}
              className={({ isActive }) =>
                isActive
                  ? classes["nav-link-active"]
                  : classes["nav-link-inactive"]
              }
              to="search"
            >
              Search
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
