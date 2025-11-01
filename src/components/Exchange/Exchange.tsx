import s from "./Exchange.module.css";
import SectionExchange from "./SectionExchange/SectionExchange.tsx";

const Exchange = () => {
    return (
        <div className={`${s.container} reveal-up`}>
            <div className={`${s.title} reveal`}>Как совершить обмен</div>
            <div className={`${s.content} reveal`}>
                <SectionExchange
                    number={1}
                    title={"Оставить заявку на обмен"}
                    description={
                        "Выбирайте направление обмена, введите сумму заявки и ваш телеграм аккаунт для связи. Нажимайте на кнопку обменять"
                    }
                />
                <SectionExchange
                    number={2}
                    title={"Выбрать удобное время посещения офиса"}
                    description={
                        "С вами свяжется наш менеджер, договорится о курсе обмена, времени встречи в офисе и закажет для вас пропуск в здание"
                    }
                />
                <SectionExchange
                    number={3}
                    title={"Совершить обмен в офисе"}
                    description={
                        "В назначенное время вас будут ожидать в офисе обменника и проведут сделку. Для совершения обмена не нужно отправлять деньги или криптовалюту заранее, сделка пройдет при личной встрече"
                    }
                />
            </div>
        </div>
    );
};

export default Exchange;
