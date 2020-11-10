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
  let [userStates, setUserStates] = useState([]);
  let [band, setBand] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("band_user"));
    const email = user.email;
    const uid = user.uid;
    const db = firebase.firestore();
    //todo .match
    if (true) {
      db.collection("bands")
        .doc("users")
        .get()
        .then(function (doc) {
          if (doc.exists) {
            const band = doc.data()[uid];
            if (band !== "") {
              db.collection("bands")
                .doc(band)
                .get()
                .then(function (doc) {
                  if (doc.exists) {
                    setBand(doc.data());
                    setUserStates([email, uid, "registered"]);
                  }
                })
                .catch(function (error) {
                  console.log("Error getting document:", error);
                });
            } else {
              setUserStates([email, uid, "no_band"]);
              console.log([email, uid, "no_band"]);
            }
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    } else {
      setUserStates([email, uid, "registered"]);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar></Navbar>
      <main className={styles.dashboardContainer}>
        {userStates[2] === "registered" ? (
          <BandInfo band={band} status={userStates}></BandInfo>
        ) : (
          <Register status={userStates}></Register>
        )}
      </main>
      <Footer></Footer>
    </div>
  );
};

const BandForm = () => {
  const [bandName, setBandName] = useState("");
  const [role, SetRole] = useState([]);
  const [url, setUrl] = useState({
    original: "",
    recompose: "",
  });
  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Name ${bandName}`);
    console.log(firebase.auth().currentUser);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Band:
        <input
          type="text"
          value={bandName}
          onChange={(e) => setBandName(e.target.value)}
        />
      </label>
      <label>
        Role:
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default DashboardPage;
