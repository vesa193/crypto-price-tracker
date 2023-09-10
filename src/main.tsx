import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router/router';
import { CurrencySelectionProvider } from './context/CurrencySelectionContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CurrencySelectionProvider>
            <RouterProvider router={router} />
        </CurrencySelectionProvider>
    </React.StrictMode>
);
