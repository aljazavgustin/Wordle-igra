const title = document.querySelector(".title-container");
const keyboard = document.querySelector(".keyboard-container");
const tileDisplay = document.querySelector(".tile-container");

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Z",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Y",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "<<", //BAKCSPACE
];

const guesses = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

/* Trenutna vrstica */
let currentRow = 0;
/* Trenutna pozicija v vrstici */
let currentTile = 0;


/* Naredimo mrežo s polja guesses. Kjer je za vsaki element v polju narejen div,
ki še nato za vsak prazen string v polju naredi nov div */
guesses.forEach((guessRow, guessRowIndex) => {
  const rowElement = document.createElement("div");
  rowElement.setAttribute("id", "guessRow-" + guessRowIndex);
  guessRow.forEach((guess, guessIndex) => {
    const tileElement = document.createElement("div");
    tileElement.setAttribute(
      "id",
      "guessRow-" + guessRowIndex + "-tile-" + guessIndex
    );
    tileElement.classList.add("tile");
    rowElement.append(tileElement);
  });
  tileDisplay.appendChild(rowElement);
});

/* Z vsake črke/znaka v polju naredimo button element in 
dodamo v div (.keyboard-container) q*/
keys.forEach((key) => {
  const keyElement = document.createElement("button");
  keyElement.textContent = key;
  keyElement.setAttribute("id", key);
  keyElement.addEventListener("click", () => {
    handleClick(key);
  });
  keyboard.append(keyElement);
});

const handleClick = (pressedKey) => {
  console.log('Kliknil si', pressedKey);
  addLetter(pressedKey);
}

/* Funkcija, ki doda črko v polje */
const addLetter = (letter) => {
  const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
  tile.textContent = letter;
}