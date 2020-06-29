# NSFF-Back-end

## Exemplo de uso da API 
Nota: **base_url** é o endereço do servidor 

#### Criar conta no NSFF 

**(Metodo POST)**  `http://localhost:3201/api/create/`

##### Estrutura do JSON

```
{
  "name": "felipe",
  "email": "felipe",
	"password": "1234"
}

```



#### Dados da conta do usuario

**(Metodo GET)** `http://localhost:3201/api/user/[ID_USUARIO]`

##### Resultado

```json
{
  "idbank": "",
  "_id": "5ef95ceaed4cd03ad65c2fbf",
  "name": "Felipe",
  "email": "Felipe@email.com",
  "password": "$2b$08$qgMbKu48uDir6C1IeAvOw.CMQL5XJGphyMBccCskfYvaClairpknS",
  "profile": [],
  "card": [
    {
      "name": "Bank-API",
      "number": 4703318527171343,
      "valid_until": "12-03-2027",
      "_id": "5ef95dbaed4cd03ad65c2fc0",
      "idbank": "5ef95d2c05cad93a878877b6"
    }
  ],
  "createAt": "2020-06-29T03:15:54.041Z",
  "__v": 0
}
```



#### Login

**(Metodo POST)** `http://localhost:3201/api/user/[ID_USUARIO]`

##### Resultado

```json
{
  "email": "felipe",
	"password": "1234"
}

```



#### Adicionar cartão

**(Metodo POST)** `http://localhost:3201/api/user/[ID_USUARIO]/addcard`

##### Resultado

```json
{
	"card": {
		"name": "bank-api",
    "number": 6686007858612912,
    "valid_until": "12/27",
		"cpf":10000000001
	}
}

```



#### Ver cartões

**(Metodo POST)** `http://localhost:3201/api/user/[ID_USUARIO]/showcards`

##### Resultado

```json
{
  "card": [
      {
        "name": "Bank-API",
        "number": 4703318527171343,
        "valid_until": "12-03-2027",
        "_id": "5ef95dbaed4cd03ad65c2fc0",
        "idbank": "5ef95d2c05cad93a878877b6"
      }
    ]
}

```





#### Analise de Gastos

**(Metodo GET)** `http://localhost:3201/api/user/[ID_USUARIO]/analise`

##### Resultado

```json
{
  "message": "Suas ações na sua conta tem sido negativas, você gastou R$2075 a mais do que depositou! Tente um resultado positivo na próxima análise!\n\nVocê está em um mau caminho! Mais de 25% dos seus gastos são ruins! Você gastou R$985 a mais com coisas não-importantes do que com coisas importantes/depósitos!\n"
}

```



#### Dicas

**(Metodo GET)** `http://localhost:3201/api/user/[ID_USUARIO]/dicas`

##### Resultado

```
Depositado: Você depositou 2 vezes neste período! tendo depositado um total de 664 com média de R$332.0 por depósito! Visão geral: Você gastou um total de R$1411 neste período! Com um total de 11 transações, sendo: 7 em entretenimento, compondo 70% do total gasto, com um total de R$985 1 em investimentos, compondo 3% do total gasto, total de R$36 3 em despesas, compondo 28% do total gasto, total de R$390 Suas transações foram centradas nas seguintes empresas/despesas: Posto - 1 Pagamento(s) total de R$100 Americanas - 3 Pagamento(s) total de R$397 Lider - 5 Pagamento(s) total de R$624 Celpa - 1 Pagamento(s) total de R$230 Farmacia - 1 Pagamento(s) total de R$60 Dica: Uma dica para lhe guiar melhor seria: Você gastou mais do que depositou! Evite este tipo de prática ou poderá acabar endividado/com saldo negativo!

```



#### Extrato

**(Metodo GET)** `http://localhost:3201/api/user/[ID_USUARIO]/extrato`

##### Resultado

```json
[
  {
    "valor": 12,
    "tipo": "Transacao",
    "descricao": "Lider",
    "categoria": "Entretenimento",
    "_id": "5ef65b7e872430268ea92b39",
    "data": "2020-04-17T08:01:53.676Z",
    "cpf_destinatario": 10000000001,
    "cpf_remetente": 10000000002
  },
 ]

```



