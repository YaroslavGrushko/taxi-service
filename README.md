# taxi-service
node.js + mongoDb emulation of taxi service
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
7. open cmd in *taxi-service* folder and type **sh genBigData.sh** to generate 100000 records of taxis orders  
  
Waite untile it will has generated all interrapt with **ctrl+c**

