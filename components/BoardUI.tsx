// rafce -> tab
import React, { useRef, useState, useEffect } from 'react'
import SquareUI from './SquareUI'
import { GameEngine, Square, createSquare, Board, Coordinates } from '@/types'
import { verify } from 'crypto';


let gameEngine : GameEngine;
const chessBoard: Board = initializeBoard();

const BoardUI = () => {

    // Define board as state
    const [board, setBoard] = useState(chessBoard);

    // state for clicked row and col
    const [selectedSquare, setSelectedSquare] = useState<Coordinates | null>(null)

    useEffect(() => {
        // flipBoard();
        gameEngine = new GameEngine(board);
    }, []);

    // const flipBoard = () => {
    //     const flippedBoard = [...board];
    //     flippedBoard.reverse();
    //     flippedBoard.forEach(row => row.reverse());
    //     setBoard(flippedBoard);
    // }

    const movePiece = (row: number, col: number) => {

        if (selectedSquare) {

            //se clicou no mesmo lugar, desseleciona
            if(selectedSquare.row === row && selectedSquare.col === col) {
                setSelectedSquare(null);
                gameEngine.selectPiece(null);
                setBoard(gameEngine.getBoard());
                return;
            }

            //se clicou em outra peça do mesmo time, muda a seleção changeSelectionIfSameTeam
            if(board[row][col].piece[0] === board[selectedSquare.row][selectedSquare.col].piece[0]) {
                setSelectedSquare({row, col});
                gameEngine.selectPiece({row, col});
                setBoard(gameEngine.getBoard());
                return;
            }

            //se clicou num square highlighted, move.
            if(board[row][col].highlighted) {
                //move
            }

            // // Alter board state
            // const newBoard = [...board]
            // newBoard[row][col] = newBoard[onMoveRow][onMoveCol]
            // newBoard[onMoveRow][onMoveCol] = ""
            // setBoard(newBoard)

            // let possibleSquares = GameEngine.getPossibleMoves();
            // const newBoard = [...board];
            //faz a logica de iterar pelo Board e encontrar 
            //os lugares em que existe o array de possibleSquares 
            //e aí setar esse highlighted = true
            // setBoard(newBoard)

            setBoard(gameEngine.getBoard());
            // setSelectedSquare(null);

        } else {

            if(gameEngine.isEmpty({row, col})) return;

            setSelectedSquare({row, col});
            gameEngine.selectPiece({row, col});
                
            //hora do show. Highlighta todas as possibilidades.
            gameEngine.getAllowedSquares({row, col});
            
            setBoard(gameEngine.getBoard());
        }
        

    }

    return (
        <div >
            {board.map((row, rowIndex) => (
                <div className="flex" key={rowIndex}>
                    {row.map((square, columnIndex) => (
                        <SquareUI
                            key={columnIndex}
                            piece={square.piece}
                            color={getSquareColor(square.row, square.col, square.highlighted)}
                            onClick={() => {
                                movePiece(rowIndex, columnIndex);
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

function getSquareColor(row : number, col : number, highlighted : boolean) {

    const darkColor = "bg-amber-700"
    const lightColor = "bg-amber-200"
    const highlightColor = "bg-emerald-200"

    if(highlighted) return highlightColor;    
    return (row + col) % 2 == 0 ? lightColor : darkColor;
}

function initializeBoard() : Board {
    return [
        ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"].map((piece, col) =>
          createSquare(piece, col, 0, false, `${String.fromCharCode(97 + col)}8`)
        ),
        ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"].map((piece, col) =>
          createSquare(piece, col, 1, false, `${String.fromCharCode(97 + col)}7`)
        ),
        ["", "", "", "", "", "", "", ""].map((_, col) =>
          createSquare("", col, 2, false, `${String.fromCharCode(97 + col)}6`)
        ),
        ["", "", "", "", "", "", "", ""].map((_, col) =>
          createSquare("", col, 3, false, `${String.fromCharCode(97 + col)}5`)
        ),
        ["", "", "", "", "", "", "", ""].map((_, col) =>
          createSquare("", col, 4, false, `${String.fromCharCode(97 + col)}4`)
        ),
        ["", "", "", "", "", "", "", ""].map((_, col) =>
          createSquare("", col, 5, false, `${String.fromCharCode(97 + col)}3`)
        ),
        ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"].map((piece, col) =>
          createSquare(piece, col, 6, false, `${String.fromCharCode(97 + col)}2`)
        ),
        ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"].map((piece, col) =>
          createSquare(piece, col, 7, false, `${String.fromCharCode(97 + col)}1`)
        )
    ];
}

export default BoardUI