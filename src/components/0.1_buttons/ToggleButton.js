import React, { useState, useEffect } from "react";
import styles from "./CustomButton.module.css";
import _COLOR from "../../data/color/l3_categorical_color_palette.json";

const COLOR_STYLE = {
  0: styles.button_0,
  1: styles.button_1,
  2: styles.button_2,
  3: styles.button_3,
  4: styles.button_4,
  5: styles.button_5,
  6: styles.button_6,
  7: styles.button_7,
  8: styles.button_8,
  9: styles.button_9,
  10: styles.button_10,
  11: styles.button_11,
  12: styles.button_12,
  13: styles.button_13,
  14: styles.button_14,
  15: styles.button_15,
  16: styles.button_16,
  17: styles.button_17,
  18: styles.button_18,
  19: styles.button_19,
  20: styles.button_20,
  21: styles.button_21,
  22: styles.button_22,
  23: styles.button_23,
  24: styles.button_24,
  25: styles.button_25,
  26: styles.button_26,
};

const ToggleButton = ({
  isSelected,
  toggle,
  buttonText,
  positionStyle,
  colorIndex = 0,
  largeFont = true,
}) => {
  return (
    <button
      className={`${styles.button} ${COLOR_STYLE[colorIndex]} ${positionStyle}`}
      onClick={toggle}
      style={
        isSelected
          ? {
              color:
                colorIndex == 0 ||
                colorIndex == 1 ||
                colorIndex == 8 ||
                colorIndex == 11
                  ? "black"
                  : "white",
              background: _COLOR[parseInt(colorIndex)],
            }
          : {}
      }
    >
      <div className={largeFont ? styles.largetext : styles.smalltext}>
        {buttonText}
      </div>
    </button>
  );
};

export default ToggleButton;
