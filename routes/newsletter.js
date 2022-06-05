const express = require('express')
const https = require('https')
const router = express.Router()
const path = require('path');
require('dotenv').config();

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname,"../","views/newsletter/signup.html"))
})

router.post("/", (req, res) => {
	const firstName = req.body.firstName
	const lastName = req.body.lastName
	const email = req.body.email
	
	const data = {
		members: [
			{
				email_address: email,
				email_type: 'html',
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
                	LNAME: lastName,
				}
			}
		]
	}
	const jsonData = JSON.stringify(data)
	console.log(jsonData)
	
	const url = "https://" + process.env.MAILCHIMP_DC + ".api.mailchimp.com/3.0/lists/" + process.env.MAILCHIMP_LISTID
	const auth = 'apikey:' + process.env.MAILCHIMP_APIKEY
	
	const options = {
		method: 'POST',
		auth: auth,
		Authorization: auth
	}
	
	const request = https.request(url, options, (response) => {
		
		if(response.statusCode === 200) {
			res.sendFile(path.join(__dirname,"../","views/newsletter/success.html"))
		} else {
			res.sendFile(path.join(__dirname,"../","views/newsletter/failure.html"))
			console.log(response)
		}
		
		response.on('data', (data) => {
			const parsedData = JSON.parse(data)
			//console.log(parsedData)
		})
	})
	request.write(jsonData)
	request.end()
})

module.exports = router