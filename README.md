# miscellaneous-work

# Todo-App-postgresql-React
create Todo app in react using: ReactJS, React-router-dom.
and backend using: cors, dotenv, express, pg, nodemon.

## Features

- Create Todo
- Update Todo
- Delete Todo
- Get Todos

### Setup
- Go to postgresql download website or download postgresql and install your system
- Go to search bar and type pgAdmin 4 to open and create a database and a collection named 'Items' and insert the data in the <code>server/db.js</code> file as a document.
- Create a .env file in the backend and type the following

```
    NODE_ENV = development
    PORT = 5000
    PG_USER = postgres
    PG_HOST = localhost
    PG_PORT = 5432
    PG_PASSWORD = [###############]
    PG_DATABASE = my-todos
```

## Installation and Usage

To run the application on your local machine, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/agatleogic/miscellaneous-work/tree/postgresql-react.git
   ```

2. Install the dependencies for server:

   ```
   cd server
   npm install
   ```
3. Install the dependencies for client:

   ```
   cd client
   npm install
   ```
  
### Running

After this you can run the project locally:

- To run the back end

   ```
   cd server
   npm run sever
   ```
- To run the front end

   ```
   cd client
   npm run start
   ```

## Tech Stack
- pg
- ReactJS
- NodeJS
- ExpressJS

4. Open [http://localhost:3000](http://localhost:3000) in your web browser.

## Contributing

Contributions to the project are welcome. If you find a bug or want to add a new feature, please create a new issue or pull request.
