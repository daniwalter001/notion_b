# Installation and setup guide

This project was initiated and developped by [daniwalter001](https://github.com/daniwalter001)

## Steps (developpement mode)

### 1 - Setup a PostgreSQL database

You will have to create a PostgreSQL database needed for the project to run. Informations like database name, root and root password will be used to fill the configuration file.

### 2 - Setup `.env` file

You will have to complete or custom the env file to make the project work on your own system. If not in the root folder, you must create a file named `.env`.

The default content:

    DB_NAME="" #
    DB_USERNAME=""
    DB_PASSWORD=""
    DB_HOST="localhost" #localhost for local project
    PORT="2000"

These variables are not meant to be null or empty

### 2 - `npm install`

You must be sure to have node and npm installed. Running this command will automatically download packages that are need to run the projects

### 3 - `nodemon`

To run the server, you should make sure to have nodemon installed. If not you can do so by running in your terminal as root `npm i -g nodemon`
