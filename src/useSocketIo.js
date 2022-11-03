import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

//const SOCKET_SERVER_URL = "https://moodcheckerserver-dot-tokyo-servers.an.r.appspot.com";
const SOCKET_SERVER_URL = "https://mood-checker-server.herokuapp.com/";

const useSocketIo = (roomId) => {
  const [messages, setMessages] = useState(""); // Sent and received messages
  const [chats, setChats] = useState(""); // Sent and received messages
  const [socketId, setSocketId] = useState(""); // Sent and received messages
  const socketRef = useRef();

  useEffect(() => {
    if (roomId) {
      // Creates a WebSocket connection
      socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
        query: { roomId },
      });

      socketRef.current.on("connect", () => {
        setSocketId(socketRef.current.id);
      });

      // Listens for incoming messages
      socketRef.current.on("new_mood", (message) => {
        setMessages(message);
      });

      socketRef.current.on("new_handPos", (message) => {
        setMessages(message);
      });

      socketRef.current.on("chat_message", (message) => {
        const incomingMessage = {
          ...message,
          ownedByCurrentUser: message.senderId === socketRef.current.id,
        };
        setChats((chats) => [...chats, incomingMessage]);
      });

      // Destroys the socket reference
      // when the connection is closed
      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (event, messageBody) => {
    socketRef.current.emit(event, {
      body: messageBody,
      room: roomId,
      senderId: socketRef.current.id,
    });
  };

  return { messages, chats, sendMessage, socketId };
};

export default useSocketIo;
