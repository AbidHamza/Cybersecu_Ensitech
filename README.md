# Web Security Academy

Un dépôt pédagogique complet pour comprendre et pratiquer la sécurité des applications web.

## Objectif général

Ce dépôt a été conçu pour les développeurs débutants souhaitant acquérir des bases solides en sécurité web. Chaque room (salle) aborde un thème spécifique de manière progressive, avec des exemples concrets, du code vulnérable à analyser, des versions sécurisées pour comparaison, et des exercices guidés.

L'objectif n'est pas de devenir un expert en cybersécurité, mais de comprendre les vulnérabilités courantes, leurs impacts, et les bonnes pratiques pour les éviter dès le développement.

## Comment utiliser les rooms

Chaque room est indépendante mais suit une progression logique :

1. **Lisez le README de la room** pour comprendre le contexte et les objectifs
2. **Suivez le scénario narratif** pour vous immerger dans le contexte
3. **Analysez le code vulnérable** fourni dans `/src-vulnerable/`
4. **Réalisez les exercices** proposés dans `/exercises/`
5. **Consultez la checklist** pour vérifier votre compréhension
6. **Comparez avec la version sécurisée** dans `/src-secured/`
7. **Consultez les solutions** dans `/SOLUTIONS/` si besoin

**Important** : Ne consultez les solutions qu'après avoir tenté de résoudre les exercices par vous-même.

## Préparer son environnement

### Prérequis techniques

- **Docker** et **Docker Compose** : pour lancer les environnements isolés
- **Node.js** (version 18 ou supérieure) : pour exécuter les applications
- **Postman** (optionnel) : pour tester les APIs dans la Room 5
- **Un éditeur de code** : VS Code, WebStorm, ou autre
- **Git** : pour cloner et versionner

### Installation rapide

1. Clonez le dépôt :
```bash
git clone <url-du-depot>
cd web-sec-academy
```

2. Vérifiez Docker :
```bash
docker --version
docker-compose --version
```

3. Lancez un environnement de test :
```bash
cd room-2-authentication
docker-compose up
```

## Lancer les environnements

Chaque room contient un `docker-compose.yml` pour lancer l'environnement vulnérable et/ou sécurisé.

### Lancer une room spécifique

```bash
cd room-3-sql-injection
docker-compose up -d
```

L'application sera accessible sur le port indiqué dans le README de la room.

### Arrêter un environnement

```bash
docker-compose down
```

### Voir les logs

```bash
docker-compose logs -f
```

## Pourquoi la sécurité concerne chaque développeur

La sécurité n'est pas uniquement l'affaire des experts en cybersécurité. En tant que développeur, vous êtes la première ligne de défense :

- **Vous écrivez le code** : les vulnérabilités naissent souvent d'erreurs de développement
- **Vous connaissez l'architecture** : vous savez où sont les points sensibles
- **Vous pouvez prévenir** : il est plus facile d'éviter une vulnérabilité que de la corriger après coup
- **Les utilisateurs vous font confiance** : leurs données personnelles transitent par votre code

Un code sécurisé dès le départ réduit les risques, protège les utilisateurs, et évite des coûts de correction importants.

## Introduction au OWASP Top 10

L'OWASP (Open Web Application Security Project) publie régulièrement une liste des 10 risques de sécurité les plus critiques pour les applications web. Ce dépôt couvre plusieurs d'entre eux :

1. **Injection** (Room 3) : SQL, NoSQL, OS, LDAP
2. **Authentification défaillante** (Room 2) : gestion incorrecte des sessions et identités
3. **Exposition de données sensibles** (Room 5) : données non chiffrées ou mal protégées
4. **XSS - Cross-Site Scripting** (Room 4) : injection de scripts malveillants
5. **Contrôle d'accès défaillant** : permissions insuffisantes ou mal configurées
6. **Configuration de sécurité incorrecte** : paramètres par défaut dangereux
7. **XSS basé sur le DOM** : variante du XSS
8. **Désérialisation non sécurisée** : manipulation d'objets sérialisés
9. **Utilisation de composants avec vulnérabilités connues** : dépendances obsolètes
10. **Journalisation et surveillance insuffisantes** : manque de traçabilité

## Glossaire des notions fondamentales

### Vulnérabilité
Une faiblesse dans le code, la configuration, ou l'architecture d'une application qui peut être exploitée. Une vulnérabilité existe indépendamment de toute tentative d'exploitation et peut être corrigée avant d'être exploitée. Elle peut être découverte par des audits de code, des tests de sécurité, ou accidentellement.

**Types** : Vulnérabilités de code (bugs), de configuration (paramètres incorrects), ou d'architecture (problèmes de conception).

### Menace
Un danger potentiel qui peut exploiter une vulnérabilité. Une menace peut être intentionnelle (attaquant malveillant) ou accidentelle (erreur humaine), interne (employé) ou externe (hacker), automatisée (bot) ou manuelle.

**Exemples** : Attaquant externe, utilisateur malveillant, malware, erreur humaine, catastrophe naturelle.

### Risque
La combinaison d'une vulnérabilité et d'une menace, pondérée par l'impact potentiel. Le risque représente la probabilité qu'un événement indésirable se produise et les conséquences de cet événement.

**Formule** : Risque = Vulnérabilité × Menace × Impact

**Niveaux** : Critique (action immédiate), Élevé (action urgente), Moyen (action planifiée), Faible (surveillance).

### Attaque
L'exploitation concrète d'une vulnérabilité par une menace. C'est l'action réelle d'un attaquant utilisant une vulnérabilité pour atteindre un objectif malveillant. Une attaque peut réussir (exploitation réussie) ou échouer (protection en place).

**Types** : Attaque active (modifie les données), passive (observe sans modifier), par déni de service (rend le service indisponible), par force brute (tente toutes les combinaisons).

### Exploit
Un code ou une technique utilisée pour exploiter une vulnérabilité. C'est la "recette" concrète qui permet à un attaquant d'utiliser une vulnérabilité pour atteindre son objectif.

**Exemple** : Un script qui envoie `' OR '1'='1` dans un champ de recherche pour exploiter une injection SQL.

### Mitigation
Une mesure de protection mise en place pour réduire ou éliminer un risque. Les mitigations peuvent être techniques (code sécurisé, configuration), organisationnelles (procédures, formation), ou physiques (sécurité des locaux).

**Exemples** : Requêtes préparées (mitigation contre injection SQL), échappement HTML (mitigation contre XSS), rate limiting (mitigation contre brute force).

### Authentication (Authentification)
Le processus de vérification de l'identité d'un utilisateur. Répond à la question "Qui êtes-vous ?". Généralement effectué via un nom d'utilisateur et un mot de passe, mais peut aussi utiliser des méthodes plus avancées (2FA, biométrie, certificats).

**Exemple** : Un utilisateur se connecte avec son nom d'utilisateur et son mot de passe. Le système vérifie que ces identifiants correspondent à un compte existant.

### Authorization (Autorisation)
Le processus de vérification des permissions d'un utilisateur. Répond à la question "Que pouvez-vous faire ?". Vérifie si un utilisateur authentifié a le droit d'accéder à une ressource ou d'effectuer une action.

**Exemple** : Un utilisateur authentifié essaie d'accéder à une page d'administration. Le système vérifie si cet utilisateur a le rôle "admin" avant d'autoriser l'accès.

**Mnémonique** : Authentication = "Qui êtes-vous ?", Authorization = "Que pouvez-vous faire ?"

### Hash (Hachage)
Une fonction cryptographique unidirectionnelle qui transforme une donnée (comme un mot de passe) en une chaîne de caractères de taille fixe, de manière irréversible. C'est une transformation à sens unique : on peut hasher un mot de passe, mais on ne peut pas "déhasher" pour retrouver le mot de passe original.

**Caractéristiques** : Unidirectionnel, déterministe (même entrée = même sortie avec le même salt), lent par design (résistant aux attaques par force brute), résistant aux collisions.

**Algorithme recommandé pour mots de passe** : bcrypt, argon2, scrypt (éviter MD5, SHA1, SHA256 qui sont trop rapides).

### Salt (Sel)
Une valeur aléatoire unique ajoutée au mot de passe avant le hachage. Chaque utilisateur a son propre salt, qui est généralement stocké avec le hash.

**Pourquoi essentiel** : Protège contre les rainbow tables (tables pré-calculées), assure l'unicité des hashs (même mot de passe = hashs différents), renforce la résistance aux attaques.

**Bonnes pratiques** : Aléatoire, unique pour chaque utilisateur, suffisamment long (au moins 16 caractères), stocké avec le hash (pas besoin de le cacher).

### Injection
L'injection de code malveillant dans une application via des entrées utilisateur non validées. L'attaquant modifie la structure d'une requête ou d'une commande en injectant des caractères spéciaux et du code malveillant.

**Types** : SQL Injection (injection de code SQL), NoSQL Injection, Command Injection (injection de commandes système), LDAP Injection, XPath Injection.

**Impact** : Accès non autorisé aux données, modification ou suppression de données, exécution de commandes, bypass d'authentification.

### XSS (Cross-Site Scripting)
L'injection de scripts JavaScript malveillants dans une page web vue par d'autres utilisateurs. Le JavaScript injecté s'exécute dans le contexte du site web légitime, avec les mêmes privilèges que le JavaScript légitime.

**Types** : XSS Réfléchi (code reflété immédiatement), XSS Stocké (code stocké dans la base de données), XSS basé sur le DOM (code injecté via manipulation JavaScript).

**Impact** : Vol de cookies de session, modification du contenu de la page, redirection vers des sites malveillants, vol de données saisies par l'utilisateur.

### CSRF (Cross-Site Request Forgery)
Une attaque qui force un utilisateur authentifié à exécuter des actions non désirées sur une application web où il est authentifié. L'attaquant exploite le fait que le navigateur envoie automatiquement les cookies de session avec chaque requête.

**Scénario** : Un utilisateur est connecté sur site.com. Il visite un site malveillant qui envoie une requête à site.com pour changer son mot de passe. Le navigateur envoie automatiquement le cookie de session, et la requête est exécutée comme si l'utilisateur l'avait demandée.

**Protection** : Tokens CSRF, vérification de l'origine de la requête, flag SameSite sur les cookies.

### Rate Limiting
La limitation du nombre de requêtes qu'un utilisateur (ou une IP) peut effectuer dans un laps de temps donné. Protège contre les abus, les attaques par force brute, et les attaques par déni de service.

**Exemple** : Limiter les tentatives de connexion à 5 par 15 minutes pour protéger contre les attaques par force brute.

**Configuration** : Fenêtre de temps (ex: 15 minutes), nombre maximum de requêtes (ex: 5), méthode d'identification (IP, utilisateur, combinaison).

## Roadmap pédagogique

### Room 1 - Introduction & fondamentaux
**Durée estimée** : 1-2 heures

Comprendre les concepts de base, le vocabulaire, et l'importance de la sécurité. Aucun code à écrire, uniquement de la réflexion et de l'analyse.

### Room 2 - Authentication & sessions
**Durée estimée** : 3-4 heures

Apprendre à implémenter une authentification sécurisée : hachage de mots de passe, gestion de sessions, protection contre les attaques courantes.

### Room 3 - SQL Injection
**Durée estimée** : 3-4 heures

Comprendre les injections SQL, leurs impacts, et comment les prévenir avec les requêtes préparées.

### Room 4 - XSS
**Durée estimée** : 3-4 heures

Analyser les différentes formes de XSS, leurs mécanismes, et les techniques de protection (échappement, sanitization, CSP).

### Room 5 - Sécuriser une API
**Durée estimée** : 4-5 heures

Appliquer les bonnes pratiques pour sécuriser une API REST : validation, rate limiting, gestion des erreurs, headers de sécurité.

### Room 6 - Mini Pentest Web
**Durée estimée** : 5-6 heures

Mettre en pratique toutes les connaissances acquises en réalisant un audit de sécurité simplifié sur une application vulnérable.

**Total estimé** : 20-25 heures de travail

## Bonnes pratiques générales de sécurité

### 1. Ne jamais faire confiance aux entrées utilisateur
Toute donnée provenant de l'utilisateur (formulaires, URLs, headers) doit être validée et échappée.

### 2. Utiliser des requêtes préparées
Pour toute interaction avec une base de données, utiliser des requêtes préparées ou des ORM sécurisés.

### 3. Hacher les mots de passe
Jamais de stockage en clair. Utiliser des algorithmes robustes (bcrypt, argon2) avec un salt.

### 4. Gérer les sessions correctement
Cookies sécurisés (HttpOnly, Secure, SameSite), expiration appropriée, régénération après login.

### 5. Valider côté serveur
La validation côté client est une commodité, pas une sécurité. Toujours valider côté serveur.

### 6. Gérer les erreurs proprement
Ne pas exposer d'informations sensibles dans les messages d'erreur (chemins de fichiers, stack traces, etc.).

### 7. Utiliser HTTPS
Toujours chiffrer les communications, surtout pour l'authentification et les données sensibles.

### 8. Limiter les tentatives
Mettre en place un rate limiting pour les actions sensibles (login, réinitialisation de mot de passe).

### 9. Maintenir les dépendances à jour
Utiliser des outils pour détecter les vulnérabilités dans les dépendances (npm audit, Snyk, etc.).

### 10. Journaliser les événements importants
Logger les tentatives de connexion, les erreurs critiques, les actions sensibles (sans stocker de données sensibles).

## Règles d'éthique indispensables

**Ce dépôt est destiné à un usage éducatif uniquement.**

### Ce que vous DEVEZ faire
- Utiliser ces connaissances pour sécuriser vos propres applications
- Tester uniquement sur des applications que vous possédez ou avez l'autorisation de tester
- Respecter la vie privée et les données des utilisateurs
- Signaler de manière responsable les vulnérabilités trouvées

### Ce que vous NE DEVEZ PAS faire
- Tester sur des applications sans autorisation
- Exploiter des vulnérabilités à des fins malveillantes
- Accéder à des données sans autorisation
- Perturber des services en production

**Rappel légal** : L'accès non autorisé à un système informatique est un délit dans la plupart des juridictions. Les connaissances acquises ici doivent être utilisées de manière éthique et légale.

## Comment lire une vulnérabilité et une mitigation

### Structure d'analyse d'une vulnérabilité

1. **Identification** : Quel type de vulnérabilité ?
2. **Localisation** : Où se trouve-t-elle dans le code ?
3. **Cause** : Pourquoi existe-t-elle ? (code non validé, mauvaise configuration, etc.)
4. **Impact** : Que peut faire un attaquant ? (vol de données, prise de contrôle, etc.)
5. **Exploitation** : Comment un attaquant pourrait l'exploiter ? (exemple concret)

### Structure d'une mitigation

1. **Solution technique** : Quelle technique utiliser ? (requêtes préparées, échappement, validation, etc.)
2. **Implémentation** : Comment l'implémenter dans le code ?
3. **Vérification** : Comment s'assurer que la mitigation fonctionne ?
4. **Bonnes pratiques** : Quelles règles générales retenir ?

Dans chaque room, vous trouverez des exemples concrets de cette analyse.

## Dépannage pour débutants

### Docker ne démarre pas
- Vérifiez que Docker Desktop est lancé
- Vérifiez les ports utilisés : `netstat -ano | findstr :3000` (Windows)
- Consultez les logs : `docker-compose logs`

### L'application ne répond pas
- Vérifiez que le conteneur est bien lancé : `docker-compose ps`
- Vérifiez les logs de l'application : `docker-compose logs -f app`
- Vérifiez que le port n'est pas déjà utilisé

### Erreurs de dépendances Node.js
- Supprimez `node_modules` et `package-lock.json`
- Réinstallez : `npm install`
- Vérifiez la version de Node.js : `node --version` (doit être >= 18)

### Base de données ne se connecte pas
- Vérifiez que le conteneur de base de données est lancé
- Vérifiez les variables d'environnement dans `docker-compose.yml`
- Consultez les logs de la base de données

### Code ne fonctionne pas comme attendu
- Relisez attentivement le README de la room
- Vérifiez que vous avez bien suivi les instructions
- Consultez la section "Erreurs fréquentes" dans le README de la room
- Comparez avec le code de référence dans `/src-secured/`

### Questions générales
- Consultez d'abord le README de la room concernée
- Vérifiez la section dépannage de cette room
- Consultez les solutions dans `/SOLUTIONS/` si vous êtes bloqué

## Structure du dépôt

```
web-sec-academy/
├── README.md (ce fichier)
├── docker-compose.yml
├── CONTRIBUTING.md
├── room-1-introduction-basics/
│   ├── README.md
│   ├── scenarios/
│   └── checklists/
├── room-2-authentication/
│   ├── README.md
│   ├── src-vulnerable/
│   ├── src-secured/
│   ├── exercises/
│   └── checklists/
├── room-3-sql-injection/
│   ├── README.md
│   ├── src-vulnerable/
│   ├── src-secured/
│   ├── exercises/
│   └── checklists/
├── room-4-xss/
│   ├── README.md
│   ├── src-vulnerable/
│   ├── src-secured/
│   ├── exercises/
│   └── checklists/
├── room-5-secure-api/
│   ├── README.md
│   ├── src-vulnerable/
│   ├── src-secured/
│   ├── tests-postman/
│   └── checklists/
├── room-6-mini-pentest-web/
│   ├── README.md
│   ├── src-app/
│   ├── guides/
│   ├── report-template/
│   └── checklists/
└── SOLUTIONS/
    ├── room-1/
    ├── room-2/
    ├── room-3/
    ├── room-4/
    ├── room-5/
    └── room-6/
```

## Comment partager vos réponses (pour les étudiants)

Ce dépôt est public et destiné à l'apprentissage. Pour partager vos réponses, c'est très simple :

### Méthode simple : Créer une Issue GitHub

1. **Allez sur la page GitHub du dépôt**
2. **Cliquez sur l'onglet "Issues"** (en haut de la page)
3. **Cliquez sur le bouton vert "New Issue"**
4. **Dans le titre**, écrivez : `[Room X] Exercice - Votre nom`
   - Exemple : `[Room 1] Exercice 1 - Jean Dupont`
   - Exemple : `[Room 2] Exercice 1 - Hachage bcrypt - Marie Martin`
   - Exemple : `[Room 3] Code sécurisé - SQL Injection - Pierre Dubois`
5. **Dans le corps de l'issue**, collez directement vos réponses ou votre code

**C'est tout !** Pas besoin de Gist, Pastebin ou autre service. Collez simplement vos réponses dans l'issue GitHub.

### Pour partager du code

Si vous avez du code à partager, collez-le directement dans l'issue en utilisant trois backticks (```) avant et après :

````
```javascript
// Votre code ici
function maFonction() {
    // ...
}
```
````

GitHub formatera automatiquement votre code avec la coloration syntaxique.

### Tags à utiliser dans les titres

- `[Room 1]` : Pour la Room 1 - Introduction
- `[Room 2]` : Pour la Room 2 - Authentication
- `[Room 3]` : Pour la Room 3 - SQL Injection
- `[Room 4]` : Pour la Room 4 - XSS
- `[Room 5]` : Pour la Room 5 - Sécuriser une API
- `[Room 6]` : Pour la Room 6 - Mini Pentest
- `[Question]` : Pour poser une question
- `[Aide]` : Pour demander de l'aide

### Exemples simples

**Pour partager des réponses écrites** :
```
Titre : [Room 1] Exercice 1 - Jean Dupont

Corps :
# Mes réponses

## Problèmes identifiés :
1. Mots de passe en clair
2. Pas de validation
...
```

**Pour partager du code** :
```
Titre : [Room 2] Exercice 1 - Hachage bcrypt - Marie Martin

Corps :
# Mon code

```javascript
const bcrypt = require('bcrypt');
// Mon code ici
```
```

**Pour poser une question** :
```
Titre : [Question] Room 3 - Erreur SQL - Sophie

Corps :
Bonjour,

Je rencontre cette erreur : SQLITE_ERROR: no such column

J'ai essayé de [décrire ce que vous avez fait]

Pouvez-vous m'aider ?
```

### Important

- **Ne modifiez pas** les fichiers existants du dépôt
- **Collez directement** vos réponses dans l'issue (pas besoin de fichiers externes)
- **Soyez respectueux** dans vos messages
- **Respectez l'éthique** : ce dépôt est à des fins éducatives uniquement

### Obtenir de l'aide

Si vous êtes bloqué :

1. Consultez d'abord les solutions dans `/SOLUTIONS/room-X/`
2. Relisez le README de la room concernée
3. Créez une issue avec le tag `[Question]` ou `[Aide]`
4. Décrivez clairement :
   - Ce que vous essayez de faire
   - Où vous êtes bloqué
   - Les erreurs que vous rencontrez (copiez-collez le message d'erreur)

## Prochaines étapes

1. Commencez par la **Room 1** pour acquérir les fondamentaux
2. Suivez l'ordre des rooms pour une progression naturelle
3. Prenez le temps de comprendre chaque concept avant de passer au suivant
4. Pratiquez avec les exercices proposés
5. Consultez les solutions uniquement après avoir tenté de résoudre les exercices
6. Partagez vos réponses et posez vos questions via les issues GitHub

Bonne chance dans votre apprentissage de la sécurité web !

