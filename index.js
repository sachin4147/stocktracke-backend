const express = require('express');
const connection=require("./config/db")
const StockRouter=require("./Routes/StockRouter")
require("dotenv").config()
const cors=require("cors")
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api",StockRouter)

// Start the server
app.listen(PORT, async() => {
    try {
       await connection
        console.log("db connected")
    } catch (err) {
        console.log(err)
    }
  console.log(`Server is running on http://localhost:${PORT}`);
});