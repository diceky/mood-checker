import React, { useRef, useEffect } from "react";
import Styles from "./HandPosition.module.css";

const color = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "pink",
  "purple",
  "grey",
  "black",
  "brown",
  "cyan",
  "Lavender",
];

const HandPosition = ({ messages, socketId }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  let handPos = [];

  useEffect(() => {
    contextRef.current = canvasRef.current.getContext("2d");
    canvasRef.current.width = 640;
    canvasRef.current.height = 480;
  }, []);

  if (messages && messages.content.body.x) {
    //reset canvas
    contextRef.current.fillStyle = "white";
    contextRef.current.fillRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    const index = messages.clients.indexOf(messages.content.senderId);
    handPos[index] = {
      x: messages.content.body.x + messages.content.body.width / 3, //should be 2, but looks better with 3
      y: messages.content.body.y + messages.content.body.height / 3,
    };

    for (let i = 0; i < handPos.length; i++) {
      if (handPos[i]) {
        contextRef.current.beginPath();
        contextRef.current.arc(handPos[i].x, handPos[i].y, 10, 0, 2 * Math.PI);
        contextRef.current.fillStyle = color[i % color.length];
        contextRef.current.fill();
      }
    }
  }

  return (
    <div className={Styles.wrapper}>
      <h2 className={Styles.title}>Hand positions</h2>
      <canvas ref={canvasRef} className={Styles.canvas}></canvas>
    </div>
  );
};

export default HandPosition;
