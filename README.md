# miscellaneous-work

# QuotesApp-React-Graphql-mongoos
create quote app in react using: graphql, @apollo/client, ReactJS, React-router-dom.
and backend using: graphql, apollo-server, apollo-server-core, pollo-server-express, bcryptjs, dotenv, express, jsonwebtoken, mongoose, nodemon.

## Features

- User authentication and authorization(JWT)
- Create Qoute
- Update Qoute
- Delete Qoute
- Get all Qoutes & Qoutes by user

### Setup

- Create a .env file in the backend and type the following

```
    NODE_ENV = development
    PORT = 4000
    MONGO_URI = mongodb://localhost:5000/[databaseName]
    JWT_SECRET = [####################]
```

## Installation and Usage

To run the application on your local machine, follow these steps:

1. Clone the repository:

   ```
   git clone https:/github.com/agatleogic/miscellaneous-work.git
   ```

2. Install the dependencies for server:

   ```
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
   npm run sever
   ```
- To run the front end

   ```
   cd client
   npm run start
   ```

## Tech Stack
- MongoDB
- ReactJS
- NodeJS
- Graphql
- Apollo-Server

4. Open [http://localhost:3000](http://localhost:3000) in your web browser.

## Contributing

Contributions to the project are welcome. If you find a bug or want to add a new feature, please create a new issue or pull request.
