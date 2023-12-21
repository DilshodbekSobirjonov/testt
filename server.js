const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path'); // Добавим модуль path для управления путями.

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Используем path.join для построения пути к файлам.
const publicPath = path.join(__dirname, 'public');

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/questions', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, 'questions.json'), 'utf-8');
        const dataArray = JSON.parse(data);
        res.json(Array.isArray(dataArray) ? dataArray : []);
    } catch (error) {
        console.error('Error reading questions.json:', error.message);
        res.status(500).json({ success: false, error: 'Error reading questions.json' });
    }
});

app.post('/save', async (req, res) => {
    const questionData = req.body;

    try {
        const currentData = JSON.parse(await fs.readFile(path.join(__dirname, 'questions.json'), 'utf-8'));
        currentData.push(questionData);
        await fs.writeFile(path.join(__dirname, 'questions.json'), JSON.stringify(currentData, null, 2));
        res.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
