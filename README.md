# taxi-service
mongoDb emulation of taxi service (***this project only toy;)***) 
# Stracture  
- mongo cluster:  
with 3 config servers + 3 shards (1 rep set with every) + 1 router (mongos)  
- ssl to applyed to any of servers of this cluster (to config servers, to shards, to mongos)
- authentification applyed to db - "taxisService"
- mongo shell script {myShards/myRouter/scripts/service/taxi-service.js} (launched on mongos) that generete Big Data (***3-4GB*** of text files and 10000000 of documents) - is launched with **sh genBigData.sh** command in root directory of project.   
      This script emulates clients orders to a taxi service (one order is longitude and latitude coordinates of destination point of trip {this data inserts to ***taxisService.orders*** collection}). Also this script  

# Get started

1. Download project with **git clone https://github.com/YaroslavGrushko/taxi-service.git**  command  
***launch mongo cluster:***
2. navigate to *taxi-service* 
3. build mongo cluster with **docker-compose build**  
4. run mongo cluster with **docker-compose up**  
5. open new cmd in *taxi-service* and configure mongo cluster with **sh init.sh**  
6. push data to db and launch sharding with **sh initData.sh**  
*Mongo cluster is Ok now!*   
***launch emulation of "taxis" service (Uber like:))***  
7. open cmd in *taxi-service* folder and type **sh genBigData.sh** to generate 10000000 records of taxis orders  
  
Waite untile it will has generated all interrapt it with **ctrl+c**


