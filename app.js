// setup... similar to default tags in html
const express = require('express')
const Song = require("./models/songs")
var cors = require('cors')
//const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const User = require("./models/users")

//tells app variable to be an express server
//const bodyParser = require('body-parser')
const app = express();
app.use(cors())

//middleware
app.use(express.json());
const router = express.Router();
const secret = "superSecret"

//creating a new user
router.post("/users", async(req, res) =>{
    if(!req.body.username || !req.body.password){
       res.status(400).json({err: "Missing username or password"}) 
    }
    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    })
    try{
        await newUser.save()
        console.log(newUser)
        res.sendStatus(201)
    }
    catch(err){
       res.status(400).send(err) 
    }
})

//authenticate or login
router.post("/auth", async(req, res) =>{
    if(!req.body.username || !req.body.password){
        res.status(400).json({error: "Missing username or password"})
        return
    }
    //try to find username in db, then see if it matches
    let user = await User.findOne({username: req.body.username})
    
        if(!user){
            res.status(401).json({error: "Bad username"})
        }
        else{
            if(user.password != req.body.password){
                res.status(401).json({error: "Badd password"})
            }
            else{
                username2 = user.username
                const token = jwt.encode({username: user.username}, secret)
                const auth = 1

                res.json({
                    username2, 
                    token: token,
                    auth:auth
                })
            }
        }
    })

//check status of user with a valid token
router.get("/status", async(req, res) =>{
    if(!req.headers["x-auth"]){
        return res.status(401).json({error: "Missing x-auth"})
    }

    const token = req.headers["x-auth"]
    try{
        const decoded = jwt.decode(token, secret)
        let users = User.find({}, "username status")
        res.json(users)
    }
    catch(ex){
        res.status(401).json({error: "invalid jwt"})
    }
})

//grab all the songs in db
router.get("/songs", async(req, res) => {
    try{
        const songs = await Song.find({})
        res.send(songs)
        console.log(songs)
    }
    catch(err){
        console.log(err)
    }
})

//grab a single song in db
router.get("/songs/:id", async(req, res) =>{
    try{
       const song = await Song.findById(req.params.id)
       res.json(song)
    }
    catch(err){
        res.status(400).send(err)
    }
})

router.post("/songs", async(req, res) =>{
    try{
        const song = await new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log(song)
    }
    catch(err){
        res.status(400).send(err)
    }
})

//update is to update an existing record/resource/db entry
router.put("/songs/:/id", async(req,res) =>{
    //first we need to find and update the song the frontend wants to update.
    //to do this request the id of the song from request
    //and update the find it in the db and update it
    try{
        const song = req.body
        await Song.updateOne({_id: req.params.id}, song)
        console.log(song)
        res.sendStatus(204)
    }
    catch(err){
        res.status(400).send(err)
    }    
})

router.delete("/songs/:id", async(req, res) =>{
    //method or function to delete a single instance of an object
    try{
        const song = await Song.findById(req.params.id)
        console.log(song)
        await Song.deleteOne({_id: song.id})
        res.sendStatus(204)
    }
    catch(err){
        res.status(400).send(err)
    }    
}) 

app.use("/api", router);
app.listen(3000);
