import React from "react";


const HeaderV1 = () => {
    function OZHamburgerTab(val) {

    }
    const callTrackingEvent = () => {

    }
    const LogoutHandlerCaller = () => {

    }
    const LoginHandlerCaller = () => {

    }
    return <>
        <div id="shopify-section-new-header" className="shopify-section">
            <div
                className="qab"
                id="qab"
                style={{
                    background:
                        'url("https://cdn.shopify.com/s/files/1/2393/2199/files/8409A5.jpg?v=1758542329") center center / cover',
                }}
            >
                <div className="qab-item active" data-text="GRAND WELLNESS1">
                    <p>
                        <img
                            src="https://cdn.shopify.com/s/files/1/2393/2199/files/gift-box-1.gif"
                            style={{ height: 24, width: 24 }}
                        />
                        <span style={{ color: "#fff" }}>
                            Buy 1 Get 4 FREE Worth ₹2500 | Code: B1G4
                        </span>
                        <img
                            src="https://cdn.shopify.com/s/files/1/2393/2199/files/gift-box-1.gif"
                            style={{ height: 24, width: 24 }}
                        />
                    </p>
                </div>
                <div className="qab-item" data-text="GRAND WELLNESS2">
                    <p>
                        <img
                            alt=""
                            src="https://cdn.shopify.com/s/files/1/2393/2199/files/giphy.gif"
                            style={{ height: 24, width: 24 }}
                        />
                        <span style={{ color: "#ffffff" }}>Grand Wellness Festival is LIVE!</span>
                        <img
                            alt=""
                            src="https://cdn.shopify.com/s/files/1/2393/2199/files/giphy.gif"
                            style={{ height: 24, width: 24 }}
                        />
                    </p>
                </div>
            </div>

            <section className="oz-site-main-header">
                <div className="top-header-sec">
                    <div className="top-header-left">
                        <div className="top-header-left-sec search-open">
                            <div className="head-logo-box">
                                <button
                                    onClick={() => OZHamburgerTab("ham_menu_click")}
                                    className="oz-site-hamburger p-0 border-0 bg-white"
                                >
                                    <img
                                        src="//www.oziva.in/cdn/shop/t/10/assets/hamburger.svg?v=42404689807685442281660742017"
                                        alt="OZiva hamburger"
                                        className="d-block"
                                    />
                                </button>
                                <button
                                    data-href="/"
                                    className="oz-site-logo p-0 border-0 bg-white moe-click"
                                    data-event-name="oziva_header_logo"
                                >
                                    <img
                                        src="//www.oziva.in/cdn/shop/t/10/assets/OZiva_logo_svg.svg?v=40952796546038467691629803346"
                                        alt="OZiva Logo"
                                    />
                                </button>
                            </div>

                            <div className="oz-header-search oz-header-search-v2 oz-dropdown" id="oz-header-search-v2">
                                <form className="search-form">
                                    <span className="icon__fallback-text">Search</span>
                                    <label htmlFor="predictive" style={{ marginBottom: 0 }}>
                                        <input
                                            type="text"
                                            placeholder="Search for pcos"
                                            name="q"
                                            className="search-form__input search-bar__input"
                                            autoComplete="off"
                                            onClick={callTrackingEvent}
                                            id="predictive"
                                        />
                                    </label>


                                </form>

                                <img
                                    src="//www.oziva.in/cdn/shop/t/10/assets/oz-search-icon.svg?v=129237872824969753481660742013"
                                    alt="Search for products"
                                    className="oz-search-icon-head"
                                />
                                <ul
                                    id="predictive-dropdown-menu"
                                    className="oz-dropdown-menu search-results oz-dropdown-v2-menu hide-on-mobile"
                                ></ul>
                            </div>
                        </div>
                    </div>

                    <dl className="top-header-right">
                        <dd className="oz-dropdown user-icon hide-on-mobile">
                            <button className="p-0 border-0 bg-white">
                                <img
                                    src="//www.oziva.in/cdn/shop/t/10/assets/web_menu_my_account.svg?v=177956948277046940621660742016"
                                    alt="My Account"
                                />
                            </button>
                            <ul className="oz-dropdown-menu">
                                <li>
                                    <button
                                        data-href="/pages/order-history"
                                        className="moe-click"
                                        data-event-name="nav_track_orders"
                                    >
                                        Track Orders
                                    </button>
                                </li>
                                <li>
                                    <button
                                        data-href="/pages/contact-us"
                                        className="moe-click"
                                        data-event-name="nav_contact_us"
                                    >
                                        Contact Us
                                    </button>
                                </li>
                                <li>
                                    <button
                                        data-href="https://help.oziva.in/hc/en-us?source=desktop"
                                        className="moe-click"
                                        data-event-name="nav_help_desk"
                                    >
                                        Help Desk
                                    </button>
                                </li>
                                <li className="list-item login" style={{ cursor: "pointer" }}>
                                    <button onClick={LoginHandlerCaller} className="link-button">
                                        Login
                                    </button>
                                </li>
                                <li className="list-item logout" style={{ display: "none" }}>
                                    <button onClick={LogoutHandlerCaller} className="link-button">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </dd>

                        <dd>
                            <button
                                data-href="/cart"
                                data-event-name="nav_cart_view_icon_top"
                                className="moe-click oz-header-search top-nav-cart-icon p-0 border-0 bg-white"
                            >
                                <img
                                    src="//www.oziva.in/cdn/shop/t/10/assets/web_menu_cart.svg?v=157288753488333922401660742015"
                                    width="25"
                                    alt="Cart Icon"
                                />
                            </button>
                        </dd>
                    </dl>
                </div>

                <div className="oz-header-search oz-header-search-v2 oz-dropdown hide-on-web">
                    <ul
                        id="predictive-dropdown-menu"
                        className="oz-dropdown-menu search-results oz-dropdown-v2-menu"
                    ></ul>
                </div>

                <div className="oz-menu-sec" id="OZHamburgerMenu">
                    <button
                        onClick={() => OZHamburgerTab("ham_menu_cancel_icon")}
                        className="d-none close-ozHamburgerTab"
                    ></button>
                    <div className="oz-menu-container">
                        <div className="add-banner-top-mob-nav">
                            <div className="ham-nav-heder">
                                <button className="p-0 border-0 bg-white" onClick={() => OZHamburgerTab("ham_menu_cancel_icon")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                        <path
                                            d="M18.5 7.20857L17.2914 6L12.5 10.7914L7.70857 6L6.5 7.20857L11.2914 12L6.5 16.7914L7.70857 18L12.5 13.2086L17.2914 18L18.5 16.7914L13.7086 12L18.5 7.20857Z"
                                            fill="#006E5A"
                                        ></path>
                                    </svg>
                                </button>
                                <button
                                    className="p-0 border-0 bg-white"
                                    data-event-name="oziva_header_logo"
                                    onClick={() => (window.location.href = "/")}
                                >
                                    <img
                                        src="//www.oziva.in/cdn/shop/t/112/assets/OZiva_logo_svg.svg?v=40952796546038467691674110516"
                                        alt="OZiva Logo"
                                        width="80"
                                    />
                                </button>
                            </div>
                        </div>
                        <ul className="oz-menu-listing">
                            <span>
                                <li className="oz-dropdown-menu d-m-none">
                                    <button
                                        data-href="/collections/new-launches"
                                        data-event-name="nav_new_launch"
                                        className="moe-click"
                                    >
                                        New Launches
                                    </button>
                                </li>
                            </span>
                            <span>
                                <li className="oz-dropdown-menu d-m-none">
                                    <button
                                        data-href="/collections/new-launches"
                                        data-event-name="nav_new_launch"
                                        className="moe-click"
                                    >
                                        Concerns
                                    </button>
                                </li>
                            </span>
                            <span>
                                <li className="oz-dropdown-menu d-m-none">
                                    <button
                                        data-href="/collections/new-launches"
                                        data-event-name="nav_new_launch"
                                        className="moe-click"
                                    >
                                        Categories
                                    </button>
                                </li>
                            </span>
                            <span>
                                <li className="oz-dropdown-menu d-m-none">
                                    <button
                                        data-href="/collections/new-launches"
                                        data-event-name="nav_new_launch"
                                        className="moe-click"
                                    >
                                        Explore
                                    </button>
                                </li>
                            </span>
                            <span>
                                <li className="oz-dropdown-menu d-m-none">
                                    <button
                                        data-href="/collections/new-launches"
                                        data-event-name="nav_new_launch"
                                        className="moe-click"
                                    >
                                        Build your box @1299
                                    </button>
                                </li>
                            </span>
                            <span>
                                <li className="oz-dropdown-menu d-m-none">
                                    <button
                                        data-href="/collections/new-launches"
                                        data-event-name="nav_new_launch"
                                        className="moe-click"
                                    >
                                        Help
                                    </button>
                                </li>
                            </span>
                            {/* ...continue similarly for the rest of your menu items, converting all `onclick` to `onClick`, `class` to `className`, and inline styles as objects */}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    </>
}
export default HeaderV1;