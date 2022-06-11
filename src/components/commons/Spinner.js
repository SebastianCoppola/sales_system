import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = () => {
    return (
        <Box sx={{ display:'flex'}} style= {{margin:'auto'}}>
            <CircularProgress />
        </Box>
    )
}

export default Spinner;