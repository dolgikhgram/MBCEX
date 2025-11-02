import s from "./Reviews.module.css";
import CommentBox from "./CommentBox/CommentBox.tsx";
import type { ReviewsType } from "../../types/reviews.ts";

// Функция для генерации аватара по имени
const getAvatarUrl = (name: string): string => {
    // Используем UI Avatars API для генерации аватаров с инициалами
    // Цвет фона соответствует фирменному цвету MBCEX (#ffcc00)
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ffcc00&color=000&size=128&bold=true&font-size=0.5`;
};

const reviews: ReviewsType = [
    {
        imgUser: getAvatarUrl("Александр Петров"),
        name: "Александр Петров",
        text: "Пользуюсь MBCEX уже полгода. Обменял больше 50 сделок, все прошли без проблем. Курс всегда выгодный, задержек почти нет. Поддержка работает оперативно, отвечают быстро. Рекомендую!",
    },
    {
        imgUser: getAvatarUrl("Мария Козлова"),
        name: "Мария Козлова",
        text: "Обменяла здесь крипту впервые и осталась довольна. Интерфейс простой, все понятно даже новичку. Перевела BTC на карту, деньги пришли через 15 минут. Буду обращаться еще.",
    },
    {
        imgUser: getAvatarUrl("Дмитрий Соколов"),
        name: "Дмитрий Соколов",
        text: "Лучший обменник, с которым я работал. Низкие комиссии, высокая скорость обработки. Делал крупные переводы ETH - все прошло гладко. Безопасность на высоте, лимиты адекватные.",
    },
    {
        imgUser: getAvatarUrl("Елена Волкова"),
        name: "Елена Волкова",
        text: "Постоянно пользуюсь MBCEX для обмена USDT. Очень удобно и быстро. Ни разу не было проблем с выплатами. Курс обновляется в реальном времени. Отличный сервис!",
    },
];

const Reviews = () => {
    return (
        <div className={s.container}>
            <div className={s.title}>Отзывы</div>
            <div className={s.commentContainer}>
                {reviews.map((review) => {
                    return <CommentBox imgUser={review.imgUser} name={review.name} text={review.text} />;
                })}
            </div>
        </div>
    );
};

export default Reviews;

// <div className={s.section}>
//     <CommentBox
//         imgUser={"./reviews/userImage.svg"}
//         name={"Mike taylor"}
//         text={
//             '"On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no."'
//         }
//     />
//     <CommentBox
//         imgUser={"./reviews/userImage.svg"}
//         name={"Mike taylor"}
//         text={
//             '"On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no."'
//         }
//     />
// </div>
// <div className={s.section}>
//     <CommentBox
//         imgUser={"./reviews/userImage.svg"}
//         name={"Mike taylor"}
//         text={
//             '"On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no."'
//         }
//     />
//     <CommentBox
//         imgUser={"./reviews/userImage.svg"}
//         name={"Mike taylor"}
//         text={
//             '"On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no."'
//         }
//     />
// </div>
