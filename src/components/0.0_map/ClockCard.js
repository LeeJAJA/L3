import styles from "./Sandbox.module.css";
import { stateStore } from "../../stores";

import VotingCard from "./VotingCard";
import ClockSliders from "../0.5_slider/ClockSliders.js";

const ClockCard = ({ controller = "" }) => {
  const { time } = stateStore;

  let hour = parseInt(time / 3600) % 12;
  let minute = parseInt(Math.round(time % 3600) / 60);
  let isAM = parseInt(time / 3600) < 12;

  let content = (
    <div className={styles.col}>
      <div
        className={`${styles.clockText} ${styles.flexCol} ${styles.amen_list} `}
      >
        {/* <div>{parseInt(time/3600)}:{parseInt(Math.round(time%3600)/60)}:{parseInt(Math.round(time%60))}</div> */}
        <div>
          {hour}:{minute.toString().padStart(2, "0")} {isAM ? "AM" : "PM"}
        </div>
      </div>
      <ClockSliders />
      <div>{controller}</div>
    </div>
  );

  return (
    <VotingCard
      title="Visualization"
      subTitle="Time of the Day"
      content={content}
    />
  );
};

export default ClockCard;
