import React, {Fragment, useState} from 'react';
import Box from '@mui/material/Box';


import GuessArea from "./page/GuessArea";
import Keyboard from "./page/Keyboard";
import MessageCenter from "./page/MessageCenter";
import TopBanner from "./page/TopBanner";
import {keyboard} from "@testing-library/user-event/dist/keyboard";

import Words from "./fiveLetterWords.json";
const word_to_solve = Words[Math.floor((Math.random() * Words.length))].split('');

function App() {

    const numRows = 6;
    const numBoxesPerRow = 5;
    const color = 'white';

    const allKeys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
                     'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ent',
                     'z', 'x', 'c', 'v', 'b', 'n', 'm', 'bksp'];

    const [activeRow, setActiveRow] = useState(new Array(numBoxesPerRow).fill({
        backgroundColor: color,
        item : ""
    }));
    const [remainingRows, setRemainingRows] = useState(new Array((numRows - 1) * numBoxesPerRow).fill({
        backgroundColor: color,
        item : ""
    }));
    const [completedRows, setCompletedRows] = useState(new Array(0).fill({
        backgroundColor: color,
        item : ""
    }));
    const [keyboardKeys, setKeyboardKeys] = useState(new Array(28).fill({
        backgroundColor: color,
        mach: false
    }));
    const [win_condition, setWinCondition] = useState(false);
    const [lose_condition, setLoseCondition] = useState(false);

    const keyboardKeyPressedCallBack = (idx) => {
        if (keyboard){
            if (win_condition === true || lose_condition === true){}    // this is for when the game is over

            else if (allKeys[idx] === 'bksp'){                          // if backspace, change last item in activeRow
                if( idx > 0) {                                          // to ''
                    let curr = 0;
                    while (curr < 4 && activeRow[curr + 1].item !== '')
                        curr++;
                    const newActiveRow = activeRow.slice();
                    newActiveRow[curr] = {
                        item : ''
                    }
                    setActiveRow(newActiveRow);
                }
            }

            else if (allKeys[idx] === 'ent') {
                if (activeRow[4].item === ''){}                         // if enter, first check if activeRow is full
                else{
                    const newKeyboardKeys = keyboardKeys.slice();
                    let mach_bug_fix = [];                              // this is to fix a bug, hence the name
                    for (let k = 0; k < 5; k++) {
                        // This loop is for the keyboard
                        // for every item in activeRow, get the index for the key on the keyboard
                        // then check to see if the current item matches to the item at the index in the match word
                        let idx_key = allKeys.findIndex(ele => ele === activeRow[k].item)
                        if (keyboardKeys[idx_key].backgroundColor !== '#30ff30') {
                            let bkColor = () => {
                                if (activeRow[k].item === word_to_solve[k])
                                    return '#30ff30'
                                else if (word_to_solve.find(element => element === activeRow[k].item) !== undefined)
                                    return '#ffc020'
                                else
                                    return '#c0c0c0'
                            };
                            if (bkColor() === '#30ff30'){
                                mach_bug_fix.push(activeRow[k].item)
                                newKeyboardKeys[idx_key] = {
                                    backgroundColor: bkColor,
                                    mach: true
                                }
                            }
                            else{
                                if(bkColor() !== '#ffc020' ||
                                    mach_bug_fix.find(element => element === activeRow[k].item) === undefined){
                                    newKeyboardKeys[idx_key] = {
                                        backgroundColor: bkColor
                                    }
                                }
                            }
                        }
                    }
                    setKeyboardKeys(newKeyboardKeys);

                    const newActiveRow = activeRow.slice();
                    let matches = 0;
                    for (let i = 0; i < 5; i++){
                        // This loop is for the guess area
                        // we do the same thing here as the keyboard, but we keep track of the successful matches
                        // and check to see if there are 5 matches at the end.
                        let bkColor = () => {
                            if (activeRow[i].item === word_to_solve[i])
                                return '#30ff30'
                            else if (word_to_solve.find(element => element === activeRow[i].item) !== undefined)
                                return '#ffc020'
                            else
                                return '#c0c0c0'
                        };
                        newActiveRow[i] = {
                            backgroundColor: bkColor,
                            item : activeRow[i].item
                        }
                        let idx_key = allKeys.find(ele => ele === activeRow[i].item)
                        newKeyboardKeys[idx_key] = {
                            backgroundColor: bkColor
                        }
                        if (activeRow[i].item === word_to_solve[i])
                            matches++;
                    }

                    if (matches === 5)
                        setWinCondition(true);
                    if (remainingRows.length === 0)
                        setLoseCondition(true)

                    setCompletedRows([...completedRows, ...newActiveRow])
                    setActiveRow(remainingRows.slice(0,5));
                    setRemainingRows(remainingRows.slice(5))

                }
            }

            else{
                // this is for any other key that is pressed
                // we first check if activeRow is filled. if we find an empty space, we fill it; but
                // if it is already filled we do nothing.
                if (activeRow[4].item === ''){
                    let curr = 0;
                    while (activeRow[curr].item !== '' && curr < 4)
                        curr++;
                    const newActiveRow = activeRow.slice();
                    newActiveRow[curr] = {
                        item : allKeys[idx]
                    }
                    setActiveRow(newActiveRow);
                }
            }
        }
    }



  return (
      <Fragment>
          <Box margin='auto'
            sx={{
                height: 600,
                width: 500,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-top ',
            }}
          >
              <TopBanner />
              <GuessArea activeRow={activeRow} completedRows={completedRows} remainingRows={remainingRows}/>
              <MessageCenter win_condition={win_condition} lose_condition={lose_condition} word_to_solve={word_to_solve}/>
              <Keyboard  onClickCallBack={keyboardKeyPressedCallBack} allKeys={allKeys} keyboardKeys={keyboardKeys}/>
          </Box>
      </Fragment>
  );
}

export default App;
