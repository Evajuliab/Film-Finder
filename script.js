const movieSearch = document.getElementById('movie-search')
const searchList = document.getElementById('search-list');
const result = document.getElementById('result')


// load movies from API
async function loadMovies(search){
    const URL = `https://omdbapi.com/?s=${search}&page=1&apikey=713ba58c`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayMovie(data.Search);
}


function findMovies(){
    let search = (movieSearch.value)
if(search.length > 0) {
    searchList.classList.remove('hide-search-list');
    loadMovies(search)
} else {searchList.classList.add('hide-search-list');
}
}


function displayMovie(movies){
    searchList.innerHTML = "";
    for(let i = 0; i < movies.length; i++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[i].imdbID; 
        movieListItem.classList.add('search-list-item');
        

        movieListItem.innerHTML = `
        
        <div class= "card" style="width: 18rem;">
        <div class = "search-item-thumbnail">
     
            <img src = "${movies[i].Poster}" class="card-img-top">
        </div>
        <div class = "search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>Date de sortie : ${movies[i].Year}</p>
            <button class="popup btn btn-primary">En savoir plus
  <span class="popuptext" id="myPopup">Popup text...</span>
</button>
        </div>
        </div>
        </br>
        `;
        searchList.appendChild(movieListItem);
    }}


function popup() {
    let popup =document.getElementsByClassName(".popup");
    popup.addEventListener('click', () => {

        popup.classList.toggle('popuptext');
    }
    
    
    )

}


let observer = new IntersectionObserver(function (entries) {
    console.log(entries)
}, {
    threshold: [0.5]

}
)
const items = document.querySelectorAll('.search-item-thumbnail')
items.forEach(function(item){
    observer.observe(item)
})
