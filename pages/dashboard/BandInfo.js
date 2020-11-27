import Router from "next/router";
import { useState, useEffect } from "react";
import { firebase } from "../../config/firebase";
import styles from "../../styles/BandInfo.module.css";

const BandInfo = ({ band, status, bandId }) => {
  const db = firebase.firestore();

  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const [bandName, setBandName] = useState("");

  const [originalVideo, setOriginalVideo] = useState("");
  const [rearrangeVideo, setRearrangeVideo] = useState("");

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("band_user"));
    setBandName(band.bandName);
    setOriginalVideo(band.url.original);
    setRearrangeVideo(band.url.rearrange);
    setUser(localStorageUser);
    setRole(band.roles[status[2]].role);
  }, []);

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
          </div>
        </div>

        <div className={styles.bandName}>{bandName}</div>
        <div className={styles.sectionContainer}>
          <div className={styles.profileContainer}>
            <div className={styles.text}>
              <span className={styles.bold}>Band ID:</span> {bandId}
            </div>
          </div>
          <span className={styles.sectionHeader}>
            Thank you for registrating to the competition 🙏
          </span>
          <span className={styles.bold}>
            Stay tuned 🎸 and hope to see you soon! - Organizing team 💻
          </span>
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
                src={
                  originalVideo.match(/youtu.be/)
                    ? originalVideo.split("youtu.be").join("youtube.com/embed/")
                    : originalVideo.split("/watch?v=").join("/embed/")
                }
              ></iframe>
              <div className={styles.videoInput}>
                <input
                  type="text"
                  className={styles.roleText}
                  placeholder="Original Video"
                  onChange={(e) => setChangeOriginalVideo(e.target.value)}
                  value={originalVideo}
                />
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
                  placeholder="Rearranged Video"
                  onChange={(e) => setChangeRearrangeVideo(e.target.value)}
                  value={rearrangeVideo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return <div className={styles.bandName}>Loading...</div>;
};

export default BandInfo;
