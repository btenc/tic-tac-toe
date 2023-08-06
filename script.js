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
  let grid = document.querySelectorAll(".cell");
  let gameGrid = document.querySelector(".gameGrid");
  let cellSection = document.querySelector(".cells");

  let turnDisplay = document.querySelector(".turn-notifier");
  turnDisplay.textContent = ("It's " + gameLogic.getTurn() +"'s turn.");

  grid.forEach((cell) => {
    cell.addEventListener("click", () => {
      console.log(cell.id);
      gameLogic.setSymbol(cell.id);
      cell.textContent = gameLogic.getSymbolAtIndex(cell.id);
      turnDisplay.textContent = ("It's " + gameLogic.getTurn() +"'s turn.");
      if (gameLogic.getGameStatus() != "Playing") {
        endGameDisplay(gameLogic.getGameStatus());
      }
    });
  });

  const endGameDisplay = (result) => {
    let gameEndedBox = document.createElement("h1");
    gameEndedBox.classList.add("game-over-box");
    if (result == "X" || result == "O") {
      gameEndedBox.textContent = result + " Wins!";
    } else {
      gameEndedBox.textContent = "It's a tie!";
    }

    let gameEndedButton = document.createElement("button");
    gameEndedButton.textContent = "Restart";
    gameEndedButton.addEventListener("click", () => {
      gameLogic.resetGame();
      resetDisplay();
    });

    gameEndedBox.appendChild(gameEndedButton);
    gameGrid.appendChild(gameEndedBox);
    cellSection.classList.add("noclick-blur");
  };

  const resetDisplay = () => {
    gameGrid.innerHTML = "";
    let newTurn = document.createElement("div");
    newTurn.classList.add("turn-notifier");
    let newContainer = document.createElement("div");
    newContainer.classList.add("cells");
    gameGrid.appendChild(newTurn);
    gameGrid.appendChild(newContainer);

    for (i = 0; i < 9; i++) {
      let newBox = document.createElement("div");
      newBox.classList.add("cell");
      newBox.setAttribute("id", i);
      newContainer.appendChild(newBox);
    }

    grid = document.querySelectorAll(".cell");
    gameGrid = document.querySelector(".gameGrid");
    cellSection = document.querySelector(".cells");
    turnDisplay = document.querySelector(".turn-notifier");

    turnDisplay.textContent = ("It's " + gameLogic.getTurn() +"'s turn.");

    grid.forEach((cell) => {
      cell.addEventListener("click", () => {
        console.log(cell.id);
        gameLogic.setSymbol(cell.id);
        cell.textContent = gameLogic.getSymbolAtIndex(cell.id);
        turnDisplay.textContent = ("It's " + gameLogic.getTurn() +"'s turn.");
        if (gameLogic.getGameStatus() != "Playing") {
          endGameDisplay(gameLogic.getGameStatus());
        }
      });
    });
  };
})();
