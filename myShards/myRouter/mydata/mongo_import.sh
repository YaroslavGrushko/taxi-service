#!/usr/bin/bash
## include --upsert if adding to a prexistitng collection
mongoimport --ssl --sslCAFile /sslkey/rootCA.pem --sslPEMKeyFile /sslkey/mongodb.pem --sslAllowInvalidCertificates -d taxisService -c clients --type csv --file /mydata/London_postcodes.csv --headerline --host localhost