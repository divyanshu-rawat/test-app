

// Build a simple Yelp-like system: Given a set of restaurant and metadata (coordinates, ratings, opening hours), 
// design and implement the following functionalities without using a database.

// 1. Find restaurants within specified radius, given a coordinate
// 2. Improve the above function by only returning restaurants that are open given desired dining hour
// 3. Improve the above function by sorting the results by average ratings



function Yelp(restaurants, ratings) {
  // this.restaurants = restaurants;
  this.ratings = ratings;

  this.modified_object = restaurants;

  for(key in this.modified_object)
  {
      this.modified_object[key].rating = (this.ratings[key].rating);
  }

}

/*
Returns list of Restaurant within radius.

  latitude: latitude in number
  longitude: longitude in number
  radius: kilometer in number
  diningHour: If null, find any restaurant in radius.
              Otherwise return array of open restaurants at specified hour.
  sortByRating: If true, sort result in descending order,
                highest rated first.
*/
Yelp.prototype.find = function(lat, long, rad, dinHour) {


  var object =  this.modified_object;
 
  // function_object.restaurants_within_specified_radius(lat,long,rad,dinHour);
  var function_object = {

        restaurants_within_specified_radius:function (lat,long,rad,dinHour) {

           var list_of_Restaurant = [];
             for (key in object)
              {
                  var distance = (lat - object[key].latitude)*(lat - object[key].latitude) + (long - object[key].longitude)*(long - object[key].longitude);

                  if((distance == rad*rad || distance < rad*rad))
                    list_of_Restaurant.push(object[key]);
              }
          
            return (dinHour) ? function_object.opened_restaurants_within_specified_radius(list_of_Restaurant,dinHour) : list_of_Restaurant;
        },

        opened_restaurants_within_specified_radius:function (list_of_Restaurant,dinHour) {

          var opened_restaurants = [];
            // console.log(list_of_Restaurant);

          for (key in list_of_Restaurant)
          {
             if( (list_of_Restaurant[key].openHour <= dinHour ) && (dinHour <= list_of_Restaurant[key].closeHour) )
             {
                opened_restaurants.push(list_of_Restaurant[key]);
             }
          }

          

          return function_object.sorting_results_by_average_ratings(opened_restaurants);


 
        },

        sorting_results_by_average_ratings:function (opened_restaurants) {

                    var i, j;
                    for (i = 0; i < opened_restaurants.length - 1; i++)       
                    for (j = 0; j < opened_restaurants.length - i -1; j++) 
                     if (opened_restaurants[j].rating < opened_restaurants[j+1].rating)
                     {
                          var temp = opened_restaurants[j];
                          opened_restaurants[j] = opened_restaurants[j+1];
                          opened_restaurants[j+1] = temp;
                     }
                      return opened_restaurants;           
        } 


  }

    console.log(function_object.restaurants_within_specified_radius(lat,long,rad,dinHour));
    // function_object.restaurants_within_specified_radius(lat,long,rad,dinHour)

}


function Restaurant(id, name, latitude, longitude, openHour, closeHour) {
  this.latitude = latitude;
  this.longitude = longitude;
  this.id = id;
  this.name = name;
  this.openHour = openHour; // in [0-23]
  this.closeHour = closeHour; // in [0-23]
}

function Rating(id, rating) {
  this.id = id;
  this.rating = rating; // in [1-5]
}

function main() {
  restaurants = [
                  new Restaurant(0, "Domino's Pizza", 30, -122, 7, 23),    //(id, name, latitude, longitude, openHour, closeHour)      
                  new Restaurant(1, "bean's Pizza", 30, -122, 6, 23),
                  new Restaurant(2, "tim's Pizza", 30, -122, 4, 23)                     
                ];


  ratings = [
                  new Rating(0, 3),
                  new Rating(1, 5),
                  new Rating(2, 2),
            ];

  y = new Yelp(restaurants, ratings);
  y.find(25, -122, 5, 7, false);
}

main();