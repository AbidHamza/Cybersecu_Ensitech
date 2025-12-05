# Exercice 1 : Corriger les injections SQL

## Objectif

Modifier le code vulnérable pour utiliser des requêtes préparées.

## Code à modifier

Dans `/src-vulnerable/server.js`, corrigez les endpoints suivants :

1. `/api/books` (GET) - Recherche de livres
2. `/api/books/:id` (GET) - Recherche par ID
3. `/api/login` (POST) - Authentification

## Instructions

### Étape 1 : Corriger la recherche de livres

Remplacez la concaténation directe par une requête préparée.

**Indice** : Utilisez `db.all(query, [param1, param2], callback)` avec des placeholders `?`.

### Étape 2 : Corriger la recherche par ID

Ajoutez une validation de l'ID (doit être un nombre) et utilisez une requête préparée.

### Étape 3 : Corriger le login

Utilisez une requête préparée pour la recherche de l'utilisateur.

## Tests

Après vos modifications, testez que :
1. La recherche fonctionne toujours normalement
2. Les tentatives d'injection SQL échouent
3. Les fonctionnalités légitimes fonctionnent toujours

## Solution

Consultez `/SOLUTIONS/room-3/exercise-1.md` pour la solution complète.

