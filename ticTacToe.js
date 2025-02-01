/*minimal global code*/

//make board
//fill board with default values
//make player one
//make player two
//game start - while not 
//[0,0][0,1][0,2]
//[1,0][1,1][1,2]
//[2,0][2,1][2,2]
//[0,0][1,0][2,0]
//[0,1][1,1][2,1]
//[0,2][1,2][0,2]
//[0,0][1,1][2,2]
//[2,0][,1][0,2]
//player one turn
//player one chnages value on board


//gameboard module
const gameBoard=(function(){
    const rows=3;
    const col=3;
    const board=[];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < col; j++) {
          board[i].push(cell());
        }
      }

    const getBoard= () => board;

    //function insertMark(row,col)
      
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
      };

    return { getBoard, printBoard };
})();

//cell
//cell value is "E"=empty, "X"=playerOne, "O"=playerTwo
function cell(){
    let value="E";

    const makeMark=(player)=>{
        value=player;
    }

    const getValue = () => value;

    return {
        makeMark,
        getValue
      };
}


/*Player*/


/*game*/
function game(
    playerOne = "Player One",
    playerTwo = "Player Two"
) {
    //const board = gameBoard();
    const players = [{
            name: playerOne,
            mark: "X"
        },
        {
            name: playerTwo,
            mark: "O"
        }
    ];
    let activePlayer = players[0];
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
        
    };
    printNewRound();
    switchPlayerTurn();
    console.log(`${getActivePlayer().name}`);
    printNewRound();

};