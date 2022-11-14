// Jordan Edginton
import React, {Fragment, useState} from 'react';
import Box from '@mui/material/Box';
import {backdropClasses, Grid} from "@mui/material";

const GameBox = (props) => {

    const {cell} = props;
    return (
        <Box sx={{
            width: 40,
            height: 40,
            border: 1,
            borderColor: 'black',
            backgroundColor: cell.color,
            borderRadius: '50%',
        }}/>
    )
}

const GameBoard = (props) => {
    const {gameGrid, onClickCallBack} = props;
    return (
        <Fragment>
            <Grid container columns={2}
                  sx={{
                      width: 420,
                      mt: 0,
                      alignSelf: 'center',
                      columnGap: 2,
                  }}
            >
                <Grid container columns={3}
                      sx={{
                          width: 200,
                          height: 200,
                          mt: 2,
                          border: 1,
                          direction: "row",
                          alignItems: "flex-end",
                          justify: "center"
                      }}
                >
                    {
                        gameGrid[0].slice().map((elementAttributes, idx) =>
                                <Grid item
                                      key={idx}
                                      xs={1}
                                      sx={{mb: 1}}
                                      align={"center"}
                                      onClick={() => onClickCallBack(0, 0, idx)}
                                >
                                    <GameBox cell={elementAttributes}/>
                                </Grid>
                            )
                        }
                </Grid>

                <Grid container columns={3}
                      sx={{
                          width: 200,
                          height: 200,
                          mt: 2,
                          border: 1,
                          direction: "row",
                          alignItems: "flex-end",
                          justify: "center"
                      }}
                >
                    {
                        gameGrid[1].slice().map((elementAttributes, idx) =>
                            <Grid item
                                  key={idx}
                                  xs={1}
                                  sx={{mb: 1}}
                                  align={"center"}
                                  onClick={() => onClickCallBack(0, 1, idx)}
                            >
                                <GameBox cell={elementAttributes}/>
                            </Grid>
                        )
                    }
                </Grid>

                <Grid container columns={3}
                      sx={{
                          width: 200,
                          height: 200,
                          mt: 2,
                          border: 1,
                          direction: "row",
                          alignItems: "flex-end",
                          justify: "center"
                      }}
                >
                    {
                        gameGrid[2].slice().map((elementAttributes, idx) =>
                            <Grid item
                                  key={idx}
                                  xs={1}
                                  sx={{mb: 1}}
                                  align={"center"}
                                  onClick={() => onClickCallBack(1, 0, idx)}
                            >
                                <GameBox cell={elementAttributes}/>
                            </Grid>
                        )
                    }
                </Grid>

                <Grid container columns={3}
                      sx={{
                          width: 200,
                          height: 200,
                          mt: 2,
                          alignSelf: 'center',
                          align: 'center',
                          border: 1,
                          direction: "row",
                          alignItems: "flex-end",
                          justify: "center"
                      }}
                >
                    {
                        gameGrid[3].slice().map((elementAttributes, idx) =>
                            <Grid item
                                  key={idx}
                                  xs={1}
                                  sx={{mb: 1}}
                                  align={"center"}
                                  onClick={() => onClickCallBack(1, 1, idx)}
                            >
                                <GameBox cell={elementAttributes}/>
                            </Grid>
                        )
                    }
                </Grid>

            </Grid>
        </Fragment>
    )
}

export default GameBoard;
