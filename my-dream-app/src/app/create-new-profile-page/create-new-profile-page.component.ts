import { Component, Input, OnInit } from '@angular/core';
declare const myTest: any;


@Component({
  selector: 'app-create-new-profile-page',
  templateUrl: './create-new-profile-page.component.html',
  styleUrls: ['./create-new-profile-page.component.css']
})
export class CreateNewProfilePageComponent implements OnInit {
  profileNameInput = '';
  
  constructor() { }

  ngOnInit(): void {
  }
  
  tempBoolean = false;
  tempGreaterThan = 0;
  tempLessThan = 0;

  precipitationBoolean = false;
  snowGreaterThan = 0;
  rainGreaterThan = 0;
  humidityGreaterThan = 0;
  humidityLessThan = 0;

  severeWeatherBoolean = false;


  submit(){
    if (this.checkUserInput()){
    
    var results = JSON.stringify({
      profileName: this.profileNameInput,
      tempAlerts: this.tempBoolean,
      tempGreater: this.tempGreaterThan,
      tempLess: this.tempLessThan,
      precipitationAlerts: this.precipitationBoolean,
      snowfall: this.snowGreaterThan,
      rainfall: this.rainGreaterThan,
      humidityGreater: this.humidityGreaterThan,
      humidityLess: this.humidityLessThan,
      severeWeather: this.severeWeatherBoolean
    });

    console.log(results);
    //alert("New profile created!");
    //myTest();

    } else{
      alert("Please Enter Profile Name");
      
    }
  }

  checkUserInput(){
    if (this.profileNameInput === ''){
      return false;
    } else return true;
  }
}

