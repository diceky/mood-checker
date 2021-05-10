import React, { useState, useRef, useEffect } from "react";
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
    canvasRef.current.width *= 2;
    canvasRef.current.height *= 2;
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

    console.log(`handPos:${JSON.stringify(handPos[index])}`);

    contextRef.current.beginPath();
    contextRef.current.arc(
      handPos[index].x,
      handPos[index].y,
      10,
      0,
      2 * Math.PI
    );
    contextRef.current.fillStyle = color[index % color.length];
    contextRef.current.fill();
  }

  return (
    <div className={Styles.wrapper}>
      <h2 className={Styles.title}>Hand positions</h2>
      <canvas ref={canvasRef} className={Styles.canvas}></canvas>
    </div>
  );
};

export default HandPosition;
