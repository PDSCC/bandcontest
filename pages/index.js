import Head from "next/head";
import Router from "next/router";
import Link from "next/link";

import { firebase } from "../config/firebase";

import styles from "../styles/Landing.module.css";
import Navbar from "../components/Navbar/";

const LoginPage = () => {
  const user = firebase.auth().currentUser;
  return (
    <div className={styles.container}>
      <Navbar></Navbar>
      <header className={styles.header}>PDS Band Contest 2020</header>
      <section>
        <h2 className={styles.sectionHeader}>Band</h2>
      </section>
      <section>
        <h2 className={styles.sectionHeader}>Band</h2>
      </section>
      <section>
        <h2 className={styles.sectionHeader}>Follow Us</h2>
      </section>
      <footer>
        PDS Student Committee 2020 | ⌨️ with ❤️ by{" "}
        <Link href="https://github.com/pdscc/bandcontest">PDSCC</Link>
      </footer>
    </div>
  );
};

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
      // ...
      console.log(result.user);
      localStorage.setItem("bandcontest_user", JSON.stringify(result.user));
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
      localStorage.removeItem("login");
      Router.push("/");
    })
    .catch(function (error) {
      // An error happened.
    });
};

export default LoginPage;
