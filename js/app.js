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
                  'fa-paper-plane-o',
                  'fa-anchor',
                  'fa-bolt',
                  'fa-cube',
                  'fa-anchor',
                  'fa-leaf',
                  'fa-bicycle'];
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

 gameBoard.addEventListener('click',displayCard);         //Add event lister if a card is clicked

 function displayCard (event) {                           //Flip card function
   if (event.target.nodeName === 'LI') {                  //Check that a card was the item clicked on screen
        event.target.classList.add('open','show');        //Show card by adding the open and show classes to <li>
   }

 }
