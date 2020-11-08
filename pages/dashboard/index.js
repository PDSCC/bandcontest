import Head from "next/head";
import Router from "next/router";
import { useState, useEffect } from "react";
import { firebase } from "../../config/firebase";
import BandInfo from "./BandInfo/";

const DashboardPage = () => {
  const user = firebase.auth().currentUser.displayName;
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main>
        <BandInfo></BandInfo>
        <BandForm></BandForm>
        <div>{user}</div>
        <button onClick={signout}>Sign Out</button>
      </main>
    </div>
  );
};

const BandForm = () => {
  const [bandName, setBandName] = useState("");
  const [Member, setMember] = useState([]);
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
      <input type="submit" value="Submit" />
    </form>
  );
};

const signout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      Router.push("/");
    })
    .catch(function (error) {
      // An error happened.
    });
};

export default DashboardPage;
