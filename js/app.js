/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore,activePlayer, gamePlaying;

let currentPlayer1 =  document.getElementById('current-0');
let currentPlayer2 =  document.getElementById('current-1');

let scorePlayer1 =  document.getElementById('score-0');
let scorePlayer2 =  document.getElementById('score-1');

let dice = document.querySelector('.dice');

let newGame = document.querySelector('.btn-new');




initialGame();


document.querySelector('.btn-roll').addEventListener('click', ()=>{
    
    if(gamePlaying){
        // 1. random number between 1 -> 6 
        let diceNum = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        dice.style.display = 'block';
        dice.src = 'img/dice-' + diceNum + '.png';


        // 3. Update the round score just if the rolled number was not a 1 ...

        if(diceNum !== 1){
            // Add to score 
            roundScore += diceNum;
            document.querySelector('#current-' + activePlayer).textContent = roundScore ;
        }else{
            // Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', ()=>{
    if(gamePlaying){
         // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update the UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if the player won the game
        if(scores[activePlayer] >= 20){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            dice.style.display = 'none';
            document.querySelector('.player-'+activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            // Next player
            nextPlayer();
        }
    }
   
});

newGame.addEventListener('click',initialGame)


function nextPlayer(){
     // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    currentPlayer1.textContent = '0';
    currentPlayer2.textContent = '0';  
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
    
    dice.style.display = 'none';
}

function initialGame() { 
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    dice.style.display = 'none';

    scorePlayer1.textContent = '0';
    scorePlayer2.textContent = '0';
    currentPlayer1.textContent = '0';
    currentPlayer2.textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');    
    
    document.querySelector('.player-0-panel').classList.remove('active');    
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');


    
 }