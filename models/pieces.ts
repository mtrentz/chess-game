import { Board } from "@/types";

export abstract class Piece {

    protected team: string;
    protected row: number;
    protected col: number;

    constructor(team: string, row: number, col: number) {
        this.team = team;
        this.row = row;
        this.col = col;
    }

    abstract getAllowedSquares(board: Board): Board;

    removeSameTeamSquares(board: Board): Board {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board.length; col++) {
                let piece = board[row][col].piece;
                if (piece != '' && piece[0] === this.team) {
                    board[row][col].highlighted = false;
                }
            }
        }
        return board;
    }

}

export class Pawn extends Piece {

    override getAllowedSquares(board: Board): Board {

        if (this.team === 'b') {
            if (this.row + 1 < board.length) {
                board[this.row + 1][this.col].highlighted = true;
            }

            if (this.row + 2 < board.length) {
                board[this.row + 2][this.col].highlighted = true;
            }
        }

        if (this.team === 'w') {
            if (this.row - 1 >= 0) {
                board[this.row - 1][this.col].highlighted = true;
            }

            if (this.row - 2 >= 0) {
                board[this.row - 2][this.col].highlighted = true;
            }
        }

        return board;

    }

}

export class Rook extends Piece {

    override getAllowedSquares(board: Board): Board {        

        for (let row = this.row + 1; row < board.length; row++) {
            if(board[row][this.col].piece != '') break;
            board[row][this.col].highlighted = true;
        }

        for (let row = this.row - 1; row >= 0; row--) {
            if(board[row][this.col].piece != '') break;
            board[row][this.col].highlighted = true;
        }

        for (let col = this.col + 1; col < board.length; col++) {
            if(board[this.row][col].piece != '') break;
            board[this.row][col].highlighted = true;
        }

        for (let col = this.col - 1; col >= 0; col--) {
            if(board[this.row][col].piece != '') break;
            board[this.row][col].highlighted = true;
        }

        return board;
    }

}

export class Knight extends Piece {

    override getAllowedSquares(board: Board): Board {

        if (this.row + 2 < board.length && this.col + 1 < board.length) {
            board[this.row + 2][this.col + 1].highlighted = true;
        }

        if (this.row + 2 < board.length && this.col - 1 >= 0) {
            board[this.row + 2][this.col - 1].highlighted = true;
        }

        if (this.row - 2 >= 0 && this.col + 1 < board.length) {
            board[this.row - 2][this.col + 1].highlighted = true;
        }

        if (this.row - 2 >= 0 && this.col - 1 >= 0) {
            board[this.row - 2][this.col - 1].highlighted = true;
        }

        if (this.row + 1 < board.length && this.col + 2 < board.length) {
            board[this.row + 1][this.col + 2].highlighted = true;
        }

        if (this.row + 1 < board.length && this.col - 2 >= 0) {
            board[this.row + 1][this.col - 2].highlighted = true;
        }

        if (this.row - 1 >= 0 && this.col + 2 < board.length) {
            board[this.row - 1][this.col + 2].highlighted = true;
        }

        if (this.row - 1 >= 0 && this.col - 2 >= 0) {
            board[this.row - 1][this.col - 2].highlighted = true;
        }

        return board;
    }

}

export class Bishop extends Piece {

    override getAllowedSquares(board: Board): Board {

        for(let row=0; row<board.length; row++) {
            for(let col=0; col<board.length; col++) {
                if(this.row + row < board.length && this.col + col < board.length)
                    board[this.row + row][this.col + col].highlighted = true;
            }
        }

        // for (let count = 0; count < board.length; count++) {
        //     if (this.row + count < board.length && this.col + count < board.length) {
        //         board[this.row + count][this.col + count].highlighted = true;
        //         if(board[this.row + count][this.col + count].piece != '') break;
        //     }

        //     if (this.row + count < board.length && this.col - count >= 0) {
        //         board[this.row + count][this.col - count].highlighted = true;
        //         if(board[this.row + count][this.col - count].piece != '') break;
        //     }

        //     if (this.row - count >= 0 && this.col + count < board.length) {
        //         board[this.row - count][this.col + count].highlighted = true;
        //         if(board[this.row - count][this.col + count].piece != '') break;
        //     }

        //     if (this.row - count >= 0 && this.col - count >= 0) {
        //         board[this.row - count][this.col - count].highlighted = true;
        //         if(board[this.row - count][this.col - count].piece != '') break;
        //     }
        // }

        return board;

    }

}

export class Queen extends Piece {

    override getAllowedSquares(board: Board): Board {

        for (let count = 0; count < board.length; count++) {
            if (this.row + count < board.length && this.col + count < board.length) {
                board[this.row + count][this.col + count].highlighted = true;
            }

            if (this.row + count < board.length && this.col - count >= 0) {
                board[this.row + count][this.col - count].highlighted = true;
            }

            if (this.row - count >= 0 && this.col + count < board.length) {
                board[this.row - count][this.col + count].highlighted = true;
            }

            if (this.row - count >= 0 && this.col - count >= 0) {
                board[this.row - count][this.col - count].highlighted = true;
            }
        }

        for (let row = this.row; row < board.length; row++) {
            board[row][this.col].highlighted = true;
        }

        for (let row = this.row; row >= 0; row--) {
            board[row][this.col].highlighted = true;
        }

        for (let col = this.col; col < board.length; col++) {
            board[this.row][col].highlighted = true;
        }

        for (let col = this.col; col >= 0; col--) {
            board[this.row][col].highlighted = true;
        }

        return board;
    }

}

export class King extends Piece {

    override getAllowedSquares(board: Board): Board {

        //Diagonals
        if (this.row + 1 < board.length && this.col + 1 < board.length) {
            board[this.row + 1][this.col + 1].highlighted = true;
        }

        if (this.row + 1 < board.length && this.col - 1 >= 0) {
            board[this.row + 1][this.col - 1].highlighted = true;
        }

        if (this.row - 1 >= 0 && this.col + 1 < board.length) {
            board[this.row - 1][this.col + 1].highlighted = true;
        }

        if (this.row - 1 >= 0 && this.col - 1 >= 0) {
            board[this.row - 1][this.col - 1].highlighted = true;
        }

        //Rook like
        if (this.row + 1 < board.length) {
            board[this.row + 1][this.col].highlighted = true;
        }

        if (this.row - 1 >= 0) {
            board[this.row - 1][this.col].highlighted = true;
        }

        if (this.col + 1 < board.length) {
            board[this.row][this.col + 1].highlighted = true;
        }

        if (this.col - 1 >= 0) {
            board[this.row][this.col - 1].highlighted = true;
        }

        return board;
    }

}

