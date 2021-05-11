import React, { useState, useRef } from "react";
import Layout from "../components/Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Styles from "./Home.module.css";
import { Plus, LogIn, Copy } from "react-feather";
import { Link } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const Home = () => {
  const [roomId, setRoomId] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const copyRoomRef = useRef(null);
  const copyAdminRef = useRef(null);

  const handleCreateRoom = () => {
    const randomSixDigit = Math.floor(Math.random() * 899999 + 100000);
    setRoomId(randomSixDigit);
  };

  const handleCopy = (ref) => {
    navigator.clipboard.writeText(ref.current.childNodes[0].data);
    setIsCopied(true);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {isCopied ? "Copied to clipboard!" : "Copy link"}
    </Tooltip>
  );

  const onBack = () => {
    setRoomId(null);
  };

  return (
    <Layout showBack={roomId ? true : false} onBack={onBack} showHome={false}>
      {!roomId && (
        <>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <p className={Styles.title}>Welcome to Mood Checker</p>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <Button
                variant="dark"
                size="lg"
                block
                className={Styles.button}
                onClick={handleCreateRoom}
              >
                <Plus size={24} color="#f6fafb" className={Styles.icon} />
                Create new room
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <Link to="/room/">
                <Button
                  variant="dark"
                  size="lg"
                  block
                  className={Styles.button}
                >
                  <LogIn size={24} color="#f6fafb" className={Styles.icon} />
                  Join existing room
                </Button>
              </Link>
            </Col>
          </Row>
        </>
      )}
      {roomId && (
        <>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <p className={Styles.subtitle}>
                Your room ID is <span className={Styles.roomId}>{roomId}</span>
              </p>
            </Col>
          </Row>
          <Row className={Styles.shareWrapper}>
            <Col
              xs={{ span: 2, offset: 0 }}
              sm={{ span: 1, offset: 2 }}
              md={{ span: 1, offset: 2 }}
              lg={{ span: 1, offset: 2 }}
            >
              <div className={Styles.linkIndexWrapper}>
                <span className={Styles.linkIndex}>1</span>
              </div>
            </Col>
            <Col xs={10} sm={8} md={3} lg={3}>
              <span className={Styles.linkDescription}>
                Share this link with your workshop participants
              </span>
            </Col>
            <Col
              xs={{ span: 10, offset: 1 }}
              sm={{ span: 8, offset: 2 }}
              md={{ span: 5, offset: 0 }}
              lg={{ span: 5, offset: 0 }}
              className={Styles.linkWrapper}
            >
              <OverlayTrigger
                placement="top"
                delay={{ show: 100, hide: 100 }}
                overlay={renderTooltip}
              >
                <Copy
                  size={24}
                  color="#252b31"
                  className={Styles.linkIcon}
                  onClick={() => handleCopy(copyRoomRef)}
                />
              </OverlayTrigger>
              <span className={Styles.line}></span>
              <a
                href={`https://moodchecker.app/room/${roomId}`}
                target="_blank"
                rel="noreferrer"
                ref={copyRoomRef}
                className={Styles.link}
              >
                {`https://moodchecker.app/room/${roomId}`}
              </a>
            </Col>
          </Row>
          <Row className={Styles.shareWrapper}>
            <Col
              xs={{ span: 2, offset: 0 }}
              sm={{ span: 1, offset: 2 }}
              md={{ span: 1, offset: 2 }}
              lg={{ span: 1, offset: 2 }}
            >
              <div className={Styles.linkIndexWrapper}>
                <span className={Styles.linkIndex}>2</span>
              </div>
            </Col>
            <Col xs={10} sm={8} md={3}>
              <span className={Styles.linkDescription}>
                This is the facilitator page, just for you.
              </span>
            </Col>
            <Col
              xs={{ span: 10, offset: 1 }}
              sm={{ span: 8, offset: 2 }}
              md={{ span: 5, offset: 0 }}
              lg={{ span: 5, offset: 0 }}
              className={Styles.linkWrapper}
            >
              <OverlayTrigger
                placement="top"
                delay={{ show: 100, hide: 100 }}
                overlay={renderTooltip}
              >
                <Copy
                  size={24}
                  color="#252b31"
                  className={Styles.linkIcon}
                  onClick={() => handleCopy(copyAdminRef)}
                />
              </OverlayTrigger>
              <span className={Styles.line}></span>
              <a
                href={`https://moodchecker.app/admin/${roomId}`}
                target="_blank"
                rel="noreferrer"
                ref={copyAdminRef}
                className={Styles.link}
              >{`https://moodchecker.app/admin/${roomId}`}</a>
            </Col>
          </Row>
        </>
      )}
    </Layout>
  );
};

export default Home;
