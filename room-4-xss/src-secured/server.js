const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Fonction d'échappement HTML sécurisée
function escapeHtml(text) {
    if (typeof text !== 'string') {
        return '';
    }
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Base de données simple en mémoire
let comments = [
    { id: 1, author: "Alice", text: "Super article !" },
    { id: 2, author: "Bob", text: "Très intéressant." }
];

// Page principale
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Endpoint sécurisé - XSS Réfléchi corrigé
app.get('/search', (req, res) => {
    const query = req.query.q || '';
    // SÉCURISÉ : Échappement HTML avant affichage
    const safeQuery = escapeHtml(query);
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
                .success {
                    background: #d4edda;
                    border: 1px solid #28a745;
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
                <div class="success">
                    <strong>Application sécurisée :</strong> Protection XSS activée avec échappement HTML.
                </div>
                <h1>Résultats de recherche</h1>
                <p>Résultats pour : ${safeQuery}</p>
                <a href="/">Retour à l'accueil</a>
            </div>
        </body>
        </html>
    `);
});

// Endpoint sécurisé - XSS Stocké corrigé
app.post('/comment', (req, res) => {
    const { author, text } = req.body;
    // SÉCURISÉ : Validation et échappement avant stockage
    if (!author || !text) {
        return res.status(400).send('Auteur et texte requis');
    }
    
    // Limiter la longueur pour éviter les abus
    if (author.length > 50 || text.length > 500) {
        return res.status(400).send('Texte trop long');
    }
    
    comments.push({
        id: comments.length + 1,
        author: escapeHtml(author),
        text: escapeHtml(text)
    });
    res.redirect('/');
});

// API pour récupérer les commentaires
app.get('/api/comments', (req, res) => {
    res.json(comments);
});

app.listen(PORT, () => {
    console.log(`Application sécurisée démarrée sur http://localhost:${PORT}`);
    console.log(`Protection XSS activée`);
});
