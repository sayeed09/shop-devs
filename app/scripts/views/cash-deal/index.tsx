import { useState } from 'react'
import '../../scss/import/_cash-deal.scss';

const CashDealView = () => {
    return (
        <>
            <div id="shopify-section-oziva_cash_and_deals" className="shopify-section">
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            "\n  @media only screen and (max-width: 749px){\n    #PageContainer {\n        background-position-y: bottom;\n        background-repeat: no-repeat;\n        background-size: contain;\n        background-image: url(//cdn.shopify.com/s/files/1/2393/2199/t/10/assets/mobile-curve-lighter.png?v=1254675…);\n        background-attachment: fixed;\n    }\n  }\n  @media only screen and (min-width: 750px){\n    #PageContainer {\n        background-position-y: bottom;\n        background-repeat: no-repeat;\n        background-size: contain;\n        background-image: url(//cdn.shopify.com/s/files/1/2393/2199/t/10/assets/web_curve.png?v=1643582…);\n        background-attachment: fixed;\n    }\n  }\n/*   .cross-btn-svg > svg{\n  \tbackground-color: white;\n    border-radius: 50px;\n    height: 35px;\n    width: 35px;\n  } */\n  .earned{\n  \tbackground-color: #6bbd58;\n    color: white;\n    border-radius: 6px;\n    font-size: 14px;\n    height: 25px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n.overlayCD {\n    position: fixed;\n    display: none;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: rgba(0, 0, 0, 0.5);\n    z-index: 999;\n    cursor: pointer;\n}\n@media screen and (min-width: 491px){\n  .modal-cnt {\n      top: 35%;\n  }\n}\n@media screen and (max-width: 490px){\n\t.modal-cnt{\n    \tbottom: 0;\n\t}\n}\n.modal-cnt {\n    position: fixed;\n    width: 100%;\n    padding: 5px;\n}\n.modal-wrapper {\n    background-color: white;\n    max-width: 420px;\n    margin: auto;\n    border-radius: 6px;\n}\n  .header-moch{\n  \tpadding: 10px;\n    background-color: #F1FCEE;\n    font-size: 16px;\n    border-radius: 10px;\n  }\n  .item-moch{\n  \tdisplay: flex;\n    justify-content: space-between;\n    padding: 10px;\n    border-top: 1px solid #F1FCEE;\n  }\n  .item-moch > div:first-child{\n  \tflex:7.5;\n  }\n  .item-moch > div:last-child{\n  \tflex:2.5;\n  }\n  .body-ocb{\n  \tdisplay:flex;\n    padding:10px;\n  }\n  .image-ocb{\n  \tflex: 0.3;\n  }\n  .text-ocb{\n  \tflex:0.7;\n  }\n  .body-hte{\n  \tpadding: 10px\n  }\n  .item-hte{\n  \tdisplay:flex;\n    padding: 5px 0;\n  }\n  .item-hte :first-child{\n  \tflex: 0.07;\n  }\n  .item-hte :last-child{\n  \tflex: 1;\n  }\n  .item-number{\n  \tbackground-color: #6bbd58;\n    color: white;\n    border-radius: 50px;\n    width: 20px;\n    height: 20px;\n    font-size: 12px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  .body-faq{\n  \tpadding: 10px;\n  }\n  .item-faq{\n  \tpadding: 5px 0;\n  }\n  ::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    background-color: #F5F5F5;\n  }\n\n  ::-webkit-scrollbar {\n    width: 6px;\n    background-color: #F5F5F5;\n  }\n  ::-webkit-scrollbar-thumb {\n    background-color: #6bbd58;\n  }\n  .oziva_cash_icon > svg{\n  \theight: 66px;\n  }\n"
                    }}
                />
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            "\n  .cd_profile_cnt button{\n  \twidth: 210px;\n    height: 40px;\n    color: white;\n    border: none;\n    border-radius: 6px;\n    font-size: 14px;\n  }\n  .carousel_cell-hero_image_desktop:before {\n    display: block;\n    color: white;\n  }\n  .carousel_cell-hero_image_desktop {\n      width: 100%;\n      background: white;\n  }  \n  .carousel_cell-hero_image_mobile:before {\n      display: block;\n      color: white;\n  }\n  .carousel_cell-hero_image_mobile {\n      width: 100%;\n      background: white;\n  }\n  @media only screen and (min-width: 491px) {\n    .carousel_hero_image_mobile{\n      display: none;\n    }\n  }\n  @media only screen and (max-width: 490px) {\n    .carousel_hero_image_desktop{\n      display: none;\n    }\n    .cd_profile_cnt button{\n    \twidth: 100% !important;\n    }\n  }\n"
                    }}
                />
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            "\n  .cd_profile_wrapper, .cd_cnt_wrapper{\n  \tmax-width: 750px;\n    margin: auto;\n    background: #FFFFFF 0% 0% no-repeat padding-box;\n    box-shadow: 0px 1px 12px #c8e6c8cc;\n    border: none;\n    border-radius: 6px;\n    \n  }\n  .armin{\n  \tfont-family:'manrope-regular';\n  }\n  .armin-semibold {\n    font-family: 'manrope-bold';\n  }\n  .roboto{\n  \tfont-family:'Roboto';\n  }\n  .part1{\n    letter-spacing: 0px;\n    color: #333030;\n  }\n  .line{\n    border-bottom:1px solid #F0FAF0;\n  }\n  .padding-10-15{\n  \tpadding: 10px 15px;\n  }\n  \n  .loggedout{\n  \tdisplay:flex;\n  }\n  .loggedout .left{\n  \tflex: 0.7\n  }\n  .loggedout .right{\n  \tflex: 0.3;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  \n  #loggedin{\n  \tdisplay: none;\n  }\n  .loggedin{\n  \tdisplay: flex;\n  }\n  .loggedin > div{\n  \tflex: 0.5;\n  }\n  .balance-cnt{\n  \tdisplay:flex;\n    justify-content: flex-start;\n    padding: 5px;\n    border: 1px solid #006E5A;\n    border-radius: 6px;\n    background-color: #006E5A08;\n    text-align: center;\n  }\n  .balance-cnt > div:first-child{\n  \tpadding-right:10px;\n  }\n  .balance-cnt > div:last-child{\n  \tflex: 1;\n  }\n  .balance-wrapper{\n  \tdisplay: flex;\n    justify-content: space-between;\n  }\n  .divider{\n  \tpadding: 0 10px 20px;\n    display:flex;\n    align-items: center;\n  }\n  .balance-item{\n  \ttext-align: center;\n    margin: auto;\n  }\n  .bold{\n  \tfont-weight: 600;\n  }\n  .green-btn{\n  \tbackground-color: #6bbd58;\n  }\n  .grey{\n  \tcolor: #7E7E7E;\n  }\n  .deep-green{\n  \tcolor: #006E5A;\n  }\n  .pl-5{\n  \tpadding-left: 5px;\n  }\n  .armin_grotesk{\n  \tfont-family: 'manrope-extrabold';\n  }\n  .cd-page-accordion-panel-item-cnt > div\n  {\n  \t    border-top: 1px solid #F1FCEE;\n  }\n  @media only screen and (min-width: 491px) {\n    .fs-20-26{\n    \tfont-size: 26px;\n    }\n    .fs-20-24{\n    \tfont-size: 24px;\n    }\n    .fs-14-16{\n    \tfont-size: 16px;\n    }\n    .fs-13-14{\n    \tfont-size: 14px\n    }\n    .fs-12-13{\n    \tfont-size: 13px\n    }\n    .loggedin, .loggedout{\n    \tflex-direction: row;\n    }\n  }\n  @media only screen and (max-width: 490px) {\n    .fs-20-26, .fs-20-24{\n    \tfont-size: 20px;\n    }\n    .fs-14-16{\n    \tfont-size: 14px\n    }\n    .fs-13-14{\n    \tfont-size: 13px\n    }\n    .fs-12-13{\n    \tfont-size: 12px\n    }\n    .loggedout, .loggedin{\n    \tflex-direction: column;\n    }\n    .cd_container {\n    \tbackground: #f0faf0;\n        margin-bottom: -120px;\n        padding: 0 !important;\n        padding-bottom: 120px !important;\n    }\n    .cd_cnt {\n    \twidth: 95%;\n      \tmargin: 0 auto;\n    }\n  }\n  .oziva_referral_general_wrapper {\n    background: #FFFFFF 0% 0% no-repeat padding-box;\n    box-shadow: 0px 1px 10px #6BBD5829;\n    border-radius: 6px;\n    padding: 10px;\n    margin: 10px auto;\n    width: 95%;\n    max-width: 750px;\n    display: flex;\n    justify-content: space-between;\n  }\n\n  .oziva_referral_general_wrapper .icon {\n    width: 10%;\n    height: 100%;\n    overflow: hidden;\n    padding: 10px;\n    border-radius: 3px;\n    background: #006E5A;\n  }\n\n  .oziva_referral_general_wrapper .icon svg {\n    display: block;\n    margin: auto;\n    width: 100%;\n    height: 100%;\n  }\n\n  .oziva_referral_general_wrapper .content_wrap {\n    width: 88%;\n    height: auto;\n    font-size: 14px;\n  }\n\n  .oziva_referral_general_wrapper .content_wrap div {\n    font-family: 'manrope-bold';\n    margin-bottom: 5px;\n    line-height: 18px;\n  }\n\n  .oziva_referral_general_wrapper .content_wrap a {\n    color: #6BBD58;\n    text-transform: uppercase;\n    font-size: 12px;\n    cursor: pointer;\n  }\n\n  .oziva_referral_general_wrapper .content_wrap a::after {\n    content: \"❯\";\n    padding-left: 5px;\n  }  \n  .open-popup {\n    width: auto;\n    height: auto;\n    opacity: 1;\n    -webkit-transition: opacity 1s ease;\n    transition: opacity 1s ease;\n  }\n  .modal-overlay {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    cursor: pointer;\n    background-color: rgba(0, 0, 0, 0.6);\n    z-index: 1;\n  }\n  .modal-dialog {\n    max-width: 342px;\n    border-radius: 4px;\n    box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);\n    width: 90%;\n    max-width: 660px;\n    margin: 70px auto 50px;\n    z-index: 2;\n  }\n"
                    }}
                />
                <div className="cd_container" style={{ padding: 16 }}>
                    <div className="cd_profile_cnt">
                        <div className="cd_profile_wrapper">
                            <div className="part1 fs-20-26 padding-10-15 line armin bold">
                                The all-new OZiva Cash is here!
                            </div>
                            <div className="part2 padding-10-15 line">
                                <div id="loggedout" style={{ display: "none" }}>
                                    <div className="loggedout">
                                        <div className="left">
                                            <div className="roboto fs-14-16">
                                                Get rewarded with OZiva Cash. Use your OZiva Cash for exciting
                                                discounts with every order.
                                            </div>
                                            <div
                                                className="roboto bold fs-14-16"
                                                style={{ padding: "12px 0" }}
                                            >
                                                Log in to apply OZiva cash to get up to ₹150 off
                                            </div>
                                        </div>
                                        <div className="right">
                                            <button className="green-btn" onclick="LoginHandlerCallerCD()">
                                                LOGIN
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div id="loggedin" style={{ display: "block" }}>
                                    <div className="loggedin">
                                        <div className="left">
                                            <div className="roboto fs-14-16">
                                                Get rewarded with OZiva Cash.
                                            </div>
                                            <div className="roboto fs-14-16">
                                                Use your OZiva Cash for exciting discounts with every order.
                                            </div>
                                        </div>
                                        <div className="right">
                                            <div className="balance-cnt">
                                                <div className="oziva_cash_icon">
                                                    <svg
                                                        width={41}
                                                        height={46}
                                                        viewBox="0 0 41 46"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clipPath="url(#clip0)">
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M5.0647 23.3153L17.3216 -0.00292969L30.0138 7.12134L15.8611 34.0462L5.0647 27.9861V23.3153Z"
                                                                fill="#6ABE59"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M20.042 2.79248L26.0811 6.18371L25.9781 6.37953L26.1676 6.48601C26.0182 6.77001 25.9243 7.08164 25.8914 7.40314C25.8585 7.72457 25.8872 8.04963 25.9759 8.3596C26.0645 8.66964 26.2114 8.9586 26.4081 9.20996C26.6048 9.46125 26.8475 9.67017 27.1223 9.82455L27.3118 9.931L16.6691 30.1775L16.4796 30.071C16.2047 29.9165 15.903 29.8195 15.5919 29.7856C15.2807 29.7516 14.9661 29.7814 14.6661 29.8731C14.3661 29.9649 14.0865 30.1168 13.8433 30.3203C13.6001 30.5237 13.3982 30.7747 13.2489 31.0588L13.146 31.2548L6.91527 27.7572L7.01814 27.5613C7.31975 26.9875 7.38845 26.3133 7.20916 25.6871C7.02993 25.0609 6.61731 24.5339 6.06211 24.222L5.87268 24.1155L16.5181 3.86985L16.7076 3.97628C16.9826 4.13067 17.2843 4.2276 17.5955 4.2615C17.9066 4.29542 18.2213 4.26566 18.5214 4.17391C18.8214 4.08218 19.1011 3.93025 19.3443 3.72684C19.5876 3.52341 19.7897 3.27246 19.9391 2.98833L20.042 2.79248ZM25.6928 6.47301L20.2078 3.39291C20.0467 3.6502 19.8469 3.87995 19.6157 4.07334C19.3283 4.31359 18.9981 4.49301 18.6437 4.60136C18.2894 4.70971 17.9177 4.74486 17.5502 4.70481C17.2544 4.67257 16.9658 4.59211 16.6951 4.46684L6.45365 23.9443C7.01553 24.3202 7.43159 24.8927 7.62281 25.5607C7.8141 26.2286 7.76634 26.9428 7.49292 27.5741L12.98 30.6544C13.1411 30.397 13.3407 30.1672 13.5719 29.9738C13.8591 29.7335 14.1894 29.5541 14.5437 29.4457C14.8981 29.3373 15.2697 29.3022 15.6372 29.3423C15.933 29.3745 16.2215 29.455 16.4921 29.5803L26.7308 10.1023C26.482 9.93563 26.2597 9.7292 26.0727 9.49023C25.8404 9.19337 25.6669 8.85214 25.5622 8.48592C25.4575 8.11977 25.4236 7.73589 25.4624 7.35621C25.4937 7.05064 25.5716 6.75258 25.6928 6.47301Z"
                                                                fill="#008B60"
                                                            />
                                                            <path
                                                                d="M19.853 11.503C20.9096 12.0964 21.7722 13.0002 22.3318 14.1002C22.8913 15.2001 23.1227 16.4468 22.9966 17.6827C22.8705 18.9185 22.3926 20.0879 21.6234 21.0432C20.8541 21.9984 19.8281 22.6964 18.6749 23.049C17.5218 23.4016 16.2934 23.3929 15.1451 23.024C13.9966 22.6553 12.9799 21.9428 12.2234 20.9768C11.4669 20.0109 11.0045 18.8348 10.8947 17.5973C10.7849 16.3598 11.0327 15.1165 11.6068 14.0245C12.3768 12.5602 13.6782 11.4719 15.2246 10.999C16.771 10.5261 18.4359 10.7074 19.853 11.503Z"
                                                                fill="#2F6C5D"
                                                            />
                                                            <g style={{ mixBlendMode: "multiply" }} opacity="0.3">
                                                                <g style={{ mixBlendMode: "multiply" }} opacity="0.3">
                                                                    <g
                                                                        style={{ mixBlendMode: "multiply" }}
                                                                        opacity="0.3"
                                                                    >
                                                                        <g
                                                                            style={{ mixBlendMode: "multiply" }}
                                                                            opacity="0.3"
                                                                        >
                                                                            <path
                                                                                d="M14.6283 12.9321L12.1732 17.6026L12.3186 17.6845L12.7051 17.9017L12.7272 17.9138L13.501 16.4434C14.0523 15.7769 14.8454 15.487 15.4904 15.7519L14.0344 18.5219L14.31 18.6743L15.7653 15.9043C16.4544 16.407 16.5977 17.5421 16.0775 18.5326C15.9158 18.8638 15.7218 19.177 15.4986 19.4675L15.9224 19.7061L15.9293 19.6989L20.8493 18.1936L21.271 17.3847L16.5729 18.821C16.5743 18.819 16.5755 18.8168 16.5764 18.8146C17.2895 17.4581 17.0732 15.9015 16.1105 15.2414L16.7107 14.1021L16.4385 13.9497L15.839 15.089C15.3243 14.8583 14.7365 14.8939 14.1811 15.1488L15.183 13.2433L14.6283 12.9321Z"
                                                                                fill="#1D5F3E"
                                                                            />
                                                                        </g>
                                                                    </g>
                                                                    <g
                                                                        style={{ mixBlendMode: "multiply" }}
                                                                        opacity="0.3"
                                                                    >
                                                                        <g
                                                                            style={{ mixBlendMode: "multiply" }}
                                                                            opacity="0.3"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                d="M14.5373 12.6145L15.4905 13.1493L14.6495 14.7487C15.014 14.6732 15.3838 14.6847 15.7338 14.7987L16.3475 13.6323L17.0185 14.008L16.4038 15.1747C17.2391 15.8857 17.4407 17.2205 16.9877 18.4499L21.7289 17.0004L21.0042 18.3906L16.0489 19.9067L15.9629 19.9956L15.1535 19.5401L15.3211 19.3219C15.5347 19.0439 15.7203 18.744 15.8751 18.4271L15.8766 18.424L15.8783 18.4209C16.3038 17.6105 16.2291 16.7537 15.8276 16.2768L14.4017 18.9907L13.7263 18.6173L15.154 15.9011C14.6766 15.8323 14.1187 16.0675 13.6886 16.5774L12.8191 18.2296L12.5978 18.1081L11.8659 17.6964L14.5373 12.6145ZM14.7194 13.2498L12.4805 17.5089L12.6362 17.5963L13.3132 16.3099L13.3287 16.2911C13.9209 15.5752 14.8111 15.2209 15.5741 15.5343L15.6791 15.5774L15.6877 15.561L15.7503 15.6066L15.8116 15.6318L15.8041 15.6459L15.8961 15.7129C16.7108 16.3074 16.8302 17.5878 16.2783 18.6413C16.1504 18.9029 16.0032 19.1538 15.8379 19.3918L15.9425 19.4506L20.6945 17.9967L20.8132 17.7691L15.9922 19.2428L16.3813 18.6949C17.0554 17.4051 16.8139 16.0049 15.9852 15.4366L15.8727 15.3595L15.7489 15.3039C15.303 15.1041 14.7821 15.1293 14.2732 15.363L13.6634 15.6428L14.8756 13.3374L14.7194 13.2498Z"
                                                                                fill="white"
                                                                            />
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                            <path
                                                                d="M14.5305 12.8066L12.0753 17.475L12.2207 17.5569L12.6073 17.7705L12.6294 17.7833L13.4025 16.3122C13.9538 15.6457 14.7476 15.3559 15.3926 15.6215L13.9365 18.3907L14.208 18.5431L15.6641 15.7739C16.3497 16.2759 16.4965 17.4116 15.9755 18.4014C15.8144 18.733 15.6206 19.0465 15.3974 19.3371L15.8212 19.5749L15.8281 19.5678L20.7481 18.0632L21.1691 17.2614L16.4765 18.6955V18.6898C17.1897 17.3326 16.9733 15.7767 16.0107 15.1166L16.6102 13.9773L16.3387 13.8228L15.7385 14.9621C15.2237 14.7314 14.636 14.767 14.0812 15.0226L15.0832 13.1171L14.5305 12.8066Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M14.4396 12.4888L15.3905 13.023L14.5499 14.6217C14.914 14.5462 15.2835 14.5577 15.6333 14.6716L16.2484 13.5038L16.917 13.8844L16.3038 15.0497C17.1393 15.7607 17.3409 17.0955 16.8875 18.3254L21.6291 16.8764L20.9025 18.2601L15.9476 19.7754L15.8617 19.8641L15.052 19.4097L15.2199 19.1912C15.4334 18.9132 15.6188 18.6133 15.7729 18.2962L15.7746 18.2927L15.7764 18.2893C16.2019 17.4808 16.1255 16.6237 15.726 16.1466L14.299 18.8606L13.6291 18.4846L15.0562 15.7703C14.5787 15.7009 14.0203 15.9361 13.5901 16.446L12.7188 18.104L12.4983 17.9758L12.113 17.7629L11.768 17.5686L14.4396 12.4888ZM12.5379 17.4663L13.2146 16.1786L13.2302 16.1598C13.8224 15.4438 14.7133 15.0895 15.4765 15.4037L15.5785 15.4457L15.5867 15.43L15.6464 15.4736L15.7136 15.5013L15.7054 15.5169L15.7951 15.5826C16.6055 16.176 16.7292 17.4563 16.1764 18.5098C16.049 18.7717 15.902 19.0228 15.7369 19.2609L15.8411 19.3193L20.5936 17.8659L20.709 17.6461L16.2497 19.009V18.6301L16.2772 18.5779C16.9565 17.2852 16.7157 15.8811 15.8853 15.3116L15.7651 15.2293L15.6483 15.1769C15.2024 14.977 14.6816 15.0023 14.1736 15.2365L13.5627 15.5179L14.7757 13.2109L14.6214 13.1242L12.3829 17.3807L12.5379 17.4663Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                d="M30.9101 0.330811L9.64587 21.6846L19.7119 32.3888L40.9762 11.0349L30.9101 0.330811Z"
                                                                fill="#6ABE59"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M29.0958 3.77686L29.2461 3.93665C29.6865 4.40487 30.2889 4.67314 30.9207 4.68244C31.5525 4.69175 32.1621 4.44133 32.6153 3.98628L32.7699 3.83096L37.5612 8.92542L37.4065 9.0808L37.5569 9.24051C37.1041 9.69603 36.8448 10.3187 36.836 10.9717C36.8273 11.6248 37.0698 12.2546 37.5102 12.723L37.6605 12.8828L21.6684 28.941L21.5182 28.7811C21.3001 28.5492 21.04 28.364 20.7527 28.236C20.4653 28.1079 20.1564 28.0397 19.8436 28.0351C19.5307 28.0304 19.22 28.0896 18.9292 28.2091C18.6385 28.3286 18.3734 28.5061 18.1491 28.7315L17.9944 28.8869L13.0528 23.6318L13.2074 23.4765C13.6606 23.0214 13.9201 22.3989 13.9292 21.746C13.9382 21.093 13.6958 20.4632 13.2555 19.9948L13.1052 19.835L29.0958 3.77686ZM37.1074 9.08258L32.7555 4.45514C32.2411 4.89777 31.5886 5.13809 30.9146 5.12816C30.2406 5.11823 29.5949 4.8588 29.093 4.40119L13.7092 19.85C14.1375 20.3816 14.3701 21.0558 14.3605 21.7523C14.3509 22.4488 14.0998 23.116 13.657 23.6347L18.0088 28.2627C18.2366 28.0665 18.4935 27.9085 18.7698 27.7949C19.1132 27.6538 19.4801 27.5839 19.8497 27.5893C20.2193 27.5948 20.5841 27.6754 20.9234 27.8266C21.1966 27.9483 21.449 28.1138 21.6713 28.3166L37.0565 12.8678C36.6281 12.3363 36.3954 11.6621 36.4047 10.9655C36.4141 10.269 36.6649 9.60161 37.1074 9.08258Z"
                                                                fill="#008B60"
                                                            />
                                                            <path
                                                                d="M29.8831 12.1283C30.6929 12.9894 31.2375 14.0794 31.4478 15.2604C31.6581 16.4413 31.5249 17.6601 31.0648 18.7629C30.6048 19.8655 29.8387 20.8025 28.8634 21.4551C27.8881 22.1079 26.7474 22.4471 25.5855 22.4299C24.4236 22.4127 23.2928 22.0398 22.336 21.3584C21.3792 20.677 20.6394 19.7178 20.2102 18.6019C19.781 17.486 19.6817 16.2637 19.9247 15.0895C20.1677 13.9153 20.7423 12.8419 21.5756 12.0051C22.129 11.4494 22.7828 11.0119 23.4998 10.7173C24.2168 10.4228 24.9829 10.2771 25.7544 10.2885C26.5259 10.2999 27.2877 10.4683 27.9962 10.784C28.7048 11.0997 29.3461 11.5565 29.8838 12.1283"
                                                                fill="#2F6C5D"
                                                            />
                                                            <g style={{ mixBlendMode: "multiply" }} opacity="0.3">
                                                                <g style={{ mixBlendMode: "multiply" }} opacity="0.3">
                                                                    <g
                                                                        style={{ mixBlendMode: "multiply" }}
                                                                        opacity="0.3"
                                                                    >
                                                                        <g
                                                                            style={{ mixBlendMode: "multiply" }}
                                                                            opacity="0.3"
                                                                        >
                                                                            <path
                                                                                d="M24.6131 11.8496L20.9238 15.5524L21.0395 15.6756L21.3462 16.001L21.3641 16.0202L22.5252 14.8539C23.2432 14.3867 24.0846 14.3554 24.6241 14.8054L22.4363 17.0022L22.652 17.2315L24.8398 15.0347C25.3497 15.7247 25.163 16.8534 24.3809 17.6388C24.1311 17.9056 23.8556 18.1454 23.5588 18.3544L23.8951 18.7105L23.904 18.7062L29.0335 18.7817L29.6695 18.1408L24.7771 18.0696L24.7819 18.0646C25.8534 16.9887 26.0911 15.4363 25.3662 14.5099L26.2669 13.6056L26.0512 13.3763L25.1506 14.2806C24.7254 13.9025 24.1521 13.7551 23.5505 13.8285L25.0555 12.3174L24.6131 11.8496Z"
                                                                                fill="#1D5F3E"
                                                                            />
                                                                        </g>
                                                                    </g>
                                                                    <g
                                                                        style={{ mixBlendMode: "multiply" }}
                                                                        opacity="0.3"
                                                                    >
                                                                        <g
                                                                            style={{ mixBlendMode: "multiply" }}
                                                                            opacity="0.3"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                d="M24.6173 11.5188L25.3765 12.3217L24.1131 13.5902C24.4823 13.6302 24.8322 13.7551 25.1334 13.971L26.0557 13.045L26.5875 13.6102L25.6649 14.5366C26.2544 15.4718 26.0658 16.8077 25.2796 17.8425L30.2188 17.9144L29.1244 19.0172L23.9522 18.9411L23.8447 18.9924L23.2077 18.318L23.4311 18.1607C23.7153 17.9607 23.9789 17.7312 24.2179 17.4759L24.2203 17.4732L24.2228 17.4707C24.8618 16.8291 25.0355 15.9878 24.7915 15.4098L22.6474 17.5627L22.1156 16.9974L24.2597 14.8446C23.8233 14.6325 23.2226 14.6849 22.6657 15.0394L21.3588 16.3522L21.1837 16.1644L21.1828 16.1634L20.6032 15.5475L24.6173 11.5188ZM21.3685 15.6889L22.3842 14.6687L22.4044 14.6556C23.1762 14.1534 24.1285 14.0909 24.7664 14.6231L24.8527 14.695L24.8649 14.6828L24.9083 14.7413L24.9656 14.7891L24.9529 14.8018L25.0199 14.8925C25.6227 15.7081 25.3722 16.9677 24.5414 17.8041C24.344 18.0148 24.1313 18.2092 23.9052 18.3857L23.9876 18.473L28.9426 18.546L29.1202 18.367L24.237 18.296L24.6228 17.8976L24.6239 17.8965C25.6438 16.8723 25.8157 15.4569 25.1899 14.6572L25.1064 14.5504L25.0027 14.4582C24.6342 14.1305 24.1277 13.9939 23.5771 14.061L22.9128 14.1421L24.7344 12.3131L24.6088 12.1803L21.2444 15.5571L21.3685 15.6889Z"
                                                                                fill="white"
                                                                            />
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                            <path
                                                                d="M24.5552 11.6987L20.8665 15.4015L20.9823 15.5247L21.2883 15.8501L21.3062 15.8693L22.4714 14.7044C23.1887 14.2373 24.0308 14.2059 24.5696 14.656L22.3825 16.8527L22.5982 17.082L24.7853 14.8853C25.2952 15.5753 25.1085 16.7046 24.3264 17.49C24.0765 17.7556 23.801 17.9942 23.5043 18.2021L23.8413 18.5581L23.8496 18.5539L28.9797 18.6293L29.6151 17.9885L24.7226 17.9173C24.7248 17.916 24.7266 17.9143 24.7281 17.9123C25.7996 16.8363 26.0374 15.284 25.3118 14.3583L26.2131 13.4533L25.9967 13.224L25.0899 14.1283C24.6647 13.7502 24.0914 13.6028 23.4899 13.6762L24.9948 12.1651L24.5552 11.6987Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M24.5597 11.3677L25.3157 12.1697L24.0525 13.438C24.4221 13.478 24.7721 13.6029 25.0734 13.8192L26.0016 12.8936L26.5341 13.4578L25.6107 14.3849C26.2008 15.3197 26.0121 16.6556 25.2259 17.6903L30.1641 17.7622L29.0708 18.8649L23.9017 18.7889L23.7949 18.8441L23.1527 18.1655L23.3772 18.0082C23.6611 17.8092 23.9248 17.5809 24.1639 17.3267L24.1662 17.3243L24.1685 17.322C24.8074 16.6804 24.9812 15.8386 24.7372 15.2604L22.5937 17.4132L22.062 16.848L24.2054 14.6952C23.7694 14.4831 23.1682 14.5355 22.6119 14.89L21.3006 16.201L21.1257 16.0134L21.125 16.0126L20.5461 15.3967L24.5597 11.3677ZM21.3113 15.5384L22.3307 14.5191L22.3506 14.5062C23.1218 14.0041 24.0748 13.9415 24.7122 14.4737L24.7983 14.5456L24.8106 14.5333L24.8542 14.5923L24.9111 14.6398L24.8986 14.6524L24.9656 14.743C25.5684 15.5587 25.3179 16.8192 24.4868 17.6557C24.3767 17.7726 24.2618 17.8845 24.1425 17.991L24.5863 17.7281C25.592 16.7052 25.7587 15.3005 25.1357 14.5058L25.064 14.4143L24.9421 14.3059C24.5737 13.9782 24.0672 13.8416 23.5165 13.9088L22.8522 13.9898L24.6741 12.1606L24.5509 12.0298L21.1872 15.4063L21.3113 15.5384ZM23.968 18.1406C23.9295 18.1722 23.8907 18.2032 23.8514 18.2337L23.9339 18.3208L28.8889 18.3937L29.0662 18.2148L23.968 18.1406Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                d="M35.2531 19.97H7.22843C6.03801 19.97 5.073 20.9672 5.073 22.1973V43.7319C5.073 44.962 6.03801 45.9593 7.22843 45.9593H35.2531C36.4435 45.9593 37.4086 44.962 37.4086 43.7319V22.1973C37.4086 20.9672 36.4435 19.97 35.2531 19.97Z"
                                                                fill="#FECD10"
                                                            />
                                                            <path
                                                                opacity="0.24"
                                                                d="M36.7381 20.4792L12.0967 45.9288H35.3482C35.6299 45.9314 35.9092 45.8764 36.1703 45.767C36.4314 45.6576 36.6689 45.496 36.8692 45.2913C37.0696 45.0867 37.2288 44.8431 37.3376 44.5747C37.4465 44.3062 37.5029 44.0181 37.5036 43.727V22.1946C37.5039 21.8685 37.4356 21.5461 37.3034 21.2499C37.1712 20.9538 36.9783 20.6908 36.7381 20.4792Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                opacity="0.24"
                                                                d="M25.5819 19.938L5.16806 41.0624V43.7284C5.16896 44.0193 5.22552 44.3073 5.33447 44.5756C5.44344 44.8439 5.60265 45.0872 5.80297 45.2918C6.00328 45.4963 6.24074 45.6578 6.50169 45.7671C6.76264 45.8764 7.04193 45.9313 7.32349 45.9287H7.33038L32.4816 19.938H25.5819Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <g opacity="0.24">
                                                                <g opacity="0.24">
                                                                    <path
                                                                        opacity="0.24"
                                                                        d="M36.6423 20.5088L12.0009 45.9583H35.2524C35.5341 45.961 35.8135 45.906 36.0746 45.7965C36.3356 45.6872 36.5731 45.5255 36.7734 45.3209C36.9738 45.1162 37.133 44.8727 37.2419 44.6042C37.3507 44.3357 37.4072 44.0477 37.4079 43.7566V22.2242C37.4081 21.898 37.3399 21.5756 37.2076 21.2795C37.0755 20.9832 36.8826 20.7203 36.6423 20.5088Z"
                                                                        fill="#F9A01E"
                                                                    />
                                                                </g>
                                                            </g>
                                                            <g opacity="0.24">
                                                                <g opacity="0.24">
                                                                    <path
                                                                        opacity="0.24"
                                                                        d="M25.4861 19.9673L5.0723 41.0917V43.7577C5.07319 44.0486 5.12975 44.3365 5.23871 44.6048C5.34767 44.8731 5.50689 45.1165 5.7072 45.321C5.90752 45.5255 6.14498 45.687 6.40592 45.7964C6.66688 45.9057 6.94617 45.9606 7.22772 45.958H7.23461L32.3858 19.9673H25.4861Z"
                                                                        fill="#F9A01E"
                                                                    />
                                                                </g>
                                                            </g>
                                                            <path
                                                                d="M37.4078 29.9937H31.2999C30.5452 30.0057 29.8255 30.324 29.2959 30.8797C28.7664 31.4355 28.4696 32.1842 28.4696 32.9641C28.4696 33.744 28.7664 34.4926 29.2959 35.0484C29.8255 35.6042 30.5452 35.9224 31.2999 35.9345H37.4078V29.9937Z"
                                                                fill="#2F6C5D"
                                                            />
                                                            <path
                                                                d="M34.737 44.872C34.737 44.8128 34.7595 44.756 34.7997 44.7139C34.839 44.6753 34.8897 44.6514 34.9438 44.6463H35.0072C35.0271 44.6463 35.0506 44.6399 35.0761 44.6363C35.1069 44.6322 35.1375 44.6263 35.1677 44.6185C35.3316 44.5808 35.4861 44.5081 35.6211 44.4049C35.7565 44.3011 35.8695 44.1694 35.9533 44.0182C35.9692 43.9905 35.9835 43.9617 35.996 43.9321C36.0075 43.9091 36.0174 43.8853 36.0256 43.8609L36.047 43.7996C36.068 43.7491 36.105 43.7074 36.152 43.6816C36.199 43.6556 36.2531 43.6471 36.3054 43.6572C36.3341 43.6618 36.3615 43.6731 36.3853 43.6903C36.4092 43.7074 36.429 43.73 36.4432 43.7562C36.4581 43.785 36.4669 43.8166 36.4692 43.8491C36.4714 43.8816 36.467 43.9143 36.4563 43.9449C36.4563 43.9449 36.4452 43.9748 36.4266 44.0275C36.4152 44.0591 36.4021 44.09 36.3874 44.1201C36.3699 44.1598 36.3503 44.1985 36.3288 44.2361C36.2155 44.4406 36.0626 44.6187 35.8797 44.7594C35.6967 44.9001 35.4876 45.0002 35.2656 45.0536C35.2245 45.0642 35.1829 45.072 35.1408 45.0771C35.1036 45.0821 35.0719 45.0899 35.0444 45.0906L34.9589 45.0949C34.9294 45.0976 34.8997 45.0935 34.8718 45.0827C34.844 45.072 34.819 45.055 34.7984 45.0329C34.7583 44.991 34.7357 44.9345 34.7357 44.8756"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M32.3183 44.8451C32.3185 44.7861 32.3413 44.7296 32.3817 44.6879C32.4222 44.6463 32.477 44.6229 32.534 44.6229H34.2567C34.286 44.6212 34.3153 44.6257 34.3429 44.6361C34.3705 44.6465 34.3957 44.6626 34.4171 44.6834C34.4383 44.7042 34.4554 44.7294 34.4669 44.7572C34.4786 44.7851 34.4846 44.8151 34.4846 44.8454C34.4846 44.8758 34.4786 44.9058 34.4669 44.9336C34.4554 44.9614 34.4383 44.9866 34.4171 45.0074C34.3957 45.0282 34.3705 45.0444 34.3429 45.0548C34.3153 45.0652 34.286 45.0697 34.2567 45.068H32.534C32.4768 45.068 32.422 45.0445 32.3815 45.0027C32.3411 44.9609 32.3183 44.9042 32.3183 44.8451Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M29.9025 44.8451C29.9027 44.7861 29.9255 44.7296 29.9659 44.6879C30.0063 44.6463 30.0611 44.6229 30.1181 44.6229H31.8409C31.8701 44.6212 31.8995 44.6257 31.9271 44.6361C31.9546 44.6465 31.9799 44.6626 32.0012 44.6834C32.0225 44.7042 32.0395 44.7294 32.0511 44.7572C32.0627 44.7851 32.0687 44.8151 32.0687 44.8454C32.0687 44.8758 32.0627 44.9058 32.0511 44.9336C32.0395 44.9614 32.0225 44.9866 32.0012 45.0074C31.9799 45.0282 31.9546 45.0444 31.9271 45.0548C31.8995 45.0652 31.8701 45.0697 31.8409 45.068H30.1181C30.061 45.068 30.0061 45.0445 29.9657 45.0027C29.9252 44.9609 29.9025 44.9042 29.9025 44.8451Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M27.4865 44.8451C27.4867 44.7861 27.5096 44.7296 27.5499 44.6879C27.5904 44.6463 27.6452 44.6229 27.7022 44.6229H29.4249C29.4542 44.6212 29.4836 44.6257 29.5111 44.6361C29.5387 44.6465 29.5639 44.6626 29.5853 44.6834C29.6066 44.7042 29.6236 44.7294 29.6352 44.7572C29.6468 44.7851 29.6528 44.8151 29.6528 44.8454C29.6528 44.8758 29.6468 44.9058 29.6352 44.9336C29.6236 44.9614 29.6066 44.9866 29.5853 45.0074C29.5639 45.0282 29.5387 45.0444 29.5111 45.0548C29.4836 45.0652 29.4542 45.0697 29.4249 45.068H27.7022C27.6739 45.068 27.6459 45.0622 27.6197 45.051C27.5935 45.0398 27.5697 45.0234 27.5497 45.0027C27.5297 44.9819 27.5138 44.9574 27.5029 44.9304C27.4921 44.9033 27.4865 44.8744 27.4865 44.8451Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M25.0706 44.8451C25.0709 44.7861 25.0937 44.7296 25.134 44.6879C25.1745 44.6463 25.2293 44.6229 25.2863 44.6229H27.009C27.0383 44.6212 27.0677 44.6257 27.0952 44.6361C27.1228 44.6465 27.148 44.6626 27.1694 44.6834C27.1907 44.7042 27.2077 44.7294 27.2193 44.7572C27.2309 44.7851 27.2369 44.8151 27.2369 44.8454C27.2369 44.8758 27.2309 44.9058 27.2193 44.9336C27.2077 44.9614 27.1907 44.9866 27.1694 45.0074C27.148 45.0282 27.1228 45.0444 27.0952 45.0548C27.0677 45.0652 27.0383 45.0697 27.009 45.068H25.2863C25.2291 45.068 25.1743 45.0445 25.1338 45.0027C25.0934 44.9609 25.0706 44.9042 25.0706 44.8451Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M22.6554 44.8451C22.6554 44.7861 22.6781 44.7297 22.7184 44.688C22.7587 44.6463 22.8134 44.6229 22.8704 44.6229H24.5931C24.6224 44.6212 24.6517 44.6257 24.6793 44.6361C24.7069 44.6465 24.7321 44.6626 24.7534 44.6834C24.7747 44.7042 24.7918 44.7294 24.8033 44.7572C24.815 44.7851 24.821 44.8151 24.821 44.8454C24.821 44.8758 24.815 44.9058 24.8033 44.9336C24.7918 44.9614 24.7747 44.9866 24.7534 45.0074C24.7321 45.0282 24.7069 45.0444 24.6793 45.0548C24.6517 45.0652 24.6224 45.0697 24.5931 45.068H22.8704C22.8421 45.068 22.8141 45.0622 22.788 45.0509C22.7619 45.0398 22.7381 45.0233 22.7181 45.0026C22.6981 44.9819 22.6824 44.9573 22.6716 44.9303C22.6608 44.9033 22.6554 44.8743 22.6554 44.8451Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M20.2396 44.8451C20.2398 44.7861 20.2626 44.7296 20.303 44.6879C20.3434 44.6463 20.3982 44.6229 20.4552 44.6229H22.1779C22.2072 44.6212 22.2366 44.6257 22.2641 44.6361C22.2917 44.6465 22.3169 44.6626 22.3383 44.6834C22.3596 44.7042 22.3766 44.7294 22.3882 44.7572C22.3998 44.7851 22.4058 44.8151 22.4058 44.8454C22.4058 44.8758 22.3998 44.9058 22.3882 44.9336C22.3766 44.9614 22.3596 44.9866 22.3383 45.0074C22.3169 45.0282 22.2917 45.0444 22.2641 45.0548C22.2366 45.0652 22.2072 45.0697 22.1779 45.068H20.4552C20.3981 45.068 20.3432 45.0445 20.3028 45.0027C20.2623 44.9609 20.2396 44.9042 20.2396 44.8451Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M17.8236 44.8451C17.8238 44.7861 17.8466 44.7296 17.887 44.6879C17.9275 44.6463 17.9822 44.6229 18.0393 44.6229H19.762C19.7913 44.6212 19.8206 44.6257 19.8482 44.6361C19.8757 44.6465 19.901 44.6626 19.9223 44.6834C19.9436 44.7042 19.9606 44.7294 19.9722 44.7572C19.9839 44.7851 19.9899 44.8151 19.9899 44.8454C19.9899 44.8758 19.9839 44.9058 19.9722 44.9336C19.9606 44.9614 19.9436 44.9866 19.9223 45.0074C19.901 45.0282 19.8757 45.0444 19.8482 45.0548C19.8206 45.0652 19.7913 45.0697 19.762 45.068H18.0393C17.9821 45.068 17.9272 45.0445 17.8868 45.0027C17.8463 44.9609 17.8236 44.9042 17.8236 44.8451Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M15.4078 44.845C15.408 44.786 15.4308 44.7295 15.4712 44.6878C15.5116 44.6462 15.5664 44.6228 15.6235 44.6228H17.3461C17.4011 44.626 17.4529 44.6509 17.4907 44.6922C17.5285 44.7336 17.5496 44.7884 17.5496 44.8453C17.5496 44.9022 17.5285 44.9571 17.4907 44.9984C17.4529 45.0398 17.4011 45.0646 17.3461 45.0679H15.6235C15.5663 45.0679 15.5114 45.0444 15.471 45.0026C15.4305 44.9608 15.4078 44.9041 15.4078 44.845Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M12.9918 44.8451C12.992 44.7861 13.0148 44.7296 13.0552 44.6879C13.0956 44.6463 13.1504 44.6229 13.2075 44.6229H14.9301C14.9594 44.6212 14.9888 44.6257 15.0164 44.6361C15.0439 44.6465 15.0691 44.6626 15.0905 44.6834C15.1118 44.7042 15.1288 44.7294 15.1404 44.7572C15.152 44.7851 15.158 44.8151 15.158 44.8454C15.158 44.8758 15.152 44.9058 15.1404 44.9336C15.1288 44.9614 15.1118 44.9866 15.0905 45.0074C15.0691 45.0282 15.0439 45.0444 15.0164 45.0548C14.9888 45.0652 14.9594 45.0697 14.9301 45.068H13.2075C13.1503 45.068 13.0954 45.0445 13.055 45.0027C13.0145 44.9609 12.9918 44.9042 12.9918 44.8451Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M10.5759 44.8451C10.5761 44.7861 10.5989 44.7296 10.6393 44.6879C10.6798 44.6463 10.7346 44.6229 10.7916 44.6229H12.5143C12.5436 44.6212 12.573 44.6257 12.6005 44.6361C12.6281 44.6465 12.6533 44.6626 12.6747 44.6834C12.696 44.7042 12.713 44.7294 12.7246 44.7572C12.7362 44.7851 12.7422 44.8151 12.7422 44.8454C12.7422 44.8758 12.7362 44.9058 12.7246 44.9336C12.713 44.9614 12.696 44.9866 12.6747 45.0074C12.6533 45.0282 12.6281 45.0444 12.6005 45.0548C12.573 45.0652 12.5436 45.0697 12.5143 45.068H10.7916C10.7344 45.068 10.6796 45.0445 10.6391 45.0027C10.5987 44.9609 10.5759 44.9042 10.5759 44.8451Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M8.16074 44.8451C8.16074 44.7861 8.18341 44.7297 8.22372 44.688C8.26403 44.6463 8.31874 44.6229 8.37573 44.6229H10.0984C10.1277 44.6212 10.1571 44.6257 10.1846 44.6361C10.2122 44.6465 10.2374 44.6626 10.2588 44.6834C10.2801 44.7042 10.2971 44.7294 10.3087 44.7572C10.3203 44.7851 10.3263 44.8151 10.3263 44.8454C10.3263 44.8758 10.3203 44.9058 10.3087 44.9336C10.2971 44.9614 10.2801 44.9866 10.2588 45.0074C10.2374 45.0282 10.2122 45.0444 10.1846 45.0548C10.1571 45.0652 10.1277 45.0697 10.0984 45.068H8.37573C8.31867 45.0677 8.26396 45.0442 8.22365 45.0024C8.18334 44.9607 8.16074 44.904 8.16074 44.8451Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M6.20928 43.809C6.26356 43.7934 6.32132 43.7972 6.37328 43.8197C6.42027 43.8391 6.45876 43.8755 6.48146 43.9222C6.48146 43.9222 6.4918 43.9429 6.50903 43.9806C6.51799 43.9992 6.53177 44.0198 6.54555 44.0447C6.56084 44.073 6.57836 44.0999 6.59792 44.1252C6.69648 44.2663 6.82223 44.3849 6.96726 44.4734C7.11197 44.5626 7.27328 44.6191 7.44066 44.6393C7.47201 44.6391 7.50329 44.637 7.53437 44.6329C7.56262 44.6329 7.58468 44.6229 7.61017 44.6229H7.6839C7.71319 44.6212 7.74254 44.6257 7.77011 44.6361C7.79767 44.6465 7.82289 44.6626 7.84425 44.6835C7.86554 44.7043 7.88256 44.7294 7.89414 44.7573C7.90578 44.7851 7.91178 44.8151 7.91178 44.8455C7.91178 44.8758 7.90578 44.9058 7.89414 44.9336C7.88256 44.9615 7.86554 44.9866 7.84425 45.0075C7.82289 45.0283 7.79767 45.0444 7.77011 45.0548C7.74254 45.0652 7.71319 45.0697 7.6839 45.068H7.61017C7.57889 45.0732 7.5474 45.0765 7.51577 45.078C7.47373 45.0803 7.4317 45.0803 7.38967 45.078C7.1631 45.0517 6.94445 44.9762 6.74814 44.8565C6.55223 44.7375 6.38216 44.5779 6.24856 44.388C6.22325 44.3535 6.20023 44.3173 6.17965 44.2797C6.16035 44.2462 6.14244 44.2178 6.13004 44.1928C6.10661 44.1423 6.09283 44.1138 6.09283 44.1138C6.0788 44.0846 6.07099 44.0527 6.06992 44.0202C6.06885 43.9875 6.07454 43.9551 6.08662 43.9251C6.09748 43.8976 6.11433 43.8731 6.13584 43.8535C6.15735 43.8339 6.18296 43.8196 6.21066 43.8119"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M6.15 41.3181C6.2072 41.3181 6.26206 41.3416 6.30251 41.3834C6.34295 41.4252 6.36568 41.4819 6.36568 41.541V43.3212C6.36621 43.3486 6.36127 43.3758 6.3512 43.4011C6.34113 43.4265 6.32612 43.4495 6.30711 43.4686C6.26673 43.5086 6.21462 43.5336 6.15895 43.5398C6.13056 43.5435 6.10171 43.5405 6.0746 43.531C6.0475 43.5215 6.02285 43.5058 6.00253 43.4849C5.95999 43.4401 5.93537 43.3803 5.93362 43.3176V41.5431C5.93362 41.484 5.95634 41.4273 5.99679 41.3855C6.03724 41.3438 6.09211 41.3203 6.14931 41.3203"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M6.15001 38.8223C6.20709 38.8223 6.26184 38.8456 6.30227 38.8873C6.3427 38.9289 6.36551 38.9854 6.36569 39.0444V40.8246C6.36569 40.8837 6.34296 40.9404 6.30252 40.9822C6.26207 41.024 6.20721 41.0475 6.15001 41.0475C6.09281 41.0475 6.03794 41.024 5.99749 40.9822C5.95705 40.9404 5.93433 40.8837 5.93433 40.8246V39.0444C5.93451 38.9854 5.95731 38.9289 5.99774 38.8873C6.03817 38.8456 6.09292 38.8223 6.15001 38.8223Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M6.15001 36.3257C6.20721 36.3257 6.26207 36.3492 6.30252 36.391C6.34296 36.4328 6.36569 36.4895 6.36569 36.5486V38.3287C6.36569 38.3878 6.34296 38.4445 6.30252 38.4863C6.26207 38.5281 6.20721 38.5516 6.15001 38.5516C6.09281 38.5516 6.03794 38.5281 5.99749 38.4863C5.95705 38.4445 5.93433 38.3878 5.93433 38.3287V36.5486C5.93433 36.4895 5.95705 36.4328 5.99749 36.391C6.03794 36.3492 6.09281 36.3257 6.15001 36.3257Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M6.15001 33.8291C6.20721 33.8291 6.26207 33.8526 6.30252 33.8944C6.34296 33.9362 6.36569 33.9929 6.36569 34.052V35.8322C6.36569 35.8913 6.34296 35.9479 6.30252 35.9897C6.26207 36.0315 6.20721 36.055 6.15001 36.055C6.09281 36.055 6.03794 36.0315 5.99749 35.9897C5.95705 35.9479 5.93433 35.8913 5.93433 35.8322V34.052C5.93433 33.9929 5.95705 33.9362 5.99749 33.8944C6.03794 33.8526 6.09281 33.8291 6.15001 33.8291Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M6.15001 31.3328C6.20721 31.3328 6.26207 31.3563 6.30252 31.3981C6.34296 31.4399 6.36569 31.4965 6.36569 31.5556V33.3358C6.36569 33.3949 6.34296 33.4516 6.30252 33.4934C6.26207 33.5352 6.20721 33.5587 6.15001 33.5587C6.09281 33.5587 6.03794 33.5352 5.99749 33.4934C5.95705 33.4516 5.93433 33.3949 5.93433 33.3358V31.5556C5.93433 31.4965 5.95705 31.4399 5.99749 31.3981C6.03794 31.3563 6.09281 31.3328 6.15001 31.3328Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M6.15001 28.8362C6.20721 28.8362 6.26207 28.8597 6.30252 28.9015C6.34296 28.9433 6.36569 29 6.36569 29.0591V30.8392C6.36569 30.8984 6.34296 30.955 6.30252 30.9968C6.26207 31.0386 6.20721 31.0621 6.15001 31.0621C6.09281 31.0621 6.03794 31.0386 5.99749 30.9968C5.95705 30.955 5.93433 30.8984 5.93433 30.8392V29.0591C5.93433 29 5.95705 28.9433 5.99749 28.9015C6.03794 28.8597 6.09281 28.8362 6.15001 28.8362Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M6.15001 26.3403C6.20709 26.3403 6.26184 26.3637 6.30227 26.4053C6.3427 26.447 6.36551 26.5035 6.36569 26.5625V28.3427C6.36569 28.4018 6.34296 28.4585 6.30252 28.5003C6.26207 28.5421 6.20721 28.5656 6.15001 28.5656C6.09281 28.5656 6.03794 28.5421 5.99749 28.5003C5.95705 28.4585 5.93433 28.4018 5.93433 28.3427V26.5625C5.93451 26.5035 5.95731 26.447 5.99774 26.4053C6.03817 26.3637 6.09292 26.3403 6.15001 26.3403Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M6.15001 23.8438C6.20721 23.8438 6.26207 23.8672 6.30252 23.909C6.34296 23.9508 6.36569 24.0075 6.36569 24.0666V25.8468C6.36569 25.9059 6.34296 25.9626 6.30252 26.0044C6.26207 26.0462 6.20721 26.0697 6.15001 26.0697C6.09281 26.0697 6.03794 26.0462 5.99749 26.0044C5.95705 25.9626 5.93433 25.9059 5.93433 25.8468V24.0666C5.93433 24.0075 5.95705 23.9508 5.99749 23.909C6.03794 23.8672 6.09281 23.8438 6.15001 23.8438Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M6.62959 21.4897C6.66671 21.5331 6.68793 21.5885 6.68954 21.6464C6.69168 21.672 6.68889 21.6977 6.68133 21.7222C6.67375 21.7466 6.66156 21.7693 6.64544 21.7888C6.64544 21.7888 6.63166 21.8073 6.60823 21.8408C6.57473 21.886 6.54433 21.9336 6.51727 21.9832C6.43592 22.1357 6.38617 22.3039 6.37119 22.4774V22.5486C6.37119 22.5721 6.37119 22.5949 6.37119 22.6234V23.3483C6.37119 23.4074 6.34846 23.464 6.30801 23.5058C6.26756 23.5476 6.2127 23.5711 6.1555 23.5711C6.09829 23.5711 6.04344 23.5476 6.00299 23.5058C5.96255 23.464 5.93982 23.4074 5.93982 23.3483V22.6269C5.93982 22.6013 5.93982 22.5692 5.93982 22.5372L5.94464 22.4411C5.96517 22.2062 6.03251 21.9784 6.14241 21.7717C6.1791 21.7042 6.22008 21.6393 6.26507 21.5773L6.31606 21.5061C6.33625 21.4811 6.36112 21.4606 6.38919 21.4458C6.41726 21.431 6.44793 21.4222 6.47937 21.42C6.50838 21.4194 6.53716 21.4254 6.56362 21.4378C6.59007 21.4501 6.61355 21.4683 6.63235 21.4912"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M8.95387 21.0837C8.95387 21.1426 8.93126 21.1992 8.89095 21.241C8.85064 21.2828 8.79593 21.3063 8.73887 21.3065H7.87615C7.77004 21.3065 7.65634 21.3179 7.564 21.3208C7.52128 21.3251 7.47925 21.3293 7.43997 21.3364L7.3304 21.3578C7.27652 21.3707 7.2236 21.3874 7.17192 21.4077C7.13402 21.4219 7.11266 21.4312 7.11266 21.4312C7.08944 21.4412 7.06449 21.4464 7.03927 21.4464C7.01405 21.4464 6.98911 21.4412 6.96588 21.4312C6.91283 21.4131 6.86768 21.3763 6.83841 21.3272C6.82287 21.3019 6.81301 21.2734 6.80955 21.2437C6.80609 21.214 6.80913 21.1839 6.81842 21.1556C6.82972 21.1252 6.84674 21.0975 6.86851 21.074C6.89028 21.0505 6.91634 21.0318 6.94521 21.0189L7.02514 20.9882C7.09557 20.9616 7.16758 20.94 7.24083 20.9234C7.2863 20.9135 7.33592 20.9071 7.38898 20.8985C7.44204 20.89 7.49785 20.8772 7.55573 20.8736C7.66461 20.8736 7.76659 20.8586 7.87615 20.8586H8.73887C8.79593 20.8589 8.85064 20.8824 8.89095 20.9242C8.93126 20.966 8.95387 21.0226 8.95387 21.0815"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M11.3698 21.0837C11.3698 21.1428 11.347 21.1995 11.3066 21.2413C11.2661 21.2831 11.2113 21.3066 11.1541 21.3066H9.43141C9.40309 21.3066 9.37504 21.3008 9.34886 21.2897C9.32267 21.2784 9.2989 21.262 9.27892 21.2413C9.25886 21.2207 9.24302 21.1961 9.23213 21.169C9.22131 21.142 9.21573 21.113 9.21573 21.0837C9.21573 21.0545 9.22131 21.0255 9.23213 20.9984C9.24302 20.9714 9.25886 20.9468 9.27892 20.9261C9.2989 20.9054 9.32267 20.889 9.34886 20.8778C9.37504 20.8666 9.40309 20.8608 9.43141 20.8608H11.1541C11.2113 20.8608 11.2661 20.8843 11.3066 20.9261C11.347 20.9679 11.3698 21.0246 11.3698 21.0837Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M13.7891 21.0837C13.7891 21.1428 13.7664 21.1995 13.7259 21.2413C13.6855 21.2831 13.6306 21.3066 13.5734 21.3066H11.8508C11.8224 21.3066 11.7944 21.3008 11.7682 21.2897C11.742 21.2784 11.7182 21.262 11.6983 21.2413C11.6782 21.2207 11.6624 21.1961 11.6515 21.169C11.6407 21.142 11.6351 21.113 11.6351 21.0837C11.6351 21.0545 11.6407 21.0255 11.6515 20.9984C11.6624 20.9714 11.6782 20.9468 11.6983 20.9261C11.7182 20.9054 11.742 20.889 11.7682 20.8778C11.7944 20.8666 11.8224 20.8608 11.8508 20.8608H13.5734C13.6306 20.8608 13.6855 20.8843 13.7259 20.9261C13.7664 20.9679 13.7891 21.0246 13.7891 21.0837Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M16.2009 21.0837C16.2009 21.1428 16.1782 21.1995 16.1377 21.2413C16.0973 21.2831 16.0424 21.3066 15.9852 21.3066H14.2625C14.2053 21.3066 14.1505 21.2831 14.11 21.2413C14.0696 21.1995 14.0468 21.1428 14.0468 21.0837C14.0468 21.0246 14.0696 20.9679 14.11 20.9261C14.1505 20.8843 14.2053 20.8608 14.2625 20.8608H15.9852C16.0424 20.8608 16.0973 20.8843 16.1377 20.9261C16.1782 20.9679 16.2009 21.0246 16.2009 21.0837Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M18.6174 21.0837C18.6174 21.1428 18.5947 21.1995 18.5542 21.2413C18.5138 21.2831 18.4589 21.3066 18.4017 21.3066H16.6791C16.6219 21.3066 16.567 21.2831 16.5266 21.2413C16.4861 21.1995 16.4634 21.1428 16.4634 21.0837C16.4634 21.0246 16.4861 20.9679 16.5266 20.9261C16.567 20.8843 16.6219 20.8608 16.6791 20.8608H18.4017C18.4589 20.8608 18.5138 20.8843 18.5542 20.9261C18.5947 20.9679 18.6174 21.0246 18.6174 21.0837Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M21.0334 21.0837C21.0334 21.1428 21.0106 21.1995 20.9702 21.2413C20.9297 21.2831 20.8749 21.3066 20.8177 21.3066H19.095C19.0667 21.3066 19.0386 21.3008 19.0125 21.2897C18.9863 21.2784 18.9625 21.262 18.9425 21.2413C18.9225 21.2207 18.9066 21.1961 18.8957 21.169C18.8849 21.142 18.8793 21.113 18.8793 21.0837C18.8793 21.0545 18.8849 21.0255 18.8957 20.9984C18.9066 20.9714 18.9225 20.9468 18.9425 20.9261C18.9625 20.9054 18.9863 20.889 19.0125 20.8778C19.0386 20.8666 19.0667 20.8608 19.095 20.8608H20.8177C20.8749 20.8608 20.9297 20.8843 20.9702 20.9261C21.0106 20.9679 21.0334 21.0246 21.0334 21.0837Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M23.4485 21.0837C23.4485 21.1428 23.4258 21.1995 23.3853 21.2413C23.3449 21.2831 23.29 21.3066 23.2328 21.3066H21.5101C21.4818 21.3066 21.4538 21.3008 21.4276 21.2897C21.4014 21.2784 21.3776 21.262 21.3577 21.2413C21.3376 21.2207 21.3217 21.1961 21.3109 21.169C21.3 21.142 21.2945 21.113 21.2945 21.0837C21.2945 21.0545 21.3 21.0255 21.3109 20.9984C21.3217 20.9714 21.3376 20.9468 21.3577 20.9261C21.3776 20.9054 21.4014 20.889 21.4276 20.8778C21.4538 20.8666 21.4818 20.8608 21.5101 20.8608H23.2328C23.29 20.8608 23.3449 20.8843 23.3853 20.9261C23.4258 20.9679 23.4485 21.0246 23.4485 21.0837Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M25.8645 21.0837C25.8645 21.113 25.8589 21.142 25.8481 21.169C25.8372 21.1961 25.8214 21.2207 25.8013 21.2413C25.7813 21.262 25.7575 21.2784 25.7314 21.2897C25.7052 21.3008 25.6771 21.3066 25.6488 21.3066H23.9261C23.8978 21.3066 23.8698 21.3008 23.8436 21.2897C23.8174 21.2784 23.7936 21.262 23.7736 21.2413C23.7536 21.2207 23.7377 21.1961 23.7268 21.169C23.716 21.142 23.7104 21.113 23.7104 21.0837C23.7104 21.0545 23.716 21.0255 23.7268 20.9984C23.7377 20.9714 23.7536 20.9468 23.7736 20.9261C23.7936 20.9054 23.8174 20.889 23.8436 20.8778C23.8698 20.8666 23.8978 20.8608 23.9261 20.8608H25.6488C25.6771 20.8608 25.7052 20.8666 25.7314 20.8778C25.7575 20.889 25.7813 20.9054 25.8013 20.9261C25.8214 20.9468 25.8372 20.9714 25.8481 20.9984C25.8589 21.0255 25.8645 21.0545 25.8645 21.0837Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M28.2803 21.0837C28.2803 21.1428 28.2576 21.1995 28.2171 21.2413C28.1767 21.2831 28.1218 21.3066 28.0646 21.3066H26.342C26.2848 21.3066 26.2299 21.2831 26.1895 21.2413C26.149 21.1995 26.1263 21.1428 26.1263 21.0837C26.1263 21.0246 26.149 20.9679 26.1895 20.9261C26.2299 20.8843 26.2848 20.8608 26.342 20.8608H28.0646C28.1218 20.8608 28.1767 20.8843 28.2171 20.9261C28.2576 20.9679 28.2803 21.0246 28.2803 21.0837Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M30.6963 21.0837C30.6963 21.1428 30.6735 21.1995 30.6331 21.2413C30.5926 21.2831 30.5378 21.3066 30.4806 21.3066H28.7579C28.7007 21.3066 28.6459 21.2831 28.6054 21.2413C28.565 21.1995 28.5422 21.1428 28.5422 21.0837C28.5422 21.0246 28.565 20.9679 28.6054 20.9261C28.6459 20.8843 28.7007 20.8608 28.7579 20.8608H30.4806C30.5378 20.8608 30.5926 20.8843 30.6331 20.9261C30.6735 20.9679 30.6963 21.0246 30.6963 21.0837Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M33.1121 21.0837C33.1121 21.1428 33.0894 21.1995 33.0489 21.2413C33.0085 21.2831 32.9536 21.3066 32.8964 21.3066H31.1738C31.1455 21.3066 31.1174 21.3008 31.0912 21.2897C31.065 21.2784 31.0413 21.262 31.0213 21.2413C31.0012 21.2207 30.9854 21.1961 30.9745 21.169C30.9637 21.142 30.9581 21.113 30.9581 21.0837C30.9581 21.0545 30.9637 21.0255 30.9745 20.9984C30.9854 20.9714 31.0012 20.9468 31.0213 20.9261C31.0413 20.9054 31.065 20.889 31.0912 20.8778C31.1174 20.8666 31.1455 20.8608 31.1738 20.8608H32.8964C32.9536 20.8608 33.0085 20.8843 33.0489 20.9261C33.0894 20.9679 33.1121 21.0246 33.1121 21.0837Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M35.5066 21.2539C35.4824 21.306 35.4411 21.3475 35.3902 21.3714C35.368 21.3837 35.3437 21.3914 35.3186 21.394C35.2935 21.3965 35.2682 21.394 35.2441 21.3863L35.1835 21.3707C35.1297 21.3568 35.0752 21.3465 35.0202 21.3401C34.9857 21.3401 34.9512 21.323 34.9092 21.3208C34.8672 21.3187 34.8155 21.3066 34.7666 21.3066H33.5876C33.5304 21.3066 33.4755 21.2831 33.4351 21.2413C33.3946 21.1995 33.3719 21.1428 33.3719 21.0837C33.3719 21.0246 33.3946 20.9679 33.4351 20.9261C33.4755 20.8843 33.5304 20.8608 33.5876 20.8608H34.7666C34.8183 20.8608 34.863 20.8729 34.9147 20.8751C34.9664 20.8772 35.0181 20.8872 35.0643 20.89C35.1388 20.8998 35.2128 20.9145 35.2855 20.9342C35.3378 20.9484 35.3681 20.9584 35.3681 20.9584C35.4278 20.9785 35.4774 21.0223 35.506 21.0802C35.5182 21.1074 35.5246 21.137 35.5246 21.167C35.5246 21.197 35.5182 21.2267 35.506 21.2539"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M36.3302 23.4159C36.273 23.4159 36.2182 23.3924 36.1777 23.3506C36.1373 23.3088 36.1145 23.2522 36.1145 23.1931V22.6291C36.1145 22.6013 36.1145 22.5785 36.1145 22.5579C36.1145 22.5372 36.1145 22.5116 36.1145 22.4867C36.1145 22.4404 36.1014 22.3941 36.0959 22.3443C36.0625 22.1739 35.9954 22.0124 35.8988 21.87L35.843 21.7917L35.7941 21.7369L35.7631 21.7005L35.7507 21.6892C35.7139 21.6513 35.6929 21.6003 35.6921 21.5467C35.688 21.4887 35.7036 21.4311 35.7362 21.3837C35.7528 21.3594 35.7744 21.3392 35.7994 21.3246C35.8244 21.3099 35.8522 21.3011 35.8809 21.2989C35.9126 21.2979 35.9442 21.3037 35.9736 21.316C36.003 21.3282 36.0296 21.3467 36.0518 21.3701L36.0683 21.3858L36.1104 21.4342L36.1793 21.509L36.2551 21.6144C36.3858 21.8068 36.4768 22.025 36.5225 22.2553C36.5307 22.3186 36.5438 22.3813 36.5473 22.444C36.5473 22.476 36.5473 22.5066 36.5521 22.5379C36.5569 22.5693 36.5521 22.5992 36.5521 22.6241V23.1881C36.5521 23.2472 36.5293 23.3038 36.4889 23.3456C36.4484 23.3874 36.3936 23.4109 36.3364 23.4109"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M36.3301 25.9115C36.2731 25.9115 36.2183 25.8881 36.1778 25.8465C36.1375 25.8048 36.1146 25.7483 36.1144 25.6893V23.9092C36.1144 23.8501 36.1372 23.7934 36.1776 23.7516C36.2181 23.7098 36.2729 23.6863 36.3301 23.6863C36.3873 23.6863 36.4422 23.7098 36.4826 23.7516C36.5231 23.7934 36.5458 23.8501 36.5458 23.9092V25.6893C36.5456 25.7483 36.5228 25.8048 36.4824 25.8465C36.442 25.8881 36.3872 25.9115 36.3301 25.9115Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M36.3301 28.4083C36.2729 28.4083 36.2181 28.3848 36.1776 28.343C36.1372 28.3012 36.1144 28.2445 36.1144 28.1854V26.4053C36.1144 26.3462 36.1372 26.2895 36.1776 26.2477C36.2181 26.2059 36.2729 26.1824 36.3301 26.1824C36.3873 26.1824 36.4422 26.2059 36.4826 26.2477C36.5231 26.2895 36.5458 26.3462 36.5458 26.4053V28.1854C36.5458 28.2147 36.5402 28.2437 36.5294 28.2707C36.5185 28.2977 36.5027 28.3223 36.4826 28.343C36.4626 28.3637 36.4388 28.3801 36.4127 28.3914C36.3865 28.4026 36.3584 28.4083 36.3301 28.4083Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M36.3301 30.9047C36.2729 30.9047 36.2181 30.8812 36.1776 30.8394C36.1372 30.7976 36.1144 30.7409 36.1144 30.6818V28.9016C36.1144 28.8425 36.1372 28.7858 36.1776 28.744C36.2181 28.7022 36.2729 28.6787 36.3301 28.6787C36.3873 28.6787 36.4422 28.7022 36.4826 28.744C36.5231 28.7858 36.5458 28.8425 36.5458 28.9016V30.6818C36.5458 30.711 36.5402 30.74 36.5294 30.7671C36.5185 30.7941 36.5027 30.8187 36.4826 30.8394C36.4626 30.8601 36.4388 30.8765 36.4127 30.8877C36.3865 30.8989 36.3584 30.9047 36.3301 30.9047Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M36.3301 33.4013C36.2729 33.4013 36.2181 33.3778 36.1776 33.336C36.1372 33.2942 36.1144 33.2375 36.1144 33.1784V31.3982C36.1144 31.3391 36.1372 31.2824 36.1776 31.2406C36.2181 31.1988 36.2729 31.1753 36.3301 31.1753C36.3873 31.1753 36.4422 31.1988 36.4826 31.2406C36.5231 31.2824 36.5458 31.3391 36.5458 31.3982V33.1784C36.5458 33.2077 36.5402 33.2366 36.5294 33.2637C36.5185 33.2907 36.5027 33.3153 36.4826 33.336C36.4626 33.3567 36.4388 33.3731 36.4127 33.3843C36.3865 33.3955 36.3584 33.4013 36.3301 33.4013Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M36.3301 35.8975C36.2729 35.8975 36.2181 35.8741 36.1776 35.8323C36.1372 35.7905 36.1144 35.7338 36.1144 35.6747V33.8945C36.1144 33.8354 36.1372 33.7787 36.1776 33.7369C36.2181 33.6951 36.2729 33.6716 36.3301 33.6716C36.3873 33.6716 36.4422 33.6951 36.4826 33.7369C36.5231 33.7787 36.5458 33.8354 36.5458 33.8945V35.6747C36.5458 35.7039 36.5402 35.7329 36.5294 35.76C36.5185 35.787 36.5027 35.8115 36.4826 35.8323C36.4626 35.853 36.4388 35.8694 36.4127 35.8806C36.3865 35.8918 36.3584 35.8975 36.3301 35.8975Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M36.3301 38.3937C36.2731 38.3937 36.2183 38.3703 36.1778 38.3287C36.1375 38.287 36.1146 38.2305 36.1144 38.1715V36.3913C36.1144 36.3322 36.1372 36.2756 36.1776 36.2338C36.2181 36.192 36.2729 36.1685 36.3301 36.1685C36.3873 36.1685 36.4422 36.192 36.4826 36.2338C36.5231 36.2756 36.5458 36.3322 36.5458 36.3913V38.1715C36.5456 38.2305 36.5228 38.287 36.4824 38.3287C36.442 38.3703 36.3872 38.3937 36.3301 38.3937Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M36.3301 40.8902C36.2729 40.8902 36.2181 40.8667 36.1776 40.825C36.1372 40.7832 36.1144 40.7265 36.1144 40.6674V38.8872C36.1144 38.8281 36.1372 38.7713 36.1776 38.7295C36.2181 38.6877 36.2729 38.6643 36.3301 38.6643C36.3873 38.6643 36.4422 38.6877 36.4826 38.7295C36.5231 38.7713 36.5458 38.8281 36.5458 38.8872V40.6674C36.5458 40.6966 36.5402 40.7256 36.5294 40.7527C36.5185 40.7797 36.5027 40.8042 36.4826 40.825C36.4626 40.8457 36.4388 40.862 36.4127 40.8732C36.3865 40.8845 36.3584 40.8902 36.3301 40.8902Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M36.3301 43.3866C36.2729 43.3866 36.2181 43.3631 36.1776 43.3213C36.1372 43.2795 36.1144 43.2228 36.1144 43.1637V41.3835C36.1144 41.3244 36.1372 41.2677 36.1776 41.2259C36.2181 41.1841 36.2729 41.1606 36.3301 41.1606C36.3873 41.1606 36.4422 41.1841 36.4826 41.2259C36.5231 41.2677 36.5458 41.3244 36.5458 41.3835V43.1637C36.5458 43.193 36.5402 43.222 36.5294 43.249C36.5185 43.276 36.5027 43.3006 36.4826 43.3213C36.4626 43.342 36.4388 43.3584 36.4127 43.3696C36.3865 43.3808 36.3584 43.3866 36.3301 43.3866Z"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M38.1266 30.3635H31.2999C30.6329 30.3635 29.9931 30.6373 29.5215 31.1248C29.0497 31.6122 28.7848 32.2733 28.7848 32.9626C28.7848 33.6519 29.0497 34.313 29.5215 34.8004C29.9931 35.2878 30.6329 35.5617 31.2999 35.5617H38.1266C38.2193 35.5647 38.3116 35.5486 38.3982 35.5143C38.4848 35.4799 38.5639 35.4281 38.6308 35.3618C38.6977 35.2954 38.7512 35.216 38.788 35.128C38.8249 35.0401 38.8443 34.9455 38.8453 34.8496V31.1347C38.8462 30.935 38.7716 30.7427 38.6374 30.599C38.5031 30.4554 38.3198 30.3716 38.1266 30.3657"
                                                                fill="#6ABE59"
                                                            />
                                                            <path
                                                                d="M38.3319 30.737C38.3321 30.7764 38.3473 30.8141 38.3743 30.842C38.4012 30.8698 38.4378 30.8856 38.4759 30.8858H38.8122C38.7713 30.7773 38.7128 30.6769 38.6392 30.5889H38.4759C38.4378 30.5889 38.4013 30.6045 38.3744 30.6322C38.3473 30.6599 38.3321 30.6976 38.3319 30.737Z"
                                                                fill="#2F6C5D"
                                                            />
                                                            <path
                                                                d="M38.0349 30.5885H36.8849C36.8652 30.5871 36.8454 30.5898 36.8268 30.5967C36.8082 30.6035 36.7911 30.6142 36.7767 30.6282C36.7622 30.642 36.7507 30.6589 36.7428 30.6776C36.7349 30.6964 36.7309 30.7165 36.7309 30.737C36.7309 30.7574 36.7349 30.7776 36.7428 30.7963C36.7507 30.815 36.7622 30.8318 36.7767 30.8458C36.7911 30.8597 36.8082 30.8704 36.8268 30.8772C36.8454 30.8841 36.8652 30.8869 36.8849 30.8854H38.0349C38.0713 30.8828 38.1054 30.8661 38.1303 30.8385C38.1552 30.8109 38.169 30.7746 38.169 30.737C38.169 30.6993 38.1552 30.663 38.1303 30.6354C38.1054 30.6079 38.0713 30.5911 38.0349 30.5885Z"
                                                                fill="#2F6C5D"
                                                            />
                                                            <path
                                                                d="M36.4439 30.5889H35.2938C35.2574 30.5914 35.2233 30.6082 35.1984 30.6358C35.1735 30.6633 35.1598 30.6997 35.1598 30.7373C35.1598 30.775 35.1735 30.8113 35.1984 30.8389C35.2233 30.8664 35.2574 30.8832 35.2938 30.8858H36.4439C36.4802 30.8832 36.5143 30.8664 36.5392 30.8389C36.5641 30.8113 36.5779 30.775 36.5779 30.7373C36.5779 30.6997 36.5641 30.6633 36.5392 30.6358C36.5143 30.6082 36.4802 30.5914 36.4439 30.5889Z"
                                                                fill="#2F6C5D"
                                                            />
                                                            <path
                                                                d="M34.8528 30.5885H33.7034C33.6837 30.5871 33.6639 30.5898 33.6453 30.5967C33.6267 30.6035 33.6096 30.6142 33.5952 30.6282C33.5807 30.642 33.5692 30.6589 33.5614 30.6776C33.5534 30.6964 33.5494 30.7165 33.5494 30.737C33.5494 30.7574 33.5534 30.7776 33.5614 30.7963C33.5692 30.815 33.5807 30.8318 33.5952 30.8458C33.6096 30.8597 33.6267 30.8704 33.6453 30.8772C33.6639 30.8841 33.6837 30.8869 33.7034 30.8854H34.8528C34.8725 30.8869 34.8922 30.8841 34.9108 30.8772C34.9295 30.8704 34.9465 30.8597 34.9609 30.8458C34.9754 30.8318 34.9869 30.815 34.9948 30.7963C35.0026 30.7776 35.0067 30.7574 35.0067 30.737C35.0067 30.7165 35.0026 30.6964 34.9948 30.6776C34.9869 30.6589 34.9754 30.642 34.9609 30.6282C34.9465 30.6142 34.9295 30.6035 34.9108 30.5967C34.8922 30.5898 34.8725 30.5871 34.8528 30.5885Z"
                                                                fill="#2F6C5D"
                                                            />
                                                            <path
                                                                d="M33.2624 30.5885H32.1123C32.0926 30.5871 32.0728 30.5898 32.0542 30.5967C32.0356 30.6035 32.0185 30.6142 32.0041 30.6282C31.9897 30.642 31.9782 30.6589 31.9703 30.6776C31.9624 30.6964 31.9584 30.7165 31.9584 30.737C31.9584 30.7574 31.9624 30.7776 31.9703 30.7963C31.9782 30.815 31.9897 30.8318 32.0041 30.8458C32.0185 30.8597 32.0356 30.8704 32.0542 30.8772C32.0728 30.8841 32.0926 30.8869 32.1123 30.8854H33.2624C33.2988 30.8828 33.3329 30.8661 33.3577 30.8385C33.3826 30.8109 33.3965 30.7746 33.3965 30.737C33.3965 30.6993 33.3826 30.663 33.3577 30.6354C33.3329 30.6079 33.2988 30.5911 33.2624 30.5885Z"
                                                                fill="#2F6C5D"
                                                            />
                                                            <path
                                                                d="M31.6713 30.5889H31.3075C31.2386 30.5889 31.1593 30.6095 31.0835 30.6131C31.0077 30.6166 30.9319 30.6423 30.8603 30.653C30.7886 30.6636 30.7225 30.6907 30.6694 30.7042C30.6245 30.7163 30.5806 30.7314 30.5378 30.7498L30.4882 30.7697C30.4696 30.776 30.4525 30.7863 30.4381 30.7999C30.4237 30.8135 30.4122 30.83 30.4044 30.8486C30.3967 30.8671 30.3929 30.8871 30.3931 30.9072C30.3934 30.9274 30.3979 30.9473 30.4062 30.9656C30.4217 31.0001 30.4489 31.0275 30.4827 31.0427C30.5164 31.0579 30.5544 31.0598 30.5895 31.0482L30.6329 31.0318C30.6704 31.0159 30.7092 31.0031 30.7486 30.9933C30.7976 30.9812 30.8534 30.9634 30.9154 30.9513C30.9774 30.9392 31.0436 30.9164 31.1097 30.9086C31.1759 30.9008 31.2475 30.8858 31.3075 30.8858H31.6713C31.7077 30.8832 31.7417 30.8664 31.7667 30.8389C31.7916 30.8113 31.8054 30.775 31.8054 30.7373C31.8054 30.6997 31.7916 30.6633 31.7667 30.6358C31.7417 30.6082 31.7077 30.5914 31.6713 30.5889Z"
                                                                fill="#2F6C5D"
                                                            />
                                                            <path
                                                                d="M30.0678 30.9863L30.023 31.0148C29.9948 31.0341 29.9576 31.0647 29.9114 31.1003L29.837 31.1572C29.8128 31.1807 29.7867 31.2042 29.7605 31.2284L29.6785 31.3061C29.6523 31.3338 29.6268 31.3637 29.6013 31.3929L29.5241 31.4805L29.4552 31.5717L29.3932 31.6578L29.3443 31.7397C29.3147 31.7903 29.2892 31.8323 29.2754 31.8622L29.2519 31.9113C29.2424 31.929 29.2366 31.9485 29.235 31.9686C29.2333 31.9888 29.2358 32.0091 29.2424 32.0282C29.2488 32.0472 29.2592 32.0646 29.2728 32.0792C29.2863 32.0938 29.3027 32.1053 29.3209 32.1128C29.3548 32.1284 29.3932 32.1304 29.4284 32.118C29.4637 32.1058 29.4932 32.0803 29.511 32.0466C29.511 32.0466 29.5179 32.031 29.531 32.0039C29.5441 31.9768 29.5675 31.9405 29.5937 31.8964L29.6358 31.8252L29.6902 31.754L29.7481 31.6735L29.817 31.5966C29.8397 31.5717 29.8625 31.546 29.8859 31.5204L29.9548 31.4535L30.0237 31.3901L30.0885 31.3402C30.1291 31.3089 30.1615 31.2819 30.1863 31.269L30.2256 31.2441C30.2564 31.2225 30.2782 31.1896 30.2866 31.1522C30.295 31.1147 30.2895 31.0754 30.2711 31.0419C30.2618 31.0243 30.249 31.009 30.2336 30.9969C30.2182 30.9848 30.2005 30.9761 30.1816 30.9715C30.1628 30.967 30.1432 30.9665 30.1242 30.9703C30.1052 30.9741 30.0871 30.982 30.0713 30.9935"
                                                                fill="#2F6C5D"
                                                            />
                                                            <path
                                                                d="M29.3621 33.5387L29.3511 33.4924C29.3394 33.4522 29.3304 33.4113 29.3242 33.3699C29.3174 33.3186 29.307 33.2588 29.2994 33.1947C29.2919 33.1306 29.2925 33.0601 29.2891 32.9911C29.2857 32.922 29.296 32.8522 29.2994 32.7874C29.3029 32.7226 29.3174 32.6635 29.3242 32.6115C29.3305 32.5704 29.3395 32.5297 29.3511 32.4898C29.358 32.4599 29.3621 32.4435 29.3621 32.4435C29.3705 32.4063 29.3652 32.3674 29.3475 32.334C29.3296 32.3006 29.3005 32.2752 29.2657 32.2626C29.2473 32.2559 29.2278 32.2532 29.2084 32.2549C29.189 32.2565 29.1702 32.2623 29.1531 32.272C29.1361 32.2817 29.1212 32.295 29.1095 32.311C29.0977 32.3271 29.0895 32.3456 29.0851 32.3652L29.072 32.4179C29.0592 32.4646 29.0491 32.5122 29.0417 32.5603C29.0335 32.6187 29.0217 32.687 29.0135 32.7611C29.0052 32.8351 29.0059 32.9142 29.0018 32.9932C28.9976 33.0722 29.0093 33.1513 29.0135 33.2253C29.0176 33.2994 29.0335 33.3678 29.0417 33.4261C29.0491 33.4742 29.0592 33.5217 29.072 33.5686L29.0851 33.6213C29.0895 33.6408 29.0977 33.6593 29.1095 33.6754C29.1212 33.6914 29.1361 33.7047 29.1531 33.7144C29.1702 33.7241 29.189 33.7299 29.2084 33.7316C29.2278 33.7332 29.2473 33.7306 29.2657 33.7238C29.3005 33.7113 29.3296 33.6858 29.3475 33.6524C29.3652 33.619 29.3705 33.58 29.3621 33.5429"
                                                                fill="#2F6C5D"
                                                            />
                                                            <path
                                                                d="M30.2222 34.7452L30.183 34.7202C30.1582 34.7031 30.1258 34.6761 30.0851 34.649L30.0162 34.5992C29.9955 34.5785 29.9728 34.5579 29.9473 34.5358C29.9218 34.5137 29.8997 34.4917 29.8784 34.4682L29.8095 34.392L29.7406 34.3158C29.7213 34.288 29.7013 34.2617 29.6827 34.2353C29.6641 34.209 29.6455 34.1841 29.6283 34.1606L29.5862 34.0894C29.56 34.0452 29.5387 34.0082 29.5235 33.9818C29.5084 33.9555 29.5035 33.9391 29.5035 33.9391C29.4857 33.9054 29.4562 33.8799 29.4209 33.8676C29.3857 33.8554 29.3473 33.8572 29.3133 33.8729C29.2952 33.8804 29.2788 33.8919 29.2652 33.9065C29.2517 33.9211 29.2413 33.9385 29.2349 33.9576C29.2283 33.9766 29.2258 33.9969 29.2275 34.0171C29.2291 34.0372 29.2349 34.0567 29.2444 34.0744C29.2444 34.0744 29.2527 34.0922 29.2679 34.1228C29.283 34.1534 29.3092 34.194 29.3368 34.246L29.3857 34.3279L29.4477 34.4133L29.5166 34.5052L29.5931 34.5928C29.6193 34.622 29.6448 34.6519 29.671 34.6797L29.753 34.7566L29.8295 34.8278L29.9039 34.8854C29.9501 34.921 29.9873 34.9517 30.0155 34.9709L30.0603 34.9987C30.0762 35.0101 30.0941 35.018 30.1131 35.0219C30.1321 35.0257 30.1517 35.0254 30.1705 35.0209C30.1894 35.0164 30.2071 35.0078 30.2225 34.9957C30.2379 34.9837 30.2508 34.9685 30.2601 34.9509C30.2785 34.9175 30.284 34.8781 30.2756 34.8406C30.2672 34.8032 30.2455 34.7704 30.2147 34.7487"
                                                                fill="#2F6C5D"
                                                            />
                                                            <path
                                                                d="M31.6713 35.0433H31.3075C31.2448 35.0433 31.1772 35.0504 31.1097 35.0433C31.0422 35.0362 30.9774 35.0298 30.9154 35.0213C30.8534 35.0127 30.7976 34.9942 30.7486 34.9821C30.7092 34.9727 30.6705 34.9603 30.6329 34.9451L30.5895 34.9301C30.5545 34.9182 30.5163 34.9201 30.4826 34.9353C30.4487 34.9505 30.4216 34.9781 30.4062 35.0127C30.3979 35.0309 30.3934 35.0508 30.3931 35.071C30.3929 35.0912 30.3967 35.1112 30.4044 35.1297C30.4122 35.1482 30.4237 35.1648 30.4381 35.1784C30.4525 35.192 30.4696 35.2023 30.4882 35.2085L30.5378 35.227C30.5806 35.2448 30.6246 35.2595 30.6694 35.2712C30.7252 35.2847 30.79 35.3054 30.8603 35.3189C30.9305 35.3324 31.007 35.331 31.0835 35.3388C31.16 35.3467 31.2358 35.3388 31.3075 35.3388H31.6713C31.7095 35.3388 31.7461 35.3232 31.7731 35.2953C31.8002 35.2673 31.8153 35.2295 31.8153 35.19C31.8153 35.1506 31.8002 35.1127 31.7731 35.0848C31.7461 35.0569 31.7095 35.0412 31.6713 35.0412"
                                                                fill="#2F6C5D"
                                                            />
                                                            <path
                                                                d="M33.2624 35.0435H32.1124C32.0742 35.0435 32.0375 35.0591 32.0105 35.087C31.9835 35.1149 31.9684 35.1528 31.9684 35.1923C31.9684 35.2317 31.9835 35.2696 32.0105 35.2975C32.0375 35.3254 32.0742 35.3411 32.1124 35.3411H33.2624C33.3006 35.3411 33.3373 35.3254 33.3643 35.2975C33.3913 35.2696 33.4065 35.2317 33.4065 35.1923C33.4065 35.1528 33.3913 35.1149 33.3643 35.087C33.3373 35.0591 33.3006 35.0435 33.2624 35.0435Z"
                                                                fill="#2F6C5D"
                                                            />
                                                            <path
                                                                d="M34.8528 35.0435H33.7034C33.6845 35.0435 33.6658 35.0473 33.6482 35.0548C33.6308 35.0623 33.6149 35.0732 33.6015 35.087C33.5882 35.1009 33.5775 35.1173 33.5703 35.1353C33.5631 35.1534 33.5594 35.1727 33.5594 35.1923C33.5594 35.2118 33.5631 35.2312 33.5703 35.2492C33.5775 35.2673 33.5882 35.2837 33.6015 35.2975C33.6149 35.3113 33.6308 35.3223 33.6482 35.3298C33.6658 35.3373 33.6845 35.3411 33.7034 35.3411H34.8528C34.8909 35.3411 34.9276 35.3254 34.9546 35.2975C34.9816 35.2696 34.9968 35.2317 34.9968 35.1923C34.9968 35.1528 34.9816 35.1149 34.9546 35.087C34.9276 35.0591 34.8909 35.0435 34.8528 35.0435Z"
                                                                fill="#2F6C5D"
                                                            />
                                                            <path
                                                                d="M36.4439 35.0435H35.2938C35.2556 35.0435 35.219 35.0591 35.192 35.087C35.1649 35.1149 35.1498 35.1528 35.1498 35.1923C35.1498 35.2317 35.1649 35.2696 35.192 35.2975C35.219 35.3254 35.2556 35.3411 35.2938 35.3411H36.4439C36.4821 35.3411 36.5187 35.3254 36.5457 35.2975C36.5727 35.2696 36.5879 35.2317 36.5879 35.1923C36.5879 35.1528 36.5727 35.1149 36.5457 35.087C36.5187 35.0591 36.4821 35.0435 36.4439 35.0435Z"
                                                                fill="#2F6C5D"
                                                            />
                                                            <path
                                                                d="M38.0349 35.0435H36.8849C36.8467 35.0435 36.81 35.0591 36.783 35.087C36.756 35.1149 36.7408 35.1528 36.7408 35.1923C36.7408 35.2317 36.756 35.2696 36.783 35.2975C36.81 35.3254 36.8467 35.3411 36.8849 35.3411H38.0349C38.0731 35.3411 38.1098 35.3254 38.1368 35.2975C38.1638 35.2696 38.1789 35.2317 38.1789 35.1923C38.1789 35.1528 38.1638 35.1149 38.1368 35.087C38.1098 35.0591 38.0731 35.0435 38.0349 35.0435Z"
                                                                fill="#2F6C5D"
                                                            />
                                                            <path
                                                                d="M38.3319 35.1923C38.3321 35.2317 38.3473 35.2695 38.3743 35.2973C38.4012 35.3252 38.4378 35.3409 38.4759 35.3411H38.6392C38.7275 35.2647 38.7884 35.1599 38.8122 35.0435H38.4759C38.4378 35.0437 38.4012 35.0594 38.3743 35.0872C38.3473 35.1151 38.3321 35.1528 38.3319 35.1923Z"
                                                                fill="#2F6C5D"
                                                            />
                                                            <path
                                                                d="M32.3776 32.965C32.3776 33.1853 32.3144 33.4006 32.196 33.5837C32.0776 33.7669 31.9093 33.9096 31.7123 33.9939C31.5154 34.0782 31.2987 34.1003 31.0897 34.0573C30.8806 34.0143 30.6885 33.9082 30.5378 33.7525C30.3871 33.5968 30.2845 33.3983 30.2428 33.1823C30.2013 32.9662 30.2227 32.7423 30.3042 32.5388C30.3858 32.3353 30.5239 32.1614 30.7012 32.039C30.8784 31.9166 31.0868 31.8513 31.2999 31.8513C31.5857 31.8513 31.8599 31.9687 32.062 32.1775C32.2641 32.3864 32.3776 32.6696 32.3776 32.965Z"
                                                                fill="#194041"
                                                            />
                                                            <path
                                                                d="M31.7857 31.9712C31.9845 32.1481 32.1138 32.3941 32.1495 32.6627C32.1851 32.9313 32.1246 33.2041 31.9793 33.4299C31.8339 33.6556 31.6138 33.8187 31.3603 33.8885C31.1068 33.9584 30.8373 33.9301 30.6025 33.8091C30.7182 33.9118 30.8536 33.9881 30.9999 34.0327C31.1461 34.0774 31.2999 34.0894 31.451 34.068C31.6021 34.0467 31.7471 33.9924 31.8764 33.9088C32.0056 33.8252 32.1162 33.7141 32.2009 33.583C32.2855 33.4519 32.3423 33.3038 32.3673 33.1483C32.3924 32.9929 32.3853 32.8337 32.3463 32.6813C32.3074 32.5289 32.2376 32.3868 32.1415 32.2644C32.0455 32.1419 31.9254 32.042 31.7891 31.9712"
                                                                fill="#194041"
                                                            />
                                                            <path
                                                                d="M10.3472 8.59455C10.3472 9.65205 10.0437 10.6858 9.47513 11.565C8.9065 12.4442 8.09842 13.1295 7.15295 13.5341C6.20747 13.9386 5.16714 14.0443 4.16351 13.8379C3.15987 13.6315 2.23803 13.1221 1.51458 12.3742C0.791124 11.6263 0.29855 10.6735 0.0991596 9.63625C-0.10023 8.59904 0.00251719 7.52402 0.39441 6.54714C0.786301 5.57028 1.44974 4.73545 2.3008 4.14826C3.15186 3.56106 4.15232 3.24786 5.17565 3.24829C6.54776 3.24829 7.86366 3.81156 8.83394 4.81417C9.80416 5.81679 10.3492 7.1766 10.3492 8.59455"
                                                                fill="#FECD10"
                                                            />
                                                            <path
                                                                d="M9.16472 8.59481C9.16472 9.41063 8.93057 10.2081 8.49197 10.8864C8.05331 11.5647 7.42983 12.0933 6.70045 12.4054C5.97105 12.7175 5.16846 12.799 4.3942 12.6397C3.61994 12.4804 2.9088 12.0874 2.35071 11.5104C1.79262 10.9334 1.41266 10.1983 1.2589 9.3981C1.10514 8.59794 1.18447 7.76859 1.48686 7.015C1.78927 6.26141 2.30114 5.61743 2.95774 5.1645C3.61436 4.71157 4.3862 4.47004 5.17566 4.47046C6.23418 4.47046 7.24936 4.90499 7.99784 5.67845C8.74631 6.45191 9.16679 7.50092 9.16679 8.59481"
                                                                fill="#FECD10"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M1.32181 7.65457C0.820013 9.85153 2.13673 12.0529 4.26276 12.5714C6.38879 13.09 8.51907 11.7293 9.02085 9.53238C9.52264 7.33534 8.20595 5.13399 6.0799 4.61545C3.95387 4.09691 1.82359 5.45757 1.32181 7.65457ZM4.2463 12.6436C2.08175 12.1156 0.741176 9.87431 1.25206 7.63755C1.76294 5.40075 3.93181 4.01544 6.09636 4.54337C8.26094 5.0713 9.60147 7.31256 9.09059 9.54939C8.57971 11.7862 6.41085 13.1715 4.2463 12.6436Z"
                                                                fill="#E56E25"
                                                            />
                                                            <path
                                                                d="M1.53738 8.96145C1.53732 8.16784 1.75886 7.39111 2.1754 6.72443C2.59195 6.05774 3.1858 5.52941 3.88571 5.20285C4.58561 4.87629 5.36184 4.76536 6.12124 4.88337C6.88065 5.00139 7.59098 5.34333 8.16697 5.86818C7.80652 5.44501 7.36599 5.10268 6.87252 4.86234C6.37906 4.62201 5.84315 4.48876 5.29789 4.47084C4.75264 4.45291 4.20961 4.55069 3.70236 4.75813C3.19511 4.96557 2.73439 5.27827 2.34867 5.67692C1.96294 6.07556 1.6604 6.55169 1.45972 7.0759C1.25904 7.60011 1.16449 8.16129 1.1819 8.72468C1.19932 9.28815 1.32832 9.84193 1.56096 10.3518C1.79359 10.8618 2.12491 11.317 2.53446 11.6894C1.89061 10.9369 1.5359 9.96661 1.53738 8.96216"
                                                                fill="#F9A01E"
                                                            />
                                                            <path
                                                                d="M3.01127 4.41894L2.71497 3.88916C2.62814 3.93758 2.54339 3.98885 2.45932 4.04226L2.75493 4.57204C2.839 4.51792 2.92376 4.46665 3.01127 4.41894Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M0.591224 8.56765C0.591224 8.51638 0.591224 8.49074 0.591224 8.41455H0C0 8.49074 0 8.51638 0 8.56765C0 8.61892 0 8.72004 0 8.72004H0.591224C0.591224 8.72004 0.591224 8.61821 0.591224 8.56765Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M2.34284 4.87116L1.96247 4.40332C1.88529 4.46669 1.80949 4.53221 1.73645 4.59986L2.11613 5.06839C2.18986 4.99719 2.26497 4.93453 2.34284 4.87116Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M0.687673 7.62221L0.104714 7.51611C0.08542 7.6158 0.0688834 7.71621 0.0544128 7.81732L0.636683 7.92342C0.651153 7.82231 0.66769 7.7219 0.687673 7.62221Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M0.919251 6.8324L0.363164 6.62305C0.326642 6.71704 0.294258 6.81317 0.261871 6.90788L0.817957 7.11723C0.848965 7.01967 0.88273 6.92425 0.919251 6.8324Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M4.52376 3.90735L4.42109 3.30493C4.32255 3.31989 4.22539 3.33697 4.12961 3.35763L4.23228 3.96004C4.32806 3.93939 4.42522 3.92159 4.52376 3.90735Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M1.28033 6.09623L0.765586 5.79004C0.713905 5.87691 0.664289 5.96521 0.617432 6.05493L1.12942 6.36041C1.17628 6.27069 1.22589 6.18239 1.27757 6.09623"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M1.75988 5.43603L1.30716 5.04297C1.24146 5.11893 1.17807 5.19678 1.11697 5.27653L1.5697 5.66959C1.63079 5.58936 1.69418 5.51151 1.75988 5.43603Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M3.74586 4.09462L3.54327 3.51855C3.44955 3.5506 3.35653 3.58549 3.26764 3.62252L3.46954 4.19716C3.56119 4.15942 3.65352 4.12595 3.74517 4.0932"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M9.52851 7.11918L10.0846 6.90983C10.0536 6.81299 10.0198 6.71686 9.9833 6.625L9.42722 6.83435C9.46443 6.92834 9.49612 7.02376 9.52851 7.11918Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M9.21425 6.36041L9.72692 6.05493C9.67938 5.96521 9.63045 5.87691 9.57877 5.79004L9.0661 6.09623C9.11778 6.18239 9.16739 6.27069 9.21425 6.36041Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M8.77679 5.66959L9.23021 5.27653C9.16908 5.19678 9.10569 5.11893 9.04002 5.04297L8.58661 5.43603C8.65276 5.51151 8.71616 5.58936 8.77679 5.66959Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M5.17565 3.85948C5.22457 3.85948 5.27418 3.85948 5.32311 3.85948V3.2478C5.27418 3.2478 5.22457 3.2478 5.17565 3.2478C5.12672 3.2478 5.07642 3.2478 5.0275 3.2478V3.85948C5.07642 3.85948 5.12603 3.85948 5.17565 3.85948Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M9.70974 7.92342L10.292 7.81732C10.2782 7.71621 10.261 7.6158 10.2417 7.51611L9.65875 7.62221C9.67874 7.7219 9.69596 7.82231 9.70974 7.92342Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M8.23029 5.06816L8.61066 4.59961C8.53672 4.53173 8.46134 4.46622 8.38464 4.40308L8.00427 4.87162C8.08145 4.935 8.15725 5.00051 8.23029 5.06887"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M6.11416 3.96004L6.21683 3.35763C6.12105 3.33697 6.02389 3.31989 5.92604 3.30493L5.82336 3.90735C5.92121 3.92159 6.01838 3.93868 6.11416 3.96004Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M6.87902 4.19862L7.08161 3.62399C6.98996 3.58696 6.89763 3.55277 6.80598 3.52002L6.60339 4.09466C6.69711 4.12599 6.79013 4.16088 6.87902 4.19862Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M7.59152 4.57204L7.88714 4.04226C7.80376 3.98885 7.71831 3.93758 7.63149 3.88916L7.33588 4.41894C7.4227 4.46665 7.50815 4.51792 7.59152 4.57204Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M8.00427 12.3188L8.38464 12.7867C8.46182 12.7231 8.53713 12.6576 8.61066 12.5901L8.23029 12.1216C8.15725 12.1928 8.08145 12.2555 8.00427 12.3188Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M5.82336 13.2822L5.92604 13.8846C6.02389 13.8696 6.12105 13.8525 6.21683 13.8319L6.11416 13.2295C6.01838 13.2509 5.92121 13.2679 5.82336 13.2822Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M7.33588 12.7705L7.63149 13.3003C7.71831 13.2519 7.80376 13.2006 7.88714 13.1472L7.59152 12.6174C7.50815 12.6716 7.4227 12.7228 7.33588 12.7705Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M6.60135 13.0949L6.80394 13.6695C6.89765 13.6375 6.98999 13.6026 7.07957 13.5655L6.87905 12.9888C6.78809 13.0265 6.69506 13.06 6.60342 13.0927"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M8.58661 11.7536L9.04002 12.1467C9.10528 12.0707 9.16867 11.9928 9.23021 11.9131L8.77679 11.52C8.71616 11.6002 8.65276 11.6781 8.58661 11.7536Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M10.3437 8.41455H9.75177C9.75177 8.49074 9.75177 8.51638 9.75177 8.56765C9.75177 8.61892 9.75177 8.72004 9.75177 8.72004H10.3437C10.3437 8.72004 10.3437 8.61821 10.3437 8.56765C10.3437 8.51709 10.3437 8.49074 10.3437 8.41455Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M9.65875 9.57098L10.2417 9.67708C10.261 9.57739 10.2782 9.47699 10.292 9.37587L9.70974 9.26978C9.69596 9.37089 9.67874 9.47129 9.65875 9.57098Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M9.42722 10.3542L9.98399 10.5635C10.0198 10.4695 10.0529 10.3734 10.0846 10.2787L9.52851 10.0693C9.4975 10.1669 9.46443 10.2623 9.42722 10.3542Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M9.0661 11.0933L9.57877 11.3995C9.63045 11.3126 9.67938 11.2243 9.72692 11.1346L9.21425 10.8291C9.16739 10.9188 9.11778 11.0071 9.0661 11.0933Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M0.817957 10.0693L0.261871 10.283C0.293569 10.3798 0.326642 10.4759 0.363164 10.5678L0.919251 10.3584C0.88273 10.2644 0.850344 10.169 0.817957 10.0736"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M1.13216 10.8291L0.620178 11.1374C0.667035 11.2272 0.716649 11.3154 0.768329 11.4023L1.28031 11.0961C1.22863 11.01 1.17902 10.9217 1.13216 10.8319"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M5.17565 13.3298C5.12603 13.3298 5.07642 13.3298 5.0275 13.3298V13.9415C5.07642 13.9415 5.12603 13.9415 5.17565 13.9415C5.22526 13.9415 5.27418 13.9415 5.32311 13.9415V13.3298C5.27418 13.3298 5.22457 13.3298 5.17565 13.3298Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M2.11613 12.1216L1.73645 12.5901C1.80949 12.6613 1.88529 12.7233 1.96247 12.7867L2.34284 12.3188C2.26497 12.2555 2.18986 12.1899 2.11613 12.1216Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M0.636683 9.26636L0.0544128 9.37246C0.0688834 9.47357 0.08542 9.57397 0.104714 9.67367L0.687673 9.56757C0.66769 9.46787 0.651153 9.36747 0.636683 9.26636Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M1.5697 11.52L1.11697 11.9131C1.17761 11.9928 1.2417 12.0705 1.30716 12.1467L1.75988 11.7543C1.69442 11.6781 1.63033 11.6005 1.5697 11.52Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M4.23228 13.2295L4.12961 13.8319C4.22539 13.8525 4.32255 13.8696 4.42109 13.8846L4.52376 13.2822C4.42522 13.2679 4.32806 13.2509 4.23228 13.2295Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M2.75493 12.6174L2.45932 13.1472C2.54339 13.2006 2.62814 13.2519 2.71497 13.3003L3.01127 12.7705C2.92376 12.7228 2.839 12.6716 2.75493 12.6174Z"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M3.46743 12.9888L3.26553 13.5634C3.35649 13.6004 3.44952 13.6346 3.54116 13.6674L3.74375 13.0927C3.64935 13.0614 3.55701 13.0265 3.46812 12.9888"
                                                                fill="#FFB300"
                                                            />
                                                            <path
                                                                d="M2.45379 4.19556C2.45379 4.91689 2.17265 5.20385 1.47806 5.20385C2.17265 5.20385 2.45379 5.49367 2.45379 6.21144C2.45379 5.48868 2.74389 5.20385 3.42883 5.20385C2.74389 5.20385 2.45379 4.91902 2.45379 4.19556Z"
                                                                fill="#FFECB3"
                                                            />
                                                            <path
                                                                d="M9.07579 9.0105C9.07579 9.58728 8.85116 9.81656 8.29507 9.81656C8.85116 9.81656 9.07579 10.0487 9.07579 10.6233C9.07579 10.0451 9.30801 9.81656 9.85651 9.81656C9.30525 9.81656 9.07579 9.58728 9.07579 9.0105Z"
                                                                fill="#FFECB3"
                                                            />
                                                            <g style={{ mixBlendMode: "multiply" }} opacity="0.3">
                                                                <g style={{ mixBlendMode: "multiply" }} opacity="0.3">
                                                                    <g
                                                                        style={{ mixBlendMode: "multiply" }}
                                                                        opacity="0.3"
                                                                    >
                                                                        <g
                                                                            style={{ mixBlendMode: "multiply" }}
                                                                            opacity="0.3"
                                                                        >
                                                                            <path
                                                                                d="M6.35327 6.81104H3.65347V7.15355H4.50379C4.93929 7.24897 5.26729 7.55445 5.3107 7.92829H3.70998V8.09634H5.31346C5.26109 8.5485 4.79114 8.90312 4.21852 8.90312C4.03018 8.90917 3.84176 8.89507 3.65623 8.8611V9.12315H3.66105L5.56497 11.0906H6.03148L4.21094 9.21501H4.21438C4.99855 9.21501 5.6387 8.72225 5.69245 8.09847H6.3519V7.93042H5.69245C5.67531 7.77647 5.62708 7.62793 5.55087 7.49449C5.47467 7.36105 5.37219 7.24562 5.25006 7.15569H6.35259L6.35327 6.81104Z"
                                                                                fill="#1D5F3E"
                                                                            />
                                                                        </g>
                                                                    </g>
                                                                    <g
                                                                        style={{ mixBlendMode: "multiply" }}
                                                                        opacity="0.3"
                                                                    >
                                                                        <g
                                                                            style={{ mixBlendMode: "multiply" }}
                                                                            opacity="0.3"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                d="M3.54562 6.69971H6.46132L6.46019 7.26723H5.52595C5.56978 7.32042 5.60921 7.37753 5.64374 7.43799C5.7112 7.55612 5.75875 7.68501 5.78459 7.81909H6.45972V8.21002H5.7864C5.68228 8.79065 5.12923 9.22579 4.45698 9.31124L6.29236 11.2022H5.52029L3.61638 9.2347H3.54838V8.72827L3.67504 8.75148C3.85325 8.78409 4.03425 8.79762 4.21516 8.79186L4.21683 8.79178H4.2185C4.69702 8.79178 5.07016 8.53038 5.17837 8.20788H3.60213V7.81695H5.1757C5.08999 7.56046 4.83764 7.34406 4.49224 7.2651H3.54562V6.69971ZM3.76406 9.07213L5.60963 10.9793H5.77055L3.95001 9.10367H4.21437C4.96472 9.10367 5.53796 8.63484 5.58502 8.08868L5.5922 8.0053L5.5853 7.94328C5.56989 7.80485 5.52651 7.67126 5.45798 7.55121C5.38945 7.43122 5.29729 7.3274 5.18747 7.24651L4.91288 7.04435H6.24495L6.24519 6.92259H3.7613V7.04222H4.51509L4.52615 7.04464C4.99108 7.14653 5.36715 7.47929 5.41776 7.91515L5.42587 7.985H5.43496L5.43042 8.02417L5.43224 8.03983H5.42861L5.42052 8.10969C5.3595 8.63648 4.8258 9.01395 4.22019 9.01466C4.06771 9.01944 3.91518 9.0116 3.76406 8.99109V9.07213Z"
                                                                                fill="white"
                                                                            />
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                            <path
                                                                d="M6.38432 6.73364H3.68521V7.079H4.53484C4.97034 7.17443 5.29834 7.48062 5.34175 7.85446H3.74103V8.0218H5.34175C5.28938 8.47468 4.81943 8.82858 4.2475 8.82858C4.0592 8.83456 3.87079 8.82075 3.68521 8.78728V9.04932H3.69003L5.59395 11.0168H6.06046L4.24405 9.13976C5.02822 9.13976 5.66837 8.647 5.72143 8.02251H6.38088V7.85517H5.72694C5.7097 7.70087 5.6613 7.55204 5.58485 7.41839C5.5084 7.28466 5.40563 7.16902 5.28318 7.079H6.3857L6.38432 6.73364Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M3.57736 6.62183H6.49171L6.49398 7.19007H5.55939C5.60341 7.2434 5.64301 7.30065 5.67768 7.36132C5.74539 7.47974 5.79312 7.60891 5.81906 7.74335H6.48871V8.13357H5.81551C5.71209 8.71405 5.16032 9.14891 4.48926 9.23515L6.32081 11.1278H5.54927L3.64535 9.16038H3.57736V8.65431L3.70374 8.67709C3.88211 8.70928 4.06319 8.72259 4.24417 8.71683L4.24583 8.71676H4.24749C4.72552 8.71676 5.09861 8.45578 5.20673 8.13285H3.63318V7.74264H5.20677C5.12105 7.48594 4.86862 7.26904 4.52329 7.19007H3.57736V6.62183ZM3.79304 8.99781L5.63861 10.905H5.8001L3.98369 9.02793H4.24404C4.99441 9.02793 5.56755 8.5591 5.614 8.01237L5.62264 7.91069H5.62462L5.61981 7.86754C5.6043 7.72882 5.56075 7.59495 5.492 7.47468C5.42323 7.35441 5.33079 7.25038 5.22065 7.16942L4.94562 6.96718H6.27741L6.27692 6.84471H3.79304V6.96718H4.54614L4.5572 6.9696C5.02226 7.0715 5.39821 7.40511 5.44881 7.84076L5.45685 7.90998H5.46324L5.46004 7.93753L5.4633 7.96552H5.45681L5.44882 8.03466C5.38782 8.56216 4.85406 8.93892 4.24917 8.93963C4.09671 8.94441 3.94419 8.93664 3.79304 8.91649V8.99781Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                d="M14.709 36.9373C14.1702 36.9373 13.7356 36.7605 13.4053 36.4069C13.075 36.0532 12.9096 35.5873 12.9091 35.0091C12.9091 34.4308 13.0745 33.9649 13.4053 33.6113C13.736 33.2576 14.1706 33.0808 14.709 33.0808C15.0953 33.07 15.4748 33.187 15.7922 33.4147C16.0835 33.6215 16.2858 33.937 16.3566 34.2948L15.5683 34.5889C15.5214 34.4022 15.4136 34.2379 15.263 34.1239C15.1106 34.0063 14.9248 33.9441 14.7345 33.9474C14.6108 33.9429 14.4876 33.9666 14.3738 34.0171C14.2601 34.0676 14.1585 34.1435 14.0764 34.2393C13.9083 34.4339 13.8242 34.6905 13.8242 35.0091C13.8242 35.3276 13.9083 35.5842 14.0764 35.7788C14.1585 35.8745 14.2601 35.9503 14.3739 36.0006C14.4877 36.051 14.6108 36.0747 14.7345 36.07C14.9246 36.0734 15.1105 36.0116 15.263 35.8942C15.4136 35.7802 15.5214 35.6159 15.5683 35.4292L16.3566 35.7233C16.2858 36.0811 16.0835 36.3965 15.7922 36.6034C15.4748 36.8311 15.0953 36.9481 14.709 36.9373Z"
                                                                fill="#194041"
                                                            />
                                                            <path
                                                                d="M19.0157 36.8742L18.8373 36.3045H17.4646L17.2869 36.8742H16.3718L17.6424 33.1443H18.6595L19.9308 36.8742H19.0157ZM17.7141 35.5212H18.5885L18.151 34.1184L17.7141 35.5212Z"
                                                                fill="#194041"
                                                            />
                                                            <path
                                                                d="M21.4661 36.9374C21.0563 36.9374 20.7163 36.8297 20.4462 36.6142C20.3163 36.5139 20.2092 36.3854 20.1324 36.2378C20.0557 36.0901 20.0111 35.927 20.0018 35.7597L20.8052 35.6336C20.809 35.7113 20.83 35.7869 20.8665 35.8548C20.9031 35.9227 20.9543 35.9811 21.0161 36.0253C21.1629 36.1302 21.3388 36.1826 21.517 36.1748C21.6473 36.1811 21.7761 36.1453 21.8857 36.0723C21.9284 36.0437 21.9634 36.0044 21.9875 35.9581C22.0117 35.9118 22.024 35.8599 22.0235 35.8074C22.0235 35.6422 21.9236 35.5387 21.7238 35.4969L21.0175 35.3239C20.7538 35.2709 20.5129 35.134 20.3284 34.9322C20.1667 34.7376 20.0816 34.4873 20.09 34.2309C20.086 34.0699 20.1195 33.9103 20.1876 33.7654C20.2558 33.6206 20.3564 33.4947 20.4814 33.3984C20.7423 33.1862 21.0869 33.0801 21.515 33.0801C21.816 33.0737 22.111 33.1676 22.3563 33.3479C22.5894 33.5175 22.7518 33.7719 22.8111 34.06L22.0387 34.3021C22.0315 34.2369 22.0115 34.174 21.98 34.117C21.9485 34.0601 21.9061 34.0104 21.8554 33.971C21.7425 33.8843 21.6045 33.8399 21.464 33.8449C21.3386 33.8384 21.2149 33.8764 21.1132 33.9524C21.0707 33.9854 21.0363 34.0285 21.0133 34.0781C20.9903 34.1277 20.9792 34.1823 20.9809 34.2373C20.9809 34.3797 21.0912 34.4787 21.311 34.5314L22.0132 34.7151C22.6104 34.8731 22.9103 35.2394 22.9131 35.8138C22.9168 35.9737 22.8822 36.1321 22.8124 36.2749C22.7428 36.4178 22.64 36.5406 22.5134 36.6327C22.2488 36.8363 21.8997 36.9379 21.4661 36.9374Z"
                                                                fill="#194041"
                                                            />
                                                            <path
                                                                d="M25.5586 33.1443H26.4233V36.8742H25.5586V35.4293H24.2369V36.8742H23.3728V33.1443H24.2369V34.5891H25.5586V33.1443Z"
                                                                fill="#194041"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M16.0831 27.9622C16.0555 27.9294 16.0293 27.896 16.0004 27.8646C15.8021 27.6504 15.5592 27.4857 15.2899 27.3833C15.1272 27.3175 14.9561 27.2762 14.7821 27.2608C14.477 27.2269 14.1683 27.2665 13.8805 27.3764C13.5926 27.4864 13.3332 27.6637 13.1228 27.8945C12.9008 28.1358 12.7315 28.4235 12.6267 28.7383C12.5619 28.9223 12.5185 29.1135 12.4971 29.308C12.4793 29.4609 12.4756 29.6151 12.4861 29.7687C12.5194 30.2768 12.6989 30.7631 13.0015 31.1651C13.2095 31.4368 13.467 31.6637 13.7595 31.833C14.052 32.0096 14.3722 32.1318 14.7056 32.194C14.8248 32.2161 14.9454 32.2261 15.066 32.2396C15.1163 32.2446 15.1673 32.2439 15.2176 32.2453C15.6256 32.2529 16.0308 32.1735 16.4076 32.0117C16.689 31.8941 16.9505 31.7309 17.1821 31.5282C17.28 31.4414 17.3702 31.346 17.4626 31.2527C17.4702 31.2432 17.4798 31.2357 17.4907 31.2307C17.5016 31.2258 17.5134 31.2235 17.5253 31.2242C17.5524 31.2256 17.5795 31.2256 17.6066 31.2242C17.5777 31.2577 17.5529 31.2876 17.5274 31.316C17.1354 31.7545 16.6317 32.0696 16.0741 32.2254C15.9302 32.2683 15.7828 32.2976 15.6338 32.313C15.5063 32.3251 15.3774 32.3393 15.2486 32.3386C14.7974 32.3381 14.3519 32.2342 13.9442 32.0345C13.6495 31.8931 13.3805 31.7004 13.149 31.4649C12.7966 31.1061 12.5544 30.6478 12.453 30.1475C12.424 30.0085 12.4062 29.8673 12.3999 29.7253C12.3762 29.276 12.4662 28.8281 12.6611 28.4257C12.8163 28.0902 13.048 27.7987 13.3364 27.5762C13.5927 27.3818 13.8884 27.2501 14.2012 27.191C14.3489 27.1612 14.4994 27.149 14.6498 27.1547C15.1695 27.167 15.6649 27.3846 16.0341 27.7628C16.2867 28.0234 16.4519 28.3608 16.5055 28.7255C16.5192 28.8074 16.5378 28.8872 16.5509 28.9683C16.5709 29.0957 16.5764 29.2249 16.5675 29.3536C16.558 29.5238 16.5246 29.6917 16.4682 29.852C16.3253 30.266 16.0424 30.6127 15.6717 30.8283C15.486 30.9377 15.2823 31.0101 15.0708 31.0419C14.9329 31.0633 14.7929 31.0675 14.6539 31.0547C14.3145 31.0277 13.9907 30.8968 13.7237 30.6787C13.3879 30.4131 13.157 30.0305 13.0739 29.6021C13.0433 29.456 13.0314 29.3063 13.0387 29.157C13.0534 28.7838 13.1803 28.4247 13.4019 28.1295C13.6487 27.7931 14.0013 27.5561 14.399 27.4595C14.5713 27.416 14.7492 27.4011 14.9261 27.4153C15.3044 27.4407 15.6644 27.593 15.9514 27.849C15.988 27.8803 16.0203 27.9152 16.0555 27.9486L16.0762 27.9679C16.0782 27.9656 16.0804 27.9637 16.0831 27.9622ZM15.2424 28.4065L15.2355 28.4165L15.2562 28.4314C15.3196 28.4729 15.3772 28.5229 15.4277 28.5803C15.5541 28.7199 15.6294 28.9007 15.6407 29.0915C15.6525 29.2539 15.6177 29.4164 15.5408 29.5586C15.4622 29.7126 15.3314 29.8311 15.1734 29.8914C15.0155 29.9518 14.8415 29.9496 14.6849 29.8855C14.5488 29.8359 14.436 29.7349 14.369 29.6028C14.302 29.4707 14.2859 29.3173 14.3238 29.1734C14.3507 29.0465 14.4245 28.9355 14.5293 28.8639C14.6342 28.7924 14.762 28.766 14.8854 28.7903C14.9904 28.8071 15.0851 28.8649 15.1499 28.9519C15.2147 29.0389 15.2446 29.1483 15.2334 29.2574C15.2296 29.3063 15.2161 29.3538 15.1939 29.3971C15.1717 29.4404 15.1412 29.4786 15.1043 29.5094C15.0674 29.5402 15.0248 29.5628 14.9791 29.5761C14.9334 29.5893 14.8856 29.5928 14.8386 29.5864C14.7986 29.5816 14.76 29.5684 14.7252 29.5476C14.6904 29.5269 14.66 29.4989 14.636 29.4656C14.612 29.4323 14.5949 29.3942 14.5856 29.3537C14.5763 29.3133 14.5752 29.2713 14.5822 29.2304C14.5871 29.1958 14.5989 29.1626 14.6167 29.1328C14.6345 29.1031 14.658 29.0774 14.6857 29.0574C14.7135 29.0374 14.7449 29.0235 14.7781 29.0165C14.8112 29.0095 14.8454 29.0096 14.8786 29.0168C14.9117 29.023 14.9429 29.0374 14.9696 29.0588C14.9962 29.0801 15.0175 29.1078 15.0316 29.1394C15.0457 29.171 15.0523 29.2057 15.0507 29.2405C15.0491 29.2753 15.0394 29.3092 15.0226 29.3393C15.0026 29.3735 14.9792 29.3828 14.9537 29.3685C14.9282 29.3543 14.9254 29.3286 14.9433 29.2973C14.9433 29.2916 14.9495 29.2859 14.9516 29.2802C14.9617 29.2557 14.9635 29.2283 14.9569 29.2025C14.9503 29.1768 14.9355 29.154 14.9151 29.1378C14.8889 29.1179 14.8573 29.1072 14.8248 29.1072C14.7923 29.1072 14.7607 29.1179 14.7345 29.1378C14.6987 29.1689 14.675 29.2124 14.6679 29.2602C14.6608 29.3081 14.6708 29.3569 14.6959 29.3977C14.7314 29.4481 14.7839 29.4828 14.843 29.4951C14.902 29.5073 14.9634 29.4962 15.015 29.4639C15.0484 29.4404 15.0769 29.4101 15.0988 29.375C15.1206 29.3398 15.1354 29.3005 15.1423 29.2593C15.1492 29.2181 15.148 29.176 15.1388 29.1352C15.1296 29.0946 15.1126 29.0562 15.0887 29.0225C15.0317 28.947 14.9496 28.8961 14.8584 28.8796C14.7671 28.863 14.6732 28.882 14.5947 28.9327C14.5248 28.9781 14.469 29.043 14.4335 29.1199C14.398 29.1968 14.3843 29.2825 14.3941 29.3671C14.4003 29.4728 14.4411 29.5733 14.5099 29.6519C14.5632 29.7102 14.627 29.757 14.6979 29.7896C14.7688 29.8222 14.8453 29.8399 14.9229 29.8417C15.0004 29.8435 15.0776 29.8293 15.1498 29.8C15.2221 29.7708 15.288 29.727 15.3437 29.6712C15.4195 29.5947 15.4774 29.5013 15.5126 29.3981C15.5479 29.2948 15.5596 29.1845 15.547 29.0759C15.5385 28.9582 15.501 28.8447 15.4381 28.7462C15.2748 28.492 15.035 28.3787 14.749 28.3645C14.6126 28.3582 14.4767 28.3869 14.3535 28.4478C14.2718 28.4818 14.1977 28.5327 14.1357 28.5973C14.0285 28.7136 13.9529 28.8571 13.9166 29.0133C13.8803 29.1695 13.8846 29.3328 13.929 29.4867C13.9796 29.6792 14.0883 29.85 14.2394 29.9741C14.3905 30.0983 14.5761 30.1693 14.769 30.1767C14.9078 30.1834 15.0463 30.1558 15.1728 30.0963C15.3545 30.0141 15.5051 29.8727 15.6017 29.6937C15.6983 29.5147 15.7354 29.3079 15.7075 29.1051C15.6792 28.8764 15.5681 28.6673 15.3967 28.5197C15.3485 28.4777 15.2948 28.4428 15.2431 28.4051"
                                                                fill="#194041"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M25.77 27.7071C25.77 27.6715 25.77 27.6445 25.77 27.6167C25.77 27.5889 25.7762 27.5896 25.7969 27.5896C26.0636 27.5896 26.3302 27.5896 26.5976 27.5896C26.6231 27.5896 26.6238 27.6039 26.6238 27.6231V30.9271C26.6238 30.9399 26.6238 30.952 26.6238 30.9648C26.6219 30.9888 26.6122 31.0115 26.5961 31.029C26.5801 31.0465 26.5587 31.0578 26.5356 31.061H26.5018H25.892C25.8761 31.0633 25.86 31.062 25.8448 31.057C25.8295 31.0521 25.8155 31.0437 25.8038 31.0325C25.7882 31.0145 25.7772 30.9927 25.7721 30.9691C25.7631 30.8979 25.7266 30.8737 25.6605 30.8979C25.5536 30.9385 25.4468 30.9812 25.338 31.0183C25.2139 31.0607 25.086 31.0898 24.9562 31.1051C24.8533 31.1144 24.7498 31.1115 24.6475 31.0966C24.4756 31.0758 24.3077 31.0278 24.15 30.9542C23.735 30.7682 23.4054 30.4242 23.2294 29.9936C23.1615 29.8319 23.1183 29.6605 23.1012 29.4852C23.0562 29.049 23.1643 28.6107 23.4057 28.25C23.6471 27.8893 24.0059 27.6301 24.4167 27.5198C24.5166 27.4948 24.6182 27.4777 24.7206 27.4686C24.8019 27.4602 24.8837 27.4585 24.9652 27.4636C25.2352 27.4778 25.4985 27.5549 25.7356 27.6893L25.77 27.7071ZM23.9474 29.2836C23.947 29.4699 24.0001 29.6522 24.1 29.8073C24.1999 29.9624 24.342 30.0834 24.5085 30.1549C24.6749 30.2265 24.8582 30.2454 25.035 30.2093C25.2119 30.1731 25.3744 30.0836 25.502 29.9519C25.6296 29.8203 25.7165 29.6525 25.7518 29.4698C25.787 29.2871 25.769 29.0976 25.7 28.9255C25.631 28.7534 25.5141 28.6063 25.3642 28.5029C25.2143 28.3994 25.0379 28.3443 24.8577 28.3444C24.6166 28.345 24.3857 28.444 24.2151 28.6201C24.0446 28.796 23.9483 29.0346 23.9474 29.2836Z"
                                                                fill="#194041"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M17.5101 31.0503H16.1967C16.1822 31.0503 16.1671 31.0503 16.1526 31.0503C16.1437 31.0511 16.1347 31.0493 16.1266 31.0451C16.1186 31.041 16.1118 31.0346 16.1071 31.0267C16.1022 31.0189 16.0997 31.0098 16.0995 31.0005C16.0995 30.9912 16.1018 30.9821 16.1064 30.9741C16.1188 30.9449 16.1347 30.9171 16.1499 30.8894L16.77 29.75C16.9974 29.3308 17.225 28.9112 17.4529 28.4911C17.4681 28.4633 17.4832 28.4356 17.4977 28.4078C17.5314 28.3444 17.5046 28.2974 17.4357 28.2967H16.8155C16.7991 28.2985 16.7826 28.2965 16.767 28.2908C16.7515 28.2851 16.7374 28.2758 16.7258 28.2637C16.7142 28.2516 16.7054 28.237 16.7001 28.2209C16.6947 28.2047 16.6929 28.1875 16.6949 28.1707V27.5369C16.6928 27.5202 16.6944 27.5032 16.6996 27.4873C16.7048 27.4713 16.7134 27.4568 16.7249 27.4448C16.7363 27.4328 16.7502 27.4236 16.7655 27.418C16.7808 27.4124 16.7972 27.4105 16.8134 27.4123H18.9055C18.9167 27.4116 18.928 27.4116 18.9392 27.4123C18.9474 27.4133 18.9552 27.4164 18.9619 27.4213C18.9686 27.4263 18.974 27.4329 18.9776 27.4406C18.9812 27.4483 18.9828 27.4567 18.9824 27.4652C18.9819 27.4737 18.9794 27.4819 18.9751 27.4892C18.953 27.5355 18.9282 27.5804 18.9061 27.6252C18.6765 28.0525 18.4467 28.4776 18.2171 28.9005L17.6072 30.0242C17.5985 30.0393 17.5906 30.055 17.5838 30.0712C17.5786 30.0801 17.5758 30.0903 17.5754 30.1007C17.5751 30.1111 17.5773 30.1215 17.582 30.1307C17.5866 30.14 17.5934 30.1479 17.6018 30.1537C17.6102 30.1595 17.6199 30.1629 17.63 30.1638C17.6428 30.1652 17.6558 30.1652 17.6686 30.1638H18.8538C18.87 30.1615 18.8864 30.1632 18.9018 30.1686C18.9172 30.174 18.9313 30.183 18.9428 30.1949C18.9544 30.2068 18.9631 30.2213 18.9683 30.2372C18.9735 30.2533 18.9751 30.2702 18.973 30.2869C18.973 30.5006 18.973 30.7142 18.973 30.9278C18.9752 30.9443 18.9736 30.9611 18.9684 30.9769C18.9633 30.9926 18.9547 31.0069 18.9433 31.0187C18.9318 31.0304 18.9179 31.0392 18.9026 31.0444C18.8873 31.0497 18.8711 31.0512 18.8552 31.0489H17.5101"
                                                                fill="#194041"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M20.5979 27.4069H20.9424C20.9802 27.4047 21.0176 27.4146 21.0496 27.4354C21.0815 27.4562 21.1065 27.4868 21.1209 27.5229L21.7893 28.9777V28.9827C21.8017 29.0055 21.8134 29.0304 21.843 29.0304C21.8727 29.0304 21.8858 29.0069 21.8968 28.9834L22.1035 28.5327C22.2151 28.291 22.3263 28.0494 22.437 27.8078C22.4811 27.7116 22.5245 27.6148 22.57 27.5187C22.5841 27.4844 22.6079 27.4554 22.6383 27.4354C22.6687 27.4154 22.7042 27.4055 22.7402 27.4069H23.4658C23.5237 27.4069 23.5471 27.4475 23.5237 27.503C23.5085 27.5407 23.4906 27.5742 23.4734 27.6141L22.8484 28.9727C22.5861 29.5424 22.3238 30.112 22.0615 30.6817C22.005 30.8035 21.9498 30.9259 21.8933 31.0477C21.8823 31.0705 21.874 31.099 21.8437 31.099C21.8134 31.099 21.8038 31.0712 21.7934 31.0477L21.3662 30.122L20.3429 27.8961C20.2844 27.7672 20.2251 27.639 20.1665 27.5101C20.1599 27.5008 20.1556 27.49 20.1538 27.4786C20.1522 27.4672 20.1532 27.4555 20.1569 27.4446C20.1625 27.4312 20.1724 27.4202 20.185 27.4133C20.1975 27.4064 20.2119 27.4042 20.2258 27.4069H20.5979Z"
                                                                fill="#194041"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M19.128 29.2311V27.5314C19.1272 27.5137 19.1295 27.4961 19.1349 27.4794C19.1408 27.4588 19.1532 27.4406 19.1699 27.4278C19.1867 27.415 19.2071 27.4081 19.2279 27.4082C19.4457 27.4082 19.6634 27.4082 19.8812 27.4082C19.8943 27.4082 19.9074 27.4109 19.9196 27.4161C19.9318 27.4214 19.9428 27.429 19.9521 27.4387C19.9614 27.4484 19.9687 27.4598 19.9737 27.4724C19.9787 27.485 19.9812 27.4986 19.9811 27.5122C19.9811 27.5236 19.9811 27.535 19.9811 27.5471V30.9223C19.9811 30.9366 19.9811 30.9508 19.9811 30.965C19.979 30.9892 19.969 31.0118 19.9527 31.0292C19.9364 31.0466 19.9148 31.0576 19.8915 31.0605H19.8681H19.2438C19.2186 31.063 19.1935 31.0561 19.1729 31.0409C19.1524 31.0257 19.1379 31.0033 19.1322 30.9779C19.1304 30.963 19.1304 30.9479 19.1322 30.933V29.2311"
                                                                fill="#194041"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M16.0858 27.2745C16.0858 27.1513 16.0858 27.0288 16.0858 26.9063C16.0858 26.8814 16.0927 26.8743 16.1162 26.8743H16.5737C16.6047 26.8743 16.6054 26.8743 16.5978 26.9049C16.5372 27.1527 16.4759 27.4033 16.4159 27.6483C16.4104 27.6704 16.4007 27.6761 16.3801 27.6761C16.2926 27.6761 16.2044 27.6761 16.1169 27.6761C16.0934 27.6761 16.0858 27.6697 16.0858 27.6447C16.0858 27.5208 16.0858 27.3976 16.0858 27.2737"
                                                                fill="#194041"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M27.4101 27.2659C27.4197 27.2352 27.4294 27.2039 27.4383 27.1733C27.4659 27.0821 27.4934 26.9917 27.5189 26.9006C27.5194 26.8964 27.5207 26.8925 27.5228 26.8889C27.5248 26.8853 27.5275 26.8823 27.5307 26.8798C27.534 26.8773 27.5376 26.8756 27.5415 26.8746C27.5454 26.8737 27.5495 26.8735 27.5534 26.8742C27.5741 26.8742 27.5947 26.8742 27.6154 26.8742C27.6361 26.8742 27.6354 26.8799 27.6354 26.8942V27.3449C27.6354 27.3705 27.6182 27.3648 27.6044 27.3648C27.5906 27.3648 27.5713 27.3705 27.572 27.3442C27.572 27.3335 27.572 27.3228 27.572 27.3121V26.9867C27.5727 26.9761 27.5727 26.9654 27.572 26.9547H27.5644C27.5644 26.9647 27.5582 26.9739 27.5548 26.9832C27.5203 27.1007 27.4859 27.2174 27.4514 27.3349C27.4452 27.3563 27.4369 27.367 27.4121 27.367C27.3873 27.367 27.3735 27.362 27.366 27.3349C27.3308 27.2132 27.2929 27.0921 27.2557 26.9711C27.2557 26.9625 27.2488 26.9547 27.2461 26.9461H27.2378C27.2378 26.9561 27.2378 26.9654 27.2378 26.9753C27.2378 27.0943 27.2378 27.2125 27.2378 27.3314C27.2378 27.3556 27.2323 27.3655 27.2068 27.3655C27.1813 27.3655 27.1737 27.3591 27.1737 27.3328C27.1737 27.1904 27.1737 27.048 27.1737 26.9056C27.1737 26.8821 27.1806 26.8749 27.2033 26.8749C27.284 26.8749 27.284 26.8749 27.3088 26.954C27.3377 27.0501 27.3673 27.1455 27.3963 27.2388C27.3963 27.2473 27.4025 27.2559 27.4059 27.2644H27.4142"
                                                                fill="#194041"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M26.876 27.1522C26.876 27.091 26.876 27.0297 26.876 26.9685C26.876 26.9464 26.8698 26.9379 26.8485 26.9386C26.8133 26.9386 26.7796 26.9386 26.7424 26.9386C26.7203 26.9386 26.7189 26.9265 26.7203 26.9101C26.7217 26.8937 26.7134 26.8738 26.741 26.8738H27.0855C27.1124 26.8738 27.1076 26.8923 27.1082 26.9087C27.1089 26.9251 27.1082 26.94 27.0834 26.9386C27.0497 26.9386 27.0145 26.9386 26.9808 26.9386C26.958 26.9386 26.9505 26.9464 26.9511 26.9692C26.9511 27.0917 26.9511 27.2134 26.9511 27.3352C26.9511 27.3452 26.9456 27.363 26.9415 27.3637C26.9223 27.3662 26.9028 27.3662 26.8836 27.3637C26.8836 27.3637 26.8788 27.3495 26.8788 27.3423V27.1522"
                                                                fill="#194041"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0">
                                                                <rect width={41} height={46} fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                                <div className="balance-wrapper">
                                                    {/*                   <div class="balance-item">
              <div class="roboto deep-green">${response.data.earned}</div>
              <div class="roboto fs-13-14">Earned</div>
            </div>
            <div class="divider">-</div>
            <div class="balance-item">
              <div class="roboto deep-green">0</div>
              <div class="roboto fs-13-14">Used</div>
            </div>
            <div class="divider">-</div> 
				  <div class="balance-item">
              <div id="OzivaCashBalance" class="bold roboto deep-green">${response.data.balance}</div>
              <div class="roboto fs-13-14">Balance</div>
            </div> */}
                                                    <div className="balance-item">
                                                        <div className="roboto deep-green">42559.00</div>
                                                        <div className="roboto fs-13-14">Earned</div>
                                                    </div>
                                                    <div className="divider">-</div>
                                                    <div className="balance-item">
                                                        <div className="roboto deep-green">2250.00</div>
                                                        <div className="roboto fs-13-14">Used</div>
                                                    </div>
                                                    <div className="divider">=</div>
                                                    <div className="balance-item">
                                                        <div
                                                            id="OzivaCashBalance"
                                                            className="bold roboto deep-green"
                                                        >
                                                            28162.00
                                                        </div>
                                                        <div className="roboto fs-13-14">Balance</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="grey fs-12-13"
                                                style={{ textAlign: "right", padding: "5px 0" }}
                                            >
                                                1 OZiva Cash = ₹1.00
                                            </div>
                                            <div
                                                className="grey fs-12-13"
                                                style={{ textAlign: "left", padding: "5px 0" }}
                                            >
                                                *We are in the process of transitioning to new Cash system.
                                                Your Cash balance might be adjusted in the next few days
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="part3 padding-10-15">
                                <div className="cd-page-accordion_header bold roboto fs-14-16">
                                    Additional Details
                                </div>
                            </div>
                            <div id="overlayCD-moc-btn" style={{}} className="part3 padding-10-15">
                                <div
                                    className="accordion-wrapper"
                                    style={{ cursor: "pointer", borderBottom: "1px solid #F5F5F5" }}
                                >
                                    <div
                                        data-moengagehandler="TransactionHistory_click"
                                        className="cd-page-accordion-item cd-page-accordion"
                                    >
                                        <div className="fs-13-14 bold roboto">My OZiva Cash History</div>
                                        <div className="cd-page-accordion_icon cd-accordion_icon-arrow-down">
                                            <div className="svg-container svg-container-icon-keyboard_arrow_down">
                                                <svg
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M15.018 12.644L12.03 15.6923L9.018 12.644L6 9.59566L6.594 8.95165L7.194 8.30765L9.6 10.7671L12.006 13.2205L14.406 10.7671L16.806 8.31378L17.4 8.92099C17.73 9.25832 18 9.54659 18 9.56499C18 9.58339 16.656 10.9695 15.018 12.644Z"
                                                        fill="black"
                                                    />
                                                </svg>
                                            </div>
                                            <style
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        "\n  .svg-container-icon-keyboard_arrow_down{\n    width: 24px;\n  }\n"
                                                }}
                                            />
                                        </div>
                                        <div
                                            className="cd-page-accordion_icon cd-accordion_icon-arrow-up"
                                            style={{ display: "none" }}
                                        >
                                            <div className="svg-container svg-container-icon-keyboard_arrow_up">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                                                    <path d="M0 0h24v24H0z" fill="none" />
                                                </svg>
                                            </div>
                                            <style
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        "\n  .svg-container-icon-keyboard_arrow_up{\n    width: 1.4rem;\n  }\n"
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="cd-page-accordion-panel-item">
                                        <div className="cd-page-accordion-panel-item-cnt">
                                            <div className="body-ocb">
                                                <div className="modal-wrapper">
                                                    <div className="body-moch" style={{ padding: 10 }}>
                                                        <div
                                                            id="moch-items"
                                                            style={{ overflowY: "scroll", maxHeight: 260 }}
                                                        >
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        Order Id: 5314750
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Cash added successfully.
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        09 Oct 2025|Expiry: 23 Nov 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        + 194 Cash
                                                                    </div>
                                                                    <div className="earned">Earned</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        Order Id: 5310198
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Cash added successfully.
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        08 Oct 2025|Expiry: 22 Nov 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        + 404 Cash
                                                                    </div>
                                                                    <div className="earned">Earned</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        Order Id: 5310188
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Cash added successfully.
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        08 Oct 2025|Expiry: 22 Nov 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        + 224 Cash
                                                                    </div>
                                                                    <div className="earned">Earned</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        Order Id: 5309845
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Cash added successfully.
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        08 Oct 2025|Expiry: 22 Nov 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        + 172 Cash
                                                                    </div>
                                                                    <div className="earned">Earned</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        From Support
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Cash added by customer support.
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        12 Sep 2025|Expiry: 27 Oct 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        + 500 Cash
                                                                    </div>
                                                                    <div className="earned">Earned</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        From Support
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Cash added by customer support.
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        29 Aug 2025|Expiry: 13 Oct 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        + 500 Cash
                                                                    </div>
                                                                    <div className="earned">Earned</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        Transaction Reversed
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Transaction is Reversed
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        27 Aug 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        - 299 Cash
                                                                    </div>
                                                                    <div className="earned">Reedem</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        Transaction Reversed
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Transaction is Reversed
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        27 Aug 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        - 299 Cash
                                                                    </div>
                                                                    <div className="earned">Reedem</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        Transaction Reversed
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Transaction is Reversed
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        27 Aug 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        - 121 Cash
                                                                    </div>
                                                                    <div className="earned">Reedem</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        Transaction Reversed
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Transaction is Reversed
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        27 Aug 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        - 239 Cash
                                                                    </div>
                                                                    <div className="earned">Reedem</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        Order Id: 5000472
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Cash added successfully.
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        20 Aug 2025|Expiry: 04 Oct 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        + 239 Cash
                                                                    </div>
                                                                    <div className="earned">Earned</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        Order Id: 4991282
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Cash added successfully.
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        19 Aug 2025|Expiry: 03 Oct 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        + 121 Cash
                                                                    </div>
                                                                    <div className="earned">Earned</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        Order Id: 4990900
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Cash added successfully.
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        19 Aug 2025|Expiry: 03 Oct 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        + 299 Cash
                                                                    </div>
                                                                    <div className="earned">Earned</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        Order Id: 4990625
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Cash added successfully.
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        19 Aug 2025|Expiry: 03 Oct 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        + 299 Cash
                                                                    </div>
                                                                    <div className="earned">Earned</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        From Support
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Cash added by customer support.
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        19 Aug 2025|Expiry: 03 Oct 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        + 500 Cash
                                                                    </div>
                                                                    <div className="earned">Earned</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        Order Id: 4982066
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Cash added successfully.
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        18 Aug 2025|Expiry: 02 Oct 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        + 89 Cash
                                                                    </div>
                                                                    <div className="earned">Earned</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        Order Id: 4946973
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Cash added successfully.
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        14 Aug 2025|Expiry: 28 Sep 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        + 89 Cash
                                                                    </div>
                                                                    <div className="earned">Earned</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        Transaction Reversed
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Transaction is Reversed
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        11 Aug 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        - 299 Cash
                                                                    </div>
                                                                    <div className="earned">Reedem</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        Transaction Reversed
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Transaction is Reversed
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        11 Aug 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        - 449 Cash
                                                                    </div>
                                                                    <div className="earned">Reedem</div>
                                                                </div>
                                                            </div>
                                                            <div className="item-moch active-moch">
                                                                <div>
                                                                    <div className="fs-13-14 bold roboto">
                                                                        Order Id: 4876448
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        Cash added successfully.
                                                                    </div>
                                                                    <div className="fs-12-13 grey roboto">
                                                                        08 Aug 2025|Expiry: 22 Sep 2025
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="fs-14-16 roboto bold">
                                                                        + 449 Cash
                                                                    </div>
                                                                    <div className="earned">Earned</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="overlayCD-ocb" className="part3 padding-10-15">
                                <div
                                    className="accordion-wrapper"
                                    style={{ cursor: "pointer", borderBottom: "1px solid #F5F5F5" }}
                                >
                                    <div
                                        data-moengagehandler="Cashbenefits_click"
                                        className="cd-page-accordion-item cd-page-accordion"
                                    >
                                        <div className="fs-13-14 bold roboto">OZiva Cash Benefits</div>
                                        <div
                                            className="cd-page-accordion_icon cd-accordion_icon-arrow-down"
                                            style={{}}
                                        >
                                            <div className="svg-container svg-container-icon-keyboard_arrow_down">
                                                <svg
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M15.018 12.644L12.03 15.6923L9.018 12.644L6 9.59566L6.594 8.95165L7.194 8.30765L9.6 10.7671L12.006 13.2205L14.406 10.7671L16.806 8.31378L17.4 8.92099C17.73 9.25832 18 9.54659 18 9.56499C18 9.58339 16.656 10.9695 15.018 12.644Z"
                                                        fill="black"
                                                    />
                                                </svg>
                                            </div>
                                            <style
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        "\n  .svg-container-icon-keyboard_arrow_down{\n    width: 24px;\n  }\n"
                                                }}
                                            />
                                        </div>
                                        <div
                                            className="cd-page-accordion_icon cd-accordion_icon-arrow-up"
                                            style={{ display: "none" }}
                                        >
                                            <div className="svg-container svg-container-icon-keyboard_arrow_up">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                                                    <path d="M0 0h24v24H0z" fill="none" />
                                                </svg>
                                            </div>
                                            <style
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        "\n  .svg-container-icon-keyboard_arrow_up{\n    width: 1.4rem;\n  }\n"
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="cd-page-accordion-panel-item"
                                        style={{ display: "none" }}
                                    >
                                        <div className="cd-page-accordion-panel-item-cnt">
                                            <div className="body-ocb">
                                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                                    <div className="image-ocb oziva_cash_icon">
                                                        <svg
                                                            width={41}
                                                            height={46}
                                                            viewBox="0 0 41 46"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <g clipPath="url(#clip0)">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M5.0647 23.3153L17.3216 -0.00292969L30.0138 7.12134L15.8611 34.0462L5.0647 27.9861V23.3153Z"
                                                                    fill="#6ABE59"
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M20.042 2.79248L26.0811 6.18371L25.9781 6.37953L26.1676 6.48601C26.0182 6.77001 25.9243 7.08164 25.8914 7.40314C25.8585 7.72457 25.8872 8.04963 25.9759 8.3596C26.0645 8.66964 26.2114 8.9586 26.4081 9.20996C26.6048 9.46125 26.8475 9.67017 27.1223 9.82455L27.3118 9.931L16.6691 30.1775L16.4796 30.071C16.2047 29.9165 15.903 29.8195 15.5919 29.7856C15.2807 29.7516 14.9661 29.7814 14.6661 29.8731C14.3661 29.9649 14.0865 30.1168 13.8433 30.3203C13.6001 30.5237 13.3982 30.7747 13.2489 31.0588L13.146 31.2548L6.91527 27.7572L7.01814 27.5613C7.31975 26.9875 7.38845 26.3133 7.20916 25.6871C7.02993 25.0609 6.61731 24.5339 6.06211 24.222L5.87268 24.1155L16.5181 3.86985L16.7076 3.97628C16.9826 4.13067 17.2843 4.2276 17.5955 4.2615C17.9066 4.29542 18.2213 4.26566 18.5214 4.17391C18.8214 4.08218 19.1011 3.93025 19.3443 3.72684C19.5876 3.52341 19.7897 3.27246 19.9391 2.98833L20.042 2.79248ZM25.6928 6.47301L20.2078 3.39291C20.0467 3.6502 19.8469 3.87995 19.6157 4.07334C19.3283 4.31359 18.9981 4.49301 18.6437 4.60136C18.2894 4.70971 17.9177 4.74486 17.5502 4.70481C17.2544 4.67257 16.9658 4.59211 16.6951 4.46684L6.45365 23.9443C7.01553 24.3202 7.43159 24.8927 7.62281 25.5607C7.8141 26.2286 7.76634 26.9428 7.49292 27.5741L12.98 30.6544C13.1411 30.397 13.3407 30.1672 13.5719 29.9738C13.8591 29.7335 14.1894 29.5541 14.5437 29.4457C14.8981 29.3373 15.2697 29.3022 15.6372 29.3423C15.933 29.3745 16.2215 29.455 16.4921 29.5803L26.7308 10.1023C26.482 9.93563 26.2597 9.7292 26.0727 9.49023C25.8404 9.19337 25.6669 8.85214 25.5622 8.48592C25.4575 8.11977 25.4236 7.73589 25.4624 7.35621C25.4937 7.05064 25.5716 6.75258 25.6928 6.47301Z"
                                                                    fill="#008B60"
                                                                />
                                                                <path
                                                                    d="M19.853 11.503C20.9096 12.0964 21.7722 13.0002 22.3318 14.1002C22.8913 15.2001 23.1227 16.4468 22.9966 17.6827C22.8705 18.9185 22.3926 20.0879 21.6234 21.0432C20.8541 21.9984 19.8281 22.6964 18.6749 23.049C17.5218 23.4016 16.2934 23.3929 15.1451 23.024C13.9966 22.6553 12.9799 21.9428 12.2234 20.9768C11.4669 20.0109 11.0045 18.8348 10.8947 17.5973C10.7849 16.3598 11.0327 15.1165 11.6068 14.0245C12.3768 12.5602 13.6782 11.4719 15.2246 10.999C16.771 10.5261 18.4359 10.7074 19.853 11.503Z"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <g style={{ mixBlendMode: "multiply" }} opacity="0.3">
                                                                    <g
                                                                        style={{ mixBlendMode: "multiply" }}
                                                                        opacity="0.3"
                                                                    >
                                                                        <g
                                                                            style={{ mixBlendMode: "multiply" }}
                                                                            opacity="0.3"
                                                                        >
                                                                            <g
                                                                                style={{ mixBlendMode: "multiply" }}
                                                                                opacity="0.3"
                                                                            >
                                                                                <path
                                                                                    d="M14.6283 12.9321L12.1732 17.6026L12.3186 17.6845L12.7051 17.9017L12.7272 17.9138L13.501 16.4434C14.0523 15.7769 14.8454 15.487 15.4904 15.7519L14.0344 18.5219L14.31 18.6743L15.7653 15.9043C16.4544 16.407 16.5977 17.5421 16.0775 18.5326C15.9158 18.8638 15.7218 19.177 15.4986 19.4675L15.9224 19.7061L15.9293 19.6989L20.8493 18.1936L21.271 17.3847L16.5729 18.821C16.5743 18.819 16.5755 18.8168 16.5764 18.8146C17.2895 17.4581 17.0732 15.9015 16.1105 15.2414L16.7107 14.1021L16.4385 13.9497L15.839 15.089C15.3243 14.8583 14.7365 14.8939 14.1811 15.1488L15.183 13.2433L14.6283 12.9321Z"
                                                                                    fill="#1D5F3E"
                                                                                />
                                                                            </g>
                                                                        </g>
                                                                        <g
                                                                            style={{ mixBlendMode: "multiply" }}
                                                                            opacity="0.3"
                                                                        >
                                                                            <g
                                                                                style={{ mixBlendMode: "multiply" }}
                                                                                opacity="0.3"
                                                                            >
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    clipRule="evenodd"
                                                                                    d="M14.5373 12.6145L15.4905 13.1493L14.6495 14.7487C15.014 14.6732 15.3838 14.6847 15.7338 14.7987L16.3475 13.6323L17.0185 14.008L16.4038 15.1747C17.2391 15.8857 17.4407 17.2205 16.9877 18.4499L21.7289 17.0004L21.0042 18.3906L16.0489 19.9067L15.9629 19.9956L15.1535 19.5401L15.3211 19.3219C15.5347 19.0439 15.7203 18.744 15.8751 18.4271L15.8766 18.424L15.8783 18.4209C16.3038 17.6105 16.2291 16.7537 15.8276 16.2768L14.4017 18.9907L13.7263 18.6173L15.154 15.9011C14.6766 15.8323 14.1187 16.0675 13.6886 16.5774L12.8191 18.2296L12.5978 18.1081L11.8659 17.6964L14.5373 12.6145ZM14.7194 13.2498L12.4805 17.5089L12.6362 17.5963L13.3132 16.3099L13.3287 16.2911C13.9209 15.5752 14.8111 15.2209 15.5741 15.5343L15.6791 15.5774L15.6877 15.561L15.7503 15.6066L15.8116 15.6318L15.8041 15.6459L15.8961 15.7129C16.7108 16.3074 16.8302 17.5878 16.2783 18.6413C16.1504 18.9029 16.0032 19.1538 15.8379 19.3918L15.9425 19.4506L20.6945 17.9967L20.8132 17.7691L15.9922 19.2428L16.3813 18.6949C17.0554 17.4051 16.8139 16.0049 15.9852 15.4366L15.8727 15.3595L15.7489 15.3039C15.303 15.1041 14.7821 15.1293 14.2732 15.363L13.6634 15.6428L14.8756 13.3374L14.7194 13.2498Z"
                                                                                    fill="white"
                                                                                />
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                                <path
                                                                    d="M14.5305 12.8066L12.0753 17.475L12.2207 17.5569L12.6073 17.7705L12.6294 17.7833L13.4025 16.3122C13.9538 15.6457 14.7476 15.3559 15.3926 15.6215L13.9365 18.3907L14.208 18.5431L15.6641 15.7739C16.3497 16.2759 16.4965 17.4116 15.9755 18.4014C15.8144 18.733 15.6206 19.0465 15.3974 19.3371L15.8212 19.5749L15.8281 19.5678L20.7481 18.0632L21.1691 17.2614L16.4765 18.6955V18.6898C17.1897 17.3326 16.9733 15.7767 16.0107 15.1166L16.6102 13.9773L16.3387 13.8228L15.7385 14.9621C15.2237 14.7314 14.636 14.767 14.0812 15.0226L15.0832 13.1171L14.5305 12.8066Z"
                                                                    fill="white"
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M14.4396 12.4888L15.3905 13.023L14.5499 14.6217C14.914 14.5462 15.2835 14.5577 15.6333 14.6716L16.2484 13.5038L16.917 13.8844L16.3038 15.0497C17.1393 15.7607 17.3409 17.0955 16.8875 18.3254L21.6291 16.8764L20.9025 18.2601L15.9476 19.7754L15.8617 19.8641L15.052 19.4097L15.2199 19.1912C15.4334 18.9132 15.6188 18.6133 15.7729 18.2962L15.7746 18.2927L15.7764 18.2893C16.2019 17.4808 16.1255 16.6237 15.726 16.1466L14.299 18.8606L13.6291 18.4846L15.0562 15.7703C14.5787 15.7009 14.0203 15.9361 13.5901 16.446L12.7188 18.104L12.4983 17.9758L12.113 17.7629L11.768 17.5686L14.4396 12.4888ZM12.5379 17.4663L13.2146 16.1786L13.2302 16.1598C13.8224 15.4438 14.7133 15.0895 15.4765 15.4037L15.5785 15.4457L15.5867 15.43L15.6464 15.4736L15.7136 15.5013L15.7054 15.5169L15.7951 15.5826C16.6055 16.176 16.7292 17.4563 16.1764 18.5098C16.049 18.7717 15.902 19.0228 15.7369 19.2609L15.8411 19.3193L20.5936 17.8659L20.709 17.6461L16.2497 19.009V18.6301L16.2772 18.5779C16.9565 17.2852 16.7157 15.8811 15.8853 15.3116L15.7651 15.2293L15.6483 15.1769C15.2024 14.977 14.6816 15.0023 14.1736 15.2365L13.5627 15.5179L14.7757 13.2109L14.6214 13.1242L12.3829 17.3807L12.5379 17.4663Z"
                                                                    fill="white"
                                                                />
                                                                <path
                                                                    d="M30.9101 0.330811L9.64587 21.6846L19.7119 32.3888L40.9762 11.0349L30.9101 0.330811Z"
                                                                    fill="#6ABE59"
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M29.0958 3.77686L29.2461 3.93665C29.6865 4.40487 30.2889 4.67314 30.9207 4.68244C31.5525 4.69175 32.1621 4.44133 32.6153 3.98628L32.7699 3.83096L37.5612 8.92542L37.4065 9.0808L37.5569 9.24051C37.1041 9.69603 36.8448 10.3187 36.836 10.9717C36.8273 11.6248 37.0698 12.2546 37.5102 12.723L37.6605 12.8828L21.6684 28.941L21.5182 28.7811C21.3001 28.5492 21.04 28.364 20.7527 28.236C20.4653 28.1079 20.1564 28.0397 19.8436 28.0351C19.5307 28.0304 19.22 28.0896 18.9292 28.2091C18.6385 28.3286 18.3734 28.5061 18.1491 28.7315L17.9944 28.8869L13.0528 23.6318L13.2074 23.4765C13.6606 23.0214 13.9201 22.3989 13.9292 21.746C13.9382 21.093 13.6958 20.4632 13.2555 19.9948L13.1052 19.835L29.0958 3.77686ZM37.1074 9.08258L32.7555 4.45514C32.2411 4.89777 31.5886 5.13809 30.9146 5.12816C30.2406 5.11823 29.5949 4.8588 29.093 4.40119L13.7092 19.85C14.1375 20.3816 14.3701 21.0558 14.3605 21.7523C14.3509 22.4488 14.0998 23.116 13.657 23.6347L18.0088 28.2627C18.2366 28.0665 18.4935 27.9085 18.7698 27.7949C19.1132 27.6538 19.4801 27.5839 19.8497 27.5893C20.2193 27.5948 20.5841 27.6754 20.9234 27.8266C21.1966 27.9483 21.449 28.1138 21.6713 28.3166L37.0565 12.8678C36.6281 12.3363 36.3954 11.6621 36.4047 10.9655C36.4141 10.269 36.6649 9.60161 37.1074 9.08258Z"
                                                                    fill="#008B60"
                                                                />
                                                                <path
                                                                    d="M29.8831 12.1283C30.6929 12.9894 31.2375 14.0794 31.4478 15.2604C31.6581 16.4413 31.5249 17.6601 31.0648 18.7629C30.6048 19.8655 29.8387 20.8025 28.8634 21.4551C27.8881 22.1079 26.7474 22.4471 25.5855 22.4299C24.4236 22.4127 23.2928 22.0398 22.336 21.3584C21.3792 20.677 20.6394 19.7178 20.2102 18.6019C19.781 17.486 19.6817 16.2637 19.9247 15.0895C20.1677 13.9153 20.7423 12.8419 21.5756 12.0051C22.129 11.4494 22.7828 11.0119 23.4998 10.7173C24.2168 10.4228 24.9829 10.2771 25.7544 10.2885C26.5259 10.2999 27.2877 10.4683 27.9962 10.784C28.7048 11.0997 29.3461 11.5565 29.8838 12.1283"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <g style={{ mixBlendMode: "multiply" }} opacity="0.3">
                                                                    <g
                                                                        style={{ mixBlendMode: "multiply" }}
                                                                        opacity="0.3"
                                                                    >
                                                                        <g
                                                                            style={{ mixBlendMode: "multiply" }}
                                                                            opacity="0.3"
                                                                        >
                                                                            <g
                                                                                style={{ mixBlendMode: "multiply" }}
                                                                                opacity="0.3"
                                                                            >
                                                                                <path
                                                                                    d="M24.6131 11.8496L20.9238 15.5524L21.0395 15.6756L21.3462 16.001L21.3641 16.0202L22.5252 14.8539C23.2432 14.3867 24.0846 14.3554 24.6241 14.8054L22.4363 17.0022L22.652 17.2315L24.8398 15.0347C25.3497 15.7247 25.163 16.8534 24.3809 17.6388C24.1311 17.9056 23.8556 18.1454 23.5588 18.3544L23.8951 18.7105L23.904 18.7062L29.0335 18.7817L29.6695 18.1408L24.7771 18.0696L24.7819 18.0646C25.8534 16.9887 26.0911 15.4363 25.3662 14.5099L26.2669 13.6056L26.0512 13.3763L25.1506 14.2806C24.7254 13.9025 24.1521 13.7551 23.5505 13.8285L25.0555 12.3174L24.6131 11.8496Z"
                                                                                    fill="#1D5F3E"
                                                                                />
                                                                            </g>
                                                                        </g>
                                                                        <g
                                                                            style={{ mixBlendMode: "multiply" }}
                                                                            opacity="0.3"
                                                                        >
                                                                            <g
                                                                                style={{ mixBlendMode: "multiply" }}
                                                                                opacity="0.3"
                                                                            >
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    clipRule="evenodd"
                                                                                    d="M24.6173 11.5188L25.3765 12.3217L24.1131 13.5902C24.4823 13.6302 24.8322 13.7551 25.1334 13.971L26.0557 13.045L26.5875 13.6102L25.6649 14.5366C26.2544 15.4718 26.0658 16.8077 25.2796 17.8425L30.2188 17.9144L29.1244 19.0172L23.9522 18.9411L23.8447 18.9924L23.2077 18.318L23.4311 18.1607C23.7153 17.9607 23.9789 17.7312 24.2179 17.4759L24.2203 17.4732L24.2228 17.4707C24.8618 16.8291 25.0355 15.9878 24.7915 15.4098L22.6474 17.5627L22.1156 16.9974L24.2597 14.8446C23.8233 14.6325 23.2226 14.6849 22.6657 15.0394L21.3588 16.3522L21.1837 16.1644L21.1828 16.1634L20.6032 15.5475L24.6173 11.5188ZM21.3685 15.6889L22.3842 14.6687L22.4044 14.6556C23.1762 14.1534 24.1285 14.0909 24.7664 14.6231L24.8527 14.695L24.8649 14.6828L24.9083 14.7413L24.9656 14.7891L24.9529 14.8018L25.0199 14.8925C25.6227 15.7081 25.3722 16.9677 24.5414 17.8041C24.344 18.0148 24.1313 18.2092 23.9052 18.3857L23.9876 18.473L28.9426 18.546L29.1202 18.367L24.237 18.296L24.6228 17.8976L24.6239 17.8965C25.6438 16.8723 25.8157 15.4569 25.1899 14.6572L25.1064 14.5504L25.0027 14.4582C24.6342 14.1305 24.1277 13.9939 23.5771 14.061L22.9128 14.1421L24.7344 12.3131L24.6088 12.1803L21.2444 15.5571L21.3685 15.6889Z"
                                                                                    fill="white"
                                                                                />
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                                <path
                                                                    d="M24.5552 11.6987L20.8665 15.4015L20.9823 15.5247L21.2883 15.8501L21.3062 15.8693L22.4714 14.7044C23.1887 14.2373 24.0308 14.2059 24.5696 14.656L22.3825 16.8527L22.5982 17.082L24.7853 14.8853C25.2952 15.5753 25.1085 16.7046 24.3264 17.49C24.0765 17.7556 23.801 17.9942 23.5043 18.2021L23.8413 18.5581L23.8496 18.5539L28.9797 18.6293L29.6151 17.9885L24.7226 17.9173C24.7248 17.916 24.7266 17.9143 24.7281 17.9123C25.7996 16.8363 26.0374 15.284 25.3118 14.3583L26.2131 13.4533L25.9967 13.224L25.0899 14.1283C24.6647 13.7502 24.0914 13.6028 23.4899 13.6762L24.9948 12.1651L24.5552 11.6987Z"
                                                                    fill="white"
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M24.5597 11.3677L25.3157 12.1697L24.0525 13.438C24.4221 13.478 24.7721 13.6029 25.0734 13.8192L26.0016 12.8936L26.5341 13.4578L25.6107 14.3849C26.2008 15.3197 26.0121 16.6556 25.2259 17.6903L30.1641 17.7622L29.0708 18.8649L23.9017 18.7889L23.7949 18.8441L23.1527 18.1655L23.3772 18.0082C23.6611 17.8092 23.9248 17.5809 24.1639 17.3267L24.1662 17.3243L24.1685 17.322C24.8074 16.6804 24.9812 15.8386 24.7372 15.2604L22.5937 17.4132L22.062 16.848L24.2054 14.6952C23.7694 14.4831 23.1682 14.5355 22.6119 14.89L21.3006 16.201L21.1257 16.0134L21.125 16.0126L20.5461 15.3967L24.5597 11.3677ZM21.3113 15.5384L22.3307 14.5191L22.3506 14.5062C23.1218 14.0041 24.0748 13.9415 24.7122 14.4737L24.7983 14.5456L24.8106 14.5333L24.8542 14.5923L24.9111 14.6398L24.8986 14.6524L24.9656 14.743C25.5684 15.5587 25.3179 16.8192 24.4868 17.6557C24.3767 17.7726 24.2618 17.8845 24.1425 17.991L24.5863 17.7281C25.592 16.7052 25.7587 15.3005 25.1357 14.5058L25.064 14.4143L24.9421 14.3059C24.5737 13.9782 24.0672 13.8416 23.5165 13.9088L22.8522 13.9898L24.6741 12.1606L24.5509 12.0298L21.1872 15.4063L21.3113 15.5384ZM23.968 18.1406C23.9295 18.1722 23.8907 18.2032 23.8514 18.2337L23.9339 18.3208L28.8889 18.3937L29.0662 18.2148L23.968 18.1406Z"
                                                                    fill="white"
                                                                />
                                                                <path
                                                                    d="M35.2531 19.97H7.22843C6.03801 19.97 5.073 20.9672 5.073 22.1973V43.7319C5.073 44.962 6.03801 45.9593 7.22843 45.9593H35.2531C36.4435 45.9593 37.4086 44.962 37.4086 43.7319V22.1973C37.4086 20.9672 36.4435 19.97 35.2531 19.97Z"
                                                                    fill="#FECD10"
                                                                />
                                                                <path
                                                                    opacity="0.24"
                                                                    d="M36.7381 20.4792L12.0967 45.9288H35.3482C35.6299 45.9314 35.9092 45.8764 36.1703 45.767C36.4314 45.6576 36.6689 45.496 36.8692 45.2913C37.0696 45.0867 37.2288 44.8431 37.3376 44.5747C37.4465 44.3062 37.5029 44.0181 37.5036 43.727V22.1946C37.5039 21.8685 37.4356 21.5461 37.3034 21.2499C37.1712 20.9538 36.9783 20.6908 36.7381 20.4792Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    opacity="0.24"
                                                                    d="M25.5819 19.938L5.16806 41.0624V43.7284C5.16896 44.0193 5.22552 44.3073 5.33447 44.5756C5.44344 44.8439 5.60265 45.0872 5.80297 45.2918C6.00328 45.4963 6.24074 45.6578 6.50169 45.7671C6.76264 45.8764 7.04193 45.9313 7.32349 45.9287H7.33038L32.4816 19.938H25.5819Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <g opacity="0.24">
                                                                    <g opacity="0.24">
                                                                        <path
                                                                            opacity="0.24"
                                                                            d="M36.6423 20.5088L12.0009 45.9583H35.2524C35.5341 45.961 35.8135 45.906 36.0746 45.7965C36.3356 45.6872 36.5731 45.5255 36.7734 45.3209C36.9738 45.1162 37.133 44.8727 37.2419 44.6042C37.3507 44.3357 37.4072 44.0477 37.4079 43.7566V22.2242C37.4081 21.898 37.3399 21.5756 37.2076 21.2795C37.0755 20.9832 36.8826 20.7203 36.6423 20.5088Z"
                                                                            fill="#F9A01E"
                                                                        />
                                                                    </g>
                                                                </g>
                                                                <g opacity="0.24">
                                                                    <g opacity="0.24">
                                                                        <path
                                                                            opacity="0.24"
                                                                            d="M25.4861 19.9673L5.0723 41.0917V43.7577C5.07319 44.0486 5.12975 44.3365 5.23871 44.6048C5.34767 44.8731 5.50689 45.1165 5.7072 45.321C5.90752 45.5255 6.14498 45.687 6.40592 45.7964C6.66688 45.9057 6.94617 45.9606 7.22772 45.958H7.23461L32.3858 19.9673H25.4861Z"
                                                                            fill="#F9A01E"
                                                                        />
                                                                    </g>
                                                                </g>
                                                                <path
                                                                    d="M37.4078 29.9937H31.2999C30.5452 30.0057 29.8255 30.324 29.2959 30.8797C28.7664 31.4355 28.4696 32.1842 28.4696 32.9641C28.4696 33.744 28.7664 34.4926 29.2959 35.0484C29.8255 35.6042 30.5452 35.9224 31.2999 35.9345H37.4078V29.9937Z"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <path
                                                                    d="M34.737 44.872C34.737 44.8128 34.7595 44.756 34.7997 44.7139C34.839 44.6753 34.8897 44.6514 34.9438 44.6463H35.0072C35.0271 44.6463 35.0506 44.6399 35.0761 44.6363C35.1069 44.6322 35.1375 44.6263 35.1677 44.6185C35.3316 44.5808 35.4861 44.5081 35.6211 44.4049C35.7565 44.3011 35.8695 44.1694 35.9533 44.0182C35.9692 43.9905 35.9835 43.9617 35.996 43.9321C36.0075 43.9091 36.0174 43.8853 36.0256 43.8609L36.047 43.7996C36.068 43.7491 36.105 43.7074 36.152 43.6816C36.199 43.6556 36.2531 43.6471 36.3054 43.6572C36.3341 43.6618 36.3615 43.6731 36.3853 43.6903C36.4092 43.7074 36.429 43.73 36.4432 43.7562C36.4581 43.785 36.4669 43.8166 36.4692 43.8491C36.4714 43.8816 36.467 43.9143 36.4563 43.9449C36.4563 43.9449 36.4452 43.9748 36.4266 44.0275C36.4152 44.0591 36.4021 44.09 36.3874 44.1201C36.3699 44.1598 36.3503 44.1985 36.3288 44.2361C36.2155 44.4406 36.0626 44.6187 35.8797 44.7594C35.6967 44.9001 35.4876 45.0002 35.2656 45.0536C35.2245 45.0642 35.1829 45.072 35.1408 45.0771C35.1036 45.0821 35.0719 45.0899 35.0444 45.0906L34.9589 45.0949C34.9294 45.0976 34.8997 45.0935 34.8718 45.0827C34.844 45.072 34.819 45.055 34.7984 45.0329C34.7583 44.991 34.7357 44.9345 34.7357 44.8756"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M32.3183 44.8451C32.3185 44.7861 32.3413 44.7296 32.3817 44.6879C32.4222 44.6463 32.477 44.6229 32.534 44.6229H34.2567C34.286 44.6212 34.3153 44.6257 34.3429 44.6361C34.3705 44.6465 34.3957 44.6626 34.4171 44.6834C34.4383 44.7042 34.4554 44.7294 34.4669 44.7572C34.4786 44.7851 34.4846 44.8151 34.4846 44.8454C34.4846 44.8758 34.4786 44.9058 34.4669 44.9336C34.4554 44.9614 34.4383 44.9866 34.4171 45.0074C34.3957 45.0282 34.3705 45.0444 34.3429 45.0548C34.3153 45.0652 34.286 45.0697 34.2567 45.068H32.534C32.4768 45.068 32.422 45.0445 32.3815 45.0027C32.3411 44.9609 32.3183 44.9042 32.3183 44.8451Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M29.9025 44.8451C29.9027 44.7861 29.9255 44.7296 29.9659 44.6879C30.0063 44.6463 30.0611 44.6229 30.1181 44.6229H31.8409C31.8701 44.6212 31.8995 44.6257 31.9271 44.6361C31.9546 44.6465 31.9799 44.6626 32.0012 44.6834C32.0225 44.7042 32.0395 44.7294 32.0511 44.7572C32.0627 44.7851 32.0687 44.8151 32.0687 44.8454C32.0687 44.8758 32.0627 44.9058 32.0511 44.9336C32.0395 44.9614 32.0225 44.9866 32.0012 45.0074C31.9799 45.0282 31.9546 45.0444 31.9271 45.0548C31.8995 45.0652 31.8701 45.0697 31.8409 45.068H30.1181C30.061 45.068 30.0061 45.0445 29.9657 45.0027C29.9252 44.9609 29.9025 44.9042 29.9025 44.8451Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M27.4865 44.8451C27.4867 44.7861 27.5096 44.7296 27.5499 44.6879C27.5904 44.6463 27.6452 44.6229 27.7022 44.6229H29.4249C29.4542 44.6212 29.4836 44.6257 29.5111 44.6361C29.5387 44.6465 29.5639 44.6626 29.5853 44.6834C29.6066 44.7042 29.6236 44.7294 29.6352 44.7572C29.6468 44.7851 29.6528 44.8151 29.6528 44.8454C29.6528 44.8758 29.6468 44.9058 29.6352 44.9336C29.6236 44.9614 29.6066 44.9866 29.5853 45.0074C29.5639 45.0282 29.5387 45.0444 29.5111 45.0548C29.4836 45.0652 29.4542 45.0697 29.4249 45.068H27.7022C27.6739 45.068 27.6459 45.0622 27.6197 45.051C27.5935 45.0398 27.5697 45.0234 27.5497 45.0027C27.5297 44.9819 27.5138 44.9574 27.5029 44.9304C27.4921 44.9033 27.4865 44.8744 27.4865 44.8451Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M25.0706 44.8451C25.0709 44.7861 25.0937 44.7296 25.134 44.6879C25.1745 44.6463 25.2293 44.6229 25.2863 44.6229H27.009C27.0383 44.6212 27.0677 44.6257 27.0952 44.6361C27.1228 44.6465 27.148 44.6626 27.1694 44.6834C27.1907 44.7042 27.2077 44.7294 27.2193 44.7572C27.2309 44.7851 27.2369 44.8151 27.2369 44.8454C27.2369 44.8758 27.2309 44.9058 27.2193 44.9336C27.2077 44.9614 27.1907 44.9866 27.1694 45.0074C27.148 45.0282 27.1228 45.0444 27.0952 45.0548C27.0677 45.0652 27.0383 45.0697 27.009 45.068H25.2863C25.2291 45.068 25.1743 45.0445 25.1338 45.0027C25.0934 44.9609 25.0706 44.9042 25.0706 44.8451Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M22.6554 44.8451C22.6554 44.7861 22.6781 44.7297 22.7184 44.688C22.7587 44.6463 22.8134 44.6229 22.8704 44.6229H24.5931C24.6224 44.6212 24.6517 44.6257 24.6793 44.6361C24.7069 44.6465 24.7321 44.6626 24.7534 44.6834C24.7747 44.7042 24.7918 44.7294 24.8033 44.7572C24.815 44.7851 24.821 44.8151 24.821 44.8454C24.821 44.8758 24.815 44.9058 24.8033 44.9336C24.7918 44.9614 24.7747 44.9866 24.7534 45.0074C24.7321 45.0282 24.7069 45.0444 24.6793 45.0548C24.6517 45.0652 24.6224 45.0697 24.5931 45.068H22.8704C22.8421 45.068 22.8141 45.0622 22.788 45.0509C22.7619 45.0398 22.7381 45.0233 22.7181 45.0026C22.6981 44.9819 22.6824 44.9573 22.6716 44.9303C22.6608 44.9033 22.6554 44.8743 22.6554 44.8451Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M20.2396 44.8451C20.2398 44.7861 20.2626 44.7296 20.303 44.6879C20.3434 44.6463 20.3982 44.6229 20.4552 44.6229H22.1779C22.2072 44.6212 22.2366 44.6257 22.2641 44.6361C22.2917 44.6465 22.3169 44.6626 22.3383 44.6834C22.3596 44.7042 22.3766 44.7294 22.3882 44.7572C22.3998 44.7851 22.4058 44.8151 22.4058 44.8454C22.4058 44.8758 22.3998 44.9058 22.3882 44.9336C22.3766 44.9614 22.3596 44.9866 22.3383 45.0074C22.3169 45.0282 22.2917 45.0444 22.2641 45.0548C22.2366 45.0652 22.2072 45.0697 22.1779 45.068H20.4552C20.3981 45.068 20.3432 45.0445 20.3028 45.0027C20.2623 44.9609 20.2396 44.9042 20.2396 44.8451Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M17.8236 44.8451C17.8238 44.7861 17.8466 44.7296 17.887 44.6879C17.9275 44.6463 17.9822 44.6229 18.0393 44.6229H19.762C19.7913 44.6212 19.8206 44.6257 19.8482 44.6361C19.8757 44.6465 19.901 44.6626 19.9223 44.6834C19.9436 44.7042 19.9606 44.7294 19.9722 44.7572C19.9839 44.7851 19.9899 44.8151 19.9899 44.8454C19.9899 44.8758 19.9839 44.9058 19.9722 44.9336C19.9606 44.9614 19.9436 44.9866 19.9223 45.0074C19.901 45.0282 19.8757 45.0444 19.8482 45.0548C19.8206 45.0652 19.7913 45.0697 19.762 45.068H18.0393C17.9821 45.068 17.9272 45.0445 17.8868 45.0027C17.8463 44.9609 17.8236 44.9042 17.8236 44.8451Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M15.4078 44.845C15.408 44.786 15.4308 44.7295 15.4712 44.6878C15.5116 44.6462 15.5664 44.6228 15.6235 44.6228H17.3461C17.4011 44.626 17.4529 44.6509 17.4907 44.6922C17.5285 44.7336 17.5496 44.7884 17.5496 44.8453C17.5496 44.9022 17.5285 44.9571 17.4907 44.9984C17.4529 45.0398 17.4011 45.0646 17.3461 45.0679H15.6235C15.5663 45.0679 15.5114 45.0444 15.471 45.0026C15.4305 44.9608 15.4078 44.9041 15.4078 44.845Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M12.9918 44.8451C12.992 44.7861 13.0148 44.7296 13.0552 44.6879C13.0956 44.6463 13.1504 44.6229 13.2075 44.6229H14.9301C14.9594 44.6212 14.9888 44.6257 15.0164 44.6361C15.0439 44.6465 15.0691 44.6626 15.0905 44.6834C15.1118 44.7042 15.1288 44.7294 15.1404 44.7572C15.152 44.7851 15.158 44.8151 15.158 44.8454C15.158 44.8758 15.152 44.9058 15.1404 44.9336C15.1288 44.9614 15.1118 44.9866 15.0905 45.0074C15.0691 45.0282 15.0439 45.0444 15.0164 45.0548C14.9888 45.0652 14.9594 45.0697 14.9301 45.068H13.2075C13.1503 45.068 13.0954 45.0445 13.055 45.0027C13.0145 44.9609 12.9918 44.9042 12.9918 44.8451Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M10.5759 44.8451C10.5761 44.7861 10.5989 44.7296 10.6393 44.6879C10.6798 44.6463 10.7346 44.6229 10.7916 44.6229H12.5143C12.5436 44.6212 12.573 44.6257 12.6005 44.6361C12.6281 44.6465 12.6533 44.6626 12.6747 44.6834C12.696 44.7042 12.713 44.7294 12.7246 44.7572C12.7362 44.7851 12.7422 44.8151 12.7422 44.8454C12.7422 44.8758 12.7362 44.9058 12.7246 44.9336C12.713 44.9614 12.696 44.9866 12.6747 45.0074C12.6533 45.0282 12.6281 45.0444 12.6005 45.0548C12.573 45.0652 12.5436 45.0697 12.5143 45.068H10.7916C10.7344 45.068 10.6796 45.0445 10.6391 45.0027C10.5987 44.9609 10.5759 44.9042 10.5759 44.8451Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M8.16074 44.8451C8.16074 44.7861 8.18341 44.7297 8.22372 44.688C8.26403 44.6463 8.31874 44.6229 8.37573 44.6229H10.0984C10.1277 44.6212 10.1571 44.6257 10.1846 44.6361C10.2122 44.6465 10.2374 44.6626 10.2588 44.6834C10.2801 44.7042 10.2971 44.7294 10.3087 44.7572C10.3203 44.7851 10.3263 44.8151 10.3263 44.8454C10.3263 44.8758 10.3203 44.9058 10.3087 44.9336C10.2971 44.9614 10.2801 44.9866 10.2588 45.0074C10.2374 45.0282 10.2122 45.0444 10.1846 45.0548C10.1571 45.0652 10.1277 45.0697 10.0984 45.068H8.37573C8.31867 45.0677 8.26396 45.0442 8.22365 45.0024C8.18334 44.9607 8.16074 44.904 8.16074 44.8451Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M6.20928 43.809C6.26356 43.7934 6.32132 43.7972 6.37328 43.8197C6.42027 43.8391 6.45876 43.8755 6.48146 43.9222C6.48146 43.9222 6.4918 43.9429 6.50903 43.9806C6.51799 43.9992 6.53177 44.0198 6.54555 44.0447C6.56084 44.073 6.57836 44.0999 6.59792 44.1252C6.69648 44.2663 6.82223 44.3849 6.96726 44.4734C7.11197 44.5626 7.27328 44.6191 7.44066 44.6393C7.47201 44.6391 7.50329 44.637 7.53437 44.6329C7.56262 44.6329 7.58468 44.6229 7.61017 44.6229H7.6839C7.71319 44.6212 7.74254 44.6257 7.77011 44.6361C7.79767 44.6465 7.82289 44.6626 7.84425 44.6835C7.86554 44.7043 7.88256 44.7294 7.89414 44.7573C7.90578 44.7851 7.91178 44.8151 7.91178 44.8455C7.91178 44.8758 7.90578 44.9058 7.89414 44.9336C7.88256 44.9615 7.86554 44.9866 7.84425 45.0075C7.82289 45.0283 7.79767 45.0444 7.77011 45.0548C7.74254 45.0652 7.71319 45.0697 7.6839 45.068H7.61017C7.57889 45.0732 7.5474 45.0765 7.51577 45.078C7.47373 45.0803 7.4317 45.0803 7.38967 45.078C7.1631 45.0517 6.94445 44.9762 6.74814 44.8565C6.55223 44.7375 6.38216 44.5779 6.24856 44.388C6.22325 44.3535 6.20023 44.3173 6.17965 44.2797C6.16035 44.2462 6.14244 44.2178 6.13004 44.1928C6.10661 44.1423 6.09283 44.1138 6.09283 44.1138C6.0788 44.0846 6.07099 44.0527 6.06992 44.0202C6.06885 43.9875 6.07454 43.9551 6.08662 43.9251C6.09748 43.8976 6.11433 43.8731 6.13584 43.8535C6.15735 43.8339 6.18296 43.8196 6.21066 43.8119"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M6.15 41.3181C6.2072 41.3181 6.26206 41.3416 6.30251 41.3834C6.34295 41.4252 6.36568 41.4819 6.36568 41.541V43.3212C6.36621 43.3486 6.36127 43.3758 6.3512 43.4011C6.34113 43.4265 6.32612 43.4495 6.30711 43.4686C6.26673 43.5086 6.21462 43.5336 6.15895 43.5398C6.13056 43.5435 6.10171 43.5405 6.0746 43.531C6.0475 43.5215 6.02285 43.5058 6.00253 43.4849C5.95999 43.4401 5.93537 43.3803 5.93362 43.3176V41.5431C5.93362 41.484 5.95634 41.4273 5.99679 41.3855C6.03724 41.3438 6.09211 41.3203 6.14931 41.3203"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M6.15001 38.8223C6.20709 38.8223 6.26184 38.8456 6.30227 38.8873C6.3427 38.9289 6.36551 38.9854 6.36569 39.0444V40.8246C6.36569 40.8837 6.34296 40.9404 6.30252 40.9822C6.26207 41.024 6.20721 41.0475 6.15001 41.0475C6.09281 41.0475 6.03794 41.024 5.99749 40.9822C5.95705 40.9404 5.93433 40.8837 5.93433 40.8246V39.0444C5.93451 38.9854 5.95731 38.9289 5.99774 38.8873C6.03817 38.8456 6.09292 38.8223 6.15001 38.8223Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M6.15001 36.3257C6.20721 36.3257 6.26207 36.3492 6.30252 36.391C6.34296 36.4328 6.36569 36.4895 6.36569 36.5486V38.3287C6.36569 38.3878 6.34296 38.4445 6.30252 38.4863C6.26207 38.5281 6.20721 38.5516 6.15001 38.5516C6.09281 38.5516 6.03794 38.5281 5.99749 38.4863C5.95705 38.4445 5.93433 38.3878 5.93433 38.3287V36.5486C5.93433 36.4895 5.95705 36.4328 5.99749 36.391C6.03794 36.3492 6.09281 36.3257 6.15001 36.3257Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M6.15001 33.8291C6.20721 33.8291 6.26207 33.8526 6.30252 33.8944C6.34296 33.9362 6.36569 33.9929 6.36569 34.052V35.8322C6.36569 35.8913 6.34296 35.9479 6.30252 35.9897C6.26207 36.0315 6.20721 36.055 6.15001 36.055C6.09281 36.055 6.03794 36.0315 5.99749 35.9897C5.95705 35.9479 5.93433 35.8913 5.93433 35.8322V34.052C5.93433 33.9929 5.95705 33.9362 5.99749 33.8944C6.03794 33.8526 6.09281 33.8291 6.15001 33.8291Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M6.15001 31.3328C6.20721 31.3328 6.26207 31.3563 6.30252 31.3981C6.34296 31.4399 6.36569 31.4965 6.36569 31.5556V33.3358C6.36569 33.3949 6.34296 33.4516 6.30252 33.4934C6.26207 33.5352 6.20721 33.5587 6.15001 33.5587C6.09281 33.5587 6.03794 33.5352 5.99749 33.4934C5.95705 33.4516 5.93433 33.3949 5.93433 33.3358V31.5556C5.93433 31.4965 5.95705 31.4399 5.99749 31.3981C6.03794 31.3563 6.09281 31.3328 6.15001 31.3328Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M6.15001 28.8362C6.20721 28.8362 6.26207 28.8597 6.30252 28.9015C6.34296 28.9433 6.36569 29 6.36569 29.0591V30.8392C6.36569 30.8984 6.34296 30.955 6.30252 30.9968C6.26207 31.0386 6.20721 31.0621 6.15001 31.0621C6.09281 31.0621 6.03794 31.0386 5.99749 30.9968C5.95705 30.955 5.93433 30.8984 5.93433 30.8392V29.0591C5.93433 29 5.95705 28.9433 5.99749 28.9015C6.03794 28.8597 6.09281 28.8362 6.15001 28.8362Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M6.15001 26.3403C6.20709 26.3403 6.26184 26.3637 6.30227 26.4053C6.3427 26.447 6.36551 26.5035 6.36569 26.5625V28.3427C6.36569 28.4018 6.34296 28.4585 6.30252 28.5003C6.26207 28.5421 6.20721 28.5656 6.15001 28.5656C6.09281 28.5656 6.03794 28.5421 5.99749 28.5003C5.95705 28.4585 5.93433 28.4018 5.93433 28.3427V26.5625C5.93451 26.5035 5.95731 26.447 5.99774 26.4053C6.03817 26.3637 6.09292 26.3403 6.15001 26.3403Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M6.15001 23.8438C6.20721 23.8438 6.26207 23.8672 6.30252 23.909C6.34296 23.9508 6.36569 24.0075 6.36569 24.0666V25.8468C6.36569 25.9059 6.34296 25.9626 6.30252 26.0044C6.26207 26.0462 6.20721 26.0697 6.15001 26.0697C6.09281 26.0697 6.03794 26.0462 5.99749 26.0044C5.95705 25.9626 5.93433 25.9059 5.93433 25.8468V24.0666C5.93433 24.0075 5.95705 23.9508 5.99749 23.909C6.03794 23.8672 6.09281 23.8438 6.15001 23.8438Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M6.62959 21.4897C6.66671 21.5331 6.68793 21.5885 6.68954 21.6464C6.69168 21.672 6.68889 21.6977 6.68133 21.7222C6.67375 21.7466 6.66156 21.7693 6.64544 21.7888C6.64544 21.7888 6.63166 21.8073 6.60823 21.8408C6.57473 21.886 6.54433 21.9336 6.51727 21.9832C6.43592 22.1357 6.38617 22.3039 6.37119 22.4774V22.5486C6.37119 22.5721 6.37119 22.5949 6.37119 22.6234V23.3483C6.37119 23.4074 6.34846 23.464 6.30801 23.5058C6.26756 23.5476 6.2127 23.5711 6.1555 23.5711C6.09829 23.5711 6.04344 23.5476 6.00299 23.5058C5.96255 23.464 5.93982 23.4074 5.93982 23.3483V22.6269C5.93982 22.6013 5.93982 22.5692 5.93982 22.5372L5.94464 22.4411C5.96517 22.2062 6.03251 21.9784 6.14241 21.7717C6.1791 21.7042 6.22008 21.6393 6.26507 21.5773L6.31606 21.5061C6.33625 21.4811 6.36112 21.4606 6.38919 21.4458C6.41726 21.431 6.44793 21.4222 6.47937 21.42C6.50838 21.4194 6.53716 21.4254 6.56362 21.4378C6.59007 21.4501 6.61355 21.4683 6.63235 21.4912"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M8.95387 21.0837C8.95387 21.1426 8.93126 21.1992 8.89095 21.241C8.85064 21.2828 8.79593 21.3063 8.73887 21.3065H7.87615C7.77004 21.3065 7.65634 21.3179 7.564 21.3208C7.52128 21.3251 7.47925 21.3293 7.43997 21.3364L7.3304 21.3578C7.27652 21.3707 7.2236 21.3874 7.17192 21.4077C7.13402 21.4219 7.11266 21.4312 7.11266 21.4312C7.08944 21.4412 7.06449 21.4464 7.03927 21.4464C7.01405 21.4464 6.98911 21.4412 6.96588 21.4312C6.91283 21.4131 6.86768 21.3763 6.83841 21.3272C6.82287 21.3019 6.81301 21.2734 6.80955 21.2437C6.80609 21.214 6.80913 21.1839 6.81842 21.1556C6.82972 21.1252 6.84674 21.0975 6.86851 21.074C6.89028 21.0505 6.91634 21.0318 6.94521 21.0189L7.02514 20.9882C7.09557 20.9616 7.16758 20.94 7.24083 20.9234C7.2863 20.9135 7.33592 20.9071 7.38898 20.8985C7.44204 20.89 7.49785 20.8772 7.55573 20.8736C7.66461 20.8736 7.76659 20.8586 7.87615 20.8586H8.73887C8.79593 20.8589 8.85064 20.8824 8.89095 20.9242C8.93126 20.966 8.95387 21.0226 8.95387 21.0815"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M11.3698 21.0837C11.3698 21.1428 11.347 21.1995 11.3066 21.2413C11.2661 21.2831 11.2113 21.3066 11.1541 21.3066H9.43141C9.40309 21.3066 9.37504 21.3008 9.34886 21.2897C9.32267 21.2784 9.2989 21.262 9.27892 21.2413C9.25886 21.2207 9.24302 21.1961 9.23213 21.169C9.22131 21.142 9.21573 21.113 9.21573 21.0837C9.21573 21.0545 9.22131 21.0255 9.23213 20.9984C9.24302 20.9714 9.25886 20.9468 9.27892 20.9261C9.2989 20.9054 9.32267 20.889 9.34886 20.8778C9.37504 20.8666 9.40309 20.8608 9.43141 20.8608H11.1541C11.2113 20.8608 11.2661 20.8843 11.3066 20.9261C11.347 20.9679 11.3698 21.0246 11.3698 21.0837Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M13.7891 21.0837C13.7891 21.1428 13.7664 21.1995 13.7259 21.2413C13.6855 21.2831 13.6306 21.3066 13.5734 21.3066H11.8508C11.8224 21.3066 11.7944 21.3008 11.7682 21.2897C11.742 21.2784 11.7182 21.262 11.6983 21.2413C11.6782 21.2207 11.6624 21.1961 11.6515 21.169C11.6407 21.142 11.6351 21.113 11.6351 21.0837C11.6351 21.0545 11.6407 21.0255 11.6515 20.9984C11.6624 20.9714 11.6782 20.9468 11.6983 20.9261C11.7182 20.9054 11.742 20.889 11.7682 20.8778C11.7944 20.8666 11.8224 20.8608 11.8508 20.8608H13.5734C13.6306 20.8608 13.6855 20.8843 13.7259 20.9261C13.7664 20.9679 13.7891 21.0246 13.7891 21.0837Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M16.2009 21.0837C16.2009 21.1428 16.1782 21.1995 16.1377 21.2413C16.0973 21.2831 16.0424 21.3066 15.9852 21.3066H14.2625C14.2053 21.3066 14.1505 21.2831 14.11 21.2413C14.0696 21.1995 14.0468 21.1428 14.0468 21.0837C14.0468 21.0246 14.0696 20.9679 14.11 20.9261C14.1505 20.8843 14.2053 20.8608 14.2625 20.8608H15.9852C16.0424 20.8608 16.0973 20.8843 16.1377 20.9261C16.1782 20.9679 16.2009 21.0246 16.2009 21.0837Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M18.6174 21.0837C18.6174 21.1428 18.5947 21.1995 18.5542 21.2413C18.5138 21.2831 18.4589 21.3066 18.4017 21.3066H16.6791C16.6219 21.3066 16.567 21.2831 16.5266 21.2413C16.4861 21.1995 16.4634 21.1428 16.4634 21.0837C16.4634 21.0246 16.4861 20.9679 16.5266 20.9261C16.567 20.8843 16.6219 20.8608 16.6791 20.8608H18.4017C18.4589 20.8608 18.5138 20.8843 18.5542 20.9261C18.5947 20.9679 18.6174 21.0246 18.6174 21.0837Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M21.0334 21.0837C21.0334 21.1428 21.0106 21.1995 20.9702 21.2413C20.9297 21.2831 20.8749 21.3066 20.8177 21.3066H19.095C19.0667 21.3066 19.0386 21.3008 19.0125 21.2897C18.9863 21.2784 18.9625 21.262 18.9425 21.2413C18.9225 21.2207 18.9066 21.1961 18.8957 21.169C18.8849 21.142 18.8793 21.113 18.8793 21.0837C18.8793 21.0545 18.8849 21.0255 18.8957 20.9984C18.9066 20.9714 18.9225 20.9468 18.9425 20.9261C18.9625 20.9054 18.9863 20.889 19.0125 20.8778C19.0386 20.8666 19.0667 20.8608 19.095 20.8608H20.8177C20.8749 20.8608 20.9297 20.8843 20.9702 20.9261C21.0106 20.9679 21.0334 21.0246 21.0334 21.0837Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M23.4485 21.0837C23.4485 21.1428 23.4258 21.1995 23.3853 21.2413C23.3449 21.2831 23.29 21.3066 23.2328 21.3066H21.5101C21.4818 21.3066 21.4538 21.3008 21.4276 21.2897C21.4014 21.2784 21.3776 21.262 21.3577 21.2413C21.3376 21.2207 21.3217 21.1961 21.3109 21.169C21.3 21.142 21.2945 21.113 21.2945 21.0837C21.2945 21.0545 21.3 21.0255 21.3109 20.9984C21.3217 20.9714 21.3376 20.9468 21.3577 20.9261C21.3776 20.9054 21.4014 20.889 21.4276 20.8778C21.4538 20.8666 21.4818 20.8608 21.5101 20.8608H23.2328C23.29 20.8608 23.3449 20.8843 23.3853 20.9261C23.4258 20.9679 23.4485 21.0246 23.4485 21.0837Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M25.8645 21.0837C25.8645 21.113 25.8589 21.142 25.8481 21.169C25.8372 21.1961 25.8214 21.2207 25.8013 21.2413C25.7813 21.262 25.7575 21.2784 25.7314 21.2897C25.7052 21.3008 25.6771 21.3066 25.6488 21.3066H23.9261C23.8978 21.3066 23.8698 21.3008 23.8436 21.2897C23.8174 21.2784 23.7936 21.262 23.7736 21.2413C23.7536 21.2207 23.7377 21.1961 23.7268 21.169C23.716 21.142 23.7104 21.113 23.7104 21.0837C23.7104 21.0545 23.716 21.0255 23.7268 20.9984C23.7377 20.9714 23.7536 20.9468 23.7736 20.9261C23.7936 20.9054 23.8174 20.889 23.8436 20.8778C23.8698 20.8666 23.8978 20.8608 23.9261 20.8608H25.6488C25.6771 20.8608 25.7052 20.8666 25.7314 20.8778C25.7575 20.889 25.7813 20.9054 25.8013 20.9261C25.8214 20.9468 25.8372 20.9714 25.8481 20.9984C25.8589 21.0255 25.8645 21.0545 25.8645 21.0837Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M28.2803 21.0837C28.2803 21.1428 28.2576 21.1995 28.2171 21.2413C28.1767 21.2831 28.1218 21.3066 28.0646 21.3066H26.342C26.2848 21.3066 26.2299 21.2831 26.1895 21.2413C26.149 21.1995 26.1263 21.1428 26.1263 21.0837C26.1263 21.0246 26.149 20.9679 26.1895 20.9261C26.2299 20.8843 26.2848 20.8608 26.342 20.8608H28.0646C28.1218 20.8608 28.1767 20.8843 28.2171 20.9261C28.2576 20.9679 28.2803 21.0246 28.2803 21.0837Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M30.6963 21.0837C30.6963 21.1428 30.6735 21.1995 30.6331 21.2413C30.5926 21.2831 30.5378 21.3066 30.4806 21.3066H28.7579C28.7007 21.3066 28.6459 21.2831 28.6054 21.2413C28.565 21.1995 28.5422 21.1428 28.5422 21.0837C28.5422 21.0246 28.565 20.9679 28.6054 20.9261C28.6459 20.8843 28.7007 20.8608 28.7579 20.8608H30.4806C30.5378 20.8608 30.5926 20.8843 30.6331 20.9261C30.6735 20.9679 30.6963 21.0246 30.6963 21.0837Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M33.1121 21.0837C33.1121 21.1428 33.0894 21.1995 33.0489 21.2413C33.0085 21.2831 32.9536 21.3066 32.8964 21.3066H31.1738C31.1455 21.3066 31.1174 21.3008 31.0912 21.2897C31.065 21.2784 31.0413 21.262 31.0213 21.2413C31.0012 21.2207 30.9854 21.1961 30.9745 21.169C30.9637 21.142 30.9581 21.113 30.9581 21.0837C30.9581 21.0545 30.9637 21.0255 30.9745 20.9984C30.9854 20.9714 31.0012 20.9468 31.0213 20.9261C31.0413 20.9054 31.065 20.889 31.0912 20.8778C31.1174 20.8666 31.1455 20.8608 31.1738 20.8608H32.8964C32.9536 20.8608 33.0085 20.8843 33.0489 20.9261C33.0894 20.9679 33.1121 21.0246 33.1121 21.0837Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M35.5066 21.2539C35.4824 21.306 35.4411 21.3475 35.3902 21.3714C35.368 21.3837 35.3437 21.3914 35.3186 21.394C35.2935 21.3965 35.2682 21.394 35.2441 21.3863L35.1835 21.3707C35.1297 21.3568 35.0752 21.3465 35.0202 21.3401C34.9857 21.3401 34.9512 21.323 34.9092 21.3208C34.8672 21.3187 34.8155 21.3066 34.7666 21.3066H33.5876C33.5304 21.3066 33.4755 21.2831 33.4351 21.2413C33.3946 21.1995 33.3719 21.1428 33.3719 21.0837C33.3719 21.0246 33.3946 20.9679 33.4351 20.9261C33.4755 20.8843 33.5304 20.8608 33.5876 20.8608H34.7666C34.8183 20.8608 34.863 20.8729 34.9147 20.8751C34.9664 20.8772 35.0181 20.8872 35.0643 20.89C35.1388 20.8998 35.2128 20.9145 35.2855 20.9342C35.3378 20.9484 35.3681 20.9584 35.3681 20.9584C35.4278 20.9785 35.4774 21.0223 35.506 21.0802C35.5182 21.1074 35.5246 21.137 35.5246 21.167C35.5246 21.197 35.5182 21.2267 35.506 21.2539"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M36.3302 23.4159C36.273 23.4159 36.2182 23.3924 36.1777 23.3506C36.1373 23.3088 36.1145 23.2522 36.1145 23.1931V22.6291C36.1145 22.6013 36.1145 22.5785 36.1145 22.5579C36.1145 22.5372 36.1145 22.5116 36.1145 22.4867C36.1145 22.4404 36.1014 22.3941 36.0959 22.3443C36.0625 22.1739 35.9954 22.0124 35.8988 21.87L35.843 21.7917L35.7941 21.7369L35.7631 21.7005L35.7507 21.6892C35.7139 21.6513 35.6929 21.6003 35.6921 21.5467C35.688 21.4887 35.7036 21.4311 35.7362 21.3837C35.7528 21.3594 35.7744 21.3392 35.7994 21.3246C35.8244 21.3099 35.8522 21.3011 35.8809 21.2989C35.9126 21.2979 35.9442 21.3037 35.9736 21.316C36.003 21.3282 36.0296 21.3467 36.0518 21.3701L36.0683 21.3858L36.1104 21.4342L36.1793 21.509L36.2551 21.6144C36.3858 21.8068 36.4768 22.025 36.5225 22.2553C36.5307 22.3186 36.5438 22.3813 36.5473 22.444C36.5473 22.476 36.5473 22.5066 36.5521 22.5379C36.5569 22.5693 36.5521 22.5992 36.5521 22.6241V23.1881C36.5521 23.2472 36.5293 23.3038 36.4889 23.3456C36.4484 23.3874 36.3936 23.4109 36.3364 23.4109"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M36.3301 25.9115C36.2731 25.9115 36.2183 25.8881 36.1778 25.8465C36.1375 25.8048 36.1146 25.7483 36.1144 25.6893V23.9092C36.1144 23.8501 36.1372 23.7934 36.1776 23.7516C36.2181 23.7098 36.2729 23.6863 36.3301 23.6863C36.3873 23.6863 36.4422 23.7098 36.4826 23.7516C36.5231 23.7934 36.5458 23.8501 36.5458 23.9092V25.6893C36.5456 25.7483 36.5228 25.8048 36.4824 25.8465C36.442 25.8881 36.3872 25.9115 36.3301 25.9115Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M36.3301 28.4083C36.2729 28.4083 36.2181 28.3848 36.1776 28.343C36.1372 28.3012 36.1144 28.2445 36.1144 28.1854V26.4053C36.1144 26.3462 36.1372 26.2895 36.1776 26.2477C36.2181 26.2059 36.2729 26.1824 36.3301 26.1824C36.3873 26.1824 36.4422 26.2059 36.4826 26.2477C36.5231 26.2895 36.5458 26.3462 36.5458 26.4053V28.1854C36.5458 28.2147 36.5402 28.2437 36.5294 28.2707C36.5185 28.2977 36.5027 28.3223 36.4826 28.343C36.4626 28.3637 36.4388 28.3801 36.4127 28.3914C36.3865 28.4026 36.3584 28.4083 36.3301 28.4083Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M36.3301 30.9047C36.2729 30.9047 36.2181 30.8812 36.1776 30.8394C36.1372 30.7976 36.1144 30.7409 36.1144 30.6818V28.9016C36.1144 28.8425 36.1372 28.7858 36.1776 28.744C36.2181 28.7022 36.2729 28.6787 36.3301 28.6787C36.3873 28.6787 36.4422 28.7022 36.4826 28.744C36.5231 28.7858 36.5458 28.8425 36.5458 28.9016V30.6818C36.5458 30.711 36.5402 30.74 36.5294 30.7671C36.5185 30.7941 36.5027 30.8187 36.4826 30.8394C36.4626 30.8601 36.4388 30.8765 36.4127 30.8877C36.3865 30.8989 36.3584 30.9047 36.3301 30.9047Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M36.3301 33.4013C36.2729 33.4013 36.2181 33.3778 36.1776 33.336C36.1372 33.2942 36.1144 33.2375 36.1144 33.1784V31.3982C36.1144 31.3391 36.1372 31.2824 36.1776 31.2406C36.2181 31.1988 36.2729 31.1753 36.3301 31.1753C36.3873 31.1753 36.4422 31.1988 36.4826 31.2406C36.5231 31.2824 36.5458 31.3391 36.5458 31.3982V33.1784C36.5458 33.2077 36.5402 33.2366 36.5294 33.2637C36.5185 33.2907 36.5027 33.3153 36.4826 33.336C36.4626 33.3567 36.4388 33.3731 36.4127 33.3843C36.3865 33.3955 36.3584 33.4013 36.3301 33.4013Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M36.3301 35.8975C36.2729 35.8975 36.2181 35.8741 36.1776 35.8323C36.1372 35.7905 36.1144 35.7338 36.1144 35.6747V33.8945C36.1144 33.8354 36.1372 33.7787 36.1776 33.7369C36.2181 33.6951 36.2729 33.6716 36.3301 33.6716C36.3873 33.6716 36.4422 33.6951 36.4826 33.7369C36.5231 33.7787 36.5458 33.8354 36.5458 33.8945V35.6747C36.5458 35.7039 36.5402 35.7329 36.5294 35.76C36.5185 35.787 36.5027 35.8115 36.4826 35.8323C36.4626 35.853 36.4388 35.8694 36.4127 35.8806C36.3865 35.8918 36.3584 35.8975 36.3301 35.8975Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M36.3301 38.3937C36.2731 38.3937 36.2183 38.3703 36.1778 38.3287C36.1375 38.287 36.1146 38.2305 36.1144 38.1715V36.3913C36.1144 36.3322 36.1372 36.2756 36.1776 36.2338C36.2181 36.192 36.2729 36.1685 36.3301 36.1685C36.3873 36.1685 36.4422 36.192 36.4826 36.2338C36.5231 36.2756 36.5458 36.3322 36.5458 36.3913V38.1715C36.5456 38.2305 36.5228 38.287 36.4824 38.3287C36.442 38.3703 36.3872 38.3937 36.3301 38.3937Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M36.3301 40.8902C36.2729 40.8902 36.2181 40.8667 36.1776 40.825C36.1372 40.7832 36.1144 40.7265 36.1144 40.6674V38.8872C36.1144 38.8281 36.1372 38.7713 36.1776 38.7295C36.2181 38.6877 36.2729 38.6643 36.3301 38.6643C36.3873 38.6643 36.4422 38.6877 36.4826 38.7295C36.5231 38.7713 36.5458 38.8281 36.5458 38.8872V40.6674C36.5458 40.6966 36.5402 40.7256 36.5294 40.7527C36.5185 40.7797 36.5027 40.8042 36.4826 40.825C36.4626 40.8457 36.4388 40.862 36.4127 40.8732C36.3865 40.8845 36.3584 40.8902 36.3301 40.8902Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M36.3301 43.3866C36.2729 43.3866 36.2181 43.3631 36.1776 43.3213C36.1372 43.2795 36.1144 43.2228 36.1144 43.1637V41.3835C36.1144 41.3244 36.1372 41.2677 36.1776 41.2259C36.2181 41.1841 36.2729 41.1606 36.3301 41.1606C36.3873 41.1606 36.4422 41.1841 36.4826 41.2259C36.5231 41.2677 36.5458 41.3244 36.5458 41.3835V43.1637C36.5458 43.193 36.5402 43.222 36.5294 43.249C36.5185 43.276 36.5027 43.3006 36.4826 43.3213C36.4626 43.342 36.4388 43.3584 36.4127 43.3696C36.3865 43.3808 36.3584 43.3866 36.3301 43.3866Z"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M38.1266 30.3635H31.2999C30.6329 30.3635 29.9931 30.6373 29.5215 31.1248C29.0497 31.6122 28.7848 32.2733 28.7848 32.9626C28.7848 33.6519 29.0497 34.313 29.5215 34.8004C29.9931 35.2878 30.6329 35.5617 31.2999 35.5617H38.1266C38.2193 35.5647 38.3116 35.5486 38.3982 35.5143C38.4848 35.4799 38.5639 35.4281 38.6308 35.3618C38.6977 35.2954 38.7512 35.216 38.788 35.128C38.8249 35.0401 38.8443 34.9455 38.8453 34.8496V31.1347C38.8462 30.935 38.7716 30.7427 38.6374 30.599C38.5031 30.4554 38.3198 30.3716 38.1266 30.3657"
                                                                    fill="#6ABE59"
                                                                />
                                                                <path
                                                                    d="M38.3319 30.737C38.3321 30.7764 38.3473 30.8141 38.3743 30.842C38.4012 30.8698 38.4378 30.8856 38.4759 30.8858H38.8122C38.7713 30.7773 38.7128 30.6769 38.6392 30.5889H38.4759C38.4378 30.5889 38.4013 30.6045 38.3744 30.6322C38.3473 30.6599 38.3321 30.6976 38.3319 30.737Z"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <path
                                                                    d="M38.0349 30.5885H36.8849C36.8652 30.5871 36.8454 30.5898 36.8268 30.5967C36.8082 30.6035 36.7911 30.6142 36.7767 30.6282C36.7622 30.642 36.7507 30.6589 36.7428 30.6776C36.7349 30.6964 36.7309 30.7165 36.7309 30.737C36.7309 30.7574 36.7349 30.7776 36.7428 30.7963C36.7507 30.815 36.7622 30.8318 36.7767 30.8458C36.7911 30.8597 36.8082 30.8704 36.8268 30.8772C36.8454 30.8841 36.8652 30.8869 36.8849 30.8854H38.0349C38.0713 30.8828 38.1054 30.8661 38.1303 30.8385C38.1552 30.8109 38.169 30.7746 38.169 30.737C38.169 30.6993 38.1552 30.663 38.1303 30.6354C38.1054 30.6079 38.0713 30.5911 38.0349 30.5885Z"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <path
                                                                    d="M36.4439 30.5889H35.2938C35.2574 30.5914 35.2233 30.6082 35.1984 30.6358C35.1735 30.6633 35.1598 30.6997 35.1598 30.7373C35.1598 30.775 35.1735 30.8113 35.1984 30.8389C35.2233 30.8664 35.2574 30.8832 35.2938 30.8858H36.4439C36.4802 30.8832 36.5143 30.8664 36.5392 30.8389C36.5641 30.8113 36.5779 30.775 36.5779 30.7373C36.5779 30.6997 36.5641 30.6633 36.5392 30.6358C36.5143 30.6082 36.4802 30.5914 36.4439 30.5889Z"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <path
                                                                    d="M34.8528 30.5885H33.7034C33.6837 30.5871 33.6639 30.5898 33.6453 30.5967C33.6267 30.6035 33.6096 30.6142 33.5952 30.6282C33.5807 30.642 33.5692 30.6589 33.5614 30.6776C33.5534 30.6964 33.5494 30.7165 33.5494 30.737C33.5494 30.7574 33.5534 30.7776 33.5614 30.7963C33.5692 30.815 33.5807 30.8318 33.5952 30.8458C33.6096 30.8597 33.6267 30.8704 33.6453 30.8772C33.6639 30.8841 33.6837 30.8869 33.7034 30.8854H34.8528C34.8725 30.8869 34.8922 30.8841 34.9108 30.8772C34.9295 30.8704 34.9465 30.8597 34.9609 30.8458C34.9754 30.8318 34.9869 30.815 34.9948 30.7963C35.0026 30.7776 35.0067 30.7574 35.0067 30.737C35.0067 30.7165 35.0026 30.6964 34.9948 30.6776C34.9869 30.6589 34.9754 30.642 34.9609 30.6282C34.9465 30.6142 34.9295 30.6035 34.9108 30.5967C34.8922 30.5898 34.8725 30.5871 34.8528 30.5885Z"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <path
                                                                    d="M33.2624 30.5885H32.1123C32.0926 30.5871 32.0728 30.5898 32.0542 30.5967C32.0356 30.6035 32.0185 30.6142 32.0041 30.6282C31.9897 30.642 31.9782 30.6589 31.9703 30.6776C31.9624 30.6964 31.9584 30.7165 31.9584 30.737C31.9584 30.7574 31.9624 30.7776 31.9703 30.7963C31.9782 30.815 31.9897 30.8318 32.0041 30.8458C32.0185 30.8597 32.0356 30.8704 32.0542 30.8772C32.0728 30.8841 32.0926 30.8869 32.1123 30.8854H33.2624C33.2988 30.8828 33.3329 30.8661 33.3577 30.8385C33.3826 30.8109 33.3965 30.7746 33.3965 30.737C33.3965 30.6993 33.3826 30.663 33.3577 30.6354C33.3329 30.6079 33.2988 30.5911 33.2624 30.5885Z"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <path
                                                                    d="M31.6713 30.5889H31.3075C31.2386 30.5889 31.1593 30.6095 31.0835 30.6131C31.0077 30.6166 30.9319 30.6423 30.8603 30.653C30.7886 30.6636 30.7225 30.6907 30.6694 30.7042C30.6245 30.7163 30.5806 30.7314 30.5378 30.7498L30.4882 30.7697C30.4696 30.776 30.4525 30.7863 30.4381 30.7999C30.4237 30.8135 30.4122 30.83 30.4044 30.8486C30.3967 30.8671 30.3929 30.8871 30.3931 30.9072C30.3934 30.9274 30.3979 30.9473 30.4062 30.9656C30.4217 31.0001 30.4489 31.0275 30.4827 31.0427C30.5164 31.0579 30.5544 31.0598 30.5895 31.0482L30.6329 31.0318C30.6704 31.0159 30.7092 31.0031 30.7486 30.9933C30.7976 30.9812 30.8534 30.9634 30.9154 30.9513C30.9774 30.9392 31.0436 30.9164 31.1097 30.9086C31.1759 30.9008 31.2475 30.8858 31.3075 30.8858H31.6713C31.7077 30.8832 31.7417 30.8664 31.7667 30.8389C31.7916 30.8113 31.8054 30.775 31.8054 30.7373C31.8054 30.6997 31.7916 30.6633 31.7667 30.6358C31.7417 30.6082 31.7077 30.5914 31.6713 30.5889Z"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <path
                                                                    d="M30.0678 30.9863L30.023 31.0148C29.9948 31.0341 29.9576 31.0647 29.9114 31.1003L29.837 31.1572C29.8128 31.1807 29.7867 31.2042 29.7605 31.2284L29.6785 31.3061C29.6523 31.3338 29.6268 31.3637 29.6013 31.3929L29.5241 31.4805L29.4552 31.5717L29.3932 31.6578L29.3443 31.7397C29.3147 31.7903 29.2892 31.8323 29.2754 31.8622L29.2519 31.9113C29.2424 31.929 29.2366 31.9485 29.235 31.9686C29.2333 31.9888 29.2358 32.0091 29.2424 32.0282C29.2488 32.0472 29.2592 32.0646 29.2728 32.0792C29.2863 32.0938 29.3027 32.1053 29.3209 32.1128C29.3548 32.1284 29.3932 32.1304 29.4284 32.118C29.4637 32.1058 29.4932 32.0803 29.511 32.0466C29.511 32.0466 29.5179 32.031 29.531 32.0039C29.5441 31.9768 29.5675 31.9405 29.5937 31.8964L29.6358 31.8252L29.6902 31.754L29.7481 31.6735L29.817 31.5966C29.8397 31.5717 29.8625 31.546 29.8859 31.5204L29.9548 31.4535L30.0237 31.3901L30.0885 31.3402C30.1291 31.3089 30.1615 31.2819 30.1863 31.269L30.2256 31.2441C30.2564 31.2225 30.2782 31.1896 30.2866 31.1522C30.295 31.1147 30.2895 31.0754 30.2711 31.0419C30.2618 31.0243 30.249 31.009 30.2336 30.9969C30.2182 30.9848 30.2005 30.9761 30.1816 30.9715C30.1628 30.967 30.1432 30.9665 30.1242 30.9703C30.1052 30.9741 30.0871 30.982 30.0713 30.9935"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <path
                                                                    d="M29.3621 33.5387L29.3511 33.4924C29.3394 33.4522 29.3304 33.4113 29.3242 33.3699C29.3174 33.3186 29.307 33.2588 29.2994 33.1947C29.2919 33.1306 29.2925 33.0601 29.2891 32.9911C29.2857 32.922 29.296 32.8522 29.2994 32.7874C29.3029 32.7226 29.3174 32.6635 29.3242 32.6115C29.3305 32.5704 29.3395 32.5297 29.3511 32.4898C29.358 32.4599 29.3621 32.4435 29.3621 32.4435C29.3705 32.4063 29.3652 32.3674 29.3475 32.334C29.3296 32.3006 29.3005 32.2752 29.2657 32.2626C29.2473 32.2559 29.2278 32.2532 29.2084 32.2549C29.189 32.2565 29.1702 32.2623 29.1531 32.272C29.1361 32.2817 29.1212 32.295 29.1095 32.311C29.0977 32.3271 29.0895 32.3456 29.0851 32.3652L29.072 32.4179C29.0592 32.4646 29.0491 32.5122 29.0417 32.5603C29.0335 32.6187 29.0217 32.687 29.0135 32.7611C29.0052 32.8351 29.0059 32.9142 29.0018 32.9932C28.9976 33.0722 29.0093 33.1513 29.0135 33.2253C29.0176 33.2994 29.0335 33.3678 29.0417 33.4261C29.0491 33.4742 29.0592 33.5217 29.072 33.5686L29.0851 33.6213C29.0895 33.6408 29.0977 33.6593 29.1095 33.6754C29.1212 33.6914 29.1361 33.7047 29.1531 33.7144C29.1702 33.7241 29.189 33.7299 29.2084 33.7316C29.2278 33.7332 29.2473 33.7306 29.2657 33.7238C29.3005 33.7113 29.3296 33.6858 29.3475 33.6524C29.3652 33.619 29.3705 33.58 29.3621 33.5429"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <path
                                                                    d="M30.2222 34.7452L30.183 34.7202C30.1582 34.7031 30.1258 34.6761 30.0851 34.649L30.0162 34.5992C29.9955 34.5785 29.9728 34.5579 29.9473 34.5358C29.9218 34.5137 29.8997 34.4917 29.8784 34.4682L29.8095 34.392L29.7406 34.3158C29.7213 34.288 29.7013 34.2617 29.6827 34.2353C29.6641 34.209 29.6455 34.1841 29.6283 34.1606L29.5862 34.0894C29.56 34.0452 29.5387 34.0082 29.5235 33.9818C29.5084 33.9555 29.5035 33.9391 29.5035 33.9391C29.4857 33.9054 29.4562 33.8799 29.4209 33.8676C29.3857 33.8554 29.3473 33.8572 29.3133 33.8729C29.2952 33.8804 29.2788 33.8919 29.2652 33.9065C29.2517 33.9211 29.2413 33.9385 29.2349 33.9576C29.2283 33.9766 29.2258 33.9969 29.2275 34.0171C29.2291 34.0372 29.2349 34.0567 29.2444 34.0744C29.2444 34.0744 29.2527 34.0922 29.2679 34.1228C29.283 34.1534 29.3092 34.194 29.3368 34.246L29.3857 34.3279L29.4477 34.4133L29.5166 34.5052L29.5931 34.5928C29.6193 34.622 29.6448 34.6519 29.671 34.6797L29.753 34.7566L29.8295 34.8278L29.9039 34.8854C29.9501 34.921 29.9873 34.9517 30.0155 34.9709L30.0603 34.9987C30.0762 35.0101 30.0941 35.018 30.1131 35.0219C30.1321 35.0257 30.1517 35.0254 30.1705 35.0209C30.1894 35.0164 30.2071 35.0078 30.2225 34.9957C30.2379 34.9837 30.2508 34.9685 30.2601 34.9509C30.2785 34.9175 30.284 34.8781 30.2756 34.8406C30.2672 34.8032 30.2455 34.7704 30.2147 34.7487"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <path
                                                                    d="M31.6713 35.0433H31.3075C31.2448 35.0433 31.1772 35.0504 31.1097 35.0433C31.0422 35.0362 30.9774 35.0298 30.9154 35.0213C30.8534 35.0127 30.7976 34.9942 30.7486 34.9821C30.7092 34.9727 30.6705 34.9603 30.6329 34.9451L30.5895 34.9301C30.5545 34.9182 30.5163 34.9201 30.4826 34.9353C30.4487 34.9505 30.4216 34.9781 30.4062 35.0127C30.3979 35.0309 30.3934 35.0508 30.3931 35.071C30.3929 35.0912 30.3967 35.1112 30.4044 35.1297C30.4122 35.1482 30.4237 35.1648 30.4381 35.1784C30.4525 35.192 30.4696 35.2023 30.4882 35.2085L30.5378 35.227C30.5806 35.2448 30.6246 35.2595 30.6694 35.2712C30.7252 35.2847 30.79 35.3054 30.8603 35.3189C30.9305 35.3324 31.007 35.331 31.0835 35.3388C31.16 35.3467 31.2358 35.3388 31.3075 35.3388H31.6713C31.7095 35.3388 31.7461 35.3232 31.7731 35.2953C31.8002 35.2673 31.8153 35.2295 31.8153 35.19C31.8153 35.1506 31.8002 35.1127 31.7731 35.0848C31.7461 35.0569 31.7095 35.0412 31.6713 35.0412"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <path
                                                                    d="M33.2624 35.0435H32.1124C32.0742 35.0435 32.0375 35.0591 32.0105 35.087C31.9835 35.1149 31.9684 35.1528 31.9684 35.1923C31.9684 35.2317 31.9835 35.2696 32.0105 35.2975C32.0375 35.3254 32.0742 35.3411 32.1124 35.3411H33.2624C33.3006 35.3411 33.3373 35.3254 33.3643 35.2975C33.3913 35.2696 33.4065 35.2317 33.4065 35.1923C33.4065 35.1528 33.3913 35.1149 33.3643 35.087C33.3373 35.0591 33.3006 35.0435 33.2624 35.0435Z"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <path
                                                                    d="M34.8528 35.0435H33.7034C33.6845 35.0435 33.6658 35.0473 33.6482 35.0548C33.6308 35.0623 33.6149 35.0732 33.6015 35.087C33.5882 35.1009 33.5775 35.1173 33.5703 35.1353C33.5631 35.1534 33.5594 35.1727 33.5594 35.1923C33.5594 35.2118 33.5631 35.2312 33.5703 35.2492C33.5775 35.2673 33.5882 35.2837 33.6015 35.2975C33.6149 35.3113 33.6308 35.3223 33.6482 35.3298C33.6658 35.3373 33.6845 35.3411 33.7034 35.3411H34.8528C34.8909 35.3411 34.9276 35.3254 34.9546 35.2975C34.9816 35.2696 34.9968 35.2317 34.9968 35.1923C34.9968 35.1528 34.9816 35.1149 34.9546 35.087C34.9276 35.0591 34.8909 35.0435 34.8528 35.0435Z"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <path
                                                                    d="M36.4439 35.0435H35.2938C35.2556 35.0435 35.219 35.0591 35.192 35.087C35.1649 35.1149 35.1498 35.1528 35.1498 35.1923C35.1498 35.2317 35.1649 35.2696 35.192 35.2975C35.219 35.3254 35.2556 35.3411 35.2938 35.3411H36.4439C36.4821 35.3411 36.5187 35.3254 36.5457 35.2975C36.5727 35.2696 36.5879 35.2317 36.5879 35.1923C36.5879 35.1528 36.5727 35.1149 36.5457 35.087C36.5187 35.0591 36.4821 35.0435 36.4439 35.0435Z"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <path
                                                                    d="M38.0349 35.0435H36.8849C36.8467 35.0435 36.81 35.0591 36.783 35.087C36.756 35.1149 36.7408 35.1528 36.7408 35.1923C36.7408 35.2317 36.756 35.2696 36.783 35.2975C36.81 35.3254 36.8467 35.3411 36.8849 35.3411H38.0349C38.0731 35.3411 38.1098 35.3254 38.1368 35.2975C38.1638 35.2696 38.1789 35.2317 38.1789 35.1923C38.1789 35.1528 38.1638 35.1149 38.1368 35.087C38.1098 35.0591 38.0731 35.0435 38.0349 35.0435Z"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <path
                                                                    d="M38.3319 35.1923C38.3321 35.2317 38.3473 35.2695 38.3743 35.2973C38.4012 35.3252 38.4378 35.3409 38.4759 35.3411H38.6392C38.7275 35.2647 38.7884 35.1599 38.8122 35.0435H38.4759C38.4378 35.0437 38.4012 35.0594 38.3743 35.0872C38.3473 35.1151 38.3321 35.1528 38.3319 35.1923Z"
                                                                    fill="#2F6C5D"
                                                                />
                                                                <path
                                                                    d="M32.3776 32.965C32.3776 33.1853 32.3144 33.4006 32.196 33.5837C32.0776 33.7669 31.9093 33.9096 31.7123 33.9939C31.5154 34.0782 31.2987 34.1003 31.0897 34.0573C30.8806 34.0143 30.6885 33.9082 30.5378 33.7525C30.3871 33.5968 30.2845 33.3983 30.2428 33.1823C30.2013 32.9662 30.2227 32.7423 30.3042 32.5388C30.3858 32.3353 30.5239 32.1614 30.7012 32.039C30.8784 31.9166 31.0868 31.8513 31.2999 31.8513C31.5857 31.8513 31.8599 31.9687 32.062 32.1775C32.2641 32.3864 32.3776 32.6696 32.3776 32.965Z"
                                                                    fill="#194041"
                                                                />
                                                                <path
                                                                    d="M31.7857 31.9712C31.9845 32.1481 32.1138 32.3941 32.1495 32.6627C32.1851 32.9313 32.1246 33.2041 31.9793 33.4299C31.8339 33.6556 31.6138 33.8187 31.3603 33.8885C31.1068 33.9584 30.8373 33.9301 30.6025 33.8091C30.7182 33.9118 30.8536 33.9881 30.9999 34.0327C31.1461 34.0774 31.2999 34.0894 31.451 34.068C31.6021 34.0467 31.7471 33.9924 31.8764 33.9088C32.0056 33.8252 32.1162 33.7141 32.2009 33.583C32.2855 33.4519 32.3423 33.3038 32.3673 33.1483C32.3924 32.9929 32.3853 32.8337 32.3463 32.6813C32.3074 32.5289 32.2376 32.3868 32.1415 32.2644C32.0455 32.1419 31.9254 32.042 31.7891 31.9712"
                                                                    fill="#194041"
                                                                />
                                                                <path
                                                                    d="M10.3472 8.59455C10.3472 9.65205 10.0437 10.6858 9.47513 11.565C8.9065 12.4442 8.09842 13.1295 7.15295 13.5341C6.20747 13.9386 5.16714 14.0443 4.16351 13.8379C3.15987 13.6315 2.23803 13.1221 1.51458 12.3742C0.791124 11.6263 0.29855 10.6735 0.0991596 9.63625C-0.10023 8.59904 0.00251719 7.52402 0.39441 6.54714C0.786301 5.57028 1.44974 4.73545 2.3008 4.14826C3.15186 3.56106 4.15232 3.24786 5.17565 3.24829C6.54776 3.24829 7.86366 3.81156 8.83394 4.81417C9.80416 5.81679 10.3492 7.1766 10.3492 8.59455"
                                                                    fill="#FECD10"
                                                                />
                                                                <path
                                                                    d="M9.16472 8.59481C9.16472 9.41063 8.93057 10.2081 8.49197 10.8864C8.05331 11.5647 7.42983 12.0933 6.70045 12.4054C5.97105 12.7175 5.16846 12.799 4.3942 12.6397C3.61994 12.4804 2.9088 12.0874 2.35071 11.5104C1.79262 10.9334 1.41266 10.1983 1.2589 9.3981C1.10514 8.59794 1.18447 7.76859 1.48686 7.015C1.78927 6.26141 2.30114 5.61743 2.95774 5.1645C3.61436 4.71157 4.3862 4.47004 5.17566 4.47046C6.23418 4.47046 7.24936 4.90499 7.99784 5.67845C8.74631 6.45191 9.16679 7.50092 9.16679 8.59481"
                                                                    fill="#FECD10"
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M1.32181 7.65457C0.820013 9.85153 2.13673 12.0529 4.26276 12.5714C6.38879 13.09 8.51907 11.7293 9.02085 9.53238C9.52264 7.33534 8.20595 5.13399 6.0799 4.61545C3.95387 4.09691 1.82359 5.45757 1.32181 7.65457ZM4.2463 12.6436C2.08175 12.1156 0.741176 9.87431 1.25206 7.63755C1.76294 5.40075 3.93181 4.01544 6.09636 4.54337C8.26094 5.0713 9.60147 7.31256 9.09059 9.54939C8.57971 11.7862 6.41085 13.1715 4.2463 12.6436Z"
                                                                    fill="#E56E25"
                                                                />
                                                                <path
                                                                    d="M1.53738 8.96145C1.53732 8.16784 1.75886 7.39111 2.1754 6.72443C2.59195 6.05774 3.1858 5.52941 3.88571 5.20285C4.58561 4.87629 5.36184 4.76536 6.12124 4.88337C6.88065 5.00139 7.59098 5.34333 8.16697 5.86818C7.80652 5.44501 7.36599 5.10268 6.87252 4.86234C6.37906 4.62201 5.84315 4.48876 5.29789 4.47084C4.75264 4.45291 4.20961 4.55069 3.70236 4.75813C3.19511 4.96557 2.73439 5.27827 2.34867 5.67692C1.96294 6.07556 1.6604 6.55169 1.45972 7.0759C1.25904 7.60011 1.16449 8.16129 1.1819 8.72468C1.19932 9.28815 1.32832 9.84193 1.56096 10.3518C1.79359 10.8618 2.12491 11.317 2.53446 11.6894C1.89061 10.9369 1.5359 9.96661 1.53738 8.96216"
                                                                    fill="#F9A01E"
                                                                />
                                                                <path
                                                                    d="M3.01127 4.41894L2.71497 3.88916C2.62814 3.93758 2.54339 3.98885 2.45932 4.04226L2.75493 4.57204C2.839 4.51792 2.92376 4.46665 3.01127 4.41894Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M0.591224 8.56765C0.591224 8.51638 0.591224 8.49074 0.591224 8.41455H0C0 8.49074 0 8.51638 0 8.56765C0 8.61892 0 8.72004 0 8.72004H0.591224C0.591224 8.72004 0.591224 8.61821 0.591224 8.56765Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M2.34284 4.87116L1.96247 4.40332C1.88529 4.46669 1.80949 4.53221 1.73645 4.59986L2.11613 5.06839C2.18986 4.99719 2.26497 4.93453 2.34284 4.87116Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M0.687673 7.62221L0.104714 7.51611C0.08542 7.6158 0.0688834 7.71621 0.0544128 7.81732L0.636683 7.92342C0.651153 7.82231 0.66769 7.7219 0.687673 7.62221Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M0.919251 6.8324L0.363164 6.62305C0.326642 6.71704 0.294258 6.81317 0.261871 6.90788L0.817957 7.11723C0.848965 7.01967 0.88273 6.92425 0.919251 6.8324Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M4.52376 3.90735L4.42109 3.30493C4.32255 3.31989 4.22539 3.33697 4.12961 3.35763L4.23228 3.96004C4.32806 3.93939 4.42522 3.92159 4.52376 3.90735Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M1.28033 6.09623L0.765586 5.79004C0.713905 5.87691 0.664289 5.96521 0.617432 6.05493L1.12942 6.36041C1.17628 6.27069 1.22589 6.18239 1.27757 6.09623"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M1.75988 5.43603L1.30716 5.04297C1.24146 5.11893 1.17807 5.19678 1.11697 5.27653L1.5697 5.66959C1.63079 5.58936 1.69418 5.51151 1.75988 5.43603Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M3.74586 4.09462L3.54327 3.51855C3.44955 3.5506 3.35653 3.58549 3.26764 3.62252L3.46954 4.19716C3.56119 4.15942 3.65352 4.12595 3.74517 4.0932"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M9.52851 7.11918L10.0846 6.90983C10.0536 6.81299 10.0198 6.71686 9.9833 6.625L9.42722 6.83435C9.46443 6.92834 9.49612 7.02376 9.52851 7.11918Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M9.21425 6.36041L9.72692 6.05493C9.67938 5.96521 9.63045 5.87691 9.57877 5.79004L9.0661 6.09623C9.11778 6.18239 9.16739 6.27069 9.21425 6.36041Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M8.77679 5.66959L9.23021 5.27653C9.16908 5.19678 9.10569 5.11893 9.04002 5.04297L8.58661 5.43603C8.65276 5.51151 8.71616 5.58936 8.77679 5.66959Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M5.17565 3.85948C5.22457 3.85948 5.27418 3.85948 5.32311 3.85948V3.2478C5.27418 3.2478 5.22457 3.2478 5.17565 3.2478C5.12672 3.2478 5.07642 3.2478 5.0275 3.2478V3.85948C5.07642 3.85948 5.12603 3.85948 5.17565 3.85948Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M9.70974 7.92342L10.292 7.81732C10.2782 7.71621 10.261 7.6158 10.2417 7.51611L9.65875 7.62221C9.67874 7.7219 9.69596 7.82231 9.70974 7.92342Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M8.23029 5.06816L8.61066 4.59961C8.53672 4.53173 8.46134 4.46622 8.38464 4.40308L8.00427 4.87162C8.08145 4.935 8.15725 5.00051 8.23029 5.06887"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M6.11416 3.96004L6.21683 3.35763C6.12105 3.33697 6.02389 3.31989 5.92604 3.30493L5.82336 3.90735C5.92121 3.92159 6.01838 3.93868 6.11416 3.96004Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M6.87902 4.19862L7.08161 3.62399C6.98996 3.58696 6.89763 3.55277 6.80598 3.52002L6.60339 4.09466C6.69711 4.12599 6.79013 4.16088 6.87902 4.19862Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M7.59152 4.57204L7.88714 4.04226C7.80376 3.98885 7.71831 3.93758 7.63149 3.88916L7.33588 4.41894C7.4227 4.46665 7.50815 4.51792 7.59152 4.57204Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M8.00427 12.3188L8.38464 12.7867C8.46182 12.7231 8.53713 12.6576 8.61066 12.5901L8.23029 12.1216C8.15725 12.1928 8.08145 12.2555 8.00427 12.3188Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M5.82336 13.2822L5.92604 13.8846C6.02389 13.8696 6.12105 13.8525 6.21683 13.8319L6.11416 13.2295C6.01838 13.2509 5.92121 13.2679 5.82336 13.2822Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M7.33588 12.7705L7.63149 13.3003C7.71831 13.2519 7.80376 13.2006 7.88714 13.1472L7.59152 12.6174C7.50815 12.6716 7.4227 12.7228 7.33588 12.7705Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M6.60135 13.0949L6.80394 13.6695C6.89765 13.6375 6.98999 13.6026 7.07957 13.5655L6.87905 12.9888C6.78809 13.0265 6.69506 13.06 6.60342 13.0927"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M8.58661 11.7536L9.04002 12.1467C9.10528 12.0707 9.16867 11.9928 9.23021 11.9131L8.77679 11.52C8.71616 11.6002 8.65276 11.6781 8.58661 11.7536Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M10.3437 8.41455H9.75177C9.75177 8.49074 9.75177 8.51638 9.75177 8.56765C9.75177 8.61892 9.75177 8.72004 9.75177 8.72004H10.3437C10.3437 8.72004 10.3437 8.61821 10.3437 8.56765C10.3437 8.51709 10.3437 8.49074 10.3437 8.41455Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M9.65875 9.57098L10.2417 9.67708C10.261 9.57739 10.2782 9.47699 10.292 9.37587L9.70974 9.26978C9.69596 9.37089 9.67874 9.47129 9.65875 9.57098Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M9.42722 10.3542L9.98399 10.5635C10.0198 10.4695 10.0529 10.3734 10.0846 10.2787L9.52851 10.0693C9.4975 10.1669 9.46443 10.2623 9.42722 10.3542Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M9.0661 11.0933L9.57877 11.3995C9.63045 11.3126 9.67938 11.2243 9.72692 11.1346L9.21425 10.8291C9.16739 10.9188 9.11778 11.0071 9.0661 11.0933Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M0.817957 10.0693L0.261871 10.283C0.293569 10.3798 0.326642 10.4759 0.363164 10.5678L0.919251 10.3584C0.88273 10.2644 0.850344 10.169 0.817957 10.0736"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M1.13216 10.8291L0.620178 11.1374C0.667035 11.2272 0.716649 11.3154 0.768329 11.4023L1.28031 11.0961C1.22863 11.01 1.17902 10.9217 1.13216 10.8319"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M5.17565 13.3298C5.12603 13.3298 5.07642 13.3298 5.0275 13.3298V13.9415C5.07642 13.9415 5.12603 13.9415 5.17565 13.9415C5.22526 13.9415 5.27418 13.9415 5.32311 13.9415V13.3298C5.27418 13.3298 5.22457 13.3298 5.17565 13.3298Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M2.11613 12.1216L1.73645 12.5901C1.80949 12.6613 1.88529 12.7233 1.96247 12.7867L2.34284 12.3188C2.26497 12.2555 2.18986 12.1899 2.11613 12.1216Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M0.636683 9.26636L0.0544128 9.37246C0.0688834 9.47357 0.08542 9.57397 0.104714 9.67367L0.687673 9.56757C0.66769 9.46787 0.651153 9.36747 0.636683 9.26636Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M1.5697 11.52L1.11697 11.9131C1.17761 11.9928 1.2417 12.0705 1.30716 12.1467L1.75988 11.7543C1.69442 11.6781 1.63033 11.6005 1.5697 11.52Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M4.23228 13.2295L4.12961 13.8319C4.22539 13.8525 4.32255 13.8696 4.42109 13.8846L4.52376 13.2822C4.42522 13.2679 4.32806 13.2509 4.23228 13.2295Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M2.75493 12.6174L2.45932 13.1472C2.54339 13.2006 2.62814 13.2519 2.71497 13.3003L3.01127 12.7705C2.92376 12.7228 2.839 12.6716 2.75493 12.6174Z"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M3.46743 12.9888L3.26553 13.5634C3.35649 13.6004 3.44952 13.6346 3.54116 13.6674L3.74375 13.0927C3.64935 13.0614 3.55701 13.0265 3.46812 12.9888"
                                                                    fill="#FFB300"
                                                                />
                                                                <path
                                                                    d="M2.45379 4.19556C2.45379 4.91689 2.17265 5.20385 1.47806 5.20385C2.17265 5.20385 2.45379 5.49367 2.45379 6.21144C2.45379 5.48868 2.74389 5.20385 3.42883 5.20385C2.74389 5.20385 2.45379 4.91902 2.45379 4.19556Z"
                                                                    fill="#FFECB3"
                                                                />
                                                                <path
                                                                    d="M9.07579 9.0105C9.07579 9.58728 8.85116 9.81656 8.29507 9.81656C8.85116 9.81656 9.07579 10.0487 9.07579 10.6233C9.07579 10.0451 9.30801 9.81656 9.85651 9.81656C9.30525 9.81656 9.07579 9.58728 9.07579 9.0105Z"
                                                                    fill="#FFECB3"
                                                                />
                                                                <g style={{ mixBlendMode: "multiply" }} opacity="0.3">
                                                                    <g
                                                                        style={{ mixBlendMode: "multiply" }}
                                                                        opacity="0.3"
                                                                    >
                                                                        <g
                                                                            style={{ mixBlendMode: "multiply" }}
                                                                            opacity="0.3"
                                                                        >
                                                                            <g
                                                                                style={{ mixBlendMode: "multiply" }}
                                                                                opacity="0.3"
                                                                            >
                                                                                <path
                                                                                    d="M6.35327 6.81104H3.65347V7.15355H4.50379C4.93929 7.24897 5.26729 7.55445 5.3107 7.92829H3.70998V8.09634H5.31346C5.26109 8.5485 4.79114 8.90312 4.21852 8.90312C4.03018 8.90917 3.84176 8.89507 3.65623 8.8611V9.12315H3.66105L5.56497 11.0906H6.03148L4.21094 9.21501H4.21438C4.99855 9.21501 5.6387 8.72225 5.69245 8.09847H6.3519V7.93042H5.69245C5.67531 7.77647 5.62708 7.62793 5.55087 7.49449C5.47467 7.36105 5.37219 7.24562 5.25006 7.15569H6.35259L6.35327 6.81104Z"
                                                                                    fill="#1D5F3E"
                                                                                />
                                                                            </g>
                                                                        </g>
                                                                        <g
                                                                            style={{ mixBlendMode: "multiply" }}
                                                                            opacity="0.3"
                                                                        >
                                                                            <g
                                                                                style={{ mixBlendMode: "multiply" }}
                                                                                opacity="0.3"
                                                                            >
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    clipRule="evenodd"
                                                                                    d="M3.54562 6.69971H6.46132L6.46019 7.26723H5.52595C5.56978 7.32042 5.60921 7.37753 5.64374 7.43799C5.7112 7.55612 5.75875 7.68501 5.78459 7.81909H6.45972V8.21002H5.7864C5.68228 8.79065 5.12923 9.22579 4.45698 9.31124L6.29236 11.2022H5.52029L3.61638 9.2347H3.54838V8.72827L3.67504 8.75148C3.85325 8.78409 4.03425 8.79762 4.21516 8.79186L4.21683 8.79178H4.2185C4.69702 8.79178 5.07016 8.53038 5.17837 8.20788H3.60213V7.81695H5.1757C5.08999 7.56046 4.83764 7.34406 4.49224 7.2651H3.54562V6.69971ZM3.76406 9.07213L5.60963 10.9793H5.77055L3.95001 9.10367H4.21437C4.96472 9.10367 5.53796 8.63484 5.58502 8.08868L5.5922 8.0053L5.5853 7.94328C5.56989 7.80485 5.52651 7.67126 5.45798 7.55121C5.38945 7.43122 5.29729 7.3274 5.18747 7.24651L4.91288 7.04435H6.24495L6.24519 6.92259H3.7613V7.04222H4.51509L4.52615 7.04464C4.99108 7.14653 5.36715 7.47929 5.41776 7.91515L5.42587 7.985H5.43496L5.43042 8.02417L5.43224 8.03983H5.42861L5.42052 8.10969C5.3595 8.63648 4.8258 9.01395 4.22019 9.01466C4.06771 9.01944 3.91518 9.0116 3.76406 8.99109V9.07213Z"
                                                                                    fill="white"
                                                                                />
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                                <path
                                                                    d="M6.38432 6.73364H3.68521V7.079H4.53484C4.97034 7.17443 5.29834 7.48062 5.34175 7.85446H3.74103V8.0218H5.34175C5.28938 8.47468 4.81943 8.82858 4.2475 8.82858C4.0592 8.83456 3.87079 8.82075 3.68521 8.78728V9.04932H3.69003L5.59395 11.0168H6.06046L4.24405 9.13976C5.02822 9.13976 5.66837 8.647 5.72143 8.02251H6.38088V7.85517H5.72694C5.7097 7.70087 5.6613 7.55204 5.58485 7.41839C5.5084 7.28466 5.40563 7.16902 5.28318 7.079H6.3857L6.38432 6.73364Z"
                                                                    fill="white"
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M3.57736 6.62183H6.49171L6.49398 7.19007H5.55939C5.60341 7.2434 5.64301 7.30065 5.67768 7.36132C5.74539 7.47974 5.79312 7.60891 5.81906 7.74335H6.48871V8.13357H5.81551C5.71209 8.71405 5.16032 9.14891 4.48926 9.23515L6.32081 11.1278H5.54927L3.64535 9.16038H3.57736V8.65431L3.70374 8.67709C3.88211 8.70928 4.06319 8.72259 4.24417 8.71683L4.24583 8.71676H4.24749C4.72552 8.71676 5.09861 8.45578 5.20673 8.13285H3.63318V7.74264H5.20677C5.12105 7.48594 4.86862 7.26904 4.52329 7.19007H3.57736V6.62183ZM3.79304 8.99781L5.63861 10.905H5.8001L3.98369 9.02793H4.24404C4.99441 9.02793 5.56755 8.5591 5.614 8.01237L5.62264 7.91069H5.62462L5.61981 7.86754C5.6043 7.72882 5.56075 7.59495 5.492 7.47468C5.42323 7.35441 5.33079 7.25038 5.22065 7.16942L4.94562 6.96718H6.27741L6.27692 6.84471H3.79304V6.96718H4.54614L4.5572 6.9696C5.02226 7.0715 5.39821 7.40511 5.44881 7.84076L5.45685 7.90998H5.46324L5.46004 7.93753L5.4633 7.96552H5.45681L5.44882 8.03466C5.38782 8.56216 4.85406 8.93892 4.24917 8.93963C4.09671 8.94441 3.94419 8.93664 3.79304 8.91649V8.99781Z"
                                                                    fill="white"
                                                                />
                                                                <path
                                                                    d="M14.709 36.9373C14.1702 36.9373 13.7356 36.7605 13.4053 36.4069C13.075 36.0532 12.9096 35.5873 12.9091 35.0091C12.9091 34.4308 13.0745 33.9649 13.4053 33.6113C13.736 33.2576 14.1706 33.0808 14.709 33.0808C15.0953 33.07 15.4748 33.187 15.7922 33.4147C16.0835 33.6215 16.2858 33.937 16.3566 34.2948L15.5683 34.5889C15.5214 34.4022 15.4136 34.2379 15.263 34.1239C15.1106 34.0063 14.9248 33.9441 14.7345 33.9474C14.6108 33.9429 14.4876 33.9666 14.3738 34.0171C14.2601 34.0676 14.1585 34.1435 14.0764 34.2393C13.9083 34.4339 13.8242 34.6905 13.8242 35.0091C13.8242 35.3276 13.9083 35.5842 14.0764 35.7788C14.1585 35.8745 14.2601 35.9503 14.3739 36.0006C14.4877 36.051 14.6108 36.0747 14.7345 36.07C14.9246 36.0734 15.1105 36.0116 15.263 35.8942C15.4136 35.7802 15.5214 35.6159 15.5683 35.4292L16.3566 35.7233C16.2858 36.0811 16.0835 36.3965 15.7922 36.6034C15.4748 36.8311 15.0953 36.9481 14.709 36.9373Z"
                                                                    fill="#194041"
                                                                />
                                                                <path
                                                                    d="M19.0157 36.8742L18.8373 36.3045H17.4646L17.2869 36.8742H16.3718L17.6424 33.1443H18.6595L19.9308 36.8742H19.0157ZM17.7141 35.5212H18.5885L18.151 34.1184L17.7141 35.5212Z"
                                                                    fill="#194041"
                                                                />
                                                                <path
                                                                    d="M21.4661 36.9374C21.0563 36.9374 20.7163 36.8297 20.4462 36.6142C20.3163 36.5139 20.2092 36.3854 20.1324 36.2378C20.0557 36.0901 20.0111 35.927 20.0018 35.7597L20.8052 35.6336C20.809 35.7113 20.83 35.7869 20.8665 35.8548C20.9031 35.9227 20.9543 35.9811 21.0161 36.0253C21.1629 36.1302 21.3388 36.1826 21.517 36.1748C21.6473 36.1811 21.7761 36.1453 21.8857 36.0723C21.9284 36.0437 21.9634 36.0044 21.9875 35.9581C22.0117 35.9118 22.024 35.8599 22.0235 35.8074C22.0235 35.6422 21.9236 35.5387 21.7238 35.4969L21.0175 35.3239C20.7538 35.2709 20.5129 35.134 20.3284 34.9322C20.1667 34.7376 20.0816 34.4873 20.09 34.2309C20.086 34.0699 20.1195 33.9103 20.1876 33.7654C20.2558 33.6206 20.3564 33.4947 20.4814 33.3984C20.7423 33.1862 21.0869 33.0801 21.515 33.0801C21.816 33.0737 22.111 33.1676 22.3563 33.3479C22.5894 33.5175 22.7518 33.7719 22.8111 34.06L22.0387 34.3021C22.0315 34.2369 22.0115 34.174 21.98 34.117C21.9485 34.0601 21.9061 34.0104 21.8554 33.971C21.7425 33.8843 21.6045 33.8399 21.464 33.8449C21.3386 33.8384 21.2149 33.8764 21.1132 33.9524C21.0707 33.9854 21.0363 34.0285 21.0133 34.0781C20.9903 34.1277 20.9792 34.1823 20.9809 34.2373C20.9809 34.3797 21.0912 34.4787 21.311 34.5314L22.0132 34.7151C22.6104 34.8731 22.9103 35.2394 22.9131 35.8138C22.9168 35.9737 22.8822 36.1321 22.8124 36.2749C22.7428 36.4178 22.64 36.5406 22.5134 36.6327C22.2488 36.8363 21.8997 36.9379 21.4661 36.9374Z"
                                                                    fill="#194041"
                                                                />
                                                                <path
                                                                    d="M25.5586 33.1443H26.4233V36.8742H25.5586V35.4293H24.2369V36.8742H23.3728V33.1443H24.2369V34.5891H25.5586V33.1443Z"
                                                                    fill="#194041"
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M16.0831 27.9622C16.0555 27.9294 16.0293 27.896 16.0004 27.8646C15.8021 27.6504 15.5592 27.4857 15.2899 27.3833C15.1272 27.3175 14.9561 27.2762 14.7821 27.2608C14.477 27.2269 14.1683 27.2665 13.8805 27.3764C13.5926 27.4864 13.3332 27.6637 13.1228 27.8945C12.9008 28.1358 12.7315 28.4235 12.6267 28.7383C12.5619 28.9223 12.5185 29.1135 12.4971 29.308C12.4793 29.4609 12.4756 29.6151 12.4861 29.7687C12.5194 30.2768 12.6989 30.7631 13.0015 31.1651C13.2095 31.4368 13.467 31.6637 13.7595 31.833C14.052 32.0096 14.3722 32.1318 14.7056 32.194C14.8248 32.2161 14.9454 32.2261 15.066 32.2396C15.1163 32.2446 15.1673 32.2439 15.2176 32.2453C15.6256 32.2529 16.0308 32.1735 16.4076 32.0117C16.689 31.8941 16.9505 31.7309 17.1821 31.5282C17.28 31.4414 17.3702 31.346 17.4626 31.2527C17.4702 31.2432 17.4798 31.2357 17.4907 31.2307C17.5016 31.2258 17.5134 31.2235 17.5253 31.2242C17.5524 31.2256 17.5795 31.2256 17.6066 31.2242C17.5777 31.2577 17.5529 31.2876 17.5274 31.316C17.1354 31.7545 16.6317 32.0696 16.0741 32.2254C15.9302 32.2683 15.7828 32.2976 15.6338 32.313C15.5063 32.3251 15.3774 32.3393 15.2486 32.3386C14.7974 32.3381 14.3519 32.2342 13.9442 32.0345C13.6495 31.8931 13.3805 31.7004 13.149 31.4649C12.7966 31.1061 12.5544 30.6478 12.453 30.1475C12.424 30.0085 12.4062 29.8673 12.3999 29.7253C12.3762 29.276 12.4662 28.8281 12.6611 28.4257C12.8163 28.0902 13.048 27.7987 13.3364 27.5762C13.5927 27.3818 13.8884 27.2501 14.2012 27.191C14.3489 27.1612 14.4994 27.149 14.6498 27.1547C15.1695 27.167 15.6649 27.3846 16.0341 27.7628C16.2867 28.0234 16.4519 28.3608 16.5055 28.7255C16.5192 28.8074 16.5378 28.8872 16.5509 28.9683C16.5709 29.0957 16.5764 29.2249 16.5675 29.3536C16.558 29.5238 16.5246 29.6917 16.4682 29.852C16.3253 30.266 16.0424 30.6127 15.6717 30.8283C15.486 30.9377 15.2823 31.0101 15.0708 31.0419C14.9329 31.0633 14.7929 31.0675 14.6539 31.0547C14.3145 31.0277 13.9907 30.8968 13.7237 30.6787C13.3879 30.4131 13.157 30.0305 13.0739 29.6021C13.0433 29.456 13.0314 29.3063 13.0387 29.157C13.0534 28.7838 13.1803 28.4247 13.4019 28.1295C13.6487 27.7931 14.0013 27.5561 14.399 27.4595C14.5713 27.416 14.7492 27.4011 14.9261 27.4153C15.3044 27.4407 15.6644 27.593 15.9514 27.849C15.988 27.8803 16.0203 27.9152 16.0555 27.9486L16.0762 27.9679C16.0782 27.9656 16.0804 27.9637 16.0831 27.9622ZM15.2424 28.4065L15.2355 28.4165L15.2562 28.4314C15.3196 28.4729 15.3772 28.5229 15.4277 28.5803C15.5541 28.7199 15.6294 28.9007 15.6407 29.0915C15.6525 29.2539 15.6177 29.4164 15.5408 29.5586C15.4622 29.7126 15.3314 29.8311 15.1734 29.8914C15.0155 29.9518 14.8415 29.9496 14.6849 29.8855C14.5488 29.8359 14.436 29.7349 14.369 29.6028C14.302 29.4707 14.2859 29.3173 14.3238 29.1734C14.3507 29.0465 14.4245 28.9355 14.5293 28.8639C14.6342 28.7924 14.762 28.766 14.8854 28.7903C14.9904 28.8071 15.0851 28.8649 15.1499 28.9519C15.2147 29.0389 15.2446 29.1483 15.2334 29.2574C15.2296 29.3063 15.2161 29.3538 15.1939 29.3971C15.1717 29.4404 15.1412 29.4786 15.1043 29.5094C15.0674 29.5402 15.0248 29.5628 14.9791 29.5761C14.9334 29.5893 14.8856 29.5928 14.8386 29.5864C14.7986 29.5816 14.76 29.5684 14.7252 29.5476C14.6904 29.5269 14.66 29.4989 14.636 29.4656C14.612 29.4323 14.5949 29.3942 14.5856 29.3537C14.5763 29.3133 14.5752 29.2713 14.5822 29.2304C14.5871 29.1958 14.5989 29.1626 14.6167 29.1328C14.6345 29.1031 14.658 29.0774 14.6857 29.0574C14.7135 29.0374 14.7449 29.0235 14.7781 29.0165C14.8112 29.0095 14.8454 29.0096 14.8786 29.0168C14.9117 29.023 14.9429 29.0374 14.9696 29.0588C14.9962 29.0801 15.0175 29.1078 15.0316 29.1394C15.0457 29.171 15.0523 29.2057 15.0507 29.2405C15.0491 29.2753 15.0394 29.3092 15.0226 29.3393C15.0026 29.3735 14.9792 29.3828 14.9537 29.3685C14.9282 29.3543 14.9254 29.3286 14.9433 29.2973C14.9433 29.2916 14.9495 29.2859 14.9516 29.2802C14.9617 29.2557 14.9635 29.2283 14.9569 29.2025C14.9503 29.1768 14.9355 29.154 14.9151 29.1378C14.8889 29.1179 14.8573 29.1072 14.8248 29.1072C14.7923 29.1072 14.7607 29.1179 14.7345 29.1378C14.6987 29.1689 14.675 29.2124 14.6679 29.2602C14.6608 29.3081 14.6708 29.3569 14.6959 29.3977C14.7314 29.4481 14.7839 29.4828 14.843 29.4951C14.902 29.5073 14.9634 29.4962 15.015 29.4639C15.0484 29.4404 15.0769 29.4101 15.0988 29.375C15.1206 29.3398 15.1354 29.3005 15.1423 29.2593C15.1492 29.2181 15.148 29.176 15.1388 29.1352C15.1296 29.0946 15.1126 29.0562 15.0887 29.0225C15.0317 28.947 14.9496 28.8961 14.8584 28.8796C14.7671 28.863 14.6732 28.882 14.5947 28.9327C14.5248 28.9781 14.469 29.043 14.4335 29.1199C14.398 29.1968 14.3843 29.2825 14.3941 29.3671C14.4003 29.4728 14.4411 29.5733 14.5099 29.6519C14.5632 29.7102 14.627 29.757 14.6979 29.7896C14.7688 29.8222 14.8453 29.8399 14.9229 29.8417C15.0004 29.8435 15.0776 29.8293 15.1498 29.8C15.2221 29.7708 15.288 29.727 15.3437 29.6712C15.4195 29.5947 15.4774 29.5013 15.5126 29.3981C15.5479 29.2948 15.5596 29.1845 15.547 29.0759C15.5385 28.9582 15.501 28.8447 15.4381 28.7462C15.2748 28.492 15.035 28.3787 14.749 28.3645C14.6126 28.3582 14.4767 28.3869 14.3535 28.4478C14.2718 28.4818 14.1977 28.5327 14.1357 28.5973C14.0285 28.7136 13.9529 28.8571 13.9166 29.0133C13.8803 29.1695 13.8846 29.3328 13.929 29.4867C13.9796 29.6792 14.0883 29.85 14.2394 29.9741C14.3905 30.0983 14.5761 30.1693 14.769 30.1767C14.9078 30.1834 15.0463 30.1558 15.1728 30.0963C15.3545 30.0141 15.5051 29.8727 15.6017 29.6937C15.6983 29.5147 15.7354 29.3079 15.7075 29.1051C15.6792 28.8764 15.5681 28.6673 15.3967 28.5197C15.3485 28.4777 15.2948 28.4428 15.2431 28.4051"
                                                                    fill="#194041"
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M25.77 27.7071C25.77 27.6715 25.77 27.6445 25.77 27.6167C25.77 27.5889 25.7762 27.5896 25.7969 27.5896C26.0636 27.5896 26.3302 27.5896 26.5976 27.5896C26.6231 27.5896 26.6238 27.6039 26.6238 27.6231V30.9271C26.6238 30.9399 26.6238 30.952 26.6238 30.9648C26.6219 30.9888 26.6122 31.0115 26.5961 31.029C26.5801 31.0465 26.5587 31.0578 26.5356 31.061H26.5018H25.892C25.8761 31.0633 25.86 31.062 25.8448 31.057C25.8295 31.0521 25.8155 31.0437 25.8038 31.0325C25.7882 31.0145 25.7772 30.9927 25.7721 30.9691C25.7631 30.8979 25.7266 30.8737 25.6605 30.8979C25.5536 30.9385 25.4468 30.9812 25.338 31.0183C25.2139 31.0607 25.086 31.0898 24.9562 31.1051C24.8533 31.1144 24.7498 31.1115 24.6475 31.0966C24.4756 31.0758 24.3077 31.0278 24.15 30.9542C23.735 30.7682 23.4054 30.4242 23.2294 29.9936C23.1615 29.8319 23.1183 29.6605 23.1012 29.4852C23.0562 29.049 23.1643 28.6107 23.4057 28.25C23.6471 27.8893 24.0059 27.6301 24.4167 27.5198C24.5166 27.4948 24.6182 27.4777 24.7206 27.4686C24.8019 27.4602 24.8837 27.4585 24.9652 27.4636C25.2352 27.4778 25.4985 27.5549 25.7356 27.6893L25.77 27.7071ZM23.9474 29.2836C23.947 29.4699 24.0001 29.6522 24.1 29.8073C24.1999 29.9624 24.342 30.0834 24.5085 30.1549C24.6749 30.2265 24.8582 30.2454 25.035 30.2093C25.2119 30.1731 25.3744 30.0836 25.502 29.9519C25.6296 29.8203 25.7165 29.6525 25.7518 29.4698C25.787 29.2871 25.769 29.0976 25.7 28.9255C25.631 28.7534 25.5141 28.6063 25.3642 28.5029C25.2143 28.3994 25.0379 28.3443 24.8577 28.3444C24.6166 28.345 24.3857 28.444 24.2151 28.6201C24.0446 28.796 23.9483 29.0346 23.9474 29.2836Z"
                                                                    fill="#194041"
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M17.5101 31.0503H16.1967C16.1822 31.0503 16.1671 31.0503 16.1526 31.0503C16.1437 31.0511 16.1347 31.0493 16.1266 31.0451C16.1186 31.041 16.1118 31.0346 16.1071 31.0267C16.1022 31.0189 16.0997 31.0098 16.0995 31.0005C16.0995 30.9912 16.1018 30.9821 16.1064 30.9741C16.1188 30.9449 16.1347 30.9171 16.1499 30.8894L16.77 29.75C16.9974 29.3308 17.225 28.9112 17.4529 28.4911C17.4681 28.4633 17.4832 28.4356 17.4977 28.4078C17.5314 28.3444 17.5046 28.2974 17.4357 28.2967H16.8155C16.7991 28.2985 16.7826 28.2965 16.767 28.2908C16.7515 28.2851 16.7374 28.2758 16.7258 28.2637C16.7142 28.2516 16.7054 28.237 16.7001 28.2209C16.6947 28.2047 16.6929 28.1875 16.6949 28.1707V27.5369C16.6928 27.5202 16.6944 27.5032 16.6996 27.4873C16.7048 27.4713 16.7134 27.4568 16.7249 27.4448C16.7363 27.4328 16.7502 27.4236 16.7655 27.418C16.7808 27.4124 16.7972 27.4105 16.8134 27.4123H18.9055C18.9167 27.4116 18.928 27.4116 18.9392 27.4123C18.9474 27.4133 18.9552 27.4164 18.9619 27.4213C18.9686 27.4263 18.974 27.4329 18.9776 27.4406C18.9812 27.4483 18.9828 27.4567 18.9824 27.4652C18.9819 27.4737 18.9794 27.4819 18.9751 27.4892C18.953 27.5355 18.9282 27.5804 18.9061 27.6252C18.6765 28.0525 18.4467 28.4776 18.2171 28.9005L17.6072 30.0242C17.5985 30.0393 17.5906 30.055 17.5838 30.0712C17.5786 30.0801 17.5758 30.0903 17.5754 30.1007C17.5751 30.1111 17.5773 30.1215 17.582 30.1307C17.5866 30.14 17.5934 30.1479 17.6018 30.1537C17.6102 30.1595 17.6199 30.1629 17.63 30.1638C17.6428 30.1652 17.6558 30.1652 17.6686 30.1638H18.8538C18.87 30.1615 18.8864 30.1632 18.9018 30.1686C18.9172 30.174 18.9313 30.183 18.9428 30.1949C18.9544 30.2068 18.9631 30.2213 18.9683 30.2372C18.9735 30.2533 18.9751 30.2702 18.973 30.2869C18.973 30.5006 18.973 30.7142 18.973 30.9278C18.9752 30.9443 18.9736 30.9611 18.9684 30.9769C18.9633 30.9926 18.9547 31.0069 18.9433 31.0187C18.9318 31.0304 18.9179 31.0392 18.9026 31.0444C18.8873 31.0497 18.8711 31.0512 18.8552 31.0489H17.5101"
                                                                    fill="#194041"
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M20.5979 27.4069H20.9424C20.9802 27.4047 21.0176 27.4146 21.0496 27.4354C21.0815 27.4562 21.1065 27.4868 21.1209 27.5229L21.7893 28.9777V28.9827C21.8017 29.0055 21.8134 29.0304 21.843 29.0304C21.8727 29.0304 21.8858 29.0069 21.8968 28.9834L22.1035 28.5327C22.2151 28.291 22.3263 28.0494 22.437 27.8078C22.4811 27.7116 22.5245 27.6148 22.57 27.5187C22.5841 27.4844 22.6079 27.4554 22.6383 27.4354C22.6687 27.4154 22.7042 27.4055 22.7402 27.4069H23.4658C23.5237 27.4069 23.5471 27.4475 23.5237 27.503C23.5085 27.5407 23.4906 27.5742 23.4734 27.6141L22.8484 28.9727C22.5861 29.5424 22.3238 30.112 22.0615 30.6817C22.005 30.8035 21.9498 30.9259 21.8933 31.0477C21.8823 31.0705 21.874 31.099 21.8437 31.099C21.8134 31.099 21.8038 31.0712 21.7934 31.0477L21.3662 30.122L20.3429 27.8961C20.2844 27.7672 20.2251 27.639 20.1665 27.5101C20.1599 27.5008 20.1556 27.49 20.1538 27.4786C20.1522 27.4672 20.1532 27.4555 20.1569 27.4446C20.1625 27.4312 20.1724 27.4202 20.185 27.4133C20.1975 27.4064 20.2119 27.4042 20.2258 27.4069H20.5979Z"
                                                                    fill="#194041"
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M19.128 29.2311V27.5314C19.1272 27.5137 19.1295 27.4961 19.1349 27.4794C19.1408 27.4588 19.1532 27.4406 19.1699 27.4278C19.1867 27.415 19.2071 27.4081 19.2279 27.4082C19.4457 27.4082 19.6634 27.4082 19.8812 27.4082C19.8943 27.4082 19.9074 27.4109 19.9196 27.4161C19.9318 27.4214 19.9428 27.429 19.9521 27.4387C19.9614 27.4484 19.9687 27.4598 19.9737 27.4724C19.9787 27.485 19.9812 27.4986 19.9811 27.5122C19.9811 27.5236 19.9811 27.535 19.9811 27.5471V30.9223C19.9811 30.9366 19.9811 30.9508 19.9811 30.965C19.979 30.9892 19.969 31.0118 19.9527 31.0292C19.9364 31.0466 19.9148 31.0576 19.8915 31.0605H19.8681H19.2438C19.2186 31.063 19.1935 31.0561 19.1729 31.0409C19.1524 31.0257 19.1379 31.0033 19.1322 30.9779C19.1304 30.963 19.1304 30.9479 19.1322 30.933V29.2311"
                                                                    fill="#194041"
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M16.0858 27.2745C16.0858 27.1513 16.0858 27.0288 16.0858 26.9063C16.0858 26.8814 16.0927 26.8743 16.1162 26.8743H16.5737C16.6047 26.8743 16.6054 26.8743 16.5978 26.9049C16.5372 27.1527 16.4759 27.4033 16.4159 27.6483C16.4104 27.6704 16.4007 27.6761 16.3801 27.6761C16.2926 27.6761 16.2044 27.6761 16.1169 27.6761C16.0934 27.6761 16.0858 27.6697 16.0858 27.6447C16.0858 27.5208 16.0858 27.3976 16.0858 27.2737"
                                                                    fill="#194041"
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M27.4101 27.2659C27.4197 27.2352 27.4294 27.2039 27.4383 27.1733C27.4659 27.0821 27.4934 26.9917 27.5189 26.9006C27.5194 26.8964 27.5207 26.8925 27.5228 26.8889C27.5248 26.8853 27.5275 26.8823 27.5307 26.8798C27.534 26.8773 27.5376 26.8756 27.5415 26.8746C27.5454 26.8737 27.5495 26.8735 27.5534 26.8742C27.5741 26.8742 27.5947 26.8742 27.6154 26.8742C27.6361 26.8742 27.6354 26.8799 27.6354 26.8942V27.3449C27.6354 27.3705 27.6182 27.3648 27.6044 27.3648C27.5906 27.3648 27.5713 27.3705 27.572 27.3442C27.572 27.3335 27.572 27.3228 27.572 27.3121V26.9867C27.5727 26.9761 27.5727 26.9654 27.572 26.9547H27.5644C27.5644 26.9647 27.5582 26.9739 27.5548 26.9832C27.5203 27.1007 27.4859 27.2174 27.4514 27.3349C27.4452 27.3563 27.4369 27.367 27.4121 27.367C27.3873 27.367 27.3735 27.362 27.366 27.3349C27.3308 27.2132 27.2929 27.0921 27.2557 26.9711C27.2557 26.9625 27.2488 26.9547 27.2461 26.9461H27.2378C27.2378 26.9561 27.2378 26.9654 27.2378 26.9753C27.2378 27.0943 27.2378 27.2125 27.2378 27.3314C27.2378 27.3556 27.2323 27.3655 27.2068 27.3655C27.1813 27.3655 27.1737 27.3591 27.1737 27.3328C27.1737 27.1904 27.1737 27.048 27.1737 26.9056C27.1737 26.8821 27.1806 26.8749 27.2033 26.8749C27.284 26.8749 27.284 26.8749 27.3088 26.954C27.3377 27.0501 27.3673 27.1455 27.3963 27.2388C27.3963 27.2473 27.4025 27.2559 27.4059 27.2644H27.4142"
                                                                    fill="#194041"
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M26.876 27.1522C26.876 27.091 26.876 27.0297 26.876 26.9685C26.876 26.9464 26.8698 26.9379 26.8485 26.9386C26.8133 26.9386 26.7796 26.9386 26.7424 26.9386C26.7203 26.9386 26.7189 26.9265 26.7203 26.9101C26.7217 26.8937 26.7134 26.8738 26.741 26.8738H27.0855C27.1124 26.8738 27.1076 26.8923 27.1082 26.9087C27.1089 26.9251 27.1082 26.94 27.0834 26.9386C27.0497 26.9386 27.0145 26.9386 26.9808 26.9386C26.958 26.9386 26.9505 26.9464 26.9511 26.9692C26.9511 27.0917 26.9511 27.2134 26.9511 27.3352C26.9511 27.3452 26.9456 27.363 26.9415 27.3637C26.9223 27.3662 26.9028 27.3662 26.8836 27.3637C26.8836 27.3637 26.8788 27.3495 26.8788 27.3423V27.1522"
                                                                    fill="#194041"
                                                                />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0">
                                                                    <rect width={41} height={46} fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                    <div className="text-ocb">
                                                        <div className="bold roboto fs-13-14">Big Discounts</div>
                                                        <div className="roboto fs-13-14">
                                                            Use your OZiva Cash to get up to ₹150 extra off on every
                                                            purchase.
                                                        </div>
                                                        <div className="roboto fs-13-14">
                                                            1 OZiva Cash = ₹1.00
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="overlayCD-hte" className="part3 padding-10-15">
                                <div
                                    className="accordion-wrapper"
                                    style={{ cursor: "pointer", borderBottom: "1px solid #F5F5F5" }}
                                >
                                    <div
                                        data-moengagehandler="howtoearn_click"
                                        className="cd-page-accordion-item cd-page-accordion"
                                    >
                                        <div className="fs-13-14 bold roboto">How to Earn</div>
                                        <div
                                            className="cd-page-accordion_icon cd-accordion_icon-arrow-down"
                                            style={{}}
                                        >
                                            <div className="svg-container svg-container-icon-keyboard_arrow_down">
                                                <svg
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M15.018 12.644L12.03 15.6923L9.018 12.644L6 9.59566L6.594 8.95165L7.194 8.30765L9.6 10.7671L12.006 13.2205L14.406 10.7671L16.806 8.31378L17.4 8.92099C17.73 9.25832 18 9.54659 18 9.56499C18 9.58339 16.656 10.9695 15.018 12.644Z"
                                                        fill="black"
                                                    />
                                                </svg>
                                            </div>
                                            <style
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        "\n  .svg-container-icon-keyboard_arrow_down{\n    width: 24px;\n  }\n"
                                                }}
                                            />
                                        </div>
                                        <div
                                            className="cd-page-accordion_icon cd-accordion_icon-arrow-up"
                                            style={{ display: "none" }}
                                        >
                                            <div className="svg-container svg-container-icon-keyboard_arrow_up">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                                                    <path d="M0 0h24v24H0z" fill="none" />
                                                </svg>
                                            </div>
                                            <style
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        "\n  .svg-container-icon-keyboard_arrow_up{\n    width: 1.4rem;\n  }\n"
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="cd-page-accordion-panel-item"
                                        style={{ display: "none" }}
                                    >
                                        <div className="cd-page-accordion-panel-item-cnt">
                                            <div className="body-hte">
                                                <div style={{ display: "block" }}>
                                                    <div className="item-hte">
                                                        <div>
                                                            <div className="item-number">1</div>
                                                        </div>
                                                        <div className="roboto fs-13-14 pl-5">
                                                            Earn 200 OZiva Cash on your first login.
                                                        </div>
                                                    </div>
                                                    <div className="item-hte">
                                                        <div>
                                                            <div className="item-number">2</div>
                                                        </div>
                                                        <div className="roboto fs-13-14 pl-5">
                                                            Use special cash back offers on your cart while placing
                                                            your order.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="overlayCD-htr" className="part3 padding-10-15">
                                <div
                                    className="accordion-wrapper"
                                    style={{ cursor: "pointer", borderBottom: "1px solid #F5F5F5" }}
                                >
                                    <div
                                        data-moengagehandler="howtoredeem_click"
                                        className="cd-page-accordion-item cd-page-accordion"
                                    >
                                        <div className="fs-13-14 bold roboto">How to Redeem</div>
                                        <div className="cd-page-accordion_icon cd-accordion_icon-arrow-down">
                                            <div className="svg-container svg-container-icon-keyboard_arrow_down">
                                                <svg
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M15.018 12.644L12.03 15.6923L9.018 12.644L6 9.59566L6.594 8.95165L7.194 8.30765L9.6 10.7671L12.006 13.2205L14.406 10.7671L16.806 8.31378L17.4 8.92099C17.73 9.25832 18 9.54659 18 9.56499C18 9.58339 16.656 10.9695 15.018 12.644Z"
                                                        fill="black"
                                                    />
                                                </svg>
                                            </div>
                                            <style
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        "\n  .svg-container-icon-keyboard_arrow_down{\n    width: 24px;\n  }\n"
                                                }}
                                            />
                                        </div>
                                        <div
                                            className="cd-page-accordion_icon cd-accordion_icon-arrow-up"
                                            style={{ display: "none" }}
                                        >
                                            <div className="svg-container svg-container-icon-keyboard_arrow_up">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                                                    <path d="M0 0h24v24H0z" fill="none" />
                                                </svg>
                                            </div>
                                            <style
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        "\n  .svg-container-icon-keyboard_arrow_up{\n    width: 1.4rem;\n  }\n"
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="cd-page-accordion-panel-item">
                                        <div className="cd-page-accordion-panel-item-cnt">
                                            <div className="body-htr">
                                                <div style={{ display: "block" }}>
                                                    <div
                                                        className="bold roboto fs-13-14 pl-5"
                                                        style={{ padding: 10 }}
                                                    >
                                                        Steps to Redeem OZiva Cash
                                                    </div>
                                                    <div className="body-hte">
                                                        <div className="item-hte">
                                                            <div>
                                                                <div className="item-number">1</div>
                                                            </div>
                                                            <div className="roboto fs-13-14 pl-5">
                                                                Log in using your Mobile Phone number.
                                                            </div>
                                                        </div>
                                                        <div className="item-hte">
                                                            <div>
                                                                <div className="item-number">2</div>
                                                            </div>
                                                            <div className="roboto fs-13-14 pl-5">
                                                                Apply your OZiva Cash from the cart while placing your
                                                                order.
                                                            </div>
                                                        </div>
                                                        <div className="item-hte">
                                                            <div>
                                                                <div className="item-number">3</div>
                                                            </div>
                                                            <div className="roboto fs-13-14 pl-5">
                                                                Complete your purchase.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="overlayCD-faq" className="part3 padding-10-15">
                                <div
                                    className="accordion-wrapper"
                                    style={{ cursor: "pointer", borderBottom: "1px solid #F5F5F5" }}
                                >
                                    <div
                                        data-moengagehandler="FAQs_click"
                                        className="cd-page-accordion-item cd-page-accordion"
                                    >
                                        <div className="fs-13-14 bold roboto">FAQs</div>
                                        <div className="cd-page-accordion_icon cd-accordion_icon-arrow-down">
                                            <div className="svg-container svg-container-icon-keyboard_arrow_down">
                                                <svg
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M15.018 12.644L12.03 15.6923L9.018 12.644L6 9.59566L6.594 8.95165L7.194 8.30765L9.6 10.7671L12.006 13.2205L14.406 10.7671L16.806 8.31378L17.4 8.92099C17.73 9.25832 18 9.54659 18 9.56499C18 9.58339 16.656 10.9695 15.018 12.644Z"
                                                        fill="black"
                                                    />
                                                </svg>
                                            </div>
                                            <style
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        "\n  .svg-container-icon-keyboard_arrow_down{\n    width: 24px;\n  }\n"
                                                }}
                                            />
                                        </div>
                                        <div
                                            className="cd-page-accordion_icon cd-accordion_icon-arrow-up"
                                            style={{ display: "none" }}
                                        >
                                            <div className="svg-container svg-container-icon-keyboard_arrow_up">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                                                    <path d="M0 0h24v24H0z" fill="none" />
                                                </svg>
                                            </div>
                                            <style
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        "\n  .svg-container-icon-keyboard_arrow_up{\n    width: 1.4rem;\n  }\n"
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="cd-page-accordion-panel-item">
                                        <div className="cd-page-accordion-panel-item-cnt">
                                            <div className="body-faq">
                                                <div style={{ display: "block" }}>
                                                    <div className="item-faq">
                                                        <div className="bold roboto fs-13-14">
                                                            What is OZiva Cash?
                                                        </div>
                                                        <div className="grey roboto fs-13-14">
                                                            OZiva Cash is a way for you to get exclusive, extra
                                                            discounts on your OZiva purchases. These discounts
                                                            depend on the OZiva Cash balance in your wallet and can
                                                            be availed in the cart when you're placing your order.{" "}
                                                        </div>
                                                    </div>
                                                    <div className="item-faq">
                                                        <div className="bold roboto fs-13-14">
                                                            Is there a membership fee for OZiva Cash?
                                                        </div>
                                                        <div className="grey roboto fs-13-14">
                                                            Nope! There is no membership fee for OZiva Cash.
                                                        </div>
                                                    </div>
                                                    <div className="item-faq">
                                                        <div className="bold roboto fs-13-14">
                                                            How can I earn OZiva Cash?
                                                        </div>
                                                        <div className="grey roboto fs-13-14">
                                                            You can earn OZiva Cash by performing actions such as
                                                            using cashback coupons on your OZiva Order, or setting
                                                            up your account with your phone number etc.
                                                        </div>
                                                    </div>
                                                    <div className="item-faq">
                                                        <div className="bold roboto fs-13-14">
                                                            Where can I view my OZiva Cash Wallet balance?
                                                        </div>
                                                        <div className="grey roboto fs-13-14">
                                                            You need to be logged in and you can view your OZiva
                                                            Cash Wallet balance on the OZiva Cash &amp; Deals page,
                                                            on the cart while placing your order, or on your account
                                                            page.
                                                        </div>
                                                    </div>
                                                    <div className="item-faq">
                                                        <div className="bold roboto fs-13-14">
                                                            How much is 1 OZiva Cash worth?
                                                        </div>
                                                        <div className="grey roboto fs-13-14">
                                                            1 OZiva Cash is equivalent to 1 INR.
                                                        </div>
                                                    </div>
                                                    <div className="item-faq">
                                                        <div className="bold roboto fs-13-14">
                                                            When will my OZiva Cash expire?
                                                        </div>
                                                        <div className="grey roboto fs-13-14">
                                                            Your OZiva Cash will expire after 45 days from the date
                                                            of earning them.
                                                        </div>
                                                    </div>
                                                    <div className="item-faq">
                                                        <div className="bold roboto fs-13-14">
                                                            How do I redeem my OZiva Cash?
                                                        </div>
                                                        <div className="grey roboto fs-13-14">
                                                            You can redeem your OZiva Cash on the cart while placing
                                                            your order. If you're logged in, you would automatically
                                                            be able to see how much of your OZiva Cash can be used
                                                            with your order.
                                                        </div>
                                                    </div>
                                                    <div className="item-faq">
                                                        <div className="bold roboto fs-13-14">
                                                            How much OZiva Cash can I redeem with every order?
                                                        </div>
                                                        <div className="grey roboto fs-13-14">
                                                            The amount of OZiva Cash redeemable per order will be as
                                                            per your Cart value and the available OZiva Cash balance
                                                            in your OZiva Cash Wallet.
                                                        </div>
                                                    </div>
                                                    <div className="item-faq">
                                                        <div className="bold roboto fs-13-14">
                                                            Can I use my OZiva Cash along with other offers?
                                                        </div>
                                                        <div className="grey roboto fs-13-14">
                                                            OZiva Cash cannot be used/clubbed with other offers.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cd_cnt">
                        <div className="cd_cnt_wrapper">
                            <div className="misc-holder">
                                <div className="deals-holder">
                                    <div className="deals-header">
                                        <h2 style={{ textTransform: "initial", textAlign: "left" }}>
                                            Checkout our latest deals!
                                        </h2>
                                    </div>
                                    <div className="deals-body">
                                        <div className="deals-list" id="BONUS100">
                                            <div className="offer-details">
                                                <p className="offer-description">
                                                    Flat ₹100 OFF + FREE Collagen Ceramide worth ₹1299
                                                </p>
                                                <p className="offer-description-subtitle">Apply at cart</p>
                                                <div className="product-offers-listing">
                                                    <div
                                                        className="offer-subtext offers-product-list-sec"
                                                        onclick="showListing(this)"
                                                    >
                                                        Valid on all the products on orders above ₹1499
                                                        <hr />
                                                    </div>
                                                </div>
                                                <div className="offer-code-footer">
                                                    <div className="coupon-code-holder">
                                                        <div className="c1">
                                                            <div className="copy-text">COPY</div>
                                                            <div className="icon-border">
                                                                <svg
                                                                    width={17}
                                                                    height={17}
                                                                    viewBox="0 0 17 17"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M1.04206 12.8539C1.04206 12.8539 2.37306 13.6639 2.57606 13.5639L8.87706 9.70492L11.0311 11.5629C10.9601 12.5029 11.7461 13.6149 13.0641 14.2949C13.7111 14.6309 14.4141 14.8159 15.0421 14.8159C15.8781 14.8159 16.5211 14.4939 16.8041 13.9329C17.3191 12.9169 16.4831 11.4829 14.9051 10.6649C14.2581 10.3299 13.5551 10.1449 12.9261 10.1449C12.4571 10.1449 12.0601 10.2559 11.7411 10.4429L10.1621 8.91592L11.6851 7.43692C12.0091 7.64692 12.4231 7.77192 12.9191 7.77192C13.5481 7.77192 14.2471 7.58792 14.8941 7.25092C16.4531 6.43892 17.2671 5.01892 16.7461 4.01692C16.4611 3.47092 15.8241 3.15592 15.0001 3.15592C14.3721 3.15592 13.6711 3.34192 13.0251 3.67892C11.7701 4.33292 11.0111 5.37792 11.0311 6.28392L8.87706 8.12792L2.57606 4.26792C2.37306 4.16892 1.04206 4.97892 1.04206 4.97892L7.57006 8.91592L1.04206 12.8539ZM12.1291 11.5189C12.2041 11.3689 12.3561 11.2629 12.5471 11.1939C13.0311 11.0169 13.8021 11.0939 14.4981 11.4539C15.5071 11.9759 16.1221 12.8889 15.8411 13.4469C15.7001 13.7239 15.3441 13.8839 14.8621 13.8839C14.4261 13.8839 13.9331 13.7509 13.4701 13.5119C12.7471 13.1389 12.2341 12.5649 12.1011 12.0619C12.0491 11.8639 12.0501 11.6769 12.1291 11.5189ZM13.4251 4.42992C14.4071 3.91892 15.5571 3.95592 15.8341 4.48692C16.1271 5.04892 15.5141 5.97292 14.4941 6.50392C14.0251 6.74792 13.5211 6.88292 13.0761 6.88292C12.8451 6.88292 12.6421 6.84492 12.4781 6.77592C12.2981 6.70192 12.1621 6.59092 12.0871 6.44792C11.9901 6.26092 12.0001 6.03392 12.0841 5.79692C12.2541 5.31292 12.7461 4.78492 13.4251 4.42992Z"
                                                                        fill="#6BBD58"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <span className="coupon-code-value">BONUS100</span>
                                                            <svg
                                                                onclick='copyToClipboard({"code":"BONUS100","title":"CERAMIDEFREE & CERAMIDE100OFF","description":"Flat ₹100 OFF + FREE Collagen Ceramide worth ₹1299","startAt":"2025-10-09T13:34:38.766Z","endAt":null,"minQuantity":1,"minSubtotal":1499,"type":"MULTI","landingPage":"https://www.oziva.in/pages/supersale","listing":[],"validOn":"Valid on all the products on orders above ₹1499"})'
                                                                style={{ cursor: "pointer", float: "right" }}
                                                                width={18}
                                                                height={18}
                                                                viewBox="0 0 18 18"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M15 6.75H8.25C7.42157 6.75 6.75 7.42157 6.75 8.25V15C6.75 15.8284 7.42157 16.5 8.25 16.5H15C15.8284 16.5 16.5 15.8284 16.5 15V8.25C16.5 7.42157 15.8284 6.75 15 6.75Z"
                                                                    stroke="#006E5A"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M3.75 11.25H3C2.60218 11.25 2.22064 11.092 1.93934 10.8107C1.65804 10.5294 1.5 10.1478 1.5 9.75V3C1.5 2.60218 1.65804 2.22064 1.93934 1.93934C2.22064 1.65804 2.60218 1.5 3 1.5H9.75C10.1478 1.5 10.5294 1.65804 10.8107 1.93934C11.092 2.22064 11.25 2.60218 11.25 3V3.75"
                                                                    stroke="#006E5A"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button
                                                            onclick="shopNow('https://www.oziva.in/pages/supersale')"
                                                            className="deals-btn"
                                                        >
                                                            SHOP NOW
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="deals-list" id="FESTIVE">
                                            <div className="offer-details">
                                                <p className="offer-description">
                                                    FREE Collagen Ceramide worth ₹1299
                                                </p>
                                                <p className="offer-description-subtitle">Apply at cart</p>
                                                <div className="product-offers-listing">
                                                    <div
                                                        className="offer-subtext offers-product-list-sec"
                                                        onclick="showListing(this)"
                                                    >
                                                        Valid on all the products on orders above ₹999
                                                        <hr />
                                                    </div>
                                                </div>
                                                <div className="offer-code-footer">
                                                    <div className="coupon-code-holder">
                                                        <div className="c1">
                                                            <div className="copy-text">COPY</div>
                                                            <div className="icon-border">
                                                                <svg
                                                                    width={17}
                                                                    height={17}
                                                                    viewBox="0 0 17 17"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M1.04206 12.8539C1.04206 12.8539 2.37306 13.6639 2.57606 13.5639L8.87706 9.70492L11.0311 11.5629C10.9601 12.5029 11.7461 13.6149 13.0641 14.2949C13.7111 14.6309 14.4141 14.8159 15.0421 14.8159C15.8781 14.8159 16.5211 14.4939 16.8041 13.9329C17.3191 12.9169 16.4831 11.4829 14.9051 10.6649C14.2581 10.3299 13.5551 10.1449 12.9261 10.1449C12.4571 10.1449 12.0601 10.2559 11.7411 10.4429L10.1621 8.91592L11.6851 7.43692C12.0091 7.64692 12.4231 7.77192 12.9191 7.77192C13.5481 7.77192 14.2471 7.58792 14.8941 7.25092C16.4531 6.43892 17.2671 5.01892 16.7461 4.01692C16.4611 3.47092 15.8241 3.15592 15.0001 3.15592C14.3721 3.15592 13.6711 3.34192 13.0251 3.67892C11.7701 4.33292 11.0111 5.37792 11.0311 6.28392L8.87706 8.12792L2.57606 4.26792C2.37306 4.16892 1.04206 4.97892 1.04206 4.97892L7.57006 8.91592L1.04206 12.8539ZM12.1291 11.5189C12.2041 11.3689 12.3561 11.2629 12.5471 11.1939C13.0311 11.0169 13.8021 11.0939 14.4981 11.4539C15.5071 11.9759 16.1221 12.8889 15.8411 13.4469C15.7001 13.7239 15.3441 13.8839 14.8621 13.8839C14.4261 13.8839 13.9331 13.7509 13.4701 13.5119C12.7471 13.1389 12.2341 12.5649 12.1011 12.0619C12.0491 11.8639 12.0501 11.6769 12.1291 11.5189ZM13.4251 4.42992C14.4071 3.91892 15.5571 3.95592 15.8341 4.48692C16.1271 5.04892 15.5141 5.97292 14.4941 6.50392C14.0251 6.74792 13.5211 6.88292 13.0761 6.88292C12.8451 6.88292 12.6421 6.84492 12.4781 6.77592C12.2981 6.70192 12.1621 6.59092 12.0871 6.44792C11.9901 6.26092 12.0001 6.03392 12.0841 5.79692C12.2541 5.31292 12.7461 4.78492 13.4251 4.42992Z"
                                                                        fill="#6BBD58"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <span className="coupon-code-value">FESTIVE</span>
                                                            <svg
                                                                onclick='copyToClipboard({"code":"FESTIVE","title":"FESTIVE","description":"FREE Collagen Ceramide worth ₹1299","startAt":"2025-09-30T05:20:16.247Z","endAt":null,"minQuantity":1,"minSubtotal":999,"type":"ENTITLED","landingPage":"https://www.oziva.in/pages/supersale","listing":["ACV Moringa For Craving Control Lemon Masala / Progress Pack","ACV Moringa For Craving Control Lemon Masala / Starter Pack","ACV Moringa For Craving Control Lemon Masala / Result Pack","ACV Moringa For Craving Control Green Apple / Progress Pack","ACV Moringa For Craving Control Green Apple / Result Pack","ACV Moringa For Craving Control Lemon Masala / Starter Pack","Magnesium Melatonin For Stress, Anxiety & Sleep Starter Pack","OZiva Protein & Herbs for Women, 23g Whey Protein Mango / Value Pack","OZiva Protein & Herbs for Women, 23g Whey Protein Cafe Mocha / Results Pack","OZiva Bioactive Vitamin E122 Night Gel Default Title","OZiva Protein & Herbs for Women, 23g Whey Protein Mango / Starter Pack","ACV Moringa For Craving Control Green Apple / Starter Pack","Anti Pigmentation Face Serum, 30ml | Pigmentation Reduction in 8 Weeks Absolut Even Face Serum (30 ml) + Collage Classic (250g)","OZiva Protein & Herbs for Women, 23g Whey Protein Cafe Mocha / Value Pack","OZiva Protein & Herbs for Women, 23g Whey Protein Cafe Mocha / Retainer Pack","OZiva Perfect Radiance Duo: Bioactive Vitamin C30 Face Serum (30 ml) + Bioactive Vitamin C30 Moisturiser (50 g) for Increase in Radiance Default Title","Bioactive Plant Protein for Faster Absorption & Better Digestion Malabar Vanilla / Result Pack","Protein & Herbs for Women Cafe Mocha / Retainer Pack","Protein & Herbs for Women Vanilla Almond / Results Pack","Vegan Collagen, Clinically Proven Classic / Starter Pack","Skin Vitamins Skin Vitamins / Pack of 2 + Pack of 1 Free","Plant Based HerBalance for PCOS HerBalance (250g) + Bettr.Zinc+ (60 Capsules)","OZiva ZERO SUGAR Apple Cider Vinegar, Fizzy Drink Mix for Weight Control Pack of 3","PCOS Weight Loss Duo | For PCOS Support & Craving Control Default Title"],"validOn":"Valid on all the products on orders above ₹999"})'
                                                                style={{ cursor: "pointer", float: "right" }}
                                                                width={18}
                                                                height={18}
                                                                viewBox="0 0 18 18"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M15 6.75H8.25C7.42157 6.75 6.75 7.42157 6.75 8.25V15C6.75 15.8284 7.42157 16.5 8.25 16.5H15C15.8284 16.5 16.5 15.8284 16.5 15V8.25C16.5 7.42157 15.8284 6.75 15 6.75Z"
                                                                    stroke="#006E5A"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M3.75 11.25H3C2.60218 11.25 2.22064 11.092 1.93934 10.8107C1.65804 10.5294 1.5 10.1478 1.5 9.75V3C1.5 2.60218 1.65804 2.22064 1.93934 1.93934C2.22064 1.65804 2.60218 1.5 3 1.5H9.75C10.1478 1.5 10.5294 1.65804 10.8107 1.93934C11.092 2.22064 11.25 2.60218 11.25 3V3.75"
                                                                    stroke="#006E5A"
                                                                    strokeWidth="1.2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button
                                                            onclick="shopNow('https://www.oziva.in/pages/supersale')"
                                                            className="deals-btn"
                                                        >
                                                            SHOP NOW
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            "\n        .main-content {\n          padding-top: 0;\n        }\n        body, h1, h2, h3, h4, h5, p, div {\n            margin: 0;\n            font-family: 'Roboto', sans-serif;\n        }\n        .top-blank {\n            height: 200px;\n            background-color: #FFD260;\n        }\n        .deals-holder {\n          \tborder-radius: 6px;\n            max-width: 940px;\n            background: white;\n            margin: 20px auto;\n        }\n        .deals-header {\n            text-align: center;\n        }\n        .deals-header > h2 {\n            padding: 12px 10px;\n            font-size:  26px;\n            font-weight: 600;\n            font-family: 'manrope-bold';\n        }\n        .deals-body {\n            padding: 0 16px 1px;\n        }\n        .deals-list {\n            display: flex;\n            flex-direction: row;\n            justify-content: center;\n            align-items: center;\n            padding: 16px;\n            background: #F1FFEE;\n            border: 1px dashed #6BBD58;\n            column-gap: 16px;\n            border-radius: 4px;\n            margin-bottom: 16px;\n        }\n        .deals-list > div {\n            text-align: left;\n            display: flex;\n        }\n        .dotted-offer {\n            font-family: 'manrope-bold';\n          \ttext-transform: uppercase;\n            text-align: center;\n            padding: 0 15px;\n            min-height: 70px;\n            border: 2px dashed black;\n            text-overflow: ellipsis;\n            overflow: hidden;\n            width: 150px;\n            justify-content: center;\n            display: flex;\n            align-items: center;\n        }\n        .deals-btn {\n            outline: none;\n            border: none;\n            padding: 10px 40px;\n            background: #FF6F00;\n            color: white;\n            border-radius: 4px;\n            width: 200px;\n            font-size: 14px;\n        }\n        .offer-details {\n            flex-direction: column;\n            flex-grow: 1;\n            line-height: 20px;\n        }\n        .offer-title {\n            color: #F04E23;\n            font-size: 13px;\n            font-weight: 600;\n            text-transform: uppercase;\n        }\n        .offer-description {\n            font-size: 14px;\n            line-height: 18px;\n            font-weight: 500;\n        }\n        .offer-description-subtitle {\n            font-size: 13px;\n            line-height: 17px;\n            color: #424242;\n            padding-top: 4px;\n            padding-bottom: 16px;\n        }\n        .offer-subtext {\n            color: #7E7E7E;\n            font-size: 14px;\n        }\n        .coupon-code-holder {\n            position: relative;\n            display: inline-flex;\n            align-items: center;\n            justify-content: space-between;\n        }\n        .coupon-code-value {\n            color: #6BBD58;\n            font-family: 'manrope-bold';\n          \tpadding: 0px;\n            font-size: 18px;\n            font-weight: 600;\n        }\n        .icon-border {\n            position: absolute;\n            top: -10px;\n            right: 20%;\n        }\n        .offer-info {\n            align-self: flex-start;\n            width: 150px;\n            text-align: center;\n            font-weight: 600;\n            font-size: 18px;\n        }\n        .copy-text {\n            position: absolute;\n            top: -20px;\n            font-size: 10px;\n            color: #b3b3b3;\n            right: 0;\n        }\n        .c1 {\n          position: relative;\n          display: inline-block;\n          background: #6bbd5812;\n          border: 1px dashed #6BBD58;\n          padding: 10px;\n          border-radius: 4px;\n        }\n        .top-banner #mobile {\n          display: none;\n        }\n        .top-banner #desktop {\n            display: block;\n          \twidth: 100%;\n        }\n        .c1 {\n          min-width: 225px;\n        }\n        .app-entry-banner img {\n            display: block;\n            margin: 0 auto 16px;\n            aspect-ratio: \t215/91;\n        }\n\n        /* START LISTING STYLING */\n        .offers-product-list{\n          display: none;\n        }\n        .offers-product-list-sec{\n          cursor: pointer;\n        }\n        .offers-product-list-sec.show-product-list .offers-product-list{\n          display: block;\n        }\n        .offers-product-list-sec .product-offers-toggle-arrow svg{\n          transform: rotate(180deg);\n        }\n        .offers-product-list-sec.show-product-list .product-offers-toggle-arrow svg{\n          transform: rotate(0deg);\n        }\n        .product-offers-listing {\n            position: relative;\n        }\n        .product-offers-listing hr {\n            margin: 16px 0;\n        }\n        .product-offers-toggle-arrow {\n            position: relative;\n            top: 3px;\n        }\n        .product-offers-lists{\n          padding-left: 12px !important;\n          margin: 16px 0 16px;\n        }\n        .product-offers-lists li{\n          margin-bottom: 8px;\n          list-style: none !important;\n          position: relative;\n          font-size: 13px;\n          line-height: 17px;\n          color: #424242;\n        }\n        .product-offers-lists li:before{\n          content: \"\\2022\";\n          color: #006e5a;\n          font-weight: bold;\n          font-size: 18px;\n          position: absolute;\n          left: -12px;\n        }\n        .offer-code-footer {\n            display: flex;\n            column-gap: 16px;\n            justify-content: center;\n            align-items: center;\n            padding-top: 16px;\n        }\n        @media only screen and (min-width: 780px){\n          .hide-on-web{\n            display: none !important;\n          }\n        }\n        @media only screen and (max-width: 780px) {\n          .hide-on-mobile{\n            display: none !important;\n          }\n          .deals-list {\n              padding: 10px;\n              display: block;\n          }\n          .deals-list > div {\n              padding: 10px 0;\n          }\n          .deals-btn {\n              width: 100%;\n              padding: 10px 15px;\n          } \n          .offer-info {\n              display: inline-block !important;\n              width: 25%;\n              vertical-align: top;\n          }\n          .deals-header > h2 {\n            font-size: 20px;\n          }\n          .coupon-code-holder {\n              min-width: 168px;\n              text-align: center;\n          }\n          .offer-subtext {\n              font-size: 12px;\n          }\n          .offer-title {\n              font-size: 11px;\n          }\n          .offer-description {\n              font-size: 14px;\n          }\n          .dotted-offer {\n              padding: 0;\n              height: auto;\n              min-height: 70px;\n              width: auto;\n              text-overflow: ellipsis;\n              overflow: hidden;\n          }\n          .app-entry-banner img {\n            width: 100%;\n            aspect-ratio: 250/29;\n          }\n          .top-banner #mobile {\n            display: block;\n          }\n          .top-banner #desktop {\n            display: none;\n          }\n          .c1 {\n            min-width: 0;\n            width: 100%;\n            max-width: 226px;\n          }\n          .offer-description,\n          .offer-subtext {\n              font-size: 13px;\n              line-height: 17px;\n          }\n          .offer-description-subtitle {\n              font-size: 12px;\n              line-height: 16px;\n              padding-top: 2px;\n              padding-bottom: 8px;\n          }\n          .product-offers-lists li{\n            font-size: 12px;\n            line-height: 16px;\n          }\n          .product-offers-listing hr {\n            margin: 8px 0;\n          }\n          .product-offers-lists {\n            margin: 16px 0;\n          }\n        }\n      .cd-page-accordion-panel-item, .cd-accordion_icon-arrow-up{\n        display: none;\n      }\n      .cd-accordion_icon-arrow-down{\n        display: block;\n      }\n      .cd-page-accordion, .cd-page-accordion-panel-item-cnt > div{\n        display: flex;\n        justify-content: space-between;\n      }\n      .cd-page-accordion-panel-item-cnt > div{\n        padding: 8px 0;\n      }\n  "
                    }}
                />
                {/* START TOGGLE */}
                {/* END TOGGLE */}
                <div id="oziva_referral_overlay_wrapper" style={{ display: "none" }}>
                    <div className="modal-cnt">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                maxWidth: 430,
                                margin: "auto"
                            }}
                        >
                            <div>
                                <div
                                    className="cross-btn-svg"
                                    style={{ cursor: "pointer" }}
                                    onclick="$('#oziva_referral_overlay_wrapper').hide();"
                                >
                                    <svg
                                        style={{ display: "block", margin: "auto" }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        width={53}
                                        height={53}
                                        viewBox="0 0 53 53"
                                    >
                                        <defs>
                                            <filter
                                                id="Ellipse_25"
                                                x={0}
                                                y={0}
                                                width={53}
                                                height={53}
                                                filterUnits="userSpaceOnUse"
                                            >
                                                <feOffset dy={3} input="SourceAlpha" />
                                                <feGaussianBlur stdDeviation={3} result="blur" />
                                                <feFlood floodOpacity="0.161" />
                                                <feComposite operator="in" in2="blur" />
                                                <feComposite in="SourceGraphic" />
                                            </filter>
                                        </defs>
                                        <g id="cancel_icon" transform="translate(-318 -114)">
                                            <g
                                                transform="matrix(1, 0, 0, 1, 318, 114)"
                                                filter="url(#Ellipse_25)"
                                            >
                                                <circle
                                                    id="Ellipse_25-2"
                                                    data-name="Ellipse 25"
                                                    cx="17.5"
                                                    cy="17.5"
                                                    r="17.5"
                                                    transform="translate(9 6)"
                                                    fill="#fff"
                                                />
                                            </g>
                                            <path
                                                id="Path_205"
                                                data-name="Path 205"
                                                d="M6.537,4.417H11.02V6.235H6.537v4.781H4.482V6.235H0V4.417H4.482V0H6.537Z"
                                                transform="translate(344.499 129.709) rotate(45)"
                                            />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="modal-wrapper">
                            <div className="modal-header">Refer and Earn</div>
                            <div className="items-cnt">
                                <div className="referral-image">
                                    <img src="//www.oziva.in/cdn/shop/t/10/assets/referral_banner_18_9.jpg?v=99021840922241496701626507255" />
                                </div>
                                <div className="content-detail" />
                                <div className="what-to-do">
                                    <div className="heading">All you have to do:</div>
                                    <div className="detail-wrap">
                                        <div className="detail-wrap-icon">
                                            <img src="//www.oziva.in/cdn/shop/t/10/assets/gift-box_icon.svg?v=74627421048389881981626507255" />
                                        </div>
                                        <div className="detail-wrap-text">
                                            Share your unique code with your friends and family
                                        </div>
                                    </div>
                                </div>
                                <div className="referral-code-wrap">
                                    <div className="heading">Your Referral Code</div>
                                    <div className="code-wrap">
                                        <div id="referralCode" className="referral-code">
                                            TEST6323
                                        </div>
                                        <div className="share-button" onclick="refer_via_medium()">
                                            SHARE
                                        </div>
                                    </div>
                                </div>
                                <div className="refer-via" style={{ display: "none" }}>
                                    <div className="heading">Refer via</div>
                                    <div className="refer-medium-wrap">
                                        <a
                                            onclick="shareViaMedium('whatsapp');"
                                            className="refer-medium whatsapp"
                                        >
                                            <div className="medium-icon">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="19.344"
                                                    height="19.344"
                                                    viewBox="0 0 19.344 19.344"
                                                >
                                                    <defs>
                                                        <style
                                                            dangerouslySetInnerHTML={{
                                                                __html: ".wap{fill:#4caf50;}.wapb{fill:#fafafa;}"
                                                            }}
                                                        />
                                                    </defs>
                                                    <path
                                                        className="wap"
                                                        d="M9.674,0h0A9.666,9.666,0,0,0,1.841,15.341L.636,18.934l3.718-1.188A9.67,9.67,0,1,0,9.674,0Z"
                                                    />
                                                    <path
                                                        className="wapb"
                                                        d="M118.514,126.322a2.729,2.729,0,0,1-1.9,1.365c-.505.108-1.165.193-3.388-.728a12.116,12.116,0,0,1-4.815-4.253,5.524,5.524,0,0,1-1.149-2.917,3.088,3.088,0,0,1,.989-2.354,1.405,1.405,0,0,1,.989-.347c.12,0,.227.006.324.011.284.012.427.029.614.478.233.562.8,1.95.869,2.093a.576.576,0,0,1,.041.523,1.672,1.672,0,0,1-.313.444c-.143.164-.278.29-.421.467-.131.154-.278.318-.114.6a8.585,8.585,0,0,0,1.569,1.95,7.111,7.111,0,0,0,2.268,1.4.612.612,0,0,0,.682-.108,11.705,11.705,0,0,0,.756-1,.54.54,0,0,1,.694-.21c.261.091,1.643.774,1.927.915s.472.21.54.33A2.409,2.409,0,0,1,118.514,126.322Z"
                                                        transform="translate(-103.211 -112.664)"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="medium-name">Whatsapp</div>
                                        </a>
                                        <a
                                            onclick="shareViaMedium('facebook');"
                                            className="refer-medium facebook"
                                        >
                                            <div className="medium-icon">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={20}
                                                    height={19}
                                                    viewBox="0 0 20 19"
                                                >
                                                    <defs>
                                                        <style
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    ".fba{fill:#3b5998;}.fbb{fill:#fff;fill-rule:evenodd;}"
                                                            }}
                                                        />
                                                    </defs>
                                                    <g transform="translate(0.403 -0.172)">
                                                        <g transform="translate(0)">
                                                            <ellipse
                                                                className="fba"
                                                                cx={10}
                                                                cy="9.5"
                                                                rx={10}
                                                                ry="9.5"
                                                                transform="translate(-0.403 0.172)"
                                                            />
                                                            <path
                                                                className="fbb"
                                                                d="M198.284,146.455c0-.9-.005-1.81.005-2.715,0-.153-.041-.2-.194-.194-.281.01-.562,0-.849.005-.112.005-.159-.031-.153-.148.005-.562.005-1.13,0-1.692,0-.107.031-.143.143-.143.286.005.578-.01.864.005.169.01.2-.051.2-.2q-.015-.644,0-1.288a2.462,2.462,0,0,1,.465-1.442,2,2,0,0,1,1.605-.818c.665-.031,1.334-.015,2-.02.092,0,.123.031.123.123-.005.573-.005,1.14,0,1.713,0,.1-.031.133-.133.133-.322-.005-.644,0-.961,0a.633.633,0,0,0-.711.644c-.02.337-.005.68-.015,1.022-.005.123.072.112.148.112.486,0,.976.005,1.462-.005.143,0,.189.031.174.179-.061.567-.112,1.135-.164,1.708-.01.128-.072.153-.184.153-.383-.005-.772-.005-1.155,0-.276,0-.251-.041-.251.24,0,1.774-.005,3.543.005,5.317,0,.189-.046.235-.23.23-.66-.01-1.324-.01-1.984,0-.184.005-.215-.061-.215-.225Z"
                                                                transform="translate(-190.125 -133.864)"
                                                            />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className="medium-name">Facebook</div>
                                        </a>
                                        <a
                                            onclick="shareViaMedium('other');"
                                            className="refer-medium getlink"
                                        >
                                            <div className="medium-icon">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16.578"
                                                    height="16.578"
                                                    viewBox="0 0 16.578 16.578"
                                                >
                                                    <defs>
                                                        <style
                                                            dangerouslySetInnerHTML={{
                                                                __html: ".linka{fill:#fecd10;}"
                                                            }}
                                                        />
                                                    </defs>
                                                    <g transform="translate(-0.001 0)">
                                                        <g transform="translate(5.575 0)">
                                                            <path
                                                                className="linka"
                                                                d="M182.025,1.138a3.885,3.885,0,0,0-5.495,0l-3.247,3.247a3.922,3.922,0,0,0,0,5.495,3.7,3.7,0,0,0,.781.593l.593-.593a1.335,1.335,0,0,0,.245-1.171,1.874,1.874,0,0,1-.245-.2,1.964,1.964,0,0,1,0-2.747L177.9,2.512a1.943,1.943,0,1,1,2.747,2.747L178.5,7.406a5.592,5.592,0,0,1,.243,2.5c.009-.009.021-.015.03-.024l3.247-3.247A3.886,3.886,0,0,0,182.025,1.138Z"
                                                                transform="translate(-172.159 0)"
                                                            />
                                                        </g>
                                                        <g transform="translate(0 5.853)">
                                                            <g transform="translate(0)">
                                                                <path
                                                                    className="linka"
                                                                    d="M10.132,181.369a3.7,3.7,0,0,0-.781-.593l-.593.593a1.334,1.334,0,0,0-.245,1.171,1.873,1.873,0,0,1,.245.2,1.964,1.964,0,0,1,0,2.747l-3.5,3.5a1.943,1.943,0,0,1-2.747-2.747l2.4-2.4a5.591,5.591,0,0,1-.243-2.5c-.009.009-.021.015-.03.024l-3.5,3.5a3.885,3.885,0,0,0,5.495,5.495l3.5-3.5A3.92,3.92,0,0,0,10.132,181.369Z"
                                                                    transform="translate(0 -180.776)"
                                                                />
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className="medium-name">Copy link</div>
                                        </a>
                                    </div>
                                </div>
                                <div className="referral-terms">
                                    <div className="heading" />
                                    <div className="noteby">
                                        *Rewards applicable once the order is delivered
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            "\n    #oziva_referral_overlay_wrapper {\n        position: fixed;\n        width: 100%;\n        height: 100%;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        background-color: rgba(0, 0, 0, 0.5);\n        z-index: 99999;\n    }\n\n    #oziva_referral_overlay_wrapper .modal-cnt {\n        position: fixed;\n        width: 100%;\n        padding: 5px;\n        top: 20%;\n    }\n\n    #oziva_referral_overlay_wrapper .modal-wrapper {\n        background-color: white;\n        max-width: 420px;\n        margin: auto;\n        border-radius: 6px;\n        cursor: auto;\n    }\n\n    #oziva_referral_overlay_wrapper .modal-header {\n        font-family: 'manrope-bold';\n        padding: 10px;\n        background-color: #F1FCEE;\n        font-size: 16px;\n        border-top-right-radius: 6px;\n        border-top-left-radius: 6px;\n    }\n\n    #oziva_referral_overlay_wrapper .items-cnt {\n        padding: 5px;\n        margin: 5px;\n        overflow-y: auto;\n        height: 400px;\n        overscroll-behavior: contain;\n    }\n    #oziva_referral_overlay_wrapper .referral-image{\n        height: 160px;\n        width: 100%;\n        background-color: #F2F2F2;\n        border-radius: 6px;\n    }\n    #oziva_referral_overlay_wrapper .referral-image img{\n        height: 100%;\n        width: 100%;\n        display: block;\n    }\n    #oziva_referral_overlay_wrapper .content-detail{\n        font-size: 14px;\n        font-family: 'manrope-bold';\n        margin: 10px auto;        \n    }\n    #oziva_referral_overlay_wrapper .what-to-do{\n        margin: 12px auto;\n        width: 100%;\n    }\n    #oziva_referral_overlay_wrapper .what-to-do .heading{\n        font-size: 13px;\n        font-weight: bold;\n    }\n    #oziva_referral_overlay_wrapper .what-to-do .detail-wrap{\n        display: flex;\n        justify-content: flex-start;\n        align-items: center;\n        padding: 10px 0;\n    }\n    #oziva_referral_overlay_wrapper .what-to-do .detail-wrap-icon{\n        width: 40px;\n        height: 40px;\n        background-color: #006E5A;\n        border-radius: 3px;\n    }\n    #oziva_referral_overlay_wrapper .what-to-do .detail-wrap-icon img{\n        display: block;\n        margin: auto;\n        height: 100%;\n        width: 100%;\n        padding: 6px;\n    }\n    #oziva_referral_overlay_wrapper .what-to-do .detail-wrap-text{\n        font-size: 13px;\n        line-height: 18px;\n        padding: 0 10px;\n    }\n    #oziva_referral_overlay_wrapper .referral-code-wrap{\n        margin: 12px auto;\n        width: 100%;\n    }\n    #oziva_referral_overlay_wrapper .referral-code-wrap .heading{\n        font-size: 11px;\n        color: #7E7E7E;\n    }\n    #oziva_referral_overlay_wrapper .referral-code-wrap .code-wrap{\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n    }\n    #oziva_referral_overlay_wrapper .referral-code-wrap .referral-code{\n        font-size: 16px;\n        width: 70%;\n        height: 100%;\n        background-color: #6BBD580D;\n        color: #6BBD58;\n        border-radius: 6px;\n        border: 1px dashed #6BBD58;\n        text-align: center;\n        padding: 8px;\n    }\n    #oziva_referral_overlay_wrapper .referral-code-wrap .share-button{\n        font-size: 14px;\n        color: white;\n        background-color: #6BBD58;\n        border-radius: 6px;\n        width: 28%;\n        padding: 8px;\n        height: 100%;\n        text-align: center;\n        border: 1px solid #6BBD58;\n        cursor: pointer;\n        margin-left: 2%;\n    }\n    #oziva_referral_overlay_wrapper .referral-terms{\n        margin: 10px auto;\n        width: 100%;\n    }\n    #oziva_referral_overlay_wrapper .referral-terms .heading{\n        font-size: 13px;\n        line-height: 18px;\n        margin-bottom: 10px;\n    }\n    #oziva_referral_overlay_wrapper .referral-terms .noteby{\n        font-size: 12px;\n        color: #006E5A;\n    }\n    #oziva_referral_overlay_wrapper .refer-via{\n        margin: 15px auto;\n    }\n    #oziva_referral_overlay_wrapper .refer-via .heading{\n        font-size: 13px;\n        font-weight: bold;\n    }\n    #oziva_referral_overlay_wrapper .refer-via .refer-medium-wrap{\n        display: flex;\n        justify-content: space-around;\n        align-items: center;\n        margin: 10px auto;\n        max-width: 250px;\n    }\n    #oziva_referral_overlay_wrapper .refer-via .refer-medium-wrap .refer-medium{\n        display: flex;\n        align-items: center;\n        flex-direction: column;\n        cursor: pointer;\n    }\n    #oziva_referral_overlay_wrapper .refer-via .refer-medium-wrap .refer-medium .medium-icon{\n        background-color: #F5FFF5;\n        border-radius: 6px;\n        height: 30px;\n        width: 30px;\n    }\n    #oziva_referral_overlay_wrapper .refer-via .refer-medium-wrap .refer-medium .medium-icon svg{\n        display: block;\n        margin: auto;\n        height: 100%;\n        width: 100%;\n        padding: 6px;\n    }\n    #oziva_referral_overlay_wrapper .refer-via .refer-medium-wrap .refer-medium .medium-name{\n        font-size: 11px;\n        color: #7E7E7E;\n    }\n    .referral_copy_toast{\n        position: fixed;\n        z-index: 99999;\n        bottom: 10px;\n        left: 0;\n        right: 0;\n        padding: 8px 30px;\n        border-radius: 6px;\n        background-color: #333030;\n        color: #FFFFFF;\n        width: fit-content;\n        margin: auto;\n        font-size: 12px;\n    }\n\n    /* Small Screen */\n\n    @media only screen and (max-width: 600px) {\n        #oziva_referral_overlay_wrapper .modal-cnt{\n            top: unset;\n            bottom: 0;\n        }\n    }\n"
                    }}
                />
            </div>

        </>
    )
}

export default CashDealView