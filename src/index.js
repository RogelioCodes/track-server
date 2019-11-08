require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes); 
app.use(trackRoutes);

//const mongoUri = 'mongodb+srv://admin:passwordpassword@cluster0-l5kyb.mongodb.net/admin?retryWrites=true&w=majority' ; 
const mongoUri = 'mongodb+srv://chap:passwordchap@cluster0-l5kyb.mongodb.net/anything?retryWrites=true&w=majority' ;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3006, () => {
    console.log('Listening on port 3000');
});

//admin passwordpassword