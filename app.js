const express = require("express");
const dbInit = require("./controllers/dbInit");
const { getStats, getBar, getPie, getAll } = require("./controllers/get");
const app = express();
require("dotenv").config(); //initialize environment variables
port = process.env.PORT || 4000;

const conn = require("./db/db");
app.use(express.json()); //parse json
app.get("/", (req,res) => {
  res
    .status(200)
    .send(
      "<html><body><h1>Add a query param month to the routes</h1> <h3>/stats to get the statistics for a month</h3><h3>/bar to get data for bar chart</h3> <h3>/pie to get data for pie chart</h3><h3>/all to get all the data</h3><h4>Example : /bar/?month=jun</h4></body> </html>"
    );
});
app.get("/initialize", dbInit);
app.get("/stats", getStats);
app.get("/bar", getBar);
app.get("/pie", getPie);
app.get("/all", getAll);
app.get("*", (req,res) => {
  res.status(400).send("<h1>The route does not exist</h2>");
});

//start the server if database is connected
conn
  .then(() => {
    app.listen(port, () => {
      console.log("Server is online");
    });
  })
  .catch((err) => {
    console.log("I did");
    console.log(err);
  });
