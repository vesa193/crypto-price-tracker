export const formatCurrency = (currencyType: string) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyType,
    });
