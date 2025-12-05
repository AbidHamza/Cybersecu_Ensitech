const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

// Base de données SQLite en mémoire
const db = new sqlite3.Database(':memory:');

// Initialisation de la base de données
db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT
    )`);

    // Utilisateurs de test (mots de passe en clair - VULNÉRABLE)
    db.run(`INSERT INTO users (username, password, email) VALUES 
        ('admin', 'admin123', 'admin@example.com'),
        ('user1', 'password123', 'user1@example.com'),
        ('test', 'test123', 'test@example.com')`);
});

// Stockage des sessions en mémoire (VULNÉRABLE - pas de sécurité)
const sessions = {};

// Route d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route de login - VULNÉRABLE
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ success: false, error: 'Nom d\'utilisateur et mot de passe requis' });
    }

    // Recherche de l'utilisateur
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) {
            return res.json({ success: false, error: 'Erreur serveur' });
        }

        // VULNÉRABILITÉ 1: Comparaison directe des mots de passe (stockés en clair)
        if (!user) {
            // VULNÉRABILITÉ 2: Message d'erreur révèle que l'utilisateur n'existe pas
            return res.json({ success: false, error: 'Nom d\'utilisateur incorrect' });
        }

        // VULNÉRABILITÉ 1: Comparaison en clair
        if (user.password !== password) {
            // VULNÉRABILITÉ 2: Message d'erreur révèle que le mot de passe est incorrect
            return res.json({ success: false, error: 'Mot de passe incorrect' });
        }

        // VULNÉRABILITÉ 3: Pas de protection contre brute force
        // VULNÉRABILITÉ 4: Session non sécurisée
        const sessionId = Math.random().toString(36).substring(7);
        sessions[sessionId] = {
            userId: user.id,
            username: user.username,
            createdAt: Date.now()
        };

        // VULNÉRABILITÉ 5: Cookie non sécurisé (pas de httpOnly, secure, sameSite)
        res.cookie('session', sessionId);
        res.json({ success: true, message: 'Connexion réussie', user: { id: user.id, username: user.username } });
    });
});

// Route pour vérifier la session
app.get('/api/me', (req, res) => {
    const sessionId = req.cookies.session;

    if (!sessionId || !sessions[sessionId]) {
        return res.json({ success: false, error: 'Non authentifié' });
    }

    const session = sessions[sessionId];
    res.json({ success: true, user: { id: session.userId, username: session.username } });
});

// Route de déconnexion
app.post('/api/logout', (req, res) => {
    const sessionId = req.cookies.session;
    if (sessionId && sessions[sessionId]) {
        delete sessions[sessionId];
    }
    res.clearCookie('session');
    res.json({ success: true, message: 'Déconnexion réussie' });
});

// Route pour lister tous les utilisateurs (VULNÉRABLE - pas d'authentification requise)
app.get('/api/users', (req, res) => {
    db.all('SELECT id, username, email, password FROM users', (err, users) => {
        if (err) {
            return res.json({ success: false, error: 'Erreur serveur' });
        }
        // VULNÉRABILITÉ 6: Exposition des mots de passe dans la réponse
        res.json({ success: true, users });
    });
});

app.listen(PORT, () => {
    console.log(`Application vulnérable démarrée sur http://localhost:${PORT}`);
    console.log('ATTENTION: Cette application contient des vulnérabilités intentionnelles pour démonstration pédagogique');
});

