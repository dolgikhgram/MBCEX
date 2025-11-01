import React from 'react';
import s from './SectionExchange.module.css'


type SectionExchangePropsType = {
    number: number;
    title: string;
    description: string;
}

const SectionExchange: React.FC<SectionExchangePropsType> = ({number, title, description}) => {
    return (
        <div className={s.container}>
            <div className={s.contentContainer}>
                <div className={s.number}>{number}</div>
                <div className={s.title}>{title}</div>
                <div className={s.description}>{description}</div>
            </div>
            <div className={s.line}></div>
        </div>
    );
};

export default SectionExchange;
