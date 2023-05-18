let width = 10
let height = 10
let bombsCount = 10
let boardSize = width * height
let zeroCells = []
let openedCells = []
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
const boardIdSize = {
  1: '10',
  2: '15',
  3: '25',
  4: '25',
}
let audioGameOver = new Audio()
audioGameOver.preload = 'auto'
audioGameOver.src = './assets/sounds/game-over.mp3'
let audioGameOver2 = new Audio()
audioGameOver2.preload = 'auto'
audioGameOver2.src = './assets/sounds/game-over2.mp3'
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

document.addEventListener('DOMContentLoaded', () => {
  resizeBoard(width)
})

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
  while (bombs.length < count) {
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
  <li class='start'>
  <img class='menu-img' src="./assets/icons/start.png" alt="start">
  <span class='menu-span start'>Start</span>
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
  <li class='sound-button'>
  <img class='menu-img' src="./assets/icons/volume.png" alt="sound">
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

const startGameButton = document.querySelector('.start')
const bombsMenuCount = document.querySelector('.bombs')
bombsMenuCount.innerText = bombsLeftCount

// buttons font size
const setButtonsFontSize = (items) => {
  const fontSize =
    content.offsetWidth > 1000 ? 1.7 : content.offsetWidth > 499 ? 1 : 1.3
  changeFontSize(items, fontSize)
}
let buttons = document.querySelectorAll('.button')
setButtonsFontSize(buttons)

// timer
const timer = document.querySelector('.timer')
let setTimer = setInterval(function () {
  time++
  timer.innerText = time
}, 1000)

// start game
function startGame(size, mines) {
  boardSize = boardIdSize[size] ** 2
  const board = createBoard(boardSize)
  width = boardIdSize[size]
  height = boardIdSize[size]
  bombsCount = mines
  content.replaceChildren()
  content.append(controlPanel, board)
  restartGame(boardSize, mines, width)
  addListenerToBoard()
}
// restart game
const restartGame = (size, count, boardWidth) => {
  const buttons = document.querySelectorAll('.button')
  buttons.forEach((button) => {
    button.className = 'button'
    button.innerHTML = ''
    button.style = ''
  })
  clickCount = 0
  zeroCells = []
  openedCells = []
  bombs = createBombs(size, count)
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
  resizeBoard(boardWidth)
  setButtonsFontSize(buttons)
}

startGameButton.addEventListener('click', () => {
  restartGame(boardSize, bombsCount, width)
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
function addListenerToBoard() {
  const board = document.querySelector('.board')
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
          const modalContent = `
          <h3>🅶🅰🅼🅴 🅾🆅🅴🆁</h3>
          <button class='start-game'>TRY AGAIN</button>
          `
          showModal(modalContent, false)
          const startButton = document.querySelector('.start-game')
          startButton.addEventListener('click', () => {
            restartGame(boardSize, bombsCount, width)
            hideModal()
            showStartMenu()
            // showModal(menu, false)
          })
          // audioGameOver2.play()
          // audioWin.pause()
        }
      } else {
        getBombs(Number(e.target.id))
        clickCount++
      }
    }
  })
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
}
addListenerToBoard()

const flagsMenuCount = document.querySelector('.flags')
const markCellAsBomb = (cell) => {
  cell.classList.toggle('bomb')
  if (cell.firstElementChild) {
    cell.replaceChildren()
    flagCount--
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
    if ([...new Set(openedCells)].length === boardSize - bombsCount) {
      const winMessage = createWinMessage(time, clickCount)
      const modalContent = `
      <h3>${winMessage}</h3>
      <button class='start-game'>NEW GAME</button>
      `
      showModal(modalContent, false)
      const startButton = document.querySelector('.start-game')
      startButton.addEventListener('click', () => {
        restartGame(boardSize, bombsCount, width)
        hideModal()
        showStartMenu()
        // showModal(menu, false)
      })
      // audioWin.play()
    }
    flagsMenuCount.innerText = flagCount
    bombsLeftCount > 0 ? bombsLeftCount-- : bombsLeftCount
    bombsMenuCount.innerText = bombsLeftCount
  }
}

const getBombs = (cellId) => {
  const column = cellId % width !== 0 ? cellId % width : width
  const row = Math.ceil(cellId / width)
  let count = 0
  let aroundCells = []
  if (row !== 1 && row !== width && column !== 1 && column !== width) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let id = (Number(row) + i - 1) * Number(width) + Number(column) + j
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
        let id = (Number(row) + i - 1) * Number(width) + Number(column) + j
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
        let id = (Number(row) + i - 1) * Number(width) + Number(column) + j
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
        let id = (Number(row) + i - 1) * Number(width) + Number(column) + j
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
        let id = (Number(row) + i - 1) * Number(width) + Number(column) + j
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
  if ([...new Set(openedCells)].length === boardSize - bombsCount) {
    let winMessage = createWinMessage(time, clickCount)
    const modalContent = `
    <h3>${winMessage}</h3>
    <button class='start-game'>NEW GAME</button>
    `
    showModal(modalContent, false)
    const startButton = document.querySelector('.start-game')
    startButton.addEventListener('click', () => {
      restartGame(boardSize, bombsCount, width)
      hideModal()
      showStartMenu()
      // showModal(menu, false)
    })
    // audioWin.play()
  }
  // audioOpenCell.play()
  return count
}
// start menu
startGameButton.addEventListener('click', () => {
  showStartMenu()
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

  // modal.addEventListener('click', (e) => {
  //   if (e.target == modal) {
  //     hideModal(modal)
  //   }
  // })
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

// media queries
function resizeBoard(boardWidth) {
  let cellWidth =
    content.offsetWidth > 1000
      ? 650 / boardWidth
      : content.offsetWidth < 768
      ? (content.offsetWidth * 0.9) / boardWidth
      : (content.offsetWidth * 0.7) / boardWidth
  const board = document.querySelector('.board')
  const buttons = document.querySelectorAll('.button')
  board.style.gridTemplateColumns = `repeat(auto-fill, ${cellWidth}px)`
  buttons.forEach((button) => {
    button.style.width = `${cellWidth}px`
    button.style.height = `${cellWidth}px`
    board.style.width = `${cellWidth * boardWidth}px`
  })
}
function changeFontSize(items, size) {
  items.forEach((item) => {
    item.style.fontSize = `${size}rem`
  })
}

const mediaQueries = [
  window.matchMedia('(max-width: 499px)'),
  window.matchMedia('(min-width: 500px) and (max-width: 549px)'),
  window.matchMedia('(min-width: 550px) and (max-width: 595px)'),
  window.matchMedia('(min-width: 596px) and (max-width: 675px)'),
  window.matchMedia('(min-width: 676px) and (max-width: 767px)'),
  window.matchMedia('(min-width: 768px) and (max-width: 991px)'),
  window.matchMedia('(min-width: 992px) and (max-width: 1199px)'),
  window.matchMedia('(min-width: 1200px)'),
]

function screenMatches() {
  const buttons = document.querySelectorAll('.button')
  if (mediaQueries[0].matches) {
    resizeBoard(width)
    changeFontSize(buttons, 0.8)
  }
  if (mediaQueries[1].matches) {
    resizeBoard(width)
    changeFontSize(buttons, 1)
  }
  if (mediaQueries[2].matches) {
    resizeBoard(width)
    changeFontSize(buttons, 1.2)
  }
  if (mediaQueries[3].matches) {
    resizeBoard(width)
    changeFontSize(buttons, 1.3)
  }
  if (mediaQueries[4].matches) {
    resizeBoard(width)
    changeFontSize(buttons, 1.4)
  }
  if (mediaQueries[5].matches) {
    resizeBoard(width)
    changeFontSize(buttons, 1.5)
  }
  if (mediaQueries[6].matches) {
    resizeBoard(width)
    changeFontSize(buttons, 1.6)
  }
  if (mediaQueries[7].matches) {
    resizeBoard(width)
    changeFontSize(buttons, 1.7)
  }
}

mediaQueries.forEach((item) => {
  item.addEventListener('change', screenMatches)
})

// start menu
function showStartMenu() {
  const menu = `
  <div class="buttons">
  <div class="radio-btn">
    <input id="radio-1" type="radio" name="radio" value="1" checked />
    <label class="radio-label" for="radio-1">
      <h4>🅴🅰🆂🆈</h4>
      <p>10x10</p>
    </label>
  </div>

  <div class="radio-btn">
    <input id="radio-2" type="radio" name="radio" value="2" />
    <label class="radio-label" for="radio-2">
      <h4>🅼🅴🅳🅸🆄🅼</h4>
      <p>15x15</p>
      </label>
  </div>

  <div class="radio-btn">
    <input id="radio-3" type="radio" name="radio" value="3" />
    <label class="radio-label" for="radio-3">
      <h4>🅷🅰🆁🅳</h4>
      <p>25x25</p>
    </label>
  </div>

  <div class="radio-btn hell">
    <input id="radio-4" type="radio" name="radio" value="4" />
    <label class="radio-hell" for="radio-4">
      <h4>🅷🅴🅻🅻</h4>
      <p>25x25</p>
    </label>
  </div>
  </div>

  <div class="range">
    <h4>🅼🅸🅽🅴🆂:</h4><span class="range__count"></span>
    <div class="slidecontainer">
      <input
        type="range"
        min="1"
        max="99"
        value="50"
        class="slider"
        id="myRange"
      />
    </div>
  </div>
  <button class='begin-game'>START GAME</button>
</div>
  `
  showModal(menu, false)
  const range = document.querySelector('.slider')
  const rangeCount = document.querySelector('.range__count')
  rangeCount.innerHTML = range.value
  range.addEventListener('input', () => {
    rangeCount.innerHTML = range.value
  })
  const startButton = document.querySelector('.begin-game')
  startButton.addEventListener('click', () => {
    const selectedBoard = document.querySelector('input[name="radio"]:checked')

    startGame(selectedBoard.value, Number(range.value))
    hideModal()
  })
}

function createWinMessage(time, moves) {
  let message = `🅷🅾🅾🆁🅰🆈! 🆈🅾🆄 🅵🅾🆄🅽🅳 🅰🅻🅻 🅼🅸🅽🅴🆂 🅸🅽 ${time} 🆂🅴🅲🅾🅽🅳🆂 🅰🅽🅳 ${moves} 🅼🅾🆅🅴🆂!`
  return message
}
