import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewProfilePageComponent } from './create-new-profile-page.component';

describe('CreateNewProfilePageComponent', () => {
  let component: CreateNewProfilePageComponent;
  let fixture: ComponentFixture<CreateNewProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewProfilePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
