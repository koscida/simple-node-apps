const express = require('express')
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const ejs = require("ejs");

const apps = require(__dirname+'/appList.js');

const newsletter = require(__dirname+'/routes/newsletter.js');
const blog = require(__dirname+'/routes/blog.js');
const todolist = require(__dirname+'/routes/todolist.js');
const blogdb = require(__dirname+'/routes/blogdb.js');

const app = express()

// parse request of body
app.use(bodyParser.urlencoded({extended: true}))
// use public static folder
app.use(express.static('public'))
// set view engine
app.set('view engine', 'ejs');


// connect to mongodb
const mongooseDB = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`
mongoose.connect(mongooseDB)

// test mongoose connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


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
app.use('/todolist', todolist);
app.use('/blogdb', blogdb);

// listen
app.listen(process.env.PORT || 3000, () => {
	console.log("Server running on port 3000")
})