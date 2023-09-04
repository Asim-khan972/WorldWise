import styles from "./Logo.module.css";
import Logo23 from "../logo.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <Link to="/">
        <img src={Logo23} alt="WorldWise logo" className={styles.logo} />;
      </Link>
      ;
    </>
  );
}

export default Logo;
