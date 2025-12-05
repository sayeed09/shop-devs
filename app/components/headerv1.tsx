import React, { lazy, useContext, useEffect, useState } from "react";
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

// Lazy-loaded components
const ChatwootView = lazy(() => import('../scripts/views/chatwoot'));
const QAB = lazy(() => import('../components/qab'));

const isBrowser = typeof window !== "undefined";

const HeaderV1 = ({ concerns, categories }: { concerns: Collections[], categories: Collections[] }) => {
    const { state: authenticationState, dispatch: AuthenticationDispatch } = useContext(AuthenticationContext);
    const { state: cartState } = useContext(CartContext);
    const [cartTotal, setCartTotal] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hamMenuOpen, setHamMenuOpen] = useState(false);
    const [concernsTabOpen, setConcernsTabOpen] = useState(false);
    const [categoriesTabOpen, setCategoriesTabOpen] = useState(false);
    const [state, setState] = useState(false);
    const navigate = useNavigate();

    const [collectionData, setCollectionData] = useState<CollectionByHandleData>();

    useEffect(() => {
        if (!isBrowser) return;

        const authToken = getAccessToken();
        setIsLoggedIn(!!authToken?.accessToken);
        setState(true);

        const buildyourBoxItems = getVariantsFromStorage()
            .filter((item) => item.collectionHandle === 'build-your-box') || [];

        const filteredItems = cartState.localCartItems?.filter(
            (item) => !buildyourBoxItems.find((val) => val.variant_id === item.variantId)
        );

        setCartTotal(
            (filteredItems?.reduce((acc, item) => acc + item.quantity, 0) ?? 0) +
            (buildyourBoxItems.length > 0 ? 1 : 0)
        );
    }, [cartState?.localCartItems]);

    const OZHamburgerTab = () => setHamMenuOpen(prev => !prev);

    const LoginHandlerCaller = () => AuthenticationDispatch && AuthenticationDispatch(isUserLoginRequired(true));

    const LogoutHandlerCaller = () => {
        AuthenticationDispatch && AuthenticationDispatch(isUserLoginRequired(true));
        if (!isBrowser) return;
        const hostNameDomain = window.location.hostname;
        document.cookie = `AUTH_DATA${getEnvironmentValue()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${hostNameDomain}; path=/;`;
        document.cookie = `refreshToken${getEnvironmentValue()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${hostNameDomain}; path=/;`;
        sessionStorage.setItem('ozivacash_apply_check', '');
    };

    const callTrackingEvent = () => {
        if (!isBrowser) return;
        const event = new CustomEvent('toggleSearchModalVisibility');
        window.dispatchEvent(event);
    };

    const handleConcernClick = (handle: string, isConcern: boolean) => {
        if (!isBrowser) return;
        if (isConcern) navigate(`pages/concerns/${handle}`);
        else navigate(`pages/collections/${handle}`);
        setHamMenuOpen(false);
    };

    const onTabClick = (redirectLink: string, newTab?: boolean) => {
        if (!isBrowser) return;
        if (newTab) window.open(redirectLink);
        else navigate(redirectLink);
        setHamMenuOpen(false);
    };

    useEffect(() => {
        if (!isBrowser) return;
        fetch('/api/cart')
            .then((response) => response.json())
            .then((data) => console.log(data, 'cart API response'));
    }, []);

    return (
        <div id="shopify-section-new-header" className="shopify-section">
            {state && <QAB />}
            <section className="oz-site-main-header">

                {/* Top Header */}
                <div className="top-header-sec">
                    <div className="top-header-left">
                        <div className="top-header-left-sec search-open">
                            <div className="head-logo-box">
                                <button
                                    onClick={() => OZHamburgerTab()}
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

                            {/* Search */}
                            <div className="oz-header-search oz-header-search-v2 oz-dropdown" id="oz-header-search-v2">
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
                                </form>
                                <img
                                    src="https://www.oziva.in/cdn/shop/t/94/assets/oz-search-icon.svg?v=129237872824969753481659078742"
                                    alt="Search for products"
                                    className="oz-search-icon-head"
                                />
                                <ul id="predictive-dropdown-menu" className="oz-dropdown-menu search-results oz-dropdown-v2-menu hide-on-mobile" />
                            </div>
                        </div>
                    </div>

                    {/* Top Header Right */}
                    <dl className="top-header-right">
                        <dd className="oz-dropdown user-icon hide-on-mobile">
                            <button className="p-0 border-0 bg-white">
                                <img
                                    src="https://www.oziva.in/cdn/shop/t/94/assets/web_menu_my_account.svg?v=177956948277046940621659078741"
                                    alt="My Account"
                                />
                            </button>
                            <ul className="oz-dropdown-menu">
                                <li>
                                    <button onClick={() => onTabClick('/pages/order-history')}>
                                        Track Orders
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => onTabClick('/pages/contact-us')}>
                                        Contact Us
                                    </button>
                                </li>
                                {!isLoggedIn ? (
                                    <li className="list-item login">
                                        <button onClick={LoginHandlerCaller}>Login</button>
                                    </li>
                                ) : (
                                    <li className="list-item logout">
                                        <button onClick={LogoutHandlerCaller}>Logout</button>
                                    </li>
                                )}
                            </ul>
                        </dd>
                        <dd>
                            <button onClick={() => onTabClick('/cart')} className="moe-click oz-header-search top-nav-cart-icon p-0 border-0 bg-white">
                                <img
                                    src="https://www.oziva.in/cdn/shop/t/94/assets/web_menu_cart.svg?v=157288753488333922401659078741"
                                    width={25}
                                    alt="Cart Icon"
                                />
                                {cartTotal > 0 && (
                                    <div id="CartCount">
                                        <span className="oz-cart-badge">{cartTotal}</span>
                                    </div>
                                )}
                            </button>
                        </dd>
                    </dl>
                </div>

                {/* Hamburger Menu */}
                <div className={`oz-menu-sec ${hamMenuOpen ? 'oz-menu-open' : ''}`} id="OZHamburgerMenu">
                    <button onClick={() => OZHamburgerTab()} className="d-none close-ozHamburgerTab" />
                    <div className="oz-menu-container">

                        {/* Hamburger Menu: Concerns */}
                        <ul className="oz-menu-listing">
                            <li className="sub-menu-links oz-dropdown-menu">
                                <button onClick={() => setConcernsTabOpen(prev => !prev)}>Concern</button>
                                <ul className={`oz-sub-menu ${concernsTabOpen ? 'active' : ''}`}>
                                    {concerns.map(item => (
                                        <li key={item.handle}>
                                            <button onClick={() => handleConcernClick(item.handle, true)}>{item.name}</button>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {/* Hamburger Menu: Categories */}
                            <li className="sub-menu-links oz-dropdown-menu">
                                <button onClick={() => setCategoriesTabOpen(prev => !prev)}>Categories</button>
                                <ul className={`oz-sub-menu ${categoriesTabOpen ? 'active' : ''}`}>
                                    {categories.map(item => (
                                        <li key={item.handle}>
                                            <button onClick={() => handleConcernClick(item.handle, false)}>{item.name}</button>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {/* Explore Section */}
                            <li className="sub-menu-links oz-dropdown-menu">
                                <button>Explore</button>
                                <ul className="oz-sub-menu">
                                    <li>
                                        <button onClick={() => onTabClick('/pages/my-oziva-cash')}>OZiva Cash & Offers</button>
                                    </li>
                                    <li>
                                        <button onClick={() => onTabClick('https://blog.oziva.in/', true)}>Be Bettr Blog</button>
                                    </li>
                                    <li>
                                        <button onClick={() => onTabClick('/pages/oziva-behtar-vikas-program')}>Kisaan Vikas Program</button>
                                    </li>
                                </ul>
                            </li>

                            {/* Build Your Box */}
                            <li>
                                <button onClick={() => onTabClick('/collections/build-your-box')}>
                                    Build Your Box <span style={{ color: "#F04E23" }}>@1199</span>
                                </button>
                            </li>

                            {/* WhatsApp Help */}
                            <li>
                                <button onClick={() => onTabClick('https://api.whatsapp.com/send/?phone=917400492021&text=Hi&type=phone_number&app_absent=0', true)}>
                                    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.4 0H3.6C1.61177 0 0 1.61177 0 3.6V20.4C0 22.3882 1.61177 24 3.6 24H20.4C22.3882 24 24 22.3882 24 20.4V3.6C24 1.61177 22.3882 0 20.4 0Z" fill="#25D366" />
                                        <path d="M5.37794 19L6.08808 15.7135C5.17534 14.2785 4.81928 12.5609 5.0867 10.8828C5.35412 9.20473 6.22664 7.68159 7.54057 6.59915C8.85449 5.51671 10.5195 4.94936 12.2233 5.00355C13.927 5.05774 15.5523 5.72975 16.7944 6.89348C18.0364 8.05722 18.8097 9.6327 18.9693 11.3244C19.1288 13.016 18.6636 14.7075 17.6609 16.0816C16.6583 17.4557 15.187 18.4179 13.5233 18.7876C11.8595 19.1574 10.1176 18.9093 8.62431 18.0899L5.37794 19Z" fill="#25D366" stroke="white" />
                                        <path d="M14.5407 12.94C14.3885 12.8389 14.2364 12.7884 14.0842 12.9906L13.4755 13.7996C13.3233 13.9007 13.2219 13.9513 13.019 13.8501C12.2581 13.4456 11.1929 12.9906 10.2799 11.4738C10.2291 11.2715 10.3306 11.1704 10.432 11.0693L10.8885 10.3614C10.99 10.2603 10.9393 10.1592 10.8885 10.0581L10.2799 8.59179C10.1277 8.1873 9.97551 8.23786 9.82334 8.23786H9.41754C9.31609 8.23786 9.11319 8.28842 8.91029 8.49067C7.79435 9.60301 8.25087 11.1704 9.06247 12.1816C9.21464 12.3839 10.2291 14.2041 12.4103 15.1647C14.0335 15.8726 14.3885 15.7715 14.8451 15.6703C15.403 15.6198 15.961 15.1647 16.2146 14.7097C16.2653 14.558 16.519 13.9007 16.3161 13.7996" fill="white" />
                                    </svg>
                                    Help
                                </button>
                            </li>
                        </ul>

                    </div>
                </div>

            </section>

            {/* Chatwoot */}
            {state && isBrowser && <ChatwootView />}
        </div>
    );
};

export default HeaderV1;