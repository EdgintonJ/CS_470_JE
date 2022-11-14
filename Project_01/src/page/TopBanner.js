import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TopBanner = (props) => {

    return (
        <Fragment>
            <Box sx={{mt: 2, mb: 7}}
                 alignSelf={'center'}
            >
            <Typography variant='h5'>
                CS-470 Wordle Jordan Edginton
            </Typography>
            </Box>
        </Fragment>
    )
}

export default TopBanner;