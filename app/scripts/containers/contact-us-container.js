import { createRoot } from 'react-dom/client';
import React from "react";
import ContactUs from "../views/contact-us";

const rootEl = document.getElementById("contact-us-container");
const root = createRoot(rootEl); 

root.render(<ContactUs />, rootEl);
