import { createRoot } from 'react-dom/client';
import React from "react";
import CartView from "../views/cart";

const rootEl = document.getElementById("cart-container");
const root = createRoot(rootEl); 

root.render(<CartView />);
