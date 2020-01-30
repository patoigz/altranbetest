const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

const app = express();

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function initDB() {
    const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1/servertestdb';
    mongoose.set('useCreateIndex', true);
    mongoose
        .connect(MONGO_URL, { useNewUrlParser: true })
        .catch(err => console.error(err))
        .then(db => {
            console.log('connected');
            const dummy = require('./dummy');
            dummy.setup(db);
        });
}

const message = `Server listening at http://${hostname}:${port}`;

// endpoint para autenticar cliente y obtener token
const authController = require('./auth/auth.controller');
app.use('/auth', authController);

// endpoint para acceder a clientes y pólizas
const apiController = require('./controller/api.controller');
app.use('/api', apiController);

app.get('/status', function(req, res) {
    return res.json({ message: message });
});

app.listen(port, hostname, function() {
    console.log(message);
    initDB();
});
