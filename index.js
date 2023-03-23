const checkerboard = document.getElementById("board");
const tilecolors = ["tan", "black"];
const tiles = [];

function isWhite(index)
{
  return ((Math.floor(i / 8) % 2) + i) % 2 == 0
}

let pause = false
let targetPath = []

for (var i = 0; i < 64; i++) {
  const div = document.createElement("div", { class: "" });
  div.classList.add(isWhite(i)?"white":"black")
  div.id="tile"+i
  checkerboard.appendChild(div);

  div.onclick = () => {
    pause = true
    Path(node_graph)
  }

  tiles[i] = div;
}

const boardScale = .9
const boardSize = Math.min(
  document.body.getBoundingClientRect().width*boardScale, 
  document.body.getBoundingClientRect().height*boardScale)

checkerboard.style.width = boardSize+"px"

const knight = document.createElement("img");
knight.classList.add("knight");
knight.src = "Knight.png";
knight.style.height = (boardSize / 8)+"px";
knight.style.width = (boardSize / 8)+"px";
document.body.appendChild(knight);

let knightPos = 32

setInterval(() => {

}, .5)

Path(node_graph[0], node_graph[11]).then((thing) => {
  thing.map((node) => {
    const div = document.getElementById("tile"+node.index)
    div.style.backgroundColor = "red"
  })
})