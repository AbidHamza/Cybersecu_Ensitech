# Exercice 3 : Sécuriser les cookies de session

## Objectif

Modifier les cookies de session pour qu'ils soient sécurisés contre les attaques XSS et CSRF.

## Contexte

Dans le code vulnérable, les cookies sont créés sans options de sécurité. Ils peuvent être volés via XSS ou utilisés dans des attaques CSRF.

## Étapes

### Étape 1 : Modifier la création du cookie

Modifiez la ligne qui crée le cookie de session pour ajouter les options de sécurité :
- `httpOnly: true` (empêche l'accès JavaScript)
- `secure: true` (HTTPS uniquement - désactivez en développement si nécessaire)
- `sameSite: 'strict'` (protection CSRF)
- `maxAge: 24 * 60 * 60 * 1000` (expiration en 24 heures)

### Étape 2 : Modifier la suppression du cookie

Modifiez également la fonction de déconnexion pour utiliser les mêmes options lors de la suppression du cookie.

### Étape 3 : Générer un ID de session sécurisé

Remplacez `Math.random().toString(36)` par une génération sécurisée utilisant `crypto.randomBytes`.

**Indice** : `require('crypto').randomBytes(32).toString('hex')`

### Étape 4 : Tester

1. Redémarrez l'application
2. Connectez-vous
3. Ouvrez les outils de développement du navigateur
4. Vérifiez dans l'onglet Application/Storage que le cookie a les bons flags
5. Essayez d'accéder au cookie via JavaScript dans la console (devrait échouer avec httpOnly)

## Questions de réflexion

- Pourquoi `httpOnly` protège-t-il contre XSS ?
- Quelle est la différence entre `sameSite: 'strict'` et `sameSite: 'lax'` ?
- Pourquoi ne pas utiliser `Math.random()` pour générer des IDs de session ?

## Solution

Consultez `/SOLUTIONS/room-2/exercise-3.md` pour voir la solution complète.

