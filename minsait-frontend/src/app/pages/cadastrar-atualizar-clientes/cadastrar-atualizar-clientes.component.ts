import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICliente } from 'src/app/interfaces/ICliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-atualizar-clientes',
  templateUrl: './cadastrar-atualizar-clientes.component.html',
  styleUrls: ['./cadastrar-atualizar-clientes.component.css']
})
export class CadastrarAtualizarClientesComponent {
  constructor(private clientesService: ClientesService) {}

    form = new FormGroup({
      nome: new FormControl('', Validators.required),
      cpf: new FormControl(0, Validators.required),
      telefone: new FormControl(0, Validators.required),
      rendimentoMensal: new FormControl(0, Validators.required),
      rua: new FormControl('', Validators.required),
      numero: new FormControl(0, Validators.required),
      cep: new FormControl(0, Validators.required),
});

createCustomer() {
  const customer: ICliente = this.form.value as ICliente;
  this.clientesService.createCustomer(customer).subscribe(result => {
    Swal.fire({
      title: 'Os dados estão corretos?',
      text: "Você irá cadastrar um novo cliente em nossa base de dados!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, os dados estão corretos!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Sucesso!',
          'Cliente cadastrado com sucesso.',
          'success'
        )
      }
    })
  }, error => {
    console.log(error.message);
  });
}
}
