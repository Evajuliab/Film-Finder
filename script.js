const movieSearch = document.getElementById("movie-search");
const searchList = document.getElementById("search-list");
const result = document.getElementById("result");
const API = '713ba58c'

// load movies from API
async function loadMovies(search) {
  const URL = `https://omdbapi.com/?s=${search}&page=1&apikey=${API}`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  // console.log(data.Search);
  if (data.Response == "True") displayMovie(data.Search); observe();
}

function findMovies() {
  let search = movieSearch.value;
  if (search.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(search);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

function displayMovie(movies) {
  searchList.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[i].imdbID;
    movieListItem.classList.add("search-list-item");

    movieListItem.innerHTML = `
      
        <div class= "card" style="width: 18rem;">
       
            <img src = "${movies[i].Poster}" class="card-img-top">
        
        <div class = "search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>Date de sortie : ${movies[i].Year}</p>
            <div id="overlay"></div>
      
            <button class='btn btn-info'>Voir plus</button>

        </div>
        </div>
        </div>
        </br>
        `;
    searchList.appendChild(movieListItem);
  }
}

// intersection observer

let observer = new IntersectionObserver(
    function (observable) {
      observable.forEach(function (observable) {
        if (observable.intersectionRatio > 0.5) {
          observable.target.classList.remove("not-visible");
          console.log("visible");
          // observer.unobserve(observable.target)
        } else {
          observable.target.classList.add("not-visible");
          console.log("pas visible");
        }
      });
    },
    {
      threshold: [0.5],
    }
  );
  
function observe(){
    let result = document.querySelectorAll(".card");
    console.log(result);
    result.forEach(function (result) {
      result.classList.add("not-visible");
      observer.observe(result);
    });
  };
