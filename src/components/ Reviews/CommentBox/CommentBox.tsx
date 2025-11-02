import React, { useState } from "react";
import s from "./CommentBox.module.css";

type CommentBoxPropsType = {
    imgUser: string;
    text: string;
    name: string;
};

const CommentBox: React.FC<CommentBoxPropsType> = ({ imgUser, text, name }) => {
    const [imgSrc, setImgSrc] = useState(imgUser);
    const fallbackImage = `${import.meta.env.BASE_URL}reviews/userImage.svg`;

    const handleImageError = () => {
        // Если внешнее изображение не загрузилось, используем локальное
        if (imgSrc !== fallbackImage) {
            setImgSrc(fallbackImage);
        }
    };

    return (
        <div className={s.container}>
            <img className={s.img} src={imgSrc} alt={`Аватар ${name}`} onError={handleImageError} />
            <div className={s.text}>{text}</div>
            <div className={s.name}>{name}</div>
        </div>
    );
};

export default CommentBox;
