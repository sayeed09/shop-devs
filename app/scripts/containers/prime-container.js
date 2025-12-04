import { createRoot } from 'react-dom/client';
import React from "react";
import Prime from "../views/prime";


const rootEl = document.getElementById("prime-container");
const root = createRoot(rootEl); 

root.render(<Prime />, rootEl);
