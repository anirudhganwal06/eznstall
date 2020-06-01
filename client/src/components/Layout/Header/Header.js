import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "./Header.module.css";
import links from "./Links";
import { useSelector } from "react-redux";
import { useFirebase, isLoaded } from "react-redux-firebase";

const Header = (props) => {
  const [show, setShow] = useState(false);

  const auth = useSelector((state) => state.firebase.auth);

  const firebase = useFirebase();
  const history = useHistory();

  const login = async () => {
    await firebase.login({
      provider: "google",
      type: "popup",
    });
    history.push("/");
  };

  const logout = async () => {
    console.log('logging out')
    await firebase.logout();
    history.push("/");
  };

  // Create a array of all navbar links imported from ./Links file
  let linksJSX = [];
  let linksType = "signedOut";

  if (!isLoaded(auth)) {
    linksType = null;
  } else if (isLoaded(auth) && !auth.isEmpty) {
    linksType = "signedIn";
  }
  console.log(linksType)

  if (linksType) {
    for (let link of links[linksType]) {
      if (link.loadComponent) {
        linksJSX.push(
          <Link className={styles.link} key={link.name} to={link.link}>
            {link.name}
          </Link>
        );
      } else {
        let callFn;
        switch (link.call) {
          case "login":
            callFn = login;
            break;
          case "logout":
            callFn = logout;
            break;
          default:
            console.warn("Cannot identify link.call");
        }
        linksJSX.push(
          <span className={styles.link} key={link.name} onClick={callFn}>
            {link.name}
          </span>
        );
      }
    }
  }

  return (
    <nav className={show ? styles.show : ""}>
      <div className={styles["nav-content"]}>
        <Link to="/" className={`${styles["logo"]} ${styles.link}`}>
          <img
            src="assets/images/eznstall-logo-small.png"
            height="20"
            alt="Logo"
          />
        </Link>

        <div className={styles["nav-icon"]} onClick={() => setShow(!show)}>
          <div className={`${styles["bar"]} ${styles["one"]}`}></div>
          <div className={`${styles["bar"]} ${styles["two"]}`}></div>
        </div>

        <div className={styles["nav-links"]}>{linksJSX}</div>

        <svg
          className={styles["search-icon"]}
          viewBox="0 0 3.7041668 11.641667"
          height="44"
          width="14"
        >
          <g transform="matrix(0.97865947,0,0,0.97865947,-18.209185,-74.390797)">
            <path
              d="m 19.070369,80.532362 c -0.618144,0.618143 -0.619255,1.62581 -7.32e-4,2.244333 0.570867,0.570865 1.473777,0.613735 2.095614,0.131181 l 0.945308,0.945309 0.280633,-0.280633 -0.945308,-0.945309 c 0.482552,-0.621838 0.439684,-1.524746 -0.131182,-2.095613 -0.618523,-0.618523 -1.62619,-0.617413 -2.244333,7.32e-4 z m 0.280632,0.280632 c 0.466517,-0.466515 1.216631,-0.467898 1.683433,-0.0011 0.466802,0.466801 0.466882,1.218378 3.64e-4,1.684894 -0.466512,0.466513 -1.21809,0.466436 -1.684892,-3.67e-4 -0.466803,-0.466801 -0.465418,-1.216918 0.0011,-1.683432 z"
              fill="#fff"
            />
          </g>
        </svg>
      </div>
    </nav>
  );
};

export default Header;
