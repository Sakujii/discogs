const request_token = "MIQcoABJKleapiAIbKTsSDqdFYMiEHbKHqZMBhVg"
//fetch('https://api.discogs.com/oauth/MIQcoABJKleapiAIbKTsSDqdFYMiEHbKHqZMBhVg')

fetch('https://api.discogs.com//users/putzikki/collection/folders/0/releases?sort=year&sort_order=desc&per_page=150',{
  headers: {
			"Authorization": "Discogs token=MIQcoABJKleapiAIbKTsSDqdFYMiEHbKHqZMBhVg",
            }
})
  .then(res => {
    if (res.ok) {
      console.log("SUCCESS");
    } else {
      console.log("Something went wrong!");
    }
    return res;
  })
  .then((data) => data.json())
  .then((collection) => generateHtml(collection))


function popUp(release, master, modal, close, event){
  modal.style.display = "block";

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
    else if (event.target == close) {
      modal.style.display = "none";
    }
  };
}

var id = 0;
const generateHtml = (data) => {

  console.log(data);
  for (var item of data.releases){
    var rdata = item.basic_information;
    var release_url = rdata.resource_url;
    var master_url = rdata.master_url;

    var image = document.createElement("img");
    image.setAttribute("src", rdata.cover_image);
    image.setAttribute("id", id);

    var modal = document.createElement("div");
    modal.setAttribute("class", "modal");
    modal.style.display = "none";

    var modalContent = document.createElement("div");
    modalContent.setAttribute("class", "modal-content");

    var releaseContent = document.createElement("div");

    var title = document.createElement("p");
    title.setAttribute("class", "title");
    title.innerHTML = rdata.artists[0].name + " - " + rdata.title;

    var year = document.createElement("p");
    year.innerHTML = "Release Year: " + rdata.release_year;

    var genres = document.createElement("p");
    genres.innerHTML = "Genres: " + rdata.genres[0] + ", " + rdata.genres[1];

    var close = document.createElement("div");
    var closeSymbol = document.createTextNode("\u00D7");
    close.setAttribute("class", "close");

    close.appendChild(closeSymbol);
    releaseContent.appendChild(image);
    releaseContent.appendChild(title);
    releaseContent.appendChild(year);
    releaseContent.appendChild(genres);
    modalContent.appendChild(close);
    modalContent.appendChild(releaseContent);
    modal.appendChild(modalContent);

    image.addEventListener("click", popUp.bind(this, release_url, master_url, modal, close));

    document.querySelector('.gallery').appendChild(image);
    document.querySelector('.gallery').appendChild(modal);
    id = id + 1;
//    fetch("https://api.discogs.com/masters/24497",{mode:"no-cors"})
//    .then((master) => console.log(master.json()))

    if (master_url !== null){
        fetch(master_url,{
          headers: {
            "Authorization": "Discogs token=MIQcoABJKleapiAIbKTsSDqdFYMiEHbKHqZMBhVg",
            "User-Agent": "Putzikki",
            "Access-Control-Allow-Origin": "file:///Users/Saku/discogs/index.html",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "access-control-allow-origin, Authorization",
          }
        })
      }
      .then((res) => console.log(res.json()))
  }
}
