import { Component, Input, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { toBase64String } from '@angular/compiler/src/output/source_map';

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
  //main='';s
  windSpeed='';
  lat = '';
  lon = '';
  value='';
  

  getCurrentWeather() {
    //Change the lat and long here.
    //saint paul mn lat 44.895963 long -93.35605 
    this.lat = '44.895963';
    this.lon = '-93.35605';
    //input the cords as strings
      async function get(lat:String,lon:String) {
        let url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=7166823e1e205e712f9c3c6576878966&units=imperial';
        let obj = await (await fetch(url)).json();
        
        return obj;
    }
    var tags;
    (async () => {
      //Here is where the lat and long are being inputed
      tags = await get(this.lat,this.lon)

      this.feelsLike= ('Feels Like: ' + Math.floor(tags.current.feels_like)+'°');
      this.humidity= ('Humidity: ' + tags.current.humidity + '%');
      this.sunrise= ('Sunrise: ' + this.sunriseSunsetConversion(tags.current.sunrise));
      this.sunset= ('Sunset: ' + this.sunriseSunsetConversion(tags.current.sunset));
      this.temp= ('Temperature: ' + Math.floor(tags.current.temp)+'°');
      this.visibility= ('Visibility: ' + (tags.current.visibility == "10000" ? 10.00 : Math.round(tags.current.visibility*0.000621371 ))+ " mi");
      //this.main = ('main: ' + tags.current.weather[0].main); 
      this.windSpeed= ('Wind Speed: ' + Math.round(tags.current.wind_speed) + ' mph');

      console.log(tags.current.visibility);
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

  getVal(val : KeyboardEvent){
    if(val.key != 'Enter'){
      this.value = this.value+val.key;
      //console.log(this.value);
    }else{
    console.log(this.value);
    this.value = "";
  }
  }

 

  constructor(private breakpointObserver: BreakpointObserver) {}
}
