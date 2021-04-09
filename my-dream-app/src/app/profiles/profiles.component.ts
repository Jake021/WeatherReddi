import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

interface Profile {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent {
  /** Based on the screen size, switch from standard to one column per row */
  Profiles: Profile[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
    {value: 'testFood-3', viewValue: 'testFood'}
  ];
  
  temp = "";

  profileSelect(input : Profile){
    this.temp =  input.value;
  }

  routeToCreateNewProfilePage(){ 
    //window.alert("Needs to Route to create profile page");
    this.router.navigateByUrl('/create-new-profile');
  } 

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}
}