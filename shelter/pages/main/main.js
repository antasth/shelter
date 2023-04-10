import pets from '../../data/pets.json' assert { type: 'json' }

// BURGER
const body = document.querySelector('body')
const burgerMenu = document.querySelector('.burger')
const burgerIcon = document.querySelector('.burger__icon')
const burgerMenuItem = document.querySelectorAll('.burger__list-item')
const burgerBackground = document.querySelector('.burger__background')

// if click on burger icon => show or hide burger menu and rotate icon
burgerIcon.addEventListener('click', () => {
  // if scroll is hidden => add margin right
  let marginSize = window.innerWidth - document.documentElement.clientWidth
  if (marginSize) {
    document.documentElement.style.marginRight = marginSize + 'px'
  } else {
    document.documentElement.style.marginRight = 0
  }

  body.classList.toggle('locked')
  burgerMenu.classList.toggle('burger__active')
  burgerIcon.classList.toggle('burger__icon-active')
  burgerBackground.classList.toggle('burger__background-active')
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

function hideBurger() {
  body.classList.remove('locked')
  burgerMenu.classList.remove('burger__active')
  burgerIcon.classList.remove('burger__icon-active')
  burgerBackground.classList.remove('burger__background-active')
  document.documentElement.style.marginRight = 0
}

// SLIDER
const sliderCards = document.querySelector('.pets__cards')
const backArrow = document.querySelector('.back__arrow')
const forwardArrow = document.querySelector('.forward__arrow')

let currArray,
  prevArray,
  nextArray = []
let slidesOnPage =
  document.body.clientWidth > 1100 ? 3 : document.body.clientWidth < 768 ? 1 : 2

const mediaQueries = [
  window.matchMedia('(min-width: 0px) and (max-width: 768px)'),
  window.matchMedia('(min-width: 768px) and (max-width: 1279px)'),
  window.matchMedia('(min-width: 1280px)'),
]

const createNewCards = () => {
  sliderCards.replaceChildren()
  createInitCards()
  createNextCards(currArray)
  createPrevCards(currArray)
}

function screenMatches() {
  if (mediaQueries[0].matches) {
    slidesOnPage = 1
    createNewCards()
  }

  if (mediaQueries[1].matches) {
    slidesOnPage = 2
    createNewCards()
  }

  if (mediaQueries[2].matches) {
    slidesOnPage = 3
    createNewCards()
  }
}

mediaQueries.forEach((item) => {
  item.addEventListener('change', screenMatches)
})

// create card
const createCard = ({id, img, name }) => {
  let card = document.createElement('div')
  card.classList.add('pets__card')
  card.id = id
  card.innerHTML = `
  <div class="pets__card-img">
   <img src= '${img}' alt="pet" />
  </div>
  <div class="pets__card-name">${name}</div> 
  <div class="pets__card-button">Learn more</div>
  `
  return card
}

// generate init numbers of cards
const randomInitCards = (slidesCount) => {
  const cards = []
  while (cards.length < slidesCount) {
    let rand = Math.floor(Math.random() * 8)
    if (!cards.includes(rand)) {
      cards.push(rand)
    }
  }
  return cards
}
// generate next numbers of cards that not used in prev slide
const randomNextCards = (prevCards, slidesCount) => {
  const cards = []
  while (cards.length < slidesCount) {
    let rand = Math.floor(Math.random() * 8)
    if (!prevCards.includes(rand) && !cards.includes(rand)) {
      cards.push(rand)
    }
  }
  return cards
}

const createInitCards = () => {
  currArray = randomInitCards(slidesOnPage)
  let cardItem = document.createElement('div')
  cardItem.classList.add('slider__item')
  for (let i = 0; i < slidesOnPage; i++) {
    cardItem.appendChild(createCard(pets[currArray[i]]))
  }
  sliderCards.appendChild(cardItem)
}
// create new cards that not used in prev slide
const createNextCards = (arr) => {
  nextArray = randomNextCards(arr, slidesOnPage)
  let cardItem = document.createElement('div')
  cardItem.classList.add('slider__item')
  for (let i = 0; i < slidesOnPage; i++) {
    cardItem.appendChild(createCard(pets[nextArray[i]]))
  }
  sliderCards.appendChild(cardItem)
}
const createPrevCards = (arr) => {
  prevArray = randomNextCards(arr, slidesOnPage)
  let cardItem = document.createElement('div')
  cardItem.classList.add('slider__item')
  for (let i = 0; i < slidesOnPage; i++) {
    cardItem.appendChild(createCard(pets[prevArray[i]]))
  }
  sliderCards.prepend(cardItem)
}

const forward = () => {
  slidesOnPage === 3
    ? sliderCards.classList.add('transition-left-three')
    : slidesOnPage === 2
    ? sliderCards.classList.add('transition-left-two')
    : sliderCards.classList.add('transition-left-one')
}
const back = () => {
  slidesOnPage === 3
    ? sliderCards.classList.add('transition-right-three')
    : slidesOnPage === 2
    ? sliderCards.classList.add('transition-right-two')
    : sliderCards.classList.add('transition-right-one')
}

sliderCards.addEventListener('animationend', (animationEvent) => {
  if (
    animationEvent.animationName === 'move-left-three' ||
    animationEvent.animationName === 'move-left-two' ||
    animationEvent.animationName === 'move-left-one' 
  ) {
    sliderCards.classList.remove('transition-left-three')
    sliderCards.classList.remove('transition-left-two')
    sliderCards.classList.remove('transition-left-one')
    nextArray = currArray
    currArray = prevArray
    prevArray = randomNextCards(currArray, slidesOnPage)
    let cardItem = document.createElement('div')
    cardItem.classList.add('slider__item')
    for (let i = 0; i < slidesOnPage; i++) {
      cardItem.appendChild(createCard(pets[prevArray[i]]))
    }
    sliderCards.prepend(cardItem)
    sliderCards.lastChild.remove()
  } else {
    sliderCards.classList.remove('transition-right-three')
    sliderCards.classList.remove('transition-right-two')
    sliderCards.classList.remove('transition-right-one')
    prevArray = currArray
    currArray = nextArray
    nextArray = randomNextCards(currArray, slidesOnPage)
    let cardItem = document.createElement('div')
    cardItem.classList.add('slider__item')
    for (let i = 0; i < slidesOnPage; i++) {
      cardItem.appendChild(createCard(pets[nextArray[i]]))
    }
    sliderCards.append(cardItem)
    sliderCards.firstChild.remove()
  }
})

forwardArrow.addEventListener('click', () => {
  forward()
})

backArrow.addEventListener('click', () => {
  back()
})

createNewCards()
