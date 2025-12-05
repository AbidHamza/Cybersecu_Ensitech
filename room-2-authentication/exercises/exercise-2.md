# Exercice 2 : Ajouter le rate limiting

## Objectif

Protéger l'endpoint de login contre les attaques par force brute en ajoutant un rate limiter.

## Contexte

Le code vulnérable permet un nombre illimité de tentatives de connexion. Un attaquant pourrait tenter des milliers de mots de passe par seconde.

## Étapes

### Étape 1 : Installer express-rate-limit

```bash
cd room-2-authentication/src-vulnerable
npm install express-rate-limit
```

### Étape 2 : Configurer le rate limiter

Créez un rate limiter qui limite à 5 tentatives toutes les 15 minutes.

**Indice** : Utilisez `rateLimit({ windowMs: 15 * 60 * 1000, max: 5 })`

### Étape 3 : Appliquer le rate limiter

Appliquez le rate limiter uniquement à l'endpoint `/api/login`.

**Indice** : Utilisez le middleware sur la route : `app.post('/api/login', loginLimiter, ...)`

### Étape 4 : Tester

1. Redémarrez l'application
2. Essayez de vous connecter 6 fois avec de mauvais identifiants
3. Vérifiez que vous recevez un message d'erreur après 5 tentatives
4. Attendez 15 minutes (ou modifiez la configuration pour tester plus rapidement)

## Questions de réflexion

- Pourquoi limiter par IP peut ne pas être suffisant (pensez aux VPN, proxy, etc.) ?
- Que faire si un utilisateur légitime est bloqué par erreur ?
- Faut-il limiter différemment selon le type de compte (admin vs utilisateur normal) ?

## Solution

Consultez `/SOLUTIONS/room-2/exercise-2.md` pour voir la solution complète.

