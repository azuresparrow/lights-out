import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for(let k = 0; k < nrows; k++){
      let row = [];
      for(let i = 0; i < ncols; i++){
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }
  /*
  function shuffleBoard(){
    let moves = 3;
    for(let i = 0; i < moves; i++)
      flipCellsAround(Math.floor(Math.random()*nrows) + "-" + Math.floor(Math.random() * ncols));
  
   
  }*/

  function hasWon() {
    return board.flat().every(true);
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      const cloneBoard = oldBoard.map(row=>[...row]);
      flipCell(y,x, cloneBoard);
      flipCell(y,x+1, cloneBoard);
      flipCell(y,x-1, cloneBoard);
      flipCell(y+1,x, cloneBoard);
      flipCell(y-1,x, cloneBoard);
      return cloneBoard;
    });
  }
  // if the game is won, just show a winning msg & render nothing else
  if(hasWon == true) return( <h1> YOU WON </h1>)


  // make table board
  let htmlBoard = [];
  for(let y = 0; y < nrows; y++){
    let htmlRow=[];
    for(let x = 0; x < ncols; x++){
      let coord=`${y}-${x}`
      htmlRow.push(<Cell coord={coord} flipCellsAroundMe={() => flipCellsAround(coord)} isLit={board[y][x]}/>);
    }
    htmlBoard.push(<tr>{htmlRow}</tr>);
  };
  return (<table>{htmlBoard}</table>);
}

export default Board;
