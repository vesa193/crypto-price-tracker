import { ICryptoCurrency, ICryptoCurrencyData } from '@/App';
import { formatCurrency } from '@/utils/formatCurrency';
import { Avatar } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

function TableData({
    filterCryptoCurrencyData,
    currency,
}: ICryptoCurrencyData) {
    const navigate = useNavigate();

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <Toolbar>Crypto Currencies</Toolbar>
                    <TableRow>
                        <TableCell align="left">
                            <strong>Logo</strong>
                        </TableCell>
                        <TableCell align="left">
                            <strong>Name</strong>
                        </TableCell>
                        <TableCell align="left">
                            <strong>Symbol</strong>
                        </TableCell>
                        <TableCell align="left">
                            <strong>Current price</strong>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterCryptoCurrencyData.map(
                        (cryptoCurrency: ICryptoCurrency) => (
                            <TableRow
                                key={cryptoCurrency.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                                onClick={() => {
                                    navigate(cryptoCurrency.id);
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <Avatar
                                        alt={cryptoCurrency?.name}
                                        src={cryptoCurrency?.image as string}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {cryptoCurrency?.name}
                                </TableCell>
                                <TableCell align="left">
                                    {cryptoCurrency?.symbol}
                                </TableCell>
                                <TableCell align="left">
                                    {formatCurrency(currency).format(
                                        cryptoCurrency?.current_price
                                    )}
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

TableData.displayName = 'TableData';

export default TableData;
