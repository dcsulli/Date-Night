$(document).ready(function() {
  var apiKey = 'eb4968abafd4f782b4841a648cf585e4'
  var appID = '2db851a1'

  function renderRecipe(image){
    return `
    <img src="${image}" class="mw-100" /></a>
    `;
  }

$("#makeMyDateButton").click(function() {
  event.preventDefault();
  $('#make-my-date-container').fadeOut() 
  setTimeout(function(){
    $("#cook-or-restaurant-container").fadeIn()
  }, 500);
  })
  

$("#continueToFoodTypes").click(function() {
  event.preventDefault();
  var cookOrRestaurant = document.getElementsByName("cookOrRestaurant")
  console.log(cookOrRestaurant)
  for(i=0; i<cookOrRestaurant.length ;i++) {
    if(cookOrRestaurant[0].checked) {
    console.log("selected to cook")
    $('#cook-or-restaurant-container').fadeOut() 
    setTimeout(function(){
      $("#recipe-select-container").fadeIn()
    }, 500);}
    else if (cookOrRestaurant[1].checked) {
    console.log("selected to dine")
    $('#cook-or-restaurant-container').fadeOut() 
    setTimeout(function(){
      $("#recipe-select-container").fadeIn()
    }, 500);}}
  })


$("#continueToActivities").click(function() {
  event.preventDefault();

  var selectedFoodTypeCook = document.getElementById('inputCuisine').value
  var selectedFoodTypeCook = selectedFoodTypeCook.toLowerCase()
  console.log(selectedFoodTypeCook)
  
  $.get(`https://api.edamam.com/search?&q=${selectedFoodTypeCook}&app_id=${appID}&app_key=${apiKey}&from=0&to=100&calories=0-4000&health=alcohol-free`).done
    (function (data) {

      var randomNumberOne = Math.floor(Math.random() * 101)
      var randomRecipeOne = data.hits[randomNumberOne]

      console.log(randomRecipeOne);

      var randomNumberTwo = Math.floor(Math.random() * 101)
      var randomRecipeTwo = data.hits[randomNumberTwo]
      console.log(randomRecipeTwo);

      var randomNumberThree = Math.floor(Math.random() * 101)
      var randomRecipeThree = data.hits[randomNumberThree]
      console.log(randomRecipeThree);

      $('#recipeImgOne').attr("src",randomRecipeOne.recipe.image)
      $('#recipeImgTwo').attr("src",randomRecipeTwo.recipe.image)
      $('#recipeImgThree').attr("src",randomRecipeThree.recipe.image)

      $('#recipeLabelOne').html(randomRecipeOne.recipe.label)
      $('#recipeLabelTwo').html(randomRecipeTwo.recipe.label)
      $('#recipeLabelThree').html(randomRecipeThree.recipe.label)
    })
  



  $('#recipe-select-container').fadeOut() 
  setTimeout(function(){
    $("#indoor-outdoor-container").fadeIn()
  }, 500);
  })


$("#continueToResults").click(function() {
  event.preventDefault();

  $('#indoor-outdoor-container').fadeOut() 
  setTimeout(function(){
    $("#results-container").fadeIn()
  }, 500);
  })
  


})



  