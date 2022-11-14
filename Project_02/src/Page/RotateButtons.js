// Jordan Edginton
import React, {Fragment, useState} from 'react';
import Box from '@mui/material/Box';
import {backdropClasses, Grid} from "@mui/material";

const LetterBox = (props) => {

    const {arrow} = props;
    return (
        <Box sx={{
            width: 50,
            height: 25,
            borderColor: 'black',
            textAlign: 'center',
        }}>
            {arrow}
        </Box>
    )
}

const RotateButton = (props) => {

    const {onClickCallBack} = props;

    return (
        <Fragment>
            <Grid container columns={4}

                  sx={{
                      width: 400,
                      height: 25,
                      mt: 1,
                      alignSelf: 'center',
                      borderColor: 'black',
                      alignContent: 'center',
                      columnGap: 7.2

                  }}
            >
                <Grid item
                    width={55}
                      height={25}
                      fontSize={26}
                      onClick={() => onClickCallBack(0, 'left')}
                >
                    <LetterBox arrow={'<--'}/>
                </Grid>

                <Grid item
                      width={55}
                      fontSize={26}
                      onClick={() => onClickCallBack(0, 'right')}
                >
                    <LetterBox arrow={'-->'}/>
                </Grid>

                <Grid item
                      width={55}
                      fontSize={26}
                      onClick={() => onClickCallBack(1, 'left')}
                >
                    <LetterBox arrow={'<--'}/>
                </Grid>

                <Grid item
                      width={55}
                      fontSize={26}
                      onClick={() => onClickCallBack(1, 'right')}
                >
                    <LetterBox arrow={'-->'}/>
                </Grid>

            </Grid>
        </Fragment>
    )
}

export default RotateButton;
