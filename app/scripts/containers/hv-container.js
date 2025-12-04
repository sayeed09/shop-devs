import React from 'react';
import HairVitaminView from '../views/hair-vitamin/index';
import { createRoot } from 'react-dom/client';

const rootEl = document.getElementById("hv-container");
const root = createRoot(rootEl); 

root.render(<HairVitaminView />);