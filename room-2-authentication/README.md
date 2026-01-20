# Room 2 - Authentication & Sessions

## Objectif de la room

Cette room vous apprend à implémenter une authentification sécurisée. Vous découvrirez les erreurs courantes, leurs conséquences, et les bonnes pratiques pour les éviter.

À la fin de cette room, vous serez capable de :
- Implémenter un système d'authentification sécurisé
- Comprendre le hachage de mots de passe et les sels
- Gérer les sessions de manière sécurisée
- Protéger contre les attaques courantes (brute force, fixation de session, etc.)

## Scénario narratif

Vous développez une application de gestion de tâches pour une petite équipe. L'application nécessite une authentification pour protéger les données de chaque utilisateur.

Votre collègue a commencé à implémenter le système de connexion, mais vous avez des doutes sur la sécurité. Votre mission : analyser le code existant, identifier les vulnérabilités, et implémenter une version sécurisée.

## Concepts clés

### Authentication vs Authorization

Ces deux concepts sont souvent confondus mais sont fondamentalement différents :

- **Authentication (Authentification)** : Vérifier **qui vous êtes**. C'est le processus de vérification de l'identité d'un utilisateur, généralement via un nom d'utilisateur et un mot de passe. Répond à la question : "Êtes-vous bien la personne que vous prétendez être ?"
  
  **Exemple** : Un utilisateur se connecte avec son nom d'utilisateur et son mot de passe. Le système vérifie que ces identifiants correspondent à un compte existant.

- **Authorization (Autorisation)** : Vérifier **ce que vous pouvez faire**. C'est le processus de vérification des permissions d'un utilisateur pour accéder à des ressources ou effectuer des actions. Répond à la question : "Avez-vous le droit d'effectuer cette action ?"
  
  **Exemple** : Un utilisateur authentifié essaie d'accéder à une page d'administration. Le système vérifie si cet utilisateur a le rôle "admin" avant d'autoriser l'accès.

**Mnémonique** : Authentication = "Qui êtes-vous ?", Authorization = "Que pouvez-vous faire ?"

### Hachage de mots de passe

Un **hash** (ou hachage) est une fonction cryptographique unidirectionnelle qui transforme une donnée (comme un mot de passe) en une chaîne de caractères de taille fixe, de manière **irréversible**. C'est une transformation à sens unique : on peut hasher un mot de passe, mais on ne peut pas "déhasher" pour retrouver le mot de passe original.

**Caractéristiques d'un bon algorithme de hachage pour mots de passe** :
- **Unidirectionnel** : Impossible de retrouver le mot de passe à partir du hash
- **Déterministe** : Le même mot de passe produit toujours le même hash (avec le même salt)
- **Lent par design** : Résistant aux attaques par force brute
- **Résistant aux collisions** : Deux mots de passe différents ne produisent pas le même hash

**Pourquoi hasher les mots de passe ?** Si la base de données est compromise (fuite de données, accès non autorisé), les mots de passe ne sont pas lisibles en clair. Un attaquant ne peut pas directement utiliser les mots de passe volés.

**Algorithme recommandé** : 
- **bcrypt** : Largement utilisé, bien testé, génère automatiquement un salt
- **argon2** : Plus récent, considéré comme plus sûr, gagnant du Password Hashing Competition
- **scrypt** : Conçu pour être coûteux en mémoire et CPU
- **MD5, SHA1, SHA256** : Trop rapides, vulnérables aux attaques par force brute avec GPU, ne doivent PAS être utilisés pour les mots de passe

**Exemple de hash bcrypt** :
```
Mot de passe : "password123"
Hash bcrypt : "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"
```
Même si vous voyez ce hash, vous ne pouvez pas retrouver "password123" sans essayer toutes les combinaisons possibles.

### Salt

Un **salt** (sel) est une valeur aléatoire unique ajoutée au mot de passe avant le hachage. Chaque utilisateur a son propre salt, qui est généralement stocké avec le hash.

**Pourquoi un salt est essentiel** :
1. **Protection contre les rainbow tables** : Sans salt, deux utilisateurs avec le même mot de passe auraient le même hash. Un attaquant pourrait utiliser des tables pré-calculées (rainbow tables) pour retrouver rapidement les mots de passe courants.
2. **Unicité des hashs** : Avec un salt unique, même deux utilisateurs avec le même mot de passe auront des hashs différents.
3. **Résistance aux attaques** : Même si un attaquant connaît le hash d'un utilisateur, il doit recalculer toutes les possibilités avec ce salt spécifique.

**Exemple** :
```
Utilisateur A : mot de passe "password123" + salt "abc123" → hash "xyz789"
Utilisateur B : mot de passe "password123" + salt "def456" → hash "uvw012"
```
Même mot de passe, hashs différents grâce aux sels différents.

**Bonnes pratiques** :
- Le salt doit être **aléatoire** et **unique** pour chaque utilisateur
- Le salt doit être **suffisamment long** (au moins 16 caractères)
- Le salt est généralement **stocké avec le hash** (pas besoin de le cacher)
- **bcrypt génère automatiquement un salt** et l'inclut dans le hash, ce qui simplifie l'implémentation

### Sessions

Une **session** est un mécanisme qui permet de maintenir l'état d'authentification d'un utilisateur entre plusieurs requêtes HTTP. Comme HTTP est un protocole "sans état" (stateless), les sessions permettent de "se souvenir" qu'un utilisateur est connecté.

**Comment ça fonctionne** :
1. L'utilisateur se connecte avec ses identifiants
2. Le serveur crée une session (stockée en mémoire, base de données, ou Redis)
3. Le serveur envoie un ID de session au client (généralement dans un cookie)
4. Le client envoie cet ID de session à chaque requête suivante
5. Le serveur vérifie l'ID de session pour savoir qui est l'utilisateur

**Gestion sécurisée des sessions** :
- **Cookies HttpOnly** : Empêche l'accès JavaScript au cookie (protection contre XSS)
- **Flag Secure** : Le cookie n'est envoyé que via HTTPS (protection contre le vol via réseau non chiffré)
- **Flag SameSite** : Empêche l'envoi du cookie dans des requêtes cross-site (protection contre CSRF)
- **Expiration appropriée** : Les sessions doivent expirer après une période d'inactivité (ex: 15-30 minutes) ou après une durée maximale (ex: 24 heures)
- **Régénération après login** : Générer un nouvel ID de session après une connexion réussie (protection contre la fixation de session)
- **ID de session sécurisé** : Utiliser `crypto.randomBytes()` au lieu de `Math.random()` pour générer des IDs imprévisibles

**Stockage des sessions** :
- **En mémoire** : Simple mais perdu au redémarrage, ne fonctionne pas avec plusieurs serveurs
- **Base de données** : Persistant, fonctionne avec plusieurs serveurs, mais peut être un goulot d'étranglement
- **Redis/Memcached** : Rapide, persistant, idéal pour les applications distribuées

## Démarrage

### Prérequis

Avant de commencer, vérifiez que vous avez :

- Docker installé et fonctionnel
- Docker Compose installé et fonctionnel
- Un navigateur web moderne (Chrome, Firefox, Edge)

### Vérification de l'installation

#### Windows (PowerShell)

```powershell
# 1. Vérifier Docker
docker --version
# Résultat attendu : Docker version 20.10.x ou supérieur

# 2. Vérifier Docker Compose
docker-compose --version
# Résultat attendu : docker-compose version 1.29.x ou supérieur

# 3. Vérifier que Docker fonctionne
docker ps
# Résultat attendu : Liste des conteneurs (peut être vide, c'est normal)
```

**Si vous avez une erreur :**

- Docker n'est pas installé : Téléchargez Docker Desktop depuis https://www.docker.com/products/docker-desktop
- Docker n'est pas démarré : Lancez Docker Desktop depuis le menu Démarrer

#### Mac (Terminal)

```bash
# 1. Vérifier Docker
docker --version
# Résultat attendu : Docker version 20.10.x ou supérieur

# 2. Vérifier Docker Compose
docker-compose --version
# Résultat attendu : docker-compose version 1.29.x ou supérieur

# 3. Vérifier que Docker fonctionne
docker ps
# Résultat attendu : Liste des conteneurs (peut être vide, c'est normal)
```

**Si vous avez une erreur :**

- Docker n'est pas installé : Téléchargez Docker Desktop depuis https://www.docker.com/products/docker-desktop
- Docker n'est pas démarré : Lancez Docker Desktop depuis Applications

#### Linux (Terminal)

```bash
# 1. Vérifier Docker
docker --version
# Résultat attendu : Docker version 20.10.x ou supérieur

# 2. Vérifier Docker Compose
docker-compose --version
# Résultat attendu : docker-compose version 1.29.x ou supérieur

# 3. Vérifier que Docker fonctionne
docker ps
# Résultat attendu : Liste des conteneurs (peut être vide, c'est normal)
```

**Si vous avez une erreur :**

Installez Docker en suivant les instructions officielles : https://docs.docker.com/get-docker/

---

### Lancer l'environnement vulnérable

**Explication :** Nous allons lancer l'application vulnérable pour voir les problèmes en action avant de les corriger.

#### Windows (PowerShell)

```powershell
# 1. Ouvrez PowerShell
# 2. Naviguez vers le dossier de la room
cd C:\Users\VotreNom\Desktop\Cybersecu_Ensitech\room-2-authentication

# 3. Lancez Docker Compose
docker-compose up -d

# 4. Vérifiez que ça fonctionne
docker-compose ps
# Vous devriez voir un conteneur : room2-auth-vulnerable
```

**Que fait cette commande ?**

- `docker-compose up -d` : Lance le conteneur Docker en arrière-plan
- `-d` signifie "detached" (détaché) : le conteneur tourne en arrière-plan
- L'application démarre automatiquement

#### Mac (Terminal)

```bash
# 1. Ouvrez Terminal
# 2. Naviguez vers le dossier de la room
cd ~/Desktop/Cybersecu_Ensitech/room-2-authentication

# 3. Lancez Docker Compose
docker-compose up -d

# 4. Vérifiez que ça fonctionne
docker-compose ps
# Vous devriez voir un conteneur : room2-auth-vulnerable
```

#### Linux (Terminal)

```bash
# 1. Ouvrez Terminal
# 2. Naviguez vers le dossier de la room
cd ~/Desktop/Cybersecu_Ensitech/room-2-authentication

# 3. Lancez Docker Compose
docker-compose up -d

# 4. Vérifiez que ça fonctionne
docker-compose ps
# Vous devriez voir un conteneur : room2-auth-vulnerable
```

**Vérification :**

Ouvrez votre navigateur et allez sur :
- `http://localhost:3000` → Application vulnérable

**Si ça ne fonctionne pas :**

- Vérifiez les logs : `docker-compose logs`
- Vérifiez que le port 3000 n'est pas déjà utilisé
- Assurez-vous que Docker Desktop est lancé

---

### Lancer l'environnement sécurisé

**Explication :** Une fois que vous avez analysé l'application vulnérable, lancez la version sécurisée pour comparer.

#### Windows (PowerShell)

```powershell
# Depuis le dossier room-2-authentication
docker-compose -f docker-compose.secured.yml up -d

# Vérifiez que ça fonctionne
docker-compose -f docker-compose.secured.yml ps
```

#### Mac/Linux (Terminal)

```bash
# Depuis le dossier room-2-authentication
docker-compose -f docker-compose.secured.yml up -d

# Vérifiez que ça fonctionne
docker-compose -f docker-compose.secured.yml ps
```

**Vérification :**

Ouvrez votre navigateur et allez sur :
- `http://localhost:3001` → Application sécurisée

---

## Identifiants de test

Pour tester l'application, utilisez ces identifiants de test :

**Application vulnérable (http://localhost:3000) :**
- Username : `admin`
- Password : `admin123`

**Application sécurisée (http://localhost:3001) :**
- Username : `admin`
- Password : `admin123`

Ces identifiants fonctionnent sur les deux versions pour faciliter la comparaison.

## Analyse du code vulnérable

Le code vulnérable se trouve dans `/src-vulnerable/`. Analysons les problèmes principaux :

### Problème 1 : Mots de passe en clair

```javascript
// VULNÉRABLE
if (user.password === password) {
    // Connexion réussie
}
```

**Impact** : Si la base de données est compromise, tous les mots de passe sont exposés.

### Problème 2 : Pas de protection contre brute force

```javascript
// VULNÉRABLE
app.post('/login', (req, res) => {
    // Aucune limitation du nombre de tentatives
});
```

**Impact** : Un attaquant peut tenter des milliers de mots de passe par seconde.

### Problème 3 : Messages d'erreur trop informatifs

```javascript
// VULNÉRABLE
if (!user) {
    return res.json({ error: "Nom d'utilisateur incorrect" });
}
if (user.password !== password) {
    return res.json({ error: "Mot de passe incorrect" });
}
```

**Impact** : Un attaquant peut déterminer quels noms d'utilisateur existent.

### Problème 4 : Sessions non sécurisées

```javascript
// VULNÉRABLE
res.cookie('session', sessionId);
```

**Impact** : Le cookie peut être volé via XSS, pas de protection CSRF.

## Version sécurisée

Le code sécurisé se trouve dans `/src-secured/`. Voici les améliorations principales :

### Amélioration 1 : Hachage avec bcrypt

```javascript
// SÉCURISÉ
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 10);

// Vérification
const isValid = await bcrypt.compare(password, user.passwordHash);
```

### Amélioration 2 : Rate limiting

```javascript
// SÉCURISÉ
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5 // 5 tentatives max
});
```

### Amélioration 3 : Messages d'erreur génériques

```javascript
// SÉCURISÉ
return res.json({ error: "Identifiants incorrects" });
// Même message que l'utilisateur existe ou non
```

### Amélioration 4 : Cookies sécurisés

```javascript
// SÉCURISÉ
res.cookie('session', sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 heures
});
```

## Ressources pédagogiques

### Ordre recommandé de consultation

Pour tirer le meilleur parti de cette room, suivez cet ordre :

1. **Lisez ce README** pour comprendre les concepts et analyser le code vulnérable
2. **Lancez l'application vulnérable** et testez-la pour voir les problèmes en action
3. **Réalisez les exercices** dans `/exercises/` pour corriger progressivement le code
4. **Comparez avec la version sécurisée** dans `/src-secured/` pour voir les bonnes pratiques
5. **Vérifiez votre implémentation** avec la checklist de sécurité

### Exercices guidés

Les exercices vous guident pas à pas pour sécuriser le code :

- **[Exercice 1 : Implémenter le hachage de mots de passe](./exercises/exercise-1.md)** - Remplacer le stockage en clair par bcrypt
- **[Exercice 2 : Ajouter le rate limiting](./exercises/exercise-2.md)** - Protéger contre les attaques par force brute
- **[Exercice 3 : Sécuriser les cookies de session](./exercises/exercise-3.md)** - Implémenter les flags de sécurité (HttpOnly, Secure, SameSite)

**Conseil** : Réalisez les exercices dans l'ordre. Chaque exercice construit sur le précédent. Consultez les solutions dans `/SOLUTIONS/room-2/` uniquement après avoir tenté de résoudre par vous-même.

### Checklist de sécurité

Utilisez la **[checklist de sécurité complète](./checklists/security-checklist.md)** pour vérifier que votre implémentation d'authentification est sécurisée. Cette checklist couvre :

- Stockage des mots de passe (hachage, salt, algorithmes)
- Validation des entrées
- Protection contre les attaques (brute force, timing attacks, etc.)
- Gestion des sessions (cookies sécurisés, expiration, régénération)
- Gestion des erreurs (messages génériques, pas d'informations sensibles)
- Autorisation (vérification des permissions)

**Conseil** : Utilisez cette checklist comme référence lors du développement de vos propres applications.

## Attaques courantes

### Brute Force

**Qu'est-ce que c'est ?** Tenter tous les mots de passe possibles jusqu'à trouver le bon.

**Protection** : Rate limiting, CAPTCHA après plusieurs tentatives, verrouillage de compte temporaire.

### Fixation de session

**Qu'est-ce que c'est ?** Forcer un utilisateur à utiliser un ID de session connu de l'attaquant.

**Protection** : Régénérer l'ID de session après login.

### Session hijacking

**Qu'est-ce que c'est ?** Voler l'ID de session d'un utilisateur (via XSS, sniffing réseau, etc.).

**Protection** : Cookies HttpOnly, Secure, HTTPS, expiration appropriée.

### Credential stuffing

**Qu'est-ce que c'est ?** Utiliser des identifiants volés sur d'autres sites (les utilisateurs réutilisent souvent leurs mots de passe).

**Protection** : Encouragez l'utilisation de mots de passe uniques, détectez les connexions suspectes.

## Tests à effectuer

### Test 1 : Voir les mots de passe en clair

**Objectif :** Vérifier que les mots de passe sont stockés en clair dans la version vulnérable

**Étapes :**

1. Allez sur `http://localhost:3000`
2. Créez un compte avec un mot de passe simple (ex: "test123")
3. Regardez les logs Docker :
   ```bash
   docker-compose logs
   ```
4. Cherchez le mot de passe dans les logs ou inspectez la base de données

**Résultat attendu (vulnérable) :**

- Le mot de passe apparaît en clair quelque part
- Cela prouve que les mots de passe ne sont pas hashés

**Résultat attendu (sécurisé) :**

- Seul le hash du mot de passe est visible
- Le hash ressemble à : `$2b$10$N9qo8uLOickgx2ZMRZoMye...`
- Impossible de retrouver le mot de passe original

---

### Test 2 : Attaque par force brute

**Objectif :** Tester si le rate limiting fonctionne

**Étapes :**

1. Allez sur `http://localhost:3000` (version vulnérable)
2. Essayez de vous connecter avec un mauvais mot de passe
3. Répétez 10 fois rapidement (copiez-collez le formulaire)

**Résultat attendu (vulnérable) :**

- Vous pouvez essayer autant de fois que vous voulez
- Aucune limitation
- Un attaquant pourrait tester des milliers de mots de passe

**Résultat attendu (sécurisé) :**

1. Allez sur `http://localhost:3001` (version sécurisée)
2. Essayez de vous connecter avec un mauvais mot de passe
3. Répétez 6 fois rapidement

**Résultat attendu :**

- Après 5 tentatives, vous recevez un message d'erreur
- Vous devez attendre 15 minutes avant de réessayer
- Cela protège contre les attaques par force brute

---

### Test 3 : Vérifier les cookies de session

**Objectif :** Comparer la sécurité des cookies entre les deux versions

**Étapes :**

1. Connectez-vous sur les deux applications (vulnérable et sécurisée)
2. Ouvrez les outils développeur (F12)
3. Allez dans l'onglet "Application" (Chrome) ou "Stockage" (Firefox)
4. Regardez les cookies

**Résultat attendu (vulnérable) :**

- Cookie de session sans flags de sécurité
- Accessible via JavaScript (HttpOnly absent)
- Peut être volé via XSS

**Résultat attendu (sécurisé) :**

- Cookie avec HttpOnly (non accessible via JavaScript)
- Cookie avec Secure (envoi uniquement via HTTPS)
- Cookie avec SameSite (protection CSRF)

---

### Test 4 : Comprendre le hachage bcrypt

**Objectif :** Voir comment bcrypt transforme les mots de passe

**Étapes :**

1. Créez deux comptes avec le même mot de passe sur l'application sécurisée
2. Regardez les hashs dans la base de données (via les logs)

**Résultat attendu :**

- Les deux hashs sont différents (grâce au salt unique)
- Même mot de passe = hashs différents
- Cela protège contre les rainbow tables

---

## Arrêter l'environnement

Quand vous avez terminé, arrêtez les conteneurs :

```bash
# Depuis le dossier room-2-authentication

# Arrêter la version vulnérable
docker-compose down

# Arrêter la version sécurisée
docker-compose -f docker-compose.secured.yml down
```

**Que fait cette commande ?**

- Arrête tous les conteneurs de cette room
- Libère les ports utilisés
- Nettoie les ressources Docker

---

## Vérification finale

Avant de passer à la Room 3, assurez-vous d'avoir :

- [ ] Réalisé les 3 exercices guidés
- [ ] Compris le fonctionnement de bcrypt et des sels
- [ ] Implémenté le rate limiting
- [ ] Sécurisé les cookies de session
- [ ] Effectué les tests ci-dessus
- [ ] Consulté la [checklist de sécurité](./checklists/security-checklist.md) et vérifié votre code

## Erreurs fréquentes

### Erreur 1 : Stocker les mots de passe en clair

**Symptôme** : Comparaison directe `user.password === password`

**Solution** : Toujours hasher avec bcrypt ou équivalent

### Erreur 2 : Utiliser MD5 ou SHA1

**Symptôme** : `crypto.createHash('md5').update(password)`

**Solution** : Utiliser bcrypt, argon2, ou scrypt

### Erreur 3 : Salt statique ou pas de salt

**Symptôme** : Même salt pour tous les utilisateurs, ou pas de salt du tout

**Solution** : bcrypt génère automatiquement un salt unique par hash

### Erreur 4 : Cookies non sécurisés

**Symptôme** : `res.cookie('session', id)` sans options

**Solution** : Toujours utiliser `httpOnly: true`, `secure: true`, `sameSite: 'strict'`

### Erreur 5 : Pas de rate limiting

**Symptôme** : Aucune limitation sur les endpoints de login

**Solution** : Implémenter un rate limiter (express-rate-limit)

## Comment partager vos réponses et votre code

Pour partager vos exercices complétés, c'est très simple :

### Méthode simple : Créer une Issue GitHub

1. Allez sur la page GitHub du dépôt
2. Cliquez sur **"Issues"** puis **"New Issue"**
3. Dans le **titre**, écrivez : `[Room 2] Exercice X - Votre nom`
   - Exemple : `[Room 2] Exercice 1 - Hachage bcrypt - Jean Dupont`
4. Dans le **corps de l'issue**, collez directement votre code modifié

**C'est tout !** Collez simplement votre code dans l'issue, pas besoin de Gist ou autre service.

### Format simple pour partager votre code

Copiez-collez ce format et remplissez-le :

````
# Mes réponses - Room 2

## Exercice 1 : Implémenter le hachage de mots de passe

### Code modifié :

```javascript
// Collez ici votre code modifié
// Par exemple, votre fonction de login avec bcrypt
```

### Ce que j'ai modifié :
- [Décrivez vos changements]
- [Listez les fichiers modifiés]

### Questions / Difficultés :
- [Vos questions si vous en avez]
````

**Astuce** : Pour formater le code dans GitHub, utilisez trois backticks (```) avant et après votre code, comme dans l'exemple ci-dessus.

### Si vous avez des questions ou êtes bloqué

Créez une issue avec le titre : `[Question] Room 2 - Votre problème`

Dans le corps, expliquez :
- Ce que vous essayez de faire
- L'erreur exacte que vous rencontrez (copiez-collez le message d'erreur)
- Ce que vous avez déjà essayé

### Important

- **Ne modifiez pas** les fichiers existants dans `src-vulnerable/` ou `src-secured/`
- **Collez directement** votre code dans l'issue
- Si votre code est très long, vous pouvez le diviser en plusieurs issues (une par exercice)

## Questions fréquentes

**Q : Pourquoi utiliser bcrypt au lieu de MD5 ou SHA256 ?**

R : MD5 et SHA256 sont trop rapides. Un attaquant peut tester des millions de mots de passe par seconde avec un GPU. bcrypt est conçu pour être lent (ajustable), ce qui rend les attaques par force brute beaucoup plus difficiles.

**Q : C'est quoi un salt ?**

R : Un salt est une valeur aléatoire unique ajoutée au mot de passe avant le hachage. Chaque utilisateur a son propre salt. Cela garantit que même deux utilisateurs avec le même mot de passe auront des hashs différents.

**Q : Pourquoi HttpOnly sur les cookies ?**

R : HttpOnly empêche JavaScript d'accéder au cookie. Si votre site a une vulnérabilité XSS, l'attaquant ne pourra pas voler le cookie de session.

**Q : Le rate limiting bloque-t-il tous les utilisateurs ?**

R : Non, le rate limiting est généralement par IP ou par utilisateur. Si vous êtes bloqué, attendez 15 minutes ou utilisez une autre IP.

---

## Dépannage

### L'application ne démarre pas

**Vérifications :**

1. Vérifiez que Docker est lancé (icône verte dans la barre des tâches)
2. Vérifiez les logs : `docker-compose logs`
3. Vérifiez que le port 3000 (ou 3001) n'est pas déjà utilisé :
   ```powershell
   # Windows
   netstat -ano | findstr :3000
   ```
   ```bash
   # Mac/Linux
   lsof -i :3000
   ```

### Erreur "bcrypt not found"

**Solution :**

Les dépendances sont installées automatiquement par Docker. Si vous avez cette erreur :

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### La connexion ne fonctionne pas

**Vérifications :**

1. Vérifiez que la base de données est bien lancée : `docker-compose ps`
2. Consultez les logs de l'application : `docker-compose logs`
3. Vérifiez les identifiants de test :
   - Username : `admin`
   - Password : `admin123`

### Problème avec les cookies

**En développement (HTTP) :**

Si vous testez en local avec HTTP (pas HTTPS), vous devrez peut-être désactiver le flag `secure: true` dans le code sécurisé, car `secure: true` nécessite HTTPS.

**Vérifications :**

1. Vérifiez les paramètres du navigateur (cookies bloqués ?)
2. Essayez en navigation privée
3. Vérifiez la console du navigateur (F12) pour les erreurs

Pour plus de détails, consultez [TROUBLESHOOTING.md](../../TROUBLESHOOTING.md) à la racine du projet.

## Prochaines étapes

Une fois que vous maîtrisez l'authentification sécurisée, vous êtes prêt pour la **Room 3 - SQL Injection**, où vous apprendrez à protéger vos requêtes de base de données.

