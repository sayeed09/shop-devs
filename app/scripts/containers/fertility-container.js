import { createRoot } from 'react-dom/client';
import React from "react";
import FertilityView from "../views/fertility";


const rootEl = document.getElementById("fertility-container");
const root = createRoot(rootEl); 

root.render(<FertilityView />);
