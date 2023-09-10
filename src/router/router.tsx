import App from '@/App';
import CryptoCurrencyDetailsPage from '@/pages/CryptoCurrencyDetailsPage';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: ':currencyId',
        element: <CryptoCurrencyDetailsPage />,
    },
]);
