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

const GuessArea = (props) => {

    const {activeRow, completedRows, remainingRows} = props;
    const allBoxes = [...completedRows, ...activeRow, ...remainingRows];

    return (
        <Fragment>
            <Grid  container columns={5}
                   sx={{
                       width: 5 * 40 + 4 * 10,
                   }}
                   alignSelf={'center'}
            >
                {
                    allBoxes.map((elementAttributes, idx) =>
                        <Grid item
                              key={idx}
                              xs={1}
                              sx={{mb: 1}}
                              align={"center"}
                              fontSize={26}
                        >
                            <LetterBox index={elementAttributes.item} value={elementAttributes}/>
                        </Grid>
                    )
                }

            </Grid>
        </Fragment>
    )
}

export default GuessArea;

/*{
    completedRows.map((elementAttributes, idx) =>
        <Grid item
              key={idx}
              xs={1}
              sx={{mb: 1}}
            // onClick={() => onClickCallBack(idx)}
        >
            <LetterBox index={completedRows[idx]} value={elementAttributes}/>
        </Grid>
    )
}
{
    activeRow.map((elementAttributes, idx) =>
        <Grid item
              key={idx}
              xs={1}
              sx={{mb: 1}}
            // onClick={() => onClickCallBack(idx)}
        >
            <LetterBox index={idx} value={elementAttributes}/>
        </Grid>
    )
}
{
    remainingRows.map((elementAttributes, idx) =>
        <Grid item
              key={idx}
              xs={1}
              sx={{mb: 1}}
            // onClick={() => onClickCallBack(idx)}
        >
            <LetterBox  value={elementAttributes}/>
        </Grid>
    )
}*/