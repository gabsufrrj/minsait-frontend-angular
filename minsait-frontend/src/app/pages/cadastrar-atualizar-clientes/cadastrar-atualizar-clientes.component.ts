import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ICliente } from 'src/app/interfaces/ICliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-atualizar-clientes',
  templateUrl: './cadastrar-atualizar-clientes.component.html',
  styleUrls: ['./cadastrar-atualizar-clientes.component.css'],
})
export class CadastrarAtualizarClientesComponent {
  constructor(
    private clientesService: ClientesService,
    private route: ActivatedRoute
  ) {}

  clienteCpf = '';

  ngOnInit() {
    this.clienteCpf = this.route.snapshot.paramMap.get('cpf') as string;

    if (this.clienteCpf) {
      this.clientesService
        .findCustomerByCpf(this.clienteCpf)
        .subscribe((cliente: ICliente) => {
          this.form.setValue({
            cpf: cliente.cpf,
            nome: cliente.nome,
            rua: cliente.rua,
            numero: cliente.numero,
            cep: cliente.cep,
            rendimentoMensal: cliente.rendimentoMensal,
            telefone: cliente.telefone,
          });
        });
    }
  }

  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    rendimentoMensal: new FormControl('', Validators.required),
    rua: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    cep: new FormControl('', Validators.required),
  });

  createCustomer() {
    const customer: ICliente = this.form.value as ICliente;

    if (this.clienteCpf === customer.cpf) {
      this.clientesService.updateCustomer(customer.cpf, customer).subscribe(
        (_result) => {
          Swal.fire({
            title: 'Os dados estão corretos?',
            text: `Você irá atualizar o cliente de CPF ${this.clienteCpf} em nossa base de dados!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, os dados estão corretos!',
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Sucesso!',
                'Cliente atualizado com sucesso.',
                'success'
              );
            }
          });
        },
        (error) => {
          const { defaultMessage } = error.error.errors[0];
          // const [ errors ] = error.error;
          // const variavel = errors.reduce((acc: string, curr: any) => {
          //   const {defaultMessage} = curr;
          //   return acc.concat("\n").concat(defaultMessage)
          //   }, "")
          Swal.fire({
            icon: 'error',
            title: 'Dados inválidos',
            text: `${defaultMessage}`,
          });
          console.log(error);
        }
      );
    } else {
      this.clientesService.createCustomer(customer).subscribe(
        (_result) => {
          Swal.fire({
            title: 'Os dados estão corretos?',
            text: 'Você irá cadastrar um novo cliente em nossa base de dados!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, os dados estão corretos!',
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Sucesso!',
                'Cliente cadastrado com sucesso.',
                'success'
              );
            }
          });
        },
        (error) => {
          const { defaultMessage } = error.error.errors[0];
          Swal.fire({
            icon: 'error',
            title: 'Dados inválidos',
            text: `${defaultMessage}`,
          });
          console.log(error);
        }
      );
    }
  }
}
