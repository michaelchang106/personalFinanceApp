# Personal Finance Application

## Objective:

An application that's provides a tax calculator that calculates calculate taxes based on income, state location, and domicile status - guest and members of the site can use this tool.

As a registered user, you can log your expected budget, which the data will be saved for later use. Similarly, you can log actual expenses, which are also stored. If you make mistake logging data, you can delete/edit a budget or acutal item at any time.

## Project URL:

## Local Execution

- Download/clone this project from [Personal Finance GithHub Repo](https://github.com/djlisko01/personalFinanceApp).
- Make sure to install node.js, which will come with node project manager (npm).
- Change to the folder where you download the applicaiton using the OS terminal.
- Type in the terminal `npm install` to install all the dependencies.
- Type in the terminal `npm start` to start the server.
- In your favorite browser go to http://localhost:3000/.

## Youtube Video

## Project Images

## Google Slides

## SQL queries used to query information from our database with test data (DML)

[Various SQL query demonstrations](./database/sql_queries.sql):

- showing join of at least three tables
- subqueries
- group by with a having clause
- complex search criterion

## Screenshots showing functionality of constraints

## Folder Content:

### Actuals

- Contains all the JavaScript code for rendering a ACTUAL form, which can be used to log actual data input from the user. Data inputed from the user is then stored in a Mongo Database, which is retrieved and rendered to the main page when a user logs in. New input data is also rendered as soon as a user inputs values.

### Budget

- Contains all the JavaScript code for rendering a BUDGET form, which can be used to log budget data input from the user. Data inputed from the user is then stored in a Mongo Database, which is retrieved and rendered to the main page when a user logs in. New input data is also rendered as soon as a user inputs values.

### Income Tax

### Login

- Contains JavaScript code that checks if a user exist in the database, if they do, the users budget and actual data will be loaded if it exist in the database. If the user doesn't exist, then an alert is sent and the user is kept at the homepage.

### Signup

- Contains JavaScript that allows a user to create an account with our app. When a user attempts to create an account, a database is checked to see if the user name is available or not. If the user name is available, then the users info is stored in the database and directed to the homepage.

## Division of works and tasks

### Both team members collaborated and contributed evenly on the design and implementation of the MongoDB database and CSS styling.

### [Michael Chang](https://github.com/michaelchang106)

### [Daniel Lisko](https://github.com/djlisko01)
