/*
 * Create a list that holds all of your cards
 */
const cardList = ['fa-diamond',
                  'fa-paper-plane-o',
                  'fa-anchor',
                  'fa-bolt',
                  'fa-cube',
                  'fa-anchor',
                  'fa-leaf',
                  'fa-bicycle',
                  'fa-diamond',
                  'fa-bomb',
                  'fa-leaf',
                  'fa-bomb',
                  'fa-bolt',
                  'fa-bicycle',
                  'fa-paper-plane-o',
                  'fa-cube'];

let openCardsList = [];
let matchedCardList = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const shuffledCards = shuffle(cardList);                             // shuffle the deck randomly
console.log(shuffledCards);                                          // temp to display the shuffled deck
const gameBoard = document.querySelector('ul.deck');                 // gameBoard is the deck class element
let iconElements = gameBoard.getElementsByTagName('i');              // iconElements are the <i> icon elements in an HTML live collection
let cardShapes = gameBoard.getElementsByTagName('li');               // cardShapes are the <li> elements in an HTML live collection
const scorePanel = document.querySelector('ul.stars');               // get unordored list containing the star elements
let starsList = scorePanel.getElementsByTagName('i');                // get list of star elements
let counter = 0;                                                     // initialize game move counter at zero at the start of the game
let timerRunning = true;                                             // default the timer running as true.  Will change to false when user wins game
const restartButton = document.querySelector('div.restart');         // load the restart element in restartButton
const modal = document.getElementById('winningModal');               // load the modal in a variable to use later
const scoreWording = document.getElementById('score');               // load the score ID to update the wording when the user wins the game
let stars = 3;                                                       // default number of stars to 3 at the start

for (let i = 0; i < shuffledCards.length; i++){
  let icon = shuffledCards[i];                                       // load icon from shuffled cards
  iconElements[i].className='';                                      // clear out the class name
  iconElements[i].classList.add('fa',shuffledCards[i]);              // load the new class name after shuffling cards
}
console.log(iconElements);                                           // temp to display list of icon elements
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
restartButton.addEventListener('click',restartPage);      //refresh the page
gameBoard.addEventListener('click',cardClicked);          //Add event lister if a card is clicked

function cardClicked () {                                 //Function to do when a card is clicked
    if (event.target.classList.contains('open') || event.target.nodeName !== 'LI' || openCardsList.length === 2) {
      return;                 //if the card is already open, the clicked target isn't a card, or their are currently two cards are currently in the openCardsList to be checked for a match, return (no function is ran)
    }
    if (counter === 0 && openCardsList.length === 0) {
      setTimeout(startTimer, 1000);
    }
    displayCard (event.target);                           //Display the card that is clicked
    addCardToList (event.target);                         //Add card clicked to a list of 'open' cards
    if (openCardsList.length > 1) {                       //Check if there are currently two cards flipped open for a possible match
        incrementCounter ();                              //Increase the move counter by 1
        if (counter >= 12) {
            deduceStars (starsList);
        }
        matchFunction ();                                 //Check if the last two opened cards are a match
    }
}


function displayCard (target) {                                           //Flip card function
    if (target.nodeName === 'LI') {                                       //Check that a card was the item clicked on screen
        target.classList.add('open','show');                              //Show card by adding the open and show classes to <li>
        }
}

function addCardToList (target) {
    let cardName = target.firstElementChild.classList[1];                 //Get the class/card name of the card that was clicked
    openCardsList.push(cardName);                                         //Add the class/card name to a list of currently open cards
}

function matchFunction () {                                               //All the matching functions
    if (checkForMatch () === true) {                                      //Check if the two cards in the openCardsList are a match
        let cardOneIndex = shuffledCards.indexOf(openCardsList[0]);       //get the index of the first matched card
        let cardTwoIndex = shuffledCards.lastIndexOf(openCardsList[1]);   //get the index of the second matched card
        iconElements[cardOneIndex].parentElement.classList.add('match');  //turn the first matched card green
        iconElements[cardTwoIndex].parentElement.classList.add('match');  //turn the second matched card green
        matchedCardList.push(openCardsList[0]);
        matchedCardList.push(openCardsList[1]);
        openCardsList = [];                                               //clear out the open cards list
        console.log(matchedCardList);
        if (matchedCardList.length === 16) {
            timerRunning = false;
            displayModal  ();
        }
    }   else {                                                            //what to do if both cards flipped over are not a match
            window.setTimeout(function unMatchedFunction () {
            let indexes = getIndexes (shuffledCards,openCardsList[0]);              //get indexes of first opened card from the full list of shuffled cards
            iconElements[indexes[0]].parentElement.classList.remove('open','show'); //flip over the unmatched card (first index)
            iconElements[indexes[1]].parentElement.classList.remove('open','show'); //flip over the unmatched card (second index) flip both indexs per icon to ensure card is not showing at either index
            indexes = getIndexes (shuffledCards,openCardsList[1]);                  //get indexes of second opened card from the full list of shuffled cards
            iconElements[indexes[0]].parentElement.classList.remove('open','show'); //flip over the unmatched card (first index)
            iconElements[indexes[1]].parentElement.classList.remove('open','show'); //flip over the unmatched card (second index) flip both indexs per icon to ensure card is not showing at either index
            openCardsList = [];                                                     //blank out list that contains cards that are open
          },800);
    }

}

function checkForMatch () {                               //Check for match function
    return (openCardsList[0] === openCardsList[1]);       //Check if the first card in the open list is the same as the second card in the open list
}

function incrementCounter () {
    counter++;
    document.querySelector('span.moves').innerText = counter;
}

function deduceStars (starsList) {
    if (counter === 12) {
      starsList[2].classList.replace('fa-star','fa-star-o');
      stars = 2;
    }
    else if (counter === 18) {
      starsList[1].classList.replace('fa-star','fa-star-o');
      stars = 1;
    }
    else if (counter === 24) {
      starsList[0].classList.replace('fa-star','fa-star-o');
      stars = 0;
    }
}

function getIndexes (array,value) {                       //function to get indexes of unmatched cards in the shuffled card deck
    let index = [];
    for (i=0;i<array.length;i++) {
        if (array[i] === value) {
            index.push(i);
        }
    }
    return index;
}

function startTimer () {                                                        // live timer function
    if (timerRunning === true) {
      let timeString = document.querySelector('span.gameTimer').innerText;
      let timerArray = timeString.split(':');
      let hours = timerArray[0];
      let minutes = timerArray[1];
      let seconds = timerArray[2];
      if (seconds == 59) {
          if (minutes == 59) {
              if (hours < 9) {
                  hours++;
                  hours = '0'+hours;
                  minutes='00';
                  seconds='00';
              } else {
                  hours++;
                  minutes='00';
                  seconds='00';
              }
          }
          else if (minutes < 9) {
              minutes++;
              minutes = '0'+minutes;
              seconds='00';
          }   else {
                  minutes++;
                  seconds='00';
          }
      }   else {
              if (seconds < 9) {
                  seconds++;
                  seconds = '0'+seconds;
                }   else {
                        seconds++;
                    }
          }

      document.querySelector('span.gameTimer').innerText = hours + ':' + minutes + ':' + seconds;
      setTimeout(startTimer, 1000);
    }
}

function restartPage () {
    document.location.reload();
}

function displayModal () {
    let winningTime = document.querySelector('span.gameTimer').innerText;
    scoreWording.innerText = 'With ' + counter + ' moves and ' + stars + ' stars in ' + winningTime;
    modal.style.display = 'block';
}
