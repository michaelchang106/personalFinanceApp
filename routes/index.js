let express = require("express");
let router = express.Router();

// for login encryption
const bcrypt = require("bcrypt");

// for database connection
const dbManager = require("../database/dbManager.js");

// -----------------------FOR FILE UPLOAD - WORK IN PROGRESS -------------------
// const multer = require("multer");
// const upload = multer({dest: "uploads/"});

// //UPLOAD A FILE POST GUIDE
// router.post(
//   "/uploadFile",
//   upload.single("receiptImage"),
//   async function (req, res) {
//     console.log(req.file);
//     try {
//       await mongoose.connect("mongodb://localhost/UserLoginDB");
//     } catch {
//       res.status();
//     } finally {
//       await mongoose.connection.close();
//     }

//     res.send();
//   }
// );

// for storage on server, but storing on mongoDB
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "./uploads/");
//   },
//   filename: (req, file, callback) => {
//     callback(null, new Date().toISOString() + file.originalname);
//   },
// });

// const fileFilter = (req, file, callback) => {
//   //reject a file
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/svg" ||
//     file.mimetype === "image/webp" ||
//     file.mimetype === "application/pdf"
//   ) {
//     callback(null, true);
//   } else {
//     callback(new Error("jpeg, png, svg, webp, pdf only"), false);
//   }
// };

// const upload = multer({
//   limits: { fileSize: 1024 * 1024 * 10 },
//   storage: storage,
//   fileFilter: fileFilter,
// });

// ------------------------------ROUTES-----------------------------------

/* GET home page. */
router.get("/", function (req, res) {
  res.sendFile("index.html");
});

// ----------INCOME ROUTES------------

/* FETCH POST incomePost*/
router.post("/incomePost", function (req, res) {
  console.log("ANONOMYOUS POST INCOME -- POST");
  res.status(200).send();
});

/* FETCH POST userIncomePost*/
router.post("/userIncomePost", async function (req, res) {
  console.log("USER POST INCOME -- POST");
  const loginInfo = req.body;
  try {
    dbManager.addIncomeInfo(loginInfo);

    const salary = loginInfo.salary;
    const state = loginInfo.state;
    const marital = loginInfo.marital;

    res.json(salary, marital, state);
  } catch (error) {
    console.log("Caught an error!", error);
    res.send(error);
  }
});

/* FETCH POST deleteUserIncome*/
router.post("/deleteUserIncome", async function (req, res) {
  console.log("USER DELETE INCOME -- POST");
  const loginInfo = req.body;
  try {
    dbManager.deleteIncomeInfo(loginInfo);

    res.send();
  } catch (error) {
    console.log("Caught an error!", error);
    res.send(error);
  }
});

// ----------LOGIN ROUTES------------
/* FETCH POST loginPost*/
router.post("/loginPost", async function (req, res) {
  const loginInfo = req.body;

  //check if username exists
  try {
    let record = await dbManager.findUser(loginInfo.username); //SHOULD THIS BE USERNAME OR USERID?

    bcrypt.compare(loginInfo.password, record.password, (err, result) => {
      if (result) {
        res.json(record);
      } else {
        res.json({ error: "Password does not match our records" });
      }
    });
  } catch (error) {
    console.log("Caught an error!", error);
    res.json({ error: "User not found" });
  }
});

// ----------ACTUAL CARD ITEM ROUTES------------

/* FETCH POST actualItemsPost*/
router.post("/actualItemsPost", async function (req, res) {
  console.log("ACTUAL ITEM CARD -- POST");
  const actualItem = req.body;

  try {
    let record = await dbManager.addActualItem(actualItem);
    res.json(record);
  } catch (error) {
    console.log("Caught an error!", error);
    res.send(error);
  }
});

/* FETCH POST actualItemsGet*/
router.post("/actualItemsGet", async function (req, res) {
  console.log("ACTUAL ITEM CARD -- GET");
  const user = req.body;

  try {
    let record = await dbManager.getActualItem(user);

    res.json(record);
  } catch (error) {
    console.log("Caught an error!", error);
    res.send(error);
  }
});

// ----------BUDGET CARD ITEM ROUTES------------

// Budget Item Post
router.post("/budgetItem/post", (req, res) => {
  console.log("BUDGET ITEM CARD -- POST");
  dbManager.addBudgetItem(req.body);
});

// TRYING TO SORT THE LIST OF ACTUAL ITEMS

// let actualItems = record.actualItems;
// console.log(actualItems);

// try {
//   console.log("TRYING TO SORT");
//   actualItems = actualItems.sort("-date").exec(function (err, docs) {
//     if (err) {
//       return err;
//     }
//     return docs;
//   });
// } catch (err) {
//   console.log("CAUGHT AN ERROR");
//   console.log(err);
//   err.stack;
// }

// console.log(typeof actualItems);
// console.log(actualItems);

module.exports = router;
