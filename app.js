
function apiCall() {
let nombrePelicula = document.getElementById('pelicula').value;
let year = document.getElementById('year').value;

$.getJSON('http://www.omdbapi.com/?apikey=9cf43fbb&s='+encodeURI(nombrePelicula)+'&y='+ encodeURI(year)+'&plot=full').then(function(response){
//se crea una función y se asignan los elementos película y año a las variables creadas

// let image = response.Awards;

let tableInit = "<table>";
let tableMiddle = "";
if(response.Response !== 'False'){
	 // console.log(response);
	for (var i = 0; i < response.Search.length; i++) {
		$.getJSON('http://www.omdbapi.com/?apikey=9cf43fbb&i='+encodeURI(response.Search[i].imdbID)).then(function(response_internal){
			if(response_internal.Awards !== "N/A"){
				
				// resultados.write(response_internal.Title + ' '+ response_internal.Awards);
				// document.getElementById("resultado").innerHTML = response_internal.Title + ' '+ response_internal.Awards;
				tableMiddle = "<tr> <td>"+response_internal.Title+"</td><td>"+response_internal.Awards+"</td></tr>" + tableMiddle;
				console.log(tableMiddle);
			}
		});
	}
	let tableEnd = "</table>";
	console.log(tableMiddle);
	document.getElementById("resultado").innerHTML = tableInit + tableMiddle + tableEnd;
}else {
	console.log('No hay peliculas');
}
});
}

$('button').click(function(){
apiCall();
});

//se crea un button con .click para llaamr a la función apiCall