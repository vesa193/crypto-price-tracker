import { useAxios } from '@/hooks/useAxios';
import { useParams } from 'react-router-dom';

const CryptoCurrencyDetails = () => {
    const { currencyId } = useParams();
    const { response } = useAxios(
        `coins/${currencyId}/market_chart?vs_currency=eur&days=7`
    );

    console.log('response', response);
    return <p>Currency</p>;
};

export default CryptoCurrencyDetails;
