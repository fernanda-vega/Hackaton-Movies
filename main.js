

let movieArrays = [
  ["The King's Speech", 'Black Swan', 'The Fighter', 'Inception', 'The Kids Are All Right', '127 Hours', 'The Social Network', 'Toy Story 3', 'True Grit', "Winter's Bone"],
  ['The Artist', 'The Descendants','Extremely Loud & Incredibly Close', 'The Help', 'Hugo', 'Midnight in Paris', 'Moneyball', 'The Tree of Life', 'War Horse'],
  ['Argo', 'Amour','Beasts of the Southern Wild','Django Unchained','Les Misérables','Life of Pi','Lincoln','Silver Linings Playbook','Zero Dark Thirty'],
  ['12 Years a Slave','American Hustle','Captain Phillips','Dallas Buyers Club','Gravity','Her','Nebraska','Philomena','The Wolf of Wall Street'],
  ['Birdman or (The Unexpected Virtue of Ignorance)', 'American Sniper','Boyhood','The Grand Budapest Hotel','The Imitation Game','Selma','The Theory of Everything','Whiplash'],
  ['Spotlight','The Big Short','Bridge of Spies','Brooklyn','Mad Max: Fury Road', 'The Martian', 'The Revenant', 'Room'],
  ['Moonlight', 'Arrival', 'Fences', 'Hacksaw Ridge', 'Hell or High Water','Hidden Figures', 'La La Land', 'Lion','Manchester by the Sea'],
  ['The Shape of Water','Call Me by Your Name','Darkest Hour','Dunkirk','Get Out','Lady Bird','Phantom Thread','The Post', 'Three Billboards Outside Ebbing, Missouri'],
  ["Green Book", 'Black Panther', 'BlacKkKlansman', 'Bohemian Rhapsody', 'The Favourite', 'Roma', 'A Star is Born','Vice'],
];

let cardContainer = document.getElementById('movie-container');
const yearSelector = document.getElementById('year-select');
const movieTitle = document.getElementById('title-movies');
document.getElementById("title-movies").style.display = "none";
yearSelector.addEventListener("change", ()=>{
let condition = yearSelector.options[yearSelector.selectedIndex].value;
const arraySelected = movieArrays[condition];
selectedMovies = [];
obtainMovies(arraySelected);
});

//Create Cards
const drawnCards = (movie) => {
  let card = `<div class="col-md-3">
    <div class="card mb-4 shadow-sm ">
      <img class="bd-placeholder-img card-img-top" src="${movie.poster}" alt="No Poster">
    
    <div class="card-body">
    <p class="card-text small-text">${movie.year} / ${movie.genre}</p>
      <p class="card-text">${movie.title}</p>
    </div>
    </div>
  </div>`;
  cardContainer.insertAdjacentHTML("beforeend", card);
};

//Showing List Data
const showCards = (moviesList) => {
  cardContainer.innerHTML = "";
  movieTitle.innerHTML = "Películas nominadas a Mejor Película en el año " + yearSelector.options[yearSelector.selectedIndex].text;
  document.getElementById("title-movies").style.display = "block";
  moviesList.forEach(element => {
    drawnCards(element);
  });
};

//Geting data from API
const obtainDataJson = (title) => {
  fetch('http://www.omdbapi.com/?t=' + title + "&apikey=4a33a137")
    .then(response => response.json())
    .then(dataMovies => {
      dataMoviesProperties = {
        title: dataMovies.Title,
        genre: dataMovies.Genre,
        director: dataMovies.Director,
        actors: dataMovies.Actors,
        plot: dataMovies.Plot,
        poster: dataMovies.Poster,
        year: dataMovies.Year,
        website: dataMovies.Website
      };
      selectedMovies.push(dataMoviesProperties);
      showCards(selectedMovies);
    })
}

//Geting selected array info
const obtainMovies = (arraySelected) => {
  for (let i = 0; i < arraySelected.length; i++) {
    obtainDataJson(arraySelected[i]);
  }
}

function apiCallSearch() {
  let cardContainer = document.getElementById('movie-container');
  cardContainer.innerHTML = "";
  let movieSearch = document.getElementById('movie-search').value; //se toma el valor del texto de la pelicula
  document.getElementById("title-movies").style.display = "none";

//se consulta el api por el nombre o año se usa el tipo search que deveulve un arreglo de peliculas
fetch('http://www.omdbapi.com/?apikey=9cf43fbb&s=' + encodeURI(movieSearch) + '&plot=full').then(response => response.json()).then(data => {
  if(data.Response !== 'False'){ // se verifica que la consulta traiga registros
    for (var i = 0; i < data.Search.length; i++) {
      //se itera sobre el arreglo de peliculas hasta el tamaño del arreglo
      //por cada elemento del arreglo consulta el api usando el atributo imdbID
      fetch('http://www.omdbapi.com/?apikey=9cf43fbb&i='+encodeURI(data.Search[i].imdbID)).then(response2 => response2.json()).then(data2 => {
        if(data2.Awards !== "N/A"){ 
          let card = '';
          let cardContainer = document.getElementById('movie-container');
          container = '';
          card += `<div class="col-md-3">
          <div class="card mb-4 shadow-sm ">
            <img class="bd-placeholder-img card-img-top" src="${data2.Poster}" alt="No Poster">
          
          <div class="card-body">
          <p class="card-text small-text">${data2.Year} / ${data2.Genre}</p>
            <p class="card-text">${data2.Title}</p>
            <p class="card-text small-text rose-text">${data2.Awards}</p>
          </div>
          </div>
        </div>`;
        cardContainer.insertAdjacentHTML("beforeend", card);
        }
      }).catch(error => console.error(error)) // muestra en la consola cualquier error que suceda
    }
  }
  else {
    console.log('No hay peliculas'); // si no hay peliculas muestra este mensaje
  }
}).catch(error => console.error(error))// muestra en la consola cualquier error que suceda
}
document.getElementById('search').addEventListener("click",apiCallSearch); // se llama a la funcion apiCall cuando le del click al boton

//se muestra cartas al cargar la página
window.addEventListener('load', ()=>{
  const arraySelected = ["Green Book", 'Black Panther', 'BlacKkKlansman', 'Bohemian Rhapsody', 'The Favourite', 'Roma', 'A Star is Born','Vice'];
  selectedMovies = [];
  obtainMovies(arraySelected);
 });