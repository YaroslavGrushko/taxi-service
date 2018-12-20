# taxi-service
mongoDb emulation of taxi service ( ***this project only toy;)*** )
# Structure  
- mongo cluster:  
with 3 config servers + 3 shards (1 rep set with every) + 1 router (mongos)  
- ssl to applyed to any of servers of this cluster (to config servers, to shards, to mongos)
- authentification applyed to db - "taxisService"
- mongo shell script {myShards/myRouter/scripts/service/taxi-service.js} (launched on mongos) that generete Big Data (***3-4GB*** of text files and 10000000 of documents) - is launched with **sh genBigData.sh** command in root directory of project.   
      This script emulates clients orders to a taxi service (one order is longitude and latitude coordinates of destination point of trip {this data inserts to ***taxisService.orders*** collection}). Also this script emulates tracks of taxi movement (5 points of longitude/latitude){this data inserts to ***taxisService.tracks*** collection} 
 - you can see tracks (from ***taxisService.tracks*** collection) of movement of taxis with ***node.js*** server + google maps api {NOTE: but you have to get your *personal key* from google maps api}.    

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

***Launch visualization of taxis movement***  
8. get your personal google api map key
9. paste it to instead *YOUR_API_KEY_HERE* in taxi-service/server/front/index.html
10. install node.js on your OS
11. go to taxi-service/server and launch in terminal **npm install** to install dependencies for node.js server
12. open port *5000* on your windows firewall
13. go to taxi-service/server and launch in terminal **npm start** to launch server on port *localhost:5000*
14. open browser (google chroome for example) and type **localhost:5000/home**
15. press fetchDb button to fetch *tracks* data from taxisService.tracks collection from mongos
16. press move to see one step movement of taxi

That's all. Hope this helps you:)
