import Link from "next/link";
import styles from "../styles/Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    ©2020 PDS Band Contest Team <br />
    ⌨️ with ❤️ by PDS Computer Club <br />
    <Link href="https://github.com/pdscc/bandcontest">
      <a style={{ color: "yellow" }}>Source Code Available on Github</a>
    </Link>
  </footer>
);

export default Footer;
