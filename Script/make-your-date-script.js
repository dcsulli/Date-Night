$(document).ready(function() {
  var apiKey = '3c828106cc5841ed9e78d3fb6ff06687'
  var appID = '2db851a1'



        

  // function renderRecipe(image){
  //   return `
  //   <img src="${image}" class="mw-100" /></a>
  //   `;
  // }

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
      $("#cook-cuisine-select-container").fadeIn()
    }, 500);
    }
    else if (cookOrRestaurant[1].checked) {
    console.log("selected to dine")
    $('#cook-or-restaurant-container').fadeOut() 
    setTimeout(function(){
      $("#zip-code-container").fadeIn()
    }, 500);}}
  })


$("#continueToRecipes").click(function() {
  event.preventDefault();

  var selectedFoodTypeCook = document.getElementById('inputCookingCuisine').value
  var selectedFoodTypeCook = selectedFoodTypeCook.toLowerCase()
  console.log(selectedFoodTypeCook)

  $('#loading-text').fadeIn() 
  
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
    $('#loading-text').fadeOut() },2300);
  setTimeout(function(){
    $('#continueToRecipes').html('Search again')
    $("#recipe-select-container").fadeIn()
  }, 2500);

})

  $("#chooseRecipeOne").click(function() {
  event.preventDefault();
  $('#recipe-select-container').fadeOut()
  $('#cook-cuisine-select-container').fadeOut()
  setTimeout(function(){
    $("#great-text").fadeIn()
  }, 500);  
  setTimeout(function(){
    $("#great-text").fadeOut()
  }, 3000);
  setTimeout(function(){
    $("#indoor-outdoor-container").fadeIn()
  }, 3500);
  })

  $("#chooseRecipeTwo").click(function() {
    event.preventDefault();
    $('#recipe-select-container').fadeOut()
    $('#cook-cuisine-select-container').fadeOut()
    setTimeout(function(){
      $("#great-text").fadeIn()
    }, 500);  
    setTimeout(function(){
      $("#great-text").fadeOut()
    }, 3000);
    setTimeout(function(){
      $("#indoor-outdoor-container").fadeIn()
    }, 3500);
    })

  $("#chooseRecipeThree").click(function() {
    event.preventDefault();
    $('#recipe-select-container').fadeOut()
    $('#cook-cuisine-select-container').fadeOut()
    setTimeout(function(){
      $("#great-text").fadeIn()
    }, 500);  
    setTimeout(function(){
      $("#great-text").fadeOut()
    }, 3000);
    setTimeout(function(){
      $("#indoor-outdoor-container").fadeIn()
    }, 3500);
    })



  



$("#continueToMoreActivities").click(function() {
  event.preventDefault();

  var zipCode = document.getElementById('zipCodeForm').value;
  console.log(zipCode)

  $.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zipCode}&facet=state&facet=timezone&facet=dst`).done
    (function (data) {
      var latitude = data.records[0].fields.latitude;

      var longitude = data.records[0].fields.longitude;

      var selectedCuisineRestaurant = document.getElementById('inputRestaurantCuisine').value

      var cuisinesIDs = {
               152:'African',
                1:'American',
                133:'British',
                491:'Cajun',
                158:'Caribbean',
                25:'Chinese',
                651:'Eastern European',
                45:'French',
                134:'German',
                156:'Greek',
                148:'Indian',
                135:'Irish',
                55:'Italian',
                60:'Japanese',
                67:'Korean',
                136:'Latin American',
                73:'Mexican',
                137:'Middle Eastern', 
                471:'Southern',
                89:'Spanish',
                95:'Thai',
                99:'Vietnamese'
          }
        

        function searchObj (obj, query) {

          for (var key in obj) {
              var value = obj[key];
      
              if (typeof value === 'object') {
                  searchObj(value, query);
              }
      
              if (value === query) {
                  return key;
              }
          }
        } 

      var restaurantCuisineChoice = searchObj(cuisinesIDs, selectedCuisineRestaurant)

      $.ajax({
        headers:{'user-key': "3e7f5057d60d60ddeb1fa6eac9f2703b"},
        url: `https://developers.zomato.com/api/v2.1/search?lat=${latitude}&lon=${longitude}&radius=2000&cuisines=${restaurantCuisineChoice}&sort=real_distance&order=asc`,
        type: 'GET',
        success : function (data) {
          console.log(data)
          $('#restaurantLabelOne').html(data.restaurants[0].restaurant.name);
          $('#restaurantLabelTwo').html(data.restaurants[1].restaurant.name);
          $('#restaurantLabelThree').html(data.restaurants[2].restaurant.name);

          $('#restaurantAddressOne').html(data.restaurants[0].restaurant.location.address);
          $('#restaurantAddressTwo').html(data.restaurants[1].restaurant.location.address);
          $('#restaurantAddressThree').html(data.restaurants[2].restaurant.location.address);

          $('#restaurantHoursOne').html('Hours: ' + data.restaurants[0].restaurant.timings);
          $('#restaurantHoursTwo').html('Hours: ' + data.restaurants[1].restaurant.timings);
          $('#restaurantHoursThree').html('Hours: ' + data.restaurants[2].restaurant.timings);

          $('#restaurantPhoneNumberOne').html(data.restaurants[0].restaurant.phone_numbers);
          $('#restaurantPhoneNumberTwo').html(data.restaurants[1].restaurant.phone_numbers);
          $('#restaurantPhoneNumberThree').html(data.restaurants[2].restaurant.phone_numbers);

          
          var restaurantOneFeatures = [];
          var restaurantTwoFeatures  = [];
          var restaurantThreeFeatures  = [];

          function getRestaurantFeaturesOne (){
            let restaurantFeatures = data.restaurants[0].restaurant.highlights
            for (i=0;i<restaurantFeatures.length; i++) {
              restaurantOneFeatures.push(data.restaurants[0].restaurant.highlights[i])
            }
          }

          function getRestaurantFeaturesTwo (){
            let restaurantFeatures = data.restaurants[1].restaurant.highlights
            for (i=0;i<restaurantFeatures.length; i++) {
              restaurantTwoFeatures.push(data.restaurants[1].restaurant.highlights[i])
            }
          }

          function getRestaurantFeaturesThree (){
            let restaurantFeatures = data.restaurants[2].restaurant.highlights
            for (i=0;i<restaurantFeatures.length; i++) {
              restaurantThreeFeatures.push(data.restaurants[2].restaurant.highlights[i])
            }
          }

          getRestaurantFeaturesOne(restaurantOneFeatures)
          getRestaurantFeaturesTwo(restaurantTwoFeatures)
          getRestaurantFeaturesThree(restaurantThreeFeatures)

          function addRestaurantFeatureBullets (restaurantFeatures) {
            for(var i=0;i<restaurantFeatures.length;i++){
              restaurantFeatures[i]="<li style='text-align:left'>" + restaurantFeatures[i] + '</li>';;
            }
          }

          addRestaurantFeatureBullets(restaurantOneFeatures)
          addRestaurantFeatureBullets(restaurantTwoFeatures)
          addRestaurantFeatureBullets(restaurantThreeFeatures)

          $('#restaurantFeaturesOne').html('<ul type="circle">' + restaurantOneFeatures.join('') + '</ul>')
          $('#restaurantFeaturesTwo').html('<ul type="circle">' + restaurantTwoFeatures.join('') + '</ul>')
          $('#restaurantFeaturesThree').html('<ul type="circle">' + restaurantTwoFeatures.join('') + '</ul>')
          
          // $('#restaurantMenuOne').click(function(){
          //   window.location = data.restaurants[0].restaurant.menu_url.href + this.id)
          //   return false;
          // })
          // $('#restaurantMenuTwo').href(data.restaurants[1].restaurant.menu_url)
          // $('#restaurantMenuThree').href(data.restaurants[2].restaurant.menu_url)

          console.log(data.restaurants[0].restaurant.menu_url)
        }
     });
    })
  
    
    $("#chooseRestaurantOne").click(function() {
      event.preventDefault();
      $('#restaurant-select-container').fadeOut()
      $('#cook-cuisine-select-container').fadeOut()
      setTimeout(function(){
        $("#great-text").fadeIn()
      }, 500);  
      setTimeout(function(){
        $("#great-text").fadeOut()
      }, 3000);
      setTimeout(function(){
        $("#indoor-outdoor-container").fadeIn()
      }, 3500);
      })
    
      $("#chooseRestaurantTwo").click(function() {
        event.preventDefault();
        $('#restaurant-select-container').fadeOut()
        $('#cook-cuisine-select-container').fadeOut()
        setTimeout(function(){
          $("#great-text").fadeIn()
        }, 500);  
        setTimeout(function(){
          $("#great-text").fadeOut()
        }, 3000);
        setTimeout(function(){
          $("#indoor-outdoor-container").fadeIn()
        }, 3500);
        })
    
      $("#chooseRestaurantThree").click(function() {
        event.preventDefault();
        $('#restaurant-select-container').fadeOut()
        $('#cook-cuisine-select-container').fadeOut()
        setTimeout(function(){
          $("#great-text").fadeIn()
        }, 500);  
        setTimeout(function(){
          $("#great-text").fadeOut()
        }, 3000);
        setTimeout(function(){
          $("#indoor-outdoor-container").fadeIn()
        }, 3500);
        })
  
  
        
  $('#zip-code-container').fadeOut() 
  setTimeout(function(){
    $("#restaurant-select-container").fadeIn()
  }, 500);
  })



  


})


  
  