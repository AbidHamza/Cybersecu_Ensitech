const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(express.json());

// Base de données SQLite en mémoire
const db = new sqlite3.Database(':memory:');

// Initialisation de la base de données
db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT,
        password TEXT
    )`);
    
    db.run(`CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL,
        description TEXT
    )`);
    
    // Données de test
    db.run(`INSERT INTO users (username, email, password) VALUES 
        ('admin', 'admin@test.com', 'admin123'),
        ('user1', 'user1@test.com', 'password123')`);
    
    db.run(`INSERT INTO products (name, price, description) VALUES 
        ('Laptop', 999.99, 'Ordinateur portable'),
        ('Phone', 599.99, 'Smartphone')`);
});

// VULNÉRABLE : Pas d'authentification
// VULNÉRABLE : Pas de validation
// VULNÉRABLE : Pas de rate limiting
// VULNÉRABLE : Messages d'erreur trop informatifs

// GET /api/users - Liste tous les utilisateurs (VULNÉRABLE)
app.get('/api/users', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            return res.status(500).json({ 
                error: 'Erreur de base de données',
                details: err.message  // VULNÉRABLE : Exposition de détails
            });
        }
        res.json(rows);
    });
});

// GET /api/users/:id - Récupère un utilisateur (VULNÉRABLE)
app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    // VULNÉRABLE : Pas de validation, injection SQL possible
    db.get(`SELECT * FROM users WHERE id = ${id}`, (err, row) => {
        if (err) {
            return res.status(500).json({ 
                error: 'Erreur SQL',
                query: `SELECT * FROM users WHERE id = ${id}`  // VULNÉRABLE : Exposition de la requête
            });
        }
        if (!row) {
            return res.status(404).json({ error: `Utilisateur ${id} non trouvé` });
        }
        res.json(row);
    });
});

// POST /api/users - Crée un utilisateur (VULNÉRABLE)
app.post('/api/users', (req, res) => {
    const { username, email, password } = req.body;
    // VULNÉRABLE : Pas de validation
    // VULNÉRABLE : Mot de passe en clair
    db.run(
        `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
        [username, email, password],
        function(err) {
            if (err) {
                return res.status(500).json({ 
                    error: 'Erreur lors de la création',
                    details: err.message
                });
            }
            res.status(201).json({ id: this.lastID, username, email });
        }
    );
});

// GET /api/products - Liste tous les produits
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur de base de données' });
        }
        res.json(rows);
    });
});

// DELETE /api/users/:id - Supprime un utilisateur (VULNÉRABLE)
app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    // VULNÉRABLE : Pas d'authentification/autorisation
    db.run(`DELETE FROM users WHERE id = ${id}`, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur SQL', details: err.message });
        }
        res.json({ message: 'Utilisateur supprimé' });
    });
});

app.listen(PORT, () => {
    console.log(`API vulnérable démarrée sur http://localhost:${PORT}`);
    console.log(`Cette API contient des vulnérabilités intentionnelles`);
    console.log(`Endpoints disponibles :`);
    console.log(`   GET    /api/users`);
    console.log(`   GET    /api/users/:id`);
    console.log(`   POST   /api/users`);
    console.log(`   DELETE /api/users/:id`);
    console.log(`   GET    /api/products`);
});
