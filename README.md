![Easynvest](https://camo.githubusercontent.com/c4ee611d69893fec43b903eb88a444530eaf8e7f/68747470733a2f2f7777772e656173796e766573742e636f6d2e62722f66617669636f6e2e69636f)

# Easynvest API Calendar

O intuito desse projeto é consolidar informacões de dias úteis baseado na [ANBIMA](http://www.anbima.com.br/pt_br/index.htm) - *Associação Brasileira das Entidades dos Mercados Financeiros e de Capitais*.

## Desenvolvendo

### Built With

Lista das principais bibliotecas:
 * [axios](https://www.npmjs.com/package/axios)
 * [cron](https://www.npmjs.com/package/cron)
 * [express](https://www.npmjs.com/package/express)
 * [moment](https://www.npmjs.com/package/moment)
 * [xlsx](https://www.npmjs.com/package/xlsx)
 * [redis](https://www.npmjs.com/package/redis)

### Pré-requisitos
Você precisará configurar seu ambiente. Para isso se faz necessário ter instalado:
 - [Redis](https://redis.io/)
 - [Node.js](https://nodejs.org/en/).

### Configurando

Para poder simular a aplicação localmente, basta efetuar os seguintes passos:

 - Será necessário subir o [Redis](https://redis.io) localmente, isso fará que inicie um processo do Redis no porta default `6379`.
 - O arquivo `.env` previsa ser atualizado com `REDIS_HOST` e `REDIS_PORT`.

```shell
git clone https://github.com/easynvest/api-calendar.git
cd api-calendar/
npm install
redis-server
npm start
```

### Building

 * TODO

## 6. Estrutura

```
    .index.js
    ├── config
    |   ├── redis.js
    ├── controllers
    |   ├── calendar.js
    |   ├── sync.js
    ├── helpers
    |   ├── jobs
    |   ├──   ├── sync_calendar.js
    ├── modules
    |   ├── manager_calendar.js
    ├── repositories
    |   ├── calendar.js
    ├── services
    |   ├── sync_calendar.js
```

## Versionamento

 * TODO podemoriamos talvez usar [SemVer](http://semver.org/) para versionamento.


## Configuração

Editar o arquivo `.env` na raiz do projeto:

```bash
REDIS_HOST=YOUR_REDIS_HOST_HERE
REDIS_PORT=YOUR_REDIS_PORT_HERE
```

## Tests

 * TODO

## Style guide

 * TODO

## Referência de API

> `GET      /calendar	`

> `POST     /sync	    `

```
http://localhost:3000/calendar	
```

## Database

[Redis](https://www.Redis.com/)

## Licensing

[Apache License Version 2.0](./LICENSE)