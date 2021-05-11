import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";
import Styles from "./Layout.module.css";
import Help from "./Help";
import { CSSTransition } from "react-transition-group";
import fadeTransition from "./fade.module.css";

const Layout = ({ children, showBack, admin, onBack }) => {
  const [showHelp, setShowHelp] = useState(false);

  const handleHelp = () => {
    setShowHelp((p) => !p);
  };

  return (
    <Container fluid className={Styles.wrapper}>
      <Header
        showBack={showBack}
        admin={admin}
        onBack={onBack}
        onHelp={handleHelp}
        showHelp={showHelp}
      />
      <CSSTransition
        in={showHelp}
        timeout={500}
        unmountOnExit
        classNames={fadeTransition}
      >
        <Help />
      </CSSTransition>
      {children}
      <Footer admin={admin} />
    </Container>
  );
};

export default Layout;
