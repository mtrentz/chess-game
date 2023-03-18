// rafce -> tab
import React from 'react'
import Square from './Square'


// interface Square = {
//     piece: string
//     selected: boolean
// }

const Board = () => {

    // Create starter board with 8 rows and 8 columns
    // and values names like wK, bK and so on
    // TODO: Isso tem que ser um state.
    const board = [
        ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
        ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
        ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],

    ]

    const flipBoard = () => {
        // Flip board
        board.reverse()
        // Flip rows
        board.forEach(row => row.reverse())
    }

    flipBoard()

    const darkColor = "bg-amber-700"
    const lightColor = "bg-amber-200"

    return (
        <div >
            {board.map((row, rowIndex) => (
                <div className="flex" key={rowIndex}>
                    {row.map((piece, columnIndex) => (
                        <Square
                            key={columnIndex}
                            piece={piece}
                            color={(rowIndex + columnIndex) % 2 === 0 ? lightColor : darkColor}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Board