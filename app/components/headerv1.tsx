import React, { lazy, useContext, useEffect, useState } from "react";
import { useCart } from "../components/cart-provider";
import { isUserLoginRequired } from "~/scripts/actions/authentication";
import { AuthenticationContext } from "~/scripts/context/authentication";
import { Moengage } from "~/scripts/utils/tracking/gaTracking";
import { Collections, CollectionByHandleData } from "~/scripts/models/home";
import { useNavigate } from "react-router";
import { CartContext } from "~/scripts/context/cart";
import { getVariantsFromStorage } from "~/scripts/utils/build-you-box/helper";
import { getAccessToken } from "~/scripts/utils/product/formatter";
import { getEnvironmentValue } from "~/scripts/utils/helper";
import { ReactTyped } from "react-typed";
import { OPTIONS } from "~/scripts/utils/search/search";
// import { useCart } from "./cart-provider";
const ChatwootView = lazy(() => import('../scripts/views/chatwoot'));
const QAB = lazy(() => import('../components/qab'));
const HeaderV1 = ({ concerns, categories }: { concerns: Collections[], categories: Collections[] }) => {
    const { state: authenticationState, dispatch: AuthenticationDispatch } = useContext(AuthenticationContext);
    const { state: cartState } = useContext(CartContext);
    const [cartTotal, setCartTotal] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hamMenuOpen, setHamMenuOpen] = useState(false);
    const [concernsTabOpen, setConcernsTabOpen] = useState(false);
    const [categoriesTabOpen, setCategoriesTabOpen] = useState(false);

    const navigate = useNavigate();

    const [collectionData, setCollectionData] = useState<CollectionByHandleData>();
    console.log(cartState, 'cartState')
    // const cart = useCart();

    const [state, setState] = useState(false)
    useEffect(() => {
        const authToken = getAccessToken();
        setIsLoggedIn(authToken?.accessToken ? true : false)
        setState(true)
        const buildyourBoxItems = getVariantsFromStorage()
            .filter((item) => item.collectionHandle === 'build-your-box') || [];

        const filteredItems = cartState.localCartItems?.filter(
            (item) => !buildyourBoxItems.find((val) => val.variant_id === item.variantId)
        );
        setCartTotal(
            (filteredItems?.reduce((acc, item) => acc + item.quantity, 0) ?? 0) +
            (buildyourBoxItems.length > 0 ? 1 : 0)
        );
    }, [cartState?.localCartItems])



    function OZHamburgerTab(arg0: string): void {
        setHamMenuOpen(hamMenuOpen => !hamMenuOpen)
        // Moengage.track_event(event_name, attributes);
        // sendEventGA4('hamburger_menu_clicked', {});
    }

    const LoginHandlerCaller = () => {
        AuthenticationDispatch && AuthenticationDispatch(isUserLoginRequired(true));
    }
    function LogoutHandlerCaller(): void {
        AuthenticationDispatch && AuthenticationDispatch(isUserLoginRequired(true));
        document.cookie = `AUTH_DATA${getEnvironmentValue()} = ; expires = Thu, 01 Jan 1970 00:00:00 GMT; domain= ${hostNameDomain}; path=/;`;
        document.cookie = `refreshToken${getEnvironmentValue()} = ; expires = Thu, 01 Jan 1970 00:00:00 GMT; domain= ${hostNameDomain}; path=/;`;
        sessionStorage.setItem('ozivacash_apply_check', '');
        // Moengage.destroy_session();
    }

    function callTrackingEvent() {
        const event = new CustomEvent('toggleSearchModalVisibility');
        window.dispatchEvent(event); // Dispatch the event for React to catch
        // let attributes: any = {};
        // attributes.search_date = Date.now()
        // Moengage.track_event('search_bar_click', attributes);
        // sendEventGA4('search_bar_click', attributes);
    }


    function handleConcernClick(handle: string, isConcern: boolean): void {
        if (isConcern) {
            navigate(`pages/concerns/${handle}`);
        } else {
            navigate(`pages/collections/${handle}`);
        }
        setHamMenuOpen(false)
    }


    useEffect(() => {
        fetch('/api/cart').then((response) => response.json()).then((data) => {
            console.log(data, 'hahaha')
        })
    }, [])

    const onTabClick = (redirectLink: string, newTab?: boolean) => {
        if (newTab) {
            window.open(redirectLink);
        } else {
            navigate(redirectLink);
        }
        setHamMenuOpen(false)
    }

    return (
        <div id="shopify-section-new-header" className="shopify-section" >
            {state && <QAB />}
            <section className="oz-site-main-header">


                <div className="top-header-sec">
                    <div className="top-header-left">
                        <div className="top-header-left-sec search-open">
                            <div className="head-logo-box">
                                <button
                                    onClick={() => OZHamburgerTab('ham_menu_click')}
                                    className="oz-site-hamburger p-0 border-0 bg-white"
                                >
                                    <img
                                        src="https://www.oziva.in/cdn/shop/t/94/assets/hamburger.svg?v=42404689807685442281659078742"
                                        alt="OZiva hamburger"
                                        className="d-block"
                                    />
                                </button>
                                <button
                                    data-href="/"
                                    className="oz-site-logo p-0 border-0 bg-white moe-click"
                                    data-event-name="oziva_header_logo"
                                    onClick={() => onTabClick('/')}
                                >
                                    <img
                                        src="https://www.oziva.in/cdn/shop/t/94/assets/OZiva_logo_svg.svg?v=40952796546038467691631786683"
                                        alt="OZiva Logo"
                                    />
                                </button>
                            </div>
                            <div
                                className="oz-header-search oz-header-search-v2 oz-dropdown"
                                id="oz-header-search-v2"
                            >
                                <form className="search-form">
                                    <label htmlFor="predictive" style={{ marginBottom: 0 }}>
                                        <ReactTyped parseRef={(ref) => ref.current.input}
                                            attr="placeholder"
                                            strings={OPTIONS.PLACEHOLDERS}
                                            typeSpeed={150}
                                            backSpeed={150}
                                            loop
                                            backDelay={150}
                                            showCursor
                                        >
                                            <input
                                                type="text"
                                                placeholder="Search for weight loss"
                                                name="q"
                                                className="search-form__input search-bar__input"
                                                autoComplete="off"
                                                onClick={() => callTrackingEvent()}
                                                id="predictive"
                                            />
                                        </ReactTyped>

                                    </label>
                                    <style
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                "\n  .limit-char {\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n"
                                        }}
                                    />
                                </form>
                                <img
                                    src="https://www.oziva.in/cdn/shop/t/94/assets/oz-search-icon.svg?v=129237872824969753481659078742"
                                    alt="Search for products"
                                    className="oz-search-icon-head"
                                />
                                <ul
                                    id="predictive-dropdown-menu"
                                    className="oz-dropdown-menu search-results oz-dropdown-v2-menu hide-on-mobile "
                                />
                            </div>
                            <style
                                dangerouslySetInnerHTML={{
                                    __html:
                                        "\n    .search-open .search-close-btn {\n            display: block !important;\n        }\n    @media only screen and (max-width: 990px) {        \n        .top-header-left-sec {\n            justify-content: space-between;\n        }\n        .search-form__input{\n            width: 100% !important;\n        }\n        .oz-search-icon-head {\n            position: relative; \n            right: 15px;\n            top: -1px;\n            width: 20px;\n            aspect-ratio: 1;\n        }\n        .search-open img.oz-search-icon-head {\n            position: absolute;\n            left: 10px;\n            top: 14px;\n            width: 17px;\n        }\n        .head-logo-box {\n            flex-shrink: 0;     \n        }\n        input::placeholder {\n            font-size: 13px;\n        }\n\n    }   \n\n"
                                }}
                            />
                        </div>
                    </div>
                    <dl className="top-header-right">
                        <dd
                            className="oz-dropdown user-icon hide-on-mobile"
                            style={{ display: "block" }}
                        >
                            <button className="p-0 border-0 bg-white">
                                <img
                                    src="https://www.oziva.in/cdn/shop/t/94/assets/web_menu_my_account.svg?v=177956948277046940621659078741"
                                    alt="My Account"
                                />
                            </button>
                            <ul className="oz-dropdown-menu">
                                <li>
                                    <button
                                        data-href="/pages/order-history"
                                        className="moe-click"
                                        data-event-name="nav_track_orders"
                                        onClick={() => onTabClick('/pages/order-history')}
                                    >
                                        Track Orders
                                    </button>
                                </li>
                                <li>
                                    <button
                                        data-href="/pages/contact-us"
                                        className="moe-click"
                                        data-event-name="nav_contact_us"
                                        onClick={() => onTabClick('/pages/contact-us')}
                                    >
                                        Contact Us
                                    </button>
                                </li>
                                <li>
                                    <button
                                        data-href="https://help.oziva.in/hc/en-us?source=desktop"
                                        className="moe-click"
                                        data-event-name="nav_help_desk"
                                        onClick={() => onTabClick('https://help.oziva.in/hc/en-us?source=desktop', true)}
                                    >
                                        Help Desk
                                    </button>
                                </li>
                                {!isLoggedIn ?
                                    <li
                                        className="list-item login"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <button onClick={() => LoginHandlerCaller()} className="link-button">
                                            Login
                                        </button>
                                    </li> :
                                    <li className="list-item">
                                        <button onClick={() => LoginHandlerCaller()} className="link-button">
                                            Logout
                                        </button>
                                    </li>}
                            </ul>
                        </dd>
                        <dd>
                            <button
                                data-href="/cart"
                                onClick={() => onTabClick('/cart')}
                                data-event-name="nav_cart_view_icon_top"
                                className="moe-click oz-header-search top-nav-cart-icon p-0 border-0 bg-white"
                            >
                                <img
                                    src="https://www.oziva.in/cdn/shop/t/94/assets/web_menu_cart.svg?v=157288753488333922401659078741"
                                    width={25}
                                    alt="Cart Icon"
                                />
                                {cartTotal > 0 &&
                                    <div id="CartCount">
                                        <span className="oz-cart-badge">{cartTotal} </span>
                                    </div>}{" "}
                            </button>
                        </dd>
                    </dl>
                </div>
                <div className="oz-header-search oz-header-search-v2 oz-dropdown hide-on-web">
                    <ul
                        id="predictive-dropdown-menu"
                        className="oz-dropdown-menu search-results oz-dropdown-v2-menu "
                    />
                </div>
                <div className={`oz-menu-sec ${hamMenuOpen ? 'oz-menu-open' : ''}`} id="OZHamburgerMenu">
                    <button
                        onClick={() => OZHamburgerTab('ham_menu_cancel_icon')}
                        className="d-none close-ozHamburgerTab"
                    />
                    <div className="oz-menu-container">
                        <div className="add-banner-top-mob-nav">
                            <div className="ham-nav-heder">
                                <button
                                    className="p-0 border-0 bg-white"
                                    onClick={() => OZHamburgerTab('ham_menu_cancel_icon')}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={25}
                                        height={24}
                                        viewBox="0 0 25 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M18.5 7.20857L17.2914 6L12.5 10.7914L7.70857 6L6.5 7.20857L11.2914 12L6.5 16.7914L7.70857 18L12.5 13.2086L17.2914 18L18.5 16.7914L13.7086 12L18.5 7.20857Z"
                                            fill="#006E5A"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className="p-0 border-0 bg-white"
                                    data-event-name="oziva_header_logo"
                                    onClick={() => window.location.href = '/'}
                                >
                                    <img
                                        src="https://www.oziva.in/cdn/shop/t/112/assets/OZiva_logo_svg.svg?v=40952796546038467691674110516"
                                        alt="OZiva Logo"
                                        width={80}
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
                                        onClick={() => onTabClick('/collections/new-launches')}
                                    >
                                        New Launches
                                    </button>
                                </li>
                            </span>
                            <span className="oz-menu-catg-listing border-0">
                                <li className="d-none">
                                    <button
                                        data-href="/pages/order-history"
                                        className="moe-click"
                                        data-event-name="ham_menu_track_order"
                                        style={{ borderBottom: "3px solid #E0E0E0" }}
                                        onClick={() => onTabClick('/pages/order-history')}

                                    >
                                        <span>Track Order</span>
                                    </button>
                                </li>
                                <span className="oz-menu-mob-tag d-none">Shop</span>
                                <li className="d-none">
                                    <button
                                        data-href="/collections/build-your-box"
                                        className="moe-click button-with-new-icon"
                                        data-event-name="nav_track"
                                        onClick={() => onTabClick('/collections/build-your-box')}
                                    >
                                        <span>
                                            Build Your Box <span style={{ color: "#FF6F00" }}>@1199</span>
                                        </span>
                                    </button>
                                </li>
                                <li className="sub-menu-links oz-dropdown-menu d-m-none">
                                    <button>Concern</button>
                                    <ul className="oz-sub-menu">
                                        <li className="concern">
                                            {concerns.map((item) =>
                                                <button
                                                    key={item.handle}
                                                    className={item.handle}
                                                    onClick={() => handleConcernClick(item.handle, true)}
                                                >
                                                    {item.name}
                                                </button>)}

                                        </li>
                                    </ul>
                                </li>
                                {/* START FOR MOBILE Concern Categories */}
                                <li className="oz-dropdown-menu d-none">
                                    <button
                                        data-href="/collections/new-launches"
                                        className="moe-click"
                                        data-event-name="nav_new_launch"
                                        onClick={() => onTabClick('/collections/new-launches')}
                                    >
                                        New Launches
                                    </button>
                                </li>
                                <li
                                    id="concern-menu-list"
                                    className={`sub-menu-links oz-dropdown-menu d-none ${concernsTabOpen ? 'active' : ''}`}
                                >
                                    <button onClick={() => setConcernsTabOpen(concernsTabOpen => !concernsTabOpen)}>Concern</button>
                                    <ul className="oz-sub-menu oz-sub-menu-mobile-con">
                                        <li className="concern">
                                            {concerns.map((item) => <li>
                                                <button
                                                    key={item.handle}
                                                    className={item.handle}
                                                    onClick={() => handleConcernClick(item.handle, true)}
                                                >
                                                    {item.name}
                                                </button>
                                            </li>)}

                                        </li>
                                    </ul>
                                </li>
                                <li
                                    id="category-menu-list"
                                    className={`sub-menu-links oz-dropdown-menu d-none ${categoriesTabOpen ? 'active' : ''}`}
                                >
                                    <button onClick={() => setCategoriesTabOpen(categoriesTabOpen => !categoriesTabOpen)}>Categories</button>
                                    <ul className="oz-sub-menu oz-sub-menu-mobile-cat">
                                        {categories.map((item) =>
                                            <li>
                                                <button
                                                    key={item.handle}
                                                    className={item.handle}
                                                    onClick={() => handleConcernClick(item.handle, false)}
                                                >
                                                    {item.name}
                                                </button>
                                            </li>)}

                                    </ul >
                                </li >
                                {/* FOR MOBILE Concern Categories */}
                            </span >
                            <span className="oz-menu-catg-listing d-m-none">
                                <li className="sub-menu-links oz-dropdown-menu">
                                    <button>Categories</button>
                                    <ul className="oz-sub-menu">
                                        <li className="categories">
                                            {categories.map((item) =>
                                                <button
                                                    key={item.handle}
                                                    className={item.handle}
                                                    onClick={() => handleConcernClick(item.handle, false)}
                                                >
                                                    {item.name}
                                                </button>
                                            )}
                                        </li >
                                    </ul >
                                </li >
                            </span >

                            < span className="oz-menu-listing d-none" >
                                <span className="oz-menu-mob-tag">Explore</span>
                                <li>
                                    <button
                                        data-href="/pages/my-oziva-cash"
                                        className="moe-click"
                                        data-event-name="nav_explr_oz_cash"
                                        onClick={() => onTabClick('/pages/my-oziva-cash')}
                                    >
                                        OZiva Cash and Offers
                                    </button>
                                </li>
                                <li>
                                    <button
                                        data-href="https://blog.oziva.in/"
                                        className="moe-click"
                                        data-event-name="nav_explr_bettr_blog"
                                        onClick={() => onTabClick('https://blog.oziva.in/', true)}
                                    >
                                        Be Bettr Blog
                                    </button>
                                </li>
                                <li className="ham-button-box">
                                    <button
                                        onClick={() => onTabClick('/pages/oziva-behtar-vikas-program')}
                                    >
                                        <div className="ham-button-box-text">
                                            <span>OZiva Kisaan Vikas Program</span>
                                            <span className="ham-button-box-sub-text">
                                                Empowering farmers &amp; their kids
                                            </span>
                                        </div>
                                        <div className="ham-button-box-img">
                                            <img
                                                src="https://www.oziva.in/cdn/shop/t/112/assets/oz-purpose-logo.svg?v=56387838208081095101678098280"
                                                alt="OZiva Kisaan Vikas Program"
                                                width={107}
                                            />
                                        </div>
                                    </button>
                                </li>
                            </span >
                            <li className="sub-menu-links d-m-none">
                                <button>Explore</button>
                                <ul className="oz-sub-menu">
                                    <li>
                                        <button
                                            data-href="/pages/my-oziva-cash"
                                            className="moe-click"
                                            data-event-name="nav_explr_oz_cash"
                                            onClick={() => onTabClick('/pages/my-oziva-cash')}

                                        >
                                            OZiva Cash &amp; Offers
                                        </button>
                                        <button
                                            data-href="https://blog.oziva.in/"
                                            className="moe-click"
                                            data-event-name="nav_explr_bettr_blog"
                                            onClick={() => onTabClick('https://blog.oziva.in/', true)}

                                        >
                                            Be Bettr Blog
                                        </button>
                                        <button
                                            onClick={() => onTabClick('/pages/oziva-behtar-vikas-program')}>
                                            Kisaan Vikas Program
                                        </button>
                                    </li>
                                </ul>
                            </li>
                            <li className="d-m-none">
                                <button
                                    data-href="/collections/build-your-box"
                                    className="moe-click"
                                    data-event-name="nav_byb"
                                    onClick={() => onTabClick('/collections/build-your-box')}
                                >
                                    Build Your Box <span style={{ color: "#F04E23" }}>@1199</span>
                                </button>
                            </li>
                            <span className="oz-menu-listing d-m-none">
                                <li>
                                    <button
                                        data-href="https://api.whatsapp.com/send/?phone=917400492021&text=Hi&type=phone_number&app_absent=0"
                                        className="moe-click"
                                        style={{ display: "flex", gap: 8 }}
                                        onClick={() => onTabClick('https://api.whatsapp.com/send/?phone=917400492021&text=Hi&type=phone_number&app_absent=0', true)}

                                    >
                                        <svg
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M20.4 0H3.6C1.61177 0 0 1.61177 0 3.6V20.4C0 22.3882 1.61177 24 3.6 24H20.4C22.3882 24 24 22.3882 24 20.4V3.6C24 1.61177 22.3882 0 20.4 0Z"
                                                fill="#25D366"
                                            />
                                            <path
                                                d="M5.37794 19L6.08808 15.7135C5.17534 14.2785 4.81928 12.5609 5.0867 10.8828C5.35412 9.20473 6.22664 7.68159 7.54057 6.59915C8.85449 5.51671 10.5195 4.94936 12.2233 5.00355C13.927 5.05774 15.5523 5.72975 16.7944 6.89348C18.0364 8.05722 18.8097 9.6327 18.9693 11.3244C19.1288 13.016 18.6636 14.7075 17.6609 16.0816C16.6583 17.4557 15.187 18.4179 13.5233 18.7876C11.8595 19.1574 10.1176 18.9093 8.62431 18.0899L5.37794 19Z"
                                                fill="#25D366"
                                                stroke="white"
                                            />
                                            <path
                                                d="M14.5407 12.94C14.3885 12.8389 14.2364 12.7884 14.0842 12.9906L13.4755 13.7996C13.3233 13.9007 13.2219 13.9513 13.019 13.8501C12.2581 13.4456 11.1929 12.9906 10.2799 11.4738C10.2291 11.2715 10.3306 11.1704 10.432 11.0693L10.8885 10.3614C10.99 10.2603 10.9393 10.1592 10.8885 10.0581L10.2799 8.59179C10.1277 8.1873 9.97551 8.23786 9.82334 8.23786H9.41754C9.31609 8.23786 9.11319 8.28842 8.91029 8.49067C7.79435 9.60301 8.25087 11.1704 9.06247 12.1816C9.21464 12.3839 10.2291 14.2041 12.4103 15.1647C14.0335 15.8726 14.3885 15.7715 14.8451 15.6703C15.403 15.6198 15.961 15.1647 16.2146 14.7097C16.2653 14.558 16.519 13.9007 16.3161 13.7996"
                                                fill="white"
                                            />
                                        </svg>{" "}
                                        Help
                                    </button>
                                </li>
                            </span>
                            <span className="oz-menu-listing d-none">
                                <li>
                                    <button
                                        data-href="/pages/contact-us"
                                        className="moe-click"
                                        data-event-name="nav_contact_us"
                                        onClick={() => onTabClick('/pages/contact-us')}
                                    >
                                        Contact Us
                                    </button>
                                </li>
                                <li>
                                    <button
                                        data-href="https://help.oziva.in/hc/en-us?source=desktop"
                                        className="moe-click"
                                        data-event-name="nav_help_desk"
                                        onClick={() => onTabClick('https://help.oziva.in/hc/en-us?source=desktop', true)}
                                    >
                                        Helpdesk
                                    </button>
                                </li>
                                {!isLoggedIn ?
                                    <li className="list-item login" style={{ display: "none" }}>
                                        <button onClick={() => LoginHandlerCaller()}>Login</button>
                                    </li> :
                                    <li className="list-item logout">
                                        <button onClick={() => LogoutHandlerCaller()}>Logout</button>
                                    </li>}
                            </span>
                        </ul >
                    </div >
                </div >
            </section >
            {state && <ChatwootView />}
        </div>




    );
};

export default HeaderV1;
