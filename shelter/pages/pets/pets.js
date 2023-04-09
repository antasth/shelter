import pets from '../../data/pets.json' assert { type: 'json' }

// BURGER
const burgerBackground = document.querySelector('.burger__background')
const burgerIconBlack = document.querySelector('.burger__icon-black')
const burgerMenuItem = document.querySelectorAll('.burger__list-item')
const burgerIcon = document.querySelector('.burger__icon')
const burgerMenu = document.querySelector('.burger')
const body = document.querySelector('body')

// show or hide burger menu and rotate icon
burgerIconBlack.addEventListener('click', () => {
  toggleBurger()
})
// change icon color
burgerIconBlack.addEventListener('click', () => {
  burgerIconBlack.classList.toggle('burger__icon-black')
})

// if click on burger link => hide burger menu
burgerMenuItem.forEach((item) => {
  item.addEventListener('click', () => {
    hideBurger()
  })
})
// if click on burger background => hide burger menu
burgerBackground.addEventListener('click', () => {
  hideBurger()
})

window.addEventListener('resize', () => {
  if (document.body.clientWidth > 767) {
    hideBurger()
  }
})

function toggleBurger() {
  // if scroll is hidden => add margin right
  let marginSize = window.innerWidth - document.documentElement.clientWidth
  if (marginSize) {
    document.documentElement.style.marginRight = marginSize + 'px'
  } else {
    document.documentElement.style.marginRight = 0
  }
  burgerIconBlack.classList.toggle('burger__icon-active')
  burgerMenu.classList.toggle('burger__active')
  body.classList.toggle('locked')
  burgerBackground.classList.toggle('burger__background-active')
}

function hideBurger() {
  body.classList.remove('locked')
  burgerMenu.classList.remove('burger__active')
  burgerBackground.classList.remove('burger__background-active')
  burgerIcon.classList.remove('burger__icon-active')
  burgerIconBlack.classList.add('burger__icon-black')
  document.documentElement.style.marginRight = 0
}

// PAGINATION

// console.log(pets)

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// get base array from 0 to 48
const getRandomBaseArray = () => {
  const baseArr = []
  let fullArr = []
  while (baseArr.length !== 8) {
    const rand = Math.floor(Math.random() * 8)
    if (!baseArr.includes(rand)) {
      baseArr.push(rand)
    }
  }
  for (let i = 0; i < 6; i++) {
    fullArr = [...fullArr, ...baseArr]
  }
  return fullArr
}
const fullArray = getRandomBaseArray()
// console.log(fullArray)

const getCardsArray = (arr) => {
  let cardsArray = []
  let shortArr = []

  for (let i = 0; i < 6; i++) {
    shortArr = arr.splice(0, 3)
    cardsArray = [...cardsArray, ...shuffleArray(shortArr)]
    shortArr = arr.splice(0, 3)
    cardsArray = [...cardsArray, ...shuffleArray(shortArr)]
    shortArr = arr.splice(0, 2)
    cardsArray = [...cardsArray, ...shuffleArray(shortArr)]
  }
  return cardsArray
}

// console.log(getCardsArray(fullArray))

const cards = document.querySelector('.pets__cards')

const cardsArray = getCardsArray(fullArray)
let cardsOnPage =
  document.body.clientWidth > 1279 ? 8 : document.body.clientWidth < 768 ? 3 : 6
let countOfPages = 48 / cardsOnPage
let page = 1

const mediaQueries = [
  window.matchMedia('(min-width: 0px) and (max-width: 768px)'),
  window.matchMedia('(min-width: 768px) and (max-width: 1279px)'),
  window.matchMedia('(min-width: 1280px)'),
]

function screenMatches() {
  if (mediaQueries[0].matches) {
    cardsOnPage = 3
    createCards(cardsOnPage, page)
    console.log(cardsOnPage)
  }

  if (mediaQueries[1].matches) {
    cardsOnPage = 6
    console.log(cardsOnPage)
    createCards(cardsOnPage, page)
  }

  if (mediaQueries[2].matches) {
    cardsOnPage = 8
    console.log(cardsOnPage)
    createCards(cardsOnPage, page)
  }
}

mediaQueries.forEach((item) => {
  item.addEventListener('change', screenMatches)
})

const createCard = ({ img, name }) => {
  const card = document.createElement('div')
  card.classList.add('pets__card')
  card.innerHTML = `
  <div class="pets__card-img">
    <img src="${img}" alt="pet" />
  </div>
  <div class="pets__card-name">${name}</div>
  <div class="pets__card-button">Learn more</div>
  `
  return card
}

const createCards = (cardsCount, pageNumber) => {
  let cardsOnCurrentPage = cardsArray.slice(
    pageNumber * cardsCount - cardsCount,
    pageNumber * cardsCount
  )
  cards.replaceChildren()
  for (let i = 0; i < cardsCount; i++) {
    cards.append(createCard(pets[cardsOnCurrentPage[i]]))
  }
}
// create cards on page load
createCards(cardsOnPage, 1)

const pageNumber = document.querySelector('.page-number')
const forwardButton = document.querySelector('.forward-button')
const doubleForwardButton = document.querySelector('.double-forward-button')

const forward = () => {
  page !== countOfPages ? (page += 1) : page
  pageNumber.innerHTML = `${page}`
  
  createCards(cardsOnPage, page)
}
const forwardDouble = () => {
  page = countOfPages
  pageNumber.innerHTML = `${page}`

  createCards(cardsOnPage, page)
}

forwardButton.addEventListener('click', () => {
  forward()
})
doubleForwardButton.addEventListener('click', () => {
  forwardDouble()
})
