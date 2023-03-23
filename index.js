const checkerboard = document.getElementById("board");
const tilecolors = ["tan", "black"];
const tiles = [];

function isWhite(index) {
  return ((Math.floor(index / 8) % 2) + index) % 2 == 0
}

let knightPos = 32
let pause = false
let targetPath = []

for (let i = 0; i < 64; i++) {
  const ci = i
  const div = document.createElement("div", { class: "" });
  div.classList.add(isWhite(i) ? "white" : "black")
  div.classList.add("square")
  div.id = "tile" + i
  checkerboard.appendChild(div);

  div.onclick = () => {
    pause = true
    console.log(i)
    Path(node_graph[knightPos], node_graph[ci]).then(newPath => {targetPath = newPath; pause = false})
  }

  tiles[i] = div;
}

const boardScale = .9
const boardSize = Math.min(
  document.body.getBoundingClientRect().width * boardScale,
  document.body.getBoundingClientRect().height * boardScale)

checkerboard.style.width = boardSize + "px"

const knight = document.createElement("img");
knight.classList.add("knight");
knight.src = "Knight.png";
knight.style.height = (boardSize / 8) + "px";
knight.style.width = (boardSize / 8) + "px";
document.body.appendChild(knight);

const corner = -(boardSize / 16) * 7

function updateKnightPos()
{
  knight.style.translate = `${corner + boardSize / 8 * getPos(knightPos)[0]}px ${corner + boardSize / 8 * getPos(knightPos)[1]}px`
}

setInterval(() => {
  if (pause)
    return

  if (targetPath.length > 0)
  {
    knightPos = targetPath[0].index
    targetPath.splice(0, 1)
    updateKnightPos()
  }
}, 250)

updateKnightPos()

// Path(node_graph[0], node_graph[11]).then((thing) => {
//   thing.map((node) => {
//     const div = document.getElementById("tile" + node.index)
//     div.style.backgroundColor = "red"
//   })
// })