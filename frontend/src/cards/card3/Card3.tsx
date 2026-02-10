import React, { useState } from "react";
import styles from "./styles.module.css";

interface Card3Props {
  senderName: string;
  receiverName: string;
  note: string;
}

const Card3: React.FC<Card3Props> = ({ senderName, receiverName, note }) => {
  // State to control label visibility
  const [showWhite, setShowWhite] = useState(false);
  const [showMilk, setShowMilk] = useState(false);
  const [showTruffle, setShowTruffle] = useState(false);
  const [showTruffle2, setShowTruffle2] = useState(false);

  return (
    <div className={styles.page}>
      <p className={styles.cite}>Base designed by @lenadesign5043</p>
      <p className={styles.vc}>
        Brought to you by VC++, Vassar Computer Science Club, Spring 2025
      </p>

      <div className={styles.layers}>
        <div className={styles.toFrom}>
          <p className={styles.to}>To: {receiverName}</p>
          <p className={styles.from}>From: {senderName}</p>
        </div>
      </div>

      {/* Wrapper around chocolate box & text labels */}
      <div className={styles.chocolateWrapper}>
        <div className={styles.chocolateBox}>
          <div className={styles.chocs}>
            {/* top-left triggers truffle2 */}
            <div
              className={styles.topLeft}
              onMouseEnter={() => setShowTruffle2(true)}
              onMouseLeave={() => setShowTruffle2(false)}
            ></div>
            {/* top-right triggers white */}
            <div
              className={styles.topRight}
              onMouseEnter={() => setShowWhite(true)}
              onMouseLeave={() => setShowWhite(false)}
            ></div>
            {/* bottom-left triggers milk */}
            <div
              className={styles.bottomLeft}
              onMouseEnter={() => setShowMilk(true)}
              onMouseLeave={() => setShowMilk(false)}
            ></div>
            {/* bottom-right triggers note instead of "Chocolate Truffle" */}
            <div
              className={styles.bottomRight}
              onMouseEnter={() => setShowTruffle(true)}
              onMouseLeave={() => setShowTruffle(false)}
            ></div>
          </div>
          <div className={styles.boxBottom}></div>
          <div className={styles.cover}></div>
        </div>

        {/* Absolutely positioned text container */}
        <div className={styles.textContainer}>
          {showWhite && <div className={styles.label}>White Chocolate</div>}
          {showMilk && <div className={styles.label}>Milk Chocolate</div>}
          {showTruffle && <div className={styles.label}>{note}</div>}
          {showTruffle2 && (
            <div className={styles.label}>Happy Valentine's Day</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card3;
