const width = 15
const height = 15
const bombsCount = 10
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
      e.target.innerHTML = e.target.id
      getBombs(e.target.id)
    }
  }
})

const getBombs = (cellId) => {
  const column = cellId % width !== 0 ? cellId % width : width
  const row = Math.ceil(cellId / width)
  console.log('row', row)
  console.log('column', column)
}
