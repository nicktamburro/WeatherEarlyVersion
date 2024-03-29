var WeatherAPIKey = "52868524724c9712b16e9c2c6e0587e5";
var GeolocationAPIKey = "AIzaSyB_76h9wfYzSkwQe0PLx2L04pYKe7VQFpE";
//var widget = Mixcloud.PlayerWidget(document.getElementById('my-widget-iframe'));
const googleQueryURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + GeolocationAPIKey;

//I already forgot what this index is for...
var index = 0;

//hides the weatherPanel
$("#weatherPanel").hide();

//plays the video background, still need the backgrounds to change with results...
$("#video-background").html('<source id="videoSource" src="./media/video/mainScreen.mp4" type="video/mp4">');


//if they don't want to share their location, they can type one in...
function getWeatherWithUserInput() {
	return new Promise(function(resolve, reject) {

	 var location = $("#location").val().trim();
	 var widget = Mixcloud.PlayerWidget(document.getElementById('my-widget-iframe'));

	 var weatherCSQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "=&appid=" + WeatherAPIKey;

    $.ajax({
		  url: weatherCSQueryURL,
		  method: "GET"
	   }).done(function(response) {
			 $(".city").html("<h1>" + response.name + " Weather </h1>");
			 $(".wind").html("Wind Speed: " + response.wind.speed);
			 $(".humidity").html("Humidity: " + response.main.humidity);
			 var f_temp = 9/5*(response.main.temp-273)+32;
			 $(".temp").html("Temperature (F) " + Math.floor(f_temp));
			 resolve(response.weather[0].id);
	     });
    });
  };

$("#input-location").click(function(event){
    event.preventDefault();
    $(".mainText").hide();
    $("#weatherPanel").show();
       getWeatherWithUserInput()
       .then(function(response) {
    weatherCode = response;
    console.log(weatherCode);
    showMix(weatherCode);
});
});

$('#get-location').click(function(event){
    event.preventDefault();
    $("#textPanel").hide();
    $("#weatherPanel").show();
    getWeatherWithGeo()
  .then(function(response) {
    weatherCode = response;
    console.log(weatherCode);
    showMix(weatherCode);
    //showWidget(weatherCode, index)
});
});


//google geolocation
function getGeoLocationGoogle() {
	var googleQueryURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + GeolocationAPIKey;
    return new Promise(function(resolve, reject) {
        $.ajax({
        	method: "POST",
            url: googleQueryURL,
        }).done(function(response) {
            resolve(response);
        }).fail(function(err) {
            reject(err);
        })
    })
}
 
 //passes the google lat/lon to openweather
function getWeatherWithGeo() {
  return new Promise(function(resolve,reject) {
    getGeoLocationGoogle()
      .then(function(response) {
          var lat = response.location.lat;
          var lon = response.location.lng;

          var weatherLLQueryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + WeatherAPIKey;
          $.ajax({
              url: weatherLLQueryURL,
              method: "GET"
          }).done(function(response) {
              $(".city").html("<h1>" + response.name + " Weather</h1>");
              $(".wind").html("Wind Speed: " + response.wind.speed);
              $(".humidity").html("Humidity: " + response.main.humidity);
              var f_temp = 9/5*(response.main.temp-273)+32;
              $(".temp").html("Temperature (F) " + Math.floor(f_temp));
              resolve(response.weather[0].id);
          });
        })
      })

	}

//not sure why this was here...
//});

/*THUNDERSTORM 200 - 232
Drizzle to light rain 300-500
Heavy rain 502-531
Snow 600-622
Weird atmosphere, dust/fog/sandstorm 701-761
clear/sunny 800-802
Overcast 803-804
Extreme 900-902, 960-962, 781, 762
Light breeze 951-955
Heavy wind 956-959*/


//this bunch of arrays is a placeholder for the DB of mix urls I'm making... 
function showMix(weatherCode){
  
  const thunder = ["https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fcarlsoncrusher%2Fstoner-doom-metal-mix-2%2F&hide_cover=1&mini=1&autoplay=1", 
                 "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Ffoxtronaut%2Fgits-lau%2F&hide_cover=1&mini=1&autoplay=1",
                 "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2FElectricBeardOfDoom%2Felectric-beard-of-doom-episode-90%2F&hide_cover=1&mini=1&autoplay=1"
                  ];
  const lightRain = ["https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fjohncasey1048554%2Ffeat-roy-orbison-harry-dean-stanton-papa-m-dirty-three-jimmie-dale-gilmore-van-morrison%2F&hide_cover=1&mini=1&autoplay=1",
                  "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fadamkvasnica3%2Fnew-wave-dream-pop-and-ambient%2F&hide_cover=1&mini=1&autoplay=1",
                   "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fgreg-wilson5%2Fshoegaze-classics-rarities-volume-one%2F&hide_cover=1&mini=1&autoplay=1"
                  ];
const heavyRain = ["https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fegyptienarts%2Ffrederic-chopin-nocturnes%2F&hide_cover=1&mini=1&autoplay=1",
                   "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Feast_yorkshire_music_club%2Feast-riding-music-club-toru-takemitsu-film-music-part-one%2F&hide_cover=1&mini=1&autoplay=1",
];                 "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fjohnsteyaert%2Ftristan-isolde-einleitungliebestod%2F&hide_cover=1&mini=1&autoplay=1"
const snow = ["https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2FTomFromHope%2Fsigur-r%25C3%25B3s-mix%2F&hide_cover=1&mini=1&autoplay=1",
              "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2FPeterPendragon%2Fbrian-eno-ambient-mix-happy-65th-birthday%2F&hide_cover=1&mini=1&autoplay=1",
];            "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Flowlight%2Ffavorite-ambient-tracks-of-all-time%2F&hide_cover=1&mini=1&autoplay=1"
const weird = ["https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2FMelmoth_The_Wanderer%2Fthe-insomniacs-almanac%2F&hide_cover=1&mini=1&autoplay=1",
                "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fjamespapademetrie%2Fthe-seance-24th-august-2013%2F&hide_cover=1&mini=1&autoplay=1"
];
const clear = ["https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fthisisdjames%2Fdjames-west-coast-hip-hop-guest-mix-for-j-fresh%2F&hide_cover=1&mini=1&autoplay=1",
               "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fdjemilyrawson%2Fa-tribe-called-quest-mini-mix%2F&hide_cover=1&mini=1&autoplay=1",
               "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fhdif%2Fhdif-podcast-31-belle-sebastian-rebellious-jukebox%2F&hide_cover=1&mini=1&autoplay=1",
];              "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fmofgimmers%2Ftropicalismo-brazilian-psychedelia-tropicalia-and-more%2F&hide_cover=1&mini=1&autoplay=1"
const overcast = ["https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fmohhfnzn%2Felliott-smith-acoustic%2F&hide_cover=1&mini=1&autoplay=1",
                  "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fmanuel-nu%25C3%25B1ez-soto%2Ftotal-from-joy-division-to-new-order%2F&hide_cover=1&mini=1&autoplay=1",
               "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2FUABCRadio%2Fradio-uni%25C3%25B3n-the-smiths-the-cure-joy-division-y-m%25C3%25A1s%2F&hide_cover=1&mini=1&autoplay=1"];
const extreme = ["https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fblackvintagemilk%2Fnorge-svart-part-1%2F&hide_cover=1&mini=1&autoplay=1",
                "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2FMidlandsMetalheads%2Fextreme-metal-mayhem-with-dj-marshbag-27122013%2F&hide_cover=1&mini=1&autoplay=1",
                "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2FMidlandsMetalheads%2Fthe-altar-extreme-metal-from-all-genres%2F&hide_cover=1&mini=1&autoplay=1"
];
const breezy = ["https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2FLittleRecords%2Fepisode-159-lets-kiss-make-up%2F&hide_cover=1&mini=1&autoplay=1",
                "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2FDEADDISCORADIO%2Fbest-indie-love-songs-mixtape-by-deaddisco-indiepop-indierockclassics%2F&hide_cover=1&mini=1&autoplay=1",
                "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2FIKorn%2Fsweet-harmony-compilation-17%2F&hide_cover=1&mini=1&autoplay=1",
];
const windy = ["https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2FLittleWhiteLies%2Ffavourite-film-scores-by-nick-cave-warren-ellis%2F&hide_cover=1&mini=1&autoplay=1",
               "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2Fjohncasey1048554%2Fa-great-hour-of-music-feat-dylan-ennio-morricone-talk-talk-velvets-mingus-the-jimmy-cake%2F&hide_cover=1&mini=1&autoplay=1",
               "https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2FDj_iZem%2Fizem-show-116-marcia-castro-lv-werkha-lindigo-dona-onete-os-mutantes-fanfarai%2F&hide_cover=1&mini=1&autoplay=1",

];


//we pass in the weather codes and pull up mixes
// for now it just changes the background of the weather box, want to change the video background too
  if (weatherCode > 199 && weatherCode < 233){
    //thunderstorm
    console.log("thunder");
    $('#mix-display').html('<iframe width="100%" height="60" src=' + thunder[0] + ' frameborder="0"></iframe>');
  } else if (weatherCode > 299 && weatherCode < 501){
    //rain
     console.log("rainy");
    $('#mix-display').html('<iframe width="100%" height="60" src=' + lightRain[0] + ' frameborder="0"></iframe>');
  } else if (weatherCode > 501 && weatherCode < 532){
    //heavy rain
     console.log("really rainy");
    $('#mix-display').html('<iframe width="100%" height="60" src=' + heavyRain[0] + ' frameborder="0"></iframe>');
  } else if (weatherCode > 599 && weatherCode < 623){
    //snow
     console.log("snowy");
    $('#mix-display').html('<iframe width="100%" height="60" src=' + snow[0] + ' frameborder="0"></iframe>');
  } else if (weatherCode > 700 && weatherCode < 762){
    //weird atmosphere
     console.log("weird atmosphere");
    $('#mix-display').html('<iframe width="100%" height="60" src=' + weird[0] + ' frameborder="0"></iframe>');
  } else if (weatherCode > 802 && weatherCode < 805) {
    //overcast
     console.log("overcast");
    $('#mix-display').html('<iframe width="100%" height="60" src=' + overcast[0] + ' frameborder="0"></iframe>');
  } else if (weatherCode > 901 && weatherCode < 903){
    //extreme ... ADD MORE
     console.log("extreme");
    $('#mix-display').html('<iframe width="100%" height="60" src=' + extreme[0] + ' frameborder="0"></iframe>');
  } else if (weatherCode > 950 && weatherCode < 956){
    //breezy
     console.log("breezy");
    $('#mix-display').html('<iframe width="100%" height="60" src=' + breezy[0] + ' frameborder="0"></iframe>');
  } else if (weatherCode > 955 && weatherCode < 960){
    //windy
    console.log("windy");
    $('#mix-display').html('<iframe width="100%" height="60" src=' + windy[0] + ' frameborder="0"></iframe>');
  } else {
    //etc
     console.log("clear");
    $('#mix-display').html('<iframe width="100%" height="60" src=' + clear[0] + ' frameborder="0"></iframe>');
    $("#video-background").html('<source id="videoSource" src="./media/video/moving_clouds.mp4" type="video/mp4">');
  }
};




