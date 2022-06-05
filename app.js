const express = require('express')
const bodyParser = require('body-parser')
const ejs = require("ejs");

const apps = require(__dirname+'/appList.js');

const newsletter = require(__dirname+'/routes/newsletter.js');
const blog = require(__dirname+'/routes/blog.js');

const app = express()

// parse request of body
app.use(bodyParser.urlencoded({extended: true}))
// use public static folder
app.use(express.static('public'))
// set view engine
app.set('view engine', 'ejs');

const appList = apps.getAppList()

// home route
app.get('/', (req, res) => {
	res.render('home', {
		appList,
	})
})

// include the routers for each sub page
app.use('/newsletter', newsletter);
app.use('/blog', blog);

// listen
app.listen(process.env.PORT || 3000, () => {
	console.log("Server running on port 3000")
})