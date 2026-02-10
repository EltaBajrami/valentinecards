import React, { useState } from "react";
import styles from "./styles.module.css";

interface Card2Props {
  senderName: string;
  receiverName: string;
  note: string;
}

const Card2: React.FC<Card2Props> = ({ senderName, receiverName, note }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.page}>
      <p className={styles.cite}>Base designed by @lenadesign5043</p>
      <p className={styles.vc}>
        Brought to you by VC++, Vassar Computer Science Club, Spring 2025
      </p>
      <div
        className={styles.container}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Valentine's Card with conditional animation */}
        <div className={styles.valentines}>
          <div className={styles.envelope}></div>
          <div className={styles.front}>
            <div className={styles.toFrom}>
              <p className={styles.from}>From: {senderName}</p>
              <p className={styles.to}>To: {receiverName}</p>
            </div>
          </div>

          <div className={`${styles.card} ${isHovered ? styles.lift : ""}`}>
            <div className={styles.text}>
              Happy
              <br /> Valentine's
              <br /> Day!
            </div>
            <div className={styles.heart}></div>

            <div className={styles.hearts}>
              <div className={styles.one}></div>
              <div className={styles.two}></div>
              <div className={styles.three}></div>
              <div className={styles.four}></div>
              <div className={styles.five}></div>
            </div>
          </div>
        </div>
        <div className={styles.shadow}></div>\
        <p className={styles.message}>{note}</p>
      </div>
    </div>
  );
};

export default Card2;
