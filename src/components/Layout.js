import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";
import Styles from "./Layout.module.css";

const Layout = ({ children, showBack, admin, onBack }) => {
  return (
    <Container fluid className={Styles.wrapper}>
      <Header showBack={showBack} admin={admin} onBack={onBack} />
      {children}
      <Footer admin={admin} />
    </Container>
  );
};

export default Layout;
