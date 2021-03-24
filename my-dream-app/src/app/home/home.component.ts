import { Component, Input, Output, ɵɵelementContainerStart } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //these load the current temp fields on forecast dashboard
  //they are populated in getCurrentWeather() function
  todayTitle= '';
  feelsLikeDayOne='';
  humidityDayOne='';
  sunriseDayOne='';
  sunsetDayOne='';
  tempDayOne='';
  visibilityDayOne='';
  windSpeedDayOne='';

  dayTwoDay = '';
  feelsLikeDayTwo='';
  humidityDayTwo='';
  sunriseDayTwo='';
  sunsetDayTwo='';
  tempMaxDayTwo='';
  tempMinDayTwo='';
  visibilityDayTwo='';
  windSpeedDayTwo='';

  dayThreeDay='';
  feelsLikeDayThree='';
  humidityDayThree='';
  sunriseDayThree='';
  sunsetDayThree='';
  tempMaxDayThree='';
  tempMinDayThree='';
  visibilityDayThree='';
  windSpeedDayThree='';

  dayFourDay='';
  feelsLikeDayFour='';
  humidityDayFour='';
  sunriseDayFour='';
  sunsetDayFour='';
  tempMaxDayFour='';
  tempMinDayFour='';
  visibilityDayFour='';
  windSpeedDayFour='';

  dayFiveDay='';
  feelsLikeDayFive='';
  humidityDayFive='';
  sunriseDayFive='';
  sunsetDayFive='';
  tempMaxDayFive='';
  tempMinDayFive='';
  visibilityDayFive='';
  windSpeedDayFive='';


  lat = '';
  lon = '';
  cityState='';
  locationInput = '';
  penis = '';

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
       this.getDayOneWeatherInfo(tags);
       this.getDayTwoWeatherInfo(tags);
       this.getDayThreeWeatherInfo(tags);
       this.getDayFourWeatherInfo(tags);
       this.getDayFiveWeatherInfo(tags);
    })()  

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

    if (day == 0){
      return 'Sunday';
    }

    if (day == 1){
      return 'Monday';
    }

    if (day == 2){
      return 'Tuesday';
    }

    if (day == 3){
      return 'Wednesday';
    }

    if (day == 4){
      return 'Thursday';
    }

    if (day == 5){
      return 'Friday';
    }

    if (day == 6){
      return 'Saturday';
    }

    return 'NaN';
  }

  getDayOneWeatherInfo(tags: any){
      this.todayTitle = 'Today';
      this.feelsLikeDayOne= ('Feels Like: ' + Math.floor(tags.current.feels_like)+'°');
      this.humidityDayOne= ('Humidity: ' + tags.current.humidity + '%');
      this.sunriseDayOne= ('Sunrise: ' + this.sunriseSunsetConversion(tags.current.sunrise));
      this.sunsetDayOne= ('Sunset: ' + this.sunriseSunsetConversion(tags.current.sunset));
      this.tempDayOne= ('Temperature: ' + Math.floor(tags.current.temp)+'°');
      this.visibilityDayOne= ('Visibility: ' + (tags.current.visibility == "10000" ? 10.00 : Math.round(tags.current.visibility*0.000621371 ))+ " mi");
      this.windSpeedDayOne= ('Wind Speed: ' + Math.round(tags.current.wind_speed) + ' mph');
  }

  getDayTwoWeatherInfo(tags: any){
    //this.feelsLikeDayTwo= ('Feels Like: ' + Math.floor(tags.daily[1].feels_like)+'°');
    this.dayTwoDay = this.getDay(tags.daily[1].dt);
    this.humidityDayTwo= ('Humidity: ' + tags.daily[1].humidity + '%');
    this.sunriseDayTwo= ('Sunrise: ' + this.sunriseSunsetConversion(tags.daily[1].sunrise));
    this.sunsetDayTwo= ('Sunset: ' + this.sunriseSunsetConversion(tags.daily[1].sunset));
    this.tempMaxDayTwo= ('High: ' + Math.floor(tags.daily[1].temp.max)+'°');
    this.tempMinDayTwo= ('Low: ' + Math.floor(tags.daily[1].temp.min)+'°');
    this.visibilityDayTwo= ('Visibility: ' + (tags.daily[1].visibility == "10000" ? 10.00 : Math.round(tags.current.visibility*0.000621371 ))+ " mi");
    this.windSpeedDayTwo= ('Wind Speed: ' + Math.round(tags.daily[1].wind_speed) + ' mph');
}

  getDayThreeWeatherInfo(tags: any){
        //this.feelsLikeDayThree= ('Feels Like: ' + Math.floor(tags.daily[1].feels_like)+'°');
        this.dayThreeDay = this.getDay(tags.daily[2].dt);
        this.humidityDayThree= ('Humidity: ' + tags.daily[2].humidity + '%');
        this.sunriseDayThree= ('Sunrise: ' + this.sunriseSunsetConversion(tags.daily[2].sunrise));
        this.sunsetDayThree= ('Sunset: ' + this.sunriseSunsetConversion(tags.daily[2].sunset));
        this.tempMaxDayThree= ('High: ' + Math.floor(tags.daily[2].temp.max)+'°');
        this.tempMinDayThree= ('Low: ' + Math.floor(tags.daily[2].temp.min)+'°');
        this.visibilityDayThree= ('Visibility: ' + (tags.daily[2].visibility == "10000" ? 10.00 : Math.round(tags.current.visibility*0.000621371 ))+ " mi");
        this.windSpeedDayThree= ('Wind Speed: ' + Math.round(tags.daily[2].wind_speed) + ' mph');
  }

  getDayFourWeatherInfo(tags: any){
    //this.feelsLikeDayThree= ('Feels Like: ' + Math.floor(tags.daily[1].feels_like)+'°');
    this.dayFourDay = this.getDay(tags.daily[3].dt);
    this.humidityDayFour= ('Humidity: ' + tags.daily[3].humidity + '%');
    this.sunriseDayFour= ('Sunrise: ' + this.sunriseSunsetConversion(tags.daily[3].sunrise));
    this.sunsetDayFour= ('Sunset: ' + this.sunriseSunsetConversion(tags.daily[3].sunset));
    this.tempMaxDayFour= ('High: ' + Math.floor(tags.daily[3].temp.max)+'°');
    this.tempMinDayFour= ('Low: ' + Math.floor(tags.daily[3].temp.min)+'°');
    this.visibilityDayFour= ('Visibility: ' + (tags.daily[3].visibility == "10000" ? 10.00 : Math.round(tags.current.visibility*0.000621371 ))+ " mi");
    this.windSpeedDayFour= ('Wind Speed: ' + Math.round(tags.daily[3].wind_speed) + ' mph');
}

  getDayFiveWeatherInfo(tags: any){
    //this.feelsLikeDayThree= ('Feels Like: ' + Math.floor(tags.daily[1].feels_like)+'°');
    this.dayFiveDay = this.getDay(tags.daily[4].dt);
    this.humidityDayFive= ('Humidity: ' + tags.daily[4].humidity + '%');
    this.sunriseDayFive= ('Sunrise: ' + this.sunriseSunsetConversion(tags.daily[4].sunrise));
    this.sunsetDayFive= ('Sunset: ' + this.sunriseSunsetConversion(tags.daily[4].sunset));
    this.tempMaxDayFive= ('High: ' + Math.floor(tags.daily[4].temp.max)+'°');
    this.tempMinDayFive= ('Low: ' + Math.floor(tags.daily[4].temp.min)+'°');
    this.visibilityDayFive= ('Visibility: ' + (tags.daily[4].visibility == "10000" ? 10.00 : Math.round(tags.current.visibility*0.000621371 ))+ " mi");
    this.windSpeedDayFive= ('Wind Speed: ' + Math.round(tags.daily[4].wind_speed) + ' mph');
  }

  constructor(private breakpointObserver: BreakpointObserver) {}
}
