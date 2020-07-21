const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movies = document.getElementById("movie");
let ticketPrice = localStorage.getItem("selectedMoviePrice")
  ? localStorage.getItem("selectedMoviePrice")
  : parseInt(movies.value);

populateUI();

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  if (selectedMovieIndex !== null) {
    movies.selectedIndex = selectedMovieIndex;
  }
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  count.innerText = selectedSeats.length;
  total.innerText = parseInt(count.innerText) * ticketPrice + "$";
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
}

movies.addEventListener("change", (e) => {
  ticketPrice = parseInt(e.target.value);
  updateSelectCount();
  setMovieData(e.target.selectedIndex, e.target.value);
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectCount();
  }
});

updateSelectCount();
