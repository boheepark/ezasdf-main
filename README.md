# ezasdf-main

useful commands

Start

    docker-compose build
    docker-compose up -d
    docker-compose up -d --build
    docker-compose run users-service flask recreate_db
    docker-compose run users-service flask seed_db
    docker-compose run users-service flask test
    testcafe chrome e2e

Stop

    docker-compose stop
    docker-compose down
    docker rmi $(docker images -q)

Users DB

    docker-compose up -d --build users-db
    docker exec -it users-db psql -U postgres -W


[![Build Status](https://travis-ci.org/boheepark/ezasdf-main.svg?branch=master)](https://travis-ci.org/boheepark/ezasdf-main)

<a href="https://github.com/DevExpress/testcafe">
    <img alt="Tested with TestCafe" src="https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg">
</a>
