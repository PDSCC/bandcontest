import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import { firebase } from "../../config/firebase";
import Navbar from "../../components/Navbar/";
import BandInfo from "./BandInfo/";

const DashboardPage = () => {
  return (
    <div>
      {
        <div>
          <Head>
            <title>Dashboard</title>
          </Head>
          <Navbar></Navbar>
          <main>
            <BandInfo></BandInfo>
            <BandForm></BandForm>
          </main>
        </div>
      }
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
