db.createUser({
    user: "root",
    pwd: "example",
    roles: [{role: "readWrite", db: "top_music" }]
});

db.users.createIndex({email:1}, {unique:true})