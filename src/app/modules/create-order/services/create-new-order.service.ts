import { Injectable } from '@angular/core';
import { User } from '../interfaces/create-order.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateNewOrderService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene lista de clientes 
   * @method getUsers
   * @return Observable
   * @author aldobauvel@gmail.com   
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  /**
   * Guarda datos cliente
   * @param client 
   * @method saveClient
   * @return Observable
   * @author aldobauvel@gmail.com
   */
  saveClient(client: any) {
    return this.http.post('http://httpbin.org/post', client)
  }
}
