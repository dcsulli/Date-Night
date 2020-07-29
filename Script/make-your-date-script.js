$(document).ready(function() {
  var apiKey = '3c828106cc5841ed9e78d3fb6ff06687'
  var appID = '2db851a1'


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
  
    if(cookOrRestaurant[0].checked) {
      console.log("selected to cook")
      $('#cook-or-restaurant-container').fadeOut() 
      setTimeout(function(){
        $("#cook-cuisine-select-container").fadeIn()
      }, 500);
      } else { 
      console.log("selected to dine")
      $('#cook-or-restaurant-container').fadeOut() 
      setTimeout(function(){
        $("#zip-code-container").fadeIn()
      }, 500);
      setTimeout(function(){
        $("#select-restaurant-cuisine-container").fadeIn()
      }, 500)
    }
})

  


$("#continueToRecipes").click(function() {
  event.preventDefault();

  var selectedFoodTypeCook = document.getElementById('inputCookingCuisine').value
  var selectedFoodTypeCook = selectedFoodTypeCook.toLowerCase()
  console.log(selectedFoodTypeCook)

  $('#loading-text-one').fadeIn() 
  
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


      $('#recipeImgOne').attr({src: randomRecipeOne.image, class:'img-fluid'})
      $('#recipeImgTwo').attr({src: randomRecipeTwo.image, class:'img-fluid'})
      $('#recipeImgThree').attr({src: randomRecipeThree.image, class:'img-fluid'})

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

      $('#recipeURLOne').click(function(){
        window.open(randomRecipeOne.sourceUrl, target='_blank')
      })
      $('#recipeURLTwo').click(function(){
        window.open(randomRecipeTwo.sourceUrl, target='_blank')
      })
      $('#recipeURLThree').click(function(){
        window.open(randomRecipeThree.sourceUrl, target='_blank')
      })
        
    })

  

  $('#recipe-select-container').fadeOut() 
  setTimeout(function(){
    $('#loading-text-one').fadeOut() },2300);
  setTimeout(function(){
    $('#continueToRecipes').html('Search again')
    $("#recipe-select-container").fadeIn()
    $("#recipe-one-container").attr('style', 'display: flex')
    $("#recipe-two-container").attr('style', 'display: flex')
    $("#recipe-three-container").attr('style', 'display: flex')
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



  



$("#continueToRestaurants").click(function() {
  event.preventDefault();

  
  
  $('#zip-code-container').fadeOut()
  $('#select-restaurant-cuisine-container').fadeOut()
  setTimeout(function(){
    $('#loading-text-two').fadeIn() },500)
  

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
        url: `https://developers.zomato.com/api/v2.1/search?lat=${latitude}&lon=${longitude}&radius=1500&cuisines=${restaurantCuisineChoice}&sort=rating&order=asc`,
        type: 'GET',
        success : function (data) {
          console.log(data)
          $('#restaurantLabelOne').html(data.restaurants[0].restaurant.name);
          $('#restaurantLabelTwo').html(data.restaurants[1].restaurant.name);
          $('#restaurantLabelThree').html(data.restaurants[2].restaurant.name);

          $('#restaurantAddressOne').html(data.restaurants[0].restaurant.location.address);
          $('#restaurantAddressTwo').html(data.restaurants[1].restaurant.location.address);
          $('#restaurantAddressThree').html(data.restaurants[2].restaurant.location.address);

          // $('#restaurantHoursOne').html('Hours: ' + data.restaurants[0].restaurant.timings);
          // $('#restaurantHoursTwo').html('Hours: ' + data.restaurants[1].restaurant.timings);
          // $('#restaurantHoursThree').html('Hours: ' + data.restaurants[2].restaurant.timings);

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
          
          $('#restaurantMenuOne').click(function(){
            window.open(data.restaurants[0].restaurant.menu_url, target='_blank')
          })
          $('#restaurantMenuTwo').click(function(){
            window.open(data.restaurants[1].restaurant.menu_url, target='_blank')
          })
          $('#restaurantMenuThree').click(function(){
            window.open(data.restaurants[2].restaurant.menu_url, target='_blank')
          })

          console.log(data.restaurants[0].restaurant.menu_url)
        }
     });
    })

    
      setTimeout(function(){
    $('#loading-text-two').fadeOut() },2000);
      setTimeout(function(){
    $('#select-restaurant-cuisine-container').fadeIn()
    $("#restaurant-select-container").fadeIn()
    }, 2500);

    $('#restaurant-select-container').fadeOut() 
  setTimeout(function(){
    $('#loading-text-two').fadeOut() },2000);
  setTimeout(function(){
    $('#whatKindRestaurantLabel').html('Try a different cuisine?')
    $('#continueToRestaurants').html('Search again')
    $("#restaurant-select-container").fadeIn()
    $("#restaurant-one-container").attr('style', 'display: flex')
    $("#restaurant-two-container").attr('style', 'display: flex')
    $("#restaurant-three-container").attr('style', 'display: flex')
  }, 2500);
  
    
    $("#chooseRestaurantOne").click(function() {
      event.preventDefault();
      $('#restaurant-select-container').fadeOut()
      $('#select-restaurant-cuisine-container').fadeOut()
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
        $('#select-restaurant-cuisine-container').fadeOut()
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
        $('#select-restaurant-cuisine-container').fadeOut()
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
  })

  // function getRandomInt(min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min)) + min;
  // }

  function shuffle(array) {
    var i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

  

  $("#continueToActivities").click(function() {
    event.preventDefault();
    console.log('button clicked')

    var indoorActivities = [
      {activity: 'See a movie!',
       image: 'images/activities/movies.jpg',
       text: "The dinner and a movie combo is timeless for a reason. Whether you're seeing a romantic comedy or a superhero flick, you can't go wrong with a movie date.",
       url: 'https://www.fandango.com/'
      },
      {activity: 'Hit the Barcade!',
       image: 'images/activities/arcade.jpeg',
       text: "Arcades have returned in the form of the Barcade! Have a few drinks and take the opportunity to show off your Hadoken.  Your date will love it.",
       url: 'https://www.google.com/search?q=find+a+barcade&oq=find+a+barcade&sourceid=chrome&ie=UTF-8'
      },
      {activity: 'Go on a hike!',
       image: 'images/activities/hiking.jpg',
       text: "Nothing promotes couple's bonding like the call of nature. Take a drive to your closest nature trail and spend some time in the great outdoors with that special someone.",
       url: 'https://www.google.com/search?q=nature+trails+near+me&oq=nature+trails+near+me&aqs=chrome..69i57.4164j0j9&sourceid=chrome&ie=UTF-8'
      },
    ]
  
    var outdoorActivities = [
      {activity: 'See a movie!',
       image: 'images/activities/movies.jpg',
       text: "The dinner and a movie combo is timeless for a reason. Whether you're seeing a romantic comedy or a superhero flick, you can't go wrong with a movie date.",
       url: 'https://www.fandango.com/'
      },
      {activity: 'Hit the Barcade!',
       image: 'images/activities/arcade.jpeg',
       text: "Arcades have returned in the form of the Barcade! Have a few drinks and take the opportunity to show off your Hadoken.  Your date will love it.",
       url: 'https://www.google.com/search?q=find+a+barcade&oq=find+a+barcade&sourceid=chrome&ie=UTF-8'
      },
      {activity: 'Go on a hike!',
       image: 'images/activities/hiking.jpg',
       text: "Nothing promotes couple's bonding like the call of nature. Take a drive to your closest nature trail and spend some time in the great outdoors with that special someone.",
       url: 'https://www.google.com/search?q=nature+trails+near+me&oq=nature+trails+near+me&aqs=chrome..69i57.4164j0j9&sourceid=chrome&ie=UTF-8'
      },
    ]
  
    var shuffledIndoorActivities = shuffle (indoorActivities)
    var shuffledOutdoorActivities = shuffle (outdoorActivities)

    var indoorOrOutdoor = document.getElementsByName("indoorOrOutdoor")

    
    
    if(indoorOrOutdoor[0].checked) {
      console.log("selected indoor activity")
        
      console.log([shuffledIndoorActivities[0],shuffledIndoorActivities[1],shuffledIndoorActivities[2]])

      $("#indoorActivityLabelOne").html(shuffledIndoorActivities[0].activity);
      $("#indoorActivityTextOne").html(shuffledIndoorActivities[0].text);
      $('#indoorActivityImgOne').attr({src: shuffledIndoorActivities[0].image, class:'img-fluid'});
      $("#indoorActivityInfoOne").click(function() {window.open(shuffledIndoorActivities[0].url, target='_blank')})

      $("#indoorActivityLabelTwo").html(shuffledIndoorActivities[1].activity);
      $("#indoorActivityTextTwo").html(shuffledIndoorActivities[1].text);
      $('#indoorActivityImgTwo').attr({src: shuffledIndoorActivities[1].image, class:'img-fluid'});
      $("#indoorActivityInfoTwo").click(function() {window.open(shuffledIndoorActivities[2].url, target='_blank')})

      $("#indoorActivityLabelThree").html(shuffledIndoorActivities[2].activity);
      $("#indoorActivityTextThree").html(shuffledIndoorActivities[2].text);
      $('#indoorActivityImgThree').attr({src: shuffledIndoorActivities[2].image, class:'img-fluid'});
      $("#indoorActivityInfoThree").click(function() {window.open(shuffledIndoorActivities[2].url, target='_blank')})

      $('#indoor-outdoor-container').fadeOut() 
      setTimeout(function(){
        $("#indoor-activity-select-container").fadeIn()
      }, 500);
      setTimeout(function(){
        $("#indoor-activity-header").fadeIn()
      }, 500);
        
      $("#showMoreIndoorActivities").click(function() {

        $('#indoor-activity-select-container').fadeOut() 

        setTimeout(function(){
          var shuffledIndoorActivities = shuffle (indoorActivities)
          console.log([shuffledIndoorActivities[0],shuffledIndoorActivities[1],shuffledIndoorActivities[2]])
        }, 500);

        $("#indoorActivityLabelOne").html(shuffledIndoorActivities[0].activity);
        $("#indoorActivityTextOne").html(shuffledIndoorActivities[0].text);
        $('#indoorActivityImgOne').attr({src: shuffledIndoorActivities[0].image, class:'img-fluid'});
        $("#indoorActivityInfoOne").click(function() {window.open(shuffledIndoorActivities[0].url, target='_blank')})

        $("#indoorActivityLabelTwo").html(shuffledIndoorActivities[1].activity);
        $("#indoorActivityTextTwo").html(shuffledIndoorActivities[1].text);
        $('#indoorActivityImgTwo').attr({src: shuffledIndoorActivities[1].image, class:'img-fluid'});
        $("#indoorActivityInfoTwo").click(function() {window.open(shuffledIndoorActivities[2].url, target='_blank')})

        $("#indoorActivityLabelThree").html(shuffledIndoorActivities[2].activity);
        $("#indoorActivityTextThree").html(shuffledIndoorActivities[2].text);
        $('#indoorActivityImgThree').attr({src: shuffledIndoorActivities[2].image, class:'img-fluid'});
        $("#indoorActivityInfoThree").click(function() {window.open(shuffledIndoorActivities[2].url, target='_blank')})

        
        setTimeout(function(){
          $("#indoor-activity-select-container").fadeIn()
        }, 1000);
      })

      $("#chooseIndoorActivityOne").click(function() {
        event.preventDefault();
        console.log('option 1 selected')
        $('#indoor-activity-select-container').fadeOut() 
          setTimeout(function(){
            $("#final-results-container").fadeIn()
          }, 500);
        })
      
      $("#chooseIndoorActivityTwo").click(function() {
        event.preventDefault();
        console.log('option 2 selected')
        $('#indoor-activity-select-container').fadeOut() 
          setTimeout(function(){
            $("#final-results-container").fadeIn()
          }, 500);
        })

      $("#chooseIndoorActivityThree").click(function() {
        event.preventDefault();
        console.log('option 3 selected')
        $('#indoor-activity-select-container').fadeOut() 
          setTimeout(function(){
            $("#final-results-container").fadeIn()
          }, 500);
        })
    } else { 

      console.log([shuffledOutdoorActivities[0],shuffledOutdoorActivities[1],shuffledOutdoorActivities[2]])

      $("#outdoorActivityLabelOne").html(shuffledOutdoorActivities[0].activity);
      $("#outdoorActivityTextOne").html(shuffledOutdoorActivities[0].text);
      $('#outdoorActivityImgOne').attr({src: shuffledOutdoorActivities[0].image, class:'img-fluid'});
      $("#outdoorActivityInfoOne").click(function() {window.open(shuffledOutdoorActivities[0].url, target='_blank')})

      $("#outdoorActivityLabelTwo").html(shuffledOutdoorActivities[1].activity);
      $("#outdoorActivityTextTwo").html(shuffledOutdoorActivities[1].text);
      $('#outdoorActivityImgTwo').attr({src: shuffledOutdoorActivities[1].image, class:'img-fluid'});
      $("#outdoorActivityInfoTwo").click(function() {window.open(shuffledOutdoorActivities[2].url, target='_blank')})

      $("#outdoorActivityLabelThree").html(shuffledOutdoorActivities[2].activity);
      $("#outdoorActivityTextThree").html(shuffledOutdoorActivities[2].text);
      $('#outdoorActivityImgThree').attr({src: shuffledOutdoorActivities[2].image, class:'img-fluid'});
      $("#outdoorActivityInfoThree").click(function() {window.open(shuffledOutdoorActivities[2].url, target='_blank')})

      console.log("selected outdoor activity")
      $('#indoor-outdoor-container').fadeOut() 
      setTimeout(function(){
        $("#outdoor-activity-select-container").fadeIn()
      }, 500);
      setTimeout(function(){
        $("#outdoor-activity-header").fadeIn()
      }, 500);
        
      $("#showMoreOutdoorActivities").click(function() { 

        $('#outdoor-activity-select-container').fadeOut() 

        setTimeout(function(){
          var shuffledOutdoorActivities = shuffle (outdoorActivities)
          console.log([shuffledOutdoorActivities[0],shuffledOutdoorActivities[1],shuffledOutdoorActivities[2]])
        }, 500);

          $("#outdoorActivityLabelOne").html(shuffledOutdoorActivities[0].activity);
          $("#outdoorActivityTextOne").html(shuffledOutdoorActivities[0].text);
          $('#outdoorActivityImgOne').attr({src: shuffledOutdoorActivities[0].image, class:'img-fluid'});
          $("#outdoorActivityInfoOne").click(function() {window.open(shuffledOutdoorActivities[0].url, target='_blank')})

          $("#outdoorActivityLabelTwo").html(shuffledOutdoorActivities[1].activity);
          $("#outdoorActivityTextTwo").html(shuffledOutdoorActivities[1].text);
          $('#outdoorActivityImgTwo').attr({src: shuffledOutdoorActivities[1].image, class:'img-fluid'});
          $("#outdoorActivityInfoTwo").click(function() {window.open(shuffledOutdoorActivities[2].url, target='_blank')})

          $("#outdoorActivityLabelThree").html(shuffledOutdoorActivities[2].activity);
          $("#outdoorActivityTextThree").html(shuffledOutdoorActivities[2].text);
          $('#outdoorActivityImgThree').attr({src: shuffledOutdoorActivities[2].image, class:'img-fluid'});
          $("#outdoorActivityInfoThree").click(function() {window.open(shuffledOutdoorActivities[2].url, target='_blank')})

          setTimeout(function(){
          $("#outdoor-activity-select-container").fadeIn()
        }, 1000);
      })

      $("#chooseOutdoorActivityOne").click(function() {
        event.preventDefault();
        console.log('option 1 selected')
        $('#outdoor-activity-select-container').fadeOut() 
          setTimeout(function(){
            $("#final-results-container").fadeIn()
          }, 500);
        })
      
      $("#chooseOutdoorActivityTwo").click(function() {
        event.preventDefault();
        console.log('option 2 selected')
        $('#outdoor-activity-select-container').fadeOut() 
          setTimeout(function(){
            $("#final-results-container").fadeIn()
          }, 500);
        })

      $("#chooseOutdoorActivityThree").click(function() {
        event.preventDefault();
        console.log('option 3 selected')
        $('#outdoor-activity-select-container').fadeOut() 
          setTimeout(function(){
            $("#final-results-container").fadeIn()
          }, 500);
        })

      }
    
  })
})


  
  