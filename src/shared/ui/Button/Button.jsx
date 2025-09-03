import React from 'react'

import styles from './Button.module.css'
import clsx from 'clsx'

const Button = (props) => {
    const {
        children,
        size = "small",
        theme = "primary",
        disabled = false,
        icon = null,
        ...rest
    } = props;
    return (
        <button
            {...rest}
            disabled={disabled}
            className={clsx(
                styles.button,
                styles[size],
                styles[theme],
                {
                    [styles.disabled]: disabled,
                }
            )}
        >
            {icon}
            {children}
        </button>
    );
};


export default Button;