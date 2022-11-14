// Jordan Edginton
import {NUM_GRIDS, NUM_ITEMS} from "./constants";

// even though this is reducers.js, the reducers function is not implemented or used...
// This was originally copy-pasted from the check-4 game, but i never got around to trying out the reducers.
// Instead, this holds a majority of all of our helper functions

function advancePlayer(player) {
    if( player === 'blue' )
        return 'red';
    if( player === 'red' )
        return 'blue';
    return 'blue';
}

function advanceRotatePhase(rotate) {
    return rotate === false;
}

function createInitialGameState(){
    return {
        player_turn: 'blue',
        rotate_phase: false,
    }
}

function advanceGameState(state){
    // Here we advance the rotate phase and swaps players if the current phase is the rotate phase.
    let newState = state;
    if (state.rotate_phase)
        newState.player_turn = advancePlayer(newState.player_turn)
    newState.rotate_phase = advanceRotatePhase(newState.rotate_phase)
    return newState
}

function gameWin(state){
    let newState = Object.assign({}, state)
    newState.have_winner = true
    return newState
}

function createInitialBoard() {
    return Array(NUM_GRIDS).fill(Array(NUM_ITEMS).fill({color: 'white', isOccupied: false}));
}

function updateBoard(grid, gameState, sub_grid, idx) {
    // Similar to Wordle, we copy the current game grid, then copy that grid's subgrid, then copy the item we
    // need to change within THAT subgrid. I was having reference issues here, hence why I needed to keep copying
    // the items.
    let newGrid = [...grid];
    let newSub_grid = newGrid[sub_grid].slice();
    let newItem = newSub_grid.slice(idx, idx + 1)
    newItem.color = gameState.player_turn;
    newItem.isOccupied = true;
    newSub_grid[idx] = newItem;
    newGrid[sub_grid] = newSub_grid;
    return newGrid
}

function rotateGrid(grid, subGrid, direction){
    // Here we rotate the given subgrid in the direction specified. We create an empty list, them populate it in
    // the order that the result of the rotation would be (item 6 would be item 0 when rotating right, so we add
    // item 6 first in the new subgrid).
    let newGrid = [...grid]
    let holdSubGrid = [...grid[subGrid]]
    let newSubGrid = []
    if (direction === 'right'){
        newSubGrid.push(holdSubGrid[6])
        newSubGrid.push(holdSubGrid[3])
        newSubGrid.push(holdSubGrid[0])
        newSubGrid.push(holdSubGrid[7])
        newSubGrid.push(holdSubGrid[4])
        newSubGrid.push(holdSubGrid[1])
        newSubGrid.push(holdSubGrid[8])
        newSubGrid.push(holdSubGrid[5])
        newSubGrid.push(holdSubGrid[2])
    }
    else{
        newSubGrid.push(holdSubGrid[2])
        newSubGrid.push(holdSubGrid[5])
        newSubGrid.push(holdSubGrid[8])
        newSubGrid.push(holdSubGrid[1])
        newSubGrid.push(holdSubGrid[4])
        newSubGrid.push(holdSubGrid[7])
        newSubGrid.push(holdSubGrid[0])
        newSubGrid.push(holdSubGrid[3])
        newSubGrid.push(holdSubGrid[6])
    }
    newGrid[subGrid] = newSubGrid
    return newGrid
}

// ---THIS IS NOT IMPLEMENTED---
/*function reducers(state, action) {

    if( state === undefined )
        return state;

    // console.log(`in reducers. action.type is: ${action.type}, board contains: ${JSON.stringify(state)}`);

    if( action.type === 'INITIALIZE' || action.type === 'RESET') {
        return createInitialBoard();
    } else if( action.type === 'CELL_CLICKED') {
        if( state.haveAWinner )
            return state;

        if(state.firstAvailableIndex[action.colIdx] < 0)  // column is full
            return state;

        return {
            ...state,
            ...integrateClick(state, action.colIdx)
        }
    }

    return state;

}*/

export {createInitialBoard, updateBoard, advanceGameState, createInitialGameState,
        rotateGrid, gameWin};