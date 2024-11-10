import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonBinService {
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any> {
    return this.http.get('../../assets/values.json');
  }
}
