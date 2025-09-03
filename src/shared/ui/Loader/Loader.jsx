import React from "react";
import styles from "./Loader.module.css";
import clsx from "clsx";

const Loader = ({ text = "Loading...", size = "small" }) => {
  return (
    <div className={styles.loaderContainer}>
      <span className={clsx(styles.spinner, styles[size])}></span>
      <span className={styles.pulsatingText}>{text}</span>
    </div>
  );
};

export default Loader;
