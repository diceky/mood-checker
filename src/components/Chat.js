import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Styles from "./Chat.module.css";
import Button from "react-bootstrap/Button";

const Chat = ({ roomId, chats, sendMessage, socketId }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessage = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage("chat_message", newMessage);
    setNewMessage("");
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={Styles.wrapper}>
      <p className={Styles.title}>Share your honest thoughts</p>
      <p className={Styles.subtitle}>(We promise, it's 100% anonymous)</p>
      <Row className={Styles.chatWrapper}>
        <ol className={Styles.chatList}>
          {chats &&
            chats.map((chat, i) => (
              <li
                key={i}
                className={
                  chat.ownedByCurrentUser
                    ? Styles.myMessage
                    : Styles.receivedMessage
                }
              >
                {chat.body}
              </li>
            ))}
        </ol>
      </Row>
      <Row className={Styles.inputWrapper}>
        <Col sm={{ span: 10, offset: 1 }} md={{ span: 10, offset: 0 }}>
          <textarea
            value={newMessage}
            onChange={handleNewMessage}
            placeholder="Write message..."
            className={Styles.input}
            onKeyDown={onKeyDown}
          />
        </Col>
        <Col sm={{ span: 10, offset: 1 }} md={{ span: 2, offset: 0 }}>
          <Button
            onClick={handleSendMessage}
            className={Styles.button}
            variant="dark"
            size="lg"
          >
            Send
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Chat;
