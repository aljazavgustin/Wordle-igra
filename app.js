const title = document.querySelector(".title-container");
const keyboard = document.querySelector(".keyboard-container");
const tileDisplay = document.querySelector(".tile-container");
const messageDisplay = document.querySelector(".message-container");

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

/* Spremenljivka za state, kjer preverjamo, če je konec igre */
let isGameOver = false;
/* Beseda za ugibanje */
let wordle = "ADIJO";
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
  if (pressedKey === "<<") {
      deleteLetter()
      return
  }
  if (pressedKey === "ENTER") {
    checkGuess()
    return
  }
  if (currentTile < 5 && currentRow < 6) {
    console.log("Kliknil si", pressedKey);
    addLetter(pressedKey);
  }
};

/* Funkcija, ki doda črko v polje */
const addLetter = (letter) => {
  const tile = document.getElementById(
    "guessRow-" + currentRow + "-tile-" + currentTile
  );
  tile.textContent = letter;
  guesses[currentRow][currentTile] = letter;
  tile.setAttribute("data", letter);
  currentTile++;
};

/* Funkcija, ki zbriše črko v prešnjem polju oz. nastavi vrednost na "" */
const deleteLetter = () => {
  if (currentTile > 0) {
    currentTile--;
    const tile = document.getElementById(
      "guessRow-" + currentRow + "-tile-" + currentTile
    );
    tile.textContent = "";
    guesses[currentRow][currentTile] = "";
    tile.setAttribute("data", "");
  }
}

/* Funkcija, ki preveri vrstico z izbrano besedo */
const checkGuess = () => {
  if (currentTile === 5) {
    const guess = guesses[currentRow].join('');
    addColors();
    if (guess == wordle) {
      showMessage("Odlično!");
    } else {
      if (currentRow >= 5) {
        isGameOver = true;
        showMessage("Konec igre!");
        return
      }
      if (currentRow < 5) {
        currentRow++;
        currentTile = 0;
      }
    }
  }
}

const showMessage = (message) => {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  setTimeout(() => {
    messageDisplay.removeChild(messageElement);
  }, 2000);
}

/* Funkcija za spreminjanje barv glede na pravilnost poizkusa 
   Zelena = pravilna črka na pravilnem mestu
   Rumena = črka obstaja v besedi, ampak ni na pravilnem mestu
   Siva = črke ni v besedi
*/
const addColors = () => {
  const rowTiles = document.querySelector("#guessRow-" + currentRow).childNodes;

  rowTiles.forEach((tile, index) => {
    const letterData = tile.getAttribute("data");
    setTimeout(() => {
      tile.classList.add('flip');
      if (letterData == wordle[index]) {
        tile.classList.add("green-box");
        addColorsToKeyboard(letterData, "green-box");
      } else if (wordle.includes(letterData)) {
        tile.classList.add("yellow-box");
        addColorsToKeyboard(letterData, "yellow-box");
      } else {
        tile.classList.add("grey-box");
        addColorsToKeyboard(letterData, "grey-box");
      }
    }, index * 500);
  })
}

const addColorsToKeyboard = (keyLetter, color) => {
  const key = document.getElementById(keyLetter);
  key.classList.add(color);
}