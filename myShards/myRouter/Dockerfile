FROM mongo

COPY mydata /mydata
COPY scripts /scripts
COPY sslkey /sslkey

#CMD cd /etc/ssl/

#The first step is to create the private root key:
#openssl genrsa -out rootCA.key 2048
#let's self signed CA:
#openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 365 -out rootCA.pem

#Create A Certificate (Done Once Per Device)
#CMD openssl req -newkey rsa:2048 -new -x509 -days 365 -nodes -out mongodb-cert.crt -keyout mongodb-cert.key
#CMD cat mongodb-cert.key mongodb-cert.crt > mongodb.pem
#CMD cp mongodb.pem ../../sslkey

#enable Auth:
#openssl rand -base64 755 > <path-to-keyfile>
#chmod 400 <path-to-keyfile>

EXPOSE 27017