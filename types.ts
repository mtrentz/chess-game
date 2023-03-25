export interface Square {
    piece: string,
    col: number,
    row: number,
    highlighted: boolean,
    name: string
}

export function createSquare(piece: string, col: number, row: number, highlighted: boolean, name: string): Square {
    return { piece, col, row, highlighted, name };
}

export type Board = Square[][];

export class GameEngine {

    private board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    getBoard(): Board {
        return this.board;
    }

    setBoard(board: Board): void {
        this.board = board;
    }

    selectPiece(coord: Coordinates | null): void {

        this.board.map(row => {
            row.map(square => {
                square.highlighted = false;
            })
        });

        if (coord) this.board[coord.row][coord.col].highlighted = true;
    }

    isEmpty(coord: Coordinates): boolean {
        return this.board[coord.row][coord.col].piece === '';
    }

    getAllowedSquares(coord: Coordinates) {

        let previousCoord = this.getHighlighted();
        if(!previousCoord) {
            return;
        }

        let team = this.board[previousCoord.row][previousCoord.col].piece[0];
        let piece = this.board[previousCoord.row][previousCoord.col].piece[1];
        

    }

    getHighlighted(): Coordinates | null {
        this.board.forEach(row => {
            row.forEach(square => {
                if (square.highlighted) {
                    let coord: Coordinates = {
                        row: square.row,
                        col: square.col
                    }
                    return coord;
                }
            })
        })
        return null;
    }

}

const chessBoard: Square[][] = [
    ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"].map((piece, col) =>
        createSquare(piece, col, 0, false, `${String.fromCharCode(97 + col)}1`)
    ),
    ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"].map((piece, col) =>
        createSquare(piece, col, 1, false, `${String.fromCharCode(97 + col)}2`)
    ),
    ["", "", "", "", "", "", "", ""].map((_, col) =>
        createSquare("", col, 2, false, `${String.fromCharCode(97 + col)}3`)
    ),
    ["", "", "", "", "", "", "", ""].map((_, col) =>
        createSquare("", col, 3, false, `${String.fromCharCode(97 + col)}4`)
    ),
    ["", "", "", "", "", "", "", ""].map((_, col) =>
        createSquare("", col, 4, false, `${String.fromCharCode(97 + col)}5`)
    ),
    ["", "", "", "", "", "", "", ""].map((_, col) =>
        createSquare("", col, 5, false, `${String.fromCharCode(97 + col)}6`)
    ),
    ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"].map((piece, col) =>
        createSquare(piece, col, 6, false, `${String.fromCharCode(97 + col)}7`)
    ),
    ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"].map((piece, col) =>
        createSquare(piece, col, 7, false, `${String.fromCharCode(97 + col)}8`)
    )
];

export interface Coordinates {
    row: number,
    col: number,
}

