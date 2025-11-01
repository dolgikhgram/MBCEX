import React, { type ReactNode } from "react";
import s from "./Button.module.css";

type ButtonPropsType = {
    children?: ReactNode;
    onClick?: () => void;
};

const Button: React.FC<ButtonPropsType> = ({ children, onClick }) => {
    return (
        <button className={s.buttonContainer} onClick={onClick}>
            <div className={s.text}>{children}</div>
        </button>
    );
};

export default Button;
