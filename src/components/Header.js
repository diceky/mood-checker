import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Styles from "./Header.module.css";
import { ArrowLeft, XCircle } from "react-feather";

const Header = ({ showBack, admin, onBack, onHelp, showHelp }) => {
  let wrapperClass = "";
  if (admin) {
    wrapperClass = Styles["wrapperGrey"];
  } else if (showHelp) {
    wrapperClass = Styles["wrapperBlue"];
  } else {
    wrapperClass = Styles["wrapper"];
  }

  return (
    <Row className={wrapperClass}>
      {showBack && (
        <Col md={1} style={{ textAlign: "left" }}>
          <ArrowLeft
            size={24}
            color="#252b31"
            className={Styles.icon}
            onClick={onBack}
          />
        </Col>
      )}
      <Col
        md={showBack ? { span: 1, offset: 10 } : { span: 1, offset: 11 }}
        style={{ textAlign: "right" }}
      >
        {showHelp ? (
          <XCircle
            size={30}
            color="#252b31"
            className={Styles.close}
            onClick={onHelp}
          />
        ) : (
          <div className={Styles.helpWrapper} onClick={onHelp}>
            <span className={Styles.help}>?</span>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Header;
