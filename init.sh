#!/bin/bash

# init configuration of mongo cluster
docker-compose exec config01 sh -c "mongo --ssl --sslAllowInvalidCertificates --sslCAFile /sslkey/rootCA.pem --sslPEMKeyFile /sslkey/mongodb.pem --host localhost --port 27017 < /scripts/init-configserver.js"

# docker-compose exec shard01a sh -c "mongo --ssl --sslAllowInvalidCertificates --sslPEMKeyFile /sslkey/mongodb.pem --host localhost --port 27018 < /scripts/init-shard01.js"

docker-compose exec shard01a sh -c "mongo --ssl --sslAllowInvalidCertificates --sslCAFile /sslkey/rootCA.pem --sslPEMKeyFile /sslkey/mongodb.pem --host localhost --port 27018 < /scripts/init-shard01.js"
docker-compose exec shard02a sh -c "mongo --ssl --sslAllowInvalidCertificates --sslCAFile /sslkey/rootCA.pem --sslPEMKeyFile /sslkey/mongodb.pem --host localhost --port 27019 < /scripts/init-shard02.js"
docker-compose exec shard03a sh -c "mongo --ssl --sslAllowInvalidCertificates --sslCAFile /sslkey/rootCA.pem --sslPEMKeyFile /sslkey/mongodb.pem --host localhost --port 27020 < /scripts/init-shard03.js"
sleep 20
docker-compose exec router sh -c "mongo --ssl --sslAllowInvalidCertificates --sslCAFile /sslkey/rootCA.pem  --sslPEMKeyFile /sslkey/mongodb.pem --host localhost --port 27017 < /scripts/init-router.js"

