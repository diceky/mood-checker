import React, { useRef, useState, useEffect } from "react";
import Styles from "./HandTrack.module.css";
import * as handTrack from "handtrackjs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Howl } from "howler";
import clapSound1 from "../sounds/normal.mp3";
import clapSound2 from "../sounds/yeahman.mp3";
import clapSound3 from "../sounds/yeehaw.mp3";

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

const path = new Path2D(
  "m8.56 24.011c-.276 0-.5-.224-.5-.5v-.87c0-.309-.094-.606-.271-.86l-1.007-1.437c-.587-.84-1.084-1.723-1.477-2.623-.495-1.133-1.563-3.273-3.167-4.878-.055-.055-.096-.122-.121-.195-.022-.065-.201-.654.214-1.23.444-.615 1.373-.928 2.76-.928 1.296 0 2.32.836 3 1.629v-9.13c0-1.103.897-2 2-2 .412 0 .794.125 1.112.339.274-.779 1.017-1.339 1.888-1.339s1.614.56 1.888 1.339c.318-.214.701-.339 1.112-.339 1.103 0 2 .897 2 2v2.269c.294-.171.636-.269 1-.269 1.152 0 2.049.897 2.049 2v7l-.091 1.942c-.101 2.136-.916 4.21-2.296 5.841-.22.26-.342.592-.342.933v.805c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-.805c0-.577.206-1.138.578-1.579 1.239-1.463 1.971-3.324 2.061-5.241l.09-1.919v-6.977c0-.552-.449-1-1-1-.6 0-1.049.448-1.049 1v6c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-10c0-.552-.449-1-1-1s-1 .448-1 1v10c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-11c0-.552-.449-1-1-1s-1 .448-1 1v11c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-10c0-.552-.449-1-1-1s-1 .448-1 1v10.75c0 .231-.16.433-.385.486s-.458-.056-.562-.264c-.013-.024-1.258-2.473-3.053-2.473-1.404 0-1.825.351-1.94.501-.074.096-.091.193-.092.262 1.572 1.616 2.639 3.64 3.262 5.068.367.841.831 1.665 1.38 2.45l1.007 1.437c.295.423.452.919.452 1.434v.87c0 .277-.224.501-.5.501z"
);

const handTrackWidth = 640;
const handTrackHeight = 480;

const HandTrack = ({ roomId, messages, sendMessage, socketId }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [radioValue, setRadioValue] = useState(0);

  const cameraRef = useRef();
  const canvasRef = useRef();
  const contextRef = useRef();
  const myHandPos = useRef();
  const isTrackingRef = useRef(false);

  const defaultParams = {
    flipHorizontal: true,
    outputStride: 16,
    imageScaleFactor: 1,
    maxNumBoxes: 4,
    iouThreshold: 0.2,
    scoreThreshold: 0.6,
    modelType: "ssd320fpnlite",
    modelSize: "small",
    bboxLineWidth: "2",
    fontSize: 16,
  };

  const loadHowl = (src, volume) => {
    return new Howl({
      src: [src],
      volume: volume,
      onplay: function () {
        setIsSoundPlaying(true);
      },
      onend: function () {
        setIsSoundPlaying(false);
      },
    });
  };

  const howl1 = loadHowl(clapSound1, 0.7);
  const howl2 = loadHowl(clapSound2, 0.7);
  const howl3 = loadHowl(clapSound3, 0.5);
  const sound = [howl1, howl2, howl3];

  let video, canvas;

  const stopTracking = async () => {
    await handTrack.stopVideo(video);
    isTrackingRef.current = await false;
    await setIsTracking(false);
    //reset canvas
    if(canvasRef.current !== null){
      await canvasRef.current
      .getContext("2d")
      .clearRect(0, 0, handTrackWidth, handTrackHeight);
    }
  };

  const handleClick = async () => {
    video = cameraRef.current;
    canvas = canvasRef.current;
    contextRef.current = canvas.getContext("2d");

    if (isTracking) {
      await stopTracking();
    } else {
      await handTrack.startVideo(video);
      isTrackingRef.current = true;
      setIsTracking(true);
      await runDetection();
    }
  };

  const runDetection = async () => {
    const model = await handTrack.load(defaultParams);
    const predictions = await model.detect(video);
    await predictions.forEach((item) => {
      if (item.label === "open" || item.label === "pinch") {
        myHandPos.current = {
          x: item.bbox[0],
          y: item.bbox[1],
          width: item.bbox[2],
          height: item.bbox[3],
        };
        sendMessage("handPos", myHandPos.current);
      }
    });
    if (isTrackingRef.current) {
      await model.renderPredictions(
        predictions,
        canvas,
        contextRef.current,
        video
      );
      await model.dispose();
      await requestAnimationFrame(runDetection);
    } else {
      await model.dispose();
    }
  };

  useEffect(() => {
    //on mount
    canvasRef.current.width = handTrackWidth;
    canvasRef.current.height = handTrackHeight;

    return () => {
      //on unmount
      stopTracking();
    };
  }, []);

  let handPos = [];

  if (messages && messages.content.body.x) {
    if (messages.content.senderId !== socketId) {
      const index = messages.clients.indexOf(messages.content.senderId);
      handPos[index] = {
        x: messages.content.body.x + messages.content.body.width / 3, //should be 2, but looks better with 3
        y: messages.content.body.y + messages.content.body.height / 3,
      };

      if (isTracking) {
        canvasRef.current.getContext("2d").beginPath();
        canvasRef.current.getContext("2d").fillStyle =
          color[index % color.length];
        canvasRef.current
          .getContext("2d")
          .translate(handPos[index].x, handPos[index].y);
        canvasRef.current.getContext("2d").scale(5, 5);
        canvasRef.current.getContext("2d").lineWidth = 0.8;
        canvasRef.current.getContext("2d").fill(path);
      } else {
        // showing hand SVG not working, so showing circle instead
        canvasRef.current
          .getContext("2d")
          .clearRect(0, 0, handTrackWidth, handTrackHeight);
        canvasRef.current.getContext("2d").beginPath();
        canvasRef.current
          .getContext("2d")
          .arc(handPos[index].x, handPos[index].y, 20, 0, 2 * Math.PI);
        canvasRef.current.getContext("2d").fillStyle =
          color[index % color.length];
        canvasRef.current.getContext("2d").fill();
      }

      if (isTracking && myHandPos.current) {
        const myHandPosCenterX =
          myHandPos.current.x + myHandPos.current.width / 3;
        const myHandPosCenterY =
          myHandPos.current.y + myHandPos.current.height / 3;
        const distance = Math.sqrt(
          Math.pow(myHandPosCenterX - handPos[index].x, 2) +
            Math.pow(myHandPosCenterY - handPos[index].y, 2)
        );

        if (distance < 40) {
          if (!isSoundPlaying) {
            sound[radioValue].play();
          }
        }
      }
    }
  }

  return (
    <div className={Styles.wrapper}>
      <p className={Styles.title}>Care for a high five?</p>
      <div className={Styles.videoWrapper}>
        <video ref={cameraRef} className={Styles.video}></video>
        <canvas ref={canvasRef} className={Styles.canvas}></canvas>
      </div>
      <Form>
        <div key={`inline-radio`} className={Styles.radioWrapper}>
          <Form.Check
            inline
            defaultChecked
            label="Normal clap"
            type="radio"
            name="clapSound"
            value={0}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
            className={Styles.radioInput}
          />
          <Form.Check
            inline
            label='"Yeah Man"'
            type="radio"
            name="clapSound"
            value={1}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
            className={Styles.radioInput}
          />
          <Form.Check
            inline
            label='"Yee Haw!"'
            type="radio"
            name="clapSound"
            value={2}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
            className={Styles.radioInput}
          />
        </div>
      </Form>
      <Button
        onClick={handleClick}
        className={Styles.button}
        variant="dark"
        size="lg"
      >
        {isTracking ? "Stop" : "Start"}
      </Button>
    </div>
  );
};

export default HandTrack;
