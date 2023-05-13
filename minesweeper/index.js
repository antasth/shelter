const width = 15
const height = 15
const bombsCount = 50
let boardSize = width * height
let zeroCells = []
let clickCount = 0
let flagCount = 0
let time = 0
const colors = {
  1: '#508AA8',
  2: '#20BF55',
  3: '#FFBC0A',
  4: '#F15025',
  5: '#BA1200',
  6: '#1B3B6F',
  7: '#C200FB',
  8: '#FF007F',
}

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
let board = createBoard(boardSize)
let bombs = createBombs(boardSize, bombsCount)
const controlPanel = document.createElement('div')
controlPanel.classList.add('control-panel')
controlPanel.innerHTML = `  
<div class="menu">
<ul>
  <li class='start-button'><a href="#" >new game</a></li>
  <li><a href="#">Easy 10 x 10</a>
    <ul>
      <li><a href="#">EASY</a></li>
      <li><a href="#">MEDIUM</a></li>
      <li><a href="#">HARD</a></li>
      <li><a href="#">NIGHTMARE</a></li>
      <li><a href="#">HELL</a></li>
    </ul>
  </li>
  <li>
  <img class='menu-img' src="./assets/icons/timer.png" alt="timer">
  <span class='menu-span timer'>0</span>
  </li>
  <li>
  <img class='menu-img' src="./assets/icons/menu-flag.png" alt="flag">
  <span class='menu-span flags'>0</span>
  <li><a href="#">Звук</a></li>
</ul>
</div>
`
const content = document.createElement('section')
content.classList.add('content')
content.append(controlPanel, board)
const body = document.querySelector('body')
body.append(content)

const startGameButton = document.querySelector('.start-button')

// timer
const timer = document.querySelector('.timer')
let setTimer = setInterval(function () {
  time++
  timer.innerText = time
}, 1000)

// restart game
startGameButton.addEventListener('click', () => {
  document.querySelectorAll('.button').forEach((button) => {
    button.className = 'button'
    button.innerHTML = ''
    button.style = ''
  })
  clickCount = 0
  zeroCells = []
  bombs = createBombs(boardSize, bombsCount)
  flagCount = 0
  flagsMenuCount.innerText = flagCount
  time = 0
  timer.innerText = '0'
  clearInterval(setTimer)
  setTimer = setInterval(function () {
    time++
    timer.innerText = time
  }, 1000)
})

// show all cells on gameover
const openBoard = (board) => {
  board.childNodes.forEach((cell) => {
    if (bombs.includes(Number(cell.id))) {
      const bombImg = document.createElement('img')
      bombImg.classList.add('bomb-img')
      bombImg.src = './assets/icons/mine.png'
      if (cell.firstElementChild) {
        cell.replaceChildren()
      }
      cell.append(bombImg)
      cell.classList.add('disabled')
    } else {
      getBombs(Number(cell.id))
    }
  })
}

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('button')) {
    if (bombs.includes(Number(e.target.id))) {
      if (clickCount === 0) {
        const cellNumber = Number(e.target.id)
        bombs = createBombs(boardSize, bombsCount)
        document.getElementById(cellNumber).click()
        clickCount++
      } else {
        clickCount++
        const bombImg = document.createElement('img')
        bombImg.classList.add('bomb-img')
        bombImg.src = './assets/icons/mine.png'
        e.target.append(bombImg)
        e.target.classList.add('disabled')
        console.log('game over')
        clearInterval(setTimer)
        openBoard(board)
      }
    } else {
      getBombs(Number(e.target.id))
      clickCount++
    }
  }
})

const flagsMenuCount = document.querySelector('.flags')
const markCellAsBomb = (cell) => {
  cell.classList.toggle('bomb')
  if (cell.firstElementChild) {
    cell.replaceChildren()
    flagCount--
    flagsMenuCount.innerText = flagCount
  } else {
    const flag = document.createElement('img')
    flag.classList.add('flag-img')
    flag.src = './assets/icons/flag.png'
    cell.append(flag)
    flagCount++
    flagsMenuCount.innerText = flagCount
  }
}
board.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  if (
    e.target.classList.contains('button') &&
    !e.target.classList.contains('opened') &&
    !e.target.classList.contains('disabled')
  ) {
    markCellAsBomb(e.target)
  }
  if (e.target.classList.contains('flag-img')) {
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
      if (!zeroCells.includes(cell) && cell > 0 && cell <= boardSize) {
        getBombs(cell)
      }
    })
  }
  const cell = document.getElementById(`${cellId}`)
  cell.innerHTML = count === 0 ? '' : count
  cell.style.color = colors[count]
  cell.classList.add('opened')
  return count
}
