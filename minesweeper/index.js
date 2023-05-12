const width = 45
const height = 25
const bombsCount = 200
let boardSize = width * height
const zeroCells = []

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
const body = document.querySelector('body')
body.append(board)

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('button')) {
    if (bombs.includes(Number(e.target.id))) {
      e.target.innerHTML = 'B'
      e.target.classList.add('disabled')
      console.log('game over')
    } else {
      getBombs(Number(e.target.id))
    }
  }
})

const markCellAsBomb = (cell) => {
  cell.classList.toggle('bomb')
  if (cell.firstElementChild) {
    cell.replaceChildren()
  } else {
    const flag = document.createElement('img')
    flag.classList.add('flag')
    flag.src = './assets/icons/flag.png'
    cell.append(flag)
  }
}
board.addEventListener('contextmenu', (e) => {
  console.log(e.target)
  e.preventDefault()
  if (
    e.target.classList.contains('button') &&
    !e.target.classList.contains('opened') &&
    !e.target.classList.contains('disabled')
  ) {
    markCellAsBomb(e.target)
  }
  if (e.target.classList.contains('flag')) {
    markCellAsBomb(e.target.parentNode)
  }
})
const getBombs = (cellId) => {
  const column = cellId % width !== 0 ? cellId % width : width
  const row = Math.ceil(cellId / width)
  let count = 0
  let aroundCells = []
  if (row !== 1 && row !== width && column !== 1 && column !== width) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let id = (row + i - 1) * width + column + j
        if (bombs.includes(id)) {
          count++
        } else {
          aroundCells.push(id)
        }
      }
    }
  } else if (column === 1) {
    for (let i = -1; i <= 1; i++) {
      for (let j = 0; j <= 1; j++) {
        let id = (row + i - 1) * width + column + j
        if (bombs.includes(id)) {
          count++
        } else {
          aroundCells.push(id)
        }
      }
    }
  } else if (column === width) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 0; j++) {
        let id = (row + i - 1) * width + column + j
        if (bombs.includes(id)) {
          count++
        } else {
          aroundCells.push(id)
        }
      }
    }
  } else if (row === 1) {
    for (let i = 0; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let id = (row + i - 1) * width + column + j
        if (bombs.includes(id)) {
          count++
        } else {
          aroundCells.push(id)
        }
      }
    }
  } else if (row === width) {
    for (let i = -1; i <= 0; i++) {
      for (let j = -1; j <= 1; j++) {
        let id = (row + i - 1) * width + column + j
        if (bombs.includes(id)) {
          count++
        } else {
          aroundCells.push(id)
        }
      }
    }
  }

  if (count === 0) {
    zeroCells.push(cellId)
    aroundCells = aroundCells.filter((cell) => cell !== cellId)
    aroundCells.forEach((cell) => {
      if (!zeroCells.includes(cell) && cell > 0 && cell < boardSize) {
        getBombs(cell)
      }
    })
  }
  const cell = document.getElementById(`${cellId}`)
  cell.innerHTML = count === 0 ? '' : count
  cell.classList.add('opened')
  return count
}
