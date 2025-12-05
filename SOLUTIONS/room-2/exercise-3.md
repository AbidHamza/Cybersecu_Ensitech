# Solution - Exercice 3 : Sécuriser les cookies de session

## Code modifié

### Étape 1 : Génération sécurisée de l'ID de session

```javascript
const crypto = require('crypto');

// Remplacer :
const sessionId = Math.random().toString(36).substring(7);

// Par :
const sessionId = crypto.randomBytes(32).toString('hex');
```

### Étape 2 : Modification de la création du cookie

```javascript
// Remplacer :
res.cookie('session', sessionId);

// Par :
res.cookie('session', sessionId, {
    httpOnly: true,        // Empêche l'accès JavaScript (protection XSS)
    secure: process.env.NODE_ENV === 'production', // HTTPS uniquement en production
    sameSite: 'strict',    // Protection CSRF
    maxAge: 24 * 60 * 60 * 1000 // Expiration en 24 heures
});
```

### Étape 3 : Modification de la suppression du cookie

```javascript
// Remplacer :
res.clearCookie('session');

// Par :
res.clearCookie('session', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
});
```

## Explications détaillées

### httpOnly: true

**Pourquoi** : Empêche l'accès au cookie via JavaScript.

**Protection** : Si une vulnérabilité XSS existe, l'attaquant ne peut pas voler le cookie de session via `document.cookie`.

**Test** : Dans la console du navigateur, essayez `document.cookie` - le cookie ne devrait pas apparaître.

### secure: true

**Pourquoi** : Le cookie n'est envoyé que via HTTPS.

**Protection** : Empêche le vol de cookie via sniffing réseau (attaque man-in-the-middle).

**Note** : En développement (HTTP), désactivez cette option ou utilisez une condition comme dans l'exemple.

### sameSite: 'strict'

**Pourquoi** : Le cookie n'est envoyé que pour les requêtes provenant du même site.

**Protection** : Protection contre CSRF (Cross-Site Request Forgery).

**Alternatives** :
- `'lax'` : Envoie le cookie pour les requêtes GET cross-site (meilleure UX)
- `'none'` : Envoie toujours (nécessite `secure: true`)

### maxAge

**Pourquoi** : Définit l'expiration du cookie.

**Bonnes pratiques** :
- Sessions utilisateur : 24 heures
- Sessions admin : 15-30 minutes
- "Remember me" : 7-30 jours (avec un token séparé)

### crypto.randomBytes() vs Math.random()

**Math.random()** :
- Pseudo-aléatoire, prévisible
- Pas cryptographiquement sécurisé
- Peut être deviné par un attaquant

**crypto.randomBytes()** :
- Cryptographiquement sécurisé
- Imprévisible
- Recommandé pour les données sensibles (sessions, tokens, etc.)

## Code complet modifié

```javascript
const crypto = require('crypto');

// Dans la fonction de login :
const sessionId = crypto.randomBytes(32).toString('hex');
sessions[sessionId] = {
    userId: user.id,
    username: user.username,
    createdAt: Date.now()
};

res.cookie('session', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
});

// Dans la fonction de logout :
res.clearCookie('session', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
});
```

## Ce qui doit être retenu

1. **httpOnly** : Protection XSS
2. **secure** : Protection man-in-the-middle (HTTPS uniquement)
3. **sameSite** : Protection CSRF
4. **crypto.randomBytes()** : Génération sécurisée d'IDs
5. **maxAge** : Expiration appropriée selon le type de session

