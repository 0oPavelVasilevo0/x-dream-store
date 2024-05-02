import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';


export default function SelectCount() {


    const [count, setCount] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCount(event.target.value as string);
    };
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="simple-select-label">Count</InputLabel>
                <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    value={count}
                    label="count"
                    onChange={handleChange}
                >
                    <MenuItem value={10} >10</MenuItem>
                    <MenuItem value={20} >20</MenuItem>
                    <MenuItem value={30} >30</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
