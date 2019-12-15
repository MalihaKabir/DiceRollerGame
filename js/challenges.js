/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable).

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out :)

3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/

let scores, roundScore, activePlayer, gamePlaying, currentDisplayScore0, currentDisplayScore1, dicePhoto, lastDice;

const init = () => {
	scores = [ 0, 0 ];
	currentScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	currentDisplayScore0 = document.getElementById('current-0');
	currentDisplayScore1 = document.getElementById('current-1');
	currentDisplayScore0.textContent = 0;
	currentDisplayScore1.textContent = 0;
	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	dicePhoto = document.querySelector('img');
	dicePhoto.style.display = 'none';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-0-panel').classList.add('active');

	document.querySelector('.winning-score').value = '';
};
init();

const nextPlayer = () => {

		activePlayer === 0 ? (activePlayer = 1) :
		(activePlayer = 0);

	currentScore = 0;
	currentDisplayScore0.textContent = currentScore;
	currentDisplayScore1.textContent = currentScore;

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	dicePhoto.style.display = 'none';
};

document.querySelector('.btn-roll').addEventListener('click', () => {
	if (gamePlaying) {
		// the value of dice variable here, will not be accessible after this function runs.
		let dice = Math.floor(Math.random() * 6) + 1;
		dicePhoto.style.display = 'block';
		dicePhoto.src = `img/dice-${dice}.png`;

		if (dice === 6 && lastDice === 6) {
			scores[activePlayer] = 0;
			document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
			nextPlayer();
		} else if (dice !== 1) {
			currentScore += dice;
			document.getElementById(`current-${activePlayer}`).textContent = currentScore;
		} else {
			nextPlayer();
		}
		// We generate a dice number above. The we do all the above stuffs. And the we check the dice number. And then we store the dice number last, at the end here. So, if we then store the last dice number, we can use this variable the next time that the function runs. But this variable should be declared as a global variable, not here, NOT IN THE LOCAL SCOPE. So that, once this function returns, the value of lastDice won't get lost. If we only declare it here, lastDice will loose it's value.
		lastDice = dice;
	}
});

document.querySelector('.btn-hold').addEventListener('click', () => {
	if (gamePlaying) {
		scores[activePlayer] += currentScore;

		document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
		let input = document.querySelector('.winning-score').value;
		let winningScore;
		if (input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}

		if (scores[activePlayer] >= winningScore) {
			document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
			document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
			document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
			dicePhoto.style.display = 'none';
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);
