import s from "./Reviews.module.css";
import CommentBox from "./CommentBox/CommentBox.tsx";
import type { ReviewsType } from "../../types/reviews.ts";

const reviews: ReviewsType = [
    {
        imgUser: `${import.meta.env.BASE_URL}reviews/userImage.svg`,
        name: "Mike Taylor",
        text: "'On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.'",
    },
    {
        imgUser: `${import.meta.env.BASE_URL}reviews/userImage.svg`,
        name: "Mike Taylor",
        text: "'On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.'",
    },
    {
        imgUser: `${import.meta.env.BASE_URL}reviews/userImage.svg`,
        name: "Mike Taylor",
        text: "'On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.'",
    },
    {
        imgUser: `${import.meta.env.BASE_URL}reviews/userImage.svg`,
        name: "Mike Taylor",
        text: "'On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.'",
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
