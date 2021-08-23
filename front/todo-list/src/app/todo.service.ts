import { Observable } from 'rxjs';
import { Todo } from './todo';
import { Response } from './response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/*
  Service for making requests to the backend Todo API
*/
export class TodoService {
  private apiServerUrl = environment.apiBaseUrl;

  // inject an httpclient into the todo service constructor
  constructor(private http: HttpClient) {}

  // get an array of todos
  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiServerUrl}/getAllTodos`);
  }

  // post a new todo to the back end
  public addTodo(todo: Todo): Observable<Response> {
    return this.http.post<Response>(`${this.apiServerUrl}/addTodo`, todo);
  }

  // put updates for a todo to the back end
  public markDone(todo: Todo): Observable<Response> {
    return this.http.put<Response>(`${this.apiServerUrl}/markDone`, todo);
  }
}
