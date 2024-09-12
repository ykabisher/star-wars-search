import React from "react";
import styles from "./ErrorDisplay.module.css";

interface ErrorDisplayProps {
  error: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  return (
    <p role="alert" className={styles.error}>
      Sorry, there seems to be an issue, please try again later
    </p>
  );
};

export default ErrorDisplay;