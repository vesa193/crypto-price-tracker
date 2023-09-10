import { Box, Grid } from '@mui/material';
import { useContext, useState } from 'react';
import './App.css';
import { CurrencySelectionContext } from './context/CurrencySelectionContext';
import { useAxios } from './hooks/useAxios';
import { ICryptoCurrency, ICryptoCurrencyData } from './types/types';
import TableData from './ui-components/data/TableData';
import SelectInput from './ui-components/form/SelectInput';
import Loader from './ui-components/loader/Loader';
import SearchAppBar from './ui-components/search-bar/SearchAppBar';
import { config } from './config';
import { SearchContext } from './context/SearchContext';

function App() {
    const { searchValue } = useContext(SearchContext);
    const { currency, setCurrency } = useContext(CurrencySelectionContext);
    const [selectedCurrencyId, setSelectedCurrency] = useState('');
    const {
        response: cryptoCurrencyData,
        loading,
        error,
    } = useAxios(
        `coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=${
            config.PER_PAGE
        }&page=1&sparkline=false&locale=en`,
        true,
        true
    );
    const filterCryptoCurrencyData = (
        cryptoCurrencyData! as ICryptoCurrency[]
    )?.filter(
        (cryotoCurrency: ICryptoCurrency) =>
            cryotoCurrency.name
                .toLowerCase()
                .startsWith(searchValue.toLowerCase()) ||
            cryotoCurrency.symbol
                .toLowerCase()
                .startsWith(searchValue.toLowerCase())
    );

    if (error) {
        return (
            <Box p={4}>
                <p>{`${error}. \n You've exceeded the Rate Limit. Please visit https://www.coingecko.com/en/api/pricing to subscribe to our API plans for higher rate limits."`}</p>
            </Box>
        );
    }

    return (
        <>
            <Loader isLoading={loading as boolean} />
            <SearchAppBar />
            <Grid container flexDirection="row" p={4}>
                <Grid item xs={12} sm={12} md={12}>
                    <SelectInput {...{ currency, setCurrency }} />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TableData
                        {...({
                            filterCryptoCurrencyData,
                            currency,
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
