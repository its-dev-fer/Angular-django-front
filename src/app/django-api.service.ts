import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class DjangoApiService {
  serverURL = 'http://178.128.86.237:8000'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(
    private http: HttpClient,
  ) { }


  getAllCars(): Observable<any>
  {
    return this.http.get(`${this.serverURL}/carros/`)
  }

  getCarById(id): Observable<any>
  {
    return this.http.get(`${this.serverURL}/carros/${id}/`)
  }

  updateCar(id, car): Observable <any>
  {
    let data = JSON.stringify(car)
    return this.http.put(`${this.serverURL}/carros/${id}/`, data, this.httpOptions)
  }

  deleteCar(id): Observable <any>
  {
    return this.http.delete(`${this.serverURL}/carros/${id}/`, this.httpOptions)
  }

  addCar(car): Observable <any>
  {
    console.log('entra we')
    return this.http.post(`${this.serverURL}/carros/`, car)
  }
}
