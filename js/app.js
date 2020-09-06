/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore,activePlayer;

scores = [0,0];
roundScore = 0;
activePlayer = 0;

let currentPlayer1 =  document.getElementById('current-0');
let currentPlayer2 =  document.getElementById('current-1');

let scorePlayer1 =  document.getElementById('score-0');
let scorePlayer2 =  document.getElementById('score-1');

let dice = document.querySelector('.dice');
// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// let x = document.querySelector('#score-0').textContent;

document.querySelector('.dice').style.display = 'none';
scorePlayer1.textContent = '0';
scorePlayer2.textContent = '0';
currentPlayer1.textContent = '0';
currentPlayer2.textContent = '0';



document.querySelector('.btn-roll').addEventListener('click', ()=>{
    // 1. random number between 1 -> 6 
    let dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    let diceImg = document.querySelector('.dice');
    diceImg.style.display = 'block';
    diceImg.src = 'img/dice-' + dice + '.png';


    // 3. Update the round score just if the rolled number was not a 1 ...

    if(dice !== 1){
        // Add to score 
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore ;
    }else{
        // Next player
        nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', ()=>{
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update the UI 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // check if the player won the game
    if(scores[activePlayer] >= 100){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        dice.style.display = 'none';
        document.querySelector('.player-'+activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer + '-panel').classList.remove('active');
        
        // alert('Player 1 has won the game');
        // currentPlayer1.textContent = '0';
        // currentPlayer2.textContent = '0';
        // scorePlayer1.textContent = '0';
        // scorePlayer2.textContent = '0';
        // scores.forEach(score => {
        //     score.textContent = '0';
        // });
    }else{
        // Next player
        nextPlayer();
    }

    
    
})


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