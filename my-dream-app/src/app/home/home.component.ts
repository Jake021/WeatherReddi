import { Component, Input, Output, ɵɵelementContainerStart } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //these load the fields on forecast dashboard
  //they are populated in getCurrentWeather() function

  today: string[];
  feelsLike: string[];
  humidity: string[];
  sunrise: string[];
  sunset: string[];
  temp: string[];
  high: string[];
  low: string[];
  visibility: string[];
  windSpeed: string[];
  currentTitle = "";

  lat = '';
  lon = '';
  cityState='';
  locationInput = '';

  /**
   * This function uses a regular expression to make sure the user is inputting
   * the city and state correctly
   */
  checkUserInput(){
    this.cityState = this.locationInput;

    var correctFormat = /([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/.test(this.cityState);

    if (correctFormat){
      this.getCurrentWeather();
    } else{
      window.alert("Please enter a valid [City], [State]");
    }
  }

  getCurrentWeather() {
    async function getLocation(location:String) {
        let url = 'https://api.opencagedata.com/geocode/v1/json?q='+location+'&countrycode=us&key=2ba758912b6f487fb6aac6ada7ff320b';
        
        //if the JSON returns an error, this will prompt the user to re-enter the city and state
        let obj = await (await fetch(url)
        .then(function(response) {
          if (!response.ok) {
              window.alert("Please enter a valid [City], [State]");
              throw Error(response.statusText); 
          }
          return response;
      })).json();

         /**
          * The Open Cage API uses a confidence rating when matching what the user inputs and what
          * it finds in its search. If the confidence level is too high, there is a chance that the API
          * will return a location that is not what the user wants
          * 
          * Also checking that this result is not undefined
          */
         if (typeof obj.results[0] === "undefined" || obj.results[0].confidence > 6){
           window.alert("Please enter a valid [City], [State]");
           throw Error("Low Confidence");
         }

         return obj;

    }
    var loca; // this variable will get the JSON from Open Cage Data for lat and lon on city user inputs
      async function get(lat:String,lon:String) {
        let url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&cnt=7&appid=7166823e1e205e712f9c3c6576878966&units=imperial';
        let obj = await (await fetch(url)).json();
        
        //console.log(obj);
        return obj;
    }
    var tags;
    (async () => {
      //Here is where the lat and long are being inputed
      loca = await getLocation(this.cityState);
      this.lat = loca.results[0].geometry.lat;
      this.lon = loca.results[0].geometry.lng;


      tags = await get(this.lat,this.lon)
      console.log(tags);
       this.getWeatherInfo(tags);
    })()  

  }

  getWeatherInfo(tags: any){
        this.currentTitle = "Current";
        for (var i = 0; i < 7 ; i++){

          if (i == 0){
            this.feelsLike[0]= ('Feels Like: ' + Math.floor(tags.current.feels_like)+'°');
            this.temp[0] = ('Temperature: ' +  Math.floor(tags.current.temp)+'°')
          }
        
        this.today[i] = this.getDay(tags.daily[i].dt);
        this.humidity[i]= ('Humidity: ' + tags.daily[i].humidity + '%');
        this.sunrise[i]= ('Sunrise: ' + this.sunriseSunsetConversion(tags.daily[i].sunrise));
        this.sunset[i]= ('Sunset: ' + this.sunriseSunsetConversion(tags.daily[i].sunset));
        this.high[i]= ('High: ' + Math.floor(tags.daily[i].temp.max)+'°');
        this.low[i]= ('Low: ' + Math.floor(tags.daily[i].temp.min)+'°');
        this.visibility[i]= ('Visibility: ' + (tags.daily[i].visibility == "10000" ? 10.00 : Math.round(tags.current.visibility*0.000621371 ))+ " mi");
        this.windSpeed[i]= ('Wind Speed: ' + Math.round(tags.daily[i].wind_speed) + ' mph');
        }
        
  }

  sunriseSunsetConversion(input : number){

    let unix_time = input;
    var date = new Date(unix_time * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    
    let ending = hours > 12 ? " pm" : " am";
    var formattedTime = hours%12 + ':' + minutes.substr(-2) + ending;

    return formattedTime;
  }

  getDay(input: number){
    let unix_time = input;
    var date = new Date(unix_time * 1000);

    var day = date.getDay();
    var dayString;

    switch(day) {
      case 0:
        dayString =  'Sunday';
        break;
      case 1:
        dayString = 'Monday';
        break;
      case 2:
        dayString = 'Tuesday';
        break;
      case 3:
        dayString = 'Wednesday';
        break;
      case 4:
        dayString = 'Thursday';
        break;
      case 5:
        dayString = 'Friday';
        break;
      case 6:
        dayString = 'Saturday';
        break; 
      default:
        dayString = 'NaN';
    } 

    return dayString;
  }


  constructor(private breakpointObserver: BreakpointObserver) {
    this.today = [];
    this.feelsLike = [];
    this.humidity = [];
    this.sunrise = [];
    this.sunset = [];
    this.temp = [];
    this.high = [];
    this.low = [];
    this.visibility = [];
    this.windSpeed = [];
  }
}
