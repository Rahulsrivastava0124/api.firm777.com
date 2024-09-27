const mongoose = require('mongoose');
const express = require('express')
const app = express();
const port = 3000;
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bodyParser = require('body-parser');


const User = mongoose.model('user', {
    id: ObjectId,
    Phone: Number,
    Name: String,
    Promocode: String,
    Date: Date,
});

const uri = "mongodb+srv://RahulSrivastava2001:firm777@contacts.of9gofw.mongodb.net/";
app.use(bodyParser.json());
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to MongoDB");
})

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/users', async (req, res) => {
    let Users = await User.find({})
    return res.send(Users)
})

app.post('/createUser', async (req, res) => {
    const newUser = new User({
        Name: req.body.name,
        Phone: req.body.phone,
        Promocode: req.body.promocode,
    })
    let newUserData = await newUser.save()
    return res.send(newUserData)
})

app.listen(port, () => {
    console.log("connect in ", port);
})
