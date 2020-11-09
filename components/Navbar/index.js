import Router from "next/router";
import Link from "next/link";
import styles from "../../styles/Navbar.module.css";
import { firebase } from "../../config/firebase";
import { useState, useEffect } from "react";

const Navbar = () => {
  let [user, setUser] = useState(undefined);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("band_user")));
  }, []);

  const signin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // ...
        localStorage.setItem("band_user", JSON.stringify(user));
        setUser(user);
        Router.push("/dashboard");
      })
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
  };

  const signout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(undefined);
        Router.push("/");
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  return (
    <nav className={styles.Navbar}>
      <div className={styles.navLeft}>
        <Link href="/">
          <a className={styles.navLink}>PDS Band Contest 2020</a>
        </Link>
        <Link href="/">
          <a className={styles.navLink}>Band</a>
        </Link>
        <Link href="/">
          <a className={styles.navLink}>About</a>
        </Link>
      </div>
      {user ? (
        <div className={styles.navRight}>
          <Link href={Router.pathname === "/" ? "/dashboard" : "/"}>
            <a className={styles.navLink}>
              {Router.pathname === "/" ? "Dashboard" : "Home"}
            </a>
          </Link>
          <img src={user.photoURL} className={styles.profilePic}></img>
          <button onClick={signout} className={styles.logButton}>
            Logout
          </button>
        </div>
      ) : (
        <div className={styles.navRight}>
          <button onClick={signin} className={styles.logButton}>
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
