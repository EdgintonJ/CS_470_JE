import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

const MessageCenter = (props) => {

    const {win_condition, lose_condition, word_to_solve} = props;
    const word = word_to_solve.join('')
    let message = '';
    if (win_condition)
        message = 'You win!'
    else if (lose_condition)
        message = "Good try, the word was: " + word;

    return (
        <Fragment>
            <Box sx={{mt: 2, mb: 5}}
                 alignSelf={'center'}
            >
            <Typography variant='h5'>
                {message}
            </Typography>
            </Box>
        </Fragment>
    )
}
export default MessageCenter;