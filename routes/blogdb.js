//jshint esversion:6
const express = require("express");
const mongoose = require("mongoose")
require('dotenv').config();

const router = express.Router()

const path = "blogdb/"

const homeStartingContent = "(Home) Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "(About) Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "(Contact) Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// mongoose schema
const postSchema = {
	title: String, 
	body: String,
	date: String
}

// mongoose model
const Post = mongoose.model("Post", postSchema)



router.get("/", (req, res) => {
	res.redirect(`/${path}home`)
})

router.get('/home', (req, res) => {
	// get posts
	Post.find({}, (err, posts) => {
		// render the posts
		res.render('blog/home', {
			path,
			content: homeStartingContent,
			posts,
		})
	})
})
router.get('/about', (req, res) => {
	res.render('blog/about', {
		path,
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
router.get('/post/:_id', (req, res) => {
	const _id = req.params._id
	// get post
	Post.findOne({_id}, (err, post) => {
		// check if exists
		post
			? res.render('blog/post',{
				path,
				post,
			})
			: res.redirect(`/${path}home`)
	})
})

router.post("/", (req, res) => {
	// get req body params
	const title = req.body.postTitle
	const body = req.body.postBody
	
	// create post date
	const newDate = new Date()
	const date = newDate.toLocaleString()
	
	// add
	const post = new Post({
		title, 
		body,
		date
	})
	post.save()
	
	res.redirect(`/${path}home`)
})

module.exports = router