import { useState, useEffect } from "react";
import { firebase } from "../../config/firebase";
import styles from "../../styles/BandInfo.module.css";

const BandInfo = ({ band, userState }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("band_user"));
    setUser(localStorageUser);
  }, []);

  console.log(band, userState);

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
              <span className={styles.bold}>Role:</span> {"hello"}
            </div>
            <div className={styles.sectionHeader}>Change Role</div>
            <div className={styles.roleInput}>
              <input
                type="text"
                name="hello"
                className={styles.roleText}
                placeholder="Change Role"
              />
              <button className={styles.roleButton}>Change</button>
            </div>
          </div>
        </div>

        <div className={styles.bandName}>{band.bandName}</div>
        <div className={styles.sectionContainer}>
          <span className={styles.sectionHeader}>Change Band's Name</span>
          <div className={styles.roleInput}>
            <input
              type="text"
              name="hello"
              className={styles.roleText}
              placeholder="Change Band's Name"
            />
            <button className={styles.roleButton}>Change</button>
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
              <div className={styles.memberRole}>{value.role}</div>
              <button className={styles.memberDelete}>X</button>
            </div>
          ))}
        </div>

        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>Song</div>
          <div className={styles.youtubeWrapper}>
            <div>
              <div className={styles.bold}>Original</div>
              <iframe
                className={styles.video}
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              ></iframe>
            </div>
            <div>
              <div className={styles.bold}>Rearrange</div>
              <iframe
                className={styles.video}
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              ></iframe>
            </div>
          </div>
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
                </div>
                <div className={styles.memberRole}>{value.role}</div>
                <button className={styles.memberAccept}>O</button>
                <button className={styles.memberDelete}>X</button>
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
