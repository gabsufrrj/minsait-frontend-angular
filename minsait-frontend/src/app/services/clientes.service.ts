import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { ICliente } from '../interfaces/ICliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  endpoint = '';
  api = environment.api;
  constructor(private http: HttpClient) { }

  findAllCustomers() {
    return this.http.get<ICliente[]>(`${this.api}`);
  }

  createCustomer(cliente: ICliente) {
    return this.http.post(`${this.api}`, cliente);
  }

  findCustomerByCpf(cpf: number) {
    return this.http.get<ICliente>(`${this.api}/${cpf}`);
  }

  updateCustomer(cpf: number, cliente: ICliente) {
    return this.http.put(`${this.api}/${cpf}`, cliente);
  }

  deleteCustomer(cpf: number) {
    console.log(`${this.api}/${cpf}`);

    return this.http.delete(`${this.api}/${cpf}`);
  }
}
