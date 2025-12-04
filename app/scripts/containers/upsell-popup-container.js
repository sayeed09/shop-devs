import { createRoot } from 'react-dom/client';
import React from "react";
import UpsellCartToast from "../views/upsell-cart-toast/upsellCartToast";

const rootEl = document.getElementById("upsell-popup-container");
const root = createRoot(rootEl); 

root.render(<UpsellCartToast />, rootEl);
