const express = require("express");

const db = require("./db.js");
const router = require("./routes/mainrouter.js");
require("dotenv").config();
const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  kết nối database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + db.threadId);
});

app.use("/api", router);
// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
