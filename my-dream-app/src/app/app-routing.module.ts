import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfilesComponent} from './profiles/profiles.component';
import { LoginSignupComponent} from './login-signup/login-signup.component';
import { CreateNewProfilePageComponent } from './create-new-profile-page/create-new-profile-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, //routes to home on refresh
  { path: 'home', component: HomeComponent },
  { path: 'profiles', component: ProfilesComponent },
  { path: 'login-signup', component: LoginSignupComponent},
  { path: 'create-new-profile', component: CreateNewProfilePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
