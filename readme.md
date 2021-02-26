# Ticketup-api

## Description

This project is based on Express - Typescript

### Getting started

Install all dependencies using the following command:

```
yarn
```

Get a instance of your database up and running locally using the command:

```
yarn docker:run
```

After this all , you must start the application to ensure that the database is created by TypeOrm.
Right after you start the server, put it down and run

```
yarn migration:run
```

After this, the migrations will be persisted in the DB and you are able to start the local env ;)

Make sure you have an .env file, based on .env-example
PS: Its values must have be filled up before we are ready to go

Then finally get your app local running with the command:

```
yarn start:dev
```
