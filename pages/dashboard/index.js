import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { firebase } from "../../config/firebase";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "../../styles/Dashboard.module.css";
import BandInfo from "./BandInfo";
import Register from "./Register";

const DashboardPage = () => {
  let [userStates, setUserStates] = useState(["not_done", ""]);
  let [band, setBand] = useState({});
  let [bandId, setBandId] = useState("");

  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem("band_user"));
    if (user !== null) {
      const displayName = user.displayName;
      const email = user.email;
      const uid = user.uid;
      const photo = user.photoURL;
      const db = firebase.firestore();
      const match = email.match(/@satitpatumwan.ac.th/);
      if (match !== null || email === "chayapatr.arc@gmail.com") {
        db.collection("bands")
          .doc("users")
          .get()
          .then(function (doc) {
            if (doc.exists) {
              const band = doc.data()[uid];
              if (band !== undefined && band !== "") {
                if (band === "admin") {
                  setUserStates(["admin", displayName, uid, photo]);
                } else {
                  db.collection("bands")
                    .doc(band)
                    .get()
                    .then(function (doc) {
                      if (doc.exists) {
                        setBand(doc.data());
                        setBandId(band);
                        setUserStates(["registered", displayName, uid, photo]);
                      } else {
                        setUserStates([
                          "band_not_found",
                          displayName,
                          uid,
                          photo,
                        ]);
                      }
                    })
                    .catch(function (error) {
                      console.log("Error getting document:", error);
                    });
                }
              } else {
                let create = {};
                create[uid] = "";
                setUserStates(["no_band", displayName, uid, photo]);
                console.log(uid + " ");
                db.collection("bands")
                  .doc("users")
                  .update(create, { merge: true });
              }
            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
      } else {
        setUserStates(["not_school_email", displayName, uid]);
        console.log(userStates);
      }
    } else setUserStates(["not_login", ";P", "~.~", "[O]*"]);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar></Navbar>
      <main className={styles.dashboardContainer}>
        {userStates[0] === "registered" ? (
          <BandInfo band={band} status={userStates} bandId={bandId}></BandInfo>
        ) : (
          <Register status={userStates}></Register>
        )}
      </main>
      <Footer></Footer>
    </div>
  );
};

export default DashboardPage;
