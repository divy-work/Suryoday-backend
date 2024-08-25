const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
require('./db/config');
const Detail = require('./db/customer');

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'https://suryoday-fortune.vercel.app', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Middleware for parsing JSON requests
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Products API running');
});

app.get('/home', (req, res) => {
    res.send('API running');
});

app.post('/details', async (req, res) => {
    try {
        console.log('Received request to add details');

        let detail = new Detail({
            name: req.body.name,
            number: req.body.number,
            email: req.body.email,
            floor: req.body.floor,
            portion: req.body.portion,
        });

        console.log('Detail object created, saving to database');

        let result = await detail.save();

        console.log('Detail saved successfully');
        res.send(result);
    } catch (error) {
        console.error('Error saving detail:', error);
        res.status(500).send({ error: 'Failed to save detail' });
    }
});

// API to retrieve all the details from the DB
app.get('/details', async (req, res) => {
    try {
        let details = await Detail.find();
        let formattedDetails = details.map((detail) => ({
            name: detail.name,
            number: detail.number,
            email: detail.email,
            floor: detail.floor,
            portion: detail.portion,
        }));
        res.send(formattedDetails);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve details' });
    }
});

// API to delete the data from the database
app.delete('/details/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedDetail = await Detail.findByIdAndDelete(id);

        if (!deletedDetail) {
            return res.status(404).send({ error: 'Detail not found' });
        }

        res.send({ message: 'Detail deleted successfully', deletedDetail });
    } catch (error) {
        console.error('Error deleting detail:', error);
        res.status(500).send({ error: 'Failed to delete detail' });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
