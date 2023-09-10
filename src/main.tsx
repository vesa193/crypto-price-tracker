import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router/router';
import { CurrencySelectionProvider } from './context/CurrencySelectionContext';
import { SearchProvider } from './context/SearchContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CurrencySelectionProvider>
            <SearchProvider>
                <RouterProvider router={router} />
            </SearchProvider>
        </CurrencySelectionProvider>
    </React.StrictMode>
);
