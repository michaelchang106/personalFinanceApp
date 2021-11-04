const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

// creat users info

function dbManager() {
  const database = {};
  const dbName = "UserLoginDB";
  const url = process.env.MONGO_URL || "mongodb://localhost:27017";
  const collectionUser = "userlogindbs";
  const collectionBudgetActual = "actualbudgetdatas";

  database.addUser = async (userInfo) => {
    const client = await new MongoClient(url, { useUnifiedTopology: true });
    try {
      console.log("searching....");
      let value = await database.searchUser({ userID: userInfo.userID }); // Check if user is in the db.
      // Connect to MongoDB, db, and finally the collection
      await client.connect();
      console.log("connected to MongoDB");
      const db = await client.db(dbName);
      console.log("connected to database");
      const user = await db.collection(collectionUser);
      const actualBudget = await db.collection(collectionBudgetActual);

      if (value === null) {
        await user.insertOne(userInfo);
        console.log(`user ${userInfo.userID} added to database`);
        await actualBudget.insertOne({ userID: userInfo.userID });
        return false;
      } else {
        console.log(`user name: ${userInfo.userID} already in use`);
        return true;
      }
    } finally {
      console.log("closing mongoose connection");
      await client.close();
      console.log("clossed");
    }
  };

  database.searchUser = async (query) => {
    let client = await new MongoClient(url, { useUnifiedTopology: true }); //connect to mongoClient using our url.
    try {
      console.log("Connecting to the db");
      await client.connect(); // establish a connection to the server
      console.log("Connected!");
      const db = client.db(dbName); //select specific database
      const usersCol = db.collection(collectionUser); //get the collection

      console.log("Collection ready, querying with ", query);
      const users = await usersCol.findOne(query); //findOne instance of a user
      console.log("Got users", users);
      return users;
    } finally {
      console.log("Closing the connection");
      await client.close();
    }
  };

  // ---------------- Budget methods ------------------------

  database.addBudgetItem = async (budgetItem) => {
    let client = await new MongoClient(url, { useUnifiedTopology: true });
    try {
      console.log("adding item to budget");
      //connect to mongoClient using our url.
      console.log("Connecting to the db");
      await client.connect(); // establish a connection to the server
      console.log("Connected!");
      const db = client.db(dbName);
      const collection = await db.collection(collectionBudgetActual);

      let query = { userID: budgetItem.userID };
      let update = {
        $push: {
          budgetItems: {
            date: budgetItem.date,
            amount: budgetItem.amount,
            category: budgetItem.category,
          },
        },
      };
      let option = { returnNewDocument: true, upsert: true };

      await collection.findOneAndUpdate(query, update, option);
      console.log("--->Added item to budget");
    } finally {
      await client.close();
      console.log("Closing the connection");
    }
  };

  return database;
}

module.exports = dbManager();
