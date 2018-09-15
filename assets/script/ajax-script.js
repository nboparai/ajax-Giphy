$(document).ready(function(){
var topicArray=["dog","rabit","lion","cat","spider","ant","elephant","girafe","hyena"];

function displayInfo(){
    var animalName=$(this).attr("data-name");
    var queryURL="https://api.giphy.com/v1/gifs/search?q="+animalName+"&api_key=SDuNqt6pj6gPqbURoNQX9bOpI0UsvdoC&limit=10";
// Creating an AJAX call for the specific animal button being clicked
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){

    var results = response.data;
    console.log(results);
    for (var i = 0; i < results.length; i++) {
        var showDiv = $("<div class='gifDiv'>");
        var rating = results[i].rating;
        var defaultAnimatedSrc = results[i].images.fixed_height.url;
        var staticSrc = results[i].images.fixed_height_still.url;
        var showImage = $("<img>");
        var p = $("<p>").text("Rating: " + rating);
        showImage.attr("src", staticSrc);
        showImage.addClass("animalGiphy");
        showImage.attr("data-state", "still");
        showImage.attr("data-still", staticSrc);
        showImage.attr("data-animate", defaultAnimatedSrc);
        showDiv.append(p);
        showDiv.append(showImage);
        $("#gifArea").prepend(showDiv);

        }
	});
}

function renderButtons() {

    // Deleting the animals prior to adding new animals
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < topicArray.length; i++) {

      // Then dynamicaly generating buttons for each animal in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of animal-btn to our button
      a.addClass("animal-btn");
      a.addClass("btn btn-info");
      // Adding a data-attribute
      a.attr("data-name", topicArray[i]);
      // Providing the initial button text
      a.text(topicArray[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
}

 // This function handles events where a add animal button is clicked
 $("#add-animal").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();
  if (animal && topicArray.indexOf(animal) == -1) {
    
    // Adding animal from the textbox to our array
    topicArray.push(animal);
    // Calling renderButtons which handles the processing of our animal array
    renderButtons();
  }
  else{
    alert("Pick another animal");
  }
    // Clearing the input box
    $("#animal-input").val("");
    
   
    
  });
  $(document).on("click", ".animal-btn", displayInfo);
  renderButtons();
  $(document).on("click", ".animalGiphy", pausePlayGifs);
  function pausePlayGifs() {
    var state = $(this).attr("data-state");
     if (state === "still") {
       $(this).attr("src", $(this).attr("data-animate"));
       $(this).attr("data-state", "animate");
     } else {
       $(this).attr("src", $(this).attr("data-still"));
       $(this).attr("data-state", "still");
 }
}
});