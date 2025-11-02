import React, { type ReactNode } from "react";
import s from "./Button.module.css";

type ButtonPropsType = {
    children?: ReactNode;
    onClick?: () => void;
    size?: "large" | "medium";
};

const Button: React.FC<ButtonPropsType> = ({ children, onClick, size = "large" }) => {
    const sizeClass = size === "medium" ? s.medium : s.large;

    return (
        <button className={`${s.buttonContainer} ${sizeClass}`} onClick={onClick}>
            <div className={s.text}>{children}</div>
        </button>
    );
};

export default Button;
