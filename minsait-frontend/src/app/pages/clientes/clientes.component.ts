import { Component, Directive, Injectable, Input, NgModule, Output, Pipe } from '@angular/core';
import { ICliente } from 'src/app/interfaces/ICliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  clientes: ICliente[] = []
  constructor(private clientesService: ClientesService) {}

  ngOnInit() {

    this.clientesService.findAllCustomers().subscribe((result: ICliente[])  => {
      this.clientes = result;
    });
  }

  deleteCustomer(cpf: number) {
    console.log(cpf);
    this.clientesService.deleteCustomer(cpf).subscribe(_result => {
      this.ngOnInit();
      Swal.fire('Sucesso!', 'Cliente deletado com sucesso.', 'success');
    });

  }
}
