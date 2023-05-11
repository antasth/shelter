const width = 15
const height = 15
const bombsCount = 50
let boardSize = width * height

function createBoard(size) {
  const board = document.createElement('div')
  board.classList.add('board')
  for (let i = 0; i < size; i++) {
    const button = document.createElement('div')
    button.classList.add('button')
    button.id = i + 1
    board.append(button)
  }
  return board
}

const createBombs = (size, count) => {
  const bombs = []
  for (let i = 0; i < count; i++) {
    bombs.push(Math.round(0.5 + Math.random() * size))
  }
  return bombs
}
const board = createBoard(boardSize)
const bombs = createBombs(boardSize, bombsCount)
console.log(bombs)
const body = document.querySelector('body')
body.append(board)

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('button')) {
    if (bombs.includes(Number(e.target.id))) {
      e.target.innerHTML = 'B'
      e.target.classList.add('disabled')
    } else {
      const bombsCount = getBombs(Number(e.target.id))
      e.target.innerHTML = bombsCount
    }
  }
})
const getBombs = (cellId) => {
  const aroundId = [1, width - 1, width, width + 1]
  const aroundCellsId = []
  aroundId.forEach((id) => {
    aroundCellsId.push(cellId + id)
    aroundCellsId.push(cellId - id)
  })
  console.log(aroundCellsId)
  const aroundBombs = aroundCellsId.filter((id) => bombs.includes(id))

  return aroundBombs.length
}
