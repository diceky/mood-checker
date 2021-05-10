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
  const { messages, socketId } = useSocketIo(id);

  useEffect(() => {
    if (id.length === 6 && !isNaN(id)) {
      setIsValid(true);
    }
  }, [id]);

  console.log(messages);

  return (
    <Layout>
      {isValid ? (
        <Row>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <BarChart roomId={id} messages={messages} socketId={socketId} />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <HandPosition
                roomId={id}
                messages={messages}
                socketId={socketId}
              />
            </Col>
          </Row>
        </Row>
      ) : (
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h2>Invalid Room ID</h2>
          </Col>
        </Row>
      )}
    </Layout>
  );
};

export default Admin;
