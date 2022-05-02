import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {

  constructor(private http: HttpClient) { }

  url = `https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts`;

  // To get the contacts from API
  getContacts(): Observable<[]> {
    const result = this.http.get<[]>(this.url);
    return this.http.get<[]>(this.url)
  }

}
