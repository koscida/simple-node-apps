appList = [
	{
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