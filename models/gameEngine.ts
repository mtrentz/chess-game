import { Board, Coordinates } from "@/types";
import { Piece, Pawn, Rook, Knight, Queen, Bishop, King } from "./pieces";


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

    getAllowedSquares(row: number, col: number) {

        let team = this.board[row][col].piece[0];
        let pieceName = this.board[row][col].piece[1];

        let piece: Piece | null = this.getPiece(pieceName, team, row, col);

        if (piece) {
            let boardResult = piece.getAllowedSquares(this.board);
            boardResult = piece.removeSameTeamSquares(boardResult);
            console.log(boardResult);
            this.board = boardResult;
        }

    }

    getPiece(pieceName: string, team: string, row: number, col: number): Piece | null {
        switch (pieceName) {
            case 'P':
                return new Pawn(team, row, col);
            case 'R':
                return new Rook(team, row, col);
            case 'N':
                return new Knight(team, row, col);
            case 'B':
                return new Bishop(team, row, col);
            case 'Q':
                return new Queen(team, row, col);
            case 'K':
                return new King(team, row, col);
            default:
                return null;
        }
    } 
}