import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { ICliente } from '../interfaces/ICliente.';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  endpoint = '';
  api = environment.api;
  constructor(private http: HttpClient) { }

  findAllCustomers() {
    return this.http.get<ICliente[]>(`${this.api}`)
  }
}
