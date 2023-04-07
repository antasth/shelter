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
const sliderCards = document.querySelector('.slider__cards')
const backArrow = document.querySelector('.back__arrow')
const forwardArrow = document.querySelector('.forward__arrow')

let currArray,
  prevArray = []
let slidesOnPage =
  document.body.clientWidth > 1100 ? 3 : document.body.clientWidth < 768 ? 1 : 2

// get count of slides on page
window.addEventListener('resize', () => {
  let windowWidth = document.body.clientWidth
  slidesOnPage = windowWidth > 1100 ? 3 : windowWidth < 768 ? 1 : 2

  if (sliderCards.children.length !== slidesOnPage) {
    createSliderCards()
  }
})

// create one card
const createCard = ({ img, name }) => {
  let card = document.createElement('div')
  card.classList.add('slider__card')
  card.innerHTML = `
  <div class="slider__card-img">
   <img src= '${img}' alt="pet" />
  </div>
  <div class="slider__card-name">${name}</div> 
  <div class="slider__card-button">Learn more</div>
  `
  sliderCards.appendChild(card)
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
  console.log('InitCards', cards)
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
  console.log('NextCards', cards)
  return cards
}

const createInitCards = () => {
  currArray = randomInitCards(slidesOnPage)
  for (let i = 0; i < slidesOnPage; i++) {
    createCard(pets[currArray[i]])
  }
}
createInitCards()
// create new cards that not used in prev slide
const createNextCards = (arr) => {
  sliderCards.replaceChildren()
  for (let i = 0; i < slidesOnPage; i++) {
    createCard(pets[arr[i]])
  }
}
const createSliderCards = () => {
  prevArray = currArray
  currArray = randomNextCards(prevArray, slidesOnPage)
  createNextCards(currArray)
}
const restorePrevCards = () => {
  ;[currArray, prevArray] = [prevArray, currArray]
  createNextCards(currArray)
}
// f = flag that shows slider direction
// if f = 1 direction is forward
// if f = -1 direction is back
let f = 0
const forward = () => {
  f === 1 || f === 0
    ? // forward
      createSliderCards()
    : //change from back to forward
      restorePrevCards()
  f = 1
}
const back = () => {
  f === -1 || f === 0
    ? // back
      createSliderCards()
    : //change from forward to back
      restorePrevCards()
  f = -1
}

forwardArrow.addEventListener('click', () => {
  forward()
})

backArrow.addEventListener('click', () => {
  back()
})
