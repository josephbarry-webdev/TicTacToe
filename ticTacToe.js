/*minimal global code*/

const gameBoard = ( ()=>{
    
    const newBoard = () => new Array(3).fill("E").map( () => new Array(3).fill(""));
    let board=newBoard();
    
    const getBoard=()=> board;
    const resetBoard=()=> board = newBoard();
    return {getBoard, resetBoard};
})();

const gameController=(()=>{

    const players =
    [   
        {
            name: "Player One",
            mark: "X",
            wins:0
        },
        {
            name: "Player Two",
            mark: "O",
            wins:0
        }
    ];
    let currentPlayer=players[0];
    
    const switchPlayer=()=>{
        currentPlayer=currentPlayer===players[0]? players[1]:players[0];
    }
    const getPlayer=()=>currentPlayer;
    const setPlayerNames=(playerOne="Player One",playerTwo="Player Two")=>{
        players[0].name=playerOne;
        players[1].name=playerTwo;
    }
    const getPlayerName=()=>currentPlayer.name;
    const getPlayerMark=()=>currentPlayer.mark;
   
    const makeMark=(row,col)=>{
        let board=gameBoard.getBoard();
        
        if(board[row][col]===""){
        board[row][col]=getPlayerMark();
        }
        
    }
  
    const checkForTie=()=>{
        let board=gameBoard.getBoard();
        let counter=0;
       for(let i=0;i<board.length;++i){
           for(let j=0;j<board[i].length;++j){
                if(board[i][j]!==""){
                    counter++;
                }
           }
       }
       let tie=false;
       let i=0;
       if(counter===(board[i].length)*(board.length)){
            tie=true;
       }
       console.log(counter);
        return tie;
    }
    
    const checkForWinner=()=>{

        const winningConditions = [
            
            [[0,0],[0,1],[0,2]],
            [[1,0],[1,1],[1,2]],
            [[2,0],[2,1],[2,2]],
            
            [[0,0],[1,0],[2,0]],
            [[0,1],[1,1],[2,1]],
            [[0,2],[1,2],[2,2]],
            
            [[0,0],[1,1],[2,2]],
            [[2,0],[1,1],[0,2]]
            
            ];

        let board=gameBoard.getBoard();
        return winningConditions.some(condition=>
            condition.every(([row,col])=>board[row][col]===gameController.getPlayerMark()));

  
    
};

return {setPlayerNames,getPlayer,getPlayerName,getPlayerMark,switchPlayer,makeMark,checkForWinner,checkForTie};
})();


const game=()=>{
    let playerOne=prompt("Please Enter Player One Name.", "Player One").toString();
    let playerTwo=prompt("Please Enter Player Two Name.", "Player Two").toString();
    gameController.setPlayerNames(playerOne,playerTwo);
    let win=false;
    let board=gameBoard.getBoard();
    let infoBox= document.getElementById("infobox");
    infoBox.textContent=gameController.getPlayerName()+"'s Turn!";
    let container=document.getElementById("gameboard");
   // container.replaceChildren();
    //create board with buttons
    for(let i=0;i<board.length;++i){
        for(let j=0;j<board[i].length;++j){
           // let id="cell"+i.toString() + j.toString();
            let button=document.createElement("input");
            button.setAttribute("type","button");
            button.setAttribute("value", board[i][j]);
            button.setAttribute("class", "gamespace")
         //   button.setAttribute("id",id); //set unique id for each cell

            button.addEventListener("click", ()=>{
                if(board[i][j]===""){
                    gameController.makeMark(i,j);
                    button.setAttribute("value", gameController.getPlayerMark());
                    }
                    else{
                        gameController.switchPlayer();
                    }
                win=gameController.checkForWinner();
                if(win===true){
                    console.log("end of game");
                    endgame("win");
                }
                else if(gameController.checkForTie()===true){
                    endgame("tie");
                }
                else{
                    gameController.switchPlayer();
                    infoBox.textContent=gameController.getPlayerName()+ "'s Turn!";
                }
                console.log(gameBoard.getBoard())
            })
            container.appendChild(button);
        }
    }
    const resetGame=()=>{
        gameBoard.resetBoard();
        game();
    }
    const endgame=(verdict)=>{
        let buttons=document.getElementsByClassName("gamespace");
        for(button of buttons){
            button.disabled=true;
        }
        let outcome= document.getElementById("infobox");
        if(verdict==="win"){
        outcome.textContent=gameController.getPlayerName()+" Wins";
        }
        else if(verdict==="tie"){
            outcome.textContent="Tie Game!";
        }
    }

}
game();


