import React, { createContext, useState } from 'react';

type SearchCtx = {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext = createContext<SearchCtx>({
    searchValue: '',
    setSearchValue: () => {},
});

export const SearchProvider: React.FC<any> = ({ children }: any) => {
    const [searchValue, setSearchValue] = useState<string>('');

    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            {children}
        </SearchContext.Provider>
    );
};
