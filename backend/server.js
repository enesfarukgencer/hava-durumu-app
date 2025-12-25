console.log("API Anahtarım:", process.env.WEATHER_API_KEY);
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.WEATHER_API_KEY;

app.use(cors());
app.use(express.json());

// Hava Durumu Rotası
app.get('/api/hava', async (req, res) => {
    const sehir = req.query.sehir;

    if (!sehir) {
        return res.status(400).json({ hata: "Lütfen bir şehir adı belirtin." });
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${sehir}&appid=${API_KEY}&units=metric&lang=tr`;
        const response = await axios.get(url);
        
        // Sadece ihtiyacımız olan verileri frontend'e gönderiyoruz
        const data = {
            sehir: response.data.name,
            sicaklik: response.data.main.temp,
            durum: response.data.weather[0].description,
            nem: response.data.main.humidity,
            ruzgar: response.data.wind.speed
        };

        res.json(data);
    } catch (error) {
        res.status(404).json({ hata: "Şehir bulunamadı veya API hatası oluştu." });
    }
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda aktif. API anahtarı yüklendi.`);
});
