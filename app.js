// setup... similar to default tags in html
const express = require('express')
var cors = require('cors')

//tells app variable to be an express server
const app = express()
app.use(cors())
const router = express.Router()

//making an api using routes
//routes are used to handle browser requests. They look like URLs.
//The difference is that when a browser request a route, it is dynamically handled using a function.

// GET request when someone goes to http://localhost:3000/hello. When using a function in a route, there is always a parameter or handle a response and request

router.get("/songs", function(req, res) {
    const songs = [
    {    
        title: "We Found Love",
        artist: "Rhianna",
        popularity: 10,
        releaseDate: new Date(2011, 9, 22),
        genre: ["electro house"]
    },
    {
        title: "Happy",
        artist: "Pharrell Williams",
        popularity: 10,
        releaseDate: new Date(2013, 11, 21),
        genre: ["soul", "new soul"]  
    }
    ];
    res.json(songs)
})

//all request that usually use an api start with /api ... so the url would be localhost:3000/api/songs
app.use("/api", router)
app.listen(3000)
