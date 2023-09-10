import { SelectInputProps } from '@/App';
import { Currencies } from '@/types/currenciesEnum';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function SelectInput({ currency, setCurrency }: SelectInputProps) {
    const handleChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value as Currencies);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currency}
                    label="Currency"
                    onChange={handleChange}
                >
                    <MenuItem value="EUR">€ EUR</MenuItem>
                    <MenuItem value="USD">$ USD</MenuItem>
                    <MenuItem value="GBP">£ GBP</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

SelectInput.displayName = 'SelectInput';

export default SelectInput;
