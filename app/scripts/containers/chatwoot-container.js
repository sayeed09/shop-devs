import { createRoot } from 'react-dom/client';
import React from "react";
import ChatWootView from "../views/chatwoot";

const rootEl = document.getElementById("chatwoot-container");
const root = createRoot(rootEl); 

root.render(<ChatWootView />);