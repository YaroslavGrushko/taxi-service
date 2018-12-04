FROM mongo

COPY London_postcodes.csv /London_postcodes.csv
CMD mongoimport --host my-mongodb --db taxisService --collection clients --type csv --file /London_postcodes.csv --headerline

