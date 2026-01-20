# Tests Postman pour Room 5

## Qu'est-ce que Postman ?

Postman est un outil qui permet de tester des APIs facilement. Vous pouvez :
- Envoyer des requêtes HTTP (GET, POST, PUT, DELETE)
- Voir les réponses
- Sauvegarder vos tests
- Partager des collections

## Installation

### Windows et Mac

1. Allez sur : https://www.postman.com/downloads/
2. Téléchargez Postman pour votre système d'exploitation
3. Installez-le comme n'importe quelle application

### Linux

```bash
# Via Snap
sudo snap install postman

# Ou téléchargez depuis le site officiel
```

## Vérification de l'installation

1. Lancez Postman
2. Vous devriez voir l'interface principale
3. Si c'est la première fois, créez un compte (gratuit) ou cliquez sur "Skip"

## Utilisation de base

### Tester une requête GET

1. Ouvrez Postman
2. Cliquez sur "New" → "HTTP Request"
3. Sélectionnez "GET" dans le menu déroulant
4. Entrez l'URL : `http://localhost:3006/api/products`
5. Cliquez sur "Send"

**Résultat attendu :** Vous devriez voir une réponse JSON avec la liste des produits.

### Tester une requête POST

1. Créez une nouvelle requête
2. Sélectionnez "POST"
3. Entrez l'URL : `http://localhost:3006/api/users`
4. Cliquez sur "Body" → "raw" → "JSON"
5. Entrez le JSON :
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "testpass123"
}
```
6. Cliquez sur "Send"

**Résultat attendu :** Vous devriez voir une réponse avec le nouvel utilisateur créé.

## Tests à effectuer

### Test 1 : Injection SQL

**Objectif :** Tester si l'API vulnérable est protégée contre les injections SQL

**Étapes :**

1. Créez une requête GET vers `http://localhost:3006/api/users/1`
2. Modifiez l'URL pour : `http://localhost:3006/api/users/1 OR 1=1`
3. Envoyez la requête

**Résultat attendu (vulnérable) :** Erreur SQL ou comportement inattendu

**Résultat attendu (sécurisé) :** Erreur 400 "ID invalide"

### Test 2 : Rate Limiting

**Objectif :** Tester si le rate limiting fonctionne

**Étapes :**

1. Créez une requête POST vers `http://localhost:3007/api/users`
2. Envoyez la requête 6 fois rapidement

**Résultat attendu (sécurisé) :** Après 5 requêtes, vous devriez recevoir une erreur 429 "Too Many Requests"

### Test 3 : Validation

**Objectif :** Tester si la validation fonctionne

**Étapes :**

1. Créez une requête POST vers `http://localhost:3007/api/users`
2. Envoyez un JSON avec des données invalides :
```json
{
  "username": "ab",
  "email": "invalid-email",
  "password": "123"
}
```

**Résultat attendu (sécurisé) :** Erreur 400 avec la liste des erreurs de validation

## Collection Postman

Une collection de tests est disponible dans le fichier `room5-api-tests.json`. Pour l'importer :

1. Ouvrez Postman
2. Cliquez sur "Import"
3. Sélectionnez le fichier `room5-api-tests.json`
4. La collection apparaîtra dans votre sidebar

## Conseils

- Sauvegardez vos requêtes en créant une collection
- Utilisez des variables d'environnement pour les URLs (ex: `{{base_url}}/api/users`)
- Testez d'abord l'API vulnérable, puis comparez avec l'API sécurisée
