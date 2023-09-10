import { config } from '@/config';
import { CurrencySelectionContext } from '@/context/CurrencySelectionContext';
import { useAxios } from '@/hooks/useAxios';
import { Currencies } from '@/types/currenciesEnum';
import { Description, ICryptoCurrency, Image } from '@/types/types';
import Loader from '@/ui-components/loader/Loader';
import { formatDate } from '@/utils/formatDate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Grid } from '@mui/material';
import {
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { useNavigate, useParams } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
    Tooltip
);

type MarketChart = {
    prices: Prices[];
};

type Prices = [number, number];

const currencySymbols = {
    [Currencies.EUR]: '€',
    [Currencies.USD]: '$',
    [Currencies.GBP]: '£',
};

const CryptoCurrencyDetails = () => {
    const { currencyId } = useParams();
    const { currency } = useContext(CurrencySelectionContext);
    const navigate = useNavigate();
    const { response, loading } = useAxios(
        `coins/${currencyId}/market_chart?vs_currency=${currency}&days=${config.DAYS_NUMBER}`
    );
    const { response: currencyDetails, loading: currencyDetailsLoading } =
        useAxios(
            `coins/${currencyId}?localization=false&tickers=false&market_data=false&community_data=false&sparkline=false`
        );

    if (!response || !currencyDetails) {
        return <Loader isLoading={loading || currencyDetailsLoading} />;
    }
    const currencyDetailsData = currencyDetails as ICryptoCurrency;
    const marketChartData = response as MarketChart;
    const coinChartData = marketChartData.prices.map((value) => ({
        timestamp: formatDate(value[0]),
        price: value[1],
    }));

    const options: ChartOptions = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        let label =
                            (context.formattedValue &&
                                `${currencySymbols[currency]}${context?.formattedValue}`) ||
                            '';
                        return label;
                    },
                    labelColor: function () {
                        return {
                            borderColor: 'rgb(0, 0, 255)',
                            backgroundColor: 'rgb(255, 0, 0)',
                            labelColor: '#fff',
                            borderWidth: 2,
                            borderDash: [2, 2],
                            borderRadius: 2,
                        };
                    },
                    labelTextColor: function () {
                        return '#fff';
                    },
                },
            },
        },
    };

    const data = {
        labels: coinChartData.map((value) => value.timestamp),
        datasets: [
            {
                fill: true,
                label: currencyId,
                data: coinChartData.map((value) => value.price),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, .5)',
            },
        ],
    };

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                sx={{
                    width: '100%',
                    height: '70px',
                    borderBottom: '1px solid #ccc',
                    position: 'sticky',
                    top: 0,
                }}
            >
                <ArrowBackIcon
                    sx={{ padding: 4, cursor: 'pointer', fontSize: 24 }}
                    onClick={() => navigate('/')}
                />
            </Box>
            <Grid container p={4}>
                <Line options={options} data={data} height={70} />
                <Box display="flex" alignItems="center" gap={2} mt={4} mb={4}>
                    <h3>
                        {currencyDetailsData
                            ? currencyDetailsData?.id.toUpperCase()
                            : ''}
                    </h3>
                    <img
                        width={50}
                        height={50}
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
        </>
    );
};

export default CryptoCurrencyDetails;
