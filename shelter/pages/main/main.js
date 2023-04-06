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
  if (window.screen.availWidth > 767) {
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
