const express = require('express')
const ping = require('ping')
const path = require('path');
const app = express()
const port = 3000

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))

app.get('/type/:host', (req, res) => {

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
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
