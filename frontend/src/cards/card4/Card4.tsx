import React from "react";
import styles from "./styles.module.css";

interface Card4Props {
  senderName: string;
  receiverName: string;
  note: string;
}

const Card4: React.FC<Card4Props> = ({ senderName, receiverName, note }) => {

  return (
    <div className={styles.page}>
      <p className={styles.cite}>Base designed by @lenadesign5043</p>
      <p className={styles.vc}>
        Brought to you by VC++, Vassar Computer Science Club, Spring 2025
      </p>

      {/* "To" and "From" section positioned above the card */}
      <div className={styles.toFrom}>
        <p className={styles.to}>To: {receiverName}</p>
        <p className={styles.from}>From: {senderName}</p>
      </div>

      {/* Valentine's Day Card */}
      <div className={styles.valentinesDayCard}>
        <input type="checkbox" id="cardToggle" className={styles.checkBox} />
        <label htmlFor="cardToggle" className={styles.open}></label>

        {/* Card Front */}
        <div className={styles.cardFront}>
          <div className={styles.note}>Click to Open</div>
        </div>

        {/* Card Inside */}
        <div className={styles.cardInside}>
          {/* Right side content */}
          <div className={styles.textOne}>Happy</div>
          <div className={styles.heart}></div>
          <div className={styles.smile}></div>
          <div className={styles.eyes}></div>
        </div>
        <p className={styles.message}>{note}</p>
      </div>
    </div>
  );
};

export default Card4;
