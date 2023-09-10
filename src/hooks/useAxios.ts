import { baseURL } from '@/api/api';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function useAxios(param: string) {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    axios.defaults.baseURL = baseURL;

    const fetchData = async (param: string) => {
        try {
            setLoading(true);
            const result = await axios(param);
            setResponse(result.data);
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(param);
    }, []);

    return { response, loading, error };
}
