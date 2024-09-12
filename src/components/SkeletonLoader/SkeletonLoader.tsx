import React from "react";
import styles from "./SkeletonLoader.module.css";

const SkeletonLoader: React.FC = () => {
  return (
    <div className={styles.skeletonWrapper}>
      {[...Array(3)].map((_, index) => (
        <div key={index} className={styles.skeletonSection}>
          <div className={styles.skeletonHeader}></div>
          <ul className={styles.skeletonList}>
            {[...Array(3)].map((_, index) => (
              <li key={index} className={styles.skeletonItem}></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
