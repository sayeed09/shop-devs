import { createRoot } from 'react-dom/client';
import React from "react";
import ProductAdviceView from "../views/product-advice";

const rootEl = document.getElementById("product-advice-container");
const root = createRoot(rootEl); 

root.render(<ProductAdviceView />, rootEl);