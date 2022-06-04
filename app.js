const express = require('express')
const bodyParser = require('body-parser')
var signup = require(__dirname+'/routes/signup.js');
const ejs = require("ejs");

const app = express()

// parse request of body
app.use(bodyParser.urlencoded({extended: true}))
// use public static folder
app.use(express.static('public'))
// set view engine
app.set('view engine', 'ejs');

// build app options
const apps = [
	{
		name: "Signup",
		uri: "/signup"
	}
]

// home route
app.get('/', (req, res) => {
	res.render('home', {
		apps,
	})
})

// include the routers for each sub page
app.use('/signup', signup);

// listen
app.listen(process.env.PORT || 3000, () => {
	console.log("Server running on port 3000")
})