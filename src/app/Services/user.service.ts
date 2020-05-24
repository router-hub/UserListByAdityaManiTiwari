import { Injectable } from '@angular/core';
import { userList } from '../shared/userList';
import { userPosts } from '../shared/userPost';

import { Observable,of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import {HttpmsgService} from '../Services/httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient,
    private HttpmsgService:HttpmsgService
     ) {}
  
  getUsers(): Observable<userList[]> {
    return this.http.get<userList[]>(baseURL + 'users').pipe(catchError(this.HttpmsgService.handleError));
  }
  getPosts(id: Number): Observable<userPosts[]> {
    return this.http.get<userPosts[]>(baseURL + 'posts?userId=' + id).pipe(catchError(this.HttpmsgService.handleError));
  }
}