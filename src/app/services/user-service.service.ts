import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  addUser(user: User) {
    return this.http.post('http://localhost:3000/users', user)
  }

  getAllUsers() {
    return this.http.get<User[]>('http://localhost:3000/users')
  }
}
