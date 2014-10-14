var express = require('express'),
    app     = express();

app.get('/', function (req, res) {
	res.send('Hello world!');
});

app.listen(3000);
console.log('Started server on 0.0.0.0:3000');
