import { useState, useEffect } from "react";
import Router from "next/router";
import { firebase } from "../../config/firebase";
import styles from "../../styles/Register.module.css";

const Register = ({ status }) => {
  const [user, setUser] = useState({});
  const [select, setSelect] = useState("not_selected");
  const [bandName, setBandName] = useState("");

  const name =
    status[1].split(" ")[0].charAt(0).toUpperCase() +
    status[1].split(" ")[0].slice(1).toLowerCase();

  const back = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(undefined);
        localStorage.removeItem("band_user");
        Router.push("/");
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  const create = () => {
    if (select === "not_selected") setSelect("create");
  };

  const join = () => {
    if (select === "not_selected") setSelect("join");
  };

  const bandBack = () => {
    setBandName("");
    setSelect("not_selected");
  };

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("band_user"));
    setUser(localStorageUser);
    console.log(status);
  }, []);

  if (status[0] === "not_done")
    return <div className={styles.registerText}>Loading...</div>;
  else if (status[0] === "not_school_email")
    return (
      <div className={styles.registerContainer}>
        <div className={styles.registerText}>
          Please use a school email address (@satitpatumwan.ac.th) for
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
        <div className={styles.registerText}>Hello, {name}</div>
        <input
          type="text"
          className={
            select !== "not_selected" ? styles.registerInput : styles.none
          }
          value={bandName}
          onChange={(e) => setBandName(e.target.value)}
          placeholder=" Band's Name"
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
  } else {
    return (
      <div className={styles.registerContainer}>
        <div className={styles.registerText}>Unexpected error has occurred</div>
        <button className={styles.registerButton} onClick={back}>
          Back
        </button>
      </div>
    );
  }
};

export default Register;
