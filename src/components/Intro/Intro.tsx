import Button from "../../ui/Button/Button";
import s from "./Intro.module.css";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import {openTelegramSupport} from "../../utils/header.ts";

const Intro = () => {
    return (
        <div className={s.container}>
            <div className={s.content}>
                <div className={s.titleContainer}>
                    <div className={s.title}>
                        {`Безопасный и надёжный обменник
                            криптовалюты на наличные`}
                    </div>
                    <div className={s.description}>
                        Купить и продать криптовалюту в офисе USDT, BTC, ETH, Доллары и Рубли
                    </div>
                </div>
                <div className={s.lottieWrapper}>
                    <DotLottieReact
                        speed={1}
                        src={`${import.meta.env.BASE_URL}lottie/LOADING.json`}
                        loop
                        autoplay
                        className={s.lottie}
                    />
                </div>
                <div className={s.btnWrapper}>
                    <Button onClick={openTelegramSupport}>
                        <div className={s.btnContainer}>
                            <div>Оставить заявку</div>
                            <img src={`${import.meta.env.BASE_URL}button/tgBlack.svg`} alt="tgBlack"/>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Intro;
