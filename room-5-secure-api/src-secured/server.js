const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

app.use(express.json());

// Rate limiting global
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // 100 requêtes par fenêtre
});

app.use('/api/', limiter);

// Rate limiting strict pour les endpoints sensibles
const strictLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5
});

// Base de données SQLite en mémoire
const db = new sqlite3.Database(':memory:');

// Initialisation de la base de données
db.serialize(async () => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT,
        password_hash TEXT
    )`);
    
    db.run(`CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL,
        description TEXT
    )`);
    
    // Données de test avec mots de passe hashés
    const adminHash = await bcrypt.hash('admin123', 10);
    const userHash = await bcrypt.hash('password123', 10);
    
    db.run(`INSERT INTO users (username, email, password_hash) VALUES 
        ('admin', 'admin@test.com', ?),
        ('user1', 'user1@test.com', ?)`, [adminHash, userHash]);
    
    db.run(`INSERT INTO products (name, price, description) VALUES 
        ('Laptop', 999.99, 'Ordinateur portable'),
        ('Phone', 599.99, 'Smartphone')`);
});

// Fonction de validation
function validateUserInput(user) {
    const errors = [];
    
    if (!user.username || user.username.length < 3) {
        errors.push('Le nom d\'utilisateur doit faire au moins 3 caractères');
    }
    
    if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        errors.push('Email invalide');
    }
    
    if (!user.password || user.password.length < 8) {
        errors.push('Le mot de passe doit faire au moins 8 caractères');
    }
    
    return errors;
}

// Middleware d'authentification simple (pour l'exemple)
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentification requise' });
    }
    // En production, vérifier le token JWT
    next();
}

// GET /api/users - Liste tous les utilisateurs (SÉCURISÉ)
app.get('/api/users', authenticate, (req, res) => {
    // SÉCURISÉ : Requête préparée, ne sélectionne que les champs nécessaires
    db.all('SELECT id, username, email FROM users', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur serveur' }); // Message générique
        }
        res.json(rows);
    });
});

// GET /api/users/:id - Récupère un utilisateur (SÉCURISÉ)
app.get('/api/users/:id', authenticate, (req, res) => {
    const id = parseInt(req.params.id);
    
    // SÉCURISÉ : Validation du paramètre
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'ID invalide' });
    }
    
    // SÉCURISÉ : Requête préparée
    db.get('SELECT id, username, email FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Ressource non trouvée' });
        }
        res.json(row);
    });
});

// POST /api/users - Crée un utilisateur (SÉCURISÉ)
app.post('/api/users', strictLimiter, async (req, res) => {
    const { username, email, password } = req.body;
    
    // SÉCURISÉ : Validation
    const errors = validateUserInput({ username, email, password });
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    // SÉCURISÉ : Hash du mot de passe
    const passwordHash = await bcrypt.hash(password, 10);
    
    // SÉCURISÉ : Requête préparée
    db.run(
        'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
        [username, email, passwordHash],
        function(err) {
            if (err) {
                if (err.message.includes('UNIQUE')) {
                    return res.status(409).json({ error: 'Utilisateur déjà existant' });
                }
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            res.status(201).json({ id: this.lastID, username, email });
        }
    );
});

// GET /api/products - Liste tous les produits
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(rows);
    });
});

// DELETE /api/users/:id - Supprime un utilisateur (SÉCURISÉ)
app.delete('/api/users/:id', authenticate, strictLimiter, (req, res) => {
    const id = parseInt(req.params.id);
    
    // SÉCURISÉ : Validation
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'ID invalide' });
    }
    
    // SÉCURISÉ : Requête préparée
    db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json({ message: 'Opération réussie' });
    });
});

app.listen(PORT, () => {
    console.log(`API sécurisée démarrée sur http://localhost:${PORT}`);
    console.log(`Protection activée : Rate limiting, Validation, Requêtes préparées`);
    console.log(`Endpoints disponibles :`);
    console.log(`   GET    /api/users (authentification requise)`);
    console.log(`   GET    /api/users/:id (authentification requise)`);
    console.log(`   POST   /api/users (rate limit: 5/15min)`);
    console.log(`   DELETE /api/users/:id (authentification requise)`);
    console.log(`   GET    /api/products`);
});
