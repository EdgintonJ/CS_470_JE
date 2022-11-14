// Jordan Edginton
import React, {Fragment, useState} from 'react';
import Box from '@mui/material/Box';

import MessageCenter from "./Page/MessageCenter";
import TopBanner from "./Page/TopBanner";
import GameBoard from "./Page/GameBoard";
import ResetButton from "./Page/ResetButton";
import RotateButton from "./Page/RotateButtons";
import {advanceGameState, createInitialBoard, updateBoard, createInitialGameState, rotateGrid} from "./Reducers";
import {doWeHaveAWinnerPlayPhase, doWeHaveAWinnerRotatePhase} from "./doWeHaveAWinner";

function App() {

  const [gameState, setGameState] = useState(createInitialGameState);   // whos turn/what phase is it currently?

  const [gameGrid, setGameGrid] = useState(createInitialBoard);         // The game board

  const [have_winner, set_have_winner] = useState(false)       // Do we have a winner

    const gameBoardClickCallBack = (row, col, idx) => {
        // this is the callback for the "play" phase of the game. We check if the gamestate is not in the rotate phase
        // and that there is no winner yet. We then check the gamegrid to see if the new item is a winning combination.
        // if so, we update the have_winner usestate. If not, we update the gamestate and continue.
        if (have_winner === false && !gameState.rotate_phase && !gameGrid[row * 2 + col][idx].isOccupied){
            setGameGrid(updateBoard(gameGrid, gameState, (row * 2 + col), idx))
            if (doWeHaveAWinnerPlayPhase(gameState.player_turn, gameGrid, row * 2 + col, idx)){
                set_have_winner(true)
            }
            else
                setGameState(advanceGameState(gameState))
        }
    }

    const resetClickCallBack = () => {
        // This is a complete reset of the game. We set the board and gamestate back to their initial states, and
        // change the have_winner usestate to false
        setGameGrid(createInitialBoard)
        setGameState(createInitialGameState)
        set_have_winner(false)
    }

    const rotateTopClickCallBack = (col, dir) => {
        // This is the callback function for rotating a top row subgrid. We check if there is a winner,
        // then we make sure that the game is in the rotate phase. If both are met, we rotate the game grid and update
        // its usestate, then we check if there is a winning combination on the board. if so, we update
        // the have_winner usestate. If not, we update the gamestate and continue.

        if (have_winner === false && gameState.rotate_phase){
            setGameGrid(rotateGrid(gameGrid, col, dir))
            if (doWeHaveAWinnerRotatePhase(gameState.player_turn, gameGrid, col, dir))
                set_have_winner(true)
            else
                setGameState(advanceGameState(gameState))
        }
    }

    const rotateBottomClickCallBack = (col, dir) => {
        // This is the callback function for rotating a bottom row subgrid. This is the same as
        // rotateTopClickCallBack(), with some extra calculations. I wanted to use the same grid for both
        // rotate arrows on the board, but needed to have an extra function to apply the rotation to the
        // second row subgrid (hence why the subgrid sent to the check win is col + 2).

        if (have_winner === false && gameState.rotate_phase){
            // during my testing I was getting confused when having the rotation being the same for both the
            // top and bottom grids. Here I just reverse the rotation, which is less confusing when playing (for me).
            let dirr = ''
            if (dir === 'left')
                dirr = 'right'
            else
                dirr = 'left'

            setGameGrid(rotateGrid(gameGrid, col + 2, dirr))
            if (doWeHaveAWinnerRotatePhase(gameState.player_turn, gameGrid, col + 2, dirr))
                set_have_winner(true)
            else
                setGameState(advanceGameState(gameState))
        }
    }


  return (
      <Fragment>
        <Box margin='auto'
             sx={{
               height: 600,
               width: 800,
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'flex-top ',
             }}
        >
            <TopBanner/>
            <RotateButton onClickCallBack={rotateTopClickCallBack}/>
            <GameBoard gameGrid={gameGrid} onClickCallBack={gameBoardClickCallBack}/>
            <RotateButton onClickCallBack={rotateBottomClickCallBack}/>
            <MessageCenter gameState={gameState} have_winner={have_winner}/>
            <ResetButton onClickCallBack={resetClickCallBack}/>
        </Box>
      </Fragment>
  );
}

export default App;
