import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = 'http://127.0.0.1:8000/videoflix/';

  constructor(private http: HttpClient) { }

  async post(postData: any, url: string): Promise<any> {
    const response = await fetch(this.BASE_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    return await response.json();
  }
}