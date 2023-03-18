// rafce -> tab
import React from 'react'
import Square from './Square'
import { useRef, useState } from 'react'


// Interface Piece
// interface Piece {
//     name: string,
//     selected: boolean,
//     // ref: React.RefObject<HTMLDivElement>
// }

const Board = () => {

    // Create starter board with 8 rows and 8 columns
    // and values names like wK, bK and so on
    // TODO: Isso tem que ser um state.
    // let board = [


    // ]

    // Define board as state
    const [board, setBoard] = useState([
        ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
        ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
        ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],
    ])


    // state for clicked row and col
    const [onMoveRow, setOnMoveRow] = useState<number | null>(null)
    const [onMoveCol, setOnMoveCol] = useState<number | null>(null)

    const flipBoard = () => {
        // Flip board
        board.reverse()
        // Flip rows
        board.forEach(row => row.reverse())
    }

    flipBoard()

    const darkColor = "bg-amber-700"
    const lightColor = "bg-amber-200"


    const movePiece = (row: number, col: number) => {
        // Se onMoveRow e onMoveCol for nulo,
        // seta eles pra celula que cliquei.
        console.log("HERE1")
        if (onMoveRow === null || onMoveCol === null) {
            setOnMoveRow(row)
            setOnMoveCol(col)
            console.log("HERE2")
            return
        }

        // Se onMoveRow e onMoveCol nao forem nulo
        // Move a celula do onMove pra onde cliquei agora.
        // Seta os on Move em branco
        else {

            // If onMoveRow equals row and onMoveCol equals col
            // return
            if (onMoveRow === row && onMoveCol === col) {
                setOnMoveRow(null)
                setOnMoveCol(null)
                return
            }

            // Alter board state
            const newBoard = [...board]
            newBoard[row][col] = newBoard[onMoveRow][onMoveCol]

            newBoard[onMoveRow][onMoveCol] = ""
            setBoard(newBoard)


            setOnMoveRow(null)
            setOnMoveCol(null)
            console.log("HERE3")
        }
        console.log("HERE4")

    }

    return (
        <div >
            {board.map((row, rowIndex) => (
                <div className="flex" key={rowIndex}>
                    {row.map((piece, columnIndex) => (
                        <Square
                            key={columnIndex}
                            piece={piece}
                            color={(rowIndex + columnIndex) % 2 === 0 ? lightColor : darkColor}
                            // onClick log row and col number
                            onClick={() => {

                                movePiece(rowIndex, columnIndex)


                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Board