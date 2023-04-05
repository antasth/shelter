const burgerIconBlack = document.querySelector('.burger__icon-black')
const burgerMenu = document.querySelector('.burger')

burgerIconBlack.addEventListener('click', () => {
  burgerIconBlack.classList.toggle('burger__icon-active')

  !burgerMenu.classList.contains('burger__active')
    ? burgerMenu.classList.add('burger__active')
    : burgerMenu.classList.remove('burger__active')
})

burgerIconBlack.addEventListener('click', () => {
  burgerIconBlack.classList.toggle('burger__icon-black')
})
