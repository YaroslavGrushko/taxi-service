sh.addShardToZone("shard02", "ORD1")
sh.addShardToZone("shard02", "ORD2")
sh.addShardToZone("shard02", "ORD3")
sh.addShardToZone("shard03", "TRA1")
sh.addShardToZone("shard03", "TRA2")
sh.addShardToZone("shard03", "TRA3")
sh.addShardToZone("shard03", "TRA4")
sh.addShardToZone("shard03", "TRA5")
printjson("Zones added");
sh.updateZoneKeyRange("taxisService.orders", { zip: 1 }, { zip: 3 }, "ORD1");
sh.updateZoneKeyRange("taxisService.orders", { zip: 3 }, { zip: 6 }, "ORD2");
sh.updateZoneKeyRange("taxisService.orders", { zip: 6 }, { zip: 10 }, "ORD3");
sh.updateZoneKeyRange("taxisService.tracks", { zip: 10 }, { zip: 13 }, "TRA1");
sh.updateZoneKeyRange("taxisService.tracks", { zip: 13 }, { zip: 16 }, "TRA2");
sh.updateZoneKeyRange("taxisService.tracks", { zip: 16 }, { zip: 19 }, "TRA3");
sh.updateZoneKeyRange("taxisService.tracks", { zip: 19 }, { zip: 22 }, "TRA4");
sh.updateZoneKeyRange("taxisService.tracks", { zip: 22 }, { zip: 25 }, "TRA5");
printjson("Zones Ranges updated");
sh.enableSharding("taxisService");
printjson("taxisService sharded");
sh.shardCollection("taxisService.orders", { zip: 1 } );
sh.shardCollection("taxisService.tracks", { zip: 1 } );
printjson("collections are sharded");
admin = db.getSiblingDB("admin");
admin.createUser({user: "admin", pwd: "mypwd", roles: [{ role: "clusterAdmin", db: "admin" }, { role: "userAdmin", db: "admin" }]});
db.getSiblingDB("taxisService").createUser({"user": "yar", "pwd": "mypwd", "roles": [{ "role" : "readWrite", "db" : "taxisService" }]});