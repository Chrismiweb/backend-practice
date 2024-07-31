const express = require('express')
const bodyParser = require('body-parser')
const port = 1000
const mongoose = require("mongoose");



const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

const connectionString = ""
const connectDB = async(msg)=>{
    await mongoose.connect(connectionString);
    return msg
}

app.get('/',(req,res)=>{
    res.send("this app is working fine")
})

app.listen(port, async() => {
    console.log(`Server started on ${port}`);
    await connectDB("MongoDB connected!!")
});