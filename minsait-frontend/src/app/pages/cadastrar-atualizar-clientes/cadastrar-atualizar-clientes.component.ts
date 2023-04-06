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
  constructor(private clientesService: ClientesService, private route: ActivatedRoute) {}

  clienteCpf = 0;

  ngOnInit() {
    this.clienteCpf = Number(this.route.snapshot.paramMap.get('cpf'));
    if (this.clienteCpf) {
      this.clientesService.findCustomerByCpf(this.clienteCpf).subscribe((cliente: ICliente) => {
        this.form.setValue({
          cpf: cliente.cpf,
          nome: cliente.nome,
          rua: cliente.rua,
          numero: cliente.numero,
          cep: cliente.cep,
          rendimentoMensal: cliente.rendimentoMensal,
          telefone: cliente.telefone
        })
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Digite um CPF já cadastrado',
          text: 'Cliente não encontrado em nossa base de dados',
        })
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Dados inválidos',
        text: 'Digite apenas números',
      })
    }
  }

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
    this.clientesService.createCustomer(customer).subscribe(
      (result) => {
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
            Swal.fire('Sucesso!', 'Cliente cadastrado com sucesso.', 'success');
          }
        });
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
}
