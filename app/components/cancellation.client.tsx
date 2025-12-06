
import React, { lazy, useEffect, useState } from "react";

const CancellationV1 = () => {
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
                            <h1>Cancellation &amp; Refund Policy</h1>
                        </div>
                        <div className="rte">
                            <section className="main staticPage">
                                <section className="main staticPage">
                                    <div className="container">
                                        <div>
                                            <p>
                                                <b>What is the general return policy on OZiva Products?</b>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    In an unfortunate event that you are not satisfied with
                                                    our products, we give an option to inform us within 14
                                                    days of the date of receipt of products.
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    Only few points to consider to have hassle free
                                                    experience:-
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    You can initiate the return process by mailing us at{" "}
                                                    <a href="mailto:community@oziva.in">community@oziva.in</a>
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    Conditions for product to be eligible for return/refund:
                                                </span>
                                            </p>
                                            <ol>
                                                <li style={{ fontWeight: 400 }}>
                                                    <span style={{ fontWeight: 400 }}>Defective product</span>
                                                </li>
                                                <li style={{ fontWeight: 400 }}>
                                                    <span style={{ fontWeight: 400 }}>
                                                        The product is not of the characteristics or features as
                                                        advertised or as agreed to
                                                    </span>
                                                </li>
                                                <li style={{ fontWeight: 400 }}>
                                                    <span style={{ fontWeight: 400 }}>
                                                        Unused and in its original new condition, if not
                                                        defective or damaged.
                                                    </span>
                                                </li>
                                                <li style={{ fontWeight: 400 }}>
                                                    <span style={{ fontWeight: 400 }}>
                                                        Products which are not damaged or broken by customers
                                                    </span>
                                                </li>
                                                <li style={{ fontWeight: 400 }}>
                                                    <span style={{ fontWeight: 400 }}>
                                                        Products which are not tampered and Serial/UPC number is
                                                        intact.
                                                    </span>
                                                </li>
                                                <li style={{ fontWeight: 400 }}>
                                                    <span style={{ fontWeight: 400 }}>
                                                        Product returned back in its original packaging
                                                        including box, original invoice and price tags.
                                                    </span>
                                                </li>
                                                <li style={{ fontWeight: 400 }}>
                                                    <span style={{ fontWeight: 400 }}>
                                                        If the product is delivered at a date later than the
                                                        delivery schedule.
                                                    </span>
                                                </li>
                                            </ol>
                                            <ul>
                                                <li style={{ fontWeight: 400 }}>
                                                    <span style={{ fontWeight: 400 }}>
                                                        If in case the courier is found ineligible for refund,
                                                        we will send the product back to you.
                                                    </span>
                                                </li>
                                                <li style={{ fontWeight: 400 }}>
                                                    <span style={{ fontWeight: 400 }}>
                                                        You will have an option to take refund or exchange the
                                                        product, as per your request.&nbsp;
                                                    </span>
                                                </li>
                                                <li style={{ fontWeight: 400 }}>
                                                    <span style={{ fontWeight: 400 }}>
                                                        In case you opt for refund, for payment made by card we
                                                        will refund in the same bank account. For COD orders or
                                                        any other mode we will initiate NEFT in the registered
                                                        name of customer and bank details provided.&nbsp;
                                                    </span>
                                                </li>
                                            </ul>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    Please note that replacements are subject to availability
                                                    of particular products.
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    Returns/replacements not applicable on orders delivered
                                                    outside India.
                                                </span>
                                            </p>
                                            <p>
                                                <b>
                                                    What should I do if I receive a Defective item or not
                                                    something which I ordered?
                                                </b>
                                            </p>
                                            Under such circumstances you can inform us within the 48 hours
                                            of receipt of the product. You can inform us by writing a mail
                                            on community@oziva.in&nbsp;and share relevant pictures
                                            <br />
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    Product should be returned in original packaging along
                                                    with original box, price tags and invoice.&nbsp;
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    As soon as we receive your items back, we inspect it to
                                                    ensure everything is present and is in original conditions
                                                    and then we issue the full refund or exchange with similar
                                                    or different item as per your request.
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    Please note that replacements are subject to availability
                                                    of particular products.
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    Payment made by card will be refunded on the same bank
                                                    account and&nbsp;
                                                </span>
                                                <span style={{ fontWeight: 400 }}>otherwise </span>
                                                <span style={{ fontWeight: 400 }}>
                                                    an online transfer will be issued on the&nbsp;bank
                                                    details&nbsp;shared by the customer.
                                                </span>
                                            </p>
                                            <p>
                                                <strong>
                                                    What are the payment methods available on OZiva?
                                                    <br />
                                                </strong>
                                                Payment methods currently supported on OZiva are :
                                                Credit/Debit Cards, UPI, Wallets, Netbanking, and Cash on
                                                Delivery
                                            </p>
                                            <p>
                                                <b>
                                                    There are zero hidden charges when you make a purchase on
                                                    OZiva. The prices stated in the final cart is exactly what
                                                    you pay.{" "}
                                                </b>
                                                <span style={{ fontWeight: 400 }}>
                                                    Payments can be remitted through net banking, credit card,
                                                    debit card, UPI (“
                                                </span>
                                                <b>Digital Payments</b>
                                                <span style={{ fontWeight: 400 }}>
                                                    ”) and cash on delivery. Digital Payments are recommended
                                                    to ensure faster processing of your order. Further, cash
                                                    on delivery is not applicable for orders delivered outside
                                                    India.{" "}
                                                </span>
                                                <span style={{ fontWeight: 400 }}>
                                                    Payment details are not handled by OZiva and Payment
                                                    gateway partners are PCI/DSS compliant. Transactions via
                                                    debit /Credit card/ Net banking - Payments will be
                                                    redirected to your bank's secure page for entering your
                                                    online password (issued by your bank) to complete the
                                                    payment.
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    Queries with regard to payments can be redirected to
                                                </span>
                                                <span style={{ fontWeight: 400 }}> community@oziva.in</span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>&nbsp;</span>
                                            </p>
                                            <p>
                                                <b>What is your category specific policy for return?</b>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>Nutrition-</span>
                                                <span style={{ fontWeight: 400 }}>
                                                    &nbsp;Our nutrition products should be received in
                                                    original packaging as you received. Product should be
                                                    sealed as original, opened or used boxes will not be
                                                    accepted as returns. Factors such as stomach upset,
                                                    headache, flavour like/dislike would not be applicable for
                                                    return. Please consult with your doctor before buying the
                                                    products.&nbsp;
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>Merchandise-</span>
                                                <span style={{ fontWeight: 400 }}>
                                                    &nbsp;Return policy is only applicable in case of issue
                                                    with size or if you receive the product in a damaged
                                                    condition.
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>Service-</span>
                                                <span style={{ fontWeight: 400 }}>
                                                    &nbsp;This category is not applicable for any refund.
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    We are here to serve you best. Your satisfaction is our
                                                    priority and in case you have any query then please do
                                                    mail us on{" "}
                                                    <a href="mailto:community@oziva.in">community@oziva.in</a>
                                                </span>
                                            </p>
                                            <p>
                                                <b>
                                                    Are there any processing fees for replacements or returns?
                                                </b>
                                                <span style={{ fontWeight: 400 }}>
                                                    <br />
                                                </span>
                                                <span style={{ fontWeight: 400 }}>
                                                    The customer may be liable to pay a processing fee in case
                                                    of returns or replacements under certain scenarios -
                                                    including, but not limited to requesting a change of
                                                    flavor/product/variant or any requests of similar nature.
                                                    The processing fee amount will be conveyed to the customer
                                                    at the time of taking the request for replacement or
                                                    return and the request will be processed further after the
                                                    payment for the processing fee has been processed.
                                                </span>{" "}
                                                <span style={{ fontWeight: 400 }}>
                                                    In case of errors in the product such as incorrect
                                                    product/variant/flavor shipped to the customer, there will
                                                    be no processing fee applicable on requests for returns or
                                                    replacement.
                                                </span>{" "}
                                                <span style={{ fontWeight: 400 }}>
                                                    Returns/refunds for orders delivered outside India shall
                                                    not be accepted
                                                </span>
                                            </p>
                                            <p>&nbsp;</p>
                                            <p>
                                                <b>
                                                    I need to return an item, how do I arrange for a
                                                    pickup?&nbsp;
                                                </b>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    You can Contact us to initiate a return. You will receive
                                                    a call explaining the process, once you have initiated a
                                                    return.
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    Wherever possible we will facilitate the pick-up of the
                                                    item through our courier partners. In case, the pick-up
                                                    cannot be arranged by us, you can return the item through
                                                    a third-party courier service and we will return the
                                                    courier costs of Rs 100 for any courier charges borne by
                                                    you to send the product to us.
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    Returns/refunds may not be applicable for orders delivered
                                                    outside India.
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>&nbsp;</span>
                                            </p>
                                            <p>
                                                <b>
                                                    What are the modes of refund available after cancellation
                                                    or return?
                                                </b>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    For payment made by:
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    Debit/Credit or any other Card
                                                </span>
                                                <span style={{ fontWeight: 400 }}>
                                                    - We will refund in the same bank account.
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    Cash on delivery or any other mode
                                                </span>
                                                <span style={{ fontWeight: 400 }}>
                                                    -&nbsp;An online transfer would be made using bank account
                                                    details shared by the customer
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>&nbsp;</span>
                                            </p>
                                            <p>
                                                <b>
                                                    In case of a refund, in how many days will the money be
                                                    refunded?
                                                </b>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    The money will be refunded according to the guidelines
                                                    stated above in 14 working days from the date refund is
                                                    approved.
                                                </span>
                                            </p>
                                            <p>&nbsp;</p>
                                            <p>
                                                <b>
                                                    In how many days will the product be delivered in the
                                                    product replacement process?
                                                </b>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    The product will be replaced and delivered to you in 14
                                                    working days after your request for replacement of product
                                                    is approved.
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>&nbsp;</span>
                                            </p>
                                            <p>
                                                <b>
                                                    I have placed an order but due to some reason I need to
                                                    cancel it. Can I do that?
                                                </b>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    If we receive a cancellation notice and the order has not
                                                    been processed/ approved by us, we shall cancel the order
                                                    and refund the entire amount to User within 14 working
                                                    days.
                                                </span>
                                            </p>
                                            <p>
                                                <span style={{ fontWeight: 400 }}>
                                                    We will not be able to cancel orders that have already
                                                    been processed, it is pertinent to note that we have the
                                                    full right to decide whether an order has been processed
                                                    or not.&nbsp;
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </section>
                            <section className="main staticPage">
                                <div className="container">
                                    <br />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>



    </>
}
export default CancellationV1;
