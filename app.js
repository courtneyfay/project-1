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
			this.element = document.createElement('div');
			//this.class = element.classList.add('court');
		};

		// prototype method for the Character object: move()
		Character.prototype = {

			// creates the character as a div on top of cell 40 to start
			create: function() {
				let specialCell = tdArray[40];
				specialCell.append(this.element);
				this.element.classList.add('character');
			},

			// decides whether to move the character up, right, down or left depending on which arrow key was pressed
			checkDirection: function() {
				switch (event.key) {
					case 'ArrowUp':
						// check for wall blocks first!!

						// move Court div up 9 numbers in the td Array
						this.move(-9);
						break;
					
					case 'ArrowRight':
						// check for wall blocks first!!

						// move Court div right 1 number in the td Array
						this.move(1);
						break;
					
					case 'ArrowDown':
						// check for wall blocks first!!

						// move Court div down 9 numbers in the td Array
						this.move(9);
						break;

					case 'ArrowLeft':
						// check for wall blocks first!!

						// move Court div left 1 number in the td Array
						this.move(-1);
						break;
				} 
			}, 

			// actually moves the character however many spaces they need to go
			move: function(direction) {
				let thisCell = this.element.parentElement;
				let cellNum = parseInt(thisCell.getAttribute('data-num'));
				
				cellNum = cellNum + direction;
				let newCell = tdArray[cellNum];
				newCell.append(this.element);
			}
		};

		// creates Court as the main character and puts her on the map
		let court = new Character("Court");
		court.create();

		// turns on event listeners for the arrow keys to help move Court
		document.addEventListener('keydown',keypressListener);

		function keypressListener() {
			if (event.key === 'ArrowUp' || event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'ArrowLeft') { 
      	court.checkDirection();	
      }
		};
   };

  function startGame() {
  	createBoard();
		createCharacter();
  };

  startGame();
});