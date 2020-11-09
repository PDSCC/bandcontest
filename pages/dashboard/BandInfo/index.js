import { useState, useEffect } from "react";
import { firebase } from "../../../config/firebase";
import styles from "../../../styles/Dashboard.module.css";

const BandInfo = () => {
  const [band, setBand] = useState({
    bandName: "",
    member: {
      drummer: "",
      vocalist: "",
      pianist: "",
    },
    url: {
      original: "",
      recompose: "",
    },
    requests: {},
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("band_user"));
    const uid = user.uid;
    const db = firebase.firestore();
    console.log(user, uid);
    db.collection("bands")
      .doc("users")
      .get()
      .then(function (doc) {
        if (doc.exists) {
          const band = doc.data()[uid];
          db.collection("bands")
            .doc(band)
            .get()
            .then(function (doc) {
              if (doc.exists) {
                console.log(doc.data());
                setBand(doc.data());
              }
            })
            .catch(function (error) {
              console.log("Error getting document:", error);
            });
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);

  if (band.bandName)
    return (
      <div className={styles.infoContainer}>
        <div className={styles.bandName}>Band: {band.bandName}</div>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>Member</div>
          {Object.entries(band.roles).map(([key, value]) => (
            <div className={styles.member}>
              <div key={key} className={styles.memberContainer}>
                <img src={value.profilePic} className={styles.memberPic}></img>
                <div className={styles.memberName}>{value.displayName}</div>
                <div className={styles.memberRole}>{value.role}</div>
              </div>
              <button className={styles.memberDelete}>❌</button>
            </div>
          ))}
        </div>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>Song</div>
          {Object.entries(band.url).map(([key, value]) => (
            <div key={key}>
              <span className={styles.bold}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
              : {value}
            </div>
          ))}
        </div>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>Request</div>
          {band.requests ? (
            Object.entries(band.requests).map(([key, value]) => (
              <div className={styles.member}>
                <div key={key} className={styles.memberContainer}>
                  <img
                    src={value.profilePic}
                    className={styles.memberPic}
                  ></img>
                  <div className={styles.memberName}>{value.displayName}</div>
                  <div className={styles.memberRole}>{value.role}</div>
                </div>
                <button className={styles.memberAccept}>✅</button>
                <button className={styles.memberDelete}>❌</button>
              </div>
            ))
          ) : (
            <div className={styles.bold}>🤖 No New Request</div>
          )}
        </div>
      </div>
    );
  return <div className={styles.bandName}>Loading...</div>;
};

export default BandInfo;

/* <iframe
width="420"
height="315"
src="https://www.youtube.com/embed/tgbNymZ7vqY"
></iframe> */
