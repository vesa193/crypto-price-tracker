import App from '@/App';
import CryptoCurrencyDetails from '@/pages/CryptoCurrencyDetails';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: 'crypto-currency/:currencyId',
        element: <CryptoCurrencyDetails />,
    },
]);
