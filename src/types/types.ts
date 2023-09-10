import { Currencies } from '@/types/currenciesEnum';
import { Dispatch, SetStateAction } from 'react';

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
