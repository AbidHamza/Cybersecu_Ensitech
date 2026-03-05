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

Après vos modifications, relancez l'application :

```bash
# Depuis le dossier room-3-sql-injection
docker-compose down
docker-compose up -d --build
```

Puis testez les 3 cas suivants :

### Test 1 : La recherche normale fonctionne toujours

Allez sur `http://localhost:3002` et cherchez `Harry Potter`.

**Résultat attendu** : Le livre s'affiche normalement.

**Si ça ne marche pas** : Vérifiez que vous avez bien passé le paramètre `[`%${search}%`]` à votre requête préparée.

---

### Test 2 : L'injection SQL est bloquée

Dans le champ de recherche, entrez : `' OR '1'='1`

**Résultat attendu** : Aucun résultat, ou le texte est traité comme une recherche littérale.

**Si l'injection fonctionne encore** : Vous utilisez peut-être encore la concaténation. Vérifiez que la requête contient bien un `?` et que le paramètre est passé dans le tableau.

---

### Test 3 : Le login n'est plus injectable

Depuis la console du navigateur (F12) ou avec curl :

```bash
curl -X POST http://localhost:3002/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin'\''--", "password": "nimportequoi"}'
```

**Résultat attendu** : `{ "success": false }` — la connexion échoue.

**Si la connexion réussit** : Votre endpoint `/api/login` contient encore une concaténation directe.

## Solution

Consultez `/SOLUTIONS/room-3/exercise-1.md` pour la solution complète.

