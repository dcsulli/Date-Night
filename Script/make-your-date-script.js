$(document).ready(function() {
  var apiKey = '3c828106cc5841ed9e78d3fb6ff06687'
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
  
  $.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${selectedFoodTypeCook}&number=6&sort=random&addRecipeInformation=true&dishTypes=dinner&veryPopular=true&fillIngredients=true`).done
    (function (data) {
      console.log(data);

      var hasRecipeArray = []

      for (i = 0; i<6; i++) {
        if (data.results[i].analyzedInstructions[0] !== undefined) {
          hasRecipeArray.push(data.results[i])
        }
      }

      console.log (hasRecipeArray)
      
      var randomRecipeOne = hasRecipeArray[0]
      console.log(randomRecipeOne);
      
      var randomRecipeTwo = hasRecipeArray[1]
      console.log(randomRecipeTwo);
      
      var randomRecipeThree = hasRecipeArray[2]
      console.log(randomRecipeThree);

      $('#minutesRecipeOne').html('<b>Cooking time: </b>' + randomRecipeOne.readyInMinutes + ' min.   |' + randomRecipeOne.servings + ' servings')
      $('#minutesRecipeTwo').html('<b>Cooking time: </b>' + randomRecipeTwo.readyInMinutes + ' min.   |' + randomRecipeTwo.servings + ' servings')
      $('#minutesRecipeThree').html('<b>Cooking time: </b>' + randomRecipeThree.readyInMinutes + ' min.  |' + randomRecipeTwo.servings + ' servings')


      $('#recipeImgOne').attr("src",randomRecipeOne.image)
      $('#recipeImgTwo').attr("src",randomRecipeTwo.image)
      $('#recipeImgThree').attr("src",randomRecipeThree.image)

      $('#recipeLabelOne').html(randomRecipeOne.title)
      $('#recipeLabelTwo').html(randomRecipeTwo.title)
      $('#recipeLabelThree').html(randomRecipeThree.title)

      $('#recipeSummaryOne').html(randomRecipeOne.summary)
      $('#recipeSummaryTwo').html(randomRecipeTwo.summary)
      $('#recipeSummaryThree').html(randomRecipeThree.summary)

      var recipeOneSteps = [];
      var recipeTwoSteps = [];
      var recipeThreeSteps = [];

      var recipeOneIngredients = [];
      var recipeTwoIngredients  = [];
      var recipeThreeIngredients  = [];

      function getRecipeOne (){
        let recipeSteps = randomRecipeOne.analyzedInstructions[0].steps
        for (i=0;i<recipeSteps.length; i++) {
          recipeOneSteps.push(randomRecipeOne.analyzedInstructions[0].steps[i].step)
        }
      }

      function getRecipeTwo (){
        let recipeSteps = randomRecipeTwo.analyzedInstructions[0].steps
        for (i=0;i<recipeSteps.length; i++) {
          recipeTwoSteps.push(randomRecipeTwo.analyzedInstructions[0].steps[i].step)
        }
      }

      function getRecipeThree (){
        let recipeSteps = randomRecipeThree.analyzedInstructions[0].steps
        for (i=0;i<recipeSteps.length; i++) {
          recipeThreeSteps.push(randomRecipeThree.analyzedInstructions[0].steps[i].step)
        }
      }
      
      function getIngredientsOne (){
        let recipeIngredients = randomRecipeOne.extendedIngredients
        for (i=0;i<recipeIngredients.length; i++) {
          recipeOneIngredients.push(randomRecipeOne.extendedIngredients[i].original)
        }
      }

      function getIngredientsTwo (){
        let recipeSteps = randomRecipeTwo.extendedIngredients
        for (i=0;i<recipeSteps.length; i++) {
          recipeTwoIngredients.push(randomRecipeTwo.extendedIngredients[i].original)
        }
      }

      function getIngredientsThree (){
        let recipeSteps = randomRecipeThree.extendedIngredients
        for (i=0;i<recipeSteps.length; i++) {
          recipeThreeIngredients.push(randomRecipeThree.extendedIngredients[i].original)
        }
      }

      getRecipeOne(randomRecipeOne)
      getRecipeTwo(randomRecipeTwo)
      getRecipeThree(randomRecipeThree)

      getIngredientsOne(randomRecipeOne)
      getIngredientsTwo(randomRecipeTwo)
      getIngredientsThree(randomRecipeThree)



      function addStepNumbers (recipeSteps) {
        for(var i=0;i<recipeSteps.length;i++){
          recipeSteps[i]="<li style='text-align:left'>" + recipeSteps[i] + '</li>';
        }
      }
      addStepNumbers(recipeOneSteps)
      addStepNumbers(recipeTwoSteps)
      addStepNumbers(recipeThreeSteps)

      function addRecipeBullets (recipeIngredients) {
        for(var i=0;i<recipeIngredients.length;i++){
          recipeIngredients[i]="<li style='text-align:left'>" + recipeIngredients[i] + '</li>';;
        }
      }

      addRecipeBullets(recipeOneIngredients)
      addRecipeBullets(recipeTwoIngredients)
      addRecipeBullets(recipeThreeIngredients)

      $('#recipeTextOne').html('<ol>' + recipeOneSteps.join('') + '</ol>')
      $('#recipeTextTwo').html('<ol>' + recipeTwoSteps.join('') + '</ol>')
      $('#recipeTextThree').html('<ol>' + recipeThreeSteps.join('') + '</ol>')

      $('#recipeIngredientsOne').html('<ul type="circle">' + recipeOneIngredients.join('') + '</ul>')
      $('#recipeIngredientsTwo').html('<ul type="circle">' + recipeTwoIngredients.join('') + '</ul>')
      $('#recipeIngredientsThree').html('<ul type="circle">' + recipeThreeIngredients.join('') + '</ul>')
      


      
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



  