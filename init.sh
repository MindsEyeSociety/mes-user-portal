#!/bin/bash

echo 'Running migration.'
knex migrate:latest

echo 'Inserting seed data.'
knex seed:run

echo 'Starting application.'
nodemon app.js
