const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

// Base de données SQLite en mémoire
const db = new sqlite3.Database(':memory:');

// Initialisation de la base de données
db.serialize(async () => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        passwordHash TEXT NOT NULL,
        email TEXT
    )`);

    // Utilisateurs de test avec mots de passe hashés
    // Mots de passe: admin123, password123, test123
    const adminHash = await bcrypt.hash('admin123', 10);
    const user1Hash = await bcrypt.hash('password123', 10);
    const testHash = await bcrypt.hash('test123', 10);

    db.run(`INSERT INTO users (username, passwordHash, email) VALUES 
        ('admin', ?, 'admin@example.com'),
        ('user1', ?, 'user1@example.com'),
        ('test', ?, 'test@example.com')`, [adminHash, user1Hash, testHash]);
});

// Stockage des sessions en mémoire (en production, utiliser Redis ou une base de données)
const sessions = {};

// Rate limiting pour le login - PROTECTION contre brute force
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 tentatives maximum
    message: { error: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Route d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route de login - SÉCURISÉE
app.post('/api/login', loginLimiter, async (req, res) => {
    const { username, password } = req.body;

    // Validation des entrées
    if (!username || !password) {
        return res.json({ success: false, error: 'Identifiants incorrects' });
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
        return res.json({ success: false, error: 'Identifiants incorrects' });
    }

    // Recherche de l'utilisateur
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) {
            console.error('Erreur base de données:', err);
            return res.json({ success: false, error: 'Erreur serveur' });
        }

        // SÉCURISÉ: Message d'erreur générique (ne révèle pas si l'utilisateur existe)
        // SÉCURISÉ: Comparaison avec hash (pas de comparaison directe)
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            // Même message d'erreur dans les deux cas pour ne pas révéler l'existence de l'utilisateur
            return res.json({ success: false, error: 'Identifiants incorrects' });
        }

        // SÉCURISÉ: Génération d'un ID de session sécurisé
        const sessionId = require('crypto').randomBytes(32).toString('hex');
        sessions[sessionId] = {
            userId: user.id,
            username: user.username,
            createdAt: Date.now()
        };

        // SÉCURISÉ: Cookie avec toutes les options de sécurité
        res.cookie('session', sessionId, {
            httpOnly: true, // Empêche l'accès JavaScript (protection XSS)
            secure: process.env.NODE_ENV === 'production', // HTTPS uniquement en production
            sameSite: 'strict', // Protection CSRF
            maxAge: 24 * 60 * 60 * 1000 // 24 heures
        });

        res.json({ 
            success: true, 
            message: 'Connexion réussie', 
            user: { id: user.id, username: user.username } 
        });
    });
});

// Route pour vérifier la session
app.get('/api/me', (req, res) => {
    const sessionId = req.cookies.session;

    if (!sessionId || !sessions[sessionId]) {
        return res.json({ success: false, error: 'Non authentifié' });
    }

    // Vérification de l'expiration de la session (24 heures)
    const session = sessions[sessionId];
    const sessionAge = Date.now() - session.createdAt;
    if (sessionAge > 24 * 60 * 60 * 1000) {
        delete sessions[sessionId];
        return res.json({ success: false, error: 'Session expirée' });
    }

    res.json({ success: true, user: { id: session.userId, username: session.username } });
});

// Route de déconnexion
app.post('/api/logout', (req, res) => {
    const sessionId = req.cookies.session;
    if (sessionId && sessions[sessionId]) {
        delete sessions[sessionId];
    }
    res.clearCookie('session', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    res.json({ success: true, message: 'Déconnexion réussie' });
});

// Route pour lister les utilisateurs - SÉCURISÉE (authentification requise)
app.get('/api/users', (req, res) => {
    const sessionId = req.cookies.session;

    // Vérification de l'authentification
    if (!sessionId || !sessions[sessionId]) {
        return res.status(401).json({ success: false, error: 'Authentification requise' });
    }

    // SÉCURISÉ: Ne pas exposer les mots de passe hashés
    db.all('SELECT id, username, email FROM users', (err, users) => {
        if (err) {
            return res.json({ success: false, error: 'Erreur serveur' });
        }
        res.json({ success: true, users });
    });
});

app.listen(PORT, () => {
    console.log(`Application sécurisée démarrée sur http://localhost:${PORT}`);
    console.log('Cette version implémente les bonnes pratiques de sécurité');
});

