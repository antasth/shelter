const burgerIcon = document.querySelectorAll('.burger__icon')
const burgerMenu = document.querySelector('.burger')

burgerIcon.forEach((icon) => {
  icon.addEventListener('click', () => {
    !burgerMenu.classList.contains('burger__active')
      ? burgerMenu.classList.add('burger__active')
      : burgerMenu.classList.remove('burger__active')
  })
})
