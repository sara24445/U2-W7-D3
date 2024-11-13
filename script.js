const apiEndpoint = 'https://striveschool-api.herokuapp.com/books'

// Funzione per caricare i libri dall'API
const loadBooks = async () => {
  const response = await fetch(apiEndpoint)
  const books = await response.json()

  const bookList = document.getElementById('book-list')
  bookList.innerHTML = ''

  books.forEach((book) => {
    const card = document.createElement('div')
    card.className = 'col-md-3 mb-4' // Modificato per 4 colonne
    card.innerHTML = `
              <div class="card">
                  <img src="${book.img}" class="card-img-top" alt="${book.title}">
                  <div class="card-body">
                      <h5 class="card-title">${book.title}</h5>
                      <p class="card-text">Prezzo: €${book.price}</p>
                      <button class="btn btn-danger remove-book">Scarta</button>
                      <button class="btn btn-primary add-to-cart">Compra ora</button>
                  </div>
              </div>
          `
    bookList.appendChild(card)
  })

  // Aggiungi gli eventi ai pulsanti "Scarta" e "Compra ora"
  attachButtonEvents()
}

// Funzione per gestire gli eventi dei pulsanti
const attachButtonEvents = () => {
  const removeButtons = document.querySelectorAll('.remove-book')
  const addToCartButtons = document.querySelectorAll('.add-to-cart')

  removeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const card = event.target.closest('.card')
      card.parentNode.removeChild(card) // Rimuovi la card
    })
  })

  addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', (event) => {
      const card = event.target.closest('.card')
      const title = card.querySelector('.card-title').innerText
      const price = card
        .querySelector('.card-text')
        .innerText.replace('Prezzo: €', '')

      const cart = JSON.parse(localStorage.getItem('cart')) || []
      cart.push({ title, price })
      localStorage.setItem('cart', JSON.stringify(cart))
      updateCart()
    })
  })
}

// Funzione per aggiornare il carrello
const updateCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || []
  const cartList = document.getElementById('cart')
  cartList.innerHTML = ''

  cart.forEach((item, index) => {
    const li = document.createElement('li')
    li.className =
      'list-group-item d-flex justify-content-between align-items-center'
    li.innerHTML = `${item.title} - €${item.price}`

    const removeButton = document.createElement('button')
    removeButton.className = 'btn btn-danger btn-sm'
    removeButton.innerText = 'Rimuovi'
    removeButton.addEventListener('click', () => {
      cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(cart))
      updateCart()
    })

    li.appendChild(removeButton)
    cartList.appendChild(li)
  })
}

// Carica i libri e il carrello all'avvio
window.onload = () => {
  loadBooks()
  updateCart()
}
