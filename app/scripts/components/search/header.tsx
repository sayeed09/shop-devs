import React, { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import { OPTIONS } from "../../utils/search/search";
import { cartService } from "../../services/cart";

interface Props {
    searchTerm: string;
    setSearchTerm: (txt: string) => void
    onBackClicked: (closeModal: boolean) => void;
    refetchCart: boolean;
}
const Header = ({ searchTerm, setSearchTerm, onBackClicked, refetchCart }: Props) => {
    const [cartItemsCount, setCartItemCount] = useState(0);
    useEffect(() => {
        if (cartItemsCount == 0) {
            fetchCart()
        }
    }, [refetchCart])
    const fetchCart = async () => {
        const cartItems = await cartService.getCartItems();
        setCartItemCount(cartItems?.item_count as number);
    }
    return <div className="header-container">
        <img onClick={() => onBackClicked(false)} className="back-icon" src="https://cdn.shopify.com/s/files/1/2393/2199/files/expand_more.svg?v=1727243438" />
        <div className="search-input">
            <span className="search-icon"><img src="https://www.oziva.in/cdn/shop/t/102/assets/oz-search-icon.svg?v=129237872824969753481723961230" /></span>
            <ReactTyped parseRef={(ref) => ref.current.input}
                attr="placeholder"
                strings={OPTIONS.PLACEHOLDERS}
                typeSpeed={150}
                backSpeed={150}
                loop
                backDelay={150}
                showCursor
            >
                <input autoFocus type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </ReactTyped>
            {searchTerm.trim() &&
                <span onClick={() => setSearchTerm('')} className="cancel-icon"><img src="https://cdn.shopify.com/s/files/1/2393/2199/files/cancel_icon_svg_24.svg?v=1727171738" /></span>
            }
        </div>
        <div>
            <a href="/cart">
                <img className="cart-icon" src="https://www.oziva.in/cdn/shop/t/10/assets/web_menu_cart.svg?v=157288753488333922401660742015" width={25} alt="cart-icon" />
            </a>


            {cartItemsCount > 0 && <div id="CartCount">
                <span className="oz-cart-badge">{cartItemsCount}</span>
                <span className="icon__fallback-text medium-up--hide">item</span>
            </div>}
        </div>
    </div>
}
export default Header;