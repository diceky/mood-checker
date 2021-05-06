import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Styles from "./Header.module.css";

const Header = () => {
  return (
    <Row className={Styles.wrapper}>
      <Col md={{ span: 1, offset: 11 }} style={{ textAlign: "right" }}>
        <div className={Styles.helpWrapper}>
          <span className={Styles.help}>?</span>
        </div>
      </Col>
    </Row>
  );
};

export default Header;
