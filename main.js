//Fetching the data throught Discogs API

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
  // Creating JSON object
  .then((data) => data.json())
  .then((collection) => generateHtml(collection))

// Handling windows
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

// Handling data
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
    year.setAttribute("class", "info");
    if (rdata.year === 0){
      year.innerHTML = "Release year unknown";
    }
    else{
    year.innerHTML = rdata.year;
    }

    var genres = document.createElement("p");
    genres.setAttribute("class", "info");

    if(rdata.genres[1] !== undefined){
      genres.innerHTML = rdata.genres[0] + ", " + rdata.genres[1];
    }
    else{
      genres.innerHTML = rdata.genres[0];
    }

    var close = document.createElement("div");
    var closeSymbol = document.createTextNode("\u00D7");
    close.setAttribute("class", "close");

    close.appendChild(closeSymbol);
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

  }
};
