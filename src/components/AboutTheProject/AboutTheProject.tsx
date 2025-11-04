// import React from "react";
import s from "./AboutTheProject.module.css";

const AboutTheProject = () => {
    return (
        <div className={s.container}>
            <div className={s.tittle}>О проекте</div>
            <div className={s.content}>
                <div className={s.section}>
                    <div className={s.bigBoxWrapper}>
                        <div className={s.bigBox}>
                            <div className={s.tittleBoxContainer}>
                                <div className={s.tittleBox}>Быстро и безопасно</div>
                                <img src={`${import.meta.env.BASE_URL}aboutTheProject/shield.svg`} alt={"shield"}/>
                            </div>
                            <div className={s.descriptionBox}>
                                Обмены происходят в комфортном и безопасном офисе в центре городе Курск.
                                Средняя скорость проведения сделки - 15 минут
                            </div>
                        </div>
                    </div>
                    <div className={s.smallBoxWrapper}>
                        <div className={s.smallBox}>
                            <div className={s.tittleSmallBoxContainer}>
                                <div className={s.tittleBox}>Доставка наличных</div>
                                <img src={`${import.meta.env.BASE_URL}aboutTheProject/delivery.svg`} alt={"delivery"}/>
                            </div>
                            <div className={s.descriptionSmallBox}>
                                Для наших клиентов доступна доставка наличных в любую нужную им точку
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.section}>
                    <div className={s.smallBoxWrapper}>
                        <div className={s.smallBox}>
                            <div className={s.tittleSmallBoxContainer}>
                                <div className={s.tittleBox}>VIP обслуживание</div>
                                <img src={`${import.meta.env.BASE_URL}aboutTheProject/premium.svg`} alt={"premium"}/>
                            </div>
                            <div className={s.descriptionSmallBox}>
                                Все наши клиенты получают высочайший сервис по обмену криптовалюты. Персонального
                                менеджера и
                                удовлетворение всех нужных потребностей!
                            </div>
                        </div>
                    </div>
                    <div className={s.bigBoxWrapper}>
                        <div className={s.bigBox}>
                            <div className={s.tittleBoxContainer}>
                                <div className={s.tittleBox}>Чистая криптовалюта</div>
                                <img src={`${import.meta.env.BASE_URL}aboutTheProject/clean.svg`} alt={"clean"}/>
                            </div>
                            <div className={s.descriptionBox}>
                                При сотрудничестве с MBCEX вы получаете максимально чистую валюту или наличные, которые
                                без проблем примет любая биржа или банк!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutTheProject;
