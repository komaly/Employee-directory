# Employee Directory App

This project emulates an employee directory where the user can add, edit, delete, or search for employees.

## Prerequisites

[Docker](https://docs.docker.com/get-docker/)

[Docker-compose](https://docs.docker.com/compose/install/#install-compose)

[Python (optional)](https://www.python.org/downloads/)

## Set up

To set up the development environment run the following command from the project directory:

### `docker-compose up -d --build`

to build and bring up the Node, Mongo, and React services.

After the services are up, if you wish to populate the database with random employees, install python locally if needed and run the following command from the `scripts` folder:

### `python populateDatabase.py`

## Usage

The application is running on port 3000. If run with the default settings, navigate to `localhost:3000` in the browser to view the application.

## Tear down

To bring all services down, run this command in the project directory:

### `docker-compose down`

## Notes

The frontend of the app utilizes React, while the backend uses Node and Express, which then communicate with the MongoDB database.

