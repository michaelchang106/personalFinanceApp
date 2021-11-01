const mongodb = require("mongodb");
const mongoose = require("mongoose");
const MongoClient = mongodb.MongoClient;
const userLoginInfo = require("./userSchema.js");

// creat users info

function dbManager() {
  const db = {};
  const dbName = "UserLoginDB";
  const url = "mongodb://localhost:27017";
  const collectionName = "userlogindbs";

  db.addUser = async (userInfo) => {
    try {
      let value = await db.searchUser({ userID: userInfo.userID });
      await mongoose.connect("mongodb://localhost/UserLoginDB");
      console.log("connected to mongoose:", value);
      if (value === null) {
        await userLoginInfo.create(userInfo);
        console.log(`user ${userInfo.userID} added to database`);
        return false;
      } else {
        console.log(`user name: ${userInfo.userID} already in use`);
        return true;
      }
    } finally {
      console.log("closing mongoose connection");
      mongoose.connection.close();
      console.log("clossed");
    }
  };

  // db.addUser = async (userInfo) => {
  //   //Connect using mongoose b/c has restrictions.
  //   db.searchUser({ userID: userInfo.userID }) //Check if a user exists.
  //     .then((value) => {
  //       if (value === null) {
  //         mongoose.connect("mongodb://localhost/UserLoginDB").then((value) => {
  //           console.log("mongoose connected ", value);
  //           userLoginInfo.create(userInfo, async (err, userInfo) => {
  //             if (err) throw err;
  //             console.log("Following added to database: ", userInfo);
  //           });
  //         });
  //       } else {
  //         console.log("user name exist", value);
  //       }
  //     })
  //     .finally(mongoose.connection.close()); //Close connection when done!
  // };

  db.searchUser = async (query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true }); //connect to mogoClient
      console.log("Connecting to the db");
      await client.connect(); // establish a connection to the server
      console.log("Connected!");
      const db = client.db(dbName); //select specific database
      const usersCol = db.collection(collectionName); //get the collection

      console.log("Collection ready, querying with ", query);
      const users = await usersCol.findOne(query); //findOne instance of a user
      console.log("Got users", users);
      return users;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  return db;
}

module.exports = dbManager();
