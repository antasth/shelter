const burgerIcon = document.querySelector('.burger__icon')
const burgerIconBlack = document.querySelector('.burger__icon-black')
const burgerMenu = document.querySelector('.burger')
const burgerMenuItem = document.querySelectorAll('.burger__list-item')
const body = document.querySelector('body')
const burgerBackground = document.querySelector('.burger__background')


// show or hide burger menu and rotate icon
burgerIconBlack.addEventListener('click', () => {
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
    burgerMenu.classList.remove('burger__active')
    burgerIcon.classList.remove('burger__icon-active')
    burgerIconBlack.classList.toggle('burger__icon-black')
    body.classList.remove('locked')
    burgerBackground.classList.remove('burger__background-active')

  })
})
