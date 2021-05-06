import React, { useRef, useState } from "react";
import Styles from "./HandTrack.module.css";
import * as handTrack from "handtrackjs";
import useSocketIo from "../useSocketIo";
import Button from "react-bootstrap/Button";

const HandTrack = () => {
  const [isTracking, setIsTracking] = useState(false);
  const cameraRef = useRef();
  const canvasRef = useRef();

  const defaultParams = {
    flipHorizontal: true,
    outputStride: 16,
    imageScaleFactor: 1,
    maxNumBoxes: 20,
    iouThreshold: 0.2,
    scoreThreshold: 0.6,
    modelType: "ssd320fpnlite",
    modelSize: "medium",
    bboxLineWidth: "2",
    fontSize: 17,
  };

  let video, canvas, context;

  const handleClick = async () => {
    video = cameraRef.current;
    canvas = canvasRef.current;
    context = canvas.getContext("2d");

    if (isTracking) {
      await handTrack.stopVideo(video);
      setIsTracking(false);
    } else {
      await handTrack.startVideo(video);
      setIsTracking(true);
      await runDetection();
    }
  };

  const runDetection = async () => {
    const model = await handTrack.load(defaultParams);
    const predictions = await model.detect(video);
    await model.renderPredictions(predictions, canvas, context, video);
    await requestAnimationFrame(runDetection);
  };

  return (
    <div>
      <video
        ref={cameraRef}
        width="400px"
        height="300px"
        className={Styles.video}
      ></video>
      <canvas
        ref={canvasRef}
        width="400px"
        height="300px"
        className={Styles.canvas}
      ></canvas>
      <Button onClick={handleClick}>
        {isTracking ? "Stop camera" : "Start remote high five"}
      </Button>
    </div>
  );
};

export default HandTrack;
