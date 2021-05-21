require('dotenv').config();
const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;

const PynieBot = require('./src/index');

app.listen(PORT, () => {
	console.log(`\nPynie Bot runnign at http://localhost:${PORT}\n`);
	PynieBot.run();
});
