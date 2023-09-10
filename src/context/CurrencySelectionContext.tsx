import { Currencies } from '@/types/currenciesEnum';
import React, { createContext, useState } from 'react';

type ICurrency = Currencies.EUR | Currencies.USD | Currencies.GBP;

type CurrencyCtx = {
    currency: ICurrency;
    setCurrency: React.Dispatch<React.SetStateAction<Currencies>>;
};

export const CurrencySelectionContext = createContext<CurrencyCtx>({
    currency: Currencies.EUR,
    setCurrency: () => {},
});

export const CurrencySelectionProvider: React.FC<any> = ({ children }: any) => {
    const [currency, setCurrency] = useState(Currencies.EUR);

    return (
        <CurrencySelectionContext.Provider value={{ currency, setCurrency }}>
            {children}
        </CurrencySelectionContext.Provider>
    );
};
