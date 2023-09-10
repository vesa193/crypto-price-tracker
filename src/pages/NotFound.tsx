import { Box } from '@mui/material';
import { useRouteError } from 'react-router-dom';

const NotFound = () => {
    const error: any = useRouteError();
    return (
        <Box display="flex" justifyContent="center">
            <h4>{error.status === '404' ? 'Not Found Page' : ''}</h4>
        </Box>
    );
};

export default NotFound;
