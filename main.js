

let movieArrays = [
    ["The King's Speech", 'Black Swan', 'The Fighter', 'Inception', 'The Kids Are All Right', '127 Hours', 'The Social Network', 'Toy Story 3', 'True Grit', "Winter's Bone"],
    ['The Artist', 'The Descendants','Extremely Loud and Incredibly Close', 'The Help', 'Hugo', 'Midnight in Paris', 'Moneyball', 'The Tree of Life', 'War Horse'],
    ['Argo', 'Amour','Beasts of the Southern Wild','Django Unchained','Les Misérables','Life of Pi','Lincoln','Silver Linings Playbook','Zero Dark Thirty'],
    ['12 Years a Slave','American Hustle','Captain Phillips','Dallas Buyers Club','Gravity','Her','Nebraska','Philomena','The Wolf of Wall Street'],
    ['Birdman or (The Unexpected Virtue of Ignorance)', 'American Sniper','Boyhood','The Grand Budapest Hotel','The Imitation Game','Selma','The Theory of Everything','Whiplash'],
    ['Spotlight','The Big Short','Bridge of Spies','Brooklyn','Mad Max: Fury Road', 'The Martian', 'The Revenant', 'Room'],
    ['Moonlight', 'Arrival', 'Fences', 'Hacksaw Ridge', 'Hell or High Water','Hidden Figures', 'La La Land', 'Lion','Manchester by the Sea'],
    ['The Shape of Water','Call Me by Your Name','Darkest Hour','Dunkirk','Get Out','Lady Bird','Phantom Thread','The Post', 'Three Billboards Outside Ebbing, Missouri'],
    ["Green Book", 'Black Panther', 'BlacKkKlansman', 'Bohemian Rhapsody', 'The Favourite', 'Roma', 'A Star is Born','Vice'],
];

//console.log(movieArrays);

const cardContainer = document.getElementById('movie-container');
const yearSelector = document.getElementById('year-select');
yearSelector.addEventListener("change", ()=>{
  let condition = yearSelector.options[yearSelector.selectedIndex].value;
  //console.log(condition);
  const arraySelected = movieArrays[condition];
  selectedMovies = [];
  obtainMovies(arraySelected);
  //console.log(arraySelected);
  });

  //Create Cards
  const drawnCards = (movie) => {
    let card = `<div class="card">
      <div class=" ">
        <img class=" " src="${movie.poster}" alt="No Poster">
      </div>
      <div class=" ">
        <span class=" ">${movie.title}</span>
        <p>${movie.year}</p>
      </div>
      <div class=" ">
        <span class=" ">${movie.title}</span>
        <p>Director: ${movie.director}</p>
        <p>Cast: ${movie.actors}</p>
        <p>Run time: ${movie.runTime}</p>
        <h5>Synopsis</h5>
        <p>${movie.plot}.</p>
      </div>
    </div>`;
    cardContainer.insertAdjacentHTML("beforeend", card);
  };
  
  
  //Showing List Data
  const showCards = (moviesList) => {
    cardContainer.innerHTML = "";
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
          director: dataMovies.Director,
          actors: dataMovies.Actors,
          plot: dataMovies.Plot,
          runTime: dataMovies.Runtime,
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

  function apiCall() {
    let nombrePelicula = document.getElementById('pelicula').value; //se toma el valor del texto de la pelicula
    let body = document.getElementsByTagName("body")[0]; // se carga el elemento body
    let tbl = document.createElement("table"); // se crea un elemento tipo table
    tbl.id = 'tabla'; // se le asigna un id a la tabla
    let tblBody = document.createElement("tbody"); // se crea un elemento de tipo tbody
  
    if (body.getElementsByTagName("table").length > 0) { // se verifica que no exista una tabla cargada, si la tabla existe la remueves del body
      body.removeChild(document.getElementById('tabla')); //se remueve el elemento tabla con id tabla del objeto body
    }
  
    let rowTitle = document.createElement("tr"); // se crea la fila de la tabla
    let title = document.createElement("th"); //se crea la columna para el titulo de la pelicula
    let title1 = document.createElement("th"); // se crea la columna para los premios de la pelicula
    let title2 = document.createElement("th"); // se creaa la columna para el año de la pelicula
    let title3 = document.createElement("th"); // se crea la columna para los actores
    let titleText = document.createTextNode('Title'); // se agrega el texto del titulo de la pelicula
    let titleText1 = document.createTextNode('Awards'); // se agrega el texto de los premios
    let titleText2 = document.createTextNode('Year'); // se agrega el texto del año de la pelicula
    let titleText3 = document.createTextNode('Actors'); // se agrega el texto de los actores de la pelicula
    title.appendChild(titleText); //se agrega el texto a la columna de titulo
    title1.appendChild(titleText1);//se agrega el texto a la columna de premios
    title2.appendChild(titleText2); //se agrega el texto a la columna de año
    title3.appendChild(titleText3); //se agrega el texto a la columna de actores
    rowTitle.appendChild(title); // se agrega la columna titulo a la fila de la tabla
    rowTitle.appendChild(title1);// se agrega la columna premios a la fila de la tabla
    rowTitle.appendChild(title2);// se agrega la columna año a la fila de la tabla
    rowTitle.appendChild(title3);// se agrega la columna actores a la fila de la tabla
    tblBody.appendChild(rowTitle); //se agrega la fila a la tabla
  

  //se consulta el api por el nombre o año se usa el tipo search que deveulve un arreglo de peliculas
  fetch('http://www.omdbapi.com/?apikey=9cf43fbb&s='+encodeURI(nombrePelicula)+'&y='+ '&plot=full').then(response => response.json()).then(data => {
    if(data.Response !== 'False'){ // se verifica que la consulta traiga registros
      for (var i = 0; i < data.Search.length; i++) { //se itera sobre el arreglo de peliculas hasta el tamaño del arreglo
        //por cada elemento del arreglo consulta el api usando el atributo imdbID
        fetch('http://www.omdbapi.com/?apikey=9cf43fbb&i='+encodeURI(data.Search[i].imdbID)).then(response2 => response2.json()).then(data2 => {
          if(data2.Awards !== "N/A"){ // se verifica que tenga alguna premiacion o nominacion
            let row = document.createElement("tr"); // se crea la fila de la tabla
            let cell = document.createElement("td"); //se crea la columna para el titulo de la pelicula
            let cell1 = document.createElement("td"); // se crea la columna para los premios de la pelicula
            let cell2 = document.createElement("td"); // se creaa la columna para el año de la pelicula
            let cell3 = document.createElement("td"); // se crea la columna para los actores
            let cellText = document.createTextNode(data2.Title); // se agrega el texto del titulo de la pelicula
            let cellText1 = document.createTextNode(data2.Awards); // se agrega el texto de los premios
            let cellText2 = document.createTextNode(data2.Year); // se agrega el texto del año de la pelicula
            let cellText3 = document.createTextNode(data2.Actors); // se agrega el testo de los actores de la pelicula
            cell.appendChild(cellText); //se agrega el testo a la columna de titulo
            cell1.appendChild(cellText1);//se agrega el testo a la columna de premios
            cell2.appendChild(cellText2); //se agrega el testo a la columna de año
            cell3.appendChild(cellText3); //se agrega el testo a la columna de actores
            row.appendChild(cell); // se agrega la columna titulo a la fila de la tabla
            row.appendChild(cell1);// se agrega la columna premios a la fila de la tabla
            row.appendChild(cell2);// se agrega la columna año a la fila de la tabla
            row.appendChild(cell3);// se agrega la columna actores a la fila de la tabla
            tblBody.appendChild(row); // se agrega la fila a la tabla
          }
        }).catch(error => console.error(error)) // muestra en la consola cualquier error que suceda

      }
      
      tbl.appendChild(tblBody); // se agregas el body de la tabla a la tabla
      tbl.setAttribute("border", "1") // se agregas el atributo borde a la tabla
      body.appendChild(tbl); // se agregas la tabla al body

    }else {
      console.log('No hay peliculas'); // si no hay peliculas muestra este mensaje
    }
  }).catch(error => console.error(error))// muestra en la consola cualquier error que suceda


  }
document.getElementById('buscar').addEventListener("click",apiCall); // se llama a la funcion apiCall cuando le del click al boton
