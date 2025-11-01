import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

type ModalPropsType = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
};

const Modal: React.FC<ModalPropsType> = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") onClose();
        };

        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className={s.backdrop} aria-modal="true" role="dialog" onMouseDown={onClose}>
            <div className={s.modal} onMouseDown={(e) => e.stopPropagation()}>
                <div className={s.title}>{title}</div>
                <div className={s.content}>{children}</div>
                <button className={s.closeBtn} onClick={onClose} aria-label="Закрыть"></button>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
