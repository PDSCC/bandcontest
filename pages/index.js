import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import { firebase } from "../config/firebase";
import styles from "../styles/Landing.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LoginPage = () => {
  const user = firebase.auth().currentUser;
  return (
    <div className={styles.container}>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/gic0mki.css" />
      </Head>
      <Navbar></Navbar>
      <div className={styles.hero}></div>
      <button>Register Now!</button>
      <section>
        <header className={styles.header}></header>
        <h2 className={styles.sectionHeader} id="timeline">
          Timeline
        </h2>
        <p>11-23 November 2020 | Audition Round Video Submission</p>
        <p>27 November 2020 | Audition Round Result Announcement</p>
        <p></p>
      </section>
      <section>
        <h2 className={styles.sectionHeader} id="band">
          Band
        </h2>
      </section>
      <section>
        <h2 className={styles.sectionHeader} id="about">
          About
        </h2>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default LoginPage;
