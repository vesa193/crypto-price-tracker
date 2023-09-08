import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { baseURL } from './api/api';
import TableData from './ui-components/data/TableData';
import Loader from './ui-components/loader/Loader';

export type ICryptoCurrency = {
    id: string;
    image: string;
    name: string;
    symbol: string;
    current_price: number;
};

export type CryptoCurrencyData = {
    cryptoCurrencyData: ICryptoCurrency[];
};

function App() {
    const [cryptoCurrencyData, setCryptoCurrencyData] = useState<
        ICryptoCurrency[]
    >([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (cryptoCurrencyData.length === 0) {
            setIsLoading(true);

            axios
                .get(baseURL)
                .then((res) => {
                    setCryptoCurrencyData(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setIsLoading(false);
                });
            return;
        }

        const intervalId = setInterval(() => {
            setIsLoading(true);

            axios
                .get(baseURL)
                .then((res) => {
                    setCryptoCurrencyData(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setIsLoading(false);
                });
        }, 180000); // NOTE: refetch on every 3 minutes

        return () => {
            clearInterval(intervalId);
            setIsLoading(false);
        };
    }, [cryptoCurrencyData, setCryptoCurrencyData]);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <Loader isLoading={isLoading as boolean} />
            <Grid container>
                <TableData
                    cryptoCurrencyData={cryptoCurrencyData as ICryptoCurrency[]}
                />
            </Grid>
        </>
    );
}

export default App;
