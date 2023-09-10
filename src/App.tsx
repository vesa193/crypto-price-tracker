import { Grid } from '@mui/material';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './App.css';
import { baseURL } from './api/api';
import { Currencies } from './configTypes';
import TableData from './ui-components/data/TableData';
import SelectInput from './ui-components/form/SelectInput';
import Loader from './ui-components/loader/Loader';
import SearchAppBar from './ui-components/search-bar/SearchAppBar';

export type Image = {
    large?: string;
    small?: string;
    thumb?: string;
};

export type Description = {
    en: string;
};

export type ICryptoCurrency = {
    id: string;
    image: string | Image;
    name: string;
    symbol: string;
    current_price: number;
    description?: Description;
};

export type ICryptoCurrencyData = {
    filterCryptoCurrencyData: ICryptoCurrency[];
    currency: string;
    selectedCurrency: string;
    handleSelectCurrency: (id: string) => void;
    setSelectedCurrency: Dispatch<SetStateAction<string>>;
};

export type SelectInputProps = {
    currency: string;
    setCurrency: Dispatch<SetStateAction<Currencies>>;
};

export type SearchAppBarProps = {
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
};

function App() {
    const [currency, setCurrency] = useState(Currencies.EUR);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCurrencyId, setSelectedCurrency] = useState('');
    const [cryptoCurrencyData, setCryptoCurrencyData] = useState<
        ICryptoCurrency[]
    >([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const filterCryptoCurrencyData = cryptoCurrencyData.filter(
        (cryotoCurrency) =>
            cryotoCurrency.name
                .toLowerCase()
                .startsWith(searchTerm.toLowerCase()) ||
            cryotoCurrency.symbol
                .toLowerCase()
                .startsWith(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (cryptoCurrencyData.length === 0) {
            setIsLoading(true);

            axios
                .get(
                    `${baseURL}/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=5&page=1&sparkline=false&locale=en`
                )
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
                .get(
                    `${baseURL}/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=5&page=1&sparkline=false&locale=en`
                )
                .then((res) => {
                    setCryptoCurrencyData(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setIsLoading(false);
                });
        }, 60000); // NOTE: refetch on every 1 minute

        return () => {
            clearInterval(intervalId);
            setIsLoading(false);
        };
    }, [cryptoCurrencyData, setCryptoCurrencyData, currency, setCurrency]);

    if (error) {
        return (
            <p>{`${error}. \n You've exceeded the Rate Limit. Please visit https://www.coingecko.com/en/api/pricing to subscribe to our API plans for higher rate limits."`}</p>
        );
    }

    const handleSelectCurrency = (selectedCurrencyId: string) => {
        if (!selectedCurrencyId) return;
        const selectedCurrencyItem = cryptoCurrencyData.find(
            (cryptoCurrency) => cryptoCurrency.id === selectedCurrencyId
        );

        console.log('selectedCurrencyItem', selectedCurrencyItem);
    };

    return (
        <>
            <Loader isLoading={isLoading as boolean} />
            <SearchAppBar {...{ searchTerm, setSearchTerm }} />
            <Grid container flexDirection="row" p={4}>
                <Grid item xs={12} sm={12} md={12}>
                    <SelectInput {...{ currency, setCurrency }} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TableData
                        {...({
                            filterCryptoCurrencyData,
                            currency,
                            handleSelectCurrency,
                            setSelectedCurrency,
                            selectedCurrency: selectedCurrencyId,
                        } as ICryptoCurrencyData)}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;
