const express = require("express");
const bodyParser = require("body-parser")
const port = 2000
const app = express()


app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

 let registeredUser = [];

app.get('/', (req, res)=>{
    req.url
    res.send("Hello there : " + req.url)
})

app.get("/all-users", (req, res)=>{
    if(registeredUser.length <= 0 ){
        return res.status(404).json({error: "No user registered yet!", status:false})
    }

    res.status(200).json({registeredUser})
})

app.post("/register", (req, res)=>{
    const {email, name, password, confirmPassword} = req.body;
    if(!email || !name || !password || !confirmPassword){
        return res.send("All fields are required!")
    }

    if(password !== confirmPassword){
        return res.send("Password doesn't match!")
    }

    const user = {email, name, password, confirmPassword};
    registeredUser.push(user)
    res.send(registeredUser)
})

app.delete("/delete-user/:name", (req, res)=>{
    const {name} = req.params;

//     var value = 3

// var arr = [1, 2, 3, 4, 5, 3]

// arr = arr.filter(function(item) {
//     return item !== value
// })


    registeredUser.filter((u)=> {
        if(u.name == name){
            const removedUser = u.name !== name;
            return res.status(200).json({msg:"Successfully deleted user", removedUser})
        }

        else{
            return res.status(404).json({error:"No user with that name"})
        }
    })
});

app.get("/:name", (req, res)=>{
    const {name}= req.params;
    registeredUser.filter((u)=>{
        if(u.name == name){
            return res.status(200).json({u})
        }else{
            return res.status(404).json({error:"No user with that name"})
        }
    })
})

app.listen(port, () => {
    console.log(`Server started on ${port}` );
});