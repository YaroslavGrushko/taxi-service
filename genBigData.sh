#!/bin/bash

# launch taxi-service (taxi-service.js) to init Big Data:
docker-compose exec router sh -c "mongo  --ssl --sslAllowInvalidCertificates --sslCAFile /sslkey/rootCA.pem --sslPEMKeyFile /sslkey/mongodb.pem -u yar -p mypwd --authenticationDatabase 'taxisService' --host localhost < /scripts/service/taxi-service.js"
