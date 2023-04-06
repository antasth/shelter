const burgerIcon = document.querySelector('.burger__icon')
const burgerMenu = document.querySelector('.burger')
const burgerMenuItem = document.querySelectorAll('.burger__list-item')
const body = document.querySelector('body')
const burgerBackground = document.querySelector('.burger__background')

// show or hide burger menu and rotate icon
burgerIcon.addEventListener('click', () => {

  // if scroll is hidden => add margin right
  let marginSize = window.innerWidth - document.documentElement.clientWidth;
  if (marginSize) {
     document.documentElement.style.marginRight = marginSize + "px";
  } else {
    document.documentElement.style.marginRight = 0;
  }

  burgerIcon.classList.toggle('burger__icon-active')
  burgerMenu.classList.toggle('burger__active')
  body.classList.toggle('locked')
  burgerBackground.classList.toggle('burger__background-active')
})

// if click on burger link => hide burger menu
burgerMenuItem.forEach((item) => {
  item.addEventListener('click', () => {
    burgerMenu.classList.remove('burger__active')
    burgerIcon.classList.remove('burger__icon-active')
    body.classList.remove('locked')
    burgerBackground.classList.remove('burger__background-active')
    document.documentElement.style.marginRight = 0;
  })
})

// if click on burger background => hide burger menu
burgerBackground.addEventListener('click', ()=> {
  burgerIcon.classList.toggle('burger__icon-active')
  burgerMenu.classList.toggle('burger__active')
  body.classList.toggle('locked')
  burgerBackground.classList.toggle('burger__background-active')
  document.documentElement.style.marginRight = 0;
})

window.addEventListener('resize', ()=> {
  if(window.screen.availWidth > 767) {
    burgerMenu.classList.remove('burger__active')
    burgerIcon.classList.remove('burger__icon-active')
    body.classList.remove('locked')
    burgerBackground.classList.remove('burger__background-active')
    document.documentElement.style.marginRight = 0;
  }
})

// Чтобы окно не дергалось при скрытии скролла
function showBurger() {

  let marginSize = window.innerWidth - document.documentElement.clientWidth;
  if (marginSize) {
     document.documentElement.style.marginRight = marginSize + "px";
  }
}

