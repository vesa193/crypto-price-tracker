import App from '@/App';
import CryptoCurrencyDetailsPage from '@/pages/CryptoCurrencyDetailsPage';
import { createBrowserRouter } from 'react-router-dom';
import { routerPaths } from './routerPaths';

export const router = createBrowserRouter([
    {
        path: routerPaths.ROOT,
        element: <App />,
    },
    {
        path: routerPaths.CRYPTO_CURRENCY_DETAILS,
        element: <CryptoCurrencyDetailsPage />,
    },
]);
