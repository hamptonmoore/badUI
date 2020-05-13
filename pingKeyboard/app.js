const express = require('express')
const ping = require('ping')
const path = require('path');
const app = express()
const port = 3000

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))

app.get('/type/:host', (req, res) => {
	
	if (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm.test(req.params.host)) {

		ping.promise.probe(req.params.host)
		.then(function (pingRes) {
			let value = Number(pingRes.avg);
			value = value % 27;
			value = String.fromCharCode(64 + value);

			if (value == "@"){
				value = " ";
			}

			res.send(value);
		});
	} else {
		res.send("NOT VALID IPv4");
	}
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
