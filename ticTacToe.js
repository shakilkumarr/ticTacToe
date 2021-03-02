class TicTacToe {
  constructor(player, size, symbol, board, moves) {
    this.name = player;
    this.size = size;
    this.isMyTurn = false;
    this.symbol = symbol;
    this.board = board;
    this.moves = moves;
    this.totalMoves = size * size;
    this.init();
  }

  init() {
    this.rowCounter = new Array(this.size).fill(0);
    this.colCounter = new Array(this.size).fill(0);
    this.rcCounter = new Array(2).fill(0);
  }

  markHisMove(i, j) {
    const cell = this.board[i][j];
    if (cell !== 0) { alert('Occupied'); return;}
    else this.board[i][j] = 1;
    this.moves.count += 1;
    return this.checkForWin(i, j);
  }

  checkForWin(i, j) {
    if (i === j) { this.rcCounter[0] += 1; }
    if (i + j === this.size - 1) this.rcCounter[1] += 1;
    this.rowCounter[i] += 1;
    this.colCounter[j] += 1;
    if (this.rcCounter[0] === this.size || this.rcCounter[1] === this.size || this.rowCounter[i] === this.size || this.colCounter[j] === this.size) {
      alert(`Player ${this.name} Won!`);
      return 'WON';
    } else if (this.moves.count === this.totalMoves) {
      alert('DRAW');
      return 'WON';
    }
    return 'PENDING';
  }
}

const handleMoves = (player1, player2) => (ev) => {
  const row = Number(ev.target.getAttribute('data-row'));
  const col = Number(ev.target.getAttribute('data-col'));
  const [currentPlayer, nextPlayer] = player1.isMyTurn ? [player1, player2] : [player2, player1];
  currentPlayer.isMyTurn = false;
  nextPlayer.isMyTurn = true;
  const moveStatus = currentPlayer.markHisMove(row, col);
  if (moveStatus === 'WON') {
    prepareGameBoard();
  } else if (moveStatus === 'PENDING') {
    document.getElementsByClassName('playerInfo')[0].innerText = `${nextPlayer.name} Turn`;
    ev.target.innerHTML = currentPlayer.symbol;
  }
}

const getRowHTML = () => {
  const div = document.createElement('div');
  div.className = 'boxRowContainer';
  return div;
}

const getColHTML = (i, j) => `<div class="box" data-row="${i}" data-col="${j}"></div>`;

const getContainer = () => {
  const cotainer = document.createElement('div');
  cotainer.className = 'container';
  cotainer.id = 'container';
  return cotainer;
}

const renderBoxHTML = (size) => {
  const cotainer = getContainer();
  let htmlToSet = '';
  for (let i = 0; i < size; i += 1) {
    let rowHtmlToSet = getRowHTML();
    let colHtmlToSet = '';
    for (let j = 0; j < size; j += 1)
      colHtmlToSet += getColHTML(i, j);
    rowHtmlToSet.innerHTML = colHtmlToSet;
    htmlToSet += rowHtmlToSet.outerHTML;
  }
  cotainer.innerHTML = htmlToSet;
  document.body.appendChild(cotainer);
}

const prepareGameBoard = () => {
  const size = 3;
  const board = new Array(size).fill(0).map(_ => new Array(size).fill(0));
  const movesCount = { count: 0 };
  const player1 = new TicTacToe('Player 1', size, 'X', board, movesCount);
  const player2 = new TicTacToe('Player 2', size, '0', board, movesCount);
  player1.isMyTurn = true;
  if (document.getElementById('container')) document.getElementById('container').remove();
  renderBoxHTML(size);
  const listener = handleMoves(player1, player2);
  document.getElementById('container').addEventListener('click', listener);
};