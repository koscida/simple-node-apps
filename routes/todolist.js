//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose")
const _ = require("lodash")
const date = require(__dirname + "/../date.js");
require('dotenv').config();

const router = express.Router()

// const mongooseDB = "mongodb://localhost:27017/todoListDB"
const mongooseDB = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`
mongoose.connect(mongooseDB)

// test mongoose connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// mongoose schema
const itemsSchema = {
	name: String
}
const listSchema = {
	name: String,
	items: [itemsSchema]
}

// mongoose model
const Item = mongoose.model("Item", itemsSchema)
const List = mongoose.model("List", listSchema)

// mongoose document
const item1 = new Item({
	name: "Buy Food",
})
const item2 = new Item({
	name: "Cook Food",
})
const item3 = new Item({
	name: "Eat Food",
}) 
const defaultItems = [item1, item2, item3]


router.get("/", function(req, res) {
	res.redirect("/todolist/Todo");
})

router.get("/:listName", function(req,res){
	const listNameRaw = req.params.listName
	let listName = _.capitalize(_.kebabCase(listNameRaw.toLowerCase()))
	
	List.findOne({name: listName}, (err, foundList) => {
		if(!foundList) {
			// insert new list
			const list = new List({
				name: listName,
				items: defaultItems
			})
			list.save()
			res.redirect("/todolist/" + listName);
		} else {
			const day = date.getDate()
			const listTitle = (listName.replaceAll('-'," ") + " " + day)
			res.render("todolist/list", {listTitle, listItems: foundList.items, listName});
		}
	})
})

router.post("/addItem", function(req, res){
	const name = req.body.newItem
	const listName = req.body.listName
	const item = new Item({name})
	List.findOne({name: listName}, (err, foundList) => {
		foundList.items.push(item)
		foundList.save()
		res.redirect("/todolist/" + listName);
	})
	
})

router.post("/deleteItem", (req, res) => {
	const _id = req.body.deleteItem
	const listName = req.body.listName
	List.findOneAndUpdate({name: listName}, {
		$pull: {items: {_id}}
	}, (err, foundList) => {
		if(!err)
			res.redirect("/todolist/" + listName);
		else
			console.log(err)
	})
	
})

router.get("/about", function(req, res){
	res.render("todolist/about");
})

module.exports = router