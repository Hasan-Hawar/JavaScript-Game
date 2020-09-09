/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

let scores, roundScore,activePlayer, gamePlaying;

let currentPlayer1 =  document.getElementById('current-0');
let currentPlayer2 =  document.getElementById('current-1');

let scorePlayer1 =  document.getElementById('score-0');
let scorePlayer2 =  document.getElementById('score-1');

let dice1 = document.getElementById('dice-1');
let dice2 =  document.getElementById('dice-2');

let newGame = document.querySelector('.btn-new');




initialGame();
let lastDice;

document.querySelector('.btn-roll').addEventListener('click', ()=>{
    
    if(gamePlaying){
        // 1. random number between 1 -> 6 
        let diceNum_1 = Math.floor(Math.random() * 6) + 1;
        let diceNum_2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        dice1.style.display = 'block';
        dice2.style.display = 'block';
        // dice.style.display = 'block';
        dice1.src = 'img/dice-' + diceNum_1 + '.png';
        dice2.src = 'img/dice-' + diceNum_2 + '.png';


        // 3. Update the round score just if the rolled number was not a 1 ...

        if(diceNum_1 !== 1 && diceNum_2 !== 1){
            // Add to score 
            roundScore += diceNum_1 + diceNum_2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else{
            // Next player
            nextPlayer();
        }

        /*if(diceNum === 6 && lastDice === 6){
            // Player looses the score
            scores[activePlayer] =  0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }else if(diceNum !== 1){
            // Add to score 
            roundScore += diceNum;
            document.querySelector('#current-' + activePlayer).textContent = roundScore ;
        }else{
            // Next player
            nextPlayer();
        }
        lastDice = diceNum;*/
    }
});

document.querySelector('.btn-hold').addEventListener('click', ()=>{
    if(gamePlaying){
         // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update the UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        let input = document.querySelector('.final-score').value;
        let winnigScore;
        if(input){
            winnigScore = input;
        }else{
            winnigScore = 100;
        }
        // check if the player won the game
        if(scores[activePlayer] >= winnigScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            
            hideDice();
            
            document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
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
    
    hideDice();
}

function initialGame() { 
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    hideDice();

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

 function hideDice(){
    dice1.style.display = 'none';
    dice2.style.display = 'none';
 }