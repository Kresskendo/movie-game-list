const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/mydatabase')
    .then(() => {
        console.log('Подключено к MongoDB');
    })
    .catch((err) => {
        console.error('Ошибка подключения к MongoDB:', err);
    });

app.use(cors());

const Item = mongoose.model('Item', new mongoose.Schema({
    title: String,
    type: { type: String, enum: ['movie', 'game'] }
}));

app.use(bodyParser.json());
app.use(express.static('frontend'));

app.post('/items', async (req, res) => {
    const { title, type } = req.body;

    if (!title || !type) {
        return res.status(400).send('Необходимы title и type');
    }

    const item = new Item({ title, type });
    try {
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).send('Ошибка сервера');
    }
});

app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).send('Ошибка сервера');
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});