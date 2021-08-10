class TicTacToe {
    constructor() {
        this.gameState = [[undefined, undefined, undefined],[undefined, undefined, undefined],[undefined, undefined, undefined]];
        this.currentPlayerSymbol = 'x';
        this.winner = null;
        this.gameIsOver = false;
    }

    getCurrentPlayerSymbol() {
        return this.currentPlayerSymbol;
    }

    nextTurn(rowIndex, columnIndex) {
        if (!this.gameState[rowIndex][columnIndex]) {
            this.gameState[rowIndex][columnIndex] = this.currentPlayerSymbol;
            this.isFinished();
            this.currentPlayerSymbol = this.currentPlayerSymbol === 'x' ? 'o' : 'x';
        }
    }

    isFinished() {
        // let result = false;

        if (this.noMoreTurns()) {
            this.gameIsOver = true;
            // result = true;
        }
        if (checkWin(this.gameState, this.currentPlayerSymbol)) {
            this.gameIsOver = true;
            this.winner = this.currentPlayerSymbol
            // result = true
        }
        return this.gameIsOver || !!this.winner;


        function checkWin(field, currentSymbol) {
            function checkRows() {
                let result = false;
                for (let row of field) {
                    if (row.every((symbol) => symbol !== undefined && symbol === currentSymbol)) {
                        result = true
                    }
                }
                return result;
            }
            function checkCol() {
                let result = false;
                for (let i = 0; i < 3; i++) {
                    let subResult = 0;
                    for (let j = 0; j < 3; j++) {
                        if (field[j][i] !== undefined && field[j][i] === currentSymbol) {
                            subResult ++;
                        }
                    }
                    if (subResult === 3) {
                        result = true;
                        break;
                    }
                }
                return result;
            }
            const steps = [0, 1, 2];
            return (
              checkRows() ||
              checkCol() ||
              steps.every((step) => field[step][step] === currentSymbol) ||
              steps.every((step) => field[step][2 - step] === currentSymbol)
            );
        }
    }

    getWinner() {
        return this.winner;
    }

    noMoreTurns() {
        for (let i = 0; i < this.gameState.length; i++) {
            for (let j = 0; j < this.gameState[i].length; j++) {
                if (!this.gameState[i][j]) {
                    return false
                }
            }
        }
        return true;
    }

    isDraw() {
        return this.gameIsOver && this.winner === null;
    }

    getFieldValue(rowIndex, colIndex) {
        return this.gameState[rowIndex][colIndex] !== undefined ? this.gameState[rowIndex][colIndex] : null;
    }
}

module.exports = TicTacToe;
