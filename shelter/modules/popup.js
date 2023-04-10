import pets from '../data/pets.json' assert { type: 'json' }

// MODAL

function showModal() {
  const modal = document.querySelector('.popup-overlay')

  // if scroll is hidden => add margin right
  let marginSize = window.innerWidth - document.documentElement.clientWidth
  if (marginSize) {
    document.documentElement.style.marginRight = marginSize + 'px'
  }
  modal.classList.add('show')
  modal.classList.remove('hide')
  document.body.classList.add('locked')
}

function hideModal() {
  const modal = document.querySelector('.popup-overlay')

  modal.classList.remove('show')
  modal.classList.add('hide')
  document.body.classList.remove('locked')
  document.documentElement.style.marginRight = 0
}

function createPetPopupCard({
  modalImg,
  name,
  type,
  breed,
  description,
  age,
  inoculations,
  diseases,
  parasites,
}) {
  const petCard = document.createElement('div')
  petCard.classList.add('pet')
  petCard.innerHTML = `
  <button class="popup-close">&times;</button>
  <div class="pet__img">
    <img
      src=${modalImg}
      alt="pet-img"
    />
  </div>
  <div class="pet__description">
    <div class="description__header">
      <h3 class="title">${name}</h3>
      <h4 class="subtitle">${type}-${breed}</h4>
    </div>
    <h5 class="description__text">
      ${description}
    </h5>

    <ul class="pet__info">
      <li><span>Age:</span> ${age}</li>
      <li><span>Inoculations:</span> ${inoculations.join(', ')}</li>
      <li><span>Diseases:</span> ${diseases.join(', ')}</li>
      <li><span>Parasites:</span> ${parasites.join(', ')}</li>
    </ul>
  </div>
`
  return petCard
}

const petsCards = document.querySelector('.pets__cards')

petsCards.addEventListener('click', (event) => {
  let target = event.target
  let card = event.target.closest('.pets__card')
  if (!card) return

  if (target && card) {
    const pet = pets.find((item) => item.id == card.id)
    const popupContainer = document.querySelector('.popup_container')
    popupContainer.replaceChildren()
    popupContainer.append(createPetPopupCard(pet))
    showModal()

    const modal = document.querySelector('.popup-overlay')
    const close = document.querySelector('.popup-close')

    close.addEventListener('click', () => {
      hideModal(modal)
    })

    modal.addEventListener('click', (e) => {
      if (e.target == modal) {
        hideModal(modal)
      }
    })
  }
})