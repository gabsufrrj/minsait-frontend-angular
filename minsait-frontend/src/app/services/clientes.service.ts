import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { ICliente } from '../interfaces/ICliente';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  endpoint = '';
  api = environment.api;
  constructor(private http: HttpClient) {}

  findAllCustomers() {
    return this.http.get<ICliente[]>(`${this.api}`);
  }

  createCustomer(cliente: ICliente) {
    // console.log('CRIANDO');

    return this.http.post(`${this.api}`, cliente);
  }

  findCustomerByCpf(cpf: string) {
    return this.http.get<ICliente>(`${this.api}/${cpf}`);
  }

  updateCustomer(cpf: string, cliente: ICliente) {
    // console.log('ATUALIZANDO');

    return this.http.put(`${this.api}/${cpf}`, cliente);
  }

  deleteCustomer(cpf: string) {
    return this.http.delete(`${this.api}/${cpf}`);
  }
}
