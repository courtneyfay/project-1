// TODO: create a 9x9 grid using JS

document.addEventListener('DOMContentLoaded', function() {
  console.log('js is loaded!');

	// global variables
	let gameContainer = document.getElementById('game-container');
	let tdArray = [];
	let wallBlocksArray = [2,3,4,8,11,13,17,18,19,20,22,23,24,25,26,27,33,36,42,45,51,52,53,54,60,63,69,72,73,74,75,76,77,78,79,80];

	function createBoard() {

		// create a new table inside of game-container div
		let table = document.createElement('table');
		gameContainer.append(table);

		// create 9 new table rows and append them to the new table
		for (let i = 0; i < 9; i++) {
			let tr = document.createElement('tr');
			tr.classList.add('table-row');
			table.append(tr);

			//create 9 new cells and append to the corresponding table row
			for (let i = 0; i < 9; i++) {
				let td = document.createElement('td');
				tdArray.push(td);
				tr.append(td);
			}
		}

		// add data-num attributes to all td elements 
		for (let i = 0; i < tdArray.length; i++) {
			tdArray[i].setAttribute('data-num', i);
		}

		//if td array data-num value is equal to one in the wall blocks array, then add a class of wall-block
		for (let i = 0; i < tdArray.length; i++) {
			let tdNum = parseInt(tdArray[i].getAttribute('data-num'));
			for (let i = 0; i < wallBlocksArray.length; i++) {
				let wbNum = wallBlocksArray[i];
				if (tdNum === wbNum) { 
					tdArray[tdNum].classList.add('wall-block');
				} 
			}
		}
	};

	function createCharacter() {

		// constructor function to create character "Court" 
		function Character() {
			this.name = name;
			//this.element = document.createElement("")
		};

		// prototype method for the Character object: move()
		Character.prototype = {
			move: function() {
				console.log('Im moving');
			}
		};

		let court = new Character("Court");

		// turns on event listeners for the arrow keys to help move Court
		//document.addEventListener('keypress',keypressListener);
		console.log(event.key);
		console.log(event);

		// function keypressListener() {
		 	
		// };
    /*if (event.key === 's' || event.key === 'S') { 
      players[0].rideDown();

    } else if (event.key === 'k' || event.key === 'K') {
      players[1].rideDown();
    } else {
      console.log('you pressed the wrong key');
      console.log(event);
      console.log(event.key);
    }*/
   };
   
	createBoard();
	createCharacter();
});