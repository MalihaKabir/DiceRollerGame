/*
GAME RULES:

- The game has 2 players, playing in rounds.
- In each turn, a player rolls a dice as many times as he whishes. Each result gets added to his ROUND score.
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL(main) score. After that, it's the next player's turn.
- The first player to reach 100 points on GLOBAL score wins the game.

*/

// THE PROJECT:
// Declare all the variables at the top(no need to define them at first). So that, you can use all of these variable wherever you want without facing scope problem.
let scores, currentRoundScore, activePlayer, currentScore0, currentScore1, gamePlaying, diceDOM;

// Creating an initial function to set all the variables of the project. All the variables we need will be included here. This function won't return anything. It'd just initialize our project.
const init = () => {
	scores = [ 0, 0 ];
	currentRoundScore = 0;
	// This is to keep track of the player that is currently playing.
	activePlayer = 0;
	// A State variable simply tells us the condition of a system. And we need a State variable when we need to remember something or the state of something. And in this case, this will be 'is our game playing' or 'is our game not playing'. So, gamePlaying is the state variable here.
	gamePlaying = true;
	// Grab the current & rounded score and set them to 0, ZERO.
	// When you want to grab any ID, use getElementById(), instead of querySelector(). 'Cause it's a bit fast. Other than this, querySelector() is good to use.
	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	currentScore0 = document.getElementById('current-0');
	currentScore1 = document.getElementById('current-1');
	currentScore0.textContent = 0;
	currentScore1.textContent = 0;
	// Make the photo DOM invisible in display
	diceDOM = document.querySelector('.dicePhoto');
	diceDOM.style.display = 'none';
	// Change name back to player after clicking 'new game' button.
	document.getElementById(`name-0`).textContent = 'Player 1';
	document.getElementById(`name-1`).textContent = 'Player 2';
	document.querySelector(`.player-0-panel`).classList.remove('winner');
	document.querySelector(`.player-1-panel`).classList.remove('winner');
	// In case, the winner can be player-0 and player-0 can already be in active mode. So, without assuming anything, we'd always remove active class first from both of them to make sure that no active classes anywhere.
	document.querySelector(`.player-0-panel`).classList.remove('active');
	document.querySelector(`.player-1-panel`).classList.remove('active');
	// And then we'd add 'active' class back to player-0.
	document.querySelector(`.player-0-panel`).classList.add('active');
};
// Call it first, always.
init();

// Go to next player function
const nextPlayer = () => {
	// 1st, Switch to Next player. Meaning, if dice === 1, it'll run the below operation.


		activePlayer === 0 ? (activePlayer = 1) :
		(activePlayer = 0);

	// 2nd, Rounding the current score to zero again and...
	currentRoundScore = 0;

	// ...and displaying it to the interface.
	currentScore0.textContent = currentRoundScore;
	currentScore1.textContent = currentRoundScore;

	// Then toggle the 'active' class to show/hide active status.
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	diceDOM.style.display = 'none';
};

// EVENT of Roll Dice Button
document.querySelector('.btn-roll').addEventListener('click', () => {
	// If a user clicks on roll-dice button, dice-btn will only work if the game is playing, meaning if gamePlaying is true. And here's no "else", because we don't want anything to happen if the game is not playing/active. So,
	if (gamePlaying) {
		// 1. Need a random number when someone click the button.
		let dice = Math.floor(Math.random() * 6) + 1;

		// 2. Make the dice photo visible first. Then display the result
		diceDOM.style.display = 'block';
		diceDOM.src = `img/dice-${dice}.png`;

		// 3. Update the current score IF the rolled number is NOT 1 or greater than 1.
		if (dice !== 1) {
			// Add the number to current score. Whenever user/player roll the dice,
			// 1st, update the current round score. And then display the current round score in the user interface.
			currentRoundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = currentRoundScore;
		} else {
			// Switch to next player
			nextPlayer();
		}
	}
});

// EVENT of Hold button
document.querySelector('.btn-hold').addEventListener('click', () => {
	// If the game is playing, do all these stuffs here. Meaning, hold-btn will work too.
	// And here's NO "else" either, because of the same reason.
	if (gamePlaying) {
		// First define what we want to happen.
		// So, first add CurrentRound score to Global score.
		scores[activePlayer] += currentRoundScore;

		// Update the UI
		document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

		// Check if player won the game
		if (scores[activePlayer] >= 100) {
			// Changing the winner on UI
			document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
			// Won't display any dice photo anymore
			diceDOM.style.display = 'none';
			// Rounding the current score to zero again and...
			currentRoundScore = 0;
			// ...and updating it to the interface.
			currentScore0.textContent = currentRoundScore;
			currentScore1.textContent = currentRoundScore;
			// Changing UI of winning & active player
			document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
			document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
			// While a winner is declared, no game-playing anymore. So, change the state to false.
			gamePlaying = false;
		} else {
			// And only if the player doesn't win, then switch to the next player
			nextPlayer();
		}
	}
});

// Reset All by calling the initial function
document.querySelector('.btn-new').addEventListener('click', init);
