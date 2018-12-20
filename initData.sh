#!/bin/bash

# push data to taxisService db: 
docker-compose exec router sh -c "sh < /mydata/mongo_import.sh"
sleep 30
# enable sharding for taxisService Db
docker-compose exec router sh -c "mongo --ssl --sslAllowInvalidCertificates --sslCAFile /sslkey/rootCA.pem --sslPEMKeyFile /sslkey/mongodb.pem --host localhost < /scripts/enSharding/useDb.js"
