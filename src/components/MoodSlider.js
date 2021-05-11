import React, { useState } from "react";
import Styles from "./MoodSlider.module.css";
import RangeSlider from "react-bootstrap-range-slider";

const MoodSlider = ({ roomId, sendMessage }) => {
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

  return (
    <div className={Styles.wrapper}>
      <p className={Styles.title}>How are you feeling?</p>
      <p className={Styles.emoji}>{` ${emojiVal} `}</p>
      <div className={Styles.sliderWrapper}>
        <span className={Styles.labelLeft}>Awesome!</span>
        <span className={Styles.labelRight}>Very low</span>
        <RangeSlider
          value={sliderVal}
          onChange={handleSlider}
          variant="dark"
          className={Styles.slider}
          tooltipStyle={{ marginTop: "30px" }}
        />
      </div>
    </div>
  );
};

export default MoodSlider;
