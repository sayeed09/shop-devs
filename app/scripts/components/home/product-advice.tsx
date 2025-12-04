import React from "react";
import { ProductAdvice } from "../../models/home";
interface IProps{
    productAdvice:ProductAdvice;
}
const ProductAdviceComponent=(props:IProps)=>{
    return <>
     <div className='homeMain'>
                            <section className='homeSection'>
                                <a href={props.productAdvice.link} className='d-block'>
                                    <picture>
                                        <source
                                            media="(min-width: 491px)"
                                            srcSet={props.productAdvice.image}
                                        />
                                        <source
                                            media="(max-width: 490px)"
                                            srcSet={props.productAdvice.mobileImage}
                                        />
                                        <img
                                            className="lazyload banner-image-click product-recommendation"
                                            style={{ width: "100%", borderRadius: 6 }}
                                            alt="OZiva Purpose"
                                        />
                                    </picture>
                                </a>
                            </section>
                        </div>
    </>
}
export default ProductAdviceComponent;