import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = 'http://127.0.0.1:8000/videoflix/';

  constructor(private http: HttpClient) { }

  /**
   * Handles a post request to the backend.
   * Takes the data to post, the specific endpoint url in addition to the base url
   * and optionally a token for authorization. 
   */
  async post(postData: any, url: string, token?: string | null): Promise<any> {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    const response = await fetch(this.BASE_URL + url, {
      method: 'POST',
      headers,
      body: JSON.stringify(postData),
    });
    return await response.json();
  }

  /**
   * Handles a get request to the backend with a URL specified as parameter.
   */
  async get(url: string, token?: string | null): Promise<any> {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    const response = await fetch(this.BASE_URL + url, {
      method: 'GET',
      headers,
    });
    return await response.json();
  }
}