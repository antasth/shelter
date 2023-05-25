let width = 10
let height = 10
let bombsCount = 10
let boardSize = width * height
let zeroCells = []
let openedCells = []
let flaggedCells = []
let clickCount = 0
let flagCount = 0
let bombsLeftCount = bombsCount
let time = 0
let gameOver = false
let isHell
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
let gameState = {}

document.addEventListener('DOMContentLoaded', () => {
  resizeBoard(width)
  if (!localStorage.gameState) {
    localStorage.setItem('Seconds', 0)
    clearInterval(timerID)
    startGame(1, 10)
  } else {
    let modalContent = `
    <h4>🅼🅸🅽🅴🆂🆆🅴🅴🅿🅴🆁</h4>
    <button class='start-game start-game_small'>
    🆂🆃🅰🆁🆃 🅽🅴🆆  🅶🅰🅼🅴
    </button>
    <button class='continue-game start-game_small'>🅲🅾🅽🆃🅸🅽🆄🅴 🅻🅰🆂🆃 🅶🅰🅼🅴</button>
    `
    showModal(modalContent, false)
    const startBtn = document.querySelector('.start-game')
    const continueBtn = document.querySelector('.continue-game')

    startBtn.addEventListener('click', () => {
      showStartMenu()
      if (localStorage.gameState) {
        gameState = {}
        gameOver = false
        localStorage.removeItem('gameState')
      }
    })

    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        if (localStorage.gameState) {
          const savedGameState = getFromLocalStorage()
          restoreGameState(savedGameState)
          hideModal()
        }
      })
    }
  }
  if (localStorage.Theme === 'dark') {
    document.body.setAttribute('dark', '')
    document.querySelector('.theme-button__input').checked = true
  }
})

function createBoard(size) {
  const board = document.createElement('div')
  board.classList.add('board')
  const boardLock = document.createElement('div')
  boardLock.classList.add('board__overlay', 'hide')
  for (let i = 0; i < size; i++) {
    const button = document.createElement('div')
    button.classList.add('button')
    button.id = i + 1
    board.append(button)
  }
  board.append(boardLock)
  return board
}

const createBombs = (size, count, forbidden) => {
  const bombs = []
  while (bombs.length < count) {
    let random = Math.round(0.5 + Math.random() * size)
    if (!bombs.includes(random) && random !== forbidden) {
      bombs.push(random)
    }
  }
  return bombs
}
let board = createBoard(boardSize)
let bombs = createBombs(boardSize, bombsCount, 0)
const controlPanel = document.createElement('div')
controlPanel.classList.add('control-panel')
const controlPanelContent = document.createElement('div')
controlPanelContent.classList.add('control-panel__content')
controlPanelContent.innerHTML = `  
<div class="menu">
<ul>
  <li class='start'>
  <img class='menu-img' src="./assets/icons/start.png" alt="start">
  <span class='menu-span start-span'>Start</span>
  </li>
  <li class='score'>
  <img class='menu-img' src="./assets/icons/score.png" alt="score">
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
  <img class='menu-img' src="./assets/icons/tap.png" alt="moves">
  <span class='menu-span moves'>0</span>
  </li>
  <li>
  <img class='menu-img' src="./assets/icons/menu-mine.png" alt="bomb">
  <span class='menu-span bombs'>0</span>
  </li>
  <li class='sound-button'>
  <img class='menu-img sound-img' src="./assets/icons/volume.png" alt="sound">
  </li>
  <li class='theme-button'>
	<input class='theme-button__input' type="checkbox" id="toggle"/>
	<label class='theme-button__toggle' for="toggle"></label>
  </li>
</ul>
</div>
`
controlPanel.append(controlPanelContent)
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
display = document.querySelector('.timer')

// buttons font size
const setButtonsFontSize = (items) => {
  const fontSize =
    content.offsetWidth > 1000 ? 1.7 : content.offsetWidth > 499 ? 1 : 1.3
  changeFontSize(items, fontSize)
}
let buttons = document.querySelectorAll('.button')
setButtonsFontSize(buttons)

// timer
function startTimer(duration, display) {
  let timer = duration
  let timerID = setInterval(function () {
    localStorage.setItem('Seconds', duration++)
    display.textContent = timer
    ++timer
  }, 1000)
  return timerID
}

// start game
let timerID
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
  let seconds = window.localStorage.getItem('Seconds')
  display.innerHTML = `${seconds}`
  timerID = startTimer(seconds, display)
  gameState.sizeSave = size
  gameState.boardIdSizeSave = boardIdSize[size] ** 2
  gameState.widthSave = Number(width)
  gameState.heightSave = Number(height)
  gameState.bombsCountSave = bombsCount
}

// restart game
const restartGame = (size, count, boardWidth) => {
  const buttons = document.querySelectorAll('.button')
  const clickMenuCount = document.querySelector('.moves')
  buttons.forEach((button) => {
    button.className = 'button'
    button.innerHTML = ''
    button.style = ''
  })
  clickMenuCount.innerHTML = clickCount
  zeroCells = []
  openedCells = []
  flaggedCells = []
  if (localStorage.gameState) {
    const gameData = getFromLocalStorage()
    bombs = gameData.bombsSave
    clickCount = gameData.clickCountSave
  } else {
    bombs = createBombs(size, count, 0)
    clickCount = 0
  }
  gameOver = false
  gameState.bombsSave = bombs
  flagCount = 0
  flagsMenuCount.innerText = flagCount
  bombsLeftCount = bombsCount
  bombsMenuCount.innerText = bombsLeftCount
  time = 0
  display.innerText = '0'
  resizeBoard(boardWidth)
  setButtonsFontSize(buttons)
}

startGameButton.addEventListener('click', () => {
  restartGame(boardSize, bombsCount, width)
})

// show all cells on gameover
const openBoard = (board) => {
  gameOver = true
  board.childNodes.forEach((cell) => {
    if (bombs.includes(Number(cell.id))) {
      const bombImg = document.createElement('img')
      bombImg.classList.add('bomb-img')
      bombImg.src = './assets/icons/mine.png'
      cell.replaceChildren()
      cell.append(bombImg)
      cell.classList.add('disabled')
    } else {
      getBombs(Number(cell.id))
    }
  })
}
function addListenerToBoard() {
  const board = document.querySelector('.board')
  const clickMenuCount = document.querySelector('.moves')
  board.addEventListener('click', (e) => {
    if (e.target.classList.contains('button')) {
      if (bombs.includes(Number(e.target.id))) {
        if (clickCount === 0) {
          bombs = createBombs(boardSize, bombsCount, Number(e.target.id))
          getBombs(Number(e.target.id))
          clickCount++
          gameState.clickCountSave = clickCount
          clickMenuCount.innerHTML = clickCount
        } else {
          clickCount++
          gameState.clickCountSave = clickCount
          clickMenuCount.innerHTML = clickCount
          const bombImg = document.createElement('img')
          bombImg.classList.add('bomb-img')
          bombImg.src = './assets/icons/mine.png'
          e.target.append(bombImg)
          e.target.classList.add('disabled')
          openBoard(board)
          const modalContent = `
          <h3>🅶🅰🅼🅴 🅾🆅🅴🆁</h3>
          <button class='start-game'>TRY AGAIN</button>
          `
          showModal(modalContent, true)
          lockBoard()
          gameState = {}
          localStorage.removeItem('gameState')
          localStorage.setItem('Seconds', 0)
          clearInterval(timerID)
          const startButton = document.querySelector('.start-game')
          startButton.addEventListener('click', () => {
            restartGame(boardSize, bombsCount, width)
            hideModal()
            showStartMenu()
          })
          isHell
            ? document.querySelector('.gameOver1').play()
            : document.querySelector('.gameOver2').play()
          document.querySelector('.win').pause()
        }
      } else {
        if (!openedCells.includes(Number(e.target.id))) {
          clickCount++
        }
        getBombs(Number(e.target.id))
        clickMenuCount.innerHTML = clickCount
        gameState.clickCountSave = clickCount
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
    flaggedCells.splice(flaggedCells.indexOf(cell), 1)
    gameState.flaggedCellsSave = flaggedCells
    flagsMenuCount.innerText = flagCount
    bombsLeftCount++
    gameState.flagCountSave = flagCount
    gameState.bombsLeftCountSave = bombsLeftCount
    bombsMenuCount.innerText = bombsLeftCount
  } else {
    const flag = document.createElement('img')
    flag.classList.add('flag-img')
    flag.src = './assets/icons/flag.png'
    document.querySelector('.setFlag').play()
    cell.append(flag)
    flagCount++
    gameState.flagCountSave = flagCount
    flaggedCells.push(cell.id)
    gameState.flaggedCellsSave = flaggedCells
    if (
      [...new Set(openedCells)].length === boardSize - bombsCount &&
      !gameOver
    ) {
      const winMessage = createWinMessage(
        localStorage.getItem('Seconds'),
        clickCount
      )
      const modalContent = `
      <h3>${winMessage}</h3>
      <button class='start-game'>NEW GAME</button>
      `
      showModal(modalContent, true)
      lockBoard()
      const startButton = document.querySelector('.start-game')
      gameState = {}
      localStorage.removeItem('gameState')
      saveToScore()
      localStorage.setItem('Seconds', 0)
      clearInterval(timerID)
      startButton.addEventListener('click', () => {
        restartGame(boardSize, bombsCount, width)
        hideModal()
        showStartMenu()
      })
      document.querySelector('.win').play()
    }
    flagsMenuCount.innerText = flagCount
    bombsLeftCount > 0 ? bombsLeftCount-- : bombsLeftCount
    bombsMenuCount.innerText = bombsLeftCount
    gameState.bombsLeftCountSave = bombsLeftCount
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
  if (cellId !== 0) {
    const cell = document.getElementById(`${cellId}`)
    if (!cell.classList.contains('bomb') || gameOver) {
      cell.innerHTML = count === 0 ? '' : count
      cell.style.color = colors[count]
      cell.classList.add('opened')
      openedCells.push(cellId)
    }
    if (gameOver) {
      if (cell.classList.contains('bomb') && !bombs.includes(cellId)) {
        cell.classList.add('error')
        const error = document.createElement('img')
        error.classList.add('error-img')
        error.src = './assets/icons/error.png'
        cell.replaceChildren()
        cell.append(error)
      }
    }
  }
  gameState.openedCellsSave = [...new Set(openedCells)]
  if (
    [...new Set(openedCells)].length === boardSize - bombsCount &&
    !gameOver
  ) {
    let winMessage = createWinMessage(
      localStorage.getItem('Seconds'),
      clickCount
    )
    const modalContent = `
    <h3>${winMessage}</h3>
    <button class='start-game'>NEW GAME</button>
    `
    showModal(modalContent, true)
    lockBoard()
    gameState = {}
    localStorage.removeItem('gameState')
    saveToScore()
    localStorage.setItem('Seconds', 0)
    clearInterval(timerID)
    const startButton = document.querySelector('.start-game')
    startButton.addEventListener('click', () => {
      restartGame(boardSize, bombsCount, width)
      hideModal()
      showStartMenu()
    })
    document.querySelector('.win').play()
  }
  document.querySelector('.openCell').play()
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
  <div class="radio-btn" id='1'>
    <input id="radio-1" type="radio" name="radio" value="1" checked />
    <label class="radio-label" for="radio-1">
      <h4>🅴🅰🆂🆈</h4>
      <p>10x10</p>
    </label>
  </div>

  <div class="radio-btn" id='2'>
    <input id="radio-2" type="radio" name="radio" value="2" />
    <label class="radio-label" for="radio-2">
      <h4>🅼🅴🅳🅸🆄🅼</h4>
      <p>15x15</p>
      </label>
  </div>

  <div class="radio-btn" id='3'>
    <input id="radio-3" type="radio" name="radio" value="3" />
    <label class="radio-label" for="radio-3">
      <h4>🅷🅰🆁🅳</h4>
      <p>25x25</p>
    </label>
  </div>

  <div class="radio-btn hell" id='4'>
    <input id="radio-4" type="radio" name="radio" value="4" />
    <label class="radio-label radio-hell" for="radio-4">
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
        value="10"
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
  const modal = document.querySelector('.modal')
  const slider = document.querySelector('.slider')
  isHell = false
  modal.addEventListener('click', (e) => {
    if (e.target.parentNode.classList.contains('radio-btn')) {
      isHell = false
      let id = Number(e.target.parentNode.id)
      switch (id) {
        case 1:
          slider.value = 10
          slider.disabled = false
          rangeCount.innerHTML = 10
          break
        case 2:
          slider.value = 30
          slider.disabled = false
          rangeCount.innerHTML = 30
          break
        case 3:
          slider.value = 70
          slider.disabled = false
          rangeCount.innerHTML = 70
          break
        case 4:
          slider.value = 150
          slider.disabled = true
          rangeCount.innerHTML = 150
          isHell = true
          break
      }
    }
  })

  const startButton = document.querySelector('.begin-game')
  startButton.addEventListener('click', () => {
    const selectedBoard = document.querySelector('input[name="radio"]:checked')
    localStorage.setItem('Seconds', 0)
    clearInterval(timerID)
    startGame(selectedBoard.value, isHell ? 150 : Number(range.value))
    hideModal()
    if (isHell) {
      document.body.setAttribute('hell', '')
      document.querySelector('.theme-button').style.display = 'none'
      document.querySelector('.song').loop = true
      document.querySelector('.song').play()
    } else {
      document.body.removeAttribute('hell')
      document.querySelector('.theme-button').style.display = 'block'
      document.querySelector('.song').pause()
    }
  })
}

function createWinMessage(time, moves) {
  let message = `🅷🅾🅾🆁🅰🆈! 🆈🅾🆄 🅵🅾🆄🅽🅳 🅰🅻🅻 🅼🅸🅽🅴🆂 🅸🅽 ${time} 🆂🅴🅲🅾🅽🅳🆂 🅰🅽🅳 ${moves} 🅼🅾🆅🅴🆂!`
  return message
}

// save and load game state
function saveToLocalStorage() {
  if (Object.keys(gameState).length > 2) {
    localStorage.gameState = JSON.stringify(gameState)
  }
}

function getFromLocalStorage() {
  return JSON.parse(localStorage.gameState)
}

window.addEventListener('unload', () => {
  saveToLocalStorage()
})

function restoreGameState({
  timeSave,
  bombsSave,
  sizeSave,
  widthSave,
  clickCountSave,
  bombsCountSave,
  openedCellsSave,
  flaggedCellsSave,
}) {
  width = widthSave
  time = timeSave
  clickCount = Number(clickCountSave) ? clickCountSave : 0
  openedCells = openedCellsSave

  startGame(sizeSave, bombsCountSave)

  if (flaggedCellsSave) {
    flaggedCellsSave.forEach((cell) => {
      const cellButton = document.getElementById(cell)
      markCellAsBomb(cellButton)
    })
  }

  bombs = bombsSave
  if (openedCellsSave) {
    openedCellsSave.forEach((cell) => {
      getBombs(cell)
    })
  }
}

// switch theme

const switchCheckbox = document.querySelector('.theme-button__input')

switchCheckbox.addEventListener('change', () => {
  toggleTheme()
})

function toggleTheme() {
  if (document.body.hasAttribute('dark')) {
    document.body.removeAttribute('dark')
    localStorage.setItem('Theme', 'light')
  } else {
    document.body.setAttribute('dark', '')
    localStorage.setItem('Theme', 'dark')
  }
}

// score
function saveToScore() {
  if (localStorage.Score && !gameOver) {
    const score = JSON.parse(localStorage.Score)
    if (score.length === 10) {
      score.shift()
    }
    const result = {}
    result.time = localStorage.Seconds
    result.moves = clickCount + 1
    result.bombs = bombsCount
    result.board = `${width}x${width}`
    score.push(result)
    localStorage.Score = JSON.stringify(score)
  } else if (!gameOver) {
    let score = []
    const result = {}
    result.time = localStorage.Seconds
    result.moves = clickCount + 1
    result.bombs = bombsCount
    result.board = `${width}x${width}`
    score.push(result)
    localStorage.Score = JSON.stringify(score)
  }
}

function getScoreFromLocalStorage() {
  if (localStorage.Score) {
    return JSON.parse(localStorage.Score)
  }
}

const score = document.querySelector('.score')
score.addEventListener('click', () => {
  if (localStorage.Score) {
    const data = getScoreFromLocalStorage()
    data.reverse()
    const modalContent = document.createElement('div')
    modalContent.classList.add('results')
    const scoreHeader = document.createElement('h3')
    scoreHeader.classList.add('results__header')
    scoreHeader.innerHTML = '🅻🅰🆂🆃 🆂🅲🅾🆁🅴'
    const resultsTable = document.createElement('table')
    resultsTable.classList.add('results-table')
    const resultsTableBody = document.createElement('tbody')
    resultsTableBody.innerHTML = `
  <tr>
  <th>№</th>
  <th>BOARD</th>
  <th>BOMBS</th>
  <th>TIME</th>
  <th>MOVES</th>
</tr>
  `
    let i = 1
    data.forEach((element) => {
      const tableRow = document.createElement('tr')
      tableRow.classList.add('results__table-row')
      tableRow.innerHTML = `
      <td>${i++}</td>
      <td>${element.board}</td>
      <td>${element.bombs}</td>
    <td>${element.time}</td>
      <td>${element.moves}</td>
      `
      resultsTableBody.appendChild(tableRow)
    })
    resultsTable.append(resultsTableBody)
    modalContent.append(scoreHeader, resultsTable)

    showModal(modalContent.outerHTML, true)
  } else {
    const emptyScoreMessage = `<h3>🆂🅲🅾🆁🅴 🅻🅸🆂🆃 🅸🆂 🅴🅼🅿🆃🆈</h3>`
    showModal(emptyScoreMessage, true)
  }
})

// sound
let sounds = {
  openCell: './assets/sounds/open-cell.wav',
  openCells: './assets/sounds/open-cells.wav',
  gameOver1: './assets/sounds/game-over.mp3',
  gameOver2: './assets/sounds/game-over2.mp3',
  setFlag: './assets/sounds/set-flag.mp3',
  win: './assets/sounds/win.mp3',
  song: './assets/sounds/song.mp3',
}

const pageSounds = document.createElement('div')
pageSounds.classList.add('audio')
for (key in sounds) {
  let audio = document.createElement('audio')
  audio.classList.add(key)
  audio.setAttribute('src', sounds[key])
  pageSounds.append(audio)
}
document.body.append(pageSounds)

function toggleMute(elem) {
  if (!elem.muted) {
    elem.muted = true
    elem.pause()
    document
      .querySelector('.sound-img')
      .setAttribute('src', './assets/icons/mute.png')
  } else {
    elem.muted = false
    document
      .querySelector('.sound-img')
      .setAttribute('src', './assets/icons/volume.png')
  }
}
function mutePage() {
  const audioElements = document.querySelectorAll('audio')
  audioElements.forEach((elem) => toggleMute(elem))
}

const soundBtn = document.querySelector('.sound-button')

soundBtn.addEventListener('click', () => {
  mutePage()
})

// lock buttons after game

function lockBoard() {
  const board = document.querySelector('.board__overlay')
  board.classList.add('show')
  board.classList.remove('hide')
}
