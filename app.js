const title = document.querySelector(".title-container");
const keyboard = document.querySelector(".keyboard-container");

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

/* Z vsake črke/znaka v polju naredimo button element in 
dodamo v div (.keyboard-container)
*/
keys.forEach((key) => {
  const keyElement = document.createElement("button");
  keyElement.textContent = key;
  keyElement.setAttribute("id", key);
  keyElement.addEventListener("click", () => {
    console.log("Klik");
  });
  keyboard.append(keyElement);
});
