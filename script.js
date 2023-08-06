const gameLogic = (() => {
  const playerFactory = (symbol) => {
    const getSymbol = () => {
      return symbol;
    };
    return { getSymbol };
  };

  const p1 = playerFactory("X");
  const p2 = playerFactory("O");

  let roundCount = 0;
  let board = [null, null, null, null, null, null, null, null, null]; //game grid
  let gameStatus = "Playing";
  let turn = Math.random() < 0.5 ? p1.getSymbol() : p2.getSymbol();

  const setSymbol = (index) => {
    if (board[index] === null) {
      board[index] = turn;
      roundCount++;
      checkWin();
      swapTurn();
    }
  };

  const swapTurn = () => {
    if (turn == p1.getSymbol()) {
      turn = p2.getSymbol();
    } else if (turn == p2.getSymbol()) {
      turn = p1.getSymbol();
    }
  };

  const getTurn = () => {
    return turn;
  };

  const getSymbolAtIndex = (index) => {
    return board[index];
  };

  const getGameStatus = () => {
    return gameStatus;
  };

  const getBoard = () => {
    return board;
  };

  const resetGame = () => {
    roundCount = 0;
    board = [null, null, null, null, null, null, null, null, null];
    gameStatus = "Playing";
    turn = Math.random() < 0.5 ? p1.getSymbol() : p2.getSymbol();
  };

  const checkWin = () => {
    const areEqualNotNull = (a, b, c) => {
      if (board[a] != null && board[b] != null && board[c] != null) {
        return (
          board[a] == board[b] && board[a] == board[c] && board[b] == board[c]
        );
      } else {
        return false;
      }
    };

    if (
      areEqualNotNull(0, 1, 2) ||
      areEqualNotNull(0, 3, 6) ||
      areEqualNotNull(3, 4, 5) ||
      areEqualNotNull(6, 7, 8) ||
      areEqualNotNull(1, 4, 7) ||
      areEqualNotNull(2, 4, 6) ||
      areEqualNotNull(2, 5, 8) ||
      areEqualNotNull(0, 4, 8)
    ) {
      gameStatus = turn;
    } else if (roundCount == 9) {
      gameStatus = "Tie";
    }
  };
  return {
    setSymbol,
    getSymbolAtIndex,
    getTurn,
    getGameStatus,
    getBoard,
    resetGame,
  };
})();

const displayControls = (() => {
    const grid = document.querySelectorAll('.cell');
    grid.forEach(cell => {
        cell.addEventListener('click', () =>{
            console.log(cell.id);
            gameLogic.setSymbol(cell.id);
            cell.textContent = gameLogic.getSymbolAtIndex(cell.id);
        });
    })
})();
