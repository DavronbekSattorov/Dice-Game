'use strict'

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');



// let scores = [0,0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

// Starting conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

let scores, currentScore, activePlayer, playing;

const init = function () {
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();


const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;
       activePlayer = activePlayer === 0 ? 1 : 0;

       player0El.classList.toggle('player--active');
       player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {

    if(playing) {

        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);
        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. Check for rolled 1
        if (dice !== 1){
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else{
        switchPlayer();
            
        }
    }


    });


btnHold.addEventListener('click', function () {
    if(playing){

    
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100){

            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }else{
            switchPlayer();
        }
        //Finish the game

    }

    // Switch to the next player
    
});


btnNew.addEventListener('click', init);










// How to play?
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');


const closeModel = function (){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

const openModel = function () {
    console.log('Button clicked');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

for (let i=0; i < btnOpenModal.length; i++)
    btnOpenModal[i].addEventListener('click', openModel);

   
    

btnCloseModal.addEventListener('click',closeModel);   
overlay.addEventListener('click', closeModel); 

document.addEventListener('keydown',function(e){

    if (e.key === 'Escape' && !modal.classList.contains('hidden'))
    {
        closeModel();
    }
});