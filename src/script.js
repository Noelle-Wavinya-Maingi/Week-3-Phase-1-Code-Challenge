const posterInput = document.getElementById("poster");
const previewImage = document.getElementById("preview");

posterInput.addEventListener("input", () => {
  previewImage.src = posterInput.value;
});

document.addEventListener("DOMContentLoaded", () => {
  fetchFilms();
});

function fetchFilms() {
  fetch("http://localhost:3000/films")
    .then((res) => res.json())
    .then((film) => {
      renderFilmData(film);
    });
}

function renderFilmData(film) {
  const filmCardbox = document.getElementById("film-cardbox");
  filmCardbox.innerHTML = "";

  film.forEach((film) => {
    const filmCard = document.createElement("div");
    filmCard.classList.add("film-card");
    filmCard.id = `film-card-${film.id}`;
    filmCard.innerHTML = `
        <img src="${film.poster}" alt="${film.title}" class="film-card-poster">
        <h3 class="film-card-title">${film.title}</h3>
        <div class="film-card-details">
          <span class="tickets-count">${film.tickets_sold}/${film.capacity}</span>
          <button class="buy-button">Buy Tickets</button>
        </div>
      `;
    filmCard.addEventListener("mouseenter", () => showFilmDetails(film));
    filmCard.addEventListener("mouseleave", hideFilmDetails);
    filmCardbox.appendChild(filmCard);
  });

  const buyButtons = Array.from(document.getElementsByClassName("buy-button"));
  buyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filmId = button.parentElement.parentElement.id.replace(
        "film-card-",
        ""
      );
      buyTickets(filmId);
    });
  });
}

function updateTickets(id, ticketsSold) {
  fetch(`http://localhost:3000/films/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tickets_sold: ticketsSold }),
  });
}

function showFilmDetails(film) {
  const filmDetails = document.getElementById("film-details");
  filmDetails.innerHTML = `
      <h2 id="film-title">${film.title}</h2>
      <p id="film-description">${film.description}</p>
      <p id="film-runtime">Runtime: ${film.runtime} minutes</p>
      <p id="film-showtime">Showtime: ${film.showtime}</p>
      <p id="film-tickets-sold">Tickets Sold: ${film.tickets_sold}</p>
    `;
  filmDetails.classList.add("active");
}

function hideFilmDetails() {
  const filmDetails = document.getElementById("film-details");
  filmDetails.classList.remove("active");
}

function buyTickets(filmId) {
  const filmCard = document.getElementById(`film-card-${filmId}`);
  if (filmCard) {
    const ticketsCount = filmCard.querySelector(".tickets-count");
    const [ticketsSold, capacity] = ticketsCount.textContent.split("/");
    if (parseInt(ticketsSold) < parseInt(capacity)) {
      const newTicketsSold = parseInt(ticketsSold) + 1;
      ticketsCount.textContent = `${newTicketsSold}/${capacity}`;
      updateTickets(filmId, newTicketsSold);
    } else {
      alert("Tickets are sold out for this film!");
    }
  }
}
