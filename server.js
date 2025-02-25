const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bodyParser = require("body-parser");
const cors = require("cors");
const { CURSOR_FLAGS } = require("mongodb");

// Define the CORS options
const corsOptions = {
  credentials: true,
  origin: ["https://firm777.com", "http://localhost:5500","http://127.0.0.1:5500/"], // Whitelist the domains you want to allow
};

app.use(cors(corsOptions)); // Use the cors middleware with your options
const User = mongoose.model("user", {
  id: ObjectId,
  Phone: Number,
  Name: String,
  Promocode: String,
  Date: Date,
});

const Phone = mongoose.model("phone", {
  ID: ObjectId,
  Phone: Number,
});

const uri =
  "mongodb+srv://RahulSrivastava2001:firm777@contacts.of9gofw.mongodb.net/";
app.use(bodyParser.json());
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  });

app.get("/", function (req, res) {
  res.send("Hello World New server ");
});

app.get("/users", async (req, res) => {
  let Users = await User.find({});
  return res.send(Users);
});

app.post("/createUser", async (req, res) => {
  const newUser = new User({
    Name: req.body.name,
    Phone: req.body.phone,
    Promocode: req.body.promocode,
  });

  let newUserData = await newUser.save();
  return res.send(newUserData);
});

app.post("/updatePhone", async (req, res) => {
  const newPhone = await Phone.findByIdAndUpdate(
   "67a482965479c969bf7d264d",
    {
      Phone: req.body.Phone,
    }
  );


  const getPhone =await Phone.findOne({id:"67a482965479c969bf7d264d"})

  console.log('====================================');
  console.log(newPhone,req.body.Phone, getPhone);
  console.log('====================================');

  return res.send(newPhone);
});

app.get("/getPhone", async (req,res)=>{
  const getPhone= await Phone.findById("67a482965479c969bf7d264d")

  return res.send(getPhone)

})

app.listen(port, () => {
  console.log("connect in ", port);
});
