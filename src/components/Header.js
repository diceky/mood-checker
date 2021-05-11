import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Styles from "./Header.module.css";
import { ArrowLeft } from "react-feather";

const Header = ({ showBack, admin, onBack }) => {
  return (
    <Row className={admin ? Styles.adminWrapper : Styles.wrapper}>
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
        <div className={Styles.helpWrapper}>
          <span className={Styles.help}>?</span>
        </div>
      </Col>
    </Row>
  );
};

export default Header;
