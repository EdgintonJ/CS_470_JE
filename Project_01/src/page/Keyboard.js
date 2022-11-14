import React, {Fragment, useState} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {backdropClasses, Grid} from "@mui/material";

const LetterBox = (props) => {

    const {index, value} = props;
    const { backgroundColor } = value;
    return (
        <Box sx={{
            width: 40,
            height: 40,
            border: 1,
            borderColor: 'black',
            backgroundColor,
        }}>
            {index}
        </Box>
    )
}

const Keyboard = (props) => {

    const {onClickCallBack, allKeys, keyboardKeys} = props;

    return (
        <Fragment>
            <Grid  container columns={10}
                   sx={{
                       width: 7 * 60 + 6 * 10,
                   }}
                   alignSelf={'center'}
            >
                {
                    keyboardKeys.map((elementAttributes, idx) =>
                        <Grid item
                              key={idx}
                              xs={1}
                              sx={{mb: 1}}
                              align={'center'}
                              onClick={() => onClickCallBack(idx)}
                        >
                            <LetterBox index={allKeys[idx]} value={elementAttributes}/>
                        </Grid>
                    )
                }
            </Grid>
        </Fragment>
    )
}

export default Keyboard;