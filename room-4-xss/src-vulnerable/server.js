const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Base de données simple en mémoire
let comments = [
    { id: 1, author: "Alice", text: "Super article !" },
    { id: 2, author: "Bob", text: "Très intéressant." }
];

// Page principale
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Endpoint vulnérable - XSS Réfléchi
app.get('/search', (req, res) => {
    const query = req.query.q || '';
    // VULNÉRABLE : Injection directe sans échappement
    res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Recherche</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 50px auto;
                    padding: 20px;
                    background-color: #f5f5f5;
                }
                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .warning {
                    background: #fff3cd;
                    border: 1px solid #ffc107;
                    padding: 15px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                a {
                    color: #007bff;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="warning">
                    <strong>Application vulnérable :</strong> Cette page contient des vulnérabilités XSS intentionnelles.
                </div>
                <h1>Résultats de recherche</h1>
                <p>Résultats pour : ${query}</p>
                <a href="/">Retour à l'accueil</a>
            </div>
        </body>
        </html>
    `);
});

// Endpoint vulnérable - XSS Stocké
app.post('/comment', (req, res) => {
    const { author, text } = req.body;
    // VULNÉRABLE : Stockage sans validation ni échappement
    if (!author || !text) {
        return res.status(400).send('Auteur et texte requis');
    }
    
    comments.push({
        id: comments.length + 1,
        author: author,
        text: text
    });
    res.redirect('/');
});

// API pour récupérer les commentaires
app.get('/api/comments', (req, res) => {
    res.json(comments);
});

app.listen(PORT, () => {
    console.log(`Application vulnérable démarrée sur http://localhost:${PORT}`);
    console.log(`Cette application contient des vulnérabilités XSS intentionnelles`);
});
