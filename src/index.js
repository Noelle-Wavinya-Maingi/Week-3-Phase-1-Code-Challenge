document.querySelector(".add-film").addEventListener("submit", handleSubmit);
const posterInput = document.getElementById("poster");
const previewImage = document.getElementById("preview");

posterInput.addEventListener("input", () => {
  previewImage.src = posterInput.value;
});

// Event handler for the event listener
function handleSubmit(event) {
  event.preventDefault();
  let filmObject = {
    title: event.target.title.value,
    runtime: event.target.runtime.value,
    capacity: event.target.capacity.value,
    showtime: event.target.showtime.value,
    tickets_sold: 0,
    description: event.target.description.value,
    poster: event.target.poster.value,
  };
  renderFilm(filmObject);
  addFilm(filmObject);
}

// Fetch request
function getFilm() {
  fetch("http://localhost:3000/films")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((film) => {
        renderFilm(film);
      });
      console.log("Before fetch returns");
    });
}

function addFilm(filmObject) {
  fetch("http://localhost:3000/films", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filmObject),
  })
    .then((response) => response.json())
    .then((film) => console.log(film));
}

function updateFilm(filmObject) {
  fetch(`http://localhost:3000/films/${filmObject.id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(filmObject),
  })
    .then((response) => response.json())
    .then((film) => console.log(film));
}

function deleteFilm(id) {
//   fetch(`http://localhost:3000/films/${id}`, {
//     method: "DELETE",
//     headers: { "Content-type": "application/json" },
//   })
//     .then((response) => response.json())
//     .then((film) => console.log(film));
console.log(id);
}

// DOM manipulation functions
function renderFilm(film) {
  // Build film card
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${film.poster}" alt="${film.title}" class="film-card-poster" style="width:100%">
    <div class="middle">
        <div class="text">
            <h2 id="film-title">${film.title}</h2>
            <p id="film-description">${film.description}</p>
            <p id="film-runtime">Duration: ${film.runtime} minutes</p>
            <p id="film-showtime">Showtime: ${film.showtime}</p>
            <p id="film-tickets-sold">Tickets Sold: ${film.tickets_sold}</p>
        </div>
    </div>
    <div class="film-card-details">
        <span class="tickets-count">Available Tickets: ${film.capacity - film.tickets_sold} Tickets</span>
        <button class="buy-button">Buy Ticket</button> 
        <button class = "Delete" onClick = "(deleteFilm(${film.id}))">Delete</button>
    </div>
  `;

  card.querySelector(".buy-button").addEventListener("click", () => {
   if(film.tickets_sold >= film.capacity){
    film.tickets_sold === film.capacity;
    alert(`${film.title} is sold out!`)
   }else{
    film.tickets_sold += 1;
   }
    card.querySelector("span").innerHTML = film.tickets_sold;
    updateFilm(film);
  });

  document.querySelector("#film-details").appendChild(card);
}

// Initialize render
// Get data and render films to the DOM
function initialize() {
  getFilm();
  console.log("After get all films");
}

initialize();
