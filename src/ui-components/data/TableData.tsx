import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Toolbar from '@mui/material/Toolbar';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Typography } from '@mui/material';
import { ICryptoCurrency } from '@/App';

function TableData({ cryptoCurrencyData }: any) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <Toolbar>
                        <Typography variant="h5">Crypto Currencies</Typography>
                    </Toolbar>
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
                    {cryptoCurrencyData.map(
                        (cryptoCurrency: ICryptoCurrency) => (
                            <TableRow
                                key={cryptoCurrency.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <Avatar
                                        alt={cryptoCurrency?.name}
                                        src={cryptoCurrency?.image}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {cryptoCurrency?.name}
                                </TableCell>
                                <TableCell align="left">
                                    {cryptoCurrency?.symbol}
                                </TableCell>
                                <TableCell align="left">
                                    {cryptoCurrency?.current_price}
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
