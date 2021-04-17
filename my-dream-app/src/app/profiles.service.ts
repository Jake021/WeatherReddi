import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { promise } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(private http: HttpClient) { }

  private async request(method: string, url: string, data?: any) {
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body'
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }

  getProfiles() {
    return this.request('GET', 'localhost:3000/api/profiles');
  }

  getProfile(id: Number) {
    return this.request('GET', 'localhost:3000/api/profiles/', {id});
  }

  updateProfile() {
    return this.request('GET', 'localhost:3000/api/profiles');
  }

  deleteProfile() {
    return this.request('GET', 'localhost:3000/api/profiles');
  }

  createProfiles(profile: Profile) {
    return this.request('POST', 'localhost:3000/api/profiles', );
  }

}
