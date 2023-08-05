const playerFactory = (symbol) => {
    const getSymbol = () => {
        return symbol;
    }
    return{getSymbol}
};

const gameBoard = (() => {
    const roundCount = 0;

    const board = [null, null, null,
                   null, null, null,
                   null, null, null];

    const setSymbol = (index, symbol) => {
        if(board[index] === null){
            board[index] = symbol;
            roundCount++;
        }
        if(roundCount == 9){
            return "Tie";
        }
    }

    const getSymbol = (index) => {
        return board[index];
    }

    const clearBoard = () => {
        board = [null, null, null,
                 null, null, null,
                 null, null, null];
    }

    const checkWin = (symbol) => {
        const areEqualNotNull = (a,b,c) => {
            if((board[a] != null) && (board[b] != null) && (board[c] != null)){
                return ((board[a] == board[b]) && (board[a] == board[c]) && (board[b] == board[c]));
            }
            else{
                return false;
            }
        }
        if((areEqualNotNull(0,1,2)) || (areEqualNotNull(0,3,6)) || (areEqualNotNull(3,4,5))
        || (areEqualNotNull(6,7,8)) || (areEqualNotNull(1,4,7)) || (areEqualNotNull(2,4,6)) 
        || (areEqualNotNull(2,5,8)) || (areEqualNotNull(0,4,8))){
            if(symbol == "X"){
                return "X";
            }
            else{
                return "O";
            }
        }
        else{
            return false;
        }
    }

    return {setSymbol, getSymbol, clearBoard, checkWin}

})();
