import Router from "next/router";
import { useState, useEffect } from "react";
import { firebase } from "../../config/firebase";
import styles from "../../styles/BandInfo.module.css";

const BandInfo = ({ band, status, bandId }) => {
  const db = firebase.firestore();

  const [user, setUser] = useState({});

  const [role, setRole] = useState("");
  const [changeRoleVar, setChangeRole] = useState("");

  const [bandName, setBandName] = useState("");
  const [changeBandNameVar, setChangeBandName] = useState("");

  const [originalVideo, setOriginalVideo] = useState("");
  const [rearrangeVideo, setRearrangeVideo] = useState("");

  const [changeOriginalVideoVar, setChangeOriginalVideo] = useState("");
  const [changeRearrangeVideoVar, setChangeRearrangeVideo] = useState("");

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("band_user"));
    setBandName(band.bandName);
    setOriginalVideo(band.url.original);
    setRearrangeVideo(band.url.rearrange);
    setChangeOriginalVideo(band.url.original);
    setChangeRearrangeVideo(band.url.rearrange);
    setUser(localStorageUser);
    setRole(band.roles[status[2]].role);
  }, []);

  const leaveBand = () => {
    if (confirm(`Are you sure you want to leave this band?`)) {
      if (user !== undefined) {
        db.collection("bands")
          .doc(bandId)
          .set(
            {
              roles: {
                [user.uid]: firebase.firestore.FieldValue.delete(),
              },
            },
            { merge: true }
          );

        db.collection("bands")
          .doc(bandId)
          .get()
          .then((doc) => {
            if (Object.keys(doc.data().roles).length === 0)
              db.collection("bands").doc(bandId).delete();
          });

        db.collection("bands")
          .doc("users")
          .set({ [user.uid]: "" }, { merge: true });
      }

      Router.push("/");
    }
  };

  const changeRole = () => {
    if (confirm(`Are you sure you want to change your role?`)) {
      const uid = user.uid;
      db.collection("bands")
        .doc(bandId)
        .set(
          {
            roles: {
              [uid]: {
                profilePic: user.photoURL,
                displayName: user.displayName,
                role: changeRoleVar,
              },
            },
          },
          { merge: true }
        );
      console.log(band);
      setRole(changeRoleVar);
    }
    setChangeRole("");
  };

  const changeOriginalVideo = () => {
    if (confirm(`Are you sure you want to change a video link?`)) {
      db.collection("bands")
        .doc(bandId)
        .set(
          {
            url: {
              original: changeOriginalVideoVar,
            },
          },
          { merge: true }
        );
      console.log(band);
    }
    setOriginalVideo(changeOriginalVideoVar);
  };

  const changeRearrangeVideo = () => {
    if (confirm(`Are you sure you want to change a video link?`)) {
      db.collection("bands")
        .doc(bandId)
        .set(
          {
            url: {
              rearrange: changeRearrangeVideoVar,
            },
          },
          { merge: true }
        );
      console.log(band);
    }
    setRearrangeVideo(changeRearrangeVideoVar);
  };

  const changeBandName = () => {
    if (confirm(`Are you sure you want to change your band's name?`)) {
      db.collection("bands")
        .doc(bandId)
        .set({ bandName: changeBandNameVar }, { merge: true });
      setBandName(changeBandNameVar);
    }
    setChangeBandName("");
  };

  if (band)
    return (
      <div className={styles.infoContainer}>
        <div className={styles.bandName}>Profile</div>
        <div className={styles.sectionContainer}>
          <div className={styles.profileContainer}>
            <div className={styles.text}>
              <span className={styles.bold}>Name:</span> {user.displayName}
            </div>
            <div className={styles.text}>
              <span className={styles.bold}>Email:</span> {user.email}
            </div>
            <div className={styles.text}>
              <span className={styles.bold}>User ID:</span> {user.uid}
            </div>
            <div className={styles.text}>
              <span className={styles.bold}>Role:</span>{" "}
              {role || "N/A (Please add your role)"}
            </div>
            <div className={styles.sectionHeader}>Change your role</div>
            <div className={styles.roleInput}>
              <input
                type="text"
                className={styles.roleText}
                placeholder="Change role"
                onChange={(e) => setChangeRole(e.target.value)}
                value={changeRoleVar}
              />
              <button className={styles.roleButton} onClick={changeRole}>
                Change
              </button>
            </div>
          </div>
        </div>

        <div className={styles.bandName}>{bandName}</div>
        <div className={styles.sectionContainer}>
          <div className={styles.profileContainer}>
            <div className={styles.text}>
              <span className={styles.bold}>Band ID:</span> {bandId}
            </div>
          </div>
          <span className={styles.sectionHeader}>Change band's name</span>
          <div className={styles.roleInput}>
            <input
              type="text"
              className={styles.roleText}
              placeholder="Change band's name"
              onChange={(e) => setChangeBandName(e.target.value)}
              value={changeBandNameVar}
            />
            <button className={styles.roleButton} onClick={changeBandName}>
              Change
            </button>
          </div>
        </div>

        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>Member</div>
          {Object.entries(band.roles).map(([key, value]) => (
            <div className={styles.member}>
              <div key={key} className={styles.memberContainer}>
                <img src={value.profilePic} className={styles.memberPic}></img>
                <div className={styles.memberName}>{value.displayName}</div>
              </div>
              <div className={styles.memberRole}>
                {key === user.uid ? role || "N/A" : value.role || "N/A"}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>Song</div>
          <div className={styles.youtubeContainer}>
            <div className={styles.videoContainer}>
              <div className={styles.bold}>Original</div>
              <iframe
                className={styles.video}
                src={originalVideo.split("/watch?v=").join("/embed/")}
              ></iframe>
              <div className={styles.videoInput}>
                <input
                  type="text"
                  className={styles.roleText}
                  placeholder="Change original video"
                  onChange={(e) => setChangeOriginalVideo(e.target.value)}
                  value={changeOriginalVideoVar}
                />
                <button
                  className={styles.videoButton}
                  onClick={changeOriginalVideo}
                >
                  Change
                </button>
              </div>
            </div>
            <div className={styles.videoContainer}>
              <div className={styles.bold}>Rearrange</div>
              <iframe
                className={styles.video}
                src={rearrangeVideo.split("/watch?v=").join("/embed/")}
              ></iframe>
              <div className={styles.videoInput}>
                <input
                  type="text"
                  className={styles.roleText}
                  placeholder="Change rearranged video"
                  onChange={(e) => setChangeRearrangeVideo(e.target.value)}
                  value={changeRearrangeVideoVar}
                />
                <button
                  className={styles.videoButton}
                  onClick={changeRearrangeVideo}
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className={styles.sectionContainer}>
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
                </div>
                <button className={styles.memberAccept}>O</button>
                <button className={styles.memberDelete}>X</button>
              </div>
            ))
          ) : (
            <div className={styles.bold}>🤖 No New Request</div>
          )}
        </div> */}

        <div className={styles.sectionContainer}>
          <div className={styles.profileContainer}>
            <div className={styles.roleInput}>
              <button className={styles.roleButton} onClick={leaveBand}>
                Leave Band
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  return <div className={styles.bandName}>Loading...</div>;
};

export default BandInfo;
