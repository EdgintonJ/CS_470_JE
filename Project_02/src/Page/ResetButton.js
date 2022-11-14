// Jordan Edginton
import React, {Fragment, useState} from 'react';
import Box from '@mui/material/Box';
import {backdropClasses, Grid} from "@mui/material";

const ResetBox = (props) => {

    const {content} = props;
    return (
        <Box sx={{
            width: 160,
            height: 40,
            border: 1,
            borderColor: 'black',
            borderRadius: '50%',
            textAlign: 'center',
            align: 'center',
        }}>
            {content}
        </Box>
    )
}

const ResetButton = (props) => {

    const {onClickCallBack} = props;

    return (
        <Fragment>
            <Grid container columns={1}
                  sx={{
                      width: 160,
                      height: 45,
                      mt: 1,
                      alignSelf: 'center'
                  }}>
                <Grid item
                    align={'center'}
                    fontSize={26}
                    onClick={() => onClickCallBack("reset")}
                >
                    <ResetBox content={"Reset game"}/>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default ResetButton;
