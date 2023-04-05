const burgerIcon = document.querySelector('.burger__icon')
const burgerMenu = document.querySelector('.burger')
const burgerMenuItem = document.querySelectorAll('.burger__list-item')

// show or hide burger menu and rotate icon
burgerIcon.addEventListener('click', () => {
  burgerIcon.classList.toggle('burger__icon-active')
  burgerMenu.classList.toggle('burger__active')
})

// if click on burger link => hide burger menu
burgerMenuItem.forEach((item) => {
  item.addEventListener('click', () => {
    burgerMenu.classList.remove('burger__active')
    burgerIcon.classList.remove('burger__icon-active')
  })
})
