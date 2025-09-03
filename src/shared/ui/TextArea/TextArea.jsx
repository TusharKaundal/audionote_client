import React from "react";

import styles from "./TextArea.module.css";

const TextArea = (props) => {
  const { value, idx, ...rest } = props;
  return (
    <textarea
      {...rest}
      type="text"
      rows={4}
      id={`transcript_${idx}`}
      value={value}
      
      className={styles.textAreaWrapper}
    />
  );
};

export default TextArea;
