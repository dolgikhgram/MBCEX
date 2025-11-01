import React from "react";
import s from "./CommentBox.module.css";

type CommentBoxPropsType = {
    imgUser: string;
    text: string;
    name: string;
};

const CommentBox: React.FC<CommentBoxPropsType> = ({ imgUser, text, name }) => {
    return (
        <div className={s.container}>
            <img className={s.img} src={imgUser} alt={"avatar"} />
            <div className={s.text}>{text}</div>
            <div className={s.name}>{name}</div>
        </div>
    );
};

export default CommentBox;
