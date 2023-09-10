import { Description, ICryptoCurrency, Image } from '@/App';
import { useAxios } from '@/hooks/useAxios';
import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

const CryptoCurrencyDetails = () => {
    const { currencyId } = useParams();
    const { response } = useAxios(
        `coins/${currencyId}/market_chart?vs_currency=eur&days=7`
    );
    const { response: currencyDetails } = useAxios(
        `coins/${currencyId}?localization=false&tickers=false&market_data=false&community_data=false&sparkline=false`
    );

    if (!response || !currencyDetails) {
        return <p>Loading ...</p>;
    }
    const currencyDetailsData = currencyDetails as ICryptoCurrency;

    return (
        <Grid container p={4}>
            <Box display="flex" alignItems="center">
                <p>
                    {currencyDetailsData
                        ? currencyDetailsData?.id.toUpperCase()
                        : ''}
                </p>
                <img
                    width={100}
                    height={100}
                    src={(currencyDetailsData?.image as Image)?.large}
                    alt={currencyDetailsData?.id}
                />
            </Box>
            <div
                dangerouslySetInnerHTML={{
                    __html: (currencyDetailsData.description as Description)
                        ?.en,
                }}
            />
        </Grid>
    );
};

export default CryptoCurrencyDetails;
