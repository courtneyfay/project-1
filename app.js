document.addEventListener('DOMContentLoaded', function() {
  console.log('js is loaded!');

	// global variables
	let gamePage = document.getElementById('container');
	let hubContentArray = [100,7];
	let wallBlocksArray = [2,3,4,8,11,13,17,18,19,20,22,23,24,25,26,27,33,36,42,45,51,52,53,54,60,63,69,72,73,74,75,76,77,78,79,80];
	let keyArray = [0,7,32,62];
	let keyDoorsArray = [19,23,42,69];
	let chipArray = [10,15,35,37,50,67,71];
	let enemy;
	let timerVar;
	let enemyVar;
	let chipsLeft;
	let tdArray = [];
	let keysCollectedArray = [];
	let currentPage; 

	function clearGamePage(page) {
		// remove all the elements and styles from the character page
  	let destroyMoreDivsNodeList= document.getElementsByTagName('div');

  	for (let i = destroyMoreDivsNodeList.length >>> 0; i--;) {
  		if (destroyMoreDivsNodeList[i].parentNode === gamePage) {
  			gamePage.removeChild(destroyMoreDivsNodeList[i]);
  		}  		
  	};
  	clearInterval(timerVar);
  	clearInterval(enemyVar);
  	gamePage.classList.remove('game-page-background');
  	if (page !== 'dead') {
	  	return;
	  }
	};

	function startFinalBossPage() {

		currentPage = 'boss';
		clearGamePage(currentPage);
  	
  	//add new elements
  	
  }

	function clearWeaponPage(page) {
		// remove all the elements and styles from the weapon page
  	let destroyDaDivsNodeList = document.getElementsByTagName('div');
		for (let i = destroyDaDivsNodeList.length >>> 0; i--;) {
  		gamePage.removeChild(destroyDaDivsNodeList[i]);
  	}
  	gamePage.classList.remove('weapon-page-background');
  	if (page !== 'dead') {
	  	return;
	  }
	};

	function createBoard() {

		currentPage = 'game';
		clearWeaponPage(currentPage);

  	// update the background photo
		gamePage.classList.add('game-page-background');

		// add a game title across the top of the screen
		let gameTitle = document.createElement('div');
		gameTitle.innerHTML = '<h1>dun  Djinn</h1>';
		gameTitle.classList.add('game-page-title');
		gamePage.append(gameTitle);

		// creates the right column and all the HTML elements
		let rightGame = document.createElement('div');
		rightGame.classList.add('game-sidebar');
		gamePage.append(rightGame);

		// creates a key table with 1 row and 4 columns, and pushes it into hubcontentarray
		let keyTable = document.createElement('table');
		keyTable.classList.add('key-table');
		keyTable.setAttribute('align', "center");
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
		
		// adds divs to the right aside and adds classes to style them
		let hubTitlesArray = ['<h1>Timer</h1>', '<h1>Lamps Left</h1>', '<h1>Keys</h1>'];
		for (let i = 0; i < 3; i++) {
			// creates hub titles
			let hubDiv = document.createElement('div');
			hubDiv.classList.add('sidebar-div');
			hubDiv.innerHTML = hubTitlesArray[i];
			rightGame.append(hubDiv);
			
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
		let leftGame = document.createElement('div');
		leftGame.classList.add('game-container');
		gamePage.append(leftGame);

		// add a new table inside of game-container div
		let table = document.createElement('table');
		leftGame.append(table);

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
			// adds a class of portal if array item has an index of 12
			if (tdArray[12]) {
				tdArray[12].classList.add('portal');
			}

			// adds a class of portal-door if array item has an index of 21
			if (tdArray[21]) {
				tdArray[21].classList.add('portal-door');
			}	
		}
	};

	function createCharacter() {

		// constructor function to create characters 
		function Character() {
			this.name = '';
			this.type = '';
			this.element = document.createElement('div');
		};

		// prototype method for the Character object: create(), checkDirection(), randomDirection(), stop(), move(), isWall(), isDoor(), 
		// isPortalDoor(), isPortal(), collect(), isKey(), isChip(), decrementChips(), isLocked(), updateKeyLocker(), openPortalDoor()
		Character.prototype = {

			// creates the player and enemy divs on top of their start cells
			create: function(name,type) {
				this.name = name;
				this.type = type;

				let characterCell = tdArray[0];
				if (name === 'Court') {
					characterCell = tdArray[40];
					this.element.classList.add('player');
					
				} else if (name === 'djinn') {
					characterCell = tdArray[65];
					this.element.classList.add('enemy');
				}
				characterCell.append(this.element);
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

			// chooses a random direction for the character to move from the array (either up, right, down, or left)
			randomDirection: function() {
				let directionArray = [-9, 1, 9, -1]; 
				let randomDir = directionArray[Math.floor(Math.random() * directionArray.length)];		
				this.move(randomDir);
			},

			/*stop: function() {
				console.log('I am trying to stop the genie');
				for (let i = 0; i < tdArray.length; i++) {
					console.log(tdArray[i].classList);
					if (tdArray[i].classList === 'enemy') {
						console.log('we found the genie!' + tdArray[i]);
					}
				};
				//(name === 'djinn') {
					//characterCell = tdArray[65];
					//this.element.classList.add('enemy');
			},*/

			// actually moves the character however many spaces they need to go
			move: function(direction) {
				let thisCell = this.element.parentElement;
				let cellNum = parseInt(thisCell.getAttribute('data-num'));
				
				// add the direction number onto the array so that the character will move the right direction
				cellNum = cellNum + direction;
				let newCell = tdArray[cellNum];

				/* if it's an enemy, 
				it can walk through walls and doors, but can't go through the portal. 
				can trigger endGame() if it touches the player*/
				if (this.type === 'enemy') {
					if (this.isPortal(newCell, this.type)) { 
						//TODO refine this logic because it's breaking
						return;
					} else if (this.isPlayer(newCell)) {
						let playerDiv = document.getElementsByClassName('player')[0]; 
						playerDiv.classList.remove('player'); 
						endGame();
					}
					newCell.append(this.element);
				} 

				/* if a player (not an enemy)
				first check to see whether it is a wall, a keydoor, or the portal door, 
				then look for stuff to collect, 
				then move!*/
				else if (this.type === 'player') {
						if (this.isWall(newCell)) {
						return;
					} else if (this.isPortalDoor(newCell)) {
						this.openPortalDoor(chipsLeft);
					} else if (this.isDoor(newCell)) {
						this.isLocked(newCell);
					} else if (this.isPortal(newCell)) {
						let portal = document.getElementsByClassName('portal')[0];
						portal.classList.remove('portal');
						startFinalBossPage();
					} else {
						this.collect(newCell);
						newCell.append(this.element);
					}
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

			// if cellNum has a class of portal-door, return true, else false
			isPortalDoor: function(newCell) {
				if (newCell.classList.value === 'portal-door') {
					return true;
				} else {
					return false;
				}
			},

			// if cellNum has a class of portal, return true, else false
			isPortal: function(newCell, type) {
				if (newCell.classList.value === 'portal') {
						return true;
					} else {
						return false;
					}
				/*if (type === 'enemy') {
					let checkForPortal = newCell.childNodes;

					//check to make sure it's defined, then look to see if the class is portal
					if (checkForPortal.length === 1) {
						let newCellValue = newCell.childNodes[0].classList.value;
						if (newCellValue === 'portal') {
							return true;
						} else {
							return false;
						}
					}
				}
				else if (type === 'player') {
					let newCellValue = newCell.classList.value;
				}*/
			},

			// if cellNum has a class of player, return true, else false
			isPlayer: function(newCell) {
				let checkForPlayer = newCell.childNodes;

				//check to make sure it's defined, then look to see if the class is player
				if (checkForPlayer.length === 1) {
					if (checkForPlayer[0].classList.value === 'player') {
						return true;
					} else {
						return false;
					}
				}
			},

			// removes the key/chip from the game, decrements chips or adds keys to the key locker, and then adds keys to an array
			collect: function(newCell) {

				// if it's a key, remove it from the game board, make it appear in the key locker, and add it to an array of keys collected
				if (this.isKey(newCell)) {
					newCell.classList.remove('key');
					let key = 1;
					keysCollectedArray.push(key);
					this.updateKeyLocker();
				} 
				//if it's a chip, remove it from the game board, and decrement the total number of chips left to collect
				else if (this.isChip(newCell)) {
					newCell.classList.remove('chip');
					chipsLeft = this.decrementChips();
				} 
			},

			isKey: function(newCell) {
				if (newCell.classList.value === 'key') {
					return true;
				} else {
					return false;
				}
			},

			isChip: function(newCell) {
				if (newCell.classList.value === 'chip') {
					return true;
				} else {
					return false;
				}
			},

			// everytime the player picks up a chip, decrement the number of chips left to pick up
			decrementChips: function() {
				chipsLeft = -- hubContentArray[1];
				let currentChipsDiv = document.getElementsByClassName('sidebar-sub-div')[1];
				currentChipsDiv.textContent = chipsLeft;
				return chipsLeft;
			},

			// check to see if player has a key to "unlock" the door, update the key locker if you use one
			isLocked: function(newCell) {
				let keyLocker = document.getElementsByClassName('key-locker')[0];

				if (keysCollectedArray.length >= 1) {
					newCell.classList.remove('key-door');
					keysCollectedArray.pop();
					this.updateKeyLocker();
				} 
			},

			// either adds or removes a key depending on the length of the keysCollectedArray
			updateKeyLocker: function() {
				
				//reset all keys in the key locker to empty
				for (let i = 0; i < keyArray.length; i++) {
					let keyLocker = document.getElementsByClassName('key-locker')[i];
					keyLocker.classList.remove('key');
				}	

				// add keys to the key locker equal to the number in the keys collected array
				for (let i = 0; i < keysCollectedArray.length; i++) {
					let keyLocker = document.getElementsByClassName('key-locker')[i];
					keyLocker.classList.add('key');
				}	
			},

			openPortalDoor(chipsLeft) {
				if (chipsLeft === 0) {
					let portalDoor = document.getElementsByClassName('portal-door')[0];
					portalDoor.classList.remove('portal-door');
				}
			}
		};

		// creates player as the main character and puts them on the map
		let player = new Character();
		player.create("Court","player");

		// creates enemy as the computer character and puts them on the map
		enemy = new Character();
		enemy.create("djinn","enemy");

		// turns on event listeners for the arrow keys to help move Court
		document.addEventListener('keydown',keypressListener);

		function keypressListener() {
			if (event.key === 'ArrowUp' || event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'ArrowLeft') { 
      	player.checkDirection();	
      }
		};
   };

  function createKeys() {

		// constructor function to create 8 keys
		function Key() {
			this.name = name;
			this.element = document.createElement('div');
		};

		// prototype method for the Key object: create()
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
			}
		};

		// creates 4 keys as divs and puts them on the game
		for (let i = 0; i < keyArray.length; i++) {
			let key = new Key('key' + i);
			key.create();
		};
  };

  function createChips() {

		// constructor function to create 8 keys
		function Chip() {
			this.name = name;
			this.element = document.createElement('div');
		};

		// prototype method for the Chip object: create(), openPortalDoor()
		Chip.prototype = {

			// creates the key as a div on top of cell (listed in keyArray) at the start
			create: function() {
				for (let i = 0; i < tdArray.length; i++) {
					let tdNum = parseInt(tdArray[i].getAttribute('data-num'));
					for (let i = 0; i < chipArray.length; i++) {
						let cNum = chipArray[i];
						if (tdNum === cNum) { 
							tdArray[tdNum].classList.add('chip');
						} 
					}
				}
			}
		};

		// creates 7 chips as divs and puts them on the game
		for (let i = 0; i < chipArray.length; i++) {
			let chip = new Chip('chip' + i);
			chip.create();
		}
  };

  function startTimer() {

  	// decrements the timer by 1 every second and makes the changes appear on the hub content
  	let timeLeft = --hubContentArray[0];
  	let currentTimeDiv = document.getElementsByClassName('sidebar-sub-div')[0];
  	currentTimeDiv.textContent = timeLeft;

  	// calls the endGame() function when the timer gets to 0
  	if (timeLeft === 0) { endGame(); };
  }

  function startEnemy() {
  	enemy.randomDirection();
  };

  function startDeathVideo(page) {
  	// let video = gamePage.createElement('video');
  	// video.src = 'media/videolink.mp4';
  	// video.autoplay = true;

  	// use page variable for if
  	// if cat button, play Littlefinger
  	// if name, play Joffrey
  	// if fishing pole, play Viserys
  	// if dunDjinn, play Tommen
  	// if final boss, play Ygritte
  };

  function endGame() {
  	console.log('GAME OVER!');
  	clearInterval(timerVar);
  	clearInterval(enemyVar);

  	// figure out how to clear the elements for each page -- maybe create a bunch of new functions?
  	// clearGamePage();
  	// clearWeaponPage();
  	// clearNamePage();
  	// clearCharacterPage();
  	// clearLandingPage();

  	// add a parameter that tells it which video to play

  	startDeathVideo(currentPage);
  };

  function startGame() {
  	createBoard();
		createCharacter();
		createKeys();
		createChips();
		timerVar = setInterval(startTimer, 1000);
		enemyVar = setInterval(startEnemy, 1000); 
   };

  function clearNamePage(page) {

  	// remove all the elements and styles from the name page
  	let destroyNameDiv = document.getElementsByTagName('div')[0];
  	gamePage.removeChild(destroyNameDiv);
  	let destroyInputsNodeList = document.getElementsByTagName('input');
		for (let i = destroyInputsNodeList.length >>> 0; i--;) {
  		gamePage.removeChild(destroyInputsNodeList[i]);
  	}
  	gamePage.classList.remove('name-page-background');	
  	
  	if (page !== 'dead') {
	  	return;
	  }
  };

  function startWeaponPage() {

  	currentPage = 'weapon';
		clearNamePage(currentPage);  	

  	// adds a weapon page title across the top of the screen
		let weaponTitleDiv = document.createElement('div');
		gamePage.append(weaponTitleDiv);
		let weaponTitle = document.createElement('h1');
		weaponTitle.classList.add('weapon-title');
		weaponTitle.innerHTML = 'choose your weapon:';
		weaponTitleDiv.append(weaponTitle);

		// update the background photo
		gamePage.classList.add('weapon-page-background');

		// add right column div, book weapon button, and event listener
		let rightWeapon = document.createElement('div');
		rightWeapon.setAttribute('class','right-column-weapon');
		gamePage.append(rightWeapon);
		let bookButton = document.createElement('button');
		bookButton.setAttribute('class','book-button');
		rightWeapon.append(bookButton);
		bookButton.addEventListener('click', startGame);

		// add left column div, fishing pole weapon button, and event listener
		let leftWeapon = document.createElement('div');
		leftWeapon.setAttribute('class','left-column-weapon');
		gamePage.append(leftWeapon);
		let fishingPoleButton = document.createElement('button');
		fishingPoleButton.setAttribute('class','fishing-pole-button');
		leftWeapon.append(fishingPoleButton);
		fishingPoleButton.addEventListener('click', endGame);

		// add middle column div, carabiner weapon button, and event listener
		let middleWeapon = document.createElement('div');
		middleWeapon.setAttribute('class','middle-column-weapon');
		gamePage.append(middleWeapon);
		let carabinerButton = document.createElement('button');
		carabinerButton.setAttribute('class','carabiner-button');
		middleWeapon.append(carabinerButton);
		carabinerButton.addEventListener('click', startGame);
  };

  function clearCharacterPage(page) {

  	// remove all the elements and styles from the character page
  	let destroyDivNodeList= document.getElementsByTagName('div');
  	for (let i = destroyDivNodeList.length >>> 0; i--;) {
  		gamePage.removeChild(destroyDivNodeList[i]);
  	}
  	gamePage.classList.remove('character-page-background');
  	
		if (page !== 'dead') {
  		return;
  	}
  };

  function startNamePage() {

  	let nameArray = ['david','nick','joe','will','michael','matt'];

  	currentPage = 'name';
  	clearCharacterPage(currentPage);

  	// adds a name page title across the top of the screen
		let nameTitleDiv = document.createElement('div');
		gamePage.append(nameTitleDiv);
		let nameTitle = document.createElement('h1');
		nameTitle.classList.add('name-title');
		nameTitle.innerHTML = 'enter your name:';
		nameTitleDiv.append(nameTitle);

		// update the background photo
		gamePage.classList.add('name-page-background');

		// add a text input for username
		let nameInput = document.createElement('input');
		nameInput.setAttribute('type','text');
		nameInput.setAttribute('class','name-input');
		gamePage.append(nameInput);

		// add a button to submit the user name input
		let nameButton = document.createElement('input');
		nameButton.setAttribute('type','submit');
		nameButton.setAttribute('class','name-button');
		gamePage.append(nameButton);
		nameButton.addEventListener('click', checkName);

		// checks to see if user name matches one of the values in the NameArray
		function checkName() {
			let nameInputValue = nameInput.value.toLowerCase();;
			
			for (let i = 0; i < nameArray.length; i++) {
				if (nameInputValue === nameArray[i]) {
					endGame();
				} 
			}

			// save name into user variable REMOVE TOLOWERCASE()
			startWeaponPage();
		};
  }

  function clearLandingPage(page) {
  	// remove all the elements and styles from the landing page
  	let destroyDiv = document.getElementsByTagName('div')[0];
  	gamePage.removeChild(destroyDiv);
  	let destroyButton = document.getElementsByTagName('button')[0];
  	gamePage.removeChild(destroyButton);
  	gamePage.classList.remove('landing-page-background');
  	if (page !== 'dead') {
  		return;
  	}
  };

  function startCharacterPage() {

  	currentPage = 'character';
  	clearLandingPage(currentPage);

  	// add a character page title across the top of the screen
		let characterTitleDiv = document.createElement('div');
		gamePage.append(characterTitleDiv);
		let characterTitle = document.createElement('h1');
		characterTitle.classList.add('character-title');
		characterTitle.innerHTML = 'choose your character:';
		characterTitleDiv.append(characterTitle);

		// update the background photo
		gamePage.classList.add('character-page-background');

		// add right column div, dog character button, and event listener
		let rightCharacter = document.createElement('div');
		rightCharacter.setAttribute('class','right-column');
		gamePage.append(rightCharacter);
		let dogButton = document.createElement('button');
		dogButton.setAttribute('class','dog-button');
		rightCharacter.append(dogButton);
		dogButton.addEventListener('click', startNamePage);

		// add left column div, cat character button, and event listener
		let leftCharacter = document.createElement('div');
		leftCharacter.setAttribute('class','left-column');
		gamePage.append(leftCharacter);
		let catButton = document.createElement('button');
		catButton.setAttribute('class','cat-button');
		leftCharacter.append(catButton);
		catButton.addEventListener('click', endGame);
  }

  function startLandingPage() {

  	currentPage = 'landing';

  	// add a game title across the top of the screen
		let pageTitleDiv = document.createElement('div');
		pageTitleDiv.classList.add('game-title-div');
		gamePage.append(pageTitleDiv);
		let pageTitle = document.createElement('h1');
		pageTitle.classList.add('game-title');
		pageTitle.innerHTML = "Court's quest";
		pageTitleDiv.append(pageTitle);

		// update the background photo
		gamePage.classList.add('landing-page-background');

		// add a button to load the next page
		let startButton = document.createElement('button');
		startButton.setAttribute('class','start-button');
		startButton.innerHTML = 'Start';
		gamePage.append(startButton);

		// add an event listener for button click that takes you to the next page of the quest
		startButton.addEventListener('click', startCharacterPage);
  }

  startLandingPage();
});