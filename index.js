// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DECK OF CARDS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

 let deck = {}; // Skapar en variabel för att spara vårat deck i.
 async function getDeck() {
   // En asynchron funktion som vi anropar från root för att hämta vårat deck så fort vår kod laddas och exekveras
  const res = await fetch(
     "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1" // Kolla dokumentationen för api:et hur ni kan skicka in variabler, men här väljer vi att vi bara ska ett deck
   );
   const data = await res.json(); // Vi löser ut body från vårat response och gör om det till ett javascriptobjekt

   console.log(data);
   deck = data; // Vi assignar data till vårat deck så vi kan använda variabeln senare
   console.log(deck);
 }

 getDeck(); // Vi anropar funktionen direkt

 const drawCardButt = document.getElementById("drawCard"); // Hämtar våran knapp vi behöver för att dra kort
 drawCardButt.addEventListener("click", async () => {
   
    // Funktionen anropar api:et och får en array av kort plus lite response data
   const res = await fetch(
     `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
   );
   const data = await res.json();
   console.log(data.cards[0]); // Loggar det första kortet i resultatet då jag bara ville dra 1 kort.
 });