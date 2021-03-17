import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
//import * as weatherApi from "weatherApi";
declare const myTest: any;

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
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 2, rows: 1 }
      ];
    })
  );

  onClick() {

    console.log(
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=44.953705&lon=-93.089958&appid=7166823e1e205e712f9c3c6576878966')
    .then(response => response.json())
    .then(data => console.log(data)));
    //myTest();
  }

  constructor(private breakpointObserver: BreakpointObserver) {}
}
