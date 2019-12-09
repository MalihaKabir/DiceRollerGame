/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// The Project:
let scores = [ 0, 0 ];
let currentRoundScore = 0;
// This is to keep track of the player that is currently playing.
let activePlayer = 0;

// Grab the current & rounded score and set them to 0, ZERO
let roundedScore0 = document.getElementById('score-0');
let roundedScore1 = document.getElementById('score-1');
let currentScore0 = document.getElementById('current-0');
let currentScore1 = document.getElementById('current-1');
roundedScore0.textContent = 0;
roundedScore1.textContent = 0;
currentScore0.textContent = 0;
currentScore1.textContent = 0;

// Make the photo DOM invisible in display
// document.querySelector('.dicePhoto').style.display = 'none';
let diceDOM = document.querySelector('.dicePhoto');
diceDOM.style.display = 'none';

// EVENT of Roll Dice Button
document.querySelector('.btn-roll').addEventListener('click', function () {
	// 1. Need a random number when someone click the button.
	let dice = Math.floor(Math.random() * 6) + 1;

	// 2. Make the dice photo visible first. Then display the result
	diceDOM.style.display = 'block';
	diceDOM.src = `img/dice-${dice}.png`;

	// 3. Update the current score IF the rolled number is NOT 1
	if (dice !== 1) {
		// Add the number to current score. Whenever user/player roll the dice,
		// 1st, update the current round score. And then display the current round score in the user interface.
		currentRoundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = currentRoundScore;
	} else {
		// 1st, Switch to Next player. Meaning, if dice === 1, it'll run the below operation.


			activePlayer === 0 ? (activePlayer = 1) :
			(activePlayer = 0);

		// 2nd, Rounding the current score to zero again and...
		currentRoundScore = 0;

		// ...and displaying it to the interface.
		currentScore0.textContent = currentRoundScore;
		currentScore1.textContent = currentRoundScore;

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		// diceDOM.style.display = 'none';
	}
});




