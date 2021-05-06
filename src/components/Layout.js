import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";
import Styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <Container fluid className={Styles.wrapper}>
      <Header />
      {children}
      <Footer />
    </Container>
  );
};

export default Layout;
