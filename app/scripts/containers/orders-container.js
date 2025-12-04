import { createRoot } from 'react-dom/client';
import React from "react";
import  OrdersView from '../views/orders'

const rootEl = document.getElementById("orders-container");
const root = createRoot(rootEl);

root.render(<OrdersView />);
