import { createRoot } from 'react-dom/client';
import React from "react";
import QuizView from "../views/quiz";

const rootEl = document.getElementById("quiz-container");
const root = createRoot(rootEl); 

root.render(<QuizView />, rootEl);
