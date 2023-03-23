const node_graph = []

const knight_moves = [[-1, 2], [1, 2], [-2, 1], [2, 1], [-1, -2], [1, -2], [-2, -1], [2, -1]]
const king_moves = [[1, 1], [0, 1], [-1, 1], [-1, 0], [1, 0], [1, -1], [0, -1], [-1, -1]]
const moves = king_moves

function getPos(index)
{
    return [ index%8, Math.floor(index/8) ]
}

function getIndex(pos)
{
    return pos[0] + pos[1] * 8
}

for (let y = 0; y < 8; y++)
{
    for (let x = 0; x < 8; x++)
    {
        const node = {
            visited: false,
            points: []
        }

        moves.map((move, index) => {
            if (x+move[0] > -1 && x+move[0] < 8 && y+move[1] > -1 && y+move[1] < 8)
                node.points.push( x+move[0], y+move[1] )
        })

        node_graph.push(node)
    }
}

function score(node1, node2)
{
    const pos1 = getPos(node1)
    const pos2 = getPos(node2)

    return Math.hypot(pos1[0] - pos2[0], pos1[1] - pos2[1])
}

function Path(start, finish)
{
    const open_list = [start]
    const closed_list = []

    // Initializing start stuff
    start.parent = start
    start.h = 0
    start.g = 0
    start.f = 0

    function getG(node)
    {
        return node.parent.g + score(node, node.parent)
    }

    function getH(node)
    {
        return score(node, finish)
    }

    while (open_list.length > 0)
    {
        // Finding Node with lowest f
        let q = open_list[0]
        let qi = 0
        let smallestF = getG(open_list[0]) + getH(open_list[0])

        for (let i = 1; i < open_list.length; i++)
        {
            let f = getG(open_list[i]) + getH(open_list[i])

            if (smallestF > f)
            {
                smallestF = f
                q = open_list[i]
                qi = i
            }
        }

        open_list.splice(qi, 1)
    }
}