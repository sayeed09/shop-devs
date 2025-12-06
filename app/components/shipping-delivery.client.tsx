
import React, { lazy, useEffect, useState } from "react";

const ShippingDeliveryV1 = () => {
    const [state, setState] = useState(false)
    useEffect(() => {
        setState(true)
    }, [])
    return <>
        <main className="main-content js-focus-hidden" id="MainContent" tabIndex={-1}>
            {/*<div class="messenger_float_custom" style="position: fixed !important; width: 100%; max-width: 130px; z-index: 99; right: 2%; bottom: 2%; transform: none !important;"><a href="https://goo.gl/pTJgtW"><img src="https://fitcircle.in/fitcircle/images/messageus.png" style="width: 100%;" alt="OZiva | No.1 Choice for Clean, Plant based Nutrition & Beauty Products" /></a></div>*/}
            <div className="page-width">
                <div className="grid">
                    <div className="grid__item medium-up--five-sixths medium-up--push-one-twelfth">
                        <div className="section-header text-center">
                            <h1>Shipping &amp; Delivery Policy</h1>
                        </div>
                        <div className="rte">
                            <section className="main staticPage">
                                <div className="container">
                                    <div>
                                        <em>
                                            {" "}
                                            <b> </b>
                                        </em>
                                        <b>How does the delivery process work?</b>
                                        <b> </b>
                                        <span style={{ fontWeight: 400 }}>
                                            Once our system processes your order, your products are
                                            inspected thoroughly to ensure they are in a perfect
                                            condition.{" "}
                                        </span>
                                        <span style={{ fontWeight: 400 }}>
                                            After they pass through the final round of quality check, they
                                            are packed and handed over to our trusted delivery partner.{" "}
                                        </span>
                                        <span style={{ fontWeight: 400 }}>
                                            Our delivery partners then bring the package to you at the
                                            earliest possibility. In case, they are unable to reach your
                                            provided address or at a suitable time, they will contact you
                                            to resolve the issue.
                                        </span>
                                    </div>
                                    <p>&nbsp;</p>
                                    <div>
                                        <b>What are the delivery charges? </b>
                                        <span style={{ fontWeight: 400 }}>
                                            Delivery charges may apply on certain products/services and
                                            would be communicated at the time of order processing.{" "}
                                        </span>
                                        <span style={{ fontWeight: 400 }}>
                                            International Shipping – International clients do not pay
                                            import duties levied by their government to OZiva. Clients
                                            will have to pay the customs duty to the courier provider in
                                            order to receive the product.
                                        </span>
                                        <p>&nbsp;</p>
                                        <b>
                                            What is the range of locations to which Oziva ships their
                                            products?
                                        </b>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 400 }}>
                                            OZiva ships throughout India.
                                        </span>
                                    </div>
                                    <div>
                                        <br />
                                        <b>Does OZiva ship outside India?</b>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 400 }}>
                                            At present OZiva ships to India only. However, we are working
                                            on starting international delivery to many other countries, so
                                            stay tuned!
                                        </span>
                                    </div>
                                    <div>
                                        <br />
                                        <b>Products cannot be shipped to my area, why?</b>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 400 }}>
                                            Although we ship to maximum places in different parts of
                                            India, we are continuously working on increasing our reach to
                                            make our products easily available to everyone in different
                                            locations. But whether the order can or cannot be delivered to
                                            your address also depends on:-
                                        </span>
                                        <span style={{ fontWeight: 400 }}>
                                            Whether our trusted delivery partner can deliver at your
                                            address.
                                        </span>
                                        <span style={{ fontWeight: 400 }}>
                                            Legal Restrictions, if any, on shipping particular products to
                                            your location.
                                        </span>
                                        <span style={{ fontWeight: 400 }}>
                                            The availability of reliable courier partners in your
                                            location.
                                        </span>
                                    </div>
                                    <div>
                                        <br />
                                        <b>What are the estimated delivery times?</b>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 400 }}>
                                            We deliver your orders within 2-5 business working days&nbsp;
                                            (excluding Sundays and public holidays)
                                        </span>
                                        <span style={{ fontWeight: 400 }}>
                                            As soon as we dispatch in A-1 and A-2 Metros (New Delhi,
                                            Mumbai, Kolkata, Bengaluru, Chennai, Pune, Ahmedabad and
                                            Hyderabad). For the rest of the cities, we deliver between 2-7
                                            business days. Delivery by ground takes a little longer than
                                            air couriers. Ground-shipped orders are delivered to you
                                            between 5-7 business days post-dispatch. Deliveries to very
                                            remote locations may take up to 7 business days or longer,
                                            depending on the location's geographical constraints.
                                        </span>
                                        <span style={{ fontWeight: 400 }}>
                                            For addresses outside India, shipping may take 5-15 business
                                            days.
                                        </span>
                                        <p>&nbsp;</p>
                                        <b>
                                            Is it possible to request for change the delivery address at
                                            any point of time once the order has been placed?
                                            <span style={{ fontWeight: 400 }}>&nbsp;</span>
                                        </b>
                                        <b>Order has been placed but not dispatched.</b>
                                        <span style={{ fontWeight: 400 }}>
                                            Once the order has been placed but not dispatched that means
                                            we have received the confirmation and your order is in our
                                            warehouse where we are working to get it dispatched. So as
                                            your order is still not dispatched, you need to contact our
                                            customer service team on community@oziva.in as soon as
                                            possible for the changes in the order. Please note for
                                            security reasons we will require you to answer a few security
                                            questions before we can make any changes to your order.
                                        </span>
                                    </div>
                                    <p>&nbsp;</p>
                                    <div>
                                        <b>Order has been placed and dispatched.</b>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 400 }}>
                                            Once your order has been placed and dispatched, we would be
                                            unable to redirect the order to the secondary delivery
                                            address. We apologize for any inconvenience caused and our
                                            policies are made to provide a better shopping experience for
                                            all our customers.
                                        </span>
                                        <span style={{ fontWeight: 400 }}>
                                            If our shipper is unable to ship the order at your provided
                                            address then the order is automatically returned to our
                                            warehouse and processed as return. &nbsp;
                                        </span>
                                        <span style={{ fontWeight: 400 }}>
                                            For any further query write to&nbsp; us on{" "}
                                        </span>
                                        <a href="mailto:community@oziva.in">
                                            <span style={{ fontWeight: 400 }}>community@oziva.in</span>
                                        </a>
                                        <span style={{ fontWeight: 400 }}>.</span>
                                        <p>&nbsp;</p>
                                        <b>My order has been shipped. Now how can I track it?</b>
                                        <span style={{ fontWeight: 400 }}>
                                            Once your order has been dispatched, you will receive an email
                                            with the details of the tracking number and the courier
                                            company that is processing your order.
                                        </span>
                                        <span style={{ fontWeight: 400 }}>
                                            You can track the status of your package via{" "}
                                        </span>
                                        <a href="https://www.oziva.in/pages/track-your-order">
                                            <span style={{ fontWeight: 400 }}>
                                                https://www.oziva.in/pages/track-your-order
                                            </span>
                                        </a>
                                        <span style={{ fontWeight: 400 }}>
                                            {" "}
                                            , after&nbsp; 24 hours after your order is dispatched from our
                                            warehouse .
                                        </span>
                                        <p>
                                            <span style={{ fontWeight: 400 }}>
                                                Following are some our trusted courier partners:
                                            </span>
                                        </p>
                                        <span style={{ fontWeight: 400 }}>Ecom</span>
                                        <span style={{ fontWeight: 400 }}> Express - </span>
                                        <a href="http://www.ecomexpress.in/">
                                            <span style={{ fontWeight: 400 }}>
                                                http://www.ecomexpress.in/
                                            </span>
                                        </a>
                                        <br />
                                        <span style={{ fontWeight: 400 }}>Pickrr: </span>
                                        <a href="https://oziva.pickrr.com/#/?tracking_id=">
                                            <span style={{ fontWeight: 400 }}>
                                                https://oziva.pickrr.com/#/?tracking_id=
                                            </span>
                                        </a>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 400 }}>Shiprocket:&nbsp;</span>
                                        <a href="https://shiprocket.co/tracking/">
                                            <span style={{ fontWeight: 400 }}>
                                                https://shiprocket.co/tracking/
                                            </span>
                                            <span style={{ fontWeight: 400 }}>
                                                <br />
                                                <br />
                                            </span>
                                        </a>
                                        <b>
                                            Your order will be shipped in multiple shipments? What does
                                            this mean?
                                        </b>
                                        <span style={{ fontWeight: 400 }}>
                                            Don’t worry! This is a completely normal situation. This would
                                            mean that different parts of your order may have simply been
                                            shipped from our different warehouse locations. Rest assured,
                                            you will only have to pay the shipping/CoD charge if
                                            applicable, on the first package you receive.
                                        </span>
                                        <span style={{ fontWeight: 400 }}>
                                            International orders, in most instances will be shipped in
                                            their entirety as one shipment.
                                        </span>
                                        <span style={{ fontWeight: 400 }}>
                                            <br />
                                            <br />
                                        </span>
                                        <b>
                                            I have placed an order, but may not be able to receive it due
                                            to unexpected circumstances. Can you hold the delivery until I
                                            can receive it?&nbsp;
                                        </b>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 400 }}>
                                            If you placed order is not yet dispatched then please to
                                            contact our customer team on
                                        </span>
                                        <span style={{ fontWeight: 400 }}>
                                            &nbsp;community@oziva.in
                                        </span>
                                        <span style={{ fontWeight: 400 }}>
                                            &nbsp;as soon as possible for the changes. Please note for
                                            security reasons we will require you to answer a few security
                                            questions before we can make any changes to your order. But if
                                            your order is already dispatched then we are sorry we won’t be
                                            able to hold your delivery.
                                        </span>
                                        <p>&nbsp;</p>
                                        <b>
                                            Are there any hidden charges such as Octroi or Sales Tax when
                                            I make the payment?
                                        </b>
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: 400 }}>
                                            There are no such hidden charges when you buy any product from
                                            us. The prices listed on our website during checkout&nbsp; are
                                            final and inclusive of all taxes. &nbsp;
                                        </span>
                                        <span style={{ fontWeight: 400 }}>
                                            Shipping charges may apply for addresses outside India and
                                            will be communicated at the time of order processing.
                                        </span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>



    </>
}
export default ShippingDeliveryV1;
