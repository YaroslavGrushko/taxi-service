#!/bin/bash

# launch taxi-service (taxi-service.js) to init Big Data:
docker-compose exec router sh -c "mongo taxisService < /scripts/service/taxi-service.js"
