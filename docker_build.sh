#!/bin/sh


if [ "$TRAVIS_BRANCH" == "development" ];
then
    docker login -u $DOCKER_ID -p $DOCKER_PASSWORD
    docker pull $DOCKER_ID/$USERS:development
    docker pull $DOCKER_ID/$USERS_DB:development
    docker pull $DOCKER_ID/$CLIENT:development
    docker pull $DOCKER_ID/$SWAGGER:development
    docker pull $DOCKER_ID/$NGINX:development
fi

docker-compose -f docker-compose-ci.yml up -d --build