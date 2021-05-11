import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Styles from "./Admin.module.css";
import { useParams } from "react-router-dom";
import BarChart from "../components/BarChart";
import HandPosition from "../components/HandPosition";
import useSocketIo from "../useSocketIo";

const Admin = () => {
  const { id } = useParams();
  const [isValid, setIsValid] = useState(false);
  const { messages, chats, socketId } = useSocketIo(id);

  useEffect(() => {
    if (id.length === 6 && !isNaN(id)) {
      setIsValid(true);
    }
  }, [id]);

  return (
    <Layout showBack={false} admin>
      {isValid ? (
        <Row className={Styles.wrapper}>
          <Row>
            <Col md={{ span: 10, offset: 1 }} className={Styles.titleWrapper}>
              <p className={Styles.title}>Admin Dashboard</p>
              <Row>
                <Col md={6}>
                  <p className={Styles.info}>{`Room ID:${id}`}</p>
                </Col>
                <Col md={6}>
                  <p className={Styles.info}>
                    {`Participants: ${
                      messages ? messages.clients.length - 1 : 0
                    }`}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className={Styles.chartWrapper}>
            <Col md={{ span: 10, offset: 1 }}>
              <BarChart roomId={id} messages={messages} socketId={socketId} />
            </Col>
          </Row>
          <Row className={Styles.handWrapper}>
            <Col md={{ span: 10, offset: 1 }}>
              <HandPosition
                roomId={id}
                messages={messages}
                socketId={socketId}
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 10, offset: 1 }} className={Styles.chatWrapper}>
              <h2 className={Styles.chatTitle}>Chat</h2>
              <ol className={Styles.chatList}>
                {chats &&
                  chats.map((chat, i) => (
                    <li key={i} className={Styles.receivedMessage}>
                      {chat.body}
                    </li>
                  ))}
              </ol>
            </Col>
          </Row>
        </Row>
      ) : (
        <Row className={Styles.wrapper}>
          <Col md={{ span: 8, offset: 2 }}>
            <h2>Room ID is invalid</h2>
            <p>Room ID is a 6 digit number</p>
          </Col>
        </Row>
      )}
    </Layout>
  );
};

export default Admin;
