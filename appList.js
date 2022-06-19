appList = [
	{
		name: "Todo List",
		uri: "/todolist",
		description: 'Create CRUD todo list and persist data with MongoDB Atlas Cloud',
		display: true,
	},{
		name: "Blog",
		uri: "/blog",
		description: 'Personal daily blog',
		display: true,
	}, {
		name: "Newsletter",
		uri: "/newsletter",
		description: 'Subscribe to a mailing list using the MailChimp API',
		display: true,
	}, 
]

exports.getAppList = () => {
	return appList
}