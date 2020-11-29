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
      {/* <button>Register Now!</button>
      <section>
        <header className={styles.header}></header>
        <h2 className={styles.sectionHeader} id="timeline">
          Timeline
        </h2>
        <p>11-25 November 2020 | Audition Round Video Submission</p>
        <p>27 November 2020 | Audition Round Result Announcement</p>
        <p>2-3 December 2020 | Live Play Round</p>
        <p>23 December 2020 | Final Round</p>
        <p></p>
      </section>
      <section>
        <h2 className={styles.sectionHeader} id="Rules">
          Rules
        </h2>
        <p>Scoring Criteria</p>
        <p><dd>Overall Score</dd></p>
        <p><dd>Rhythm 5 points</dd></p>
        <p><dd>Unity 5 points</dd></p>
        <p><dd>Mood 5 points</dd></p>
        <p><dd>Skill 5 points</dd></p>
        <p></p>
        <p>Points from EACH video.</p>
        <p><dd>Original video: Detail 5 points</dd></p>
        <p><dd>Rearrange video: Individuality 5 points</dd></p>
        <p></p>
        <p>Total score 30 points</p>
        <p></p>
      </section>
      <section>
        <h2 className={styles.sectionHeader} id="Reward">
          Reward
        </h2>
        <p>1st 3000 ฿</p>
        <p>2nd 2000 ฿</p>
        <p>3rd 1000 ฿</p>
        <p></p>
        <p>#All bands participating in the Live Play Round will be awarded a certificate for entering the contest.</p>
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
      </section> */}
      <Footer></Footer>
    </div>
  );
};

export default LoginPage;
