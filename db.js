const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://sdev255:mypassword@nodetuts.sjbhwih.mongodb.net/Nodetuts?retryWrites=true&w=majority", {useNewUrlParser: true})

module.exports = mongoose