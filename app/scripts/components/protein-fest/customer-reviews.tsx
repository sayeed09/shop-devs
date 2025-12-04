import React from 'react'
import { SuperSaleJSON } from '../../utils/supersale/constant';

const CustomerReviews = () => {
    return (
        <div className='reviews-section'>
            <div className='loved-by-thousands-heading'>Loved by thousands</div>
            <div className="review-container">
                <section className="card">
                    {
                        SuperSaleJSON.lovedByThousands.map((review, index) => {
                            return (
                                <div className="card-content" key={index}>
                                    <img alt={review.reviewer} src={review.image} />
                                    <div className="review_content">
                                        <img src={'https://www.oziva.in/cdn/shop/t/112/assets/colon.svg?v=72889513667402851941728365441'} alt="OZiva" />
                                        <div className='review-title'>{review.title}</div>
                                        <div>{review.review}</div>

                                        <div className="reviewer-name">
                                            {review.reviewer}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </section>
            </div>
            <picture className='customer-reviews-platform'>
                <source
                    media="(min-width: 491px)"
                    srcSet="https://www.oziva.in/cdn/shop/files/customer_ratings_desktop_x600.png?v=1641298298"
                />
                <source
                    media="(max-width: 490px)"
                    srcSet="https://www.oziva.in/cdn/shop/files/customer_rating_mob_x400.png?v=1641298289"
                />
                <img
                    src="https://www.oziva.in/cdn/shop/files/customer_ratings_desktop_x600.png?v=1641298298"
                    alt="Customer Reviews"
                    style={{ width: '100%' }}
                />
            </picture>
        </div>

    )
}

export default CustomerReviews;