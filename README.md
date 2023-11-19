# Posterr-api

## Description

The API to feed Posterr front, using Express, Sequelize, and PostgreSQL.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/posterr-api.git
   ```

2. Run

```bash
  npm install
```

3. Create a PostgreSQL database and update the .env.development and .env.production files with your database credentials.

4. Migrate
```bash
npm run sequelize db:migrate
```

5. Seed the database with initial data:

```bash
npm run sequelize db:seed:all
```

## Usage

1. Run
```bash
npm run dev
```


## Dependencies

- [body-parser](https://www.npmjs.com/package/body-parser): ^1.20.2
- [cors](https://www.npmjs.com/package/cors): ^2.8.5
- [express](https://www.npmjs.com/package/express): ^4.18.2
- [helmet](https://www.npmjs.com/package/helmet): ^7.1.0
- [nodemon](https://www.npmjs.com/package/nodemon): ^3.0.1
- [pg](https://www.npmjs.com/package/pg): ^8.11.3
- [pg-hstore](https://www.npmjs.com/package/pg-hstore): ^2.3.4
- [sequelize](https://www.npmjs.com/package/sequelize): ^6.34.0
- [uuid](https://www.npmjs.com/package/uuid): ^9.0.1


## Dev Dependencies

- [@babel/cli](https://www.npmjs.com/package/@babel/cli): ^7.23.0
- [@babel/core](https://www.npmjs.com/package/@babel/core): ^7.23.3
- [@babel/node](https://www.npmjs.com/package/@babel/node): ^7.22.19
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env): ^7.23.3
- [dotenv](https://www.npmjs.com/package/dotenv): ^16.3.1
- [eslint](https://www.npmjs.com/package/eslint): ^8.53.0
- [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base): ^15.0.0
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import): ^2.29.0
- [husky](https://www.npmjs.com/package/husky): ^8.0.3
- [sequelize-cli](https://www.npmjs.com/package/sequelize-cli): ^6.6.2


## License

This project is licensed under the [ISC License](LICENSE) - see the [LICENSE](LICENSE) file for details.


