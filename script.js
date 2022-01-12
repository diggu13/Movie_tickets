const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document .getElementById('movie');
let ticketPrice = +movieSelect.value;
// console.log(ticketPrice)
 populateUI();
// setMovieData
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);

}

function updatedSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat=>
    [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    count.innerHTML = selectedSeats.length;
    total.innerHTML = count.innerHTML * ticketPrice;
}

// get data from local storage 
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats != null && selectedSeats.length >0){
        seats.forEach((seat ,index) => {
            if(selectedSeats.indexOf(index)> -1){
                seat.classList.add('selected')
            }
        })
    }

    const selectMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectMovieIndex !== null){
        movieSelect.selectedIndex = selectMovieIndex;
    }
}

// movie select

movieSelect.addEventListener('click', (e) => {
    ticketPrice = +e.target.value;
    updatedSelectedCount();
    setMovieData(e.target.selectedIndex,e.target.value)
})

// seat click event 
container.addEventListener('click',(e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        updatedSelectedCount();
    }
})

updatedSelectedCount();