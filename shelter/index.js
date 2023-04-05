const burgerIcon = document.querySelector('.burger__icon')
const burgerMenu = document.querySelector('.burger')

burgerIcon.addEventListener('click', () => {
  burgerIcon.classList.toggle('burger__icon-active')

  !burgerMenu.classList.contains('burger__active')
    ? burgerMenu.classList.add('burger__active')
    : burgerMenu.classList.remove('burger__active')
})

