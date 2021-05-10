import React, { useState } from "react";
import Layout from "../components/Layout";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Styles from "./Room.module.css";
import { useParams, Link } from "react-router-dom";
import MoodSlider from "../components/MoodSlider";
import HandTrack from "../components/HandTrack";
import useSocketIo from "../useSocketIo";

const Room = () => {
  const { id } = useParams();
  const [roomId, setRoomId] = useState("");
  const [validated, setValidated] = useState(false);
  const { messages, sendMessage, socketId } = useSocketIo(id);

  const handleRoomIdChange = (event) => {
    const input = event.target.value;
    setRoomId(input);
    if (input.length === 6 && !isNaN(input)) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  };

  const handleSubmit = () => {};

  return (
    <Layout>
      {id ? (
        <Row>
          <h2>{`Room ID is ${id}`}</h2>
          <Col md={{ span: 5, offset: 1 }}>
            <MoodSlider
              roomId={id}
              messages={messages}
              sendMessage={sendMessage}
              socketId={socketId}
            />
          </Col>
          <Col md={5}>
            <HandTrack
              roomId={id}
              messages={messages}
              sendMessage={sendMessage}
              socketId={socketId}
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={handleRoomIdChange}
                isInvalid={!validated}
                style={{
                  border: 0,
                  outline: 0,
                  backgroundColor: "transparent",
                  fontSize: "64px",
                  background: "transparent",
                  borderBottom: "2px solid #252b31",
                }}
                className={Styles.inputField}
              />
              <Form.Control.Feedback type="invalid">
                Room ID must be a 6 digit number.
              </Form.Control.Feedback>
            </InputGroup>
          </Col>
          <Col md={{ span: 4, offset: 4 }}>
            <Link to={`/room/${roomId}`}>
              <Button
                variant="dark"
                size="lg"
                block
                className={Styles.button}
                disabled={!validated}
                onClick={handleSubmit}
              >
                Go to room
              </Button>
            </Link>
          </Col>
        </Row>
      )}
    </Layout>
  );
};

export default Room;
