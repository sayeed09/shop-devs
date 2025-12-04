import { createRoot } from 'react-dom/client';
import React from "react";
import Home from "../views/home";

const rootEl = document.getElementById("home-container");
const root = createRoot(rootEl);

root.render(<Home />, rootEl);