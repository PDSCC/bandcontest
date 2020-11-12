import { useState, useEffect } from "react";
import Router from "next/router";
import { firebase } from "../../config/firebase";
import styles from "../../styles/Register.module.css";

const Register = ({ status }) => {
  const [user, setUser] = useState({});
  const [select, setSelect] = useState("not_selected");
  const [bandName, setBandName] = useState("");
  const db = firebase.firestore();

  let name =
    status !== undefined
      ? status[1].length > 0
        ? status[1].split(" ")[0].charAt(0).toUpperCase() +
          status[1].split(" ")[0].slice(1).toLowerCase()
        : ""
      : "";

  const back = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(undefined);
        localStorage.removeItem("band_user");
        Router.push("/");
      })
      .catch(function (error) {});
  };

  const backRestart = () => {
    db.collection("bands")
      .doc("users")
      .set({ [status[2]]: "" }, { merge: true });
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(undefined);
        localStorage.removeItem("band_user");
        Router.push("/");
      })
      .catch(function (error) {});
  };

  const create = () => {
    if (select === "not_selected") setSelect("create");
    else if (bandName !== "") {
      if (confirm("Are you sure you want to create a band?")) {
        let create = {
          bandName: bandName,
          requests: {},
          roles: {
            [status[2]]: {
              displayName: status[1],
              profilePic: status[3],
              role: "",
            },
          },
          url: {
            original: "",
            rearrange: "",
          },
        };
        db.collection("bands")
          .add(create, { merge: true })
          .then((bandId) => {
            let update = {};
            update[status[2]] = bandId.id;
            db.collection("bands").doc("users").update(update);
            Router.push("/dashboard");
          });
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 500);
      }
    } else {
      alert("Band Name can't be empty");
    }
  };

  const join = () => {
    if (select === "not_selected") setSelect("join");
    else if (bandName !== "") {
      db.collection("bands")
        .doc(bandName)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log(doc);
            let update = {};
            update[status[2]] = bandName;
            db.collection("bands").doc("users").update(update);
            db.collection("bands")
              .doc(bandName)
              .set(
                {
                  roles: {
                    [status[2]]: {
                      displayName: status[1],
                      profilePic: status[3],
                      role: "",
                    },
                  },
                },
                { merge: true }
              );
            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 500);
          } else {
            alert("Band Not Found");
          }
        });
    }
  };

  const bandBack = () => {
    setBandName("");
    setSelect("not_selected");
  };

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("band_user"));
    setUser(localStorageUser);
  }, []);

  if (status) {
    if (status[0] === "not_done")
      return <div className={styles.registerText}>Loading...</div>;
    else if (status[0] === "not_school_email")
      return (
        <div className={styles.registerContainer}>
          <div className={styles.registerText}>
            Please use patumwan's email address (@satitpatumwan.ac.th) for a
            registration
          </div>
          <button className={styles.registerButton} onClick={back}>
            Back
          </button>
        </div>
      );
    else if (status[0] === "no_band") {
      return (
        <div className={styles.registerContainer}>
          <div className={styles.registerText}>Hello, {name} :)</div>
          <input
            type="text"
            className={
              select !== "not_selected" ? styles.registerInput : styles.none
            }
            value={bandName}
            onChange={(e) => setBandName(e.target.value)}
            placeholder={select === "join" ? "Band ID" : "Band's Name"}
          ></input>
          <button
            className={select !== "join" ? styles.registerButton : styles.none}
            onClick={create}
          >
            Create a Band
          </button>
          <button
            className={
              select !== "create"
                ? select === "not_selected"
                  ? styles.registerButtonInverted
                  : styles.registerButton
                : styles.none
            }
            onClick={join}
          >
            Join a Band
          </button>
          <button
            className={
              select === "not_selected"
                ? styles.none
                : styles.registerButtonInverted
            }
            onClick={bandBack}
          >
            Back
          </button>
        </div>
      );
    } else if (status[0] === "not_login")
      return (
        <div className={styles.registerContainer}>
          <div className={styles.registerText}>Please Login First</div>
          <button className={styles.registerButton} onClick={back}>
            Back
          </button>
        </div>
      );
    else if (status[0] === "band_not_found") {
      return (
        <div className={styles.registerContainer}>
          <div className={styles.registerText}>Error: Band Not Found</div>
          <button className={styles.registerButton} onClick={backRestart}>
            Restart
          </button>
        </div>
      );
    } else if (status[0] === "admin") {
      return (
        <div className={styles.registerContainer}>
          <div className={styles.registerText}>
            สวัสดีครับแอดมิน ไปเข้าเว็บแอดมินสิไอโง่
          </div>
          <button className={styles.registerButton} onClick={back}>
            Sign Out
          </button>
        </div>
      );
    } else {
      <div className={styles.registerContainer}>
        <div className={styles.registerText}>Unexpected Error</div>
        <button className={styles.registerButton} onClick={backRestart}>
          Restart
        </button>
      </div>;
    }
  } else {
    return (
      <div className={styles.registerContainer}>
        <div className={styles.registerText}>Loading...</div>
      </div>
    );
  }
};

export default Register;
