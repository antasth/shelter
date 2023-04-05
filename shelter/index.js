const burgerIcon = document.querySelectorAll('.burger__icon')
const burgerMenu = document.querySelector('.burger')

burgerIcon.forEach((icon) => {
  icon.addEventListener('click', () => {
    icon.classList.toggle('burger__icon-active')
    !burgerMenu.classList.contains('burger__active')
      ? burgerMenu.classList.add('burger__active')
      : burgerMenu.classList.remove('burger__active')
  })
})
