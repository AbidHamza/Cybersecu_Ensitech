# Solution - Exercice 1 : Implémenter le hachage de mots de passe

## Code modifié

### Étape 1 : Installation

```bash
npm install bcrypt
```

### Étape 2 : Modification de l'initialisation

```javascript
const bcrypt = require('bcrypt');

// Dans db.serialize(), remplacer :
db.run(`INSERT INTO users (username, password, email) VALUES 
    ('admin', 'admin123', 'admin@example.com'),
    ('user1', 'password123', 'user1@example.com'),
    ('test', 'test123', 'test@example.com')`);

// Par :
(async () => {
    const adminHash = await bcrypt.hash('admin123', 10);
    const user1Hash = await bcrypt.hash('password123', 10);
    const testHash = await bcrypt.hash('test123', 10);
    
    db.run(`INSERT INTO users (username, password, email) VALUES 
        ('admin', ?, 'admin@example.com'),
        ('user1', ?, 'user1@example.com'),
        ('test', ?, 'test@example.com')`, [adminHash, user1Hash, testHash]);
})();
```

**Note** : Il faut aussi modifier la structure de la table pour renommer `password` en `passwordHash` :

```javascript
db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    email TEXT
)`);
```

### Étape 3 : Modification de la fonction de login

```javascript
const bcrypt = require('bcrypt');

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ success: false, error: 'Nom d\'utilisateur et mot de passe requis' });
    }

    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) {
            return res.json({ success: false, error: 'Erreur serveur' });
        }

        if (!user) {
            return res.json({ success: false, error: 'Identifiants incorrects' });
        }

        // SÉCURISÉ : Comparaison avec bcrypt
        const isValid = await bcrypt.compare(password, user.passwordHash);
        
        if (!isValid) {
            return res.json({ success: false, error: 'Identifiants incorrects' });
        }

        const sessionId = Math.random().toString(36).substring(7);
        sessions[sessionId] = {
            userId: user.id,
            username: user.username,
            createdAt: Date.now()
        };

        res.cookie('session', sessionId);
        res.json({ success: true, message: 'Connexion réussie', user: { id: user.id, username: user.username } });
    });
});
```

## Explications

### Pourquoi bcrypt plutôt que MD5 ou SHA1 ?

- **MD5/SHA1** : Trop rapides, vulnérables aux attaques par force brute avec des GPU
- **bcrypt** : Lent par design (ajustable via le "cost"), résistant aux attaques par force brute
- **Salt automatique** : bcrypt génère un salt unique pour chaque hash automatiquement

### Pourquoi utiliser `bcrypt.compare()` ?

`bcrypt.compare()` :
1. Extrait le salt du hash stocké
2. Hash le mot de passe fourni avec ce salt
3. Compare les deux hashs

On ne peut pas simplement hasher le mot de passe entré et comparer car chaque hash bcrypt a un salt différent.

## Ce qui doit être retenu

1. **Toujours hasher** les mots de passe avec bcrypt (ou argon2, scrypt)
2. **Ne jamais comparer** directement les mots de passe
3. **Utiliser `bcrypt.compare()`** pour la vérification
4. **Le cost factor** (10 dans l'exemple) détermine la lenteur du hachage (plus élevé = plus sûr mais plus lent)

