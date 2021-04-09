import { Component, OnInit } from '@angular/core';

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

}
