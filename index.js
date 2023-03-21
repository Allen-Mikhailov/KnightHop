const checkerboard = document.getElementById("board");
const tilecolors = ["tan", "black"];
const tiles = [];

for (var i = 0; i < 64; i++) {
  const div = document.createElement("div", { class: "" });
  // div.id="tile"+i
  div.style.background = tilecolors[((Math.floor(i / 8) % 2) + i) % 2];
  checkerboard.appendChild(div);
  tiles[i] = div;
}

const knight = document.createElement("img");
knight.classList.add("knight");
knight.src = "Knight.png";
knight.style.height = checkerboard.height / 8;
knight.style.width = checkerboard.height / 8;
document.body.appendChild(knight);
