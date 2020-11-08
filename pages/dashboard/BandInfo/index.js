import { useState, useEffect } from "react";
import { firebase } from "../../../config/firebase";

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
    request: {},
  });

  useEffect(() => {
    const db = firebase.firestore();
    const user = JSON.parse(localStorage.getItem("band_user"));
    const uid = user.uid;
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
      <div>
        <div>Band: {band.bandName}</div>
        {Object.entries(band.members).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
        <div>Original: {band.url.original}</div>
        <div>Recompose: {band.url.recompose}</div>
        <iframe
          width="420"
          height="315"
          src="https://www.youtube.com/embed/tgbNymZ7vqY"
        ></iframe>
      </div>
    );
  return <div>Loading...</div>;
};

export default BandInfo;
