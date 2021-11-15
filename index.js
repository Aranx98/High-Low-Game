let deck={}; //skapar en variabel för att spara vårat deck i

const smallPokeDex = document.getElementById("smallPokeDex");
const lowerbutton = document.getElementById("lower");
const higherbutton = document.getElementById("higher");


async function getDeck(){ 
    const res = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const data = await res.json(); // Löser ut body från vårat response och gör det till en 

    console.log(data);
    deck = data; // assignar data till vårat deck så att vi kan använda variabeln senare
    console.log(deck);
}

getDeck(); // Anropar funktionen direkt

const drawCardButt = document.getElementById("drawCard"); // Hämtar våran knapp vi behöver för att dra kort


drawCardButt.addEventListener("click", async () => {
  // Funktionen anropar api:et och får en array av kort plus lite response data
  const res = await fetch(
    https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1
  );
  const data = await res.json();

  const displayCard = data.cards[0];

  console.log(data); // Loggar det första kortet i resultatet då jag bara ville dra 1 kort.

  smallPokeDex.children[0].innerText = displayCard.code;
  smallPokeDex.children[1].setAttribute("src", displayCard.image);

});