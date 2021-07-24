import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Styles from "./Help.module.css";
import logo from "../images/github.png";

const Help = () => {
  return (
    <Row className={Styles.wrapper}>
      <Col md={{ span: 8, offset: 2 }}>
        <p className={Styles.title}>
          The remote era has allowed us to
          <br />
          leverage <span className={Styles.highlight}>anonymity</span>.
        </p>
        <p className={Styles.content}>
          There are many things we lost through our shift to the remote world.
          But there are also some things that we gained, one of which is
          <span className={Styles.orange}> anonymity</span>.
        </p>
        <p className={Styles.content}>
          Mood Checker is a tool for remote workshop facilitators to fully
          leverage the power of anonymity, through real time collection of{" "}
          <span className={Styles.orange}> mood, chat and more</span>.
        </p>
        <p className={Styles.content}>
          Create a room, hand out the link to the participants, and get instant
          access to the world's first{" "}
          <span className={Styles.orange}> truly honest feedback</span>.
        </p>
        <div className={Styles.line}></div>
        <div className={Styles.noteWrapper}>
          <span className={Styles.note}>
            Created by IDEO's interaction designer{" "}
            <a
              href="https://daisukeyukita.com"
              className={Styles.link}
              target="_blank"
              rel="noreferrer"
            >
              Dice Yukita
            </a>
          </span>
          <a
            href="https://github.com/diceky/mood-checker"
            target="_blank"
            rel="noreferrer"
          >
            <img src={logo} alt="github" className={Styles.github} />
          </a>
        </div>
      </Col>
    </Row>
  );
};

export default Help;
