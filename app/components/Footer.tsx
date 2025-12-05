import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Collections } from "~/scripts/models/home";

const Footer = ({ concerns, categories }: { concerns: Collections[], categories: Collections[] }) => {
  const navigate = useNavigate();

  function handleNoticeClick(): void {
    throw new Error("Function not implemented.")
  }
  function handleConcernClick(handle: string, isConcern: boolean): void {
    if (isConcern) {
      navigate(`pages/concerns/${handle}`);
    } else {
      navigate(`pages/collections/${handle}`);
    }
  }

  function trackPurposePage(arg0: string, arg1: string, arg2: {}): void {
    throw new Error("Function not implemented.");
  }
  useEffect(() => {
    fetch('/api/cart').then((response) => response.json()).then((data) => {
      console.log(data, 'hahaha')
    })
  }, [])
  // console.log(cart,"ookkok")

  const onTabClick = (redirectLink: string, newTab?: boolean) => {
    if (newTab) {
      window.open(redirectLink);
    } else {
      navigate(redirectLink);
    }
  }

  return <footer className="oz-footer">
    {/*Waves Container*/}
    <div style={{
      transform: "scaleX(-1)", marginBottom: "-2px"
    }}>
      <svg
        className="waves"
        style={{
          transform: "scaleX(-1)"
        }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={1921}
        viewBox="0 0 1921 80"
      >
        <defs>
          <clipPath id="clip-path">
            <rect
              id="Rectangle_2260"
              data-name="Rectangle 2260"
              width={1921}
              height={80}
              transform="translate(19165 -15920)"
              fill="#fff"
              stroke="#707070"
              strokeWidth={1}
            />
          </clipPath>
        </defs>
        <g
          id="Mask_Group_4190"
          data-name="Mask Group 4190"
          transform="translate(-19165 15920)"
        >
          <path
            id="Union_14"
            data-name="Union 14"
            d="M0,618V33.223C221.633-3.985,533.015-18.119,959.486,34.463,1385.077,86.936,1697.13,72.838,1920,35.638v8.587h0V618Z"
            transform="translate(19165 -15920.225)"
            fill="#004141"
          />
        </g>
      </svg>
    </div>

    {/*Waves end*/}
    {/*Waves end*/}
    <div className="oz-footer-content-area">
      <div className="oz-footer-container">
        <div className="oz-footer-row">
          <div className="oz-footer-coll">
            <dl>
              <dt>
                <button
                  onClick={() => onTabClick('/pages/contact-us')}
                  data-href="/pages/contact-us"
                  className="moe-click-footer"
                  data-event-name="footer_contact_us"
                  style={{
                    color: "#ffffff",
                    fontWeight: 600,
                    fontSize: 16,
                    padding: 0,
                    background: "transparent",
                    border: 0
                  }}
                >
                  Contact Us
                </button>
              </dt>
              <dt style={{ marginTop: 16 }}>Shop by Concern</dt>
              <span className="footer-concern">
                {concerns.map((item) =>
                  <dd key={item.handle}>
                    <button
                      data-href="#"
                      className="moe-click-footer"
                      data-event-name="footer_menu_cFitness"
                      onClick={() => handleConcernClick(item.handle, true)}
                    >
                      {item.name}
                    </button>
                  </dd>)}
              </span>
            </dl>
          </div>
          <div className="oz-footer-coll">
            <dl>
              <dt>Shop by Category</dt>
              <span className="footer-categories">
                {categories.map((item) =>
                  <dd key={item.handle}>
                    <button
                      data-href="#"
                      className="moe-click-footer"
                      data-event-name="footer_menu_cFitness"
                      onClick={() => handleConcernClick(item.handle, false)}
                    >
                      {item.name}
                    </button>
                  </dd>)}
              </span>
            </dl>
          </div>
          <div className="oz-footer-coll">
            <dl>
              <dt>Quick Links</dt>
              <dd>
                <button
                  onClick={() => onTabClick('/pages/about-us')}
                  className="moe-click-footer" data-href="/pages/about-us">
                  About us
                </button>
              </dd>
              <dd>
                <button
                  onClick={() => onTabClick('/pages/order-history')}
                  className="moe-click-footer"
                  data-href="/pages/order-history"
                >
                  Track Order
                </button>
              </dd>
              <dd>
                <button
                  onClick={() => onTabClick('/pages/shipping-delivery-policy')}
                  className="moe-click-footer"
                  data-href="/pages/shipping-delivery-policy"
                >
                  Shipping &amp; Delivery
                </button>
              </dd>
              <dd>
                <button
                  onClick={() => onTabClick('/pages/cancellation-refund-policy')}
                  className="moe-click-footer"
                  data-href="/pages/cancellation-refund-policy"
                >
                  Cancellations &amp; refunds
                </button>
              </dd>
              <dd>
                <button
                  onClick={() => onTabClick('/pages/disclaimer-policy')}
                  className="moe-click-footer"
                  data-href="/pages/disclaimer-policy"
                >
                  Disclaimers
                </button>
              </dd>
              <dd>
                <button
                  onClick={() => onTabClick('/policies/terms-of-service')}
                  className="moe-click-footer"
                  data-href="/policies/terms-of-service"
                >
                  Terms
                </button>
              </dd>
              <dd>
                <button
                  onClick={() => onTabClick('/policies/privacy-policy')}
                  className="moe-click-footer"
                  data-href="/policies/privacy-policy"
                >
                  Privacy
                </button>
              </dd>
              <dd className="tooltip-footer">
                <button
                  onClick={() => onTabClick('https://blog.oziva.in/', true)}
                  className="moe-click-footer"
                  data-href="https://blog.oziva.in/"
                >
                  Blog{" "}
                  <span className="new-tab-info">(Opens in a new window)</span>
                </button>
              </dd>
              <dd>
                <button
                  className="moe-click-footer"
                  onClick={() => handleNoticeClick()}
                >
                  Cookie Notice
                </button>
              </dd>
              <dd>
                <button
                  onClick={() => window.location.href = '/sitemap.xml'}
                  className="moe-click-footer" data-href="/sitemap.xml">
                  Sitemap
                </button>
              </dd>
            </dl>
          </div>
          <div className="oz-footer-coll">
            <dl>
              <dt>Show us some love on</dt>
              <div className="oz-footer-social-icons">
                <dd className="tooltip-footer">
                  <button
                    className="moe-click-footer"
                    data-href="https://www.facebook.com/OzivaLife/"
                    onClick={() => onTabClick('https://www.facebook.com/OzivaLife/', true)}
                  >
                    <img
                      src="https://www.oziva.in/cdn/shop/t/94/assets/facebook.svg?v=82467425209571548791660115852"
                      alt="facebook"
                      className="social-icons"
                    />
                    <span className="new-tab-info">(Opens in a new window)</span>
                  </button>
                </dd>
                <dd className="tooltip-footer">
                  <button
                    className="moe-click-footer"
                    data-href="https://www.instagram.com/ozivanutrition/"
                    onClick={() => onTabClick('https://www.instagram.com/ozivanutrition/', true)}
                  >
                    <img
                      src="https://www.oziva.in/cdn/shop/t/94/assets/instagram.svg?v=41762819696535588601660115855"
                      alt="instagram"
                      className="social-icons"
                    />
                    <span className="new-tab-info">(Opens in a new window)</span>
                  </button>
                </dd>
                <dd className="tooltip-footer">
                  <button
                    className="moe-click-footer"
                    data-href="https://twitter.com/ozivanutrition"
                    onClick={() => onTabClick('https://twitter.com/ozivanutrition', true)}
                  >
                    <img
                      src="https://www.oziva.in/cdn/shop/t/94/assets/twitter.svg?v=107800515526241220741660115853"
                      alt="twitter"
                      className="social-icons"
                    />
                    <span className="new-tab-info">(Opens in a new window)</span>
                  </button>
                </dd>
                <dd className="tooltip-footer">
                  <button
                    className="moe-click-footer"
                    data-href="https://www.youtube.com/channel/UCO7-tvmIJbKi87Rl6w-1yAg"
                    onClick={() => onTabClick('https://www.youtube.com/channel/UCO7-tvmIJbKi87Rl6w-1yAg', true)}
                  >
                    <img
                      src="https://www.oziva.in/cdn/shop/t/94/assets/youtube.svg?v=64699240822098651581660115852"
                      alt="youtube"
                      className="social-icons"
                    />
                    <span className="new-tab-info">(Opens in a new window)</span>
                  </button>
                </dd>
              </div>
            </dl>
            <dl>
              <dt>Pay securely using</dt>
              <div className="oz-footer-payment-icons">
                <dd>
                  <img
                    src="https://www.oziva.in/cdn/shop/t/94/assets/Visa_icon.svg?v=168014811369956546131660115853"
                    alt="Pay securely using"
                    className="pay-securely-icons"
                  />
                </dd>
                <dd>
                  <img
                    src="https://www.oziva.in/cdn/shop/t/94/assets/Maestro_icon.svg?v=146135144884156816011660115857"
                    alt="Pay securely using"
                    className="pay-securely-icons"
                  />
                </dd>
                <dd>
                  <img
                    src="https://www.oziva.in/cdn/shop/t/94/assets/Master_icon.svg?v=119610046657673058911660115854"
                    alt="Pay securely using"
                    className="pay-securely-icons"
                  />
                </dd>
                <dd>
                  <img
                    src="https://www.oziva.in/cdn/shop/t/94/assets/Rupay_icon.svg?v=123310486457486109471660115858"
                    alt="Pay securely using"
                    className="pay-securely-icons"
                  />
                </dd>
                <dd>
                  <img
                    src="https://www.oziva.in/cdn/shop/t/94/assets/Wallet_icon.svg?v=55017293913681178371660115856"
                    alt="Pay securely using"
                    className="pay-securely-icons"
                  />
                </dd>
                <dd>
                  <img
                    src="https://www.oziva.in/cdn/shop/t/94/assets/UPI_icon.svg?v=34857215366485751791660115853"
                    alt="Pay securely using"
                    className="pay-securely-icons"
                  />
                </dd>
                <dd>
                  <img
                    src="https://www.oziva.in/cdn/shop/t/94/assets/Netbanking_icon.svg?v=77046115357357261001660115852"
                    alt="Pay securely using"
                    className="pay-securely-icons"
                  />
                </dd>
                <dd>
                  <img
                    src="https://www.oziva.in/cdn/shop/t/94/assets/COD_icon.svg?v=174520274294850992101660115857"
                    alt="Pay securely using"
                    className="pay-securely-icons"
                  />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div >
    {/*Waves Container*/}
    <div style={{
      transform: "rotate(180deg)", marginTop: "-2px"
    }}>
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={1921}
        viewBox="0 0 1921 80"
      >
        <defs>
          <clipPath id="clip-path">
            <rect
              id="Rectangle_2260"
              data-name="Rectangle 2260"
              width={1921}
              height={80}
              transform="translate(19165 -15920)"
              fill="#fff"
              stroke="#707070"
              strokeWidth={1}
            />
          </clipPath>
        </defs>
        <g
          id="Mask_Group_4190"
          data-name="Mask Group 4190"
          transform="translate(-19165 15920)"
        >
          <path
            id="Union_14"
            data-name="Union 14"
            d="M0,618V33.223C221.633-3.985,533.015-18.119,959.486,34.463,1385.077,86.936,1697.13,72.838,1920,35.638v8.587h0V618Z"
            transform="translate(19165 -15920.225)"
            fill="#004141"
          />
        </g>
      </svg>
    </div>

    {/*Waves end*/}
    <div className="oz-footer-bottom-sec" >
      <div className="oz-footer-subscribe">
        <h3>Subscribe to our mailing list</h3>
        <label htmlFor="Subscribe_mail_list" className="input-group">
          <input
            type="text"
            className="oz-subscribe-input"
            placeholder="Enter your email address"
            id="Subscribe_mail_list"
          />
          <button
            type="submit"
            className="oz-subscribe-button"
            name="commit"
            id="Subscribe"
          >
            SUBSCRIBE
          </button>
        </label>
      </div>
      <div className="oz-footer-ac">
        <h4>Affiliated Certificates</h4>
        <div className="oz-ac-images">
          <picture>
            <source
              media="(max-width: 420px)"
              srcSet="https://www.oziva.in/cdn/shop/t/106/assets/food_safety_system_100x100.png?v=27031595887673089281667893923"
            />
            <source
              media="(min-width: 421px)"
              srcSet="https://www.oziva.in/cdn/shop/t/106/assets/food_safety_system_140x140.png?v=27031595887673089281667893923"
            />
            <img
              className="banner-image-click ls-is-cached lazyloaded"
              style={{ width: "100%", borderRadius: 6 }}
              alt="Food Safety System"
            />
          </picture>
          <picture>
            <source
              media="(max-width: 420px)"
              srcSet="https://www.oziva.in/shop/t/10/assets/gmp_100x100.png?v=122328073574427152851660203494"
            />
            <source
              media="(min-width: 421px)"
              srcSet="https://www.oziva.in/cdn/shop/t/10/assets/gmp_140x140.png?v=122328073574427152851660203494"
            />
            <img
              className="banner-image-click ls-is-cached lazyloaded"
              style={{ width: "100%", borderRadius: 6 }}
              alt="GMP Certified certificate"
            />
          </picture>
          <picture>
            <source
              media="(max-width: 420px)"
              srcSet="https://cdn.shopify.com/s/files/1/2393/2199/files/fssai_100x100.png?v=1707118753"
            />
            <source
              media="(min-width: 421px)"
              srcSet="https://cdn.shopify.com/s/files/1/2393/2199/files/fssai_140x140.png?v=1707118753"
            />
            <img
              className="banner-image-click ls-is-cached lazyloaded"
              style={{ width: "100%", borderRadius: 6 }}
              alt="Food Safety and Standards Authority of India."
            />
          </picture>
        </div>
      </div>
    </div >

    <div className="oz-footer-copyright">
      Copyright © 2025, OZiva. All rights reserved.
    </div>

  </footer >

}
export default Footer;



