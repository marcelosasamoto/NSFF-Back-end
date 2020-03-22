const express = require('express');
const mongoose = require( 'mongoose');
const requireDir = require('require-dir');

const app = express();
app.use(express.json());


mongoose.connect(
    "mongodb+srv://nsffdb:nsff1707db@nsff-aa51f.gcp.mongodb.net/NSFF?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true,}
    
);
requireDir('./src/models');
// Rotas
app.use('/api', require("./src/routes"));

app.listen(3200);