import './TicTacToe.css';
import React,{useState,useEffect} from 'react'

export default function TicTacToe() {
  const emptyBoard = Array(9).fill("")
  const [board,setBoard]= useState(emptyBoard)
  const [currentPlayer,setCurrentPlayer]= useState("O")
  const [winner,setWiner]= useState(null)



  const handleCellClick = (indicie) => {
    if(board[indicie] !== "")return alert("Posição já ocupada")
    if(winner)return alert("Jogo finalizado!")
    
    setBoard(board.map((item,index) => index === indicie ? currentPlayer : item ))
    setCurrentPlayer(currentPlayer === "X" ?  "O" : "X")

  }
  function checkWinner(){
    const WaysWin = [
      [board[0],board[1],board[2]],
      [board[3],board[4],board[5]],
      [board[6],board[7],board[8]],

      [board[0],board[3],board[6]],
      [board[1],board[4],board[7]],
      [board[2],board[5],board[8]],

      [board[0],board[4],board[8]],
      [board[2],board[4],board[6]],
    ]
    WaysWin.forEach(cells =>{
      if(cells.every(cell => cell === "X")) setWiner( "X")
      if(cells.every(cell => cell === "O")) setWiner( "O")

      
    })
    checkDraw()
  }
  const checkDraw = () =>{
    if(board.every(cell => cell !== "")) return setWiner("E")
    
  }

  const  resetGame = () =>{
    setCurrentPlayer("O")
    setBoard(emptyBoard)
    setWiner(null)
  }
  useEffect(checkWinner,[board])
  return (
    <main>
      <h1 className="title">Jogo da Velha</h1>
      <div className={`board ${winner ? "game-over" : ""}`}>
          {board.map(( item,indicie) => (
            <div 
            key={indicie} 
            className={`cell ${item}`}  
            onClick={() => handleCellClick(indicie)}>
            {item}
            </div>
          ))}
      </div>
      {winner &&
        <footer>
          {winner === "E" ?
            <h2 className="winner-message">
              <span className={winner}>Empatou!</span>
           </h2>
           :
            <h2 className="winner-message">
              <span className={winner}>{winner}</span> venceu!
            </h2>
          }
          <button onClick={resetGame} className="button-reset">Recomeçar Jogo</button>
      </footer>
      }
     
    </main>

  );
}


