import { Component, Directive, Injectable, Input, NgModule, Output, Pipe } from '@angular/core';
import { ICliente } from 'src/app/interfaces/ICliente.';
import { ClientesService } from 'src/app/services/clientes.service';

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
}
