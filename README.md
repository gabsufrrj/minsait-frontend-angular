## Resumo

Esse repositório foi criado para realizar o desafio técnico de Frontend do processo seletivo Jovens Profissionais da empresa Minsait. Consumindo uma API em Java, o Frontend desenvolvido em Angular realiza a listagem de clientes e possibilita todas as operações CRUD. As páginas também contam com design responsivo, máscaras, validações entre outros.
## Conceitos utilizados 

* Angular
* HTML
* Bootstrap
* Lógica de Programação

## Versões

* Angular +
* Node +
* Typescript

## Como executar

1. Clone o repositório.
2. Abra a pasta do projeto e rode o comando `npm install` no seu terminal. 
3. Após a instalação das dependências, rode o camando `ng s` para subir a aplicação.

## Páginas

**/home**

- Exibe informações sobre o projeto e redireciona para a lista de clientes ou cadastro de novos clientes.

**/clientes**

- Exibe a lista de clientes cadastrados.

**/clientes/cadastro**

- Permite cadastrar um cliente na base de dados.

**/clientes/editar/:cpf**

- Permite alterar um cliente já cadastrado na base de dados.

**/clientes/cadastro**

## Validações

- O campo CPF deve ter exatamente 11 dígitos.
- O campo Nome Completo de possuir no mínimo 3 dígitos.
- O campo Rua deve ter 4 ou mais dígitos.
- O campo número é obrigatório.
- O campo Complemento é Opcional.
-  O campo CEP deve ter exatamente 8 dígitos.
- O campo Rendimento Mensal é obrigatório.
- O campo DDD + Telefone deve ter 10 ou 11 dígitos.
