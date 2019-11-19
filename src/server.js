require('dotenv').config();
const express = require('express');
const stripe = require('./controllers/stripe');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
app.post('/api/stripe/charge', stripe.charge);
app.get('/api/stripe', stripe.test);

app.listen(PORT, console.log(`Server started at http://localhost:${PORT}/api`));