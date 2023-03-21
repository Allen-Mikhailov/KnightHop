const node_graph = []

const moves = [[-1, 2], [1, 2], [-2, 1], [2, 1], [-1, -2], [1, -2], [-2, -1], [2, -1]]

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
}