
export const starReviewNumber = (averageRating:number)=>{

let emptyReview = 0;
let fillReview = Number(averageRating.toFixed());
let decimalPoint = (averageRating - Math.floor(averageRating)) * 100;


let partialReview = 0;


if (decimalPoint > 15) {
  partialReview = 1;
  if (decimalPoint > 50) {
    fillReview - 1
  }
} else {
  partialReview = 0;
}

emptyReview = 5 - fillReview;


return {
    filled: fillReview,
    partial: partialReview,
    empty: emptyReview,
  };
}



