import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';

type ILoader = {
    isLoading: boolean;
};

function Loader({ isLoading }: ILoader) {
    if (!isLoading) return null;

    return (
        <Backdrop
            sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

Loader.displayName = 'Loader';

export default Loader;
