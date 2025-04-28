// setup... similar to default tags in html
const express = require('express')
const Song = require("./models/songs")
var cors = require('cors')

//tells app variable to be an express server
//const bodyParser = require('body-parser')
const app = express();
app.use(cors())

//middleware
app.use(express.json());
const router = express.Router();

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

app.use("/api", router)
app.listen(3000)
