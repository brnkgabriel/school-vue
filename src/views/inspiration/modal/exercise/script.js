var modaltoggles = document.querySelectorAll('.modal-toggle')
var modal = document.querySelector('.modal')

function toggleModal() {
  modal.classList.toggle('is-visible')
}

modaltoggles.forEach(modaltoggle => {
  modaltoggle.addEventListener('click', toggleModal)
})