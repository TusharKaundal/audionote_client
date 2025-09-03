import React from 'react'

import styles from './Input.module.css'
import clsx from 'clsx'

const Input = (props) => {
    const {
        value,
        disabled = false,
        ...rest
    } = props;

    const rows = value.split("\n").filter((data) => data).length;
    return (
        <textarea
            {...rest}
            type="text"
            rows={rows}
            value={value}
            disabled={disabled}
            className={clsx(
                styles.inputWrapper,
                {
                    [styles.disabled]: disabled,
                }
            )}
        />
    );
};


export default Input;