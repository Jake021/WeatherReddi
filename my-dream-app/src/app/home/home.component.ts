import { Component, Input, Output, ɵɵelementContainerStart } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Current Weather', cols: 2, rows: 1 },
          // { title: 'Day 2', cols: 1, rows: 1 },
          // { title: 'Day 3', cols: 1, rows: 1 },
          // { title: 'Day 4', cols: 1, rows: 1 },
          // { title: 'Day 5', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Current Weather', cols: 2, rows: 2 },
        // { title: 'Day 2', cols: 1, rows: 1 },
        // { title: 'Day 3', cols: 1, rows: 1 },
        // { title: 'Day 4', cols: 1, rows: 1 },
        // { title: 'Day 5', cols: 1, rows: 1 }
      ];
    })
  );

  //these load the current temp fields on forecast dashboard
  //they are populated in getCurrentWeather() function
  feelsLike='';
  humidity='';
  sunrise='';
  sunset='';
  temp='';
  visibility='';
  windSpeed='';
  lat = '';
  lon = '';
  cityState='';
  locationInput = '';

  checkUserInput(){
    this.cityState = this.locationInput;

    var includesBothCityAndState = this.cityState.includes(',');

    if (includesBothCityAndState){
      this.getCurrentWeather();
    } else{
      window.alert("Please enter a valid [City], [State]");
    }
  }

  getCurrentWeather() {
    //this.cityState = this.locationInput;
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

         console.log(obj);
         return obj;

    }
    var loca; // this variable will get the JSON from Open Cage Data for lat and lon on city user inputs
      async function get(lat:String,lon:String) {
        let url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=7166823e1e205e712f9c3c6576878966&units=imperial';
        let obj = await (await fetch(url)).json();
        
        return obj;
    }
    var tags;
    (async () => {
      //Here is where the lat and long are being inputed
      loca = await getLocation(this.cityState);
      this.lat = loca.results[0].geometry.lat;
      this.lon = loca.results[0].geometry.lng;


      tags = await get(this.lat,this.lon)

      this.feelsLike= ('Feels Like: ' + Math.floor(tags.current.feels_like)+'°');
      this.humidity= ('Humidity: ' + tags.current.humidity + '%');
      this.sunrise= ('Sunrise: ' + this.sunriseSunsetConversion(tags.current.sunrise));
      this.sunset= ('Sunset: ' + this.sunriseSunsetConversion(tags.current.sunset));
      this.temp= ('Temperature: ' + Math.floor(tags.current.temp)+'°');
      this.visibility= ('Visibility: ' + (tags.current.visibility == "10000" ? 10.00 : Math.round(tags.current.visibility*0.000621371 ))+ " mi");
      this.windSpeed= ('Wind Speed: ' + Math.round(tags.current.wind_speed) + ' mph');
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

 
  constructor(private breakpointObserver: BreakpointObserver) {}
}
