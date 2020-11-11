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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("band_user"));
    const displayName = user.displayName;
    const email = user.email;
    const uid = user.uid;
    const db = firebase.firestore();
    const match = email.match(/@satitpatumwan.ac.th/);
    if (match !== null) {
      db.collection("bands")
        .doc("users")
        .get()
        .then(function (doc) {
          if (doc.exists) {
            const band = doc.data()[uid];
            if (band !== undefined) {
              db.collection("bands")
                .doc(band)
                .get()
                .then(function (doc) {
                  if (doc.exists) {
                    setBand(doc.data());
                    setUserStates(["registered", displayName]);
                    console.log(userStates);
                  }
                })
                .catch(function (error) {
                  console.log("Error getting document:", error);
                });
            } else {
              setUserStates(["no_band", displayName]);
            }
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    } else {
      setUserStates(["not_school_email", displayName]);
      console.log(userStates);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar></Navbar>
      <main className={styles.dashboardContainer}>
        {userStates[0] === "registered" ? (
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
