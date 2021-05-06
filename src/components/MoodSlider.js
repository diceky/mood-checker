import React, { useState } from "react";
import Styles from "./MoodSlider.module.css";
import useSocketIo from "../useSocketIo";
import RangeSlider from "react-bootstrap-range-slider";

const MoodSlider = ({ roomId }) => {
  const { messages, sendMessage } = useSocketIo(roomId);
  const [sliderVal, setSliderVal] = useState(50);
  const [emojiVal, setEmojiVal] = useState("😐");

  const handleSlider = (event) => {
    setSliderVal(event.target.value);
    sendMessage("mood", sliderVal);
    if (sliderVal < 20) setEmojiVal("😫");
    else if (sliderVal >= 20 && sliderVal < 40) setEmojiVal("😔");
    else if (sliderVal >= 40 && sliderVal < 60) setEmojiVal("😐");
    else if (sliderVal >= 60 && sliderVal < 80) setEmojiVal("🙂");
    else if (sliderVal >= 80 && sliderVal < 100) setEmojiVal("😆");
  };

  console.log(JSON.stringify(messages));

  return (
    <>
      <p className={Styles.emoji}>{` ${emojiVal} `}</p>
      <RangeSlider value={sliderVal} onChange={handleSlider} variant="dark" />
    </>
  );
};

export default MoodSlider;
