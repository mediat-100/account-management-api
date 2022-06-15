# Account Management API

This Account Management API performs the following operations;
- A user can create an account
- A user can fund their account
- A user can transfer funds to another user's account
- A user can withdraw funds from their account

## Developed With

- NodeJs
- ExpressJs
- SequelizeOrm
- PostgreSQL

## Installation

Clone this repository

```bash
    git clone https://github.com/mediat-100/account-management-api
```

Move into the project directory and install its dependencies

```bash
  npm install
```


## Setting up config

Create a `.env` file and copy the contents of `.env.example` into it
Also ensure you have pgAdmin installed on your machine 
If you don't, install pgAdmin on your machine using this link https://www.pgadmin.org/download/

- **PORT** : You can set it to `8000`.
- **JWT_SECRET** : This could be anything e.g `myaccountWebApp`.
- **DB_USERNAME** : This is the username you set while installing pgAdmin. If you didn't set any username, the username is `postgres` by default.
- **DB_PASSWORD** : This is the password you set while installing pgAdmin.
- **DB_DATABASE** : This is the name of your database, you can create a database using the pgAdmin.


## Run Locally

1. Start up the server - Run `npm start` 
2. Server should be running on http://localhost:8000/ by default


## Routes

These routes can be tested using postman; 
1. Download and install postman https://www.postman.com/downloads/
2. Run each routes below e.g localhost:8000/api/v1/users/signup 
3. For the authenticated routes, copy the token you get when a user is logged in to the headers i.e `headers key = x-auth-token and headers value = token`


|            Routes                         |        Description                       |    Authenticated   |
| ----------------------------------------- | ---------------------------------------  | ------------------ |
| [POST] /api/v1/users/signup               | Create a new user                        | No                 |
| [POST] /api/v1/users/login                | Login a user                             | No                 |
| [POST] /api/v1/accounts                   | Create account details                   | Yes                |
| [GET] /api/v1/accounts                    | Get account summary of a user            | Yes                |
| [POST] /api/v1/transactions/deposit       | Fund a user's account                    | Yes                |
| [POST] /api/v1/transactions/withdraw      | Withdraw funds from a user's account     | Yes                |
| [POST] /api/v1/transactions/transfer      | Transfer funds to another user's account | Yes                |