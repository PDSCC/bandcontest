import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import { firebase } from "../config/firebase";
import styles from "../styles/Landing.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

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
      <Footer></Footer>
    </div>
  );
};

export default LoginPage;
