// TODO: create a 9x9 grid using JS

document.addEventListener('DOMContentLoaded', function() {
  console.log('js is loaded!');

	// global variables
	let gamePage = document.getElementById('game-page');
	let hubContentArray = [100,5];
	let wallBlocksArray = [2,3,4,8,11,13,17,18,19,20,22,23,24,25,26,27,33,36,42,45,51,52,53,54,60,63,69,72,73,74,75,76,77,78,79,80];
	let keyArray = [0,7,32,62];
	let keyDoorsArray = [19,23,69];
	let tdArray = [];
	let keysCollectedArray = [];

	function createBoard() {

		// creates the right column and all the HTML elements
		let rightColumn = document.createElement('aside');
		rightColumn.classList.add('game-sidebar');
		gamePage.append(rightColumn);

		// creates a key table with 1 row and 4 columns, and pushes it into the hubcontentarray
		let keyTable = document.createElement('table');
		keyTable.classList.add('key-table');
		hubContentArray.push(keyTable);

		for (let i = 0; i < 1; i++) {
			let tr2 = document.createElement('tr');
			tr2.classList.add('table-row');
			keyTable.append(tr2);

			for (let i = 0; i < 4; i++) {
				let td2 = document.createElement('td');
				td2.classList.add('key-locker');
				tr2.append(td2);
			}
		}

		/*// create 9 new table rows and append them to the new table
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
		}*/
		
		// adds divs to the right aside and adds classes to style them
		let hubTitlesArray = ['Timer', 'Chips Left', 'Keys'];
		for (let i = 0; i < 3; i++) {
			// creates hub titles
			let hubDiv = document.createElement('div');
			hubDiv.classList.add('sidebar-div');
			hubDiv.innerHTML = hubTitlesArray[i];
			rightColumn.append(hubDiv);
			
			// creates hub content 
			let hubSubDiv = document.createElement('div');
			hubSubDiv.classList.add('sidebar-sub-div');
			if (typeof(hubContentArray[i]) === 'object') {
				hubSubDiv.append(keyTable);
			} else {
				hubSubDiv.innerHTML = hubContentArray[i];
			}
			hubDiv.append(hubSubDiv);
		}
		
		// creates the left column and all the HTML elements
		let leftColumn = document.createElement('div');
		leftColumn.classList.add('game-container');
		gamePage.append(leftColumn);

		// add a new table inside of game-container div
		let table = document.createElement('table');
		leftColumn.append(table);

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

		//if td array data-num value is equal to one in the wall blocks array, 
		for (let i = 0; i < tdArray.length; i++) {
			let tdNum = parseInt(tdArray[i].getAttribute('data-num'));

			// then add a class of wall-block
			for (let i = 0; i < wallBlocksArray.length; i++) {
				let wbNum = wallBlocksArray[i];
				if (tdNum === wbNum) { 
					tdArray[tdNum].classList.add('wall-block');
				} 
			}
			// adds a class of key-door if in the keyDoors array
			for (let i = 0; i < keyDoorsArray.length; i++) {
				let kdNum = keyDoorsArray[i];
				if (tdNum === kdNum) {
					tdArray[tdNum].classList.remove('wall-block');
					tdArray[tdNum].classList.add('key-door');
				}
			}
		}
	};

	function createCharacter() {

		// constructor function to create character "Court" 
		function Character() {
			this.name = name;
			this.element = document.createElement('div');
		};

		// prototype method for the Character object: create(), checkDirection(), move(), isWall(), isDoor(), collect(), isKey()
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
						this.move(-9);
						break;
					
					case 'ArrowRight':
						this.move(1);
						break;
					
					case 'ArrowDown':
						this.move(9);
						break;

					case 'ArrowLeft':
						this.move(-1);
						break;
				} 
			}, 

			// actually moves the character however many spaces they need to go
			move: function(direction) {
				let thisCell = this.element.parentElement;
				let cellNum = parseInt(thisCell.getAttribute('data-num'));
				
				// add the direction number onto the array so that the character will move the right direction
				cellNum = cellNum + direction;
				let newCell = tdArray[cellNum];

				// first check to see whether it is a wall or a keydoor, then look for stuff to collect and move!
				if (this.isWall(newCell)) {
					return;
				} else if (this.isDoor(newCell)) {
					console.log('next step is to check to see if chip has collected the key!');
				} else {
					this.collect(newCell);
					newCell.append(this.element);
				}
			},

			// if cellNum has a class of wall-block, return true, else false
			isWall: function(newCell) {
				if (newCell.classList.value === 'wall-block') {
					return true;
				} else {
					return false;
				}
			},

			// if cellNum has a class of key-door, return true, else false
			isDoor: function(newCell) {
				if (newCell.classList.value === 'key-door') {
					return true;
				} else {
					return false;
				}
			},

			collect: function(newCell) {
				if (this.isKey(newCell) /*|| this.isChip(newCell)*/) {
					
					// first make the key div disappear from the map 
					newCell.classList.remove('key');
				
					// TODO: next make the key div appear on the right hand side in the 'key locker'

					// finally, push the key into an array of keys collected?


				} else {
					console.log('naht a key');
				};
			},

			isKey: function(newCell) {
				if (newCell.classList.value === 'key') {
					return true;
				} else {
					return false;
				}
			},

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

  function createKeys() {

		// constructor function to create 8 keys
		function Key() {
			this.name = name;
			this.element = document.createElement('div');
		};

		// prototype method for the Key object: create(), openDoor()
		Key.prototype = {

			// creates the key as a div on top of cell (listed in keyArray) at the start
			create: function() {
				for (let i = 0; i < tdArray.length; i++) {
					let tdNum = parseInt(tdArray[i].getAttribute('data-num'));
					for (let i = 0; i < keyArray.length; i++) {
						let kNum = keyArray[i];
						if (tdNum === kNum) { 
							tdArray[tdNum].classList.add('key');
						} 
					}
				}
			},

			openDoor() {
				console.log('I tried to open a door!');
			}
		};

		// creates 4 keys as divs and puts them on the map
		for (let i = 0; i <keyArray.length; i++) {
			let key = new Key('key' + i);
			key.create();
		}
  };

  function startTimer() {
  	// console.log('I started the timer at 100 seconds');
  	// console.log(hubContentArray[0]); //timer value

  	/*function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};*/
  }

  function startGame() {
  	createBoard();
		createCharacter();
		createKeys();
		startTimer();
  };

  startGame();
});