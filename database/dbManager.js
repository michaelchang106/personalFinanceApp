const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require("dotenv").config({ path: "./credentials.env" });

function dbManager() {
  const database = {};
  const dbName = "UserLoginDB";
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@personalfinance.llaag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  const url = uri;
  // const url = "mongodb://localhost:27017";
  const collectionUser = "userlogindbs";
  const collectionBudgetActual = "actualbudgetdatas";

  database.addUser = async (userInfo) => {
    const client = await new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
        await actualBudget.insertOne({ userID: userInfo.userID, actualItems: [] });
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
    let client = await new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); //connect to mongoClient using our url.
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

  // ---------------- Income methods ------------------------
  database.addIncomeInfo = async (loginInfo) => {
    let client = await new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      await client.connect(); // establish a connection to the server
      console.log("Connected!");
      const db = client.db(dbName);
      const collection = await db.collection(collectionUser);

      // query and update definitions
      const query = { userID: loginInfo.userID };
      const update = {
        $set: {
          incomeData: {
            salary: loginInfo.salary,
            state: loginInfo.state,
            marital: loginInfo.marital,
          },
        },
      };
      const options = { upsert: true };

      //query and update into database
      await collection.findOneAndUpdate(query, update, options);

      console.log("Udpated Income Info!");
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      await client.close();
      console.log("Closing the connection");
    }
  };

  database.deleteIncomeInfo = async (loginInfo) => {
    let client = await new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      await client.connect(); // establish a connection to the server
      console.log("Connected!");
      const db = client.db(dbName);
      const collection = await db.collection(collectionUser);

      // query and update definitions
      let query = { userID: loginInfo.userID };
      let update = { $unset: { incomeData: "" } };

      await collection.findOneAndUpdate(query, update);

      console.log("Deleted Income Info!");
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      await client.close();
      console.log("Closing the connection");
    }
  };

  // ---------------- Login methods ------------------------
  database.findUser = async (username) => {
    let client = await new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      await client.connect(); // establish a connection to the server
      console.log("Connected!");
      const db = client.db(dbName);
      const collection = await db.collection(collectionUser);

      // query and update definitions
      let query = { userID: username };

      //query into database and return userInfo
      const userInfo = await collection.findOne(query);
      console.log("Got the user's info from DB!!");
      return userInfo;
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      await client.close();
      console.log("Closing the connection");
    }
  };

  // ---------------- Actual Card Item methods ------------------------
  database.addActualItem = async (actualItem) => {
    let client = await new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      await client.connect(); // establish a connection to the server
      console.log("Connected!");
      const db = client.db(dbName);
      const collection = await db.collection(collectionBudgetActual);

      // query, update, option definitions
      const query = { userID: actualItem.userID };

      let result = await collection.findOne(query);

      // change result = to list of actualItems and push new item and sort
      result = result.actualItems;

      result.push({
        vendor: actualItem.vendor,
        date: actualItem.date,
        amount: actualItem.amount,
        category: actualItem.category,
      });
      result.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

      const update = {
        $set: {
          actualItems: result,
        },
      };
      const options = { returnNewDocument: true, upsert: true };

      //query and update into database
      await collection.findOneAndUpdate(query, update, options); // this returns something weird
      const itemInfo = await collection.findOne(query);
      console.log("Added the user's Actual Item!!");
      return itemInfo;
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      await client.close();
      console.log("Closing the connection");
    }
  };

  database.getActualItem = async (user) => {
    let client = await new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      await client.connect(); // establish a connection to the server
      console.log("Connected!");
      const db = client.db(dbName);
      const collection = await db.collection(collectionBudgetActual);

      // query, update, option definitions
      const query = { userID: user.userID };

      //query and update into database
      const itemInfo = await collection.findOne(query);
      console.log("Got user's the Actual Items!!");
      return itemInfo;
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      await client.close();
      console.log("Closing the connection");
    }
  };

  database.deleteActualItem = async (userAndItem) => {
    let client = await new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      await client.connect(); // establish a connection to the server
      console.log("Connected!");
      const db = client.db(dbName);
      const collection = await db.collection(collectionBudgetActual);

      // query definitions
      const query = { userID: userAndItem.userID };

      //query into database
      let result = await collection.findOne(query);
      // change result = to list of actualItems
      result = result.actualItems.sort(
        (a, b) => Date.parse(a.date) - Date.parse(b.date)
      );

      //delete the item in index
      result.splice(userAndItem.itemIndex, 1);

      // update, options definitions
      const update = {
        $set: {
          actualItems: result,
        },
      };
      const options = { returnNewDocument: true, upsert: true };

      //query and update into database
      await collection.findOneAndUpdate(query, update, options); // this returns something weird
      const itemInfo = await collection.findOne(query);
      console.log("Deleted the user's actual item!");
      return itemInfo;
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      await client.close();
      console.log("Closing the connection");
    }
  };

  database.editActualItem = async (actualItemToEdit) => {
    let client = await new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      await client.connect(); // establish a connection to the server
      console.log("Connected!");
      const db = client.db(dbName);
      const collection = await db.collection(collectionBudgetActual);

      // query definitions
      const query = { userID: actualItemToEdit.userID };

      //query into database
      let result = await collection.findOne(query);
      // change result = to list of actualItems
      result = result.actualItems.sort(
        (a, b) => Date.parse(a.date) - Date.parse(b.date)
      );

      result[actualItemToEdit.index] = {
        vendor: actualItemToEdit.vendor,
        date: actualItemToEdit.date,
        amount: actualItemToEdit.amount,
        category: actualItemToEdit.category,
      };

      // update, options definitions
      const update = {
        $set: {
          actualItems: result,
        },
      };
      const options = { returnNewDocument: true, upsert: true };

      //query and update into database
      await collection.findOneAndUpdate(query, update, options); // this returns something weird
      const updatedItem = await collection.findOne(query);

      console.log("Got user's the Actual Items!!");
      return updatedItem;
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      await client.close();
      console.log("Closing the connection");
    }
  };

  // ---------------- Budget methods ------------------------

  database.addBudgetItem = async (budgetItem) => {
    let client = await new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
      const result = await collection.findOne(query);

      console.log("--->Added item to budget: ", result.budgetItems);
      return await result.budgetItems; // BECAUSE FindOneAndUpdate adds weird value field (not found in the db).
    } finally {
      await client.close();
      console.log("Closing the connection");
    }
  };

  database.getBudgetItem = async (user) => {
    let client = await new MongoClient(url, { useUnifiedTopology: true });
    try {
      console.log("adding item to budget");
      //connect to mongoClient using our url.
      console.log("Connecting to the db");
      await client.connect(); // establish a connection to the server
      console.log("Connected!");
      const db = client.db(dbName);
      const collection = await db.collection(collectionBudgetActual);
      const result = await collection.findOne(user);

      console.log("Loading Data");
      if (result.budgetItems === undefined) {
        console.log("---------->No Data");
        return null;
      }
      console.log("---------->Found Data");
      return result;
    } finally {
      await client.close();
      console.log("Closing the connection");
    }
  };

  database.deleteBudgetItem = async (user) => {
    let client = await new MongoClient(url, { useUnifiedTopology: true });
    try {
      console.log("adding item to budget");
      //connect to mongoClient using our url.
      console.log("Connecting to the db");
      await client.connect(); // establish a connection to the server
      console.log("Connected!");
      const db = client.db(dbName);
      const collection = await db.collection(collectionBudgetActual);

      let result = await collection.findOne({ userID: user.userID });
      let budgetItemtoRm = result.budgetItems;

      await budgetItemtoRm.splice(user.index, 1); //This is to remove at index
      await collection.updateOne(
        { userID: user.userID },
        { $set: { budgetItems: budgetItemtoRm } }
      );

      result = await collection.findOne({ userID: user.userID });

      return result;
    } finally {
      await client.close();
      console.log("Closing the connection");
    }
  };

  return database;
}
module.exports = dbManager();
