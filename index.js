let deck={}; //skapar en variabel för att spara vårat deck i
let currentCard = 0;
let oldCard = 0;
let ArraywithCards = [];

const card = document.getElementById("card");
const lowerButton = document.getElementById("lower");
const higherButton = document.getElementById("higher");
const drawCardButton = document.getElementById("drawCard");


async function getDeck(){ 
    const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1" );
    const data = await res.json(); 
    
    deck = data; // assignar data till vårat deck så att vi kan använda variabeln senare
    
}

getDeck(); // Anropar funktionen direkt

async function drawFirstCard() {
  const res = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
  const data = await res.json();
  
  image.setAttribute("src", data.cards[0].image);
  oldCard = convertRoyals(data.cards[0].value);

  return oldCard;

}

async function drawnewCard() {
  const res =await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
  const data = await res.json();

  image.setAttribute("src", data.cards[0].image);
  currentCard =convertRoyals(data.cards[0].value);
  currentCard = data.cards[0].value;

  return currentCard;

}

drawCardButton.addEventListener("click", async() => {
  const firstCard = await drawFirstCard();
  ArraywithCards.push(firstCard);

});

lowerButton.addEventListener("click", async() => {
  await lower();
 
});

higherButton.addEventListener("click", async() => {
  await higher();
  
});

async function lower() {
  const currentCard = await drawnewCard();
  ArraywithCards.push(currentCard); 

  if(ArraywithCards[0] > ArraywithCards[1]) { //Jämför det första kortet med det andra.
    console.log("Du svarade rätt, kortet var lägre.");

  } else {

    console.log("Du svarade fel, kortet var högre.");
  }
   ArraywithCards.shift();
}

async function higher() {
  const currentCard = await drawnewCard();
  ArraywithCards.push(currentCard); 

  if(ArraywithCards[0] < ArraywithCards[1]) { //Jämför det första kortet med det andra.
    console.log("Du svarade rätt, kortet var högre.");

  } else {

    console.log("Du svarade fel, kortet var lägre.");
  }
   ArraywithCards.shift();

}

function convertRoyals(card) {
  switch (card) {
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "10":
          card = parseInt(card);
          break
      case 'ACE':
          card = 14
          break
      case 'KING':
          card = 13
          break
      case 'QUEEN':
          card = 12
          break
      case 'JACK':
          card = 11
          break
      default:
          console.log("Somethings Wrong");
          break;
  }
  return card
}