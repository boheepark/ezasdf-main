# ezasdf-main

test

useful commands

Start

    docker-compose build
    docker-compose up -d
    docker-compose run users-service python manage.py recreate_db
    docker-compose run users-service python manage.py seed_db
    docker-compose run users-service python maange.py test
    docker-compose run users-service python maange.py cov
    testcafe chrome e2e

Stop

    docker-compose stop
    docker-compose down
    docker rmi $(docker images -q)
    
Users DB

    docker-compose up -d --build users-db
    docker exec -ti users-db psql -U postgres -W
    
    
<a href="https://github.com/DevExpress/testcafe">
    <img alt="Tested with TestCafe" src="https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg">
</a>