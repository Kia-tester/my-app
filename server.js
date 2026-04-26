const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/send-message', (req, res) => {
    const clientMessage = req.body.message.trim().toLowerCase(); 

    if (clientMessage === "td4eva") {
        res.json({
            status: 'success',
            action: 'play_video',
            videoUrl: 'https://www.youtube.com/embed/0t68JBj5tW0?autoplay=1&controls=1&rel=0', 
            reply: '✨ Grazie, Kian, per il tuo impegno.'
        });
    } else {
        res.json({
            status: 'success',
            action: 'none',
            reply: 'wrong CAPTCHA try again'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});