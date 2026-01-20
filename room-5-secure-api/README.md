# Room 5 - Sécuriser une API

## Objectif de la room

Cette room vous apprend à sécuriser une API REST complète en appliquant toutes les bonnes pratiques apprises dans les rooms précédentes.

À la fin de cette room, vous serez capable de :
- Identifier les erreurs courantes dans une API
- Implémenter la validation d'input complète
- Ajouter le rate limiting
- Gérer les erreurs de manière sécurisée
- Tester la sécurité d'une API avec Postman

## Scénario narratif

Vous devez auditer et sécuriser une API REST existante. L'API gère des utilisateurs et des produits. Votre mission : identifier toutes les vulnérabilités et implémenter les corrections.

---

## Qu'est-ce qu'une API REST ?

### Définition simple

Une API REST est comme un menu de restaurant :
- Le menu (API) liste ce que vous pouvez commander (endpoints)
- Vous commandez (requête HTTP)
- Le serveur apporte votre plat (réponse JSON)

### Exemple concret

Quand vous utilisez une application mobile :
1. L'application demande à l'API : "Donne-moi la liste des produits"
2. L'API répond avec les données en JSON
3. L'application affiche les produits

### Pourquoi tester une API ?

Les APIs sont souvent moins protégées que les sites web car :
- Elles sont moins visibles (pas d'interface graphique)
- Elles acceptent des données directement
- Elles peuvent exposer des informations sensibles

### Méthodes HTTP courantes

- **GET** : Récupérer des données (lecture)
- **POST** : Créer de nouvelles données
- **PUT** : Modifier des données existantes
- **DELETE** : Supprimer des données

---

## Démarrage

### Prérequis

Avant de commencer, vérifiez que vous avez :

- Docker installé et fonctionnel
- Docker Compose installé et fonctionnel
- Un navigateur web (pour tester les requêtes GET)
- Postman (optionnel mais recommandé) pour tester toutes les méthodes HTTP

### Vérification de l'installation

#### Vérifier Docker

**Windows (PowerShell) :**
```powershell
docker --version
# Résultat attendu : Docker version 20.10.x ou supérieur
```

**Mac/Linux (Terminal) :**
```bash
docker --version
# Résultat attendu : Docker version 20.10.x ou supérieur
```

#### Installer Postman (optionnel mais recommandé)

**Qu'est-ce que Postman ?**

Postman est un outil qui permet de tester des APIs facilement sans avoir à écrire du code. Vous pouvez :
- Envoyer des requêtes HTTP (GET, POST, PUT, DELETE)
- Voir les réponses
- Sauvegarder vos tests
- Partager des collections

**Installation :**

1. **Windows/Mac :**
   - Allez sur : https://www.postman.com/downloads/
   - Téléchargez Postman pour votre système
   - Installez-le comme n'importe quelle application

2. **Linux :**
   ```bash
   # Via Snap
   sudo snap install postman
   
   # Ou téléchargez depuis le site officiel
   ```

**Vérification :**
- Lancez Postman
- Vous devriez voir l'interface principale
- Si c'est la première fois, créez un compte (gratuit) ou cliquez sur "Skip"

**Pourquoi utiliser Postman ?**
- Teste les APIs facilement
- Sauvegarde vos requêtes
- Partage des collections de tests
- Visualise les réponses

### Lancer l'environnement

**Explication :** Nous allons lancer deux versions de l'API : une vulnérable et une sécurisée, pour comparer.

#### Windows (PowerShell)

```powershell
# 1. Naviguez vers le dossier de la room
cd C:\Users\VotreNom\Desktop\Cybersecu_Ensitech\room-5-secure-api

# 2. Lancez Docker Compose
docker-compose up -d

# 3. Vérifiez que ça fonctionne
docker-compose ps
# Vous devriez voir deux conteneurs : room5-api-vulnerable et room5-api-secured
```

#### Mac/Linux (Terminal)

```bash
# 1. Naviguez vers le dossier de la room
cd ~/Desktop/Cybersecu_Ensitech/room-5-secure-api

# 2. Lancez Docker Compose
docker-compose up -d

# 3. Vérifiez que ça fonctionne
docker-compose ps
# Vous devriez voir deux conteneurs : room5-api-vulnerable et room5-api-secured
```

**Vérification :**

- API vulnérable : `http://localhost:3006`
- API sécurisée : `http://localhost:3007`

**Test rapide :**

Ouvrez votre navigateur et allez sur :
- `http://localhost:3006/api/products` → Devrait afficher du JSON
- `http://localhost:3007/api/products` → Devrait afficher du JSON

**Si ça ne fonctionne pas :**

- Vérifiez les logs : `docker-compose logs`
- Vérifiez que les ports 3006 et 3007 ne sont pas déjà utilisés
- Assurez-vous que Docker Desktop est lancé

## Erreurs courantes identifiées

1. Absence d'authentification sur endpoints sensibles
2. Manque de validation d'input
3. Exposition de données sensibles
4. Pas de rate limiting
5. Messages d'erreur trop informatifs
6. Pas de headers de sécurité

## Bonnes pratiques à implémenter

- Validation complète des entrées
- Rate limiting sur tous les endpoints
- Authentification et autorisation
- Gestion d'erreurs sécurisée
- Headers de sécurité (CORS, CSP, etc.)
- Logging des événements importants

## Ressources pédagogiques

### Ordre recommandé de consultation

Pour tirer le meilleur parti de cette room, suivez cet ordre :

1. **Lisez ce README** pour comprendre les erreurs courantes dans les APIs
2. **Analysez l'API vulnérable** pour identifier toutes les vulnérabilités
3. **Réalisez l'exercice** dans `/exercises/` pour sécuriser l'API
4. **Testez avec Postman** en utilisant la collection dans `/tests-postman/`
5. **Vérifiez votre implémentation** avec la checklist de sécurité

### Exercices guidés

L'exercice vous guide pour sécuriser l'API complète :

- **[Exercice 1 : Sécuriser une API vulnérable](./exercises/exercise-1.md)** - Identifier et corriger toutes les vulnérabilités dans l'API fournie

**Conseil** : Utilisez les connaissances acquises dans les rooms précédentes (authentication, SQL injection, validation, etc.). Consultez la solution dans `/SOLUTIONS/room-5/` uniquement après avoir tenté de résoudre par vous-même.

### Comment tester une API sans Postman ?

Si vous n'avez pas Postman, vous pouvez utiliser plusieurs alternatives :

#### Option 1 : Navigateur (pour GET seulement)

Ouvrez simplement l'URL dans votre navigateur :
```
http://localhost:3006/api/products
```

**Limitation :** Le navigateur ne peut faire que des requêtes GET. Pour POST, PUT, DELETE, utilisez les autres options.

#### Option 2 : curl (ligne de commande)

**Windows (PowerShell) :**
```powershell
# Requête GET
curl http://localhost:3006/api/products

# Requête POST
curl -X POST http://localhost:3006/api/users `
  -H "Content-Type: application/json" `
  -d '{\"username\":\"test\",\"email\":\"test@test.com\",\"password\":\"test123\"}'
```

**Mac/Linux (Terminal) :**
```bash
# Requête GET
curl http://localhost:3006/api/products

# Requête POST
curl -X POST http://localhost:3006/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123"}'
```

#### Option 3 : Extension navigateur

Installez une extension dans Chrome ou Firefox :
- **REST Client** (Chrome)
- **Talend API Tester** (Chrome)
- **RESTer** (Firefox)

Ces extensions permettent de faire toutes les méthodes HTTP directement depuis le navigateur.

#### Option 4 : Utiliser Postman (recommandé)

Postman reste l'option la plus simple et complète. Consultez `/tests-postman/README.md` pour un guide d'installation et d'utilisation.

### Tests Postman

Consultez `/tests-postman/` pour une collection de tests de sécurité qui vous permettront de :
- Tester les endpoints de l'API
- Vérifier les protections en place
- Identifier les vulnérabilités restantes

### Checklist de sécurité

Utilisez la **[checklist de sécurité complète](./checklists/security-checklist.md)** pour vérifier que votre API est sécurisée avant déploiement. Cette checklist couvre :

- Validation complète des inputs
- Authentification et autorisation
- Rate limiting
- Gestion d'erreurs sécurisée
- Headers de sécurité (CORS, CSP, HSTS, etc.)
- Protection des données sensibles
- Logging approprié

**Conseil** : Utilisez cette checklist comme référence lors du développement de vos propres APIs.

## Comment partager vos réponses et votre code

Pour partager votre API sécurisée, c'est très simple :

### Méthode simple : Créer une Issue GitHub

1. Allez sur la page GitHub du dépôt
2. Cliquez sur **"Issues"** puis **"New Issue"**
3. Dans le **titre**, écrivez : `[Room 5] API sécurisée - Votre nom`
4. Dans le **corps**, collez directement votre code

**C'est tout !** Collez simplement votre code dans l'issue.

### Format simple pour partager

Copiez-collez ce format :

````
# Mes réponses - Room 5

## Vulnérabilités que j'ai identifiées :
1. [Nom de la vulnérabilité] : [Description]
2. [Nom de la vulnérabilité] : [Description]
3. [Nom de la vulnérabilité] : [Description]

## Corrections que j'ai apportées :
- [Liste de vos corrections]
- [Ce que vous avez changé]

## Code sécurisé :

```javascript
// Collez ici votre code API sécurisé
// Vous pouvez coller plusieurs blocs de code si nécessaire
```

## Tests que j'ai effectués :
- [Liste des tests]
- [Ce que vous avez vérifié]
````

**Astuce** : Si votre code est très long, vous pouvez créer plusieurs issues (une pour chaque endpoint ou fonctionnalité).

### Si vous avez des questions

Créez une issue avec le titre : `[Question] Room 5 - Votre question`

Expliquez :
- Ce que vous essayez de faire
- Le problème que vous rencontrez
- Ce que vous avez déjà essayé

## Arrêter l'environnement

Quand vous avez terminé :

```bash
# Depuis le dossier room-5-secure-api
docker-compose down
```

**Que fait cette commande ?**

- Arrête tous les conteneurs de cette room
- Libère les ports utilisés
- Nettoie les ressources Docker

---

## Questions fréquentes

**Q : Pourquoi utiliser Postman au lieu du navigateur ?**

R : Le navigateur ne peut faire que des requêtes GET. Postman permet de tester toutes les méthodes HTTP (POST, PUT, DELETE, etc.) et d'envoyer des données JSON.

**Q : C'est quoi le rate limiting ?**

R : Le rate limiting limite le nombre de requêtes. Par exemple, maximum 5 tentatives de connexion par 15 minutes. Cela protège contre les attaques par force brute.

**Q : Pourquoi ne pas exposer les messages d'erreur détaillés ?**

R : Les messages d'erreur détaillés donnent des informations à l'attaquant sur la structure de votre système. Il faut donner des messages génériques aux utilisateurs et logger les détails côté serveur.

**Q : Comment tester une API sans connaître le code ?**

R : Commencez par tester les endpoints GET dans le navigateur. Ensuite, utilisez les outils développeur du navigateur (F12 → Network) pour voir les requêtes que fait l'application. Cela vous donnera des indices sur les endpoints disponibles.

---

## Glossaire

- **API (Application Programming Interface)** : Interface qui permet à des applications de communiquer
- **REST (Representational State Transfer)** : Style d'architecture pour les APIs web
- **Rate Limiting** : Limitation du nombre de requêtes par période
- **Validation** : Vérification que les données sont correctes
- **Authentification** : Vérification de l'identité d'un utilisateur
- **Autorisation** : Vérification des permissions d'un utilisateur
- **JSON (JavaScript Object Notation)** : Format de données utilisé par les APIs
- **Endpoint** : Point d'entrée d'une API (ex: /api/users)

---

## Prochaines étapes

Une fois que vous maîtrisez la sécurisation d'API, vous êtes prêt pour la **Room 6 - Mini Pentest Web**.

