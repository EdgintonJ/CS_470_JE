// Jordan Edginton
import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

const MessageCenter = (props) => {

    const {gameState, have_winner} = props;
    let message = '';
    if (have_winner)
        message = gameState.player_turn + ' wins!'
    else{
        if (gameState.rotate_phase)
            message = gameState.player_turn + "'s turn: rotate phase"
        else
            message = gameState.player_turn + "'s turn: play phase"
    }

    return (
        <Fragment>
            <Box sx={{mt: 5, mb: 1}}
                 alignSelf={'center'}
            >
            <Typography variant='h4'>
                {message}
            </Typography>
            </Box>
        </Fragment>
    )
}

export default MessageCenter;