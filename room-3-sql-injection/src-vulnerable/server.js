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

// Route d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// VULNÉRABLE : Recherche de livres avec injection SQL possible
app.get('/api/books', (req, res) => {
    const search = req.query.search || '';

    // VULNÉRABILITÉ : Concaténation directe dans la requête SQL
    const query = `SELECT * FROM books WHERE title LIKE '%${search}%' OR author LIKE '%${search}%'`;
    
    console.log('Requête exécutée:', query);
    
    db.all(query, (err, books) => {
        if (err) {
            console.error('Erreur SQL:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json({ books });
    });
});

// VULNÉRABLE : Recherche par ID
app.get('/api/books/:id', (req, res) => {
    const id = req.params.id;
    
    // VULNÉRABILITÉ : Pas de validation, concaténation directe
    const query = `SELECT * FROM books WHERE id = ${id}`;
    
    console.log('Requête exécutée:', query);
    
    db.get(query, (err, book) => {
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

// VULNÉRABLE : Login avec injection SQL possible
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // VULNÉRABILITÉ : Injection SQL dans l'authentification
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    console.log('Requête exécutée:', query);
    
    db.get(query, (err, user) => {
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

// VULNÉRABLE : Suppression de livre (sans authentification !)
app.delete('/api/books/:id', (req, res) => {
    const id = req.params.id;
    
    // VULNÉRABILITÉ : Pas d'authentification, injection SQL possible
    const query = `DELETE FROM books WHERE id = ${id}`;
    
    console.log('Requête exécutée:', query);
    
    db.run(query, function(err) {
        if (err) {
            console.error('Erreur SQL:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json({ success: true, message: 'Livre supprimé' });
    });
});

app.listen(PORT, () => {
    console.log(`Application vulnérable démarrée sur http://localhost:${PORT}`);
    console.log('ATTENTION: Cette application contient des vulnérabilités d\'injection SQL intentionnelles');
    console.log('\nExemples d\'injection à tester:');
    console.log('  Recherche: \' OR \'1\'=\'1');
    console.log('  Recherche: \' UNION SELECT * FROM users--');
    console.log('  Login username: admin\'--');
});

