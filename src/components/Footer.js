import React from "react";
import Styles from "./Footer.module.css";

const Footer = ({ admin }) => {
  return (
    <div className={admin ? Styles.adminWrapper : Styles.wrapper}>
      Made with love by
      <a
        href="https://daisukeyukita.com"
        className={Styles.link}
        target="_blank"
        rel="noreferrer"
      >
        Dice Yukita
      </a>
    </div>
  );
};

export default Footer;
