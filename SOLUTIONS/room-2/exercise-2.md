# Solution - Exercice 2 : Ajouter le rate limiting

## Code modifié

### Étape 1 : Installation

```bash
npm install express-rate-limit
```

### Étape 2 : Configuration

```javascript
const rateLimit = require('express-rate-limit');

// Rate limiter pour le login
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 tentatives maximum
    message: { error: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.' },
    standardHeaders: true, // Retourne les headers RateLimit-* dans la réponse
    legacyHeaders: false, // Désactive les headers X-RateLimit-*
});
```

### Étape 3 : Application

```javascript
// Appliquer le rate limiter uniquement à l'endpoint de login
app.post('/api/login', loginLimiter, async (req, res) => {
    // ... reste du code
});
```

## Configuration avancée (optionnel)

Pour un rate limiting plus sophistiqué, vous pouvez :

```javascript
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.' },
    // Utiliser l'IP ET le nom d'utilisateur pour le rate limiting
    keyGenerator: (req) => {
        return `${req.ip}-${req.body.username || 'unknown'}`;
    },
    // Skip les requêtes réussies (ne compter que les échecs)
    skipSuccessfulRequests: true,
});
```

## Explications

### Pourquoi limiter par IP peut ne pas suffire

- **VPN/Proxy** : Les attaquants peuvent changer d'IP facilement
- **Réseaux partagés** : Plusieurs utilisateurs légitimes peuvent partager la même IP
- **Botnets** : Les attaquants peuvent utiliser des milliers d'IPs différentes

**Solution** : Combiner IP + nom d'utilisateur (comme dans l'exemple avancé ci-dessus).

### Que faire si un utilisateur légitime est bloqué ?

1. **Messages clairs** : Indiquer quand le compte sera débloqué
2. **Support** : Fournir un moyen de contacter le support pour débloquer
3. **CAPTCHA** : Après quelques tentatives, demander un CAPTCHA au lieu de bloquer complètement
4. **Whitelist** : Pour les IPs de confiance (bureaux, etc.)

### Faut-il limiter différemment selon le type de compte ?

Oui, pour les comptes administrateurs :
- Limite plus stricte (ex: 3 tentatives au lieu de 5)
- Fenêtre plus longue (ex: 30 minutes au lieu de 15)
- Notification immédiate en cas de blocage
- Peut-être même bloquer immédiatement et nécessiter une intervention manuelle

## Ce qui doit être retenu

1. **Rate limiting essentiel** pour protéger contre les attaques par force brute
2. **Configuration appropriée** : pas trop strict (bloque les utilisateurs légitimes) ni trop permissif
3. **Messages clairs** pour informer l'utilisateur
4. **Considérer l'IP + username** pour un rate limiting plus précis

