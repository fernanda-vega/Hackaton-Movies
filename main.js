let movieArray = ["Star Wars", 'Harry Potter', 'Lord Of the Rings', 'Game Of Thrones', 'Batman'];

function apiCall () {
//     let randomNumber = Math.floor((Math.random() * movieArray.length -1) +1);
//    // console.log(randomNumber);
    
//     let randomMovie = movieArray[randomNumber];
//     //console.log(randomMovie);    
for ( let i=0; i<movieArray.length; i++){
    $.getJSON(('http://www.omdbapi.com/?t=' + encodeURI(movieArray[i])) + "&apikey=4a33a137").then(function(response){
        console.log(response);
        
        let image = response.Poster;
        let title = response.Title;
        let year = response.Year;
        let genre = response.Genre

        let container = document.getElementById('movie-container');
        container.innerHTML="";

        let movieBox = document.createElement("div");
        // let movieImage = document.createElement("img");
        // movieImage.innerHTML = image;

        //si la imagen es diferente a N/A, se cambia por la imagen que viene en la API
        if (image !== "N/A"){
            $('img').attr('src', image);
        }

        let movieTitle = document.createElement("p");
        movieTitle.innerHTML = title;

        let movieYear = document.createElement("p");
        movieYear.innerHTML = "Año: " + year;

        let movieGenre = document.createElement("p");
        movieGenre.innerHTML = "Género: " + genre;

        movieBox.appendChild(movieTitle);
        movieBox.appendChild(movieYear);
        movieBox.appendChild(movieGenre)
        
        container.appendChild(movieBox).innerHTML;
    })
}
};

$('button').click(function(){
    apiCall();
})



// fetch('http://www.omdbapi.com/?t=' + encodeURI(randomMovie)) + "&apikey=4a33a137)
//  .then((success) => { success.json() } )
//  .then((movies) => { console.log(movies) } )
//  .catch((error)=>{ console.log(error)});