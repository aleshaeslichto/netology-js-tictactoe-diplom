const boardLimit = 3;
let players = ['x', 'o'];
let activePlayer = 0;
let board = [];

function startGame() {
    board = createBoard(boardLimit);
    renderBoard(board);
    activePlayer = 0;
}

function createBoard(limit) {
    let array = [];

    for (let i = 0; i < limit; i++) {
        array[i] = [];

        for (let j = 0; j < limit; j++) {
            array[i].push('');
        }
    }
  
    return array;
}

function click(row, col) {
    board[row][col] = players[activePlayer];
    renderBoard(board);

    if (isWinner(players[activePlayer], board, row, col)) {
        showWinner(players[activePlayer]);
    } else if (isDraw()) {
        showDraw();
    }

    activePlayer = activePlayer === 0 ? 1 : 0;
}

function isWinner(player, board, row, col) {
    return isWinnerRows(player, board, row) || isWinnerCols(player, col) || isWinnerDiagonals(player);

}

function isWinnerRows(player, board, row) {
    if (board[row].every(cell => cell === player)) {
        return true;
    }

    return false;
}

function isWinnerCols(player, col) {
    let verticalBoard = [];

    for (let i = 0; i < board.length; i++) {
        verticalBoard.push(board[i][col]);
    }

    return isWinnerRows(player, [verticalBoard], 0);
}

function isWinnerDiagonals(player) {
    let leftDiagonal = getDiagonal(board);
    let rightDiagonal = getDiagonal(board.slice().reverse());

    return isWinnerRows(player, [leftDiagonal], 0) || isWinnerRows(player, [rightDiagonal], 0);
}

function getDiagonal(board) {
    let diagonal = [];

    for (let i = 0; i < board.length; i++) {
        diagonal.push(board[i][i]);
    }

    return diagonal;
}

function isDraw() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == '') {
                return false;
            }
        }
    }

    return true;
}