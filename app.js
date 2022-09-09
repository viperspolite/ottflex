require("dotenv").config();
var express = require('express');
app = express();

var api = require('./routes/routes');

// Setting up express for text parser
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req , res) => {
	res.send("i am devil...");
  })

app.use('/api/', api);

// Listen to port for TrainingSession app
try {
	server = app.listen(process.env.PORT);
	console.log("Connected to TrainingSession app On PORT : "+process.env.PORT);
} catch (err) {
	console.log("Failed to connect");
}