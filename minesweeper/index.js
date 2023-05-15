const width = 10
const height = 10
const bombsCount = 5
let boardSize = width * height
let zeroCells = []
let openedCells = []
let markedCells = []
let clickCount = 0
let flagCount = 0
let bombsLeftCount = bombsCount
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
let audioGameOver = new Audio()
audioGameOver.preload = 'auto'
audioGameOver.src = './assets/sounds/game-over.mp3'
let audioOpenCell = new Audio()
audioOpenCell.preload = 'auto'
audioOpenCell.src = './assets/sounds/open-cell.wav'
let audioOpenCells = new Audio()
audioOpenCells.preload = 'auto'
audioOpenCells.src = './assets/sounds/open-cells.wav'
let audioSetFlag = new Audio()
audioSetFlag.preload = 'auto'
audioSetFlag.src = './assets/sounds/set-flag.mp3'
let audioWin = new Audio()
audioWin.preload = 'auto'
audioWin.src = './assets/sounds/win.mp3'

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
  while(bombs.length < count) {
    let random = Math.round(0.5 + Math.random() * size)
    if (!bombs.includes(random)) {
      bombs.push(random)
    }
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
  </li>
  <li>
  <img class='menu-img' src="./assets/icons/menu-mine.png" alt="bomb">
  <span class='menu-span bombs'>0</span>
  </li>
  <li class='settings'>
  <img class='menu-img' src="./assets/icons/settings.png" alt="settings">
  </li>
</ul>
</div>
`
const popup = document.createElement('div')
popup.classList.add('popup-overlay', 'popup-overlay__modal', 'hide')
popup.innerHTML = `
<div class="popup">
  <div class="popup_container"></div>
</div>`

const content = document.createElement('section')
content.classList.add('content')
content.append(controlPanel, board)
document.body.append(content, popup)

const startGameButton = document.querySelector('.start-button')
const bombsMenuCount = document.querySelector('.bombs')
bombsMenuCount.innerText = bombsLeftCount

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
  openedCells = []
  markedCells = []
  bombs = createBombs(boardSize, bombsCount)
  markedCells = [...bombs]
  flagCount = 0
  flagsMenuCount.innerText = flagCount
  bombsLeftCount = bombsCount
  bombsMenuCount.innerText = bombsLeftCount
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
        bombs = createBombs(boardSize, bombsCount)
        getBombs(Number(e.target.id))
        clickCount++
      } else {
        clickCount++
        const bombImg = document.createElement('img')
        bombImg.classList.add('bomb-img')
        bombImg.src = './assets/icons/mine.png'
        e.target.append(bombImg)
        e.target.classList.add('disabled')
        clearInterval(setTimer)
        openBoard(board)
        showModal('BOOM', false)
        // audioGameOver.play();
      }
    } else {
      getBombs(Number(e.target.id))
      clickCount++
    }
  }
})

markedCells = [...bombs]
const flagsMenuCount = document.querySelector('.flags')
const markCellAsBomb = (cell) => {
  cell.classList.toggle('bomb')
  if (cell.firstElementChild) {
    cell.replaceChildren()
    flagCount--
    markedCells.push(Number(cell.id))
    flagsMenuCount.innerText = flagCount
    bombsLeftCount++
    bombsMenuCount.innerText = bombsLeftCount
  } else {
    const flag = document.createElement('img')
    flag.classList.add('flag-img')
    flag.src = './assets/icons/flag.png'
    // audioSetFlag.play()
    cell.append(flag)
    flagCount++
    if (markedCells.includes(Number(cell.id))) {
      markedCells = markedCells.filter((cellsId) => cellsId !== Number(cell.id))
      if (
        [...new Set(openedCells)].length === boardSize - bombsCount &&
        markedCells.length === 0
      ) {
        showModal('YOU WIN', false)
      }
    } else markedCells.push(Number(cell.id))
    flagsMenuCount.innerText = flagCount
    bombsLeftCount > 0 ? bombsLeftCount-- : bombsLeftCount
    bombsMenuCount.innerText = bombsLeftCount
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
  openedCells.push(cellId)
  if (
    [...new Set(openedCells)].length === boardSize - bombsCount &&
    markedCells.length === 0
  ) {
    showModal('YOU WIN', false)
  }
  // audioOpenCell.play()
  return count
}

const settings = document.querySelector('.settings')
settings.addEventListener('click', () => {
  showModal('', true)
})

// MODAL
function showModal(content, close) {
  const modal = document.querySelector('.popup-overlay')

  // if scroll is hidden => add margin right
  let marginSize = window.innerWidth - document.documentElement.clientWidth
  if (marginSize) {
    document.documentElement.style.marginRight = marginSize + 'px'
  }
  modal.classList.add('show')
  modal.classList.remove('hide')
  document.body.classList.add('locked')

  const popupContainer = document.querySelector('.popup_container')
  popupContainer.replaceChildren()
  popupContainer.append(createPopupCard(content, close))

  if (close) {
    const close = document.querySelector('.popup-close')
    close.addEventListener('click', () => {
      hideModal(modal)
    })
  }

  modal.addEventListener('click', (e) => {
    if (e.target == modal) {
      hideModal(modal)
    }
  })
}

function hideModal() {
  const modal = document.querySelector('.popup-overlay')

  modal.classList.remove('show')
  modal.classList.add('hide')
  document.body.classList.remove('locked')
  document.documentElement.style.marginRight = 0
}

function createPopupCard(content = '', close) {
  const modalCard = document.createElement('div')
  modalCard.classList.add('modal')
  if (close) {
    modalCard.innerHTML =
      `
    <button class="popup-close">&times;</button>
  ` + content
  } else {
    modalCard.innerHTML = content
  }
  return modalCard
}
