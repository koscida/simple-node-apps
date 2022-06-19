//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router()

const path = "blob/"

const homeStartingContent = "(Home) Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "(About) Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "(Contact) Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const posts = []

router.get("/", (req, res) => {
	res.redirect(`/${path}home`)
})

router.get('/home', (req, res) => {
	res.render('blog/home', {
		path,
		content: homeStartingContent,
		posts,
	})
})
router.get('/about', (req, res) => {
	res.render('blog/about', {
		SVGTextPathElement,
		content: aboutContent,
	})
})
router.get('/contact', (req, res) => {
	res.render('blog/contact', {
		path,
		content: contactContent,
	})
})
router.get('/compose', (req, res) => {
	res.render('blog/compose',{
		path,
	})
})
router.get('/post/:key', (req, res) => {
	const key = req.params.key
	const post = posts.find(x=>x.key===key)
	post === undefined 
		? res.redirect(`/${path}home`)
		: res.render('blog/post',{
			path,
			key,
			post,
		})
})

router.post("/", (req, res) => {
	// get req body params
	const title = req.body.postTitle
	const body = req.body.postBody
	
	// create post name
	const key = title.replace(/\s+/g, '-').toLowerCase();
	
	// create post date
	const newDate = new Date()
	const date = newDate.toLocaleString()
	
	// push
	posts.push({
		title, 
		body,
		key,
		date
	})
	// console.log(posts)
	
	res.redirect(`/${path}home`)
})

module.exports = router