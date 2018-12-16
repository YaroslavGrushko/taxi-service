admin = db.getSiblingDB("admin");
admin.createUser({
    user: "admin",
    pwd: "mypwd",
    roles: [
      { role: "clusterAdmin", db: "admin" },
      { role: "userAdmin", db: "admin" }
    ]
  });