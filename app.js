const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
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
	
	const dc="us9"
	const listid="602f4e3b9b"
	
	const url = "https://" + dc + ".api.mailchimp.com/3.0/lists/" + listid
	console.log(url)
	
	const options = {
		method: 'POST',
		auth: 'apikey:4aefe46cc4e7e8693b90bcbbde089912-us9',
		Authorization: 'apikey:4aefe46cc4e7e8693b90bcbbde089912-us9'
	}
	
	const request = https.request(url, options, (response) => {
		
		if(response.statusCode === 200) {
			res.sendFile(__dirname + "/success.html")
		} else {
			res.sendFile(__dirname + "/failure.html")
		}
		
		response.on('data', (data) => {
			const parsedData = JSON.parse(data)
			console.log(parsedData)
		})
	})
	request.write(jsonData)
	request.end()
})

app.listen(process.env.PORT || 3000, () => {
	console.log("Server running on port 3000")
})


// mailchimp
// api key: 1d97d1f262d6caf212bcd77d0942f525-us9
// audience list id: 602f4e3b9b

