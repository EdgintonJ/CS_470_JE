// Jordan Edginton
import {rotateGrid} from './Reducers'

function doWeHaveAWinnerDownward  (color, grid, subGrid, subIdx, rotate) {
    // This is where we check if there is a winning combination going down.
    // There are 2 possible wins in each column, so we make 2 arrays to keep track of them.

    let idx = subIdx % 3;       // top item in column
    let sub = subGrid % 2;      // top subgrid
    let matchingCells1 = [];    // win including top item
    let matchingCells2 = [];    // win including bottom item

    if (!rotate){
        // If we're in the rotate phase, we don't add the item since it's already in the grid
        // we don't add it if it's the last item, we'll do that at the end.
        if (subIdx < 3 && subGrid < 2){
            matchingCells1.push({gridIdx: subGrid, subIdx: subIdx});
        }
        else if (!(subIdx > 5 && subGrid > 1)){
            matchingCells1.push({gridIdx: subGrid, subIdx: subIdx});
            matchingCells2.push({gridIdx: subGrid, subIdx: subIdx});
        }
    }

    // check top item
    if (grid[sub][idx].color === color){
        matchingCells1.push({gridIdx: sub, subIdx: idx});
    }

    idx += 3;
    while(idx < 9) {
        // check 2 bottom items of top grid
        if (grid[sub][idx].color === color){
            matchingCells1.push({gridIdx: sub, subIdx: idx});
            matchingCells2.push({gridIdx: sub, subIdx: idx});
        }
        idx += 3;
    }

    // check if there's even a win possibility. if not, we return false
    if (matchingCells1.length === 3 || matchingCells2.length >= 2) {
        idx = subIdx % 3;
        sub += 2;
        while(idx < 6) {
            if (grid[sub][idx].color === color){
                matchingCells1.push({gridIdx: sub, subIdx: idx});
                matchingCells2.push({gridIdx: sub, subIdx: idx});
            }
            idx += 3;
        }
        if (matchingCells2.length === 4 && (grid[sub][idx].color === color || (subIdx === idx && subGrid === sub)))
            matchingCells2.push({gridIdx: sub, subIdx: idx});
        return matchingCells1.length === 5 || matchingCells2.length === 5;
    }
    return false
}


function doWeHaveAWinnerSideways (color, grid, subGrid, subIdx, rotate) {
    let idx = subIdx - (subIdx % 3);
    let sub = subGrid - (subGrid % 2);
    let matchingCells1 = [];
    let matchingCells2 = [];

    if (!rotate){
        if (subIdx % 3 === 0 && (subGrid % 2) === 0){
            matchingCells1.push({gridIdx: subGrid, subIdx: subIdx});
        }
        else if ((subIdx % 3) !== 2 || (subGrid % 2) !== 1){
            matchingCells1.push({gridIdx: subGrid, subIdx: subIdx});
            matchingCells2.push({gridIdx: subGrid, subIdx: subIdx});
        }
    }

    if (grid[sub][idx].color === color){
        matchingCells1.push({gridIdx: sub, subIdx: idx});
    }

    idx += 1;
    while(1){
        if (grid[sub][idx].color === color){
            matchingCells1.push({gridIdx: sub, subIdx: idx});
            matchingCells2.push({gridIdx: sub, subIdx: idx});
        }
        if ((idx % 3) === 2)
            break
        idx += 1;
    }

    if (matchingCells1.length === 3 || matchingCells2.length >= 2){
        idx -= 2;
        sub += 1;
        while((idx % 3) < 2){
            if (grid[sub][idx].color === color){
                matchingCells1.push({gridIdx: sub, subIdx: idx});
                matchingCells2.push({gridIdx: sub, subIdx: idx});
            }
            idx += 1;
        }
        if (grid[sub][idx].color === color || (subIdx % 3 === 2 && (subGrid % 2) === 1))
            matchingCells2.push({gridIdx: sub, subIdx: idx});
        return matchingCells1.length === 5 || matchingCells2.length === 5;
    }
    return false
}


function dowWeHaveAWinnerOnRightDiagonal (color, grid, subGrid, subIdx, rotate) {
    // diagonal in the / direction
    // We first check if the move was legal, then check whether the move was in the center, or the 2 sides.
    // If the move was the center, we handle it similarly to the down and sideways functions.
    // If not, we check either of the 2 sides

    // First, we check to see if the move was in a "legal spot," or rather can the move make a winning combination?
    // Out of the 36 possible moves, 20 will fail on each diagonal. This also cuts down the rotation phase
    // checks significantly.
    if (subGrid === 0 && subIdx !== 8)
        return false
    if (subGrid === 3 && subIdx !== 0)
        return false
    if ((subIdx === 0 || subIdx === 8) && (subGrid === 1 || subGrid === 2)){
        return false
    }

    // Here we check if the move was in the middle
    if (subIdx === 2 || subIdx === 4 || subIdx === 6) {
        let matchingCells1 = [];
        let matchingCells2 = [];

        let idx = 6
        let sub = 2

        if (!rotate){
            if (subIdx === 6 && subGrid === 2) {
                matchingCells1.push({gridIdx: subGrid, subIdx: subIdx});
            } else if (subIdx !== 2 || subGrid !== 1){
                matchingCells2.push({gridIdx: subGrid, subIdx: subIdx});
                matchingCells1.push({gridIdx: subGrid, subIdx: subIdx});
            }
        }

        if (grid[sub][idx].color === color) {
            matchingCells1.push({gridIdx: sub, subIdx: idx});
        }

        idx -= 2;
        while (idx > 1) {
            if (grid[sub][idx].color === color){
                matchingCells1.push({gridIdx: sub, subIdx: idx});
                matchingCells2.push({gridIdx: sub, subIdx: idx});
            }
            idx -= 2;
        }

        if (matchingCells1.length === 3 || matchingCells2.length === 2) {
            idx = 6;
            sub -= 1;
            while (idx > 3) {
                if (grid[sub][idx].color === color){
                    matchingCells1.push({gridIdx: sub, subIdx: idx});
                    matchingCells2.push({gridIdx: sub, subIdx: idx});
                }
                idx -= 2;
            }
            if (grid[sub][idx].color === color || (subIdx === 2 && subGrid === 1))
                matchingCells2.push({gridIdx: sub, subIdx: idx});
        }
        return matchingCells1.length === 5 || matchingCells2.length === 5;
    }

    // This is where we check the 2 side diagonals. Since i couldn't think of an equation to cross 3 subgrids,
    // all the item indexes are hard-coded.
    let matchingCells = [];
    if (!rotate)
        matchingCells.push({gridIdx: subGrid, subIdx: subIdx})

    if (subIdx === 1 || subIdx === 3 || subIdx === 8) {
        // top diagonal
        if (grid[2][3].color === color)
            matchingCells.push({gridIdx: 2, subIdx: 3});
        if (grid[2][1].color === color)
            matchingCells.push({gridIdx: 2, subIdx: 1});
        if (grid[0][8].color === color)
            matchingCells.push({gridIdx: 0, subIdx: 8});
        if (grid[1][3].color === color)
            matchingCells.push({gridIdx: 1, subIdx: 3});
        if (grid[1][1].color === color)
            matchingCells.push({gridIdx: 1, subIdx: 1});
        return matchingCells.length === 5;
    }
    // bottom diagonal
    if (grid[2][7].color === color)
        matchingCells.push({gridIdx: 2, subIdx: 7});
    if (grid[2][5].color === color)
        matchingCells.push({gridIdx: 2, subIdx: 5});
    if (grid[3][0].color === color)
        matchingCells.push({gridIdx: 3, subIdx: 0});
    if (grid[1][7].color === color)
        matchingCells.push({gridIdx: 1, subIdx: 7});
    if (grid[1][5].color === color)
        matchingCells.push({gridIdx: 1, subIdx: 5});
    return matchingCells.length === 5;

}

function dowWeHaveAWinnerOnLeftDiagonal (color, grid, subGrid, subIdx, rotate) {
    // in the \ direction
    // This is the exact same as the right diagonal, but going left
    if (subGrid === 1 && subIdx !== 6)
        return false
    if (subGrid === 2 && subIdx !== 2)
        return false
    if ((subIdx === 2 || subIdx === 6) && (subGrid === 0 && subGrid === 3))
        return false

    if (subIdx === 0 || subIdx === 4 || subIdx === 8) {
        let matchingCells1 = [];
        let matchingCells2 = [];

        let idx = 0
        let sub = 0

        if (!rotate){
            if (subIdx === 0 && subGrid === 0) {
                matchingCells1.push({gridIdx: subGrid, subIdx: subIdx});
            } else if (subIdx !== 8 || subGrid !== 3){
                matchingCells2.push({gridIdx: subGrid, subIdx: subIdx});
                matchingCells1.push({gridIdx: subGrid, subIdx: subIdx});
            }
        }

        if (grid[sub][idx].color === color) {
            matchingCells1.push({gridIdx: sub, subIdx: idx});
        }

        idx += 4;
        while (idx < 9) {
            if (grid[sub][idx].color === color){
                matchingCells1.push({gridIdx: sub, subIdx: idx});
                matchingCells2.push({gridIdx: sub, subIdx: idx});
            }
            idx += 4;
        }

        if (matchingCells1.length >= 3 || matchingCells2.length >= 2) {
            idx = 0;
            sub = 3;
            while (idx < 5) {
                if (grid[sub][idx].color === color){
                    matchingCells1.push({gridIdx: sub, subIdx: idx});
                    matchingCells2.push({gridIdx: sub, subIdx: idx});
                }
                idx += 4;
            }

            if (grid[sub][idx].color === color || (subGrid === 3 && subIdx === 8))
                matchingCells2.push({gridIdx: sub, subIdx: idx});
        }
        return matchingCells1.length === 5 || matchingCells2.length === 5;
    }

    let matchingCells = [];
    if (!rotate)
        matchingCells.push({gridIdx: subGrid, subIdx: subIdx})

    if (subIdx === 1 || subIdx === 5 || subIdx === 6) {
        if (grid[0][1].color === color)
            matchingCells.push({gridIdx: 2, subIdx: 3});
        if (grid[0][5].color === color)
            matchingCells.push({gridIdx: 2, subIdx: 1});
        if (grid[1][6].color === color)
            matchingCells.push({gridIdx: 0, subIdx: 8});
        if (grid[3][1].color === color)
            matchingCells.push({gridIdx: 1, subIdx: 3});
        if (grid[3][5].color === color)
            matchingCells.push({gridIdx: 1, subIdx: 1});
        return matchingCells.length === 5;
    }

    if (grid[0][3].color === color)
        matchingCells.push({gridIdx: 2, subIdx: 7});
    if (grid[0][7].color === color)
        matchingCells.push({gridIdx: 2, subIdx: 5});
    if (grid[2][2].color === color)
        matchingCells.push({gridIdx: 3, subIdx: 0});
    if (grid[3][3].color === color)
        matchingCells.push({gridIdx: 1, subIdx: 7});
    if (grid[3][7].color === color)
        matchingCells.push({gridIdx: 1, subIdx: 5});
    return matchingCells.length === 5;
}

const doWeHaveAWinnerPlayPhase = (color, grid, subGrid, subIdx) => {  // {player, gameboard, grid idx, subgrid idx}
    // This function is called during the "play phase" of the game. We check the possible win conditions
    // that include the item that was added
    return doWeHaveAWinnerDownward(color, grid, subGrid, subIdx, false) ||
        doWeHaveAWinnerSideways(color, grid, subGrid, subIdx, false) ||
        dowWeHaveAWinnerOnLeftDiagonal(color, grid, subGrid, subIdx, false) ||
        dowWeHaveAWinnerOnRightDiagonal(color, grid, subGrid, subIdx, false);
};

const doWeHaveAWinnerRotatePhase = (color, grid, subGrid, dir) => {
    // This function is called during the "rotate phase" of the game. Here we need to check ALL POSSIBLE WINS, for the
    // rotated grid. We can use the same functions used for the play phase, but we select the minimum amount of indexes.
    // For the downward and sideways wins, we check the middle items in each (row 1 and column 1), but for diagonal
    // it's not that simple. I ended up getting it down to 5 checks each, half of which will actually be "illegal" moves.

    // I couldn't find a way to do this without rotating the board again...
    let newGrid = [...grid]
    newGrid = rotateGrid(newGrid, subGrid, dir)

    return doWeHaveAWinnerDownward(color, newGrid, subGrid, 5, true) ||
        doWeHaveAWinnerDownward(color, newGrid, subGrid, 4, true) ||
        doWeHaveAWinnerDownward(color, newGrid, subGrid, 3, true) ||

        doWeHaveAWinnerSideways(color, newGrid, subGrid, 2, true) ||
        doWeHaveAWinnerSideways(color, newGrid, subGrid, 4, true) ||
        doWeHaveAWinnerSideways(color, newGrid, subGrid, 7, true) ||

        dowWeHaveAWinnerOnLeftDiagonal(color, newGrid, subGrid, 4, true) ||
        dowWeHaveAWinnerOnLeftDiagonal(color, newGrid, subGrid, 5, true) ||
        dowWeHaveAWinnerOnLeftDiagonal(color, newGrid, subGrid, 6, true) ||
        dowWeHaveAWinnerOnLeftDiagonal(color, newGrid, subGrid, 2, true) ||
        dowWeHaveAWinnerOnLeftDiagonal(color, newGrid, subGrid, 7, true) ||

        dowWeHaveAWinnerOnRightDiagonal(color, newGrid, subGrid, 4, true) ||
        dowWeHaveAWinnerOnRightDiagonal(color, newGrid, subGrid, 3, true) ||
        dowWeHaveAWinnerOnRightDiagonal(color, newGrid, subGrid, 7, true) ||
        dowWeHaveAWinnerOnRightDiagonal(color, newGrid, subGrid, 0, true) ||
        dowWeHaveAWinnerOnRightDiagonal(color, newGrid, subGrid, 8, true);
};


export {doWeHaveAWinnerPlayPhase, doWeHaveAWinnerRotatePhase};