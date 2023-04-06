const burgerBackground = document.querySelector('.burger__background')
const burgerIconBlack = document.querySelector('.burger__icon-black')
const burgerMenuItem = document.querySelectorAll('.burger__list-item')
const burgerIcon = document.querySelector('.burger__icon')
const burgerMenu = document.querySelector('.burger')
const body = document.querySelector('body')

// show or hide burger menu and rotate icon
burgerIconBlack.addEventListener('click', () => {
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
})
// change icon color
burgerIconBlack.addEventListener('click', () => {
  burgerIconBlack.classList.toggle('burger__icon-black')
})

// if click on burger link => hide burger menu
burgerMenuItem.forEach((item) => {
  item.addEventListener('click', () => {
    body.classList.remove('locked')
    burgerMenu.classList.remove('burger__active')
    burgerIcon.classList.remove('burger__icon-active')
    burgerIconBlack.classList.toggle('burger__icon-black')
    burgerBackground.classList.remove('burger__background-active')
    document.documentElement.style.marginRight = 0
  })
})
// if click on burger background => hide burger menu
burgerBackground.addEventListener('click', () => {
  body.classList.toggle('locked')
  burgerMenu.classList.toggle('burger__active')
  burgerIconBlack.classList.toggle('burger__icon-black')
  burgerIconBlack.classList.toggle('burger__icon-active')
  burgerBackground.classList.toggle('burger__background-active')
  document.documentElement.style.marginRight = 0
})

window.addEventListener('resize', () => {
  if (window.screen.availWidth > 767) {
    body.classList.remove('locked')
    burgerMenu.classList.remove('burger__active')
    burgerIcon.classList.remove('burger__icon-active')
    burgerIconBlack.classList.add('burger__icon-black')
    burgerBackground.classList.remove('burger__background-active')
    document.documentElement.style.marginRight = 0
  }
})
