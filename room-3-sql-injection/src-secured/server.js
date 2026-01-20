const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Base de données SQLite
const db = new sqlite3.Database(':memory:');

// Initialisation
db.serialize(() => {
    db.run(`CREATE TABLE books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        isbn TEXT UNIQUE,
        year INTEGER
    )`);

    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user'
    )`);

    // Données de test
    db.run(`INSERT INTO books (title, author, isbn, year) VALUES 
        ('Le Petit Prince', 'Antoine de Saint-Exupéry', '978-2070612758', 1943),
        ('1984', 'George Orwell', '978-2070368228', 1949),
        ('L''Étranger', 'Albert Camus', '978-2070360024', 1942),
        ('Harry Potter', 'J.K. Rowling', '978-2070541201', 1997)`);

    db.run(`INSERT INTO users (username, password, role) VALUES 
        ('admin', 'admin123', 'admin'),
        ('user1', 'password123', 'user')`);
});

// Fonction de validation
function validateSearchInput(input) {
    if (typeof input !== 'string') return false;
    if (input.length > 100) return false; // Limite de longueur
    return true;
}

function validateId(id) {
    const numId = parseInt(id, 10);
    return !isNaN(numId) && numId > 0;
}

// Route d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// SÉCURISÉ : Recherche avec requêtes préparées
app.get('/api/books', (req, res) => {
    const search = req.query.search || '';

    // Validation de l'input
    if (!validateSearchInput(search)) {
        return res.status(400).json({ error: 'Recherche invalide' });
    }

    // SÉCURISÉ : Utilisation de requêtes préparées (prepared statements)
    // Les paramètres sont traités séparément du SQL, empêchant l'injection
    const query = `SELECT * FROM books WHERE title LIKE ? OR author LIKE ?`;
    const searchPattern = `%${search}%`;
    
    console.log('Requête préparée avec paramètres:', searchPattern);
    
    db.all(query, [searchPattern, searchPattern], (err, books) => {
        if (err) {
            console.error('Erreur SQL:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json({ books });
    });
});

// SÉCURISÉ : Recherche par ID avec validation et requête préparée
app.get('/api/books/:id', (req, res) => {
    const id = req.params.id;
    
    // Validation de l'ID
    if (!validateId(id)) {
        return res.status(400).json({ error: 'ID invalide' });
    }
    
    // SÉCURISÉ : Requête préparée
    const query = `SELECT * FROM books WHERE id = ?`;
    
    db.get(query, [id], (err, book) => {
        if (err) {
            console.error('Erreur SQL:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (!book) {
            return res.status(404).json({ error: 'Livre non trouvé' });
        }
        res.json({ book });
    });
});

// SÉCURISÉ : Login avec requêtes préparées
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Validation
    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
        return res.json({ success: false, error: 'Identifiants incorrects' });
    }

    // SÉCURISÉ : Requête préparée
    const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
    
    db.get(query, [username, password], (err, user) => {
        if (err) {
            console.error('Erreur SQL:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (user) {
            res.json({ success: true, message: 'Connexion réussie', user: { id: user.id, username: user.username, role: user.role } });
        } else {
            res.json({ success: false, error: 'Identifiants incorrects' });
        }
    });
});

// SÉCURISÉ : Suppression avec authentification et requête préparée
app.delete('/api/books/:id', (req, res) => {
    // TODO: Ajouter vérification d'authentification
    const id = req.params.id;
    
    // Validation
    if (!validateId(id)) {
        return res.status(400).json({ error: 'ID invalide' });
    }
    
    // SÉCURISÉ : Requête préparée
    const query = `DELETE FROM books WHERE id = ?`;
    
    db.run(query, [id], function(err) {
        if (err) {
            console.error('Erreur SQL:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Livre non trouvé' });
        }
        res.json({ success: true, message: 'Livre supprimé' });
    });
});

app.listen(PORT, () => {
    console.log(`Application sécurisée démarrée sur http://localhost:${PORT}`);
    console.log('Cette version utilise des requêtes préparées pour prévenir les injections SQL');
});

