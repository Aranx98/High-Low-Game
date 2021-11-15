let deck={}; //skapar en variabel för att spara vårat deck i

const card = document.getElementById("card");
const lowerButton = document.getElementById("lower");
const higherButton = document.getElementById("higher");
const drawCardButton = document.getElementById("drawCard");

async function getDeck(){ 
    const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1" );
    const data = await res.json(); // Löser ut body från vårat response och gör det till en 
    console.log(data);
    deck = data; // assignar data till vårat deck så att vi kan använda variabeln senare
    console.log(deck);
}

getDeck(); // Anropar funktionen direkt

async function drawnewCard() {
  const res = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
  const data = await res.json();
  //console.log(data.cards[0]); // Logging the first card
  image.setAttribute("src", data.cards[0].image);
  currentCard = data.cards[0].value;
  console.log(data.cards[0]);
  currentCard = convertRoyals(currentCard);
  }

drawCardButton.addEventListener("click", async() => {
  const res = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
  const data = await res.json();
  //console.log(data.cards[0]); // Logging the first card
  image.setAttribute("src", data.cards[0].image);
  oldCard = data.cards[0].value;
  oldCard = convertRoyals(oldCard);
  console.log(data.cards[0]);
});


lowerButton.addEventListener("click", async() => {
  await lower();
});

higherButton.addEventListener("click", async() => {
  await higher();
});

async function lower() {
  drawnewCard(2);
}

async function higher() {
  drawnewCard();
}

async function convertRoyals(card) {
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
          return parseInt(card);

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