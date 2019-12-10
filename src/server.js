require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors());

mongoose.connect(process.env.DATA_BASE_ACESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

app.use(express.json());
app.use(routes);

app.listen(3333);
