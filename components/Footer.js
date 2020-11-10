import Link from "next/link";
import styles from "../styles/Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    PDS Band Contest Team | ⌨️ with ❤️ by{" "}
    <Link href="https://github.com/pdscc/bandcontest">
      <a>PDSCC</a>
    </Link>
  </footer>
);

export default Footer;
