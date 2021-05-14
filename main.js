const request_token = "MIQcoABJKleapiAIbKTsSDqdFYMiEHbKHqZMBhVg"
//fetch('https://api.discogs.com/oauth/MIQcoABJKleapiAIbKTsSDqdFYMiEHbKHqZMBhVg')

fetch('https://api.discogs.com//users/putzikki/collection/folders/0/releases?sort=year&sort_order=desc&per_page=150',{
  headers: {
			"Authorization": "Discogs token=MIQcoABJKleapiAIbKTsSDqdFYMiEHbKHqZMBhVg",
            }
})
  .then(res => {
    if (res.ok) {
      console.log("SUCCESS")
    } else {
      console.log("Something went wrong!")
    }
    return res
  })
  .then((data) => data.json())
  .then((collection) => generateHtml(collection))

const generateHtml = (data) => {
  console.log(data)
  for (item of data.releases){
  var image = document.createElement("img");
  image.setAttribute("src", item.basic_information.cover_image);

  var node = document.createElement("LI");

  document.querySelector('.gallery').appendChild(image)
  }
}
