const express = require('express');
const mongoose = require( 'mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
require('dotenv/config');
const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect(
    process.env.DB_LINK,
    { useUnifiedTopology: true, useNewUrlParser: true,'useFindAndModify': false}
    
);
requireDir('./src/models');
// Rotas
app.use('/api', require("./src/routes"));

app.listen(3200,process.env.IP_SERVER);