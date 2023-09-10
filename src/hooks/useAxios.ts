import { baseURL } from '@/api/api';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export function useAxios(
    param: string,
    isRefeching: boolean = false,
    isInitialFetch: boolean = true
) {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const intialFetchRef = useRef(isInitialFetch);
    let intervalId = null;

    axios.defaults.baseURL = baseURL;

    const fetchData = async (param: string) => {
        try {
            setLoading(true);
            const result = await axios(param);
            setResponse(result.data);
            intialFetchRef.current = false;
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Note: run initial fetch, depending of isInitialFetch flag
        if (!!intialFetchRef?.current) {
            fetchData(param);
            return;
        }

        // Note: re-run fetch, depending of isRefeching flag
        if (!!isRefeching) {
            intervalId = setInterval(async () => {
                setLoading(true);

                try {
                    setLoading(true);
                    const result = await axios(param);
                    setResponse(result.data);
                } catch (error: any) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            }, 60000); // NOTE: refetch on every 1 minute
            return;
        }

        return () => {
            clearInterval(intervalId!);
            setLoading(false);
        };
    }, []);

    return { response, loading, error };
}
