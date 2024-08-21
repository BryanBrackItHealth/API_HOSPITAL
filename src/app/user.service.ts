import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:5001/api/detailPatients');
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>('https://localhost:5001/api/createPatient', user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.post<any>('https://localhost:5001/api/createPatient', user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.get<any>(`${'https://localhost:5001/api/deletePatient'}/${id}`);
  }
}