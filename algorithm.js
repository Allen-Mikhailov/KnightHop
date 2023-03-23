const node_graph = []

const knight_moves = [[-1, 2], [1, 2], [-2, 1], [2, 1], [-1, -2], [1, -2], [-2, -1], [2, -1]]
const king_moves = [[1, 1], [0, 1], [-1, 1], [-1, 0], [1, 0], [1, -1], [0, -1], [-1, -1]]
const moves = knight_moves

function getPos(index) {
    return [index % 8, Math.floor(index / 8)]
}

function getIndex(pos) {
    return pos[0] + pos[1] * 8
}

function withinBounds(x, y) {
    return x > -1 && x < 8 && y > -1 && y < 8
}

for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
        const node = {
            visited: false,
            index: getIndex([x, y]),
            points: [],
            x: x,
            y: y
        }

        moves.map((move, index) => {
            if (withinBounds(x + move[0], y + move[1]))
                node.points.push([x + move[0], y + move[1]])
        })

        node_graph.push(node)
    }
}

function score(node1, node2) {
    const pos1 = getPos(node1.index)
    const pos2 = getPos(node2.index)

    return Math.hypot(pos1[0] - pos2[0], pos1[1] - pos2[1])
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Path(start, finish) {
    const open_list = [start]
    const closed_list = []

    // Initializing start stuff
    start.parent = start
    start.h = 0
    start.g = 0
    start.f = 0

    function getG(node) {
        return node.parent.g + score(node, node.parent)
    }

    function getH(node) {
        return score(node, finish)
    }

    function calculatePath(node) {
        const path = []
        while (node.parent != node) {
            path.push(node)
            node = node.parent

        }

        return path.reverse()
    }

    while (open_list.length > 0) {
        // Finding Node with lowest f
        let q = open_list[0]
        let qi = 0
        let smallestF = getG(open_list[0]) + getH(open_list[0])

        for (let i = 1; i < open_list.length; i++) {
            let f = getG(open_list[i]) + getH(open_list[i])

            if (smallestF > f) {
                smallestF = f
                q = open_list[i]
                qi = i
            }
        }

        // closed_list.push(q)
        open_list.splice(qi, 1)

        // Collecting Successors
        const successors = []
        q.points.map(point => {
            const newNode = { ...node_graph[getIndex(point)] }
            newNode.parent = q
            successors.push(newNode)
        })

        for (let i = 0; i < successors.length; i++) {
            const successor = successors[i]
            if (successor.index == finish.index)
                return calculatePath(successor)

            successor.g = getG(successor)
            successor.h = getH(successor)
            successor.f = successor.g + successor.h

            // document.getElementById("tile"+40).style.backgroundColor = "red"

            // document.getElementById("tile"+successor.index).style.backgroundColor = "red"
            // document.getElementById("tile"+successor.index).style.color = "red"
            // document.getElementById("tile"+successor.index).innerHTML = Math.round(successor.f*100)/100

            let skip = false
            for (let j = 0; j < open_list.length; j++) {
                if (open_list[j].index == successor.index && successor.f > open_list[j].f) {
                    skip = true
                    break
                }
            }

            if (skip)
                continue

            for (let j = 0; j < closed_list.length; j++) {
                if (closed_list[j].index == successor.index && successor.f > closed_list[j].f) {
                    skip = true
                    break
                }
            }

            if (!skip)  
                open_list.push(successor)

            // await sleep(100)
        }

        closed_list.push(q)


    }

    console.log("rip")
    return []
}