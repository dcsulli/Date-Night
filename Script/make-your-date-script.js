function hideStuff (){
  $("#outdoor-activity-header").fadeOut();
  $("#indoor-activity-header").fadeOut();
  setTimeout (function (){
  $("#awesome-text").fadeIn();
  $('#outdoor-activity-select-container').fadeOut().removeClass('container col-md-4').addClass('col-md-6');
  $('#indoor-activity-select-container').fadeOut().removeClass('container col-md-4').addClass('col-md-6');
  $('#restaurant-select-container').fadeOut().removeClass('container col-md-4').addClass('col-md-6');
  $('#recipe-select-container').fadeOut().removeClass('container col-md-4').addClass('col-md-6');
  $('#choose-your-recipe-header').removeClass('d-block').addClass('d-none');
  $('#select-a-restaurant-header').removeClass('d-block').addClass('d-none');
  $('#spoonacular-credit').removeClass('d-block').addClass('d-none');
  $('#zomato-credit').removeClass('d-block').addClass('d-none');
  $('#chosenRestaurantTextOne').removeClass('d-none');
  $('#chosenRestaurantTextTwo').removeClass('d-none');
  $('#chosenRestaurantTextThree').removeClass('d-none');
  $('#chosenRecipeTextOne').removeClass('d-none');
  $('#chosenRecipeTextTwo').removeClass('d-none');
  $('#chosenRecipeTextThree').removeClass('d-none');
  $('#chosenIndoorActivityTextOne').removeClass('d-none');
  $('#chosenIndoorActivityTextTwo').removeClass('d-none');
  $('#chosenIndoorActivityTextThree').removeClass('d-none');
  $('#chosenOutdoorActivityTextOne').removeClass('d-none');
  $('#chosenOutdoorActivityTextTwo').removeClass('d-none');
  $('#chosenOutdoorActivityTextThree').removeClass('d-none');
}, 1000);
};

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

if (document.getElementById('inputCookingCuisine').value == 'Choose...') {
  $("#make-a-selection").fadeIn()
  setTimeout(function(){
  $('#make-a-selection').fadeOut() },1500);
  } else {
 

  var selectedFoodTypeCook = document.getElementById('inputCookingCuisine').value
  // var selectedFoodTypeCook = selectedFoodTypeCook.toLowerCase()
  console.log(selectedFoodTypeCook)

  setTimeout(function(){
  $('#loading-text-one').fadeIn() },500)
  
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

  

  $('#cook-cuisine-select-container').fadeOut() 
  setTimeout(function(){
    $('#loading-text-one').fadeOut() },2300);
  setTimeout(function(){
    $('#cook-cuisine-select-container').fadeIn() 
    $('#continueToRecipes').html('Search again')
    $("#recipe-select-container").fadeIn()
    $("#recipe-one-container").addClass('d-flex')
    $("#recipe-two-container").addClass('d-flex')
    $("#recipe-three-container").addClass('d-flex')
  }, 2500);
}

})

  $("#chooseRecipeOne").click(function() {
    event.preventDefault();
    $('#cook-cuisine-select-container').fadeOut()
    $('#choose-your-recipe-header').fadeOut()
    setTimeout(function(){
      $('#recipe-select-container').fadeOut()
    }, 500);
    setTimeout(function(){
      $("#great-text").fadeIn()
    }, 1000);
    
    $('#recipe-two-container').removeClass('d-flex').addClass('d-none')
    $('#recipe-three-container').removeClass('d-flex').addClass('d-none')
    $('#recipe-one-container').removeClass('col-md-4')

    setTimeout(function(){
      $("#great-text").fadeOut()
      $("#chooseRecipeOne").fadeOut()
    }, 3000);
    setTimeout(function(){
      $("#indoor-outdoor-container").fadeIn()
    }, 3500);
    })


  $("#chooseRecipeTwo").click(function() {
    event.preventDefault();
    $('#cook-cuisine-select-container').fadeOut()
    $('#choose-your-recipe-header').fadeOut()
    setTimeout(function(){
      $('#recipe-select-container').fadeOut()
    }, 500);
    setTimeout(function(){
      $("#great-text").fadeIn()
    }, 1000);
    
    $('#recipe-one-container').removeClass('d-flex').addClass('d-none')
    $('#recipe-three-container').removeClass('d-flex').addClass('d-none')
    $('#recipe-two-container').removeClass('col-md-4')

    setTimeout(function(){
      $("#great-text").fadeOut()
      $("#chooseRecipeTwo").fadeOut()
    }, 3000);
    setTimeout(function(){
      $("#indoor-outdoor-container").fadeIn()
    }, 3500);
    })


  $("#chooseRecipeThree").click(function() {
    event.preventDefault();
    $('#cook-cuisine-select-container').fadeOut()
    $('#choose-your-recipe-header').fadeOut()
    setTimeout(function(){
      $('#recipe-select-container').fadeOut()
    }, 500);
    setTimeout(function(){
      $("#great-text").fadeIn()
    }, 1000);

    $('#recipe-two-container').removeClass('d-flex').addClass('d-none')
    $('#recipe-one-container').removeClass('d-flex').addClass('d-none')
    $('#recipe-three-container').removeClass('col-md-4')

    setTimeout(function(){
      $("#great-text").fadeOut()
      $("#chooseRecipeThree").fadeOut()
    }, 3000);
    setTimeout(function(){
      $("#indoor-outdoor-container").fadeIn()
    }, 3500);
    })


$("#continueToRestaurants").click(function() {
  event.preventDefault();
  

  var zipCode = document.getElementById('zipCodeForm').value;
  var selectedCuisineRestaurant = document.getElementById('inputRestaurantCuisine').value
 

  $.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zipCode}&facet=state&facet=timezone&facet=dst`).done
    (function (data) {
      var latitude = data.records[0].fields.latitude;

      var longitude = data.records[0].fields.longitude;

      console.log(document.getElementById('inputRestaurantCuisine').value)


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

      if (zipCode == undefined || zipCode.length<5) {
        $("#enter-your-zip").fadeIn()
        setTimeout(function(){
        $('#enter-your-zip').fadeOut() },1500);
      } else if (selectedCuisineRestaurant == 'Choose...') {
          $("#make-a-selection").fadeIn()
          setTimeout(function(){
          $('#make-a-selection').fadeOut() },1500);
          } else {
            $('#zip-code-container').fadeOut()
            $('#select-restaurant-cuisine-container').fadeOut()
            setTimeout(function(){
            $('#loading-text-two').fadeIn() },500)

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
    
     $('#restaurant-select-container').fadeOut() 

    setTimeout(function(){
      $('#loading-text-two').fadeOut() },2000);
    setTimeout(function(){
      $('#select-restaurant-cuisine-container').fadeIn()
      $("#restaurant-select-container").fadeIn()
      }, 2500);

    setTimeout(function(){
      $('#loading-text-two').fadeOut() },2000);
    setTimeout(function(){
      $('#whatKindRestaurantLabel').html('Try a different cuisine?')
      $('#continueToRestaurants').html('Search again')
      $("#restaurant-select-container").fadeIn()
      $("#restaurant-one-container").addClass('d-flex')
      $("#restaurant-two-container").addClass('d-flex')
      $("#restaurant-three-container").addClass('d-flex')
    }, 2500);
  
    
    $("#chooseRestaurantOne").click(function() {
      event.preventDefault();
      $('#select-restaurant-cuisine-container').fadeOut()
      setTimeout(function(){
        $('#restaurant-select-container').fadeOut()
      }, 500);
      setTimeout(function(){
        $("#great-text").fadeIn()
      }, 1000);

      $('#restaurant-two-container').removeClass('d-flex').addClass('d-none')
      $('#restaurant-three-container').removeClass('d-flex').addClass('d-none')
      $("#restaurant-one-container").removeClass('col-md-4')

      setTimeout(function(){
        $("#great-text").fadeOut()
        $("#chooseRestaurantOne").fadeOut()
      }, 3000);
      setTimeout(function(){
        $("#indoor-outdoor-container").fadeIn()
      }, 3500);
      })

    
      $("#chooseRestaurantTwo").click(function() {
        event.preventDefault();
        $('#select-restaurant-cuisine-container').fadeOut()
        setTimeout(function(){
          $('#restaurant-select-container').fadeOut()
        }, 500);
        setTimeout(function(){
          $("#great-text").fadeIn()
        }, 1000);
        
        $('#restaurant-one-container').removeClass('d-flex').addClass('d-none')
        $('#restaurant-three-container').removeClass('d-flex').addClass('d-none')
        $("#restaurant-two-container").removeClass('col-md-4') 
        
        setTimeout(function(){
          $("#great-text").fadeOut()
          $("#chooseRestaurantTwo").fadeOut()
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
          $('#restaurant-select-container').fadeOut()
        }, 500);
        setTimeout(function(){
          $("#great-text").fadeIn()
        }, 1000);
        
        $('#restaurant-two-container').removeClass('d-flex').addClass('d-none')
        $('#restaurant-one-container').removeClass('d-flex').addClass('d-none')
        $("#restaurant-three-container").removeClass('col-md-4')

        setTimeout(function(){
          $("#great-text").fadeOut()
          $("#chooseRestaurantThree").fadeOut()
        }, 3000);
        setTimeout(function(){
          $("#indoor-outdoor-container").fadeIn()
        }, 3500);
        })
      }
    })
  })
  

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

  // Activity Selector

  $("#continueToActivities").click(function() {
    event.preventDefault();
    console.log('button clicked')

    var indoorActivities = [
      {activity: 'Movie night!',
       image: 'images/activities/movie-night.jpg',
       text: "Take Netflix and Chill to a new level and class up the affair. Pop the special popcorn, get really cozy, and put on your favorite flick. Scary movies can always be a fun choice!😱",
       url: 'https://www.digitaltrends.com/movies/best-movies-on-netflix/'
      },
      {activity: 'Play video games!',
       image: 'images/activities/video-game.jpeg',
       text: "There are tons of great co-op and multiplayer games for your couple's night in. You could have a virtual date in Animal Crossing. You could pwn n00bs together in Call of Duty. Get creative!",
       url: 'https://mashable.com/article/the-11-best-video-games-to-play-with-your-significant-other/'
      },
      {activity: 'Ask each other questions!',
       image: 'images/activities/questions.jpg',
       text: 'Get to know your partner better by asking them questions. There are tons of "questions for couples" lists out there, and they can be tons of fun!',
       url: 'https://dating.lovetoknow.com/Fun_Relationship_Questions'
      },
      {activity: 'Learn a dance!',
       image: 'images/activities/couple-dance.jpg',
       text: "Take to Youtube and learn a dance together. You'll have lots of fun and be able to cut a rug at the next wedding you attend together. Go for a classic tango or finally learn to floss.",
       url: 'https://www.youtube.com/results?search_query=couple+dance+tutorial'
      },
      {activity: 'Do a puzzle!',
       image: 'images/activities/puzzle.jpg',
       text: 'Test your relationsship by working on a puzzle togther. Put on some chill tunes in the background to set the mood for your puzzle adventures.',
       url: 'https://www.amazon.com/Best-Sellers-Toys-Games-Puzzles/zgbs/toys-and-games/166359011'
      },
      {activity: 'Make cocktails!',
       image: 'images/activities/cocktail.jpg',
       text: "Show off your bartending skills and make some drinks together. Be sure to gather some ingredients before so you can really class up the joint. We're talking martinis. ",
       url: 'https://www.acouplecooks.com/best-cocktail-recipes-to-make-at-home/'
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
       url: 'https://www.google.com/search?q=find+a+barcade&oq=find+a+barcade'
      },
      {activity: 'Go on a hike!',
       image: 'images/activities/hiking.jpg',
       text: "Nothing promotes couple's bonding like the call of nature. Take a drive to your closest nature trail and spend some time in the great outdoors with that special someone.",
       url: 'https://www.google.com/search?q=nature+trails+near+me'
      },
      {activity: 'Go horseback riding!',
       image: 'images/activities/horse-back.jpg',
       text: "Take a cue from the Bachelor and saddle up for a romantic date upon a wonderous steed. Bonus point if you're riding on the beach at sunset. If you don't want to ride a horse, carraige rides are a great alternative.",
       url: 'https://www.google.com/search?q=horse+riding+date&oq=horse+riding+date'
      },
      {activity: 'Hit the mall!',
       image: 'images/activities/questions.jpg',
       text: 'Find your closest non-abandoned mall and do it like they did in the 80s. Try on some funky clothes, get a soft pretzel, and delight in the unbridled consumerism. Bonus point if you can have a fitting room montage.',
       url: 'https://www.google.com/search?q=malls+near+me&oq=malls+near+me'
      },
      {activity: 'Go to a museum!',
       image: 'images/activities/museum.jpg',
       text: "There's no better way to convince your partner that you're a true intellectual than visitng your local museum. Look up the exhibits before hand so you can have some fascinating tid-bits in your back pocket.",
       url: 'https://www.google.com/search?q=museum+near+me&oq=museum+near+me'
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
      $("#indoor-activity-one-container").addClass('d-flex')
      $("#indoor-activity-two-container").addClass('d-flex')
      $("#indoor-activity-three-container").addClass('d-flex') 
      setTimeout(function(){
        $("#indoor-activity-select-container").fadeIn()
      }, 1000);
      setTimeout(function(){
        $("#indoor-activity-header").fadeIn()
      }, 1000);
        
      $("#showMoreIndoorActivities").click(function() {

        $('#indoor-activity-select-container').fadeOut() 

        setTimeout(function(){
          var shuffledIndoorActivities = shuffle (indoorActivities)
          console.log([shuffledIndoorActivities[0],shuffledIndoorActivities[1],shuffledIndoorActivities[2]])
        }, 1000);

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

      // Result Page Activity


      $("#chooseIndoorActivityOne").click(function() {
        event.preventDefault();
        console.log('option 1 selected')
        
        setTimeout(function(){
          hideStuff ();
          $('#chooseIndoorActivityOne').addClass('d-none')
          $('#indoor-activity-two-container').removeClass('d-flex').addClass('d-none')
          $('#indoor-activity-three-container').removeClass('d-flex').addClass('d-none')
          $('#indoor-activity-one-container').removeClass('col-md-4')
          $('#results-row').append($('#indoor-activity-select-container'))   
          }, 1000);
        setTimeout(function(){
          $("#awesome-text").fadeOut()
        }, 4000);
  
        
        setTimeout(function(){
          $("#here-are-your-plans").fadeIn()

          var cookOrRestaurant = document.getElementsByName("cookOrRestaurant")

          console.log(cookOrRestaurant[0].checked);

          if(cookOrRestaurant[0].checked) {
            $('#results-row').append($('#recipe-select-container'))
            $("#recipe-select-container").removeClass('d-none').fadeIn()
            } else {
            $('#results-row').append($('#restaurant-select-container')) 
            $("#restaurant-select-container").removeClass('d-none').fadeIn()
          }
          $("#indoor-activity-select-container").removeClass('d-none').fadeIn()
          $("#results-container").removeClass('d-none').attr({style: 'display:block'}).fadeIn()

        }, 5000)
         
      })

      $("#chooseIndoorActivityTwo").click(function() {
        event.preventDefault();
        console.log('option 2 selected')
        
        setTimeout(function(){
          hideStuff ();
          $('#chooseIndoorActivityTwo').addClass('d-none')
          $('#indoor-activity-one-container').removeClass('d-flex').addClass('d-none')
          $('#indoor-activity-three-container').removeClass('d-flex').addClass('d-none')
          $('#indoor-activity-two-container').removeClass('col-md-4')
          $('#results-row').append($('#indoor-activity-select-container'))   
          }, 1000);
        setTimeout(function(){
          $("#awesome-text").fadeOut()
        }, 4000);
  
        
        setTimeout(function(){
          $("#here-are-your-plans").fadeIn()

          var cookOrRestaurant = document.getElementsByName("cookOrRestaurant")

          console.log(cookOrRestaurant[0].checked);

          if(cookOrRestaurant[0].checked) {
            $('#results-row').append($('#recipe-select-container'))
            $("#recipe-select-container").removeClass('d-none').fadeIn()
            } else {
            $('#results-row').append($('#restaurant-select-container')) 
            $("#restaurant-select-container").removeClass('d-none').fadeIn()
          }
          $("#indoor-activity-select-container").removeClass('d-none').fadeIn()
          $("#results-container").removeClass('d-none').attr({style: 'display:block'}).fadeIn()

        }, 5000)
         
      })

      $("#chooseIndoorActivityThree").click(function() {
        event.preventDefault();
        console.log('option 3 selected')
        
        setTimeout(function(){
          hideStuff ();
          $('#chooseIndoorActivityThree').addClass('d-none')
          $('#indoor-activity-one-container').removeClass('d-flex').addClass('d-none')
          $('#indoor-activity-two-container').removeClass('d-flex').addClass('d-none')
          $('#indoor-activity-three-container').removeClass('col-md-4')
          $('#results-row').append($('#indoor-activity-select-container'))   
          }, 1000);
        setTimeout(function(){
          $("#awesome-text").fadeOut()
        }, 4000);
  
        
        setTimeout(function(){
          $("#here-are-your-plans").fadeIn()

          var cookOrRestaurant = document.getElementsByName("cookOrRestaurant")

          console.log(cookOrRestaurant[0].checked);

          if(cookOrRestaurant[0].checked) {
            $('#results-row').append($('#recipe-select-container'))
            $("#recipe-select-container").removeClass('d-none').fadeIn()
            } else {
            $('#results-row').append($('#restaurant-select-container')) 
            $("#restaurant-select-container").removeClass('d-none').fadeIn()
          }
          $("#indoor-activity-select-container").removeClass('d-none').fadeIn()
          $("#results-container").removeClass('d-none').attr({style: 'display:block'}).fadeIn()

        }, 5000)
         
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
      $("#outdoor-activity-one-container").addClass('d-flex')
      $("#outdoor-activity-two-container").addClass('d-flex')
      $("#outdoor-activity-three-container").addClass('d-flex')
      setTimeout(function(){
        $("#outdoor-activity-select-container").fadeIn()
      }, 1000);
      setTimeout(function(){
        $("#outdoor-activity-header").fadeIn()
      }, 1000);
        
      $("#showMoreOutdoorActivities").click(function() { 

        $('#outdoor-activity-select-container').fadeOut() 

        setTimeout(function(){
          var shuffledOutdoorActivities = shuffle (outdoorActivities)
          console.log([shuffledOutdoorActivities[0],shuffledOutdoorActivities[1],shuffledOutdoorActivities[2]])
        }, 1000);

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
        
        setTimeout(function(){
          hideStuff ();
          $('#chooseOutdoorActivityOne').addClass('d-none')
          $('#outdoor-activity-two-container').removeClass('d-flex').addClass('d-none')
          $('#outdoor-activity-three-container').removeClass('d-flex').addClass('d-none')
          $('#outdoor-activity-one-container').removeClass('col-md-4')
          $('#results-row').append($('#outdoor-activity-select-container'))   
          }, 1000);
        setTimeout(function(){
          $("#awesome-text").fadeOut()
        }, 4000);
  
        
        setTimeout(function(){
          $("#here-are-your-plans").fadeIn()

          var cookOrRestaurant = document.getElementsByName("cookOrRestaurant")

          console.log(cookOrRestaurant[0].checked);

          if(cookOrRestaurant[0].checked) {
            $('#results-row').append($('#recipe-select-container'))
            $("#recipe-select-container").removeClass('d-none').fadeIn()
            } else {
            $('#results-row').append($('#restaurant-select-container')) 
            $("#restaurant-select-container").removeClass('d-none').fadeIn()
          }
          $("#outdoor-activity-select-container").removeClass('d-none').fadeIn()
          $("#results-container").removeClass('d-none').attr({style: 'display:block'}).fadeIn()

        }, 5000)
         
      })

      $("#chooseOutdoorActivityTwo").click(function() {
        event.preventDefault();
        console.log('option 2 selected')
        
        setTimeout(function(){
          hideStuff ();
          $('#chooseOutdoorActivityTwo').addClass('d-none')
          $('#outdoor-activity-one-container').removeClass('d-flex').addClass('d-none')
          $('#outdoor-activity-three-container').removeClass('d-flex').addClass('d-none')
          $('#outdoor-activity-two-container').removeClass('col-md-4')
          $('#results-row').append($('#outdoor-activity-select-container'))   
          }, 1000);
        setTimeout(function(){
          $("#awesome-text").fadeOut()
        }, 4000);
  
        
        setTimeout(function(){
          $("#here-are-your-plans").fadeIn()

          var cookOrRestaurant = document.getElementsByName("cookOrRestaurant")

          console.log(cookOrRestaurant[0].checked);

          if(cookOrRestaurant[0].checked) {
            $('#results-row').append($('#recipe-select-container'))
            $("#recipe-select-container").removeClass('d-none').fadeIn()
            } else {
            $('#results-row').append($('#restaurant-select-container')) 
            $("#restaurant-select-container").removeClass('d-none').fadeIn()
          }
          $("#outdoor-activity-select-container").removeClass('d-none').fadeIn()
          $("#results-container").removeClass('d-none').attr({style: 'display:block'}).fadeIn()

        }, 5000)
         
      })

      $("#chooseOutdoorActivityThree").click(function() {
        event.preventDefault();
        console.log('option 3 selected')
        
        setTimeout(function(){
          hideStuff ();
          $('#chooseOutdoorActivityThree').addClass('d-none')
          $('#outdoor-activity-one-container').removeClass('d-flex').addClass('d-none')
          $('#outdoor-activity-two-container').removeClass('d-flex').addClass('d-none')
          $('#outdoor-activity-three-container').removeClass('col-md-4')
          $('#results-row').append($('#outdoor-activity-select-container'))   
          }, 1000);
        setTimeout(function(){
          $("#awesome-text").fadeOut()
        }, 4000);
  
        
        setTimeout(function(){
          $("#here-are-your-plans").fadeIn()

          var cookOrRestaurant = document.getElementsByName("cookOrRestaurant")

          console.log(cookOrRestaurant[0].checked);

          if(cookOrRestaurant[0].checked) {
            $('#results-row').prepend($('#recipe-select-container'))
            $("#recipe-select-container").removeClass('d-none').fadeIn()
            } else {
            $('#results-row').append($('#restaurant-select-container')) 
          }
        }, 5000)

        setTimeout(function(){
          $("#restaurant-select-container").removeClass('d-none').fadeIn()
          $("#outdoor-activity-select-container").removeClass('d-none').fadeIn()
          $("#results-container").removeClass('d-none').attr({style: 'display:block'}).fadeIn()
        }, 6000)
         
      })

      

      }
    })
  })




  
  