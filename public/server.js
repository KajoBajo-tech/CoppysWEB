const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware do obsługi JSON i plików statycznych z folderu 'public'
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ========================================================
// OSOBNE, NIEPOWIĄZANE ZE SOBA PUNKTY / WIADOMOŚCI API
// ========================================================

// Wiadomość 1: Status serwera
app.get('/api/status', (req, res) => {
    res.json({ message: "Serwer działa poprawnie!", timestamp: new Date() });
});

// Wiadomość 2: Aktualności / Ogłoszenie
app.get('/api/news', (req, res) => {
    res.json({ title: "Witaj na stronie!", body: "Oto najnowsza wiadomość z systemu." });
});

// Wiadomość 3: Szybki test
app.get('/api/ping', (req, res) => {
    res.send("pong");
});


// ========================================================
// NAPRAWA BŁĘDU 404 PRZY ODŚWIEŻANIU (WILDCARD ROUTE)
// Ten fragment MUSI być na samym końcu ścieżek!
// ========================================================
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Serwer uruchomiony na porcie ${PORT}`);
});