import { Component, Input } from '@angular/core';
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
          { title: 'Current Weather', cols: 1, rows: 2 }
        ];
      }

      return [
        { title: 'Current Weather', cols: 2, rows: 2 }
      ];
    })
  );

  //these load the current temp fields on forecast dashboard
  //they are populated in getCurrentWeather() function
  clouds='';
  dewPoint = ''
  dt ='';
  feelsLike='';
  humidity='';
  pressure='';
  sunrise='';
  sunset='';
  temp='';
  visibility='';
  main='';
  lat = '';
  lon = '';

  getCurrentWeather() {
    //Change the lat and long here.
    this.lat = '44.895963';
    this.lon = '-93.356050';
    //input the cords as strings
      async function get(lat:String,lon:String) {
        let url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=7166823e1e205e712f9c3c6576878966';
        let obj = await (await fetch(url)).json();
        
        return obj;
    }
    var tags;
    (async () => {
      //Here is where the lat and long are being inputed
      tags = await get(this.lat,this.lon)

      this.clouds = ('Clouds: ' + tags.current.clouds);
      this.dewPoint = ('Dew Point: ' + tags.current.dew_point);
      this.dt = ('dt: ' + tags.current.dt);
      this.feelsLike= ('Feels Like: ' + tags.current.feels_like);
      this.humidity= ('Humidity: ' + tags.current.humidity);
      this.pressure= ('Pressure: ' + tags.current.pressure);
      this.sunrise= ('Sunrise: ' + tags.current.sunrise);
      this.sunset= ('Sunset: ' + tags.current.sunset);
      this.temp= ('Temperature: ' + tags.current.temp);
      this.visibility= ('Visibility: ' + tags.current.visibility);
      this.main = ('main: ' + tags.current.weather[0].main);

    })()  

  }

  constructor(private breakpointObserver: BreakpointObserver) {}
}
